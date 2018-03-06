(function(mod) {  
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
      else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
      else // Plain browser env
        mod(CodeMirror);
})(function(a) {  
    function b(a, b) {
        for (var c = 0, d = a.length; c < d; ++c)
            b(a[c])
    }
    function c(a, b) {
        if (!Array.prototype.indexOf) {
            for (var c = a.length; c--; )
                if (a[c] === b)
                    return !0;
            return !1
        }
        return a.indexOf(b) != -1
    }
    function d(b, c, d, e) {
        var h = b.getCursor(),
        i = d(b, h);
        if (!/\b(?:string)\b/.test(i.type)) {
            i.state = a.innerMode(b.getMode(), i.state).state,
            /^[\w$_]*$/.test(i.string) ? i.end > h.ch && (i.end = h.ch, i.string = i.string.slice(0, h.ch - i.start)) : i = {
                start: h.ch,
                end: h.ch,
                string: "",
                state: i.state,
                type: "." == i.string ? "property" : null
            };
            for (var j = i; "property" == j.type; ) {
                if (j = d(b, g(h.line, j.start)), "." != j.string)
                    return;
                if (j = d(b, g(h.line, j.start)), !k)
                    var k = [];
                k.push(j)
            }
            return {
                list: f(i, k, c, e),
                from: g(h.line, i.start),
                to: g(h.line, i.end)
            }
        }
    }
    function e(b, c) {
        return d(b, a.fomulaContext, function (a, b) {
            return a.getTokenAt(b)
        }, c)
    }
    function f(a, d, e, f) {
        function g(a) {
            0 != a.lastIndexOf(i, 0) || c(h, a) || h.push(a)
        }
        var h = [],
        i = a.string.toUpperCase();
        return i ? (d && d.length ? d.pop() : b(e, g), h) : h
    }
    var g = a.Pos;
    a.registerHelper("hint", "formula", e)
    "use strict";
    a.defineMode("formula", function () {
        function b(a) {
            for (var b = {}, c = 0, d = a.length; c < d; ++c)
                b[a[c]] = !0;
            return b
        }
        function c(a, b) {
            if (a.eatSpace())
                return null;
            var c = a.next();
            if ('"' === c || "'" === c)
                return d(a, c), "string";
            if ("â€‹" === c)
                return d(a, c), "field";
            if (/[\[\],\(\)]/.test(c))
                return "bracket";
            if (/[+\-*\/=<>!&|]/.test(c))
                return "operator";
            if (/\d/.test(c))
                return a.eatWhile(/[\d\.]/), "number";
            a.eatWhile(/[\w]/);
            var e = a.current();
            return f.hasOwnProperty(e) ? "atom" : g.hasOwnProperty(e) ? "keyword" : h.hasOwnProperty(e) ? "deprecate" : null
        }
        function d(a, b) {
            for (var c, d = !1; null != (c = a.next()); ) {
                if (c === b && !d)
                    return !1;
                d = !d && "\\" === c
            }
            return d
        }
        function e(a, b) {
            return (b.tokens[0] || c)(a, b)
        }
        var f = b(["false", "true"]),
        g = b(a.fomulaContext),
        h = b(["MAP"]);
        return {
            startState: function () {
                return {
                    tokens: []
                }
            },
            token: function (a, b) {
                return e(a, b)
            },
            fold: "brace"
        }
    }),
    a.defineMIME("text/fx-formula", "formula")
}); 

