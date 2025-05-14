const loadTweakpane = new Promise((resolve, reject) => {
    if (window.Tweakpane) return resolve()

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js"
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
})

loadTweakpane.then(() => {
    (function(Scratch) {
        'use strict';

        const i = "Cappu.panel";
        
            class PanelGUIExtension {
                constructor(runtime) {
                    this.runtime = runtime;
                    this._formatMessage = runtime.getFormatMessage({
                        en: {
                            name: "PanelGUI",
                            openDocs: "📖 Open Docs",
                            docsUrl: "https://getgandi.com/extensions/panelgui",
                            "tag.props": "📊 Properties",
                            "tag.value": "🔍 Value",
                            "tag.control": "🕹️ Control",
                            "tag.style": "🎨 Style",
                            "tag.style.help": "📖 Style Help",
                            "block.createGUI.message": "Create panel [NAME]",
                            "block.createGUI2.message": "Create panel [NAME] at [POSITION]",
                            "block.addStringPropertyTo.message": "Add string [PROPERTY] to [NAME] with default [DEFVAL]",
                            "block.addNumberPropertyTo.message": "Add number [PROPERTY] to [NAME] with default [DEFVAL]",
                            "block.addNumberPropertyTo2.message": "Add number [PROPERTY] to [NAME] with default [DEFVAL] min [MIN] max [MAX] step [STEP]",
                            "block.addBooleanPropertyTo.message": "Add boolean [PROPERTY] to [NAME] with default [DEFVAL]",
                            "block.addOptionsPropertyTo.message": "Add options [PROPERTY] to [NAME] with default [DEFVAL] and options [OPTIONS]",
                            "block.addButtonTo.message": "Add button [TITLE] to [NAME]",
                            "block.delProperty.message": "Delete property [PROPERTY] from [NAME]",
                            "block.readValue.message": "Read JSON value of panel [NAME]",
                            "block.readProperty.message": "Read property [PROPERTY] of panel [NAME]",
                            "block.listenProperty.message": "Listen to property [PROPERTY] of panel [NAME]",
                            "block.whenPropertyChange.message": "When property [PROPERTY] of panel [NAME] changes to [VALUE]",
                            "block.whenButtonClicked.message": "When button [TITLE] of panel [NAME] is clicked",
                            "block.mergeJSONToValue.message": "Merge JSON [DATA] into panel [NAME]",
                            "block.showGUI.message": "Show panel [NAME]",
                            "block.hideGUI.message": "Hide panel [NAME]",
                            "block.destroyGUI.message": "Destroy panel [NAME]",
                            "block.hideProperty.message": "[SHOW] property [PROPERTY] of panel [NAME]",
                            "block.disableProperty.message": "[ENABLE] property [PROPERTY] of panel [NAME]",
                            "block.setPanelStyle.message": "Set panel [NAME] style: property [PROPERTY] to [VALUE]",
                            "menu.positionTopRight": "Top Right",
                            "menu.positionCenter": "Center",
                            "menu.positionTopLeft": "Top Left",
                            "menu.positionBottomLeft": "Bottom Left",
                            "menu.positionBottomRight": "Bottom Right",
                            "menu.show": "Show",
                            "menu.hide": "Hide",
                            "menu.enable": "Enable",
                            "menu.disable": "Disable"
                        },
                        "zh-cn": {
                            name: "面板GUI",
                            openDocs: "📖 打开文档",
                            docsUrl: "https://getgandi.com/extensions/panelgui",
                            "tag.props": "📊 属性",
                            "tag.value": "🔍 值",
                            "tag.control": "🕹️ 控制",
                            "tag.style": "🎨 样式",
                            "tag.style.help": "📖 样式帮助",
                            "block.createGUI.message": "创建面板 [NAME]",
                            "block.createGUI2.message": "创建面板 [NAME] 位于 [POSITION]",
                            "block.addStringPropertyTo.message": "在 [NAME] 中添加字符串 [PROPERTY] 默认值 [DEFVAL]",
                            "block.addNumberPropertyTo.message": "在 [NAME] 中添加数字 [PROPERTY] 默认值 [DEFVAL]",
                            "block.addNumberPropertyTo2.message": "在 [NAME] 中添加数字 [PROPERTY] 默认值 [DEFVAL] 最小值 [MIN] 最大值 [MAX] 步长 [STEP]",
                            "block.addBooleanPropertyTo.message": "在 [NAME] 中添加布尔 [PROPERTY] 默认值 [DEFVAL]",
                            "block.addOptionsPropertyTo.message": "在 [NAME] 中添加选项 [PROPERTY] 默认值 [DEFVAL] 选项 [OPTIONS]",
                            "block.addButtonTo.message": "在 [NAME] 中添加按钮 [TITLE]",
                            "block.delProperty.message": "从 [NAME] 中删除属性 [PROPERTY]",
                            "block.readValue.message": "读取面板 [NAME] 的 JSON 值",
                            "block.readProperty.message": "读取面板 [NAME] 的属性 [PROPERTY]",
                            "block.listenProperty.message": "监听 [NAME] 的属性 [PROPERTY]",
                            "block.whenPropertyChange.message": "当监听到面板 [NAME] 的属性 [PROPERTY] 变为 [VALUE] 时",
                            "block.whenButtonClicked.message": "当监听到面板 [NAME] 的按钮 [TITLE] 被点击时",
                            "block.mergeJSONToValue.message": "将 JSON [DATA] 合并到面板 [NAME]",
                            "block.showGUI.message": "显示面板 [NAME]",
                            "block.hideGUI.message": "隐藏面板 [NAME]",
                            "block.destroyGUI.message": "销毁面板 [NAME]",
                            "block.hideProperty.message": "[SHOW] [NAME] 的属性 [PROPERTY]",
                            "block.disableProperty.message": "[ENABLE] [NAME] 的属性 [PROPERTY]",
                            "block.setPanelStyle.message": "设置面板 [NAME] 样式: 属性 [PROPERTY] 为 [VALUE]",
                            "menu.positionTopRight": "右上角",
                            "menu.positionCenter": "中间",
                            "menu.positionTopLeft": "左上角",
                            "menu.positionBottomLeft": "左下角",
                            "menu.positionBottomRight": "右下角",
                            "menu.show": "显示",
                            "menu.hide": "隐藏",
                            "menu.enable": "启用",
                            "menu.disable": "禁用"
                        }
                    });

                    this._inputParent = function() {
                        try {
                            const canvas = this.runtime.renderer.canvas;
                            if (canvas instanceof HTMLCanvasElement)
                                return canvas.parentElement;
                        } catch (e) {
                            return null;
                        }
                    };

                    this.gui = {};
                }

                fm(e) {
                    return this._formatMessage({
                        id: `${i}.${e}`,
                        default: `${i}.${e}`,
                        description: `${i}.${e}`
                    });
                }

                getHats() {
                    return {
                        "Cappu.panel_whenPropertyChange": {},
                        "Cappu.panel_whenButtonClicked": {}
                    };
                }

                getInfo() {
                    const createGUI = {
                        hideFromPalette: true,
                        opcode: "createGUI",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.createGUI.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const createGUI2 = {
                        opcode: "createGUI2",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.createGUI2.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            POSITION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "POSITION"
                            }
                        }
                    };

                    const addStringPropertyTo = {
                        opcode: "addStringPropertyTo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.addStringPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "str"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello"
                            }
                        }
                    };

                    const addNumberPropertyTo = {
                        opcode: "addNumberPropertyTo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.addNumberPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "num"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    };

                    const addNumberPropertyTo2 = {
                        opcode: "addNumberPropertyTo2",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.addNumberPropertyTo2.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "num2"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            MIN: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            MAX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            STEP: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    };

                    const addBooleanPropertyTo = {
                        opcode: "addBooleanPropertyTo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.addBooleanPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "bool"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "true"
                            }
                        }
                    };

                    const addOptionsPropertyTo = {
                        opcode: "addOptionsPropertyTo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.addOptionsPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "option"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            OPTIONS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"one":1,"two":2,"three":3}'
                            },
                            DEFVAL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1"
                            }
                        }
                    };

                    const addButtonTo = {
                        opcode: "addButtonTo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.addButtonTo.message"),
                        arguments: {
                            TITLE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "button"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const delProperty = {
                        opcode: "delProperty",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.delProperty.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "str"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const readValue = {
                        opcode: "readValue",
                        blockType: Scratch.BlockType.REPORTER,
                        text: this.fm("block.readValue.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const readProperty = {
                        opcode: "readProperty",
                        blockType: Scratch.BlockType.REPORTER,
                        text: this.fm("block.readProperty.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "str"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const listenProperty = {
                        opcode: "listenProperty",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.listenProperty.message"),
                        arguments: {
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "str"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const whenPropertyChange = {
                        opcode: "whenPropertyChange",
                        blockType: Scratch.BlockType.HAT,
                        isEdgeActivated: false,
                        text: this.fm("block.whenPropertyChange.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.CCW_HAT_PARAMETER
                            },
                            PROPERTY: {
                                type: Scratch.ArgumentType.CCW_HAT_PARAMETER
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.CCW_HAT_PARAMETER
                            }
                        }
                    };

                    const whenButtonClicked = {
                        opcode: "whenButtonClicked",
                        blockType: Scratch.BlockType.HAT,
                        isEdgeActivated: false,
                        text: this.fm("block.whenButtonClicked.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.CCW_HAT_PARAMETER
                            },
                            TITLE: {
                                type: Scratch.ArgumentType.CCW_HAT_PARAMETER
                            }
                        }
                    };

                    const mergeJSONToValue = {
                        opcode: "mergeJSONToValue",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.mergeJSONToValue.message"),
                        arguments: {
                            DATA: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "{}"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const showGUI = {
                        opcode: "showGUI",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.showGUI.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const hideGUI = {
                        opcode: "hideGUI",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.hideGUI.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const destroyGUI = {
                        opcode: "destroyGUI",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.destroyGUI.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const hideProperty = {
                        opcode: "hideProperty",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.hideProperty.message"),
                        arguments: {
                            SHOW: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SHOW"
                            },
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "str"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const disableProperty = {
                        opcode: "disableProperty",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.disableProperty.message"),
                        arguments: {
                            ENABLE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ENABLE"
                            },
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "str"
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            }
                        }
                    };

                    const setPanelStyle = {
                        opcode: "setPanelStyle",
                        blockType: Scratch.BlockType.COMMAND,
                        text: this.fm("block.setPanelStyle.message"),
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "setting"
                            },
                            PROPERTY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "--tp-base-background-color"
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hsla(0, 0%, 10%, 0.8)"
                            }
                        }
                    };

                    return {
                        id: i,
                        name: this.fm("name"),
                        docsURI: this.fm("docsUrl"),
                        blockIconURI: "https://static.xiguacity.cn/h1t86b7fg6c7k36wnt0cb30m/static/assets/icon.17ea9d07.png",
                        menuIconURI: "https://static.xiguacity.cn/h1t86b7fg6c7k36wnt0cb30m/static/assets/icon.17ea9d07.png",
                        color1: "#56b98f",
                        color2: "#56b98f",
                        blocks: [
                            "---" + this.fm("tag.props"),
                            createGUI,
                            createGUI2,
                            addStringPropertyTo,
                            addNumberPropertyTo,
                            addNumberPropertyTo2,
                            addBooleanPropertyTo,
                            addOptionsPropertyTo,
                            addButtonTo,
                            delProperty,
                            "---" + this.fm("tag.value"),
                            readValue,
                            readProperty,
                            listenProperty,
                            whenPropertyChange,
                            whenButtonClicked,
                            mergeJSONToValue,
                            "---" + this.fm("tag.control"),
                            showGUI,
                            hideGUI,
                            destroyGUI,
                            hideProperty,
                            disableProperty,
                            "---" + this.fm("tag.style"),
                            {
                                blockType: Scratch.BlockType.BUTTON,
                                text: this.fm("tag.style.help"),
                                onClick: function() {
                                    window.open("https://tweakpane.github.io/docs/theming/#builder");
                                }
                            },
                            setPanelStyle
                        ],
                        menus: {
                            SHOW: {
                                acceptReporters: true,
                                items: [
                                    { text: this.fm("menu.hide"), value: "0" },
                                    { text: this.fm("menu.show"), value: "1" }
                                ]
                            },
                            ENABLE: {
                                acceptReporters: true,
                                items: [
                                    { text: this.fm("menu.disable"), value: "0" },
                                    { text: this.fm("menu.enable"), value: "1" }
                                ]
                            },
                            POSITION: {
                                acceptReporters: true,
                                items: [
                                    { text: this.fm("menu.positionTopRight"), value: "topRight" },
                                    { text: this.fm("menu.positionCenter"), value: "center" },
                                    { text: this.fm("menu.positionTopLeft"), value: "topLeft" },
                                    { text: this.fm("menu.positionBottomLeft"), value: "bottomLeft" },
                                    { text: this.fm("menu.positionBottomRight"), value: "bottomRight" }
                                ]
                            }
                        }
                    };
                }

                _updatePosition(name) {
                    const gui = this.gui[name] || {};
                    const pane = gui.pane;
                    const position = gui.position;
                    const scale = gui.scale || 1;

                    if (pane) {
                        pane.element.style.position = "absolute";
                        switch (position) {
                            case "topLeft":
                                pane.element.style.top = "10px";
                                pane.element.style.bottom = "";
                                pane.element.style.left = "10px";
                                pane.element.style.right = "";
                                pane.element.style.transform = `scale(${scale})`;
                                pane.element.style.transformOrigin = "top left";
                                break;
                            case "bottomLeft":
                                pane.element.style.top = "";
                                pane.element.style.bottom = "10px";
                                pane.element.style.left = "10px";
                                pane.element.style.right = "";
                                pane.element.style.transform = `scale(${scale})`;
                                pane.element.style.transformOrigin = "bottom left";
                                break;
                            case "bottomRight":
                                pane.element.style.top = "";
                                pane.element.style.bottom = "10px";
                                pane.element.style.left = "";
                                pane.element.style.right = "10px";
                                pane.element.style.transform = `scale(${scale})`;
                                pane.element.style.transformOrigin = "bottom right";
                                break;
                            case "center":
                                pane.element.style.top = "50%";
                                pane.element.style.bottom = "";
                                pane.element.style.left = "50%";
                                pane.element.style.right = "";
                                pane.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
                                pane.element.style.transformOrigin = "";
                                break;
                            case "topRight":
                                pane.element.style.top = "10px";
                                pane.element.style.bottom = "";
                                pane.element.style.left = "";
                                pane.element.style.right = "10px";
                                pane.element.style.transform = `scale(${scale})`;
                                pane.element.style.transformOrigin = "top right";
                        }
                        pane.element.style.zIndex = "48";

                        if (!this.resizeObserver) {
                            this.resizeObserver = new ResizeObserver(entries => {
                                entries.forEach(entry => {
                                    const width = entry.contentRect.width;
                                    Object.keys(this.gui).forEach(key => {
                                        const gui = this.gui[key];
                                        if (this._inputParent() !== gui.pane.containerElem_) {
                                            this.destroyGUI({ NAME: key });
                                            this.resizeObserver.disconnect();
                                            this.resizeObserver = undefined;
                                        } else {
                                            gui.scale = width / 600;
                                            this._updatePosition(key);
                                        }
                                    });
                                });
                            });
                            this.resizeObserver.observe(this._inputParent(), { attributes: true, attributeFilter: ["style"] });
                        }
                    }
                }

                createGUI(args) {
                    this.createGUI2({ NAME: args.NAME, POSITION: "topRight" });
                }

                createGUI2(args) {
                    const name = args.NAME;
                    const position = args.POSITION;

                    if (this.gui.hasOwnProperty(name)) {
                        this.gui[name].position = position;
                        return this._updatePosition(name);
                    }

                    const pane = new Tweakpane.Pane({
                        title: name,
                        container: this._inputParent()
                    });

                    this.gui[name] = {
                        pane: pane,
                        obj: {},
                        controllers: {},
                        position: position,
                        scale: this._inputParent().offsetWidth / 600
                    };

                    this._updatePosition(name);
                }

                addStringPropertyTo(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const defVal = args.DEFVAL;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        if (gui.obj.hasOwnProperty(property)) {
                            this.delProperty({ PROPERTY: property, NAME: name });
                        }
                        gui.obj[property] = String(defVal);
                        gui.controllers[property] = gui.pane.addBinding(gui.obj, property);
                    }
                }

                addNumberPropertyTo(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const defVal = args.DEFVAL;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        if (gui.obj.hasOwnProperty(property)) {
                            this.delProperty({ PROPERTY: property, NAME: name });
                        }
                        gui.obj[property] = Number(defVal);
                        gui.controllers[property] = gui.pane.addBinding(gui.obj, property, { step: 1 });
                    }
                }

                addNumberPropertyTo2(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const defVal = args.DEFVAL;
                    const min = args.MIN;
                    const max = args.MAX;
                    const step = args.STEP;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        if (gui.obj.hasOwnProperty(property)) {
                            this.delProperty({ PROPERTY: property, NAME: name });
                        }
                        gui.obj[property] = Number(defVal);
                        gui.controllers[property] = gui.pane.addBinding(gui.obj, property, {
                            min: Number(min),
                            max: Number(max),
                            step: Number(step)
                        });
                    }
                }

                addBooleanPropertyTo(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const defVal = args.DEFVAL;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        if (gui.obj.hasOwnProperty(property)) {
                            this.delProperty({ PROPERTY: property, NAME: name });
                        }
                        gui.obj[property] = Boolean(defVal === "true");
                        gui.controllers[property] = gui.pane.addBinding(gui.obj, property);
                    }
                }

                addOptionsPropertyTo(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const optionsStr = args.OPTIONS;
                    const defValStr = args.DEFVAL;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        if (gui.obj.hasOwnProperty(property)) {
                            this.delProperty({ PROPERTY: property, NAME: name });
                        }

                        let options;
                        let defVal;

                        try {
                            options = JSON.parse(optionsStr);
                        } catch (e) {
                            options = {};
                        }

                        try {
                            defVal = JSON.parse(defValStr);
                        } catch (e) {
                            defVal = defValStr;
                        }

                        gui.obj[property] = defVal;
                        gui.controllers[property] = gui.pane.addBinding(gui.obj, property, { options });
                    }
                }

                addButtonTo(args) {
                    const title = args.TITLE;
                    const name = args.NAME;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        if (gui.controllers.hasOwnProperty(title)) {
                            this.delProperty({ PROPERTY: title, NAME: name });
                        }

                        const button = gui.pane.addButton({ title });
                        button.on('click', () => {
                            this.runtime.startHats('Cappu.panel_whenButtonClicked', {
                                NAME: name,
                                TITLE: title
                            });
                        });

                        gui.controllers[title] = button;
                    }
                }

                delProperty(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        const controller = gui.controllers[property];
                        if (controller) {
                            gui.pane.remove(controller);
                            delete gui.controllers[property];
                            delete gui.obj[property];
                        }
                    }
                }

                readValue(args) {
                    const name = args.NAME;
                    const obj = (this.gui[name] || {}).obj;
                    return obj ? JSON.stringify(obj) : '';
                }

                readProperty(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const obj = (this.gui[name] || {}).obj;
                    return obj && obj.hasOwnProperty(property) ? obj[property] : '';
                }

                listenProperty(args) {
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        const controller = gui.controllers[property];
                        if (controller) {
                            controller.on('change', e => {
                                if (e.last) {
                                    this.runtime.startHats('Cappu.panel_whenPropertyChange', {
                                        NAME: name,
                                        PROPERTY: property,
                                        VALUE: e.value
                                    });
                                }
                            });
                        }
                    }
                }

                whenPropertyChange() {
                    return true;
                }

                whenButtonClicked() {
                    return true;
                }

                mergeJSONToValue(args) {
                    const name = args.NAME;
                    const dataStr = args.DATA;
                    const gui = this.gui[name] || {};

                    if (gui.pane) {
                        let data;

                        try {
                            data = JSON.parse(dataStr);
                        } catch (e) {
                            return;
                        }

                        Object.keys(data).forEach(key => {
                            if (gui.obj.hasOwnProperty(key)) {
                                gui.obj[key] = data[key];
                                const controller = gui.controllers[key];
                                if (controller) {
                                    controller.refresh();
                                }
                            } else {
                                gui.obj[key] = data[key];
                                gui.controllers[key] = gui.pane.addBinding(gui.obj, key);
                            }
                        });
                    }
                }

                showGUI(args) {
                    const name = args.NAME;
                    const pane = (this.gui[name] || {}).pane;
                    if (pane) {
                        pane.hidden = false;
                    }
                }

                hideGUI(args) {
                    const name = args.NAME;
                    const pane = (this.gui[name] || {}).pane;
                    if (pane) {
                        pane.hidden = true;
                    }
                }

                destroyGUI(args) {
                    const name = args.NAME;
                    const pane = (this.gui[name] || {}).pane;
                    if (pane) {
                        pane.dispose();
                        delete this.gui[name];
                    }
                }

                hideProperty(args) {
                    const show = args.SHOW;
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const controllers = (this.gui[name] || {}).controllers;

                    if (controllers) {
                        const controller = controllers[property];
                        if (controller) {
                            controller.hidden = show !== "1";
                        }
                    }
                }

                disableProperty(args) {
                    const enable = args.ENABLE;
                    const property = args.PROPERTY;
                    const name = args.NAME;
                    const controllers = (this.gui[name] || {}).controllers;

                    if (controllers) {
                        const controller = controllers[property];
                        if (controller) {
                            controller.disabled = enable !== "1";
                        }
                    }
                }

                setPanelStyle(args) {
                    const name = args.NAME;
                    const property = args.PROPERTY;
                    const value = args.VALUE;
                    const pane = (this.gui[name] || {}).pane;

                    if (pane && property.startsWith('--tp-')) {
                        pane.element.style.setProperty(property, value);
                    }
                }
            }

            // Ensure the runtime is passed correctly
            Scratch.extensions.register(new PanelGUIExtension(Scratch.vm));
        })(Scratch)
    });