"use strict";
(self.webpackChunkscratch_extensions = self.webpackChunkscratch_extensions || []).push([[4213], {
    16969: (e, t, o) => {
        o.r(t),
        o.d(t, {
            default: () => u
        });
        var a = o(83392)
          , n = o.n(a)
          , s = o(62264)
          , r = o(72798);
        function l(e, t) {
            for (var o = 0; o < t.length; o++) {
                var a = t[o];
                a.enumerable = a.enumerable || !1,
                a.configurable = !0,
                "value"in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a)
            }
        }
        var i = "Cappu.panel";
        const u = function() {
            function e(t) {
                var o;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.runtime = t,
                this._formatMessage = (o = {
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
                        "block.listenProperty.message": "Listen to property [PROPERTY] of [NAME]",
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
                },
                Object.keys(o).forEach((function(e) {
                    var t = o[e];
                    o[e] = {},
                    Object.keys(t).forEach((function(a) {
                        o[e]["".concat(i, ".").concat(a)] = t[a]
                    }
                    ))
                }
                )),
                this.runtime.getFormatMessage(o)),
                this._inputParent = function() {
                    try {
                        var e = t.renderer.canvas;
                        if (e instanceof HTMLCanvasElement)
                            return e.parentElement
                    } catch (e) {
                        return null
                    }
                }
                ,
                this.gui = {}
            }
            var t, o;
            return t = e,
            (o = [{
                key: "fm",
                value: function(e) {
                    return e = "".concat(i, ".").concat(e),
                    this._formatMessage({
                        id: e,
                        default: e,
                        description: e
                    })
                }
            }, {
                key: "getHats",
                value: function() {
                    return {
                        "Cappu.panel_whenPropertyChange": {},
                        "Cappu.panel_whenButtonClicked": {}
                    }
                }
            }, {
                key: "getInfo",
                value: function() {
                    var e = {
                        hideFromPalette: !0,
                        opcode: "createGUI",
                        blockType: "command",
                        text: this.fm("block.createGUI.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , t = {
                        opcode: "createGUI2",
                        blockType: "command",
                        text: this.fm("block.createGUI2.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            POSITION: {
                                type: "string",
                                menu: "POSITION"
                            }
                        }
                    }
                      , o = {
                        opcode: "addStringPropertyTo",
                        blockType: "command",
                        text: this.fm("block.addStringPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "str"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: "string",
                                defaultValue: "hello"
                            }
                        }
                    }
                      , a = {
                        opcode: "addNumberPropertyTo",
                        blockType: "command",
                        text: this.fm("block.addNumberPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "num"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: "number",
                                defaultValue: 0
                            }
                        }
                    }
                      , n = {
                        opcode: "addNumberPropertyTo2",
                        blockType: "command",
                        text: this.fm("block.addNumberPropertyTo2.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "num2"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: "number",
                                defaultValue: 0
                            },
                            MIN: {
                                type: "number",
                                defaultValue: 0
                            },
                            MAX: {
                                type: "number",
                                defaultValue: 100
                            },
                            STEP: {
                                type: "number",
                                defaultValue: 1
                            }
                        }
                    }
                      , s = {
                        opcode: "addBooleanPropertyTo",
                        blockType: "command",
                        text: this.fm("block.addBooleanPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "bool"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            DEFVAL: {
                                type: "string",
                                defaultValue: "true"
                            }
                        }
                    }
                      , l = {
                        opcode: "addOptionsPropertyTo",
                        blockType: "command",
                        text: this.fm("block.addOptionsPropertyTo.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "option"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            OPTIONS: {
                                type: "string",
                                defaultValue: '{"one":1,"two":2,"three":3}'
                            },
                            DEFVAL: {
                                type: "string",
                                defaultValue: "1"
                            }
                        }
                    }
                      , u = {
                        opcode: "addButtonTo",
                        blockType: "command",
                        text: this.fm("block.addButtonTo.message"),
                        arguments: {
                            TITLE: {
                                type: "string",
                                defaultValue: "button"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , p = {
                        opcode: "delProperty",
                        blockType: "command",
                        text: this.fm("block.delProperty.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "str"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , c = {
                        opcode: "readValue",
                        blockType: "reporter",
                        text: this.fm("block.readValue.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , m = {
                        opcode: "readProperty",
                        blockType: "reporter",
                        text: this.fm("block.readProperty.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "str"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , d = {
                        opcode: "listenProperty",
                        blockType: "command",
                        text: this.fm("block.listenProperty.message"),
                        arguments: {
                            PROPERTY: {
                                type: "string",
                                defaultValue: "str"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , g = {
                        opcode: "whenPropertyChange",
                        blockType: "hat",
                        isEdgeActivated: !1,
                        text: this.fm("block.whenPropertyChange.message"),
                        arguments: {
                            NAME: {
                                type: "ccw_hat_parameter"
                            },
                            PROPERTY: {
                                type: "ccw_hat_parameter"
                            },
                            VALUE: {
                                type: "ccw_hat_parameter"
                            }
                        }
                    }
                      , y = {
                        opcode: "whenButtonClicked",
                        blockType: "hat",
                        isEdgeActivated: !1,
                        text: this.fm("block.whenButtonClicked.message"),
                        arguments: {
                            NAME: {
                                type: "ccw_hat_parameter"
                            },
                            TITLE: {
                                type: "ccw_hat_parameter"
                            }
                        }
                    }
                      , P = {
                        opcode: "mergeJSONToValue",
                        blockType: "command",
                        text: this.fm("block.mergeJSONToValue.message"),
                        arguments: {
                            DATA: {
                                type: "string",
                                defaultValue: "{}"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , h = {
                        opcode: "showGUI",
                        blockType: "command",
                        text: this.fm("block.showGUI.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , E = {
                        opcode: "hideGUI",
                        blockType: "command",
                        text: this.fm("block.hideGUI.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , f = {
                        opcode: "destroyGUI",
                        blockType: "command",
                        text: this.fm("block.destroyGUI.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , b = {
                        opcode: "hideProperty",
                        blockType: "command",
                        text: this.fm("block.hideProperty.message"),
                        arguments: {
                            SHOW: {
                                type: "string",
                                menu: "SHOW"
                            },
                            PROPERTY: {
                                type: "string",
                                defaultValue: "str"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , T = {
                        opcode: "disableProperty",
                        blockType: "command",
                        text: this.fm("block.disableProperty.message"),
                        arguments: {
                            ENABLE: {
                                type: "string",
                                menu: "ENABLE"
                            },
                            PROPERTY: {
                                type: "string",
                                defaultValue: "str"
                            },
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            }
                        }
                    }
                      , A = {
                        opcode: "setPanelStyle",
                        blockType: "command",
                        text: this.fm("block.setPanelStyle.message"),
                        arguments: {
                            NAME: {
                                type: "string",
                                defaultValue: "setting"
                            },
                            PROPERTY: {
                                type: "string",
                                defaultValue: "--tp-base-background-color"
                            },
                            VALUE: {
                                type: "string",
                                defaultValue: "hsla(0, 0%, 10%, 0.8)"
                            }
                        }
                    };
                    return {
                        id: i,
                        name: this.fm("name"),
                        docsURI: this.fm("docsUrl"),
                        blockIconURI: r.Z,
                        menuIconURI: r.Z,
                        color1: "#56b98f",
                        color2: "#56b98f",
                        blocks: ["---".concat(this.fm("tag.props")), e, t, o, a, n, s, l, u, p, "---".concat(this.fm("tag.value")), c, m, d, g, y, P, "---".concat(this.fm("tag.control")), h, E, f, b, T, "---".concat(this.fm("tag.style")), {
                            blockType: "button",
                            text: this.fm("tag.style.help"),
                            onClick: function() {
                                window.open("https://tweakpane.github.io/docs/theming/#builder")
                            }
                        }, A],
                        menus: {
                            SHOW: {
                                items: [{
                                    text: this.fm("menu.hide"),
                                    value: "0"
                                }, {
                                    text: this.fm("menu.show"),
                                    value: "1"
                                }]
                            },
                            ENABLE: {
                                items: [{
                                    text: this.fm("menu.disable"),
                                    value: "0"
                                }, {
                                    text: this.fm("menu.enable"),
                                    value: "1"
                                }]
                            },
                            POSITION: {
                                items: [{
                                    text: this.fm("menu.positionTopRight"),
                                    value: "topRight"
                                }, {
                                    text: this.fm("menu.positionCenter"),
                                    value: "center"
                                }, {
                                    text: this.fm("menu.positionTopLeft"),
                                    value: "topLeft"
                                }, {
                                    text: this.fm("menu.positionBottomLeft"),
                                    value: "bottomLeft"
                                }, {
                                    text: this.fm("menu.positionBottomRight"),
                                    value: "bottomRight"
                                }]
                            }
                        }
                    }
                }
            }, {
                key: "_updatePosition",
                value: function(e) {
                    var t = this
                      , o = this.gui[e] || {}
                      , a = o.pane
                      , n = o.position
                      , s = o.scale;
                    if (a) {
                        switch (void 0 === s && (s = 1),
                        a.element.style.position = "absolute",
                        n) {
                        case "topLeft":
                            a.element.style.top = "10px",
                            a.element.style.bottom = "",
                            a.element.style.left = "10px",
                            a.element.style.right = "",
                            a.element.style.transform = "scale(".concat(s, ")"),
                            a.element.style.transformOrigin = "top left";
                            break;
                        case "bottomLeft":
                            a.element.style.top = "",
                            a.element.style.bottom = "10px",
                            a.element.style.left = "10px",
                            a.element.style.right = "",
                            a.element.style.transform = "scale(".concat(s, ")"),
                            a.element.style.transformOrigin = "bottom left";
                            break;
                        case "bottomRight":
                            a.element.style.top = "",
                            a.element.style.bottom = "10px",
                            a.element.style.left = "",
                            a.element.style.right = "10px",
                            a.element.style.transform = "scale(".concat(s, ")"),
                            a.element.style.transformOrigin = "bottom right";
                            break;
                        case "center":
                            a.element.style.top = "50%",
                            a.element.style.bottom = "",
                            a.element.style.left = "50%",
                            a.element.style.right = "",
                            a.element.style.transform = "translate(-50%, -50%) scale(".concat(s, ")"),
                            a.element.style.transformOrigin = "";
                            break;
                        case "topRight":
                            a.element.style.top = "10px",
                            a.element.style.bottom = "",
                            a.element.style.left = "",
                            a.element.style.right = "10px",
                            a.element.style.transform = "scale(".concat(s, ")"),
                            a.element.style.transformOrigin = "top right"
                        }
                        a.element.style.zIndex = "48",
                        void 0 === this.resizeObserver && (this.resizeObserver = new ResizeObserver((function(e) {
                            e.forEach((function(e) {
                                var o = e.contentRect.width;
                                Object.keys(t.gui).forEach((function(e) {
                                    if (t._inputParent() !== t.gui[e].pane.containerElem_)
                                        return t.destroyGUI({
                                            NAME: e
                                        }),
                                        t.resizeObserver.disconnect(),
                                        void (t.resizeObserver = void 0);
                                    t.gui[e].scale = o / 600,
                                    t._updatePosition(e)
                                }
                                ))
                            }
                            ))
                        }
                        )),
                        this.resizeObserver.observe(this._inputParent(), {
                            attributes: !0,
                            attributeFilter: ["style"]
                        }))
                    }
                }
            }, {
                key: "createGUI",
                value: function(e) {
                    var t = e.NAME;
                    this.createGUI2({
                        NAME: t,
                        POSITION: "topRight"
                    })
                }
            }, {
                key: "createGUI2",
                value: function(e) {
                    var t = e.NAME
                      , o = e.POSITION;
                    if (this.gui.hasOwnProperty(t))
                        return this.gui[t].position = o,
                        void this._updatePosition(t);
                    var a = new s.X6({
                        title: t,
                        container: this._inputParent()
                    });
                    this.gui[t] = {
                        pane: a,
                        obj: {},
                        controllers: {},
                        position: o,
                        scale: this._inputParent().offsetWidth / 600
                    },
                    this._updatePosition(t)
                }
            }, {
                key: "addStringPropertyTo",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = e.DEFVAL
                      , s = this.gui[o] || {}
                      , r = s.pane
                      , l = s.obj
                      , i = s.controllers;
                    r && (l.hasOwnProperty(t) && this.delProperty({
                        PROPERTY: t,
                        NAME: o
                    }),
                    l[t] = n().toString(a),
                    i[t] = r.addBinding(l, t))
                }
            }, {
                key: "addNumberPropertyTo",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = e.DEFVAL
                      , s = this.gui[o] || {}
                      , r = s.pane
                      , l = s.obj
                      , i = s.controllers;
                    r && (l.hasOwnProperty(t) && this.delProperty({
                        PROPERTY: t,
                        NAME: o
                    }),
                    l[t] = n().toNumber(a),
                    i[t] = r.addBinding(l, t, {
                        step: 1
                    }))
                }
            }, {
                key: "addNumberPropertyTo2",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = e.DEFVAL
                      , s = e.MIN
                      , r = e.MAX
                      , l = e.STEP
                      , i = this.gui[o] || {}
                      , u = i.pane
                      , p = i.obj
                      , c = i.controllers;
                    u && (p.hasOwnProperty(t) && this.delProperty({
                        PROPERTY: t,
                        NAME: o
                    }),
                    p[t] = n().toNumber(a),
                    c[t] = u.addBinding(p, t, {
                        min: n().toNumber(s),
                        max: n().toNumber(r),
                        step: n().toNumber(l)
                    }))
                }
            }, {
                key: "addBooleanPropertyTo",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = e.DEFVAL
                      , s = this.gui[o] || {}
                      , r = s.pane
                      , l = s.obj
                      , i = s.controllers;
                    r && (l.hasOwnProperty(t) && this.delProperty({
                        PROPERTY: t,
                        NAME: o
                    }),
                    l[t] = n().toBoolean(a),
                    i[t] = r.addBinding(l, t))
                }
            }, {
                key: "addOptionsPropertyTo",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = e.OPTIONS
                      , n = e.DEFVAL
                      , s = this.gui[o] || {}
                      , r = s.pane
                      , l = s.obj
                      , i = s.controllers;
                    if (r) {
                        l.hasOwnProperty(t) && this.delProperty({
                            PROPERTY: t,
                            NAME: o
                        });
                        try {
                            n = JSON.parse(n)
                        } catch (e) {}
                        try {
                            a = JSON.parse(a),
                            l[t] = n,
                            i[t] = r.addBinding(l, t, {
                                options: a
                            })
                        } catch (e) {}
                    }
                }
            }, {
                key: "addButtonTo",
                value: function(e, t) {
                    var o = e.TITLE
                      , a = e.NAME
                      , n = this.gui[a] || {}
                      , s = n.pane
                      , r = n.controllers;
                    if (s) {
                        r.hasOwnProperty(o) && this.delProperty({
                            PROPERTY: o,
                            NAME: a
                        });
                        var l = s.addButton({
                            title: o
                        });
                        l.on("click", (function() {
                            t.startHatsWithParams("Cappu.panel_whenButtonClicked", {
                                parameters: {
                                    NAME: a,
                                    TITLE: o
                                }
                            })
                        }
                        )),
                        r[o] = l
                    }
                }
            }, {
                key: "delProperty",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = this.gui[o] || {}
                      , n = a.pane
                      , s = a.obj
                      , r = a.controllers;
                    if (n) {
                        var l = r[t];
                        l && (n.remove(l),
                        delete r[t],
                        delete s[t])
                    }
                }
            }, {
                key: "readValue",
                value: function(e) {
                    var t = e.NAME
                      , o = (this.gui[t] || {}).obj;
                    return o ? JSON.stringify(o) : ""
                }
            }, {
                key: "readProperty",
                value: function(e) {
                    var t = e.PROPERTY
                      , o = e.NAME
                      , a = (this.gui[o] || {}).obj;
                    return a && a.hasOwnProperty(t) ? a[t] : ""
                }
            }, {
                key: "listenProperty",
                value: function(e, t) {
                    var o = e.PROPERTY
                      , a = e.NAME
                      , n = this.gui[a] || {}
                      , s = n.pane
                      , r = n.controllers;
                    if (s) {
                        var l = r[o];
                        l && l.on("change", (function(e) {
                            e.last && t.startHatsWithParams("Cappu.panel_whenPropertyChange", {
                                parameters: {
                                    NAME: a,
                                    PROPERTY: o,
                                    VALUE: e.value
                                }
                            })
                        }
                        ))
                    }
                }
            }, {
                key: "whenPropertyChange",
                value: function(e) {
                    return !0
                }
            }, {
                key: "whenButtonClicked",
                value: function(e) {
                    return !0
                }
            }, {
                key: "mergeJSONToValue",
                value: function(e) {
                    var t = e.NAME
                      , o = e.DATA
                      , a = this.gui[t] || {}
                      , n = a.pane
                      , s = a.obj
                      , r = a.controllers;
                    if (n) {
                        try {
                            o = JSON.parse(o)
                        } catch (e) {
                            return
                        }
                        Object.keys(o).forEach((function(e) {
                            if (s.hasOwnProperty(e)) {
                                s[e] = o[e];
                                var t = r[e];
                                t && t.refresh()
                            } else
                                s[e] = o[e],
                                r[e] = n.addBinding(s, e)
                        }
                        ))
                    }
                }
            }, {
                key: "showGUI",
                value: function(e) {
                    var t = e.NAME
                      , o = (this.gui[t] || {}).pane;
                    o && (o.hidden = !1)
                }
            }, {
                key: "hideGUI",
                value: function(e) {
                    var t = e.NAME
                      , o = (this.gui[t] || {}).pane;
                    o && (o.hidden = !0)
                }
            }, {
                key: "destroyGUI",
                value: function(e) {
                    var t = e.NAME
                      , o = (this.gui[t] || {}).pane;
                    o && (o.dispose(),
                    delete this.gui[t])
                }
            }, {
                key: "hideProperty",
                value: function(e) {
                    var t = e.SHOW
                      , o = e.PROPERTY
                      , a = e.NAME
                      , s = (this.gui[a] || {}).controllers;
                    if (s) {
                        var r = s[o];
                        r && (r.hidden = !n().toBoolean(t))
                    }
                }
            }, {
                key: "disableProperty",
                value: function(e) {
                    var t = e.ENABLE
                      , o = e.PROPERTY
                      , a = e.NAME
                      , s = (this.gui[a] || {}).controllers;
                    if (s) {
                        var r = s[o];
                        r && (r.disabled = !n().toBoolean(t))
                    }
                }
            }, {
                key: "setPanelStyle",
                value: function(e) {
                    var t = e.NAME
                      , o = e.PROPERTY
                      , a = e.VALUE
                      , n = (this.gui[t] || {}).pane;
                    n && o.startsWith("--tp-") && n.element.style.setProperty(o, a)
                }
            }]) && l(t.prototype, o),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            e
        }()
    }
}]);
