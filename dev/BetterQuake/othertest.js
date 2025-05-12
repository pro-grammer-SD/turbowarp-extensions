(function (Scratch) {
    "use strict";

    const BetterQuakeIcon_default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODAgODAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDgwIDgwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDp1cmwoI1NWR0lEXzFfKTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MztzdHJva2UtbWl0ZXJsaW1pdDoxMDt9DQo8L3N0eWxlPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI3LjYxODUiIHkxPSIzOC40NjQ1IiB4Mj0iNzMuMTA4MyIgeTI9IjM4LjQ2NDUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoNC4wODU2MjFlLTE0IC0xIDEgNC4wODU2MjFlLTE0IDEuNTM1NSA3OC44Nzg3KSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMCIvPg0KCTxzdG9wICBvZmZzZXQ9IjkuMTM2MzEzZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6IzAwMEEwNiIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMzk4NyIgc3R5bGU9InN0b3AtY29sb3I6IzAyMjYxOSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNTc3IiBzdHlsZT0ic3RvcC1jb2xvcjojMDIzMDIwIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTcwLjMsNDRMNDUuOCw2OC41Yy0zLjIsMy4yLTguNSwzLjItMTEuNywwTDkuNyw0NGMtMy4yLTMuMi0zLjItOC41LDAtMTEuN0wzNC4yLDcuOGMzLjItMy4yLDguNS0zLjIsMTEuNywwDQoJbDI0LjUsMjQuNUM3My42LDM1LjYsNzMuNiw0MC44LDcwLjMsNDR6Ii8+DQo8L3N2Zz4NCg==";

    // --- Minimal twgl.js-like helpers for TurboWarp ---
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }
    function createProgramInfo(gl, sources) {
        const program = gl.createProgram();
        const vShader = createShader(gl, gl.VERTEX_SHADER, sources[0]);
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, sources[1]);
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        return {
            program,
            attribSetters: {},
            uniformSetters: {},
        };
    }
    function createTexture(gl, opts) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        return texture;
    }

    class BetterQuake {
        constructor() {
            this.runtime = Scratch.vm.runtime;
            this.QuakeManager = this.runtime.QuakeManager = this.runtime.QuakeManager || {};
            this.QuakeManager.loadedShaders = this.QuakeManager.loadedShaders || {};
            this.QuakeManager.textures = this.QuakeManager.textures || {};
            this.gl = this.runtime.renderer._gl;
            this.autoReRender = true;
        }

        getInfo() {
            return {
                id: "betterquake",
                name: "Better Quake",
                color1: "#6645F6",
                color2: "#5237c5",
                color3: "#6645F6",
                blockIconURI: BetterQuakeIcon_default,
                menuIconURI: BetterQuakeIcon_default,
                docsURI: "",
                blocks: [
                    {
                        opcode: "setAutoReRender",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[SHOULD] auto re-render",
                        arguments: {
                            SHOULD: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SHOULD_MENU"
                            }
                        }
                    },
                    {
                        opcode: "allLoadedShaders",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "all loaded shaders"
                    },
                    {
                        opcode: "removeShader",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "remove [SHADER]",
                        arguments: {
                            SHADER: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SHADER_MENU"
                            }
                        }
                    },
                    {
                        opcode: "reloadShader",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "reload [SHADER]",
                        arguments: {
                            SHADER: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SHADER_MENU"
                            }
                        }
                    },
                    {
                        opcode: "applyShader",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "apply [SHADER] to [TARGET]",
                        arguments: {
                            SHADER: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SHADER_MENU"
                            },
                            TARGET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "DRAWABLES_MENU"
                            }
                        }
                    },
                    {
                        opcode: "detachShader",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "detach [SHADER] from [TARGET]",
                        arguments: {
                            SHADER: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SHADER_MENU"
                            },
                            TARGET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "DRAWABLES_MENU"
                            }
                        }
                    },
                    {
                        opcode: "setNumber",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set number [UNIFORM] of [TARGET] to [VALUE]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        }
                    },
                    {
                        opcode: "setVec2",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set vector2 [UNIFORM] of [TARGET] to [VALUE1] [VALUE2]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            VALUE1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VALUE2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        }
                    },
                    {
                        opcode: "setVec3",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set vector3 [UNIFORM] of [TARGET] to [VALUE1] [VALUE2] [VALUE3]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            VALUE1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VALUE2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VALUE3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        }
                    },
                    {
                        opcode: "setVec4",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set vector4 [UNIFORM] of [TARGET] to [VALUE1] [VALUE2] [VALUE3] [VALUE4]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            VALUE1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VALUE2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VALUE3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VALUE4: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        }
                    },
                    {
                        opcode: "setMatrix",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set matrix [UNIFORM] of [TARGET] to [MATRIX]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            MATRIX: { type: Scratch.ArgumentType.STRING, defaultValue: "[[], []]" }
                        }
                    },
                    {
                        opcode: "setArray",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set array [UNIFORM] of [TARGET] to [ARRAY]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            ARRAY: { type: Scratch.ArgumentType.STRING, defaultValue: "[]" }
                        }
                    },
                    {
                        opcode: "setTexture",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set texture [UNIFORM] of [TARGET] to [TEXTURE]",
                        arguments: {
                            UNIFORM: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
                            TARGET: { type: Scratch.ArgumentType.STRING, menu: "DRAWABLES_MENU" },
                            TEXTURE: { type: Scratch.ArgumentType.STRING, defaultValue: "Scratch Cat" }
                        }
                    },
                    {
                        opcode: "allTextures",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "all textures"
                    },
                    {
                        opcode: "deleteAllTextures",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "delete all textures"
                    },
                    {
                        opcode: "deleteTexture",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "delete texture called [NAME]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Scratch Cat" }
                        }
                    },
                    {
                        opcode: "createUpdateTexture",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "create/update texture called [NAME] with [TEXTURE]",
                        arguments: {
                            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Scratch Cat" },
                            TEXTURE: { type: Scratch.ArgumentType.STRING, defaultValue: "dc7f14b8438834de154cebaf827b6b4d.svg" }
                        }
                    }
                ],
                menus: {
                    DRAWABLES_MENU: {
                        acceptReporters: true,
                        items: this._getDrawablesMenu.bind(this)
                    },
                    SHADER_MENU: {
                        acceptReporters: true,
                        items: this._shaderList.bind(this)
                    },
                    SHOULD_MENU: {
                        items: [
                            { text: "Enable", value: "true" },
                            { text: "Disable", value: "false" }
                        ]
                    }
                }
            };
        }

        setAutoReRender(args) {
            this.autoReRender = args.SHOULD === "true";
        }

        allLoadedShaders() {
            return JSON.stringify(Object.keys(this.QuakeManager.loadedShaders));
        }

        removeShader(args) {
            const SHADER = args.SHADER;
            const shaderInfo = this.QuakeManager.loadedShaders[SHADER];
            if (!shaderInfo) return;
            const shaderProgram = shaderInfo.programInfo.program;
            const gl = this.gl;
            const shaders = gl.getAttachedShaders(shaderProgram);
            shaders.forEach(shader => {
                gl.detachShader(shaderProgram, shader);
                gl.deleteShader(shader);
            });
            gl.deleteProgram(shaderProgram);
            delete this.QuakeManager.loadedShaders[SHADER];
            for (const drawable of this.runtime.renderer._allDrawables) {
                if (drawable?.BetterQuake?.shader === SHADER) delete drawable.BetterQuake;
            }
        }

        reloadShader(args) {
            const SHADER = args.SHADER;
            let drawableShader = this.QuakeManager.loadedShaders[SHADER];
            const shaderUsers = [];
            for (const drawable of this.runtime.renderer._allDrawables) {
                if (drawable?.BetterQuake?.shader === SHADER) shaderUsers.push(drawable);
            }
            if (drawableShader) this.removeShader({ SHADER });
            else drawableShader = {};
            // Use a minimal passthrough shader for demo
            const vertexShaderSource_default = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform mat3 u_projectionMatrix;
varying vec2 v_texCoord;
void main() {
    gl_Position = vec4((u_projectionMatrix * vec3(a_position, 1)).xy, 0, 1);
    v_texCoord = a_texCoord;
}
`;
            const fragmentShaderSource_default = `
precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D tDiffuse;
void main() {
    gl_FragColor = texture2D(tDiffuse, v_texCoord);
}
`;
            drawableShader.source = fragmentShaderSource_default;
            const programInfo = createProgramInfo(this.gl, [
                vertexShaderSource_default,
                SHADER === "__example__" ? fragmentShaderSource_default : drawableShader.source
            ]);
            drawableShader.programInfo = programInfo;
            this.QuakeManager.loadedShaders[SHADER] = drawableShader;
            shaderUsers.forEach(drawable => {
                drawable.BetterQuake = { shader: SHADER, uniforms: {} };
            });
            this.runtime.renderer.dirty = true;
        }

        applyShader(args, util) {
            const SHADER = args.SHADER;
            const TARGET = args.TARGET;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            let drawableShader = this.QuakeManager.loadedShaders[SHADER];
            if (!drawableShader) {
                this.reloadShader({ SHADER });
                drawableShader = this.QuakeManager.loadedShaders[SHADER];
            }
            if (!drawable.BetterQuake) drawable.BetterQuake = {};
            drawable.BetterQuake.shader = SHADER;
            drawable.BetterQuake.uniforms = { u_color: [Math.random(), Math.random(), Math.random(), 1] };
            this.runtime.renderer.dirty = true;
        }

        detachShader(args, util) {
            const SHADER = args.SHADER;
            const TARGET = args.TARGET;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (drawable.BetterQuake?.shader === SHADER) delete drawable.BetterQuake;
        }

        setNumber(args, util) {
            const { UNIFORM, TARGET, VALUE } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            drawable.BetterQuake.uniforms[UNIFORM] = VALUE;
        }

        setVec2(args, util) {
            const { UNIFORM, TARGET, VALUE1, VALUE2 } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            drawable.BetterQuake.uniforms[UNIFORM] = [VALUE1, VALUE2];
        }

        setVec3(args, util) {
            const { UNIFORM, TARGET, VALUE1, VALUE2, VALUE3 } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            drawable.BetterQuake.uniforms[UNIFORM] = [VALUE1, VALUE2, VALUE3];
        }

        setVec4(args, util) {
            const { UNIFORM, TARGET, VALUE1, VALUE2, VALUE3, VALUE4 } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            drawable.BetterQuake.uniforms[UNIFORM] = [VALUE1, VALUE2, VALUE3, VALUE4];
        }

        setMatrix(args, util) {
            const { UNIFORM, TARGET, MATRIX } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            let converted = JSON.parse(MATRIX);
            if (!Array.isArray(converted)) return;
            converted = converted.map(Number);
            drawable.BetterQuake.uniforms[UNIFORM] = converted;
        }

        setArray(args, util) {
            const { UNIFORM, TARGET, ARRAY } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            drawable.BetterQuake.uniforms[UNIFORM] = ARRAY;
        }

        setTexture(args, util) {
            const { UNIFORM, TARGET, TEXTURE } = args;
            const target = this._getTargetByIdOrName(TARGET, util);
            if (!target) return;
            const drawable = this.runtime.renderer._allDrawables[target.drawableID];
            if (!drawable.BetterQuake) return;
            drawable.BetterQuake.uniforms[UNIFORM] = this.QuakeManager.textures[Scratch.Cast.toString(TEXTURE)];
        }

        allTextures() {
            return JSON.stringify(Object.keys(this.QuakeManager.textures));
        }

        deleteTexture(args) {
            const NAME = args.NAME;
            if (this.QuakeManager.textures[NAME]) {
                this.gl.deleteTexture(this.QuakeManager.textures[NAME]);
                delete this.QuakeManager.textures[NAME];
            }
        }

        deleteAllTextures() {
            Object.values(this.QuakeManager.textures).forEach(texture => {
                this.gl.deleteTexture(texture);
            });
            this.QuakeManager.textures = {};
        }

        createUpdateTexture(args) {
            const { NAME, TEXTURE } = args;
            const textureName = Scratch.Cast.toString(NAME);
            this.deleteTexture({ NAME: textureName });
            const texture = createTexture(this.gl, { src: TEXTURE });
            this.QuakeManager.textures[textureName] = texture;
        }

        _getTargetByIdOrName(name, util) {
            if (name === "__myself__") return util.target;
            if (name === "__stage__") return this.runtime.getTargetForStage();
            let target = this.runtime.getSpriteTargetByName(name);
            if (!target) target = this.runtime.getTargetById(name);
            return target || null;
        }

        _getSpriteMenu() {
            const { targets } = this.runtime;
            const menu = targets.filter(target => !target.isStage && target.isOriginal).map(target => ({
                text: target.sprite.name,
                value: target.sprite.name
            }));
            if (menu.length === 0) {
                menu.push({ text: "-", value: "empty" });
            }
            return menu;
        }

        _getDrawablesMenu() {
            const menu = this._getSpriteMenu();
            if (!this.runtime._editingTarget) return menu;
            const editingTargetName = this.runtime._editingTarget.sprite.name;
            const index = menu.findIndex(item => item.value === editingTargetName);
            if (index !== -1) menu.splice(index, 1);
            menu.unshift(
                { text: "me", value: "__myself__" },
                { text: "stage", value: "__stage__" }
            );
            return menu;
        }

        _shaderList() {
            return [{ text: "example", value: "__example__" }];
        }
    }

    Scratch.extensions.register(new BetterQuake());
})(typeof Scratch !== "undefined" ? Scratch : window.Scratch);