(function (Scratch) {
  "use strict";

  // You can add your icon here if needed
  const input_icon = "";

  // Helper function for color conversion
  function string_colorHex(color) {
    const reg = /^(rgb|RGB)/;
    if (reg.test(color)) {
      let strHex = "#";
      const colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      for (let i = 0; i < colorArr.length; i++) {
        let hex = Number(colorArr[i]).toString(16);
        if (hex.length === 1) hex = "0" + hex;
        strHex += hex;
      }
      return strHex;
    }
    return String(color);
  }

  class WitCatInput {
    // Static state variables
    static keypresslist = {};
    static lastKey = "";
    static MouseWheel = 0;
    static InputListen = [];
    static InputEnter = false;
    static timer = undefined;
    static inputFontSize = {};
    static adaptive = false;
    static observer = null;

    // --- Scratch Extension Info ---
    static get EXTENSION_ID() {
      return "WitCatInput";
    }

    static getInfo() {
      WitCatInput._initEvents();
      return {
        id: WitCatInput.EXTENSION_ID,
        name: "WitCat's Input",
        color1: "#52baba",
        color2: "#459c9c",
        color3: "#459c9c",
        menuIconURI: input_icon,
        blockIconURI: input_icon,
        docsURI: "https://www.ccw.site/post/6153a7a6-05fb-462e-b785-b97700b12bc2",
        blocks: [
          {
            opcode: "createinput",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create or modify [type] input ID [id] X [x] Y [y] width [width] height [height] content [text] color [color] prompt [texts] fontSize [size]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              type: { type: Scratch.ArgumentType.STRING, menu: "type" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" },
              width: { type: Scratch.ArgumentType.NUMBER, defaultValue: "100" },
              height: { type: Scratch.ArgumentType.NUMBER, defaultValue: "20" },
              text: { type: Scratch.ArgumentType.STRING, defaultValue: "hello world!" },
              color: { type: Scratch.ArgumentType.STRING, defaultValue: "#000000" },
              texts: { type: Scratch.ArgumentType.STRING, defaultValue: "hello world!" },
              size: { type: Scratch.ArgumentType.NUMBER, defaultValue: "16" },
            },
          },
          {
            opcode: "setinput",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set [type] of input [id] to [text]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              type: { type: Scratch.ArgumentType.STRING, menu: "typess" },
              text: { type: Scratch.ArgumentType.STRING, defaultValue: "10" },
            },
          },
          {
            opcode: "fontweight",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set fontweight of input [id] to [text]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              text: { type: Scratch.ArgumentType.STRING, defaultValue: "400" },
            },
          },
          {
            opcode: "setread",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set input [id] to [read]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              read: { type: Scratch.ArgumentType.STRING, menu: "read" },
            },
          },
          {
            opcode: "password",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set input [id] to password [read]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              read: { type: Scratch.ArgumentType.STRING, menu: "password" },
            },
          },
          {
            opcode: "textalign",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set input [id] align [read]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              read: { type: Scratch.ArgumentType.STRING, menu: "textalign" },
            },
          },
          {
            opcode: "setfont",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set input [id] font url [text] name [name]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              text: { type: Scratch.ArgumentType.STRING, defaultValue: "url" },
              name: { type: Scratch.ArgumentType.STRING, defaultValue: "arial" },
            },
          },
          {
            opcode: "setenter",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set input [id] enter [enter] more [more]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              enter: { type: Scratch.ArgumentType.STRING, defaultValue: "Enter" },
              more: { type: Scratch.ArgumentType.STRING, defaultValue: ",Enter" },
            },
          },
          {
            opcode: "getinput",
            blockType: Scratch.BlockType.REPORTER,
            text: "[type] of input [id]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
              type: { type: Scratch.ArgumentType.STRING, menu: "types" },
            },
          },
          {
            opcode: "number",
            blockType: Scratch.BlockType.REPORTER,
            text: "[type] of input [num]",
            arguments: {
              num: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
              type: { type: Scratch.ArgumentType.STRING, menu: "types" },
            },
          },
          {
            opcode: "numbers",
            blockType: Scratch.BlockType.REPORTER,
            text: "input count",
            arguments: {},
          },
          {
            opcode: "deleteinput",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete input [id]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
            },
          },
          {
            opcode: "deleteallinput",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete all inputs",
            arguments: {},
          },
          {
            opcode: "fontadaptive",
            blockType: Scratch.BlockType.COMMAND,
            text: "Font size adaptation [type]",
            arguments: {
              type: { type: Scratch.ArgumentType.STRING, menu: "set" },
            },
          },
          {
            opcode: "ok",
            blockType: Scratch.BlockType.HAT,
            text: "confirms input?",
            arguments: {},
          },
          {
            opcode: "oks",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "confirms input?",
            arguments: {},
          },
          {
            opcode: "compute",
            blockType: Scratch.BlockType.REPORTER,
            text: "Font size of now screen [size]",
            arguments: {
              size: { type: Scratch.ArgumentType.NUMBER, defaultValue: "16" },
            },
          },
          {
            opcode: "shadow",
            blockType: Scratch.BlockType.REPORTER,
            text: "shadow x [x] y [y] width [width] color [color]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" },
              width: { type: Scratch.ArgumentType.NUMBER, defaultValue: "3" },
              color: { type: Scratch.ArgumentType.STRING, defaultValue: "#000000" },
            },
          },
          {
            opcode: "shadows",
            blockType: Scratch.BlockType.REPORTER,
            text: "Merge shadows [first] with [last]",
            arguments: {
              first: { type: Scratch.ArgumentType.STRING, defaultValue: "0px 0px 3px #000000" },
              last: { type: Scratch.ArgumentType.STRING, defaultValue: "0px 0px 3px #000000" },
            },
          },
          {
            opcode: "color",
            blockType: Scratch.BlockType.REPORTER,
            text: "Gradient color [color] and color [colors] angle [deg]",
            arguments: {
              color: { type: Scratch.ArgumentType.STRING, defaultValue: "#ffff00" },
              colors: { type: Scratch.ArgumentType.STRING, defaultValue: "#ff0000" },
              deg: { type: Scratch.ArgumentType.NUMBER, defaultValue: "0" },
            },
          },
          {
            opcode: "isinput",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "input [id] received focus?",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
            },
          },
          {
            opcode: "whatinput",
            blockType: Scratch.BlockType.REPORTER,
            text: "focused input id",
            arguments: {},
          },
          {
            opcode: "nowinput",
            blockType: Scratch.BlockType.COMMAND,
            text: "Focus on input [id]",
            arguments: {
              id: { type: Scratch.ArgumentType.STRING, defaultValue: "i" },
            },
          },
          {
            opcode: "key",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [type] pressed?",
            arguments: {
              type: { type: Scratch.ArgumentType.STRING, defaultValue: "KeyA" },
            },
          },
          {
            opcode: "mousewheel",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse wheel speed",
            arguments: {},
          },
          {
            opcode: "keys",
            blockType: Scratch.BlockType.HAT,
            text: "When key [type] pressed",
            arguments: {
              type: { type: Scratch.ArgumentType.STRING, defaultValue: "KeyA" },
            },
          },
          {
            opcode: "lastkey",
            blockType: Scratch.BlockType.REPORTER,
            text: "last key pressed",
            arguments: {},
          },
          {
            opcode: "keypress",
            blockType: Scratch.BlockType.REPORTER,
            text: "pressed keys",
            arguments: {},
          },
        ],
        menus: {
          type: [
            { text: "single-line", value: "input" },
            { text: "multi-line", value: "textarea" },
          ],
          types: [
            { text: "ID", value: "ID" },
            { text: "X", value: "X" },
            { text: "Y", value: "Y" },
            { text: "width", value: "width" },
            { text: "height", value: "height" },
            { text: "content", value: "content" },
            { text: "color", value: "color" },
            { text: "prompt", value: "prompt" },
            { text: "font size", value: "font-size" },
            { text: "font", value: "font" },
            { text: "scroll position", value: "rp" },
            { text: "text height", value: "th" },
            { text: "cursor position", value: "cp" },
            { text: "transparency", value: "op" },
            { text: "background", value: "bg" },
            { text: "font family", value: "ff" },
            { text: "line height", value: "lh" },
            { text: "font weight", value: "fw" },
            { text: "shadow", value: "ts" },
            { text: "all(json)", value: "json" },
          ],
          typess: [
            { text: "X", value: "X" },
            { text: "Y", value: "Y" },
            { text: "width", value: "width" },
            { text: "height", value: "height" },
            { text: "content", value: "content" },
            { text: "color", value: "color" },
            { text: "prompt", value: "prompt" },
            { text: "font size", value: "font-size" },
            { text: "font", value: "font" },
            { text: "scroll position", value: "rp" },
            { text: "cursor position", value: "cp" },
            { text: "transparency", value: "op" },
            { text: "background", value: "bg" },
            { text: "line height", value: "lh" },
            { text: "shadow", value: "ts" },
            { text: "⚠css", value: "css" },
          ],
          read: [
            { text: "editable", value: "eb" },
            { text: "uneditable", value: "ue" },
          ],
          password: [
            { text: "text", value: "text" },
            { text: "password", value: "password" },
          ],
          textalign: [
            { text: "left", value: "left" },
            { text: "center", value: "center" },
            { text: "right", value: "right" },
          ],
          fontweight: [
            { text: "100(thin)", value: "100" },
            { text: "200", value: "200" },
            { text: "300", value: "300" },
            { text: "400(normal)", value: "400" },
            { text: "500", value: "500" },
            { text: "600", value: "600" },
            { text: "700(bold)", value: "700" },
            { text: "800", value: "800" },
            { text: "900", value: "900" },
          ],
          set: [
            { text: "Enable", value: "true" },
            { text: "Disable", value: "false" },
          ],
        },
      };
    }

    // --- Utility functions ---
    static _getRuntime() {
      return Scratch.vm && Scratch.vm.runtime;
    }
    static _getCanvas() {
      try {
        const runtime = WitCatInput._getRuntime();
        if (!runtime) return null;
        const { canvas } = runtime.renderer;
        if (canvas instanceof HTMLCanvasElement) {
          return canvas;
        }
      } catch (err) {
        return null;
      }
      return null;
    }
    static _getInputParent() {
      try {
        const canvas = WitCatInput._getCanvas();
        if (canvas instanceof HTMLCanvasElement) {
          return canvas.parentElement;
        }
      } catch (err) {
        return null;
      }
      return null;
    }
    static _clamp(x, min, max) {
      return Number.isNaN(x) ? min : Math.min(max, Math.max(min, x));
    }
    static _getWitCatID(element) {
      const match = /^WitCatInput(.*)$/.exec(element.id);
      return match === null || match[1] === undefined ? "" : match[1];
    }
    static _findWitCatInput(witcatID) {
      const search = document.getElementById(`WitCatInput${witcatID}`);
      if (search === null) return null;
      if (search instanceof HTMLInputElement || search instanceof HTMLTextAreaElement) {
        return search;
      }
      return null;
    }

    // --- Main features from input.js as static methods ---
    static createinput(args) {
      const runtime = WitCatInput._getRuntime();
      const canvas = WitCatInput._getCanvas();
      const inputParent = WitCatInput._getInputParent();
      if (!runtime || !canvas || !inputParent) return;

      let x = Number(args.x);
      let y = Number(args.y);
      let width = Number(args.width);
      let height = Number(args.height);
      x = WitCatInput._clamp(x, 0, runtime.stageWidth);
      y = WitCatInput._clamp(y, 0, runtime.stageHeight);
      width = WitCatInput._clamp(width, 0, runtime.stageWidth - x);
      height = WitCatInput._clamp(height, 0, runtime.stageHeight - y);
      x = (x / runtime.stageWidth) * 100;
      y = (y / runtime.stageHeight) * 100;
      width = (width / runtime.stageWidth) * 100;
      height = (height / runtime.stageHeight) * 100;

      let search = null;
      const tempSearch = document.getElementById(`WitCatInput${args.id}`);
      if (tempSearch instanceof HTMLInputElement || tempSearch instanceof HTMLTextAreaElement) {
        search = tempSearch;
      }
      if (search !== null && search.tagName.toLowerCase() !== String(args.type).toLowerCase()) {
        inputParent.removeChild(search);
        search = null;
      }
      if (search === null) {
        const argstype = String(args.type).toLowerCase();
        if (argstype !== "input" && argstype !== "textarea") return;
        search = document.createElement(argstype);
        search.id = `WitCatInput${args.id}`;
        search.value = String(args.text);
        search.className = "WitCatInput";
        search.name = String(args.type);
        search.placeholder = String(args.texts);
        inputParent.appendChild(search);
      }
      const sstyle = search.style;
      sstyle.backgroundColor = "transparent";
      sstyle.border = "0px";
      sstyle.textShadow = "0 0 0 #000";
      sstyle.outline = "none";
      sstyle.position = "absolute";
      sstyle.left = `${x}%`;
      sstyle.top = `${y}%`;
      sstyle.width = `${width}%`;
      sstyle.height = `${height}%`;
      sstyle.fontSize = `${Number(args.size)}px`;
      sstyle.resize = "none";
      sstyle.color = String(args.color);
      sstyle.opacity = "1";
      sstyle.backgroundSize = "100% 100%";
      search.value = String(args.text);
      search.placeholder = String(args.texts);
      WitCatInput.inputFontSize[String(args.id)] = Number(args.size);
    }

    static deleteinput(args) {
      const inputParent = WitCatInput._getInputParent();
      if (!inputParent) return;
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (search !== null) {
        inputParent.removeChild(search);
      }
    }

    static getinput(args) {
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (!search) return "";
      return WitCatInput._getattrib(search, String(args.type));
    }

    static isinput(args) {
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (search !== null) {
        return search === document.activeElement;
      }
      return false;
    }

    static whatinput() {
      if (document.activeElement !== null && document.activeElement.className === "WitCatInput") {
        return WitCatInput._getWitCatID(document.activeElement);
      }
      return "";
    }

    static nowinput(args) {
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (search !== null) {
        search.focus();
      } else {
        const active = document.activeElement;
        if (active !== null && active.className === "WitCatInput") {
          if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
            active.blur();
          }
        }
      }
    }

    static deleteallinput() {
      const inputParent = WitCatInput._getInputParent();
      if (!inputParent) return;
      Array.from(document.querySelectorAll('.WitCatInput')).forEach((element) => element.remove());
      WitCatInput.InputListen = [];
    }

    static ok() {
      return WitCatInput.InputEnter !== false;
    }
    static oks() {
      return WitCatInput.InputEnter !== false;
    }

    static compute(args) {
      const canvas = WitCatInput._getCanvas();
      if (!canvas) return 0;
      return (parseFloat(canvas.style.width) / 360) * Number(args.size);
    }

    static number(args) {
      const searchall = document.getElementsByClassName("WitCatInput");
      const index = Number(args.num);
      const search = searchall[index - 1];
      if (search !== undefined) {
        return WitCatInput._getattrib(search, String(args.type));
      }
      return "";
    }

    static setenter(args) {
      const found = WitCatInput.InputListen.find((e) => e.id === args.id);
      if (found !== undefined) {
        found.enter = args.enter;
        found.more = args.more;
      }
    }

    static _getattrib(element, type) {
      if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
        return "";
      }
      const runtime = WitCatInput._getRuntime();
      switch (type) {
        case "X":
          return (parseFloat(element.style.left) / 100) * runtime.stageWidth;
        case "Y":
          return (parseFloat(element.style.top) / 100) * runtime.stageHeight;
        case "width":
          return (parseFloat(element.style.width) / 100) * runtime.stageWidth;
        case "height":
          return (parseFloat(element.style.height) / 100) * runtime.stageHeight;
        case "content":
          return element.value;
        case "color":
          return string_colorHex(element.style.color);
        case "prompt":
          return element.placeholder;
        case "font-size":
          return parseFloat(element.style.fontSize);
        case "ID": {
          const match = /^WitCatInput(.*)$/.exec(element.id);
          return match === null || match[1] === undefined ? "" : match[1];
        }
        case "rp":
          return element.scrollTop;
        case "th":
          return element.scrollHeight;
        case "cp":
          return JSON.stringify([element.selectionStart, element.selectionEnd]);
        case "op":
          return 100 - Number(element.style.opacity) * 100;
        case "bg": {
          const match = /^url\("(.*)"\)$/.exec(element.style.backgroundImage);
          if (match !== null && match[1] !== undefined) {
            return decodeURI(match[1]);
          }
          return "";
        }
        case "ff":
          return element.style.fontFamily;
        case "lh":
          return parseFloat(element.style.lineHeight);
        case "fw":
          return element.style.fontWeight;
        case "ts":
          return element.style.textShadow;
        case "font":
          return element.style.fontFamily;
        case "json":
          return JSON.stringify({
            X: WitCatInput._getattrib(element, "X"),
            Y: WitCatInput._getattrib(element, "Y"),
            width: WitCatInput._getattrib(element, "width"),
            height: WitCatInput._getattrib(element, "height"),
            content: WitCatInput._getattrib(element, "content"),
            color: WitCatInput._getattrib(element, "color"),
            prompt: WitCatInput._getattrib(element, "prompt"),
            "font-size": WitCatInput._getattrib(element, "font-size"),
            ID: WitCatInput._getattrib(element, "ID"),
            "Rolling position": WitCatInput._getattrib(element, "rp"),
            "Text height": WitCatInput._getattrib(element, "th"),
            "cursor position": JSON.parse(String(WitCatInput._getattrib(element, "cp"))),
          });
        default:
          return "";
      }
    }

    static numbers() {
      const search = document.getElementsByClassName("WitCatInput");
      return search.length;
    }

    static key(args) {
      const key = String(args.type).split(",");
      return key.every((item) => Object.keys(WitCatInput.keypresslist).includes(item));
    }

    static keypresss(keydown, press) {
      return (
        press.every((item) => Object.keys(keydown).includes(item)) &&
        Object.keys(keydown).every((item) => press.includes(item))
      );
    }

    static keys(args) {
      const key = String(args.type).split(",");
      return key.every((item) => Object.keys(WitCatInput.keypresslist).includes(item));
    }

    static lastkey() {
      return WitCatInput.lastKey;
    }

    static mousewheel() {
      return WitCatInput.MouseWheel;
    }

    static setinput(args) {
      const search = WitCatInput._findWitCatInput(String(args.id));
      if (search !== null) {
        const sstyle = search.style;
        let x, y, width, height, opacity;
        switch (args.type) {
          case "X":
            x = WitCatInput._clamp(Number(args.text), 0, WitCatInput._getRuntime().stageWidth);
            x = (x / WitCatInput._getRuntime().stageWidth) * 100;
            sstyle.left = `${x}%`;
            break;
          case "Y":
            y = WitCatInput._clamp(Number(args.text), 0, WitCatInput._getRuntime().stageHeight);
            y = (y / WitCatInput._getRuntime().stageHeight) * 100;
            sstyle.top = `${y}%`;
            break;
          case "width":
            x = (parseFloat(sstyle.left) / 100) * WitCatInput._getRuntime().stageWidth;
            width = WitCatInput._clamp(Number(args.text), 0, WitCatInput._getRuntime().stageWidth - x);
            width = (width / WitCatInput._getRuntime().stageWidth) * 100;
            sstyle.width = `${Number(width)}%`;
            break;
          case "height":
            y = (parseFloat(sstyle.top) / 100) * WitCatInput._getRuntime().stageHeight;
            height = WitCatInput._clamp(Number(args.text), 0, WitCatInput._getRuntime().stageHeight - y);
            height = (height / WitCatInput._getRuntime().stageHeight) * 100;
            sstyle.height = `${Number(height)}%`;
            break;
          case "content":
            search.value = String(args.text);
            break;
          case "prompt":
            search.placeholder = String(args.text);
            break;
          case "color":
            sstyle.color = String(args.text);
            break;
          case "font-size":
            sstyle.fontSize = `${Number(args.text)}px`;
            WitCatInput.inputFontSize[String(args.id)] = Number(args.text);
            break;
          case "rp":
            search.scrollTop = Number(args.text);
            break;
          case "op":
            opacity = WitCatInput._clamp(Number(args.text), 0, 100);
            opacity = 1 - opacity / 100;
            sstyle.opacity = String(opacity);
            break;
          case "cp":
            try {
              const selection = JSON.parse(String(args.text));
              if (selection instanceof Array && selection.length === 2) {
                search.setSelectionRange(selection[0], selection[1]);
              } else if (typeof selection === "number") {
                search.setSelectionRange(selection, selection);
              }
            } catch (err) {}
            break;
          case "bg":
            if (
              String(args.text).indexOf("ccw") !== -1 ||
              String(args.text).indexOf("xiguacity") !== -1 ||
              String(args.text).startsWith("linear-gradient")
            ) {
              sstyle.backgroundImage = `url("${encodeURI(String(args.text))}")`;
              sstyle.backgroundSize = "100% 100%";
            }
            break;
          case "lh":
            sstyle.lineHeight = `${Number(args.text)}px`;
            break;
          case "ts":
            sstyle.textShadow = String(args.text);
            break;
          case "css":
            search.setAttribute("style", String(args.text));
            break;
          case "font":
            search.style.fontFamily = `"${args.text}"`;
            break;
          default:
            break;
        }
      }
    }

    static setread(args) {
      const search = WitCatInput._findWitCatInput(String(args.id));
      if (search !== null) {
        if (args.read === "eb") {
          search.disabled = false;
        } else {
          search.disabled = true;
        }
      }
    }

    static password(args) {
      const search = WitCatInput._findWitCatInput(String(args.id));
      if (search !== null) {
        if (search instanceof HTMLTextAreaElement) return;
        search.type = String(args.read);
      }
    }

    static keypress() {
      return JSON.stringify(Object.keys(WitCatInput.keypresslist));
    }

    static setfont(args) {
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (search !== null) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", String(args.text), true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          if (typeof FontFace !== "undefined") {
            document.fonts.add(new FontFace(String(args.name), this.response));
            search.style.fontFamily = `"${args.name}"`;
          }
        };
        xhr.send();
      }
    }

    static textalign(args) {
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (search !== null) {
        search.style.textAlign = String(args.read);
      }
    }

    static fontweight(args) {
      const search = document.getElementById(`WitCatInput${args.id}`);
      if (search !== null) {
        search.style.fontWeight = String(args.text);
      }
    }

    static shadow(args) {
      return `${args.x}px ${args.y}px ${args.width}px ${args.color}`;
    }

    static shadows(args) {
      return `${args.first},${args.last}`;
    }

    static fontadaptive(args) {
      const canvas = WitCatInput._getCanvas();
      if (!canvas) return;
      if (args.type === "true") {
        if (!WitCatInput.adaptive) {
          const search = document.getElementsByClassName("WitCatInput");
          const config = {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ["style"],
          };
          const callback = () => {
            if (!WitCatInput._getCanvas()) return;
            Array.prototype.map.call(search, (item) => {
              const searchId = WitCatInput._getWitCatID(item);
              const fontsize = WitCatInput.inputFontSize[searchId];
              if (fontsize) {
                item.style.fontSize = `${(parseFloat(WitCatInput._getCanvas().offsetWidth) / 360) * fontsize}px`;
              }
            });
          };
          WitCatInput.observer = new MutationObserver(callback);
          WitCatInput.observer.observe(canvas, config);
          WitCatInput.adaptive = true;
        }
      } else if (WitCatInput.adaptive) {
        if (WitCatInput.observer !== null) {
          WitCatInput.observer.disconnect();
        }
        WitCatInput.adaptive = false;
      }
    }

    static color(args) {
      return `linear-gradient(${args.deg}deg, ${args.color}, ${args.colors});`;
    }

    // --- Event listeners ---
    static _initEvents() {
      if (WitCatInput._eventsAdded) return;
      WitCatInput._eventsAdded = true;
      // Keyboard events
      document.addEventListener("keydown", (event) => {
        WitCatInput.keypresslist[event.code] = true;
        WitCatInput.lastKey = event.code;
      });
      document.addEventListener("keyup", (event) => {
        delete WitCatInput.keypresslist[event.code];
      });
      // Mouse wheel event
      const canvas = WitCatInput._getCanvas();
      if (canvas) {
        canvas.addEventListener(
          "wheel",
          (e) => {
            clearTimeout(WitCatInput.timer);
            WitCatInput.MouseWheel = e.deltaY * -3;
            WitCatInput.timer = setTimeout(() => {
              WitCatInput.MouseWheel = 0;
            }, 30);
          },
          { capture: true }
        );
      }
    }
  }

  Scratch.extensions.register(WitCatInput);
})(typeof Scratch !== "undefined" ? Scratch : window.Scratch);