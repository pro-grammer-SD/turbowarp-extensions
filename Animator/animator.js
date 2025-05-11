(function (Scratch) {
    "use strict";
    const ani_icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgODAgODAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDgwIDgwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDp1cmwoI1NWR0lEXzFfKTtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MztzdHJva2UtbWl0ZXJsaW1pdDoxMDt9DQo8L3N0eWxlPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI3LjYxODUiIHkxPSIzOC40NjQ1IiB4Mj0iNzMuMTA4MyIgeTI9IjM4LjQ2NDUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoNC4wODU2MjFlLTE0IC0xIDEgNC4wODU2MjFlLTE0IDEuNTM1NSA3OC44Nzg3KSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMCIvPg0KCTxzdG9wICBvZmZzZXQ9IjkuMTM2MzEzZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6IzAwMEEwNiIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMzk4NyIgc3R5bGU9InN0b3AtY29sb3I6IzAyMjYxOSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNTc3IiBzdHlsZT0ic3RvcC1jb2xvcjojMDIzMDIwIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTcwLjMsNDRMNDUuOCw2OC41Yy0zLjIsMy4yLTguNSwzLjItMTEuNywwTDkuNyw0NGMtMy4yLTMuMi0zLjItOC41LDAtMTEuN0wzNC4yLDcuOGMzLjItMy4yLDguNS0zLjIsMTEuNywwDQoJbDI0LjUsMjQuNUM3My42LDM1LjYsNzMuNiw0MC44LDcwLjMsNDR6Ii8+DQo8L3N2Zz4NCg==";

    class Animate {
        constructor(method, { start, end, length }) {
            this.method = method;
            this.start = start;
            this.end = end;
            this.length = length;
        }
        static Linear(t, b, c, d) { return (c * t) / d + b; }
        static EaseInQuad(t, b, c, d) { return c * (t / d) * (t / d) + b; }
        static EaseOutQuad(t, b, c, d) { return -c * (t /= d) * (t - 2) + b; }
        static EaseInOutQuad(t, b, c, d) {
            if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
            return (-c / 2) * (--t * (t - 2) - 1) + b;
        }
        static EaseInSine(t, b, c, d) { return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b; }
        static EaseOutSine(t, b, c, d) { return c * Math.sin((t / d) * (Math.PI / 2)) + b; }
        static EaseInOutSine(t, b, c, d) { return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b; }
        static EaseInExpo(t, b, c, d) { return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b; }
        static EaseOutExpo(t, b, c, d) { return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b; }
        static EaseInOutExpo(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
            return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
        }
        static EaseInCirc(t, b, c, d) { return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b; }
        static EaseOutCirc(t, b, c, d) { return c * Math.sqrt(1 - (t = t / d - 1) * t) + b; }
        static EaseInOutCirc(t, b, c, d) {
            if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
            return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
        static EaseInCubic(t, b, c, d) { return c * (t /= d) * t * t + b; }
        static EaseOutCubic(t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; }
        static EaseInOutCubic(t, b, c, d) {
            if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
            return (c / 2) * ((t -= 2) * t * t + 2) + b;
        }
        static EaseInQuart(t, b, c, d) { return c * (t /= d) * t * t * t + b; }
        static EaseOutQuart(t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; }
        static EaseInOutQuart(t, b, c, d) {
            if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
            return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
        }
        static EaseInQuint(t, b, c, d) { return c * (t /= d) * t * t * t * t + b; }
        static EaseOutQuint(t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b; }
        static EaseInOutQuint(t, b, c, d) {
            if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
            return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
        }
        static EaseInElastic(t, b, c, d) {
            let s = 1.70158, p = 0, a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            p = d * 0.3;
            if (a < Math.abs(c)) { a = c; s = p / 4; }
            else s = (p / (2 * Math.PI)) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
        }
        static EaseOutElastic(t, b, c, d) {
            let s = 1.70158, p = 0, a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            p = d * 0.3;
            if (a < Math.abs(c)) { a = c; s = p / 4; }
            else s = (p / (2 * Math.PI)) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
        }
        static EaseInOutElastic(t, b, c, d) {
            let s = 1.70158, p = 0, a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            p = d * (0.3 * 1.5);
            if (a < Math.abs(c)) { a = c; s = p / 4; }
            else s = (p / (2 * Math.PI)) * Math.asin(c / a);
            if (t < 1)
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b;
        }
        static EaseInBack(t, b, c, d) {
            let s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        }
        static EaseOutBack(t, b, c, d) {
            let s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }
        static EaseInOutBack(t, b, c, d) {
            let s = 1.70158;
            if ((t /= d / 2) < 1)
                return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
            return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
        static EaseInBounce(t, b, c, d) {
            return c - Animate.EaseOutBounce(d - t, 0, c, d) + b;
        }
        static EaseOutBounce(t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * (7.5625 * t * t) + b;
            } else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
            } else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
            } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
            }
        }
        static EaseInOutBounce(t, b, c, d) {
            if (t < d / 2) {
                return Animate.EaseInBounce(t * 2, 0, c, d) * 0.5 + b;
            }
            return Animate.EaseOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
        at(time) {
            if (time > this.length) return this.end;
            if (this.end - this.start == 0) return this.end;
            return this.method(time, this.start, this.end - this.start, this.length);
        }
    }

    function getMethod(name) {
        if (typeof Animate[name] === "function") {
            return Animate[name];
        }
        return null;
    }

    class Animator {
        getInfo() {
            return {
                id: "Animator",
                name: "Animator",
                color1: "#023020",
                color2: "#015c3a",
                color3: "#01331d",
                menuIconURI: ani_icon,
                blockIconURI: ani_icon,
                docsURI: "https://learn.ccw.site/article/63a876b1-ccd4-4e74-a298-04e94109ab95",
                blocks: [
                    {
                        opcode: "Animate",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[type] (start [start] end [end] duration [length]) at [time]s",
                        arguments: {
                            type: { type: Scratch.ArgumentType.STRING, menu: "Ani" },
                            time: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            start: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            end: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                            length: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                        }
                    },
                    {
                        opcode: "Move",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "move to x: [endx] y: [endy] in [time]s using [type]",
                        arguments: {
                            type: { type: Scratch.ArgumentType.STRING, menu: "Ani" },
                            time: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            endx: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            endy: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        }
                    },
                    {
                        opcode: "Effect",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "change [Effect] to [endv] in [time]s using [type]",
                        arguments: {
                            type: { type: Scratch.ArgumentType.STRING, menu: "Ani" },
                            time: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            endv: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                            Effect: { type: Scratch.ArgumentType.STRING, menu: "Effect" }
                        }
                    },
                    {
                        opcode: "Dir",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "point in direction [endv] in [time]s using [type]",
                        arguments: {
                            type: { type: Scratch.ArgumentType.STRING, menu: "Ani" },
                            time: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                            endv: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 }
                        }
                    },
                    {
                        opcode: "getEffect",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "get [Effect] value",
                        arguments: {
                            Effect: { type: Scratch.ArgumentType.STRING, menu: "Effect" }
                        }
                    }
                ],
                menus: {
                    Ani: [
                        { text: "Linear", value: "Linear" },
                        { text: "Quadratic ease-in", value: "EaseInQuad" },
                        { text: "Quadratic ease-out", value: "EaseOutQuad" },
                        { text: "Quadratic ease-in-out", value: "EaseInOutQuad" },
                        { text: "Sine ease-in", value: "EaseInSine" },
                        { text: "Sine ease-out", value: "EaseOutSine" },
                        { text: "Sine ease-in-out", value: "EaseInOutSine" },
                        { text: "Exponential ease-in", value: "EaseInExpo" },
                        { text: "Exponential ease-out", value: "EaseOutExpo" },
                        { text: "Exponential ease-in-out", value: "EaseInOutExpo" },
                        { text: "Circular ease-in", value: "EaseInCirc" },
                        { text: "Circular ease-out", value: "EaseOutCirc" },
                        { text: "Circular ease-in-out", value: "EaseInOutCirc" },
                        { text: "Cubic ease-in", value: "EaseInCubic" },
                        { text: "Cubic ease-out", value: "EaseOutCubic" },
                        { text: "Cubic ease-in-out", value: "EaseInOutCubic" },
                        { text: "Quartic ease-in", value: "EaseInQuart" },
                        { text: "Quartic ease-out", value: "EaseOutQuart" },
                        { text: "Quartic ease-in-out", value: "EaseInOutQuart" },
                        { text: "Quintic ease-in", value: "EaseInQuint" },
                        { text: "Quintic ease-out", value: "EaseOutQuint" },
                        { text: "Quintic ease-in-out", value: "EaseInOutQuint" },
                        { text: "Elastic ease-in", value: "EaseInElastic" },
                        { text: "Elastic ease-out", value: "EaseOutElastic" },
                        { text: "Elastic ease-in-out", value: "EaseInOutElastic" },
                        { text: "Back ease-in", value: "EaseInBack" },
                        { text: "Back ease-out", value: "EaseOutBack" },
                        { text: "Back ease-in-out", value: "EaseInOutBack" },
                        { text: "Bounce ease-in", value: "EaseInBounce" },
                        { text: "Bounce ease-out", value: "EaseOutBounce" },
                        { text: "Bounce ease-in-out", value: "EaseInOutBounce" }
                    ],
                    Effect: [
                        { text: "color", value: "color" },
                        { text: "fisheye", value: "fisheye" },
                        { text: "whirl", value: "whirl" },
                        { text: "pixelate", value: "pixelate" },
                        { text: "mosaic", value: "mosaic" },
                        { text: "brightness", value: "brightness" },
                        { text: "ghost", value: "ghost" },
                        { text: "size", value: "size" }
                    ]
                }
            };
        }

        Animate(args) {
            const method = getMethod(args.type);
            const _length = parseFloat(args.length);
            const _start = parseFloat(args.start);
            const _end = parseFloat(args.end);
            const _time = parseFloat(args.time);
            if (method && _length > 0 && _time >= 0) {
                const anim = new Animate(method, {
                    start: _start,
                    end: _end,
                    length: _length
                });
                return anim.at(_time);
            }
            return 0;
        }

        async Move(args, util) {
            const method = getMethod(args.type);
            if (!method) return;
            const duration = parseFloat(args.time);
            const startX = util.target.x;
            const startY = util.target.y;
            const endX = parseFloat(args.endx);
            const endY = parseFloat(args.endy);
            const ms = duration * 1000;
            const startTime = Date.now();
            while (true) {
                const elapsed = Date.now() - startTime;
                if (elapsed >= ms) break;
                util.target.setXY(
                    new Animate(method, { start: startX, end: endX, length: ms }).at(elapsed),
                    new Animate(method, { start: startY, end: endY, length: ms }).at(elapsed)
                );
                await new Promise(resolve => setTimeout(resolve, 16));
            }
            util.target.setXY(endX, endY);
        }

        async Effect(args, util) {
            const method = getMethod(args.type);
            if (!method) return;
            const duration = parseFloat(args.time);
            const endv = parseFloat(args.endv);
            const ms = duration * 1000;
            const startTime = Date.now();
            let startv;
            if (args.Effect !== "size") {
                startv = util.target.effects[args.Effect] || 0;
            } else {
                startv = util.target.size;
            }
            while (true) {
                const elapsed = Date.now() - startTime;
                if (elapsed >= ms) break;
                const value = new Animate(method, { start: startv, end: endv, length: ms }).at(elapsed);
                if (args.Effect !== "size") {
                    util.target.setEffect(args.Effect, value);
                } else {
                    util.target.setSize(value);
                }
                await new Promise(resolve => setTimeout(resolve, 16));
            }
            if (args.Effect !== "size") {
                util.target.setEffect(args.Effect, endv);
            } else {
                util.target.setSize(endv);
            }
        }

        async Dir(args, util) {
            const method = getMethod(args.type);
            if (!method) return;
            const duration = parseFloat(args.time);
            const endv = parseFloat(args.endv);
            const ms = duration * 1000;
            const startTime = Date.now();
            const startv = util.target.direction;
            while (true) {
                const elapsed = Date.now() - startTime;
                if (elapsed >= ms) break;
                util.target.setDirection(
                    new Animate(method, { start: startv, end: endv, length: ms }).at(elapsed)
                );
                await new Promise(resolve => setTimeout(resolve, 16));
            }
            util.target.setDirection(endv);
        }

        getEffect(args, util) {
            if (args.Effect !== "size") {
                return util.target.effects[args.Effect] || 0;
            } else {
                return util.target.size;
            }
        }
    }

    Scratch.extensions.register(new Animator());
})(typeof Scratch !== "undefined" ? Scratch : window.Scratch);
