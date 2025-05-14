(function(Scratch) {
  'use strict';
  
  const {BlockType, ArgumentType, Cast, TargetType} = Scratch;
  
  const extensionNS = 'witcat';
  const extensionId = `${extensionNS}dollypro`;
  
  /** 保存扩展配置的舞台注释的Id */
  const EXT_CONFIG_COMMENT_ID = '_ArkosExtensionConfig_';
  
  class dollyProExtension {
    static extCount = 0;
  
    // Replace just the constructor with this safer version
  constructor(runtime) {
    // Handle null runtime case
    this.runtime = runtime || null;
  
    dollyProExtension.extCount += 1;
    /** 递增计数的扩展id。预防一个奇妙的情况：扩展被重复加载） */
    this.id = dollyProExtension.extCount;
  
    /** 克隆体ID映射表：ID → target */
    this.IDtoTargets = {};
  
    this.nextSpriteIDCount = 0;
    this.nextCloneIDCount = 0;
  
    /** 下个克隆体的预设的KV数据 */
    this.clonePresetData = {};
  
    /** 下个克隆体的预设属性('x'、'y'、'size'、'direction'等)的值 */
    this.clonePresetProperties = {};
  
    /** 克隆体预设的要加入的分组 */
    this.clonePresetGroups = {};
  
    /** 刚克隆的克隆体ID */
    this.justCreatedCloneID = '';
  
    /** 克隆体分组，每个组是一个克隆体ID列表 */
    this.groupsOfClones = {};
  
    /** 存放 forEach 积木当前遍历的克隆体ID */
    this.forEachIndex = {};
  
    /** 一个附加功能，将扩展中对原版xy方向的访问转移到对克隆体Key数据的访问
     * - 例如，x: 'x' 表示原来访问target.x，现在访问target.DollyPro.extraData['x']
     * - 默认都是 null，即访问原内容
     */
    this.accessTransfer = { x: null, y: null, direction: null };
  
    /** 是否隐藏不常用的多莉积木 */
    this.hideExtraBlocks = true;
  
    // Skip runtime-dependent operations if runtime is null
    if (!this.runtime) {
      console.warn('Runtime is not available, some features will be disabled');
      return;
    }
  
    if (!this.parseExtConfig()) {
      runtime.on('PROJECT_LOADED', () => {
        // 从作品注释读取扩展配置
        this.parseExtConfig();
      });
    }
  
    /** Scratch 的 canvas 对象 */
    this.canvas = runtime.renderer ? runtime.renderer.canvas : null;
  
    const outerThis = this;
  
    // 劫持 runtime.getTargetById (根据Id找克隆体时，先从ID表查找)
    this.tryHackedFunction(
      this.runtime,
      'getTargetById',
      function getTargetById(origFun, ID) {
        // 先从ID表查找
        if (Object.prototype.hasOwnProperty.call(outerThis.IDtoTargets, ID)) {
          return outerThis.IDtoTargets[ID];
        }
        // 没找到再用原版方法
        return origFun.call(this, ID);
      },
    );
  
    // 劫持 runtime.removeExecutable
    this.tryHackedFunction(
      this.runtime,
      'removeExecutable',
      function removeExecutable(origFun, target) {
        // removeExecutable（删除角色/克隆体）之前，处理一下后事
        outerThis.processTargetBeforeDeletion(target);
        origFun.call(this, target);
      },
    );
  
    // 劫持 runtime.disposeTarget
    this.tryHackedFunction(
      this.runtime,
      'disposeTarget',
      function disposeTarget(origFun, target) {
        // 避免循环删除
        if (target.DollyPro) {
          if (target.DollyPro.isDeleting) return;
        }
        origFun.call(this, target);
      },
    );
  
    this.hackedDispose = function dispose(origFun) {
      // 避免循环删除
      if (this.DollyPro) {
        if (this.DollyPro.isDeleting) return;
      }
      origFun.call(this);
    };
    // 劫持 newClone.initDrawable
    this.hackedInitDrawable = function initDrawable(origFun, layerGroup) {
      if (!this.isOriginal) {
        // 触发hat"当克隆体即将启动"
        outerThis.runtime.startHats(`${extensionId}_initTheClone`, null, this);
      }
      origFun.call(this, layerGroup);
    };
  
    // 作品加载后，给每个角色注入多莉，并劫持RenderTarget方法
    setTimeout(() => {
      const { targets } = this.runtime;
      if (targets) {
        if (targets[0]) {
          // 劫持RenderTarget.initDrawable
          this.tryHackedRenderTarget(targets[0]);
        }
        targets.forEach((target) => {
          // 注入多莉
          this.injectDollyTarget(target);
        });
      }
    }, 1000);
  
    // 劫持 runtime.addTarget（用于创建新角色/克隆体时，注入多莉）
    this.tryHackedFunction(
      runtime,
      'addTarget',
      function addTarget(origFun, target) {
        // 注入多莉（角色本体、克隆体都要注入）
        outerThis.injectDollyTarget(target);
        if (!target.isOriginal) {
          // 如果是克隆体，进行一些预处理（如读取预设数据）
          outerThis.processCloneBeforeCreation(target);
          // 记录刚克隆的克隆体ID
          outerThis.justCreatedCloneID = outerThis.getIDOfTarget(target);
        }
        origFun.call(this, target);
      },
    );
  }  
    getInfo() {
      return {
        id: extensionId,
        name: 'Dolly Pro',
        color1: '#FF9922',
        blocks: [
          // 按钮：显示不常用积木
          {
            blockType: BlockType.BUTTON,
            hideFromPalette: !this.hideExtraBlocks,
            text: 'Show other blocks',
            onClick: () => {
              // eslint-disable-next-line no-alert
              if (confirm('To avoid clutter, some infrequently used blocks are hidden.\nDo you want to show hidden blocks?')) {
                this.hideExtraBlocks = false;
                this.storeExtConfig();
                this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
              }
            },
          },
          // 按钮：隐藏不常用积木
          {
            blockType: BlockType.BUTTON,
            text: 'Hide other blocks',
            hideFromPalette: this.hideExtraBlocks,
            onClick: () => {
              this.hideExtraBlocks = true;
              this.storeExtConfig();
              this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
            },
          },
          '---🔧 Common Tools',
          // 判断我是克隆体/本体吗
          {
            opcode: 'isCloneOrIsOriginal',
            blockType: BlockType.BOOLEAN,
            filter: [TargetType.SPRITE],
            text: 'am I [TYPE]?',
            arguments: {
              TYPE: {
                type: ArgumentType.STRING,
                menu: 'CLONE_OR_ORIGINAL_MENU',
              },
            },
          },
          // 获取角色的克隆体数量/ID表
          {
            opcode: 'getCloneTargetPropertyWithSpriteName2',
            blockType: BlockType.REPORTER,
            text: 'clone [PROPERTY] of [TARGET]',
            arguments: {
              TARGET: {
                type: ArgumentType.STRING,
                menu: 'NEW_SPRITE_MENU_WITH_ALL',
              },
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'CLONE_PROPERTY',
              },
            },
          },
          // 获取角色ID等信息
          {
            opcode: 'getOriginalTargetPropertyWithSpriteName2',
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: '[PROPERTY] of [TARGET]',
            arguments: {
              TARGET: {
                type: ArgumentType.STRING,
                menu: 'NEW_SPRITE_MENU',
              },
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_PROPERTY',
              },
            },
          },
          '---🔔 Event',
          // 克隆体启动前执行的动作
          {
            blockType: BlockType.EVENT,
            opcode: 'initTheClone',
            filter: [TargetType.SPRITE],
            hideFromPalette: this.hideExtraBlocks,
            text: 'before I start as a clone',
            isEdgeActivated: false,
          },
          // 克隆体删除前执行动作
          {
            blockType: BlockType.EVENT,
            opcode: 'beforeDeletionOfTheClone',
            filter: [TargetType.SPRITE],
            hideFromPalette: this.hideExtraBlocks,
            text: 'before I\'m deleted as a clone',
            isEdgeActivated: false,
          },
          // 当有克隆体被克隆
          {
            opcode: 'dispatchWhenCloned',
            blockType: BlockType.HAT,
            isEdgeActivated: false,
            hideFromPalette: this.hideExtraBlocks,
            text: 'when [TARGET] is detected to be cloned. cloneID = [ID]',
            arguments: {
              TARGET: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_MENU_WITH_ANY',
              },
              ID: {
                type: ArgumentType.STRING
              },
            },
          },
          // 当有克隆体被删除
          {
            opcode: 'dispatchWhenCloneDeleted',
            blockType: BlockType.HAT,
            isEdgeActivated: false,
            hideFromPalette: this.hideExtraBlocks,
            text: 'when clone of [TARGET] is detected to be deleted. deletedID = [ID]',
            arguments: {
              TARGET: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_MENU_WITH_ANY',
              },
              ID: {
                type: ArgumentType.STRING
              },
            },
          },
          // 朝特定克隆体广播
          {
            opcode: 'broadcastToClone',
            blockType: BlockType.COMMAND,
            filter: [TargetType.SPRITE],
            text: 'send private message [MSG] to clone [MENU] [VALUE], with data [data]',
            arguments: {
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              MSG: {
                type: ArgumentType.STRING,
                defaultValue: 'message1',
              },
              data: {
                type: ArgumentType.STRING,
                defaultValue: 'data',
              },
            },
          },
          // 当我收到私有广播
          {
            opcode: 'receiveMyBroadcast',
            blockType: BlockType.HAT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: false,
            text: 'when I receive private message [MSG] for me. data=[data], senderID=[senderID]',
            arguments: {
              MSG: {
                type: ArgumentType.STRING,
                defaultValue: 'message1',
              },
              data: {
                type: ArgumentType.STRING
              },
              senderID: {
                type: ArgumentType.STRING
              },
            },
          },
          '---🪄 Clone and Delete',
          // 预设克隆体 x/y/方向...
          {
            opcode: 'presetPropertyForTheNextClone',
            blockType: BlockType.COMMAND,
            text: 'preset [PROPERTY] of the next clone to [VALUE]',
            arguments: {
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'PRESET_PROPERTY',
                defaultValue: 'x',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: '30',
              },
            },
          },
          // 预设克隆体单条key数据
          {
            opcode: 'presetSingleDataForTheNextClone',
            blockType: BlockType.COMMAND,
            text: 'preset [KEY] of the next clone to [VALUE]',
            arguments: {
              KEY: {
                type: ArgumentType.STRING,
                defaultValue: 'health point',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: '100',
              },
            },
          },
          // 预设克隆体数据JSON
          {
            opcode: 'presetDataforTheNextCloneInJSONFormat',
            blockType: BlockType.COMMAND,
            hideFromPalette: this.hideExtraBlocks,
            text: 'preset data of the next clone as JSON [DATA_JSON]',
            arguments: {
              DATA_JSON: {
                type: ArgumentType.STRING,
                defaultValue: '{"name":"common soldier","HP":100,"team":"red"}',
              },
            },
          },
          // 预设克隆体分组
          {
            opcode: 'presetGroupForTheNextClone',
            blockType: BlockType.COMMAND,
            text: 'preset the group to join for the next clone [GROUP]',
            arguments: {
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
            },
          },
          '---',
          // 克隆并指定ID
          {
            opcode: 'createCloneAndSpecifyID',
            blockType: BlockType.COMMAND,
            text: 'create clone of [TARGET] and set ID to [ID]',
            arguments: {
              TARGET: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_MENU_WITH_MYSELF',
              },
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          // 获取刚刚产生的克隆体的ID
          {
            opcode: 'getJustCreatedCloneID',
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: 'just created clone\'s ID',
          },
          {
            opcode: 'deleteCloneByID',
            blockType: BlockType.COMMAND,
            text: 'delete clone [ID]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          // 克隆体存在？
          {
            opcode: 'ifCloneExists',
            blockType: BlockType.BOOLEAN,
            text: 'clone [ID] exists?',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          '---📄 Data Access',
          // 读取我的信息：ID/x坐标/y坐标...
          {
            opcode: 'getMyProperty',
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: 'my [PROPERTY]',
            arguments: {
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_PROPERTY',
              },
            },
          },
          // 读取我的多莉Key数据
          {
            opcode: 'getMyValueByKey',
            blockType: BlockType.REPORTER,
            text: 'my [KEY]',
            arguments: {
              KEY: {
                type: ArgumentType.STRING,
                defaultValue: 'health point',
              },
            },
          },
          // 设置我的多莉Key数据
          {
            opcode: 'setOrChangeMyValueWithKey',
            blockType: BlockType.COMMAND,
            text: 'my [KEY] [OP] [VALUE]',
            arguments: {
              KEY: {
                type: ArgumentType.STRING,
                defaultValue: 'health point',
              },
              OP: {
                type: ArgumentType.STRING,
                menu: 'DATA_OPEATION_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: '100',
              },
            },
          },
          '---',
          // 读取克隆体的信息：ID/x坐标/y坐标...
          {
            opcode: 'getClonePropertyWithID',
            blockType: BlockType.REPORTER,
            text: '[PROPERTY] of clone [ID]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_PROPERTY',
                defaultValue: '_x',
              },
            },
          },
          // 读取克隆体的多莉Key数据
          {
            opcode: 'getValueOfCloneIDWithKey',
            blockType: BlockType.REPORTER,
            text: '[KEY] of clone [ID]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              KEY: {
                type: ArgumentType.STRING,
                defaultValue: 'health point',
              },
            },
          },
          // 设置克隆体的多莉Key数据
          {
            opcode: 'setOrChangeValueOfCloneIDWithKey',
            blockType: BlockType.COMMAND,
            text: '[KEY] of clone [ID] [OP] [VALUE]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              KEY: {
                type: ArgumentType.STRING,
                defaultValue: 'health point',
              },
              OP: {
                type: ArgumentType.STRING,
                menu: 'DATA_OPEATION_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: '100',
              },
            },
          },
          // 设置克隆体的property
          {
            opcode: 'setCloneProperty',
            blockType: BlockType.COMMAND,
            text: '[PROPERTY] of clone [ID] [OP] [VALUE]',
            hideFromPalette: this.hideExtraBlocks,
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'PRESET_PROPERTY',
              },
              OP: {
                type: ArgumentType.STRING,
                menu: 'DATA_OPEATION_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: '100',
              },
            },
          },
          '---📁 Clone Groups',
          // 将我加入/移出分组
          {
            opcode: 'addOrRemoveMyselfFromGroup',
            blockType: BlockType.COMMAND,
            filter: [TargetType.SPRITE],
            text: 'myself [OP] group [GROUP]',
            arguments: {
              OP: {
                type: ArgumentType.STRING,
                menu: 'ADD_OR_REMOVE',
              },
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
            },
          },
          // 将克隆体加入/移出分组
          {
            opcode: 'addOrRemoveIDFromGroup',
            blockType: BlockType.COMMAND,
            text: 'clone [ID] [OP] group [GROUP]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              OP: {
                type: ArgumentType.STRING,
                menu: 'ADD_OR_REMOVE',
              },
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
            },
          },
          // 克隆体在分组里吗？
          {
            opcode: 'ifCloneInGroup',
            blockType: BlockType.BOOLEAN,
            text: 'clone [ID] belongs to group [GROUP]?',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
            },
          },
          '---',
          // 获取分组信息：克隆体数/ID表
          {
            opcode: 'getGroupInfo',
            blockType: BlockType.REPORTER,
            text: '[PROPERTY] of clones in group [GROUP]',
            arguments: {
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'CLONE_PROPERTY',
              },
            },
          },
          // 获取分组中克隆体的ID/x/y/...
          {
            opcode: 'getClonePropertyInGroup',
            blockType: BlockType.REPORTER,
            text: '[PROPERTY] of #[INDEX] clone in group [GROUP]',
            arguments: {
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
              INDEX: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              PROPERTY: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_PROPERTY',
              },
            },
          },
          // 将分组中，克隆体的ID列表导入原版列表
          {
            opcode: 'importGroupIntoList',
            blockType: BlockType.COMMAND,
            text: '[OP] list [LIST] with IDs of clones in group [GROUP]',
            arguments: {
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
              OP: {
                type: ArgumentType.STRING,
                menu: 'LIST_OP_MENU',
              },
              LIST: {
                type: ArgumentType.STRING,
                menu: 'LIST_MENU',
              },
            },
          },
          // 遍历分组的每个克隆体
          {
            opcode: 'forEachWithGroup',
            blockType: BlockType.CONDITIONAL,
            text: ['⚠️for each clone in group [GROUP]'],
            branchCount: 1,
            hideFromPalette: this.hideExtraBlocks,
            arguments: {
              GROUP: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
            },
          },
          // 当前遍历的克隆体ID
          {
            opcode: 'cloneIDOfForEach',
            blockType: BlockType.REPORTER,
            hideFromPalette: this.hideExtraBlocks,
            text: '⚠️current clone ID',
            disableMonitor: true,
          },
          '---🔍 Sensing',
          // 获取分组..中最近克隆体ID
          {
            opcode: 'getNearestClone',
            blockType: BlockType.REPORTER,
            filter: [TargetType.SPRITE],
            text: 'get [TYPE] clone\'s ID [MENU] [VALUE]',
            arguments: {
              TYPE: {
                type: ArgumentType.STRING,
                menu: 'NEAREST_OR_FARTHEST',
              },
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
            },
          },
          // 判断是否碰到克隆体
          {
            opcode: 'isTouchingClone',
            blockType: BlockType.BOOLEAN,
            filter: [TargetType.SPRITE],
            text: 'touching a clone [MENU] [VALUE]',
            arguments: {
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          // 克隆体是否碰到克隆体
          {
            opcode: 'isCloneTouchingClone',
            blockType: BlockType.BOOLEAN,
            text: 'clone [ID] touching a clone [MENU] [VALUE]',
            hideFromPalette: this.hideExtraBlocks,
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'ID2',
              },
            },
          },
          // 获取碰到的克隆体ID
          {
            opcode: 'getTouchingID',
            blockType: BlockType.REPORTER,
            filter: [TargetType.SPRITE],
            text: '[TYPE] [MENU] [VALUE] I\'m touching',
            arguments: {
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
              TYPE: {
                type: ArgumentType.STRING,
                menu: 'ONE_OR_ALL_MENU',
              },
            },
          },
          // 将碰到的克隆体ID导入列表
          {
            opcode: 'importTouchingIDsIntoList',
            blockType: BlockType.COMMAND,
            filter: [TargetType.SPRITE],
            text: '[OP] list [LIST] with IDs of clones [MENU] [VALUE] I\'m touching',
            arguments: {
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'enemy',
              },
              OP: {
                type: ArgumentType.STRING,
                menu: 'LIST_OP_MENU',
              },
              LIST: {
                type: ArgumentType.STRING,
                menu: 'LIST_MENU',
              },
            },
          },
          // 判断克隆体是否碰到点xy
          {
            opcode: 'isCloneTouchingCoord',
            blockType: BlockType.BOOLEAN,
            hideFromPalette: this.hideExtraBlocks,
            text: 'clone [MENU] [VALUE] touching x: [X] y: [Y]?',
            arguments: {
              X: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              MENU: {
                type: ArgumentType.STRING,
                menu: 'SPRITE_OR_GROUP_OR_ID_MENU',
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          // 点xy最顶层的克隆体/角色ID
          {
            opcode: 'pickTarget',
            blockType: BlockType.REPORTER,
            hideFromPalette: this.hideExtraBlocks,
            text: 'ID of the top-most at x: [X] y: [Y]',
            arguments: {
              X: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          '---🚶 Motion',
          // 计算我到克隆体..的距离/方向/角度差/..
          {
            opcode: 'calcDistanceToClone',
            blockType: BlockType.REPORTER,
            filter: [TargetType.SPRITE],
            text: '[MENU] to clone [ID]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              MENU: {
                type: ArgumentType.STRING,
                menu: 'CALC_DIS_OR_DIR_MENU',
              },
            },
          },
          // 计算克隆体1到克隆体2的距离/方向/角度差/..
          {
            opcode: 'calcDistanceBetweenClones',
            blockType: BlockType.REPORTER,
            text: '[MENU] from clone1 [ID1] to clone2 [ID2]',
            arguments: {
              ID1: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              ID2: {
                type: ArgumentType.STRING,
                defaultValue: 'ID2',
              },
              MENU: {
                type: ArgumentType.STRING,
                menu: 'CALC_DIS_OR_DIR_MENU',
              },
            },
          },
          // 移到/面向克隆体
          {
            opcode: 'moveToClone',
            blockType: BlockType.COMMAND,
            filter: [TargetType.SPRITE],
            text: '[MOTION] clone [ID]',
            arguments: {
              MOTION: {
                type: ArgumentType.STRING,
                menu: 'MOVE_TO_OR_POINT_AT',
              },
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          // 朝克
          // 朝克隆体移动/旋转
          {
            opcode: 'moveStepsToClone',
            blockType: BlockType.COMMAND,
            filter: [TargetType.SPRITE],
            text: '[MOTION] [VALUE] towards clone [ID]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
              MOTION: {
                type: ArgumentType.STRING,
                menu: 'MOVE_OR_ROTATE',
              },
              VALUE: {
                type: ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          ...(!this.hideExtraBlocks ? ['---🚧 Experimental Blocks'] : []),
          // 修改我的ID
          {
            opcode: 'setMyID',
            blockType: BlockType.COMMAND,
            hideFromPalette: this.hideExtraBlocks,
            text: '⚠️modify my ID to [ID]',
            arguments: {
              ID: {
                type: ArgumentType.STRING,
                defaultValue: 'ID',
              },
            },
          },
          // 转移x/y/方向的访问
          {
            opcode: 'transferAccessToTargetXYToDollyDataKey',
            blockType: BlockType.COMMAND,
            hideFromPalette: this.hideExtraBlocks,
            text: 'transfer access to sprite coordinates and direction in the extension to the following key data: [X_NAME], [Y_NAME], [DIR_NAME] (optional)',
            arguments: {
              X_NAME: {
                type: ArgumentType.STRING,
                defaultValue: 'x',
              },
              Y_NAME: {
                type: ArgumentType.STRING,
                defaultValue: 'y',
              },
              DIR_NAME: {
                type: ArgumentType.STRING,
                defaultValue: 'direction',
              },
            },
          },
          // 取消x/y/方向的访问转移
          {
            opcode: 'cancelAccessTransfer',
            hideFromPalette: this.hideExtraBlocks,
            blockType: BlockType.COMMAND,
            text: 'cancel the transfer of coordinate/direction data access',
          },
        ],
        menus: {
          NEAREST_OR_FARTHEST: {
            items: [
              {
                text: 'nearest',
                value: 'nearest',
              },
              {
                text: 'farthest',
                value: 'farthest',
              },
            ],
          },
          MOVE_OR_ROTATE: {
            items: [
              {
                text: 'turn degrees',
                value: 'rotate',
              },
              {
                text: 'move steps',
                value: 'move',
              },
            ],
          },
          MOVE_TO_OR_POINT_AT: {
            items: [
              {
                text: 'point towards',
                value: 'pointAt',
              },
              {
                text: 'go to',
                value: 'moveTo',
              },
            ],
          },
          CALC_DIS_OR_DIR_MENU: {
            items: [
              {
                text: 'distance',
                value: 'dis',
              },
              {
                text: 'direction',
                value: 'dir',
              },
              {
                text: 'angular difference (signed)',
                value: 'angle',
              },
              {
                text: 'angular difference (positive)',
                value: 'absAngle',
              },
            ],
          },
          ADD_OR_REMOVE: {
            items: [
              {
                text: 'add to',
                value: 'add',
              },
              {
                text: 'remove from',
                value: 'remove',
              },
            ],
          },
          ONE_OR_ALL_MENU: {
            items: [
              {
                text: 'ID of one clone',
                value: 'one',
              },
              {
                text: 'IDs of all clones',
                value: 'all',
              },
            ],
          },
          SPRITE_OR_GROUP_OR_ID_MENU: {
            items: [
              {
                text: 'with ID',
                value: 'ID',
              },
              {
                text: 'in group',
                value: 'group',
              },
              {
                text: 'of sprite',
                value: 'sprite',
              },
            ],
          },
          SPRITE_OR_GROUP_MENU: {
            items: [
              {
                text: 'in group',
                value: 'group',
              },
              {
                text: 'of sprite',
                value: 'sprite',
              },
            ],
          },
          LIST_OP_MENU: {
            items: [
              {
                text: 'replace',
                value: 'replace',
              },
              {
                text: 'insert',
                value: 'insert',
              },
            ],
          },
          CLONE_OR_ORIGINAL_MENU: {
            items: [
              {
                text: 'a clone',
                value: 'clone',
              },
              {
                text: 'the original sprite',
                value: 'original',
              },
            ],
          },
          DATA_OPEATION_MENU: {
            items: [
              {
                text: 'set to',
                value: 'set',
              },
              {
                text: 'change by',
                value: 'change',
              },
            ],
          },
          SPRITE_MENU: {
            acceptReporters: false,
            items: 'spriteMenuWithEmptyChecking',
          },
          SPRITE_MENU_WITH_ALL: {
            acceptReporters: false,
            items: 'spriteMenuWithAll',
          },
          // These two menus accept reporters
          NEW_SPRITE_MENU: {
            acceptReporters: true,
            items: 'spriteMenuWithEmptyChecking',
          },
          NEW_SPRITE_MENU_WITH_ALL: {
            acceptReporters: true,
            items: 'spriteMenuWithAll',
          },
          SPRITE_MENU_WITH_ANY: {
            acceptReporters: false,
            items: 'spriteMenuWithAny',
          },
          SPRITE_MENU_WITH_MYSELF: {
            acceptReporters: true,
            items: 'spriteMenuWithMyself',
          },
          LIST_MENU: {
            acceptReporters: false,
            items: 'listMenu',
          },
          PRESET_PROPERTY: {
            acceptReporters: false,
            items: [
              {
                text: 'x position',
                value: 'x',
              },
              {
                text: 'y position',
                value: 'y',
              },
              {
                text: 'size',
                value: 'size',
              },
              {
                text: 'visible?',
                value: 'visible',
              },
              {
                text: 'direction',
                value: 'direction',
              },
              {
                text: 'costume name',
                value: 'currentCostumeName',
              },
              {
                text: 'color effect',
                value: 'color',
              },
              {
                text: 'fisheye effect',
                value: 'fisheye',
              },
              {
                text: 'whirl effect',
                value: 'whirl',
              },
              {
                text: 'pixelate effect',
                value: 'pixelate',
              },
              {
                text: 'mosaic effect',
                value: 'mosaic',
              },
              {
                text: 'brightness effect',
                value: 'brightness',
              },
              {
                text: 'ghost effect',
                value: 'ghost',
              },
            ],
          },
          SPRITE_PROPERTY: {
            items: 'spritePropertiesMenu',
          },
          CLONE_PROPERTY: {
            items: [
              {
                text: 'count',
                value: 'count',
              },
              {
                text: 'lists',
                value: 'IDList',
              },
            ],
          },
        },
      };
    }

    // ******************** ↓Extension configuration load & save (inspired by TurboWarp) ********************

    /** Find the extension configuration comment (in the stage area) */
    // Update these methods without changing the constructor
    findExtConfigComment() {
      if (!this.runtime) return undefined;
      const stage = this.runtime.getTargetForStage ? this.runtime.getTargetForStage() : null;
      if (!stage || !stage.comments) return undefined;
      return stage.comments[EXT_CONFIG_COMMENT_ID];
    }

    parseExtConfig() {
      if (!this.runtime) return false;
      let config = this.getAllExtConfig();
      if (!config) return false;
      config = config[extensionId];
      if (!config) return false;
      if ('hideExtraBlocks' in config) {
        this.hideExtraBlocks = Cast.toBoolean(config.hideExtraBlocks);
        if (this.runtime.emit) {
          this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
        }
      }
      return true;
    }
    /**
     * Generate the current extension configuration
     * @returns {object} Configuration information
     */
    generateExtConfig() {
      const options = {};
      options.hideExtraBlocks = this.hideExtraBlocks;
      return options;
    }

    storeExtConfig() {
      // Set configuration
      let config = this.getAllExtConfig();
      if (!config) config = {};
      config[extensionId] = this.generateExtConfig();

      const existingComment = this.findExtConfigComment();
      if (existingComment) {
        const lines = existingComment.text.split('\n');
        if (lines.length === 0) {
          lines.push('');
        }
        // Configuration information exists in the last line
        lines[lines.length - 1] = JSON.stringify(config);
        existingComment.text = lines.join('\n');
      } else {
        const target = this.runtime.getTargetForStage();
        const text = `Configuration for Arkos Extension(Inspired by TurboWarp)\nYou can move, resize, and minimize this comment, but better not edit it by hand. This comment can be deleted to remove the stored settings.\n${JSON.stringify(
          config,
        )}`;
        target.createComment(
          EXT_CONFIG_COMMENT_ID,
          null,
          text,
          1,
          1,
          400,
          200,
          false,
        );
      }
      this.runtime.emitProjectChanged();
    }

    logWarn(...args) {
      (this.runtime.logSystem?.warn ?? console.warn)(" [Dolly Pro] ", ...args);
    }

    logError(...args) {
      // Don't show warnings in player mode (convert to warn)
      if (this.runtime.isPlayerOnly) this.logWarn(...args);
      if (this.runtime.logSystem) {
        // error's red text is hard to read, still use warn
        this.runtime.logSystem.warn("[Dolly Pro]", ...args);
        this.runtime.logSystem.show();
      } else console.error("Dolly Pro: ", ...args);
    }

    // **************************** Dynamic Menus ****************************

    spritePropertiesMenu() {
      const menu = [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'x position',
          value: '_x',
        },
        {
          text: 'y position',
          value: '_y',
        },
        {
          text: 'sprite name',
          value: 'name',
        },
        {
          text: 'size',
          value: '_size',
        },
        {
          text: 'visible?',
          value: '_visible',
        },
        {
          text: 'direction',
          value: 'direction',
        },
        {
          text: 'costume number',
          value: 'currentCostume',
        },
        {
          text: 'costume name',
          value: 'currentCostumeName',
        },
        {
          text: 'data in JSON format',
          value: 'dataJSON',
        },
        {
          text: 'color effect',
          value: 'color',
        },
        {
          text: 'fisheye effect',
          value: 'fisheye',
        },
        {
          text: 'whirl effect',
          value: 'whirl',
        },
        {
          text: 'pixelate effect',
          value: 'pixelate',
        },
        {
          text: 'mosaic effect',
          value: 'mosaic',
        },
        {
          text: 'brightness effect',
          value: 'brightness',
        },
        {
          text: 'ghost effect',
          value: 'ghost',
        },
      ];
      // Integration with advanced data structures (get the object storing clone KV data)
      if (this.runtime.SafeObject) {
        menu.push({
          text: '🗄️data object',
          value: 'dataObj',
        });
      }
      return menu;
    }

    /**
     * Get the sprite menu
     * @returns {[{text: "sprite name", value: "sprite name"}]};
     */
    getSpriteMenu() {
      const { targets } = this.runtime;

      return targets
        .filter((target) => !target.isStage && target.isOriginal)
        .map((target) => ({
          text: target.sprite.name,
          value: target.sprite.name,
        }));
    }

    /**
     * Sprite menu with empty checking
     * @returns {[{text: "sprite name", value: "sprite name"}]};
     */
    spriteMenuWithEmptyChecking() {
      const menu = this.getSpriteMenu();
      if (menu.length === 0) {
        menu.push({
          text: '-',
          value: 'empty',
        });
      }
      return menu;
    }

    /**
     * Sprite menu (but with an "all sprites" option)
     * @returns {text: "sprite name", value: "sprite name"}[];
     */
    spriteMenuWithAll() {
      const menu = this.getSpriteMenu();
      menu.unshift({
        text: 'all sprites',
        value: '_all_',
      });
      return menu;
    }

    /**
     * Sprite menu (but with an "any sprite" option)
     * @returns {text: "sprite name", value: "sprite name"}[];
     */
    spriteMenuWithAny() {
      const menu = this.getSpriteMenu();
      menu.unshift({
        text: 'any sprite',
        value: '_all_',
      });
      return menu;
    }

    /**
     * Sprite menu (but with a "myself" option)
     * @returns {text: "sprite name", value: "sprite name"}[];
     */
    spriteMenuWithMyself() {
      const menu = this.spriteMenuWithEmptyChecking();
      // Current sprite name
      if (!this.runtime._editingTarget) return menu;
      const editingTargetName = this.runtime._editingTarget.sprite.name;
      // Remove self from list
      const index = menu.findIndex((item) => item.value === editingTargetName);
      if (index !== -1) {
        menu.splice(index, 1);
      }
      // Insert "myself" as first item in list
      if (this.runtime._editingTarget.isStage) return menu;
      menu.unshift({
        text: 'myself',
        value: '_myself_',
      });
      return menu;
    }

    /**
     * Scratch list menu
     * @returns {text: "list name", value: "list id"}[];
     */
    listMenu() {
      const menus = [];
      let { variables } = this.runtime._stageTarget;
      Object.keys(variables).forEach((variable) => {
        if (variables[variable].type === 'list') {
          menus.push({
            text: variables[variable].name,
            value: variables[variable].id,
          });
        }
      });
      try {
        variables = this.runtime._editingTarget.variables;
      } catch (e) {
        variables = 'error';
      }
      if (
        variables !== 'error'
        && this.runtime._editingTarget !== this.runtime._stageTarget
      ) {
        Object.keys(variables).forEach((variable) => {
          if (variables[variable].type === 'list') {
            menus.push({
              text: `[PRIVATE] ${variables[variable].name}`,
              value: variables[variable].id,
            });
          }
        });
      }
      if (menus.length === 0) {
        menus.push({
          text: '-',
          value: 'empty',
        });
      }
      return menus;
    }

    // ************************ ↓Utility Functions ************************

    /**
     * (If not previously hijacked) Hijack object's method
     * @param {*} obj
     * @param {string} funName Method name
     * @param {Function} newFun Injected method (of form (origFun, other params)=>{...})
     */
    tryHackedFunction(obj, funName, newFun) {
      if (!obj.dollyProOrigFun) {
        obj.dollyProOrigFun = {}; // Record original functions
      }
      if (!obj.dollyProOrigFun[funName]) {
        // Record original function
        obj.dollyProOrigFun[funName] = obj[funName];
      }
      const origFun = obj.dollyProOrigFun[funName];
      if (origFun.id !== this.id) {
        origFun.id = this.id;
        // Replace original method with new method
        obj[funName] = function (...args) {
          return newFun.call(this, origFun, ...args);
        };
      }
    }

    /**
     * Based on the obtained renderTarget instance, hijack its prototype RenderTarget methods
     * @param {Target} target
     */
    tryHackedRenderTarget(target) {
      const proto = Object.getPrototypeOf(target);
      this.tryHackedFunction(proto, 'initDrawable', this.hackedInitDrawable);
      this.tryHackedFunction(proto, 'dispose', this.hackedDispose);
    }

    /** Generate targetID
     * @param {Target} target Target to generate ID for
     * @param {string} specID (Optional) Specified ID
     * @returns {string} Generated ID, like sprite_name or clone_#
     */
    generateTargetID(target, specID) {
      let ID;
      // If ID is specified, use specified ID
      if (specID !== undefined) {
        ID = specID;
      } else if (target.isStage) {
        ID = 'stage';
      } else if (target.isOriginal) {
        this.nextSpriteIDCount += 1;
        ID = `sprite_${this.nextSpriteIDCount}`;
      } else {
        this.nextCloneIDCount += 1;
        ID = `clone_${this.nextCloneIDCount}`;
      }
      // If same ID already exists, use original ID
      if (Object.prototype.hasOwnProperty.call(this.IDtoTargets, ID)) {
        ID = target.id;
      }
      return ID;
    }

    /**
     * Inject Dolly data into target (clone/sprite) (if not already injected)
     * @param {ITarget} target Target to inject
     * @param {string} ID Custom ID (defaults to target's original id)
     */
    injectDollyTarget(target, ID) {
      // Already injected, exit
      if (target.DollyPro) return;

      // Inject Dolly data
      target.DollyPro = {
        ID: this.generateTargetID(target, ID), // Clone's Dolly ID (defaults to original target.id if not specified)
        extraData: Object.create(null), // Clone's KV data
        isInGroup: Object.create(null), // Record whether in a group, e.g. isInGroup["enemy"] == true
      };
      // Add to ID mapping table
      this.IDtoTargets[target.DollyPro.ID] = target;
    }

    /**
     * Get target by ID
     * @param {string} ID Clone's virtual ID
     * @returns {ITarget} Target object corresponding to ID
     */
    getTargetByID(ID) {
      // First check ID mapping table
      if (Object.prototype.hasOwnProperty.call(this.IDtoTargets, ID)) {
        return this.IDtoTargets[ID];
      }
      // If not found in ID table, use original method
      const target = this.runtime.getTargetById(ID);
      if (target) {
        this.injectDollyTarget(target);
        return target;
      }
      return undefined;
    }

    /** Read target's ID */
    getIDOfTarget(target) {
      if (!target.DollyPro) this.injectDollyTarget(target);
      return target.DollyPro.ID;
    }

    /** Read target's extraData */
    getExtraDataOfTarget(target) {
      if (!target.DollyPro) this.injectDollyTarget(target);
      return target.DollyPro.extraData;
    }

    /** After clone creation, perform some processing (including reading preset data, triggering hat) */
    processCloneBeforeCreation(target) {
      // Read preset KV data
      target.DollyPro.extraData = { ...this.clonePresetData };
      // Set prototype to null
      Object.setPrototypeOf(target.DollyPro.extraData, null);
      // Join preset groups
      const ID = this.getIDOfTarget(target);

      Object.keys(this.clonePresetGroups).forEach((group) => {
        if (this.clonePresetGroups[group]) {
          target.DollyPro.isInGroup[group] = true;
          const list = this.getOrCreateGroupByName(group);
          list.push(ID);
        }
      });

      // Read preset properties (x, y, direction, etc.)
      Object.keys(this.clonePresetProperties).forEach((prop) => {
        this.opPropertyOfTarget(
          target,
          prop,
          'set',
          this.clonePresetProperties[prop],
        );
      });

      // After reading, clear preset data
      this.clonePresetData = {};
      this.clonePresetProperties = {};
      this.clonePresetGroups = {};

      // Broadcast clone creation hat
      this.runtime.startHatsWithParams(`${extensionId}_dispatchWhenCloned`, {
        parameters: { ID },
        fields: { TARGET: target.sprite.name },
      });
      this.runtime.startHatsWithParams(`${extensionId}_dispatchWhenCloned`, {
        parameters: { ID },
        fields: { TARGET: '_all_' },
      });
    }

    /**
     * Before removing target (sprite/clone), handle affairs
     * @param {ITarget} target Target about to be removed
     */
    processTargetBeforeDeletion(target) {
      let ID;
      if (!target.DollyPro) {
        // If target hasn't joined Dolly system
        ID = target.id;
      } else {
        // If target has joined Dolly system
        ID = target.DollyPro.ID;
        // If target is a clone
        if (!target.isOriginal) {
          // Broadcast "a sprite's clone has been deleted" hat block
          this.runtime.startHatsWithParams(
            `${extensionId}_dispatchWhenCloneDeleted`,
            {
              parameters: { ID },
              fields: { TARGET: target.sprite.name },
            },
          );
          this.runtime.startHatsWithParams(
            `${extensionId}_dispatchWhenCloneDeleted`,
            {
              parameters: { ID },
              fields: { TARGET: '_all_' },
            },
          );
          // Mark clone as being deleted
          target.DollyPro.isDeleting = true;
          // Trigger "this clone is about to be deleted" hat block
          const threads = this.runtime.startHats(
            `${extensionId}_beforeDeletionOfTheClone`,
            null,
            target,
          );
          // Immediately execute that hat (clone is deleted immediately after executing this hat)
          if (threads) {
            threads.forEach((thread) => {
              this.runtime.sequencer.stepThread(thread);
            });
          }
        }

        // Remove target from clone groups
        Object.keys(target.DollyPro.isInGroup).forEach((group) => {
          const list = this.getGroupByName(group);
          if (!list) return;
          const idx = list.indexOf(ID);
          if (idx === -1) return;
          list.splice(idx, 1);
        });
      }
      // Remove target from ID mapping table
      delete this.IDtoTargets[ID];
    }

    /**
     * Read target's x,y,direction
     * @param {ITarget} target Target to read from
     * @param  {...string} props Content to read, e.g. 'x','y','direction'
     * @returns {[number]} Read results, like [123,123]
     */
    getTargetXYDir(target, ...props) {
      const res = [];
      props.forEach((prop) => {
        const key = this.accessTransfer[prop];
        if (key && !target.isPoint) res.push(this.getDataOfTarget(target, key));
        else {
          res.push(target[prop]);
        }
      });
      if (res.length < 2) return res[0];
      return res;
    }

    /** Cycle clamp (e.g. 11 clamped to 1~10 returns 1) */
    wrapClamp(n, min, max) {
      const range = max - min + 1;
      return n - Math.floor((n - min) / range) * range;
    }

    /** Regular clamp */
    clamp(n, min, max) {
      return Math.min(Math.max(n, min), max);
    }

    /**
     * Set target's x,y,direction
     * @param {ITarget} target Target to set
     * @param  {object} props Content to set, like {x:['set',123], y:['change',123], direction:['set',123]}
     */
    setTargetXYDir(target, props) {
      let newX;
      let newY;
      Object.keys(props).forEach((prop) => {
        const op = props[prop][0];
        const value = props[prop][1];
        const key = this.accessTransfer[prop];
        if (key) {
          this.setOrChangeDataOfTarget(target, key, op, value);
          if (prop === 'direction') {
            const dir = this.wrapClamp(
              this.getDataOfTarget(target, key),
              -179,
              180,
            );
            this.setOrChangeDataOfTarget(target, key, 'set', dir);
          }
        } else {
          switch (prop) {
            case 'x':
              if (op === 'set') newX = value;
              else newX = target._x + value;
              break;
            case 'y':
              if (op === 'set') newY = value;
              else newY = target._y + value;
              break;
            case 'direction':
              if (op === 'set') target.setDirection(value);
              else target.setDirection(target.direction + value);
              break;
            default:
              break;
          }
        }
      });
      if (newX !== undefined || newY !== undefined) {
        target.setXY(newX ?? target.x, newY ?? target.y);
      }
    }

    /**
     * Get clone group (don't auto-create)
     * @param {String} groupName Group name
     * @return {[[ID: string]]} Clone group ID list
     */
    getGroupByName(groupName) {
      return this.groupsOfClones[groupName];
    }

    /**
     * Get clone group (create group if it doesn't exist)
     * @param {String} groupName Group name
     * @return {[[ID: string]]} Clone group ID list
     */
    getOrCreateGroupByName(groupName) {
      if (!Object.prototype.hasOwnProperty.call(this.groupsOfClones, groupName)) {
        this.groupsOfClones[groupName] = [];
      }
      return this.groupsOfClones[groupName];
    }

    /**
     * Add target to group
     * @param {ITarget} target Target to add
     * @param {string} group Group name
     */
    addTargetToGroup(target, group) {
      if (!target.DollyPro) this.injectDollyTarget(target);
      // Already in group, return directly
      if (target.DollyPro.isInGroup[group]) return;
      // Mark as joined group
      target.DollyPro.isInGroup[group] = true;
      // Get clone group list, create if doesn't exist
      const list = this.getOrCreateGroupByName(group);
      const ID = this.getIDOfTarget(target);
      if (list.includes(ID)) return;
      list.push(ID);
    }

    /**
     * Remove target from group
     * @param {ITarget} target Target to remove
     * @param {string} group Group name
     */
    removeTargetFromGroup(target, group) {
      if (!target.DollyPro) this.injectDollyTarget(target);
      // Not in group, return directly
      if (!target.DollyPro.isInGroup[group]) return;
      // Mark as removed from group
      delete target.DollyPro.isInGroup[group];
      // Get clone group list
      const list = this.getGroupByName(group);
      // If group doesn't exist, return directly
      if (!list) return;
      const ID = this.getIDOfTarget(target);
      const idx = list.indexOf(ID);
      // Target not in group, return directly
      if (idx === -1) return;
      // Remove target from group
      list.splice(idx, 1);
    }

    /**
     * Get data of target
     * @param {ITarget} target Target to get data from
     * @param {string} key Data key
     * @returns {any} Data value
     */
    getDataOfTarget(target, key) {
      // If target not in Dolly system, inject it
      if (!target.DollyPro) this.injectDollyTarget(target);
      return target.DollyPro.extraData[key];
    }

    /**
     * Set or change data of target
     * @param {ITarget} target Target to set data
     * @param {string} key Data key
     * @param {string} op Operation: 'set' or 'change'
     * @param {any} value Data value
     */
    setOrChangeDataOfTarget(target, key, op, value) {
      // If target not in Dolly system, inject it
      if (!target.DollyPro) this.injectDollyTarget(target);
      if (op === 'set') {
        target.DollyPro.extraData[key] = value;
      } else if (op === 'change') {
        const oldVal = Cast.toNumber(target.DollyPro.extraData[key] || 0);
        target.DollyPro.extraData[key] = oldVal + Cast.toNumber(value);
      }
    }

    /**
     * Get or set property of target (such as x, y, direction, etc.)
     * @param {ITarget} target Target to operate on
     * @param {string} property Property name (x, y, direction, etc.)
     * @param {string} op Operation: 'get', 'set', or 'change'
     * @param {any} value Value to set (when op is 'set' or 'change')
     * @returns {any} Property value (when op is 'get')
     */
    opPropertyOfTarget(target, property, op, value) {
      // Handle different properties
      switch (property) {
        case 'x':
          if (op === 'get') return this.getTargetXYDir(target, 'x');
          this.setTargetXYDir(target, { x: [op, Cast.toNumber(value)] });
          return undefined;
        case 'y':
          if (op === 'get') return this.getTargetXYDir(target, 'y');
          this.setTargetXYDir(target, { y: [op, Cast.toNumber(value)] });
          return undefined;
        case 'direction':
          if (op === 'get') return this.getTargetXYDir(target, 'direction');
          this.setTargetXYDir(target, { direction: [op, Cast.toNumber(value)] });
          return undefined;
        case 'size':
        case '_size':
          if (op === 'get') return target.size;
          if (op === 'set') target.setSize(Cast.toNumber(value));
          else target.setSize(target.size + Cast.toNumber(value));
          return undefined;
        case 'visible':
        case '_visible':
          if (op === 'get') return target.visible;
          if (op === 'set') target.setVisible(Cast.toBoolean(value));
          return undefined;
        case 'currentCostume':
          if (op === 'get') return target.currentCostume;
          if (op === 'set') {
            const idx = Cast.toNumber(value) - 1; // Convert to 0-indexed
            const clampedIdx = this.wrapClamp(
              idx,
              0,
              target.getCostumes().length - 1
            );
            target.setCostume(clampedIdx);
          } else {
            const idx = target.currentCostume + Cast.toNumber(value);
            const clampedIdx = this.wrapClamp(
              idx,
              0,
              target.getCostumes().length - 1
            );
            target.setCostume(clampedIdx);
          }
          return undefined;
        case 'currentCostumeName':
          if (op === 'get') return target.getCostumes()[target.currentCostume].name;
          if (op === 'set' || op === 'change') {
            const costumes = target.getCostumes();
            // Find costume by name
            for (let i = 0; i < costumes.length; i++) {
              if (costumes[i].name === value) {
                target.setCostume(i);
                break;
              }
            }
          }
          return undefined;
        case 'color':
        case 'fisheye':
        case 'whirl':
        case 'pixelate':
        case 'mosaic':
        case 'brightness':
        case 'ghost':
          if (op === 'get') return target.effects[property];
          if (op === 'set') target.setEffect(property, Cast.toNumber(value));
          else target.changeEffect(property, Cast.toNumber(value));
          return undefined;
        default:
          this.logWarn(`Unsupported property: ${property}`);
          return undefined;
      }
    }

    // ************************ ↓Block Implementations ************************

    /**
     * Whether I am a clone/original
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {boolean} Whether I am a clone/original
     */
    isCloneOrIsOriginal(args, util) {
      const { target } = util;
      switch (args.TYPE) {
        case 'clone':
          return !target.isOriginal;
        case 'original':
          return target.isOriginal;
        default:
          return false;
      }
    }

    /**
     * Process clone initialization hat
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {boolean} Always true
     */
    initTheClone(args, util) {
      return !util.target.isOriginal;
    }

    /**
     * Process clone deletion hat
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {boolean} Always true
     */
    beforeDeletionOfTheClone(args, util) {
      return !util.target.isOriginal;
    }

    /**
     * Create a clone and specify its ID
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    createCloneAndSpecifyID(args, util) {
      let target = args.TARGET;
      if (target === '_myself_') {
        target = util.target.sprite.name;
      }
      const targetObj = this.runtime.getSpriteTargetByName(target);
      if (!targetObj) return;

      // Generate clone
      const newTarget = targetObj.makeClone();
      if (!newTarget) return;

      // Set ID
      const ID = Cast.toString(args.ID);
      this.injectDollyTarget(newTarget, ID);
    }

    /**
     * Get ID of just created clone
     * @returns {string} ID of just created clone
     */
    getJustCreatedCloneID() {
      return this.justCreatedCloneID;
    }

    /**
     * Delete clone by ID
     * @param {object} args Block arguments
     */
    deleteCloneByID(args) {
      const ID = Cast.toString(args.ID);
      const target = this.getTargetByID(ID);
      if (!target) return;
      if (target.isStage) return; // Can't delete stage
      if (target.isOriginal) return; // Can't delete sprite original
      target.deleteThisClone();
    }

    /**
     * Check if clone exists
     * @param {object} args Block arguments
     * @returns {boolean} Whether clone exists
     */
    ifCloneExists(args) {
      const ID = Cast.toString(args.ID);
      const target = this.getTargetByID(ID);
      return !!target;
    }

    /**
     * Preset a property for the next clone
     * @param {object} args Block arguments
     */
    presetPropertyForTheNextClone(args) {
      const property = args.PROPERTY;
      const value = args.VALUE;
      this.clonePresetProperties[property] = value;
    }

    /**
     * Preset data for the next clone
     * @param {object} args Block arguments
     */
    presetSingleDataForTheNextClone(args) {
      const key = Cast.toString(args.KEY);
      const value = args.VALUE;
      this.clonePresetData[key] = value;
    }

    /**
     * Preset data for the next clone in JSON format
     * @param {object} args Block arguments
     */
    presetDataforTheNextCloneInJSONFormat(args) {
      let json;
      try {
        json = JSON.parse(args.DATA_JSON);
      } catch (e) {
        this.logError('Invalid JSON format:', args.DATA_JSON);
        return;
      }
      Object.keys(json).forEach((key) => {
        this.clonePresetData[key] = json[key];
      });
    }

    /**
     * Preset group for the next clone
     * @param {object} args Block arguments
     */
    presetGroupForTheNextClone(args) {
      const group = Cast.toString(args.GROUP);
      this.clonePresetGroups[group] = true;
    }

    /**
     * Get my property
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {any} Property value
     */
    getMyProperty(args, util) {
      const { target } = util;
      const property = args.PROPERTY;
      
      // Use different methods for different properties
      switch (property) {
        case 'id':
          return this.getIDOfTarget(target);
        case 'name':
          return target.sprite.name;
        case 'dataJSON':
          return JSON.stringify(this.getExtraDataOfTarget(target));
        case 'dataObj':
          if (this.runtime.SafeObject) {
            const obj = new this.runtime.SafeObject();
            const data = this.getExtraDataOfTarget(target);
            Object.keys(data).forEach(key => {
              obj[key] = data[key];
            });
            return obj;
          }
          return undefined;
        default:
          return this.opPropertyOfTarget(target, property, 'get');
      }
    }

    /**
     * Get my value by key
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {any} Value
     */
    getMyValueByKey(args, util) {
      const key = Cast.toString(args.KEY);
      const { target } = util;
      return this.getDataOfTarget(target, key);
    }

    /**
     * Set or change my value with key
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    setOrChangeMyValueWithKey(args, util) {
      const key = Cast.toString(args.KEY);
      const { target } = util;
      const op = args.OP;
      const value = args.VALUE;
      this.setOrChangeDataOfTarget(target, key, op, value);
    }

    /**
     * Get clone property with ID
     * @param {object} args Block arguments
     * @returns {any} Property value
     */
    getClonePropertyWithID(args) {
      const ID = Cast.toString(args.ID);
      const property = args.PROPERTY;
      const target = this.getTargetByID(ID);
      if (!target) return '';

      // Use different methods for different properties
      switch (property) {
        case 'id':
          return this.getIDOfTarget(target);
        case 'name':
          return target.sprite.name;
        case 'dataJSON':
          return JSON.stringify(this.getExtraDataOfTarget(target));
        case 'dataObj':
          if (this.runtime.SafeObject) {
            const obj = new this.runtime.SafeObject();
            const data = this.getExtraDataOfTarget(target);
            Object.keys(data).forEach(key => {
              obj[key] = data[key];
            });
            return obj;
          }
          return undefined;
        default:
          return this.opPropertyOfTarget(target, property, 'get');
      }
    }

    /**
     * Get value of clone ID with key
     * @param {object} args Block arguments
     * @returns {any} Value
     */
    getValueOfCloneIDWithKey(args) {
      const ID = Cast.toString(args.ID);
      const key = Cast.toString(args.KEY);
      const target = this.getTargetByID(ID);
      if (!target) return '';
      return this.getDataOfTarget(target, key);
    }

    /**
     * Set or change value of clone ID with key
     * @param {object} args Block arguments
     */
    setOrChangeValueOfCloneIDWithKey(args) {
      const ID = Cast.toString(args.ID);
      const key = Cast.toString(args.KEY);
      const op = args.OP;
      const value = args.VALUE;
      const target = this.getTargetByID(ID);
      if (!target) return;
      this.setOrChangeDataOfTarget(target, key, op, value);
    }

    /**
     * Set clone property
     * @param {object} args Block arguments
     */
    setCloneProperty(args) {
      const ID = Cast.toString(args.ID);
      const property = args.PROPERTY;
      const op = args.OP;
      const value = args.VALUE;
      const target = this.getTargetByID(ID);
      if (!target) return;
      this.opPropertyOfTarget(target, property, op, value);
    }

    /**
     * Add or remove myself from group
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    addOrRemoveMyselfFromGroup(args, util) {
      const op = args.OP;
      const group = Cast.toString(args.GROUP);
      const { target } = util;
      if (op === 'add') {
        this.addTargetToGroup(target, group);
      } else {
        this.removeTargetFromGroup(target, group);
      }
    }

    /**
     * Add or remove ID from group
     * @param {object} args Block arguments
     */
    addOrRemoveIDFromGroup(args) {
      const ID = Cast.toString(args.ID);
      const op = args.OP;
      const group = Cast.toString(args.GROUP);
      const target = this.getTargetByID(ID);
      if (!target) return;
      if (op === 'add') {
        this.addTargetToGroup(target, group);
      } else {
        this.removeTargetFromGroup(target, group);
      }
    }

    /**
     * Check if clone is in group
     * @param {object} args Block arguments
     * @returns {boolean} Whether clone is in group
     */
    ifCloneInGroup(args) {
      const ID = Cast.toString(args.ID);
      const group = Cast.toString(args.GROUP);
      const target = this.getTargetByID(ID);
      if (!target) return false;
      if (!target.DollyPro) return false;
      return !!target.DollyPro.isInGroup[group];
    }

    /**
     * Get group info
     * @param {object} args Block arguments
     * @returns {any} Group info
     */
    getGroupInfo(args) {
      const group = Cast.toString(args.GROUP);
      const property = args.PROPERTY;
      const list = this.getGroupByName(group) || [];
      switch (property) {
        case 'count':
          return list.length;
        case 'IDList':
          return JSON.stringify(list);
        default:
          return '';
      }
    }

    /**
     * Get clone property in group
     * @param {object} args Block arguments
     * @returns {any} Property value
     */
    getClonePropertyInGroup(args) {
      const group = Cast.toString(args.GROUP);
      const index = Cast.toNumber(args.INDEX) - 1; // Convert to 0-indexed
      const property = args.PROPERTY;
      const list = this.getGroupByName(group) || [];
      if (index < 0 || index >= list.length) return '';
      const ID = list[index];
      const target = this.getTargetByID(ID);
      if (!target) return '';

      // Use different methods for different properties
      switch (property) {
        case 'id':
          return this.getIDOfTarget(target);
        case 'name':
          return target.sprite.name;
        case 'dataJSON':
          return JSON.stringify(this.getExtraDataOfTarget(target));
        default:
          return this.opPropertyOfTarget(target, property, 'get');
      }
    }

    /**
     * Import group into list
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    importGroupIntoList(args, util) {
      const group = Cast.toString(args.GROUP);
      const op = args.OP;
      const listId = args.LIST;
      if (listId === 'empty') return;
      const list = this.getGroupByName(group) || [];
      const scratchList = util.target.lookupVariableById(listId);
      if (!scratchList) return;
      
      if (op === 'replace') {
        scratchList.value = list.slice();
      } else if (op === 'insert') {
        scratchList.value.push(...list);
      }
    }

    /**
     * For each with group
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    forEachWithGroup(args, util) {
      const group = Cast.toString(args.GROUP);
      const list = this.getGroupByName(group) || [];
      const branch = util.thread.peekStackFrame().executionContext;
      const ID = util.thread.id;
      
      if (typeof branch.loopCounter === 'undefined') {
        // First execution: initialize
        branch.loopCounter = 0;
      } else {
        // Subsequent executions: increment
        branch.loopCounter++;
      }
      
      if (branch.loopCounter < list.length) {
        // Record current index for cloneIDOfForEach block
        this.forEachIndex[ID] = list[branch.loopCounter];
        return true; // Continue loop
      }
      
      // Loop completed, clean up
      delete this.forEachIndex[ID];
      return false;
    }

    /**
     * Get clone ID of forEach
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {string} Clone ID
     */
    cloneIDOfForEach(args, util) {
      const ID = util.thread.id;
      return this.forEachIndex[ID] || '';
    }

    /**
     * Broadcast to clone
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    broadcastToClone(args, util) {
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      const msg = Cast.toString(args.MSG);
      const data = args.data;
      const senderID = this.getIDOfTarget(util.target);
      
      let targetIDs = [];
      
      switch (menu) {
        case 'ID':
          targetIDs = [value];
          break;
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        case 'sprite':
          const targets = this.runtime.targets;
          for (const target of targets) {
            if (target.sprite && target.sprite.name === value) {
              const ID = this.getIDOfTarget(target);
              targetIDs.push(ID);
            }
          }
          break;
        default:
          break;
      }
      
      for (const ID of targetIDs) {
        const target = this.getTargetByID(ID);
        if (!target) continue;
        
        this.runtime.startHatsWithParams(`${extensionId}_receiveMyBroadcast`, {
          parameters: { data, senderID },
          fields: { MSG: msg },
        }, target);
      }
    }

    /**
     * Receive my broadcast
     * @param {object} args Block arguments
     * @returns {boolean} Always true
     */
    receiveMyBroadcast(args) {
      return true; // This is a hat block, always returns true
    }

    /**
     * Get nearest clone
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {string} Nearest clone ID
     */
    getNearestClone(args, util) {
      const { target } = util;
      const type = args.TYPE;
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      
      let targetIDs = [];
      
      switch (menu) {
        case 'sprite':
          const targets = this.runtime.targets;
          for (const t of targets) {
            if (t.sprite && t.sprite.name === value && !t.isStage) {
              const ID = this.getIDOfTarget(t);
              targetIDs.push(ID);
            }
          }
          break;
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        default:
          break;
      }
      
      if (targetIDs.length === 0) return '';
      
      const myX = this.getTargetXYDir(target, 'x');
      const myY = this.getTargetXYDir(target, 'y');
      let bestDistance = Infinity;
      let bestID = '';
      
      for (const ID of targetIDs) {
        const t = this.getTargetByID(ID);
        if (!t || t === target) continue;
        
        const tx = this.getTargetXYDir(t, 'x');
        const ty = this.getTargetXYDir(t, 'y');
        const dx = tx - myX;
        const dy = ty - myY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (type === 'nearest' && distance < bestDistance) {
          bestDistance = distance;
          bestID = ID;
        } else if (type === 'farthest' && distance > bestDistance) {
          bestDistance = distance;
          bestID = ID;
        }
      }
      
      return bestID;
    }

    /**
     * Is touching clone
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {boolean} Whether touching clone
     */
    isTouchingClone(args, util) {
      const { target } = util;
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      
      let targetIDs = [];
      
      switch (menu) {
        case 'ID':
          targetIDs = [value];
          break;
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        case 'sprite':
          const targets = this.runtime.targets;
          for (const t of targets) {
            if (t.sprite && t.sprite.name === value && !t.isStage) {
              const ID = this.getIDOfTarget(t);
              targetIDs.push(ID);
            }
          }
          break;
        default:
          break;
      }
      
      for (const ID of targetIDs) {
        const t = this.getTargetByID(ID);
        if (!t || t === target || t.isStage) continue;
        
        const isTouching = target.isTouchingObject(t.drawableID);
        if (isTouching) return true;
      }
      
      return false;
    }

    /**
     * Is clone touching clone
     * @param {object} args Block arguments
     * @returns {boolean} Whether clone is touching clone
     */
    isCloneTouchingClone(args) {
      const ID1 = Cast.toString(args.ID);
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      
      const target1 = this.getTargetByID(ID1);
      if (!target1 || target1.isStage) return false;
      
      let targetIDs = [];
      
      switch (menu) {
        case 'ID':
          targetIDs = [value];
          break;
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        case 'sprite':
          const targets = this.runtime.targets;
          for (const t of targets) {
            if (t.sprite && t.sprite.name === value && !t.isStage) {
              const ID = this.getIDOfTarget(t);
              targetIDs.push(ID);
            }
          }
          break;
        default:
          break;
      }
      
      for (const ID of targetIDs) {
        if (ID === ID1) continue; // Skip self
        
        const target2 = this.getTargetByID(ID);
        if (!target2 || target2.isStage) continue;
        
        const isTouching = target1.isTouchingObject(target2.drawableID);
        if (isTouching) return true;
      }
      
      return false;
    }

    /**
     * Get touching ID
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {string|any} Touching ID(s)
     */
    getTouchingID(args, util) {
      const { target } = util;
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      const type = args.TYPE;
      
      let targetIDs = [];
      
      switch (menu) {
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        case 'sprite':
          const targets = this.runtime.targets;
          for (const t of targets) {
            if (t.sprite && t.sprite.name === value && !t.isStage) {
              const ID = this.getIDOfTarget(t);
              targetIDs.push(ID);
            }
          }
          break;
        default:
          break;
      }
      
      const touchingIDs = [];
      
      for (const ID of targetIDs) {
        const t = this.getTargetByID(ID);
        if (!t || t === target || t.isStage) continue;
        
        const isTouching = target.isTouchingObject(t.drawableID);
        if (isTouching) {
          if (type === 'one') return ID;
          touchingIDs.push(ID);
        }
      }
      
      return type === 'one' ? '' : JSON.stringify(touchingIDs);
    }

    /**
     * Import touching IDs into list
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    importTouchingIDsIntoList(args, util) {
      const { target } = util;
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      const op = args.OP;
      const listId = args.LIST;
      
      if (listId === 'empty') return;
      
      let targetIDs = [];
      
      switch (menu) {
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        case 'sprite':
          const targets = this.runtime.targets;
          for (const t of targets) {
            if (t.sprite && t.sprite.name === value && !t.isStage) {
              const ID = this.getIDOfTarget(t);
              targetIDs.push(ID);
            }
          }
          break;
        default:
          break;
      }
      
      const touchingIDs = [];
      
      for (const ID of targetIDs) {
        const t = this.getTargetByID(ID);
        if (!t || t === target || t.isStage) continue;
        
        const isTouching = target.isTouchingObject(t.drawableID);
        if (isTouching) {
          touchingIDs.push(ID);
        }
      }
      
      const scratchList = util.target.lookupVariableById(listId);
      if (!scratchList) return;
      
      if (op === 'replace') {
        scratchList.value = touchingIDs.slice();
      } else if (op === 'insert') {
        scratchList.value.push(...touchingIDs);
      }
    }

    /**
     * Is clone touching coordinate
     * @param {object} args Block arguments
     * @returns {boolean} Whether clone is touching coordinate
     */
    isCloneTouchingCoord(args) {
      const menu = args.MENU;
      const value = Cast.toString(args.VALUE);
      const x = Cast.toNumber(args.X);
      const y = Cast.toNumber(args.Y);
      
      let targetIDs = [];
      
      switch (menu) {
        case 'ID':
          targetIDs = [value];
          break;
        case 'group':
          const list = this.getGroupByName(value) || [];
          targetIDs = list.slice();
          break;
        case 'sprite':
          const targets = this.runtime.targets;
          for (const t of targets) {
            if (t.sprite && t.sprite.name === value && !t.isStage) {
              const ID = this.getIDOfTarget(t);
              targetIDs.push(ID);
            }
          }
          break;
        default:
          break;
      }
      
      for (const ID of targetIDs) {
        const target = this.getTargetByID(ID);
        if (!target || target.isStage) continue;
        
        const isTouching = this.runtime.renderer.isTouchingDrawables(
          target.drawableID,
          [x, y]
        );
        
        if (isTouching) return true;
      }
      
      return false;
    }

    /**
     * Pick target at coordinates
     * @param {object} args Block arguments
     * @returns {string} Target ID
     */
    pickTarget(args) {
      const x = Cast.toNumber(args.X);
      const y = Cast.toNumber(args.Y);
      
      const drawableID = this.runtime.renderer.pick(x, y);
      if (drawableID === null) return '';
      
      const target = this.runtime.getTargetByDrawableID(drawableID);
      if (!target) return '';
      
      return this.getIDOfTarget(target);
      }

    /**
     * Calculate distance to clone
     * @param {object} args Block arguments
     * @param {object} util Block utility
     * @returns {number} Distance/direction/angle
     */
    calcDistanceToClone(args, util) {
      const { target } = util;
      const ID = Cast.toString(args.ID);
      const menu = args.MENU;
      
      const cloneTarget = this.getTargetByID(ID);
      if (!cloneTarget) return 0;
      
      const myX = this.getTargetXYDir(target, 'x');
      const myY = this.getTargetXYDir(target, 'y');
      const cloneX = this.getTargetXYDir(cloneTarget, 'x');
      const cloneY = this.getTargetXYDir(cloneTarget, 'y');
      
      switch (menu) {
        case 'dis':
          // Calculate distance
          const dx = cloneX - myX;
          const dy = cloneY - myY;
          return Math.sqrt(dx * dx + dy * dy);
        case 'dir':
          // Calculate direction
          const direction = Math.atan2(cloneY - myY, cloneX - myX) * 180 / Math.PI;
          return this.wrapClamp(direction + 90, -179, 180);
        case 'angle':
          // Calculate angular difference (signed)
          const dir1 = this.getTargetXYDir(target, 'direction');
          const dir2 = Math.atan2(cloneY - myY, cloneX - myX) * 180 / Math.PI + 90;
          const angle = dir2 - dir1;
          return this.wrapClamp(angle, -179, 180);
        case 'absAngle':
          // Calculate angular difference (positive)
          const myDir = this.getTargetXYDir(target, 'direction');
          const targetDir = Math.atan2(cloneY - myY, cloneX - myX) * 180 / Math.PI + 90;
          let angleDiff = targetDir - myDir;
          angleDiff = this.wrapClamp(angleDiff, -179, 180);
          return Math.abs(angleDiff);
        default:
          return 0;
      }
    }

    /**
     * Calculate distance between clones
     * @param {object} args Block arguments
     * @returns {number} Distance/direction/angle
     */
    calcDistanceBetweenClones(args) {
      const ID1 = Cast.toString(args.ID1);
      const ID2 = Cast.toString(args.ID2);
      const menu = args.MENU;
      
      const target1 = this.getTargetByID(ID1);
      const target2 = this.getTargetByID(ID2);
      if (!target1 || !target2) return 0;
      
      const x1 = this.getTargetXYDir(target1, 'x');
      const y1 = this.getTargetXYDir(target1, 'y');
      const x2 = this.getTargetXYDir(target2, 'x');
      const y2 = this.getTargetXYDir(target2, 'y');
      
      switch (menu) {
        case 'dis':
          // Calculate distance
          const dx = x2 - x1;
          const dy = y2 - y1;
          return Math.sqrt(dx * dx + dy * dy);
        case 'dir':
          // Calculate direction
          const direction = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          return this.wrapClamp(direction + 90, -179, 180);
        case 'angle':
          // Calculate angular difference (signed)
          const dir1 = this.getTargetXYDir(target1, 'direction');
          const dir2 = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 90;
          const angle = dir2 - dir1;
          return this.wrapClamp(angle, -179, 180);
        case 'absAngle':
          // Calculate angular difference (positive)
          const myDir = this.getTargetXYDir(target1, 'direction');
          const targetDir = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 90;
          let angleDiff = targetDir - myDir;
          angleDiff = this.wrapClamp(angleDiff, -179, 180);
          return Math.abs(angleDiff);
        default:
          return 0;
      }
    }

    /**
     * Move to clone or point towards clone
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    moveToClone(args, util) {
      const { target } = util;
      const motion = args.MOTION;
      const ID = Cast.toString(args.ID);
      
      const cloneTarget = this.getTargetByID(ID);
      if (!cloneTarget) return;
      
      const cloneX = this.getTargetXYDir(cloneTarget, 'x');
      const cloneY = this.getTargetXYDir(cloneTarget, 'y');
      
      if (motion === 'moveTo') {
        this.setTargetXYDir(target, {
          x: ['set', cloneX],
          y: ['set', cloneY]
        });
      } else if (motion === 'pointAt') {
        const myX = this.getTargetXYDir(target, 'x');
        const myY = this.getTargetXYDir(target, 'y');
        const dx = cloneX - myX;
        const dy = cloneY - myY;
        const direction = Math.atan2(dy, dx) * 180 / Math.PI + 90;
        this.setTargetXYDir(target, {
          direction: ['set', direction]
        });
      }
    }

    /**
     * Move steps towards clone or rotate towards clone
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    moveStepsToClone(args, util) {
      const { target } = util;
      const motion = args.MOTION;
      const value = Cast.toNumber(args.VALUE);
      const ID = Cast.toString(args.ID);
      
      const cloneTarget = this.getTargetByID(ID);
      if (!cloneTarget) return;
      
      const myX = this.getTargetXYDir(target, 'x');
      const myY = this.getTargetXYDir(target, 'y');
      const cloneX = this.getTargetXYDir(cloneTarget, 'x');
      const cloneY = this.getTargetXYDir(cloneTarget, 'y');
      
      const dx = cloneX - myX;
      const dy = cloneY - myY;
      const direction = Math.atan2(dy, dx) * 180 / Math.PI + 90;
      
      if (motion === 'move') {
        // Calculate distance
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return;
        
        // Calculate step size (limit to distance)
        const steps = Math.min(value, distance);
        
        // Calculate new position
        const angle = direction * Math.PI / 180;
        const cosAngle = Math.cos(angle - Math.PI / 2);
        const sinAngle = Math.sin(angle - Math.PI / 2);
        const newX = myX + steps * cosAngle;
        const newY = myY + steps * sinAngle;
        
        this.setTargetXYDir(target, {
          x: ['set', newX],
          y: ['set', newY]
        });
      } else if (motion === 'rotate') {
        // Get current direction
        const myDir = this.getTargetXYDir(target, 'direction');
        
        // Calculate angular difference
        let angleDiff = direction - myDir;
        angleDiff = this.wrapClamp(angleDiff, -179, 180);
        
        // Limit rotation amount
        const rotation = Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), Math.abs(value));
        
        this.setTargetXYDir(target, {
          direction: ['change', rotation]
        });
      }
    }

    /**
     * Set my ID (risky)
     * @param {object} args Block arguments
     * @param {object} util Block utility
     */
    setMyID(args, util) {
      const { target } = util;
      const ID = Cast.toString(args.ID);
      
      // Check if ID already exists
      if (Object.prototype.hasOwnProperty.call(this.IDtoTargets, ID) && 
          this.IDtoTargets[ID] !== target) {
        this.logError(`ID "${ID}" already exists, cannot change ID.`);
        return;
      }
      
      // Remove old ID from mapping
      delete this.IDtoTargets[target.DollyPro.ID];
      
      // Set new ID
      target.DollyPro.ID = ID;
      
      // Add new ID to mapping
      this.IDtoTargets[ID] = target;
    }

    /**
     * Transfer access to target x/y/direction to Dolly data key
     * @param {object} args Block arguments
     */
    transferAccessToTargetXYToDollyDataKey(args) {
      const xName = Cast.toString(args.X_NAME);
      const yName = Cast.toString(args.Y_NAME);
      const dirName = Cast.toString(args.DIR_NAME);
      
      this.accessTransfer.x = xName === '' ? null : xName;
      this.accessTransfer.y = yName === '' ? null : yName;
      this.accessTransfer.direction = dirName === '' ? null : dirName;
    }

    /**
     * Cancel access transfer
     */
    cancelAccessTransfer() {
      this.accessTransfer.x = null;
      this.accessTransfer.y = null;
      this.accessTransfer.direction = null;
    }

    /**
     * Get clone target property with sprite name
     * @param {object} args Block arguments
     * @returns {any} Property value
     */
    getCloneTargetPropertyWithSpriteName2(args) {
      const property = args.PROPERTY;
      const targetName = args.TARGET;
      
      if (targetName === '_all_') {
        // Handle all sprites
        const allClones = [];
        for (const target of this.runtime.targets) {
          if (target.isStage) continue;
          if (property === 'count') {
            // Count all clones (including originals)
            allClones.push(target);
          } else {
            // Get IDs of all clones
            const ID = this.getIDOfTarget(target);
            allClones.push(ID);
          }
        }
        
        if (property === 'count') {
          return allClones.length;
        } else {
          return JSON.stringify(allClones);
        }
      }
      
      let count = 0;
      const cloneIDs = [];
      
      for (const target of this.runtime.targets) {
        if (target.sprite && target.sprite.name === targetName) {
          count++;
          const ID = this.getIDOfTarget(target);
          cloneIDs.push(ID);
        }
      }
      
      if (property === 'count') {
        return count;
      } else {
        return JSON.stringify(cloneIDs);
      }
    }

    /**
     * Get original target property with sprite name
     * @param {object} args Block arguments
     * @returns {any} Property value
     */
    getOriginalTargetPropertyWithSpriteName2(args) {
      const property = args.PROPERTY;
      const targetName = args.TARGET;
      
      let originalTarget = null;
      
      for (const target of this.runtime.targets) {
        if (target.sprite && target.sprite.name === targetName && target.isOriginal) {
          originalTarget = target;
          break;
        }
      }
      
      if (!originalTarget) return '';
      
      // Use different methods for different properties
      switch (property) {
        case 'id':
          return this.getIDOfTarget(originalTarget);
        case 'name':
          return originalTarget.sprite.name;
        case 'dataJSON':
          return JSON.stringify(this.getExtraDataOfTarget(originalTarget));
        default:
          return this.opPropertyOfTarget(originalTarget, property, 'get');
      }
    }

    /**
     * Dispatch when cloned hat
     * @param {object} args Block arguments
     * @returns {boolean} Whether to trigger hat
     */
    dispatchWhenCloned(args) {
      return true; // This is a hat block, always returns true
    }

    /**
     * Dispatch when clone deleted hat
     * @param {object} args Block arguments
     * @returns {boolean} Whether to trigger hat
     */
    dispatchWhenCloneDeleted(args) {
      return true; // This is a hat block, always returns true
    }
  }
  // Safe registration
    const safeRuntime = (
      (typeof vm !== 'undefined' && vm && vm.runtime) || 
      (typeof Scratch !== 'undefined' && Scratch.vm && Scratch.vm.runtime) || 
      null
    );

    if (safeRuntime) {
      registerExtension(safeRuntime);
    } else {
      // Listen for the vm_loaded event
      document.addEventListener('vm_loaded', () => {
        const vmRuntime = (typeof vm !== 'undefined' && vm && vm.runtime) || 
                        (typeof Scratch !== 'undefined' && Scratch.vm && Scratch.vm.runtime) || 
                        null;
        if (vmRuntime) {
          registerExtension(vmRuntime);
        } else {
          console.warn('Failed to load Dolly Pro extension: Runtime not available');
        }
      });
    }

    function registerExtension(runtime) {
      try {
        const extensionInstance = new dollyProExtension(runtime);
        
        if (typeof Scratch !== 'undefined' && Scratch.extensions) {
          Scratch.extensions.register(extensionInstance);
        } else if (typeof vm !== 'undefined' && vm.extensionManager) {
          vm.extensionManager._loadedExtensions.set(extensionId, extensionInstance);
        }
      } catch (error) {
        console.error('Failed to register Dolly Pro extension:', error);
      }
    }
})(Scratch);