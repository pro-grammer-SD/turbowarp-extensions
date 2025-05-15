const loadTweakpane = new Promise((resolve, reject) => {
    if (window.Tweakpane) return resolve();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/pro-grammer-SD/turbowarp-extensions@main/dist/tweakpane.umd.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
});

loadTweakpane.then(() => {
    (function(Scratch) {
        'use strict';

        const i = "cappupanel";

        class PanelGUIExtension {
            constructor(runtime) {
                this.runtime = runtime;
                this.gui = {};
            }

            getInfo() {
                return {
                    id: i,
                    name: "PanelGUI",
                    docsURI: "https://getgandi.com/extensions/panelgui",
                    blockIconURI: "https://static.xiguacity.cn/h1t86b7fg6c7k36wnt0cb30m/static/assets/icon.17ea9d07.png",
                    menuIconURI: "https://static.xiguacity.cn/h1t86b7fg6c7k36wnt0cb30m/static/assets/icon.17ea9d07.png",
                    color1: "#56b98f",
                    color2: "#56b98f",
                    blocks: [
                        "--- Properties",
                        {
                            hideFromPalette: true,
                            opcode: "createGUI",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Create panel [NAME]",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: "setting"
                                }
                            }
                        },
                        {
                            opcode: "createGUI2",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Create panel [NAME] at [POSITION]",
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
                        },
                        {
                            opcode: "addStringPropertyTo",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Add string [PROPERTY] to [NAME] with default [DEFVAL]",
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
                        },
                        {
                            opcode: "addNumberPropertyTo",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Add number [PROPERTY] to [NAME] with default [DEFVAL]",
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
                        },
                        {
                            opcode: "addNumberPropertyTo2",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Add number [PROPERTY] to [NAME] with default [DEFVAL] min [MIN] max [MAX] step [STEP]",
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
                        },
                        {
                            opcode: "addBooleanPropertyTo",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Add boolean [PROPERTY] to [NAME] with default [DEFVAL]",
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
                                    type: Scratch.ArgumentType.BOOLEAN,
                                    defaultValue: true
                                }
                            }
                        },
                        {
                            opcode: "addOptionsPropertyTo",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Add options [PROPERTY] to [NAME] with default [DEFVAL] and options [OPTIONS]",
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
                        },
                        {
                            opcode: "addButtonTo",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Add button [TITLE] to [NAME]",
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
                        },
                        {
                            opcode: "delProperty",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Delete property [PROPERTY] from [NAME]",
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
                        },
                        "--- Value",
                        {
                            opcode: "readValue",
                            blockType: Scratch.BlockType.REPORTER,
                            text: "Read JSON value of panel [NAME]",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: "setting"
                                }
                            }
                        },
                        {
                            opcode: "readProperty",
                            blockType: Scratch.BlockType.REPORTER,
                            text: "Read property [PROPERTY] of panel [NAME]",
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
                        },
                        {
                            opcode: "listenProperty",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Listen to property [PROPERTY] of panel [NAME]",
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
                        },
                        {
                            opcode: "whenPropertyChange",
                            blockType: Scratch.BlockType.HAT,
                            isEdgeActivated: false,
                            text: "When property [PROPERTY] of panel [NAME] changes to [VALUE]",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.CCW_HAT_FIELD
                                },
                                PROPERTY: {
                                    type: Scratch.ArgumentType.CCW_HAT_FIELD
                                },
                                VALUE: {
                                    type: Scratch.ArgumentType.CCW_HAT_FIELD
                                }
                            }
                        },
                        {
                            opcode: "whenButtonClicked",
                            blockType: Scratch.BlockType.HAT,
                            isEdgeActivated: false,
                            text: "When button [TITLE] of panel [NAME] is clicked",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.CCW_HAT_FIELD
                                },
                                TITLE: {
                                    type: Scratch.ArgumentType.CCW_HAT_FIELD
                                }
                            }
                        },
                        {
                            opcode: "mergeJSONToValue",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Merge JSON [DATA] into panel [NAME]",
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
                        },
                        "--- Control",
                        {
                            opcode: "showGUI",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Show panel [NAME]",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: "setting"
                                }
                            }
                        },
                        {
                            opcode: "hideGUI",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Hide panel [NAME]",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: "setting"
                                }
                            }
                        },
                        {
                            opcode: "destroyGUI",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Destroy panel [NAME]",
                            arguments: {
                                NAME: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: "setting"
                                }
                            }
                        },
                        {
                            opcode: "hideProperty",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "[SHOW] property [PROPERTY] of panel [NAME]",
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
                        },
                        {
                            opcode: "disableProperty",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "[ENABLE] property [PROPERTY] of panel [NAME]",
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
                        },
                        "--- Style",
                        {
                            blockType: Scratch.BlockType.BUTTON,
                            text: "📖 Style Help",
                            onClick: function() {
                                window.open("https://tweakpane.github.io/docs/theming/#builder");
                            }
                        },
                        {
                            opcode: "setPanelStyle",
                            blockType: Scratch.BlockType.COMMAND,
                            text: "Set panel [NAME] style: property [PROPERTY] to [VALUE]",
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
                        }
                    ],
                    menus: {
                        SHOW: {
                            acceptReporters: true,
                            items: [
                                { text: "Hide", value: "0" },
                                { text: "Show", value: "1" }
                            ]
                        },
                        ENABLE: {
                            acceptReporters: true,
                            items: [
                                { text: "Disable", value: "0" },
                                { text: "Enable", value: "1" }
                            ]
                        },
                        POSITION: {
                            acceptReporters: true,
                            items: [
                                { text: "Top Right", value: "topRight" },
                                { text: "Center", value: "center" },
                                { text: "Top Left", value: "topLeft" },
                                { text: "Bottom Left", value: "bottomLeft" },
                                { text: "Bottom Right", value: "bottomRight" }
                            ]
                        }
                    }
                };
            }

            _inputParent() {
                try {
                    const canvas = this.runtime.renderer.canvas;
                    if (canvas instanceof HTMLCanvasElement)
                        return canvas.parentElement;
                } catch (e) {
                    return null;
                }
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
                    gui.obj[property] = Boolean(defVal);
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
                        this.runtime.startHats('cappu.panel_whenButtonClicked', {
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
                                this.runtime.startHats('cappu.panel_whenPropertyChange', {
                                    NAME: name,
                                    PROPERTY: property,
                                    VALUE: e.value
                                });
                            }
                        });
                    }
                }
            }

            whenPropertyChange(args) {
                const gui = this.gui[args.NAME] || {};
                const obj = gui.obj || {};
                return obj[args.PROPERTY] === args.VALUE;
            }

            whenButtonClicked(args) {
                return true; // This should be handled by the event listener
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
                        controller.hidden = show === "0";
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
                        controller.disabled = enable === "0";
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
    })(Scratch);
});
