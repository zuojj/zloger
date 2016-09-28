/**
 *
 * @authors Benjamin (zuojj.com@gmail.com)
 * @date    2016-09-27 14:48:37
 * @version $Id$
 */

! function(sd) {
    function app_js_bridge() {
        function e(e) {
            r = e, _.isJSONString(r) && (r = json.parse(r)), n && n(e)
        }

        function t() {
            "object" == typeof window.SensorsData_APP_JS_Bridge && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app && (r = SensorsData_APP_JS_Bridge.sensorsdata_call_app(), _.isJSONString(r) && (r = json.parse(r)))
        }
        var r = null,
            n = null;
        window.sensorsdata_app_js_bridge_call_js = function(t) {
            e(t)
        }, sd.getAppStatus = function(e) {
            return t(), e ? void(null === r ? n = e : e(r)) : r
        }
    }
    if (sd = window[sd], sd._t = sd._t || 1 * new Date, "function" != typeof sd && "object" != typeof sd || sd.has_load_sdk) return !1;
    sd.has_load_sdk = !0, "object" != typeof JSON && (JSON = {}),
        function() {
            "use strict";

            function f(e) {
                return 10 > e ? "0" + e : e
            }

            function this_value() {
                return this.valueOf()
            }

            function quote(e) {
                return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function(e) {
                    var t = meta[e];
                    return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var r, n, o, i, s, a = gap,
                    c = t[e];
                switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                    case "string":
                        return quote(c);
                    case "number":
                        return isFinite(c) ? String(c) : "null";
                    case "boolean":
                    case "null":
                        return String(c);
                    case "object":
                        if (!c) return "null";
                        if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                            for (i = c.length, r = 0; i > r; r += 1) s[r] = str(r, c) || "null";
                            return o = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, o
                        }
                        if (rep && "object" == typeof rep)
                            for (i = rep.length, r = 0; i > r; r += 1) "string" == typeof rep[r] && (n = rep[r], o = str(n, c), o && s.push(quote(n) + (gap ? ": " : ":") + o));
                        else
                            for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (o = str(n, c), o && s.push(quote(n) + (gap ? ": " : ":") + o));
                        return o = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, o
                }
            }
            var rx_one = /^[\],:{}\s]*$/,
                rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                rx_four = /(?:^|:|,)(?:\s*\[)+/g,
                rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
            var gap, indent, meta, rep;
            "function" != typeof JSON.stringify && (meta = {
                "\b": "\\b",
                "    ": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }, JSON.stringify = function(e, t, r) {
                var n;
                if (gap = "", indent = "", "number" == typeof r)
                    for (n = 0; r > n; n += 1) indent += " ";
                else "string" == typeof r && (indent = r);
                if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                return str("", {
                    "": e
                })
            }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                function walk(e, t) {
                    var r, n, o = e[t];
                    if (o && "object" == typeof o)
                        for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (n = walk(o, r), void 0 !== n ? o[r] = n : delete o[r]);
                    return reviver.call(e, t, o)
                }
                var j;
                if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }();
    var _ = sd._ = {};
    sd.para = sd.para || {}, sd.para_default = {
        max_referrer_string_length: 500,
        max_string_length: 1e3,
        cross_subdomain: !0,
        show_log: !0,
        debug_mode: !1,
        debug_mode_upload: !1,
        session_time: 0,
        use_client_time: !1,
        source_channel: [],
        vtrack_ignore: {}
    };
    for (var i in sd.para_default) void 0 === sd.para[i] && (sd.para[i] = sd.para_default[i]);
    /sa\.gif[^\/]*$/.test(sd.para.server_url) || (sd.para.server_url = sd.para.server_url.replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2")), sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace("sa.gif", "debug"), sd.para.noCache === !0 ? sd.para.noCache = "?" + (new Date).getTime() : sd.para.noCache = "";
    var detector = {};
    ! function() {
        function e(e) {
            return Object.prototype.toString.call(e)
        }

        function t(t) {
            return "[object Object]" === e(t)
        }

        function r(t) {
            return "[object Function]" === e(t)
        }

        function n(e, t) {
            for (var r = 0, n = e.length; n > r && t.call(e, e[r], r) !== !1; r++);
        }

        function o(e) {
            if (!_.test(e)) return null;
            var t, r, n, o, i;
            if (-1 !== e.indexOf("trident/") && (t = /\btrident\/([0-9.]+)/.exec(e), t && t.length >= 2)) {
                n = t[1];
                var s = t[1].split(".");
                s[0] = parseInt(s[0], 10) + 4, i = s.join(".")
            }
            t = _.exec(e), o = t[1];
            var a = t[1].split(".");
            return "undefined" == typeof i && (i = o), a[0] = parseInt(a[0], 10) - 4, r = a.join("."), "undefined" == typeof n && (n = r), {
                browserVersion: i,
                browserMode: o,
                engineVersion: n,
                engineMode: r,
                compatible: n !== r
            }
        }

        function i(e) {
            if (f) try {
                var t = f.twGetRunPath.toLowerCase(),
                    r = f.twGetSecurityID(u),
                    n = f.twGetVersion(r);
                if (t && -1 === t.indexOf(e)) return !1;
                if (n) return {
                    version: n
                }
            } catch (o) {}
        }

        function s(n, o, i) {
            var s = r(o) ? o.call(null, i) : o;
            if (!s) return null;
            var a = {
                    name: n,
                    version: c,
                    codename: ""
                },
                u = e(s);
            if (s === !0) return a;
            if ("[object String]" === u) {
                if (-1 !== i.indexOf(s)) return a
            } else {
                if (t(s)) return s.hasOwnProperty("version") && (a.version = s.version), a;
                if (s.exec) {
                    var f = s.exec(i);
                    if (f) return f.length >= 2 && f[1] ? a.version = f[1].replace(/_/g, ".") : a.version = c, a
                }
            }
        }

        function a(e, t, r, o) {
            var i = S;
            n(t, function(t) {
                var r = s(t[0], t[1], e);
                return r ? (i = r, !1) : void 0
            }), r.call(o, i.name, i.version)
        }
        var c = "-1",
            u = window,
            f = u.external,
            d = u.navigator.userAgent || "",
            p = u.navigator.appVersion || "",
            l = u.navigator.vendor || "",
            _ = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/,
            g = /\bbb10\b.+?\bversion\/([\d.]+)/,
            h = /\bblackberry\b.+\bversion\/([\d.]+)/,
            b = /\bblackberry\d+\/([\d.]+)/,
            m = [
                ["nokia", function(e) {
                    return -1 !== e.indexOf("nokia ") ? /\bnokia ([0-9]+)?/ : /\bnokia([a-z0-9]+)?/
                }],
                ["samsung", function(e) {
                    return -1 !== e.indexOf("samsung") ? /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/ : /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/
                }],
                ["wp", function(e) {
                    return -1 !== e.indexOf("windows phone ") || -1 !== e.indexOf("xblwp") || -1 !== e.indexOf("zunewp") || -1 !== e.indexOf("windows ce")
                }],
                ["pc", "windows"],
                ["ipad", "ipad"],
                ["ipod", "ipod"],
                ["iphone", /\biphone\b|\biph(\d)/],
                ["mac", "macintosh"],
                ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
                ["hongmi", /\bhm[ \-]?([a-z0-9]+)/],
                ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
                ["meizu", function(e) {
                    return e.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9cx]{1,4})\b/
                }],
                ["nexus", /\bnexus ([0-9s.]+)/],
                ["huawei", function(e) {
                    var t = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
                    return -1 !== e.indexOf("huawei-huawei") ? /\bhuawei\-huawei\-([a-z0-9\-]+)/ : t.test(e) ? t : /\bhuawei[ _\-]?([a-z0-9]+)/
                }],
                ["lenovo", function(e) {
                    return -1 !== e.indexOf("lenovo-lenovo") ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/ : /\blenovo[ \-]?([a-z0-9]+)/
                }],
                ["zte", function(e) {
                    return /\bzte\-[tu]/.test(e) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/ : /\bzte[ _\-]?([a-su-z0-9\+]+)/
                }],
                ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
                ["htc", function(e) {
                    return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/ : /\bhtc[ _\-]?([a-z0-9 ]+)/
                }],
                ["oppo", /\boppo[_]([a-z0-9]+)/],
                ["konka", /\bkonka[_\-]([a-z0-9]+)/],
                ["sonyericsson", /\bmt([a-z0-9]+)/],
                ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
                ["lg", /\blg[\-]([a-z0-9]+)/],
                ["android", /\bandroid\b|\badr\b/],
                ["blackberry", function(e) {
                    return e.indexOf("blackberry") >= 0 ? /\bblackberry\s?(\d+)/ : "bb10"
                }]
            ],
            v = [
                ["wp", function(e) {
                    return -1 !== e.indexOf("windows phone ") ? /\bwindows phone (?:os )?([0-9.]+)/ : -1 !== e.indexOf("xblwp") ? /\bxblwp([0-9.]+)/ : -1 !== e.indexOf("zunewp") ? /\bzunewp([0-9.]+)/ : "windows phone"
                }],
                ["windows", /\bwindows nt ([0-9.]+)/],
                ["macosx", /\bmac os x ([0-9._]+)/],
                ["iPhone OS", function(e) {
                    return /\bcpu(?: iphone)? os /.test(e) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : -1 !== e.indexOf("iph os ") ? /\biph os ([0-9_]+)/ : /\bios\b/
                }],
                ["yunos", /\baliyunos ([0-9.]+)/],
                ["Android", function(e) {
                    return e.indexOf("android") >= 0 ? /\bandroid[ \/-]?([0-9.x]+)?/ : e.indexOf("adr") >= 0 ? e.indexOf("mqqbrowser") >= 0 ? /\badr[ ]\(linux; u; ([0-9.]+)?/ : /\badr(?:[ ]([0-9.]+))?/ : "android"
                }],
                ["chromeos", /\bcros i686 ([0-9.]+)/],
                ["linux", "linux"],
                ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
                ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
                ["blackberry", function(e) {
                    var t = e.match(g) || e.match(h) || e.match(b);
                    return t ? {
                        version: t[1]
                    } : "blackberry"
                }]
            ],
            y = [
                ["edgehtml", /edge\/([0-9.]+)/],
                ["trident", _],
                ["blink", function() {
                    return "chrome" in u && "CSS" in u && /\bapplewebkit[\/]?([0-9.+]+)/
                }],
                ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
                ["gecko", function(e) {
                    var t;
                    return (t = e.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/)) ? {
                        version: t[1] + "." + t[2]
                    } : void 0
                }],
                ["presto", /\bpresto\/([0-9.]+)/],
                ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
                ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
                ["u2", /\bu2\/([0-9.]+)/],
                ["u3", /\bu3\/([0-9.]+)/]
            ],
            w = [
                ["edge", /edge\/([0-9.]+)/],
                ["sogou", function(e) {
                    return e.indexOf("sogoumobilebrowser") >= 0 ? /sogoumobilebrowser\/([0-9.]+)/ : e.indexOf("sogoumse") >= 0 ? !0 : / se ([0-9.x]+)/
                }],
                ["theworld", function() {
                    var e = i("theworld");
                    return "undefined" != typeof e ? e : "theworld"
                }],
                ["360", function(e) {
                    var t = i("360se");
                    return "undefined" != typeof t ? t : -1 !== e.indexOf("360 aphone browser") ? /\b360 aphone browser \(([^\)]+)\)/ : /\b360(?:se|ee|chrome|browser)\b/
                }],
                ["maxthon", function() {
                    try {
                        if (f && (f.mxVersion || f.max_version)) return {
                            version: f.mxVersion || f.max_version
                        }
                    } catch (e) {}
                    return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/
                }],
                ["micromessenger", /\bmicromessenger\/([\d.]+)/],
                ["qq", /\bm?qqbrowser\/([0-9.]+)/],
                ["green", "greenbrowser"],
                ["tt", /\btencenttraveler ([0-9.]+)/],
                ["liebao", function(e) {
                    if (e.indexOf("liebaofast") >= 0) return /\bliebaofast\/([0-9.]+)/;
                    if (-1 === e.indexOf("lbbrowser")) return !1;
                    var t;
                    try {
                        f && f.LiebaoGetVersion && (t = f.LiebaoGetVersion())
                    } catch (r) {}
                    return {
                        version: t || c
                    }
                }],
                ["tao", /\btaobrowser\/([0-9.]+)/],
                ["coolnovo", /\bcoolnovo\/([0-9.]+)/],
                ["saayaa", "saayaa"],
                ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
                ["ie", _],
                ["mi", /\bmiuibrowser\/([0-9.]+)/],
                ["opera", function(e) {
                    var t = /\bopera.+version\/([0-9.ab]+)/,
                        r = /\bopr\/([0-9.]+)/;
                    return t.test(e) ? t : r
                }],
                ["oupeng", /\boupeng\/([0-9.]+)/],
                ["yandex", /yabrowser\/([0-9.]+)/],
                ["ali-ap", function(e) {
                    return e.indexOf("aliapp") > 0 ? /\baliapp\(ap\/([0-9.]+)\)/ : /\balipayclient\/([0-9.]+)\b/
                }],
                ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
                ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
                ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
                ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
                ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
                ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
                ["uc", function(e) {
                    return e.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/ : e.indexOf("ubrowser/") >= 0 ? /\bubrowser\/([0-9.]+)/ : /\buc\/[0-9]/.test(e) ? /\buc\/([0-9.]+)/ : e.indexOf("ucweb") >= 0 ? /\bucweb([0-9.]+)?/ : /\b(?:ucbrowser|uc)\b/
                }],
                ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
                ["android", function(e) {
                    return -1 !== e.indexOf("android") ? /\bversion\/([0-9.]+(?: beta)?)/ : void 0
                }],
                ["blackberry", function(e) {
                    var t = e.match(g) || e.match(h) || e.match(b);
                    return t ? {
                        version: t[1]
                    } : "blackberry"
                }],
                ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
                ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
                ["firefox", /\bfirefox\/([0-9.ab]+)/],
                ["nokia", /\bnokiabrowser\/([0-9.]+)/]
            ],
            S = {
                name: "na",
                version: c
            },
            x = function(e) {
                e = (e || "").toLowerCase();
                var t = {};
                a(e, m, function(e, r) {
                    var n = parseFloat(r);
                    t.device = {
                        name: e,
                        version: n,
                        fullVersion: r
                    }, t.device[e] = n
                }, t), a(e, v, function(e, r) {
                    var n = parseFloat(r);
                    t.os = {
                        name: e,
                        version: n,
                        fullVersion: r
                    }, t.os[e] = n
                }, t);
                var r = o(e);
                return a(e, y, function(e, n) {
                    var o = n;
                    r && (n = r.engineVersion || r.engineMode, o = r.engineMode);
                    var i = parseFloat(n);
                    t.engine = {
                        name: e,
                        version: i,
                        fullVersion: n,
                        mode: parseFloat(o),
                        fullMode: o,
                        compatible: r ? r.compatible : !1
                    }, t.engine[e] = i
                }, t), a(e, w, function(e, n) {
                    var o = n;
                    r && ("ie" === e && (n = r.browserVersion), o = r.browserMode);
                    var i = parseFloat(n);
                    t.browser = {
                        name: e,
                        version: i,
                        fullVersion: n,
                        mode: parseFloat(o),
                        fullMode: o,
                        compatible: r ? r.compatible : !1
                    }, t.browser[e] = i
                }, t), t
            };
        detector = x(d + " " + p + " " + l)
    }();
    var ArrayProto = Array.prototype,
        FuncProto = Function.prototype,
        ObjProto = Object.prototype,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty,
        LIB_VERSION = "1.6.1";
    sd.lib_version = LIB_VERSION;
    var error_msg = [],
        is_first_visitor = !1,
        source_channel_standard = "utm_source utm_medium utm_campaign utm_content utm_term",
        logger = "object" == typeof logger ? logger : {};
    logger.info = function() {
            if (!sd.para.show_log) return !1;
            if ("object" == typeof console && console.log) try {
                return console.log.apply(console, arguments)
            } catch (e) {
                console.log(arguments[0])
            }
        },
        function() {
            var e = (FuncProto.bind, ArrayProto.forEach),
                t = ArrayProto.indexOf,
                r = Array.isArray,
                n = {},
                o = _.each = function(t, r, o) {
                    if (null == t) return !1;
                    if (e && t.forEach === e) t.forEach(r, o);
                    else if (t.length === +t.length) {
                        for (var i = 0, s = t.length; s > i; i++)
                            if (i in t && r.call(o, t[i], i, t) === n) return !1
                    } else
                        for (var a in t)
                            if (hasOwnProperty.call(t, a) && r.call(o, t[a], a, t) === n) return !1
                };
            _.logger = logger, _.extend = function(e) {
                return o(slice.call(arguments, 1), function(t) {
                    for (var r in t) void 0 !== t[r] && (e[r] = t[r])
                }), e
            }, _.extend2Lev = function(e) {
                return o(slice.call(arguments, 1), function(t) {
                    for (var r in t) void 0 !== t[r] && (_.isObject(t[r]) && _.isObject(e[r]) ? _.extend(e[r], t[r]) : e[r] = t[r])
                }), e
            }, _.coverExtend = function(e) {
                return o(slice.call(arguments, 1), function(t) {
                    for (var r in t) void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r])
                }), e
            }, _.isArray = r || function(e) {
                return "[object Array]" === toString.call(e)
            }, _.isFunction = function(e) {
                try {
                    return /^\s*\bfunction\b/.test(e)
                } catch (t) {
                    return !1
                }
            }, _.isArguments = function(e) {
                return !(!e || !hasOwnProperty.call(e, "callee"))
            }, _.toArray = function(e) {
                return e ? e.toArray ? e.toArray() : _.isArray(e) ? slice.call(e) : _.isArguments(e) ? slice.call(e) : _.values(e) : []
            }, _.values = function(e) {
                var t = [];
                return null == e ? t : (o(e, function(e) {
                    t[t.length] = e
                }), t)
            }, _.include = function(e, r) {
                var i = !1;
                return null == e ? i : t && e.indexOf === t ? -1 != e.indexOf(r) : (o(e, function(e) {
                    return i || (i = e === r) ? n : void 0
                }), i)
            }, _.includes = function(e, t) {
                return -1 !== e.indexOf(t)
            }
        }(), _.inherit = function(e, t) {
            return e.prototype = new t, e.prototype.constructor = e, e.superclass = t.prototype, e
        }, _.isObject = function(e) {
            return "[object Object]" == toString.call(e)
        }, _.isEmptyObject = function(e) {
            if (_.isObject(e)) {
                for (var t in e)
                    if (hasOwnProperty.call(e, t)) return !1;
                return !0
            }
            return !1
        }, _.isUndefined = function(e) {
            return void 0 === e
        }, _.isString = function(e) {
            return "[object String]" == toString.call(e)
        }, _.isDate = function(e) {
            return "[object Date]" == toString.call(e)
        }, _.isBoolean = function(e) {
            return "[object Boolean]" == toString.call(e)
        }, _.isNumber = function(e) {
            return "[object Number]" == toString.call(e) && /[\d\.]+/.test(String(e))
        }, _.isJSONString = function(e) {
            try {
                JSON.parse(e)
            } catch (t) {
                return !1
            }
            return !0
        }, _.encodeDates = function(e) {
            return _.each(e, function(t, r) {
                _.isDate(t) ? e[r] = _.formatDate(t) : _.isObject(t) && (e[r] = _.encodeDates(t))
            }), e
        }, _.formatDate = function(e) {
            function t(e) {
                return 10 > e ? "0" + e : e
            }
            return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
        }, _.searchObjDate = function(e) {
            _.isObject(e) && _.each(e, function(t, r) {
                _.isObject(t) ? _.searchObjDate(e[r]) : _.isDate(t) && (e[r] = _.formatDate(t))
            })
        }, _.formatString = function(e) {
            return e.length > sd.para.max_string_length ? (logger.info("字符串长度超过限制，已经做截取--" + e), e.slice(0, sd.para.max_string_length)) : e
        }, _.searchObjString = function(e) {
            _.isObject(e) && _.each(e, function(t, r) {
                _.isObject(t) ? _.searchObjString(e[r]) : _.isString(t) && (e[r] = _.formatString(t))
            })
        }, _.unique = function(e) {
            for (var t, r = [], n = {}, o = 0; o < e.length; o++) t = e[o], t in n || (n[t] = !0, r.push(t));
            return r
        }, _.strip_sa_properties = function(e) {
            return _.isObject(e) ? (_.each(e, function(t, r) {
                if (_.isArray(t)) {
                    var n = [];
                    _.each(t, function(e) {
                        _.isString(e) ? n.push(e) : logger.info("您的数据-", t, "的数组里的值必须是字符串,已经将其删除")
                    }), 0 !== n.length ? e[r] = n : (delete e[r], logger.info("已经删除空的数组"))
                }
                _.isString(t) || _.isNumber(t) || _.isDate(t) || _.isBoolean(t) || _.isArray(t) || (logger.info("您的数据-", t, "-格式不满足要求，我们已经将其删除"), delete e[r])
            }), e) : e
        }, _.strip_empty_properties = function(e) {
            var t = {};
            return _.each(e, function(e, r) {
                _.isString(e) && e.length > 0 && (t[r] = e)
            }), t
        }, _.utf8Encode = function(e) {
            e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
            var t, r, n, o = "",
                i = 0;
            for (t = r = 0, i = e.length, n = 0; i > n; n++) {
                var s = e.charCodeAt(n),
                    a = null;
                128 > s ? r++ : a = s > 127 && 2048 > s ? String.fromCharCode(s >> 6 | 192, 63 & s | 128) : String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128), null !== a && (r > t && (o += e.substring(t, r)), o += a, t = r = n + 1)
            }
            return r > t && (o += e.substring(t, e.length)), o
        }, _.detector = detector, _.base64Encode = function(e) {
            var t, r, n, o, i, s, a, c, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                f = 0,
                d = 0,
                p = "",
                l = [];
            if (!e) return e;
            e = _.utf8Encode(e);
            do t = e.charCodeAt(f++), r = e.charCodeAt(f++), n = e.charCodeAt(f++), c = t << 16 | r << 8 | n, o = c >> 18 & 63, i = c >> 12 & 63, s = c >> 6 & 63, a = 63 & c, l[d++] = u.charAt(o) + u.charAt(i) + u.charAt(s) + u.charAt(a); while (f < e.length);
            switch (p = l.join(""), e.length % 3) {
                case 1:
                    p = p.slice(0, -2) + "==";
                    break;
                case 2:
                    p = p.slice(0, -1) + "="
            }
            return p
        }, _.UUID = function() {
            var e = function() {
                    for (var e = 1 * new Date, t = 0; e == 1 * new Date;) t++;
                    return e.toString(16) + t.toString(16)
                },
                t = function() {
                    return Math.random().toString(16).replace(".", "")
                },
                r = function(e) {
                    function t(e, t) {
                        var r, n = 0;
                        for (r = 0; r < t.length; r++) n |= i[r] << 8 * r;
                        return e ^ n
                    }
                    var r, n, o = navigator.userAgent,
                        i = [],
                        s = 0;
                    for (r = 0; r < o.length; r++) n = o.charCodeAt(r), i.unshift(255 & n), i.length >= 4 && (s = t(s, i), i = []);
                    return i.length > 0 && (s = t(s, i)), s.toString(16)
                };
            return function() {
                var n = String(screen.height * screen.width);
                return n = n && /\d{5,}/.test(n) ? n.toString(16) : String(31242 * Math.random()).replace(".", "").slice(0, 8), e() + "-" + t() + "-" + r() + "-" + n + "-" + e()
            }
        }(), _.getQueryParam = function(e, t) {
            t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var r = "[\\?&]" + t + "=([^&#]*)",
                n = new RegExp(r),
                o = n.exec(e);
            return null === o || o && "string" != typeof o[1] && o[1].length ? "" : decodeURIComponent(o[1]).replace(/\+/g, " ")
        }, _.urlParse = function(e) {
            var t = function(e) {
                this._fields = {
                    Username: 4,
                    Password: 5,
                    Port: 7,
                    Protocol: 2,
                    Host: 6,
                    Path: 8,
                    URL: 0,
                    QueryString: 9,
                    Fragment: 10
                }, this._values = {}, this._regex = null, this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/, "undefined" != typeof e && this._parse(e)
            };
            return t.prototype.setUrl = function(e) {
                this._parse(e)
            }, t.prototype._initValues = function() {
                for (var e in this._fields) this._values[e] = ""
            }, t.prototype.getUrl = function() {
                var e = "";
                return e += this._values.Origin, e += this._values.Port ? ":" + this._values.Port : "", e += this._values.Path, e += this._values.QueryString ? "?" + this._values.QueryString : ""
            }, t.prototype._parse = function(e) {
                this._initValues();
                var t = this._regex.exec(e);
                if (!t) throw "DPURLParser::_parse -> Invalid URL";
                for (var r in this._fields) "undefined" != typeof t[this._fields[r]] && (this._values[r] = t[this._fields[r]]);
                this._values.Hostname = this._values.Host.replace(/:\d+$/, ""), this._values.Origin = this._values.Protocol + "://" + this._values.Hostname
            }, new t(e)
        }, _.hasStandardBrowserEnviroment = function() {
            return window ? document ? navigator ? screen ? void 0 : "screen" : "navigator" : "document" : "window"
        }, _.cookie = {
            get: function(e) {
                for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
                    for (var o = r[n];
                        " " == o.charAt(0);) o = o.substring(1, o.length);
                    if (0 == o.indexOf(t)) return decodeURIComponent(o.substring(t.length, o.length))
                }
                return null
            },
            set: function(e, t, r, n, o) {
                n = "undefined" == typeof n ? sd.para.cross_subdomain : n;
                var i = "",
                    s = "",
                    a = "";
                if (r = "undefined" == typeof r ? 730 : r, n) {
                    var c = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                        u = c ? c[0] : "";
                    i = u ? "; domain=." + u : ""
                }
                if (0 !== r) {
                    var f = new Date;
                    "s" === String(r).slice(-1) ? f.setTime(f.getTime() + 1e3 * Number(String(r).slice(0, -1))) : f.setTime(f.getTime() + 24 * r * 60 * 60 * 1e3), s = "; expires=" + f.toGMTString()
                }
                o && (a = "; secure"), document.cookie = e + "=" + encodeURIComponent(t) + s + "; path=/" + i + a
            },
            remove: function(e, t) {
                t = "undefined" == typeof t ? sd.para.cross_subdomain : t, _.cookie.set(e, "", -1, t)
            }
        }, _.localStorage = {
            get: function(e) {
                return window.localStorage.getItem(e)
            },
            parse: function(e) {
                var t;
                try {
                    t = JSON.parse(_.localStorage.get(e)) || null
                } catch (r) {}
                return t
            },
            set: function(e, t) {
                window.localStorage.setItem(e, t)
            },
            remove: function(e) {
                window.localStorage.removeItem(e)
            },
            isSupport: function() {
                var e = !0;
                try {
                    var t = "__sensorsdatasupport__",
                        r = "testIsSupportStorage";
                    _.localStorage.set(t, r), _.localStorage.get(t) !== r && (e = !1), _.localStorage.remove(t)
                } catch (n) {
                    e = !1
                }
                return e
            }
        }, _.xhr = function(e) {
            if (e) {
                var t = new XMLHttpRequest;
                return "withCredentials" in t ? t : "undefined" != typeof XDomainRequest ? new XDomainRequest : t
            }
            if (XMLHttpRequest) return new XMLHttpRequest;
            if (window.ActiveXObject) try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (r) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (r) {}
            }
        }, _.ajax = function(e) {
            function t(e) {
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return {}
                }
            }
            var r = _.xhr(e.cors);
            e.type || (e.type = e.data ? "POST" : "GET"), e = _.extend({
                success: function() {},
                error: function() {}
            }, e), r.onreadystatechange = function() {
                4 == r.readyState && (r.status >= 200 && r.status < 300 || 304 == r.status ? e.success(t(r.responseText)) : e.error(t(r.responseText), r.status), r.onreadystatechange = null, r.onload = null)
            }, r.open(e.type, e.url, !0);
            try {
                if (r.withCredentials = !0, _.isObject(e.header))
                    for (var n in e.header) r.setRequestHeader(n, e.header[n]);
                e.data && (r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "application/json" === e.contentType ? r.setRequestHeader("Content-type", "application/json; charset=UTF-8") : r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"))
            } catch (o) {}
            r.send(e.data || null)
        }, _.url = function() {
            function e() {
                return new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/)
            }

            function t(e) {
                return decodeURIComponent(e.replace(/\+/g, " "))
            }

            function r(e, t) {
                var r = e.charAt(0),
                    n = t.split(r);
                return r === e ? n : (e = parseInt(e.substring(1), 10), n[0 > e ? n.length + e : e - 1])
            }

            function n(e, r) {
                for (var n = e.charAt(0), o = r.split("&"), i = [], s = {}, a = [], c = e.substring(1), u = 0, f = o.length; f > u; u++)
                    if (i = o[u].match(/(.*?)=(.*)/), i || (i = [o[u], o[u], ""]), "" !== i[1].replace(/\s/g, "")) {
                        if (i[2] = t(i[2] || ""), c === i[1]) return i[2];
                        a = i[1].match(/(.*)\[([0-9]+)\]/), a ? (s[a[1]] = s[a[1]] || [], s[a[1]][a[2]] = i[2]) : s[i[1]] = i[2]
                    }
                return n === e ? s : s[c]
            }
            return function(t, o) {
                var i, s = {};
                if ("tld?" === t) return e();
                if (o = o || window.location.toString(), !t) return o;
                if (t = t.toString(), i = o.match(/^mailto:([^\/].+)/)) s.protocol = "mailto", s.email = i[1];
                else {
                    if ((i = o.match(/(.*?)\/#\!(.*)/)) && (o = i[1] + i[2]), (i = o.match(/(.*?)#(.*)/)) && (s.hash = i[2], o = i[1]), s.hash && t.match(/^#/)) return n(t, s.hash);
                    if ((i = o.match(/(.*?)\?(.*)/)) && (s.query = i[2], o = i[1]), s.query && t.match(/^\?/)) return n(t, s.query);
                    if ((i = o.match(/(.*?)\:?\/\/(.*)/)) && (s.protocol = i[1].toLowerCase(), o = i[2]), (i = o.match(/(.*?)(\/.*)/)) && (s.path = i[2], o = i[1]), s.path = (s.path || "").replace(/^([^\/])/, "/$1").replace(/\/$/, ""), t.match(/^[\-0-9]+$/) && (t = t.replace(/^([^\/])/, "/$1")), t.match(/^\//)) return r(t, s.path.substring(1));
                    if (i = r("/-1", s.path.substring(1)), i && (i = i.match(/(.*?)\.(.*)/)) && (s.file = i[0], s.filename = i[1], s.fileext = i[2]), (i = o.match(/(.*)\:([0-9]+)$/)) && (s.port = i[2], o = i[1]), (i = o.match(/(.*?)@(.*)/)) && (s.auth = i[1], o = i[2]), s.auth && (i = s.auth.match(/(.*)\:(.*)/), s.user = i ? i[1] : s.auth, s.pass = i ? i[2] : void 0), s.hostname = o.toLowerCase(), "." === t.charAt(0)) return r(t, s.hostname);
                    e() && (i = s.hostname.match(e()), i && (s.tld = i[3], s.domain = i[2] ? i[2] + "." + i[3] : void 0, s.sub = i[1] || void 0)), s.port = s.port || ("https" === s.protocol ? "443" : "80"), s.protocol = s.protocol || ("443" === s.port ? "https" : "http")
                }
                return t in s ? s[t] : "{}" === t ? s : void 0
            }
        }(), _.info = {
            initPage: function() {
                var e = document.referrer,
                    t = e ? _.url("hostname", e) : e,
                    r = e ? _.url("domain", e) : e,
                    n = location.href,
                    o = n ? _.url("hostname", n) : n,
                    i = n ? _.url("domain", n) : n;
                this.pageProp = {
                    referrer: e,
                    referrer_host: t,
                    referrer_domain: r,
                    url: n,
                    url_host: o,
                    url_domain: i
                }
            },
            pageProp: {},
            campaignParams: function() {
                var e = source_channel_standard.split(" "),
                    t = "",
                    r = {};
                return _.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0 && (e = e.concat(sd.para.source_channel), e = _.unique(e)), _.each(e, function(e) {
                    t = _.getQueryParam(location.href, e), t.length && (r[e] = t)
                }), r
            },
            campaignParamsStandard: function(e) {
                var t = _.info.campaignParams(),
                    r = {},
                    n = {};
                for (var o in t) - 1 !== (" " + source_channel_standard + " ").indexOf(" " + o + " ") ? r[e + o] = t[o] : n[o] = t[o];
                return {
                    $utms: r,
                    otherUtms: n
                }
            },
            properties: function() {
                return {
                    $os: detector.os.name,
                    $model: detector.device.name,
                    $os_version: String(detector.os.version),
                    $screen_height: Number(screen.height) || 0,
                    $screen_width: Number(screen.width) || 0,
                    $lib: "js",
                    $lib_version: String(LIB_VERSION),
                    $browser: detector.browser.name,
                    $browser_version: String(detector.browser.version)
                }
            },
            currentProps: {},
            register: function(e) {
                _.extend(_.info.currentProps, e)
            }
        }, sd.sendState = {}, sd.sendState._complete = 0, sd.sendState._receive = 0, sd.sendState.getSendCall = function(e, t) {
            ++this._receive;
            var r = "_state" + this._receive,
                n = this;
            this[r] = document.createElement("img"), this[r].onload = this[r].onerror = function(e) {
                n[r].onload = null, n[r].onerror = null, delete n[r], ++n._complete, "function" == typeof t && t()
            }, e._nocache = (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15), logger.info(e), e = JSON.stringify(e), -1 !== sd.para.server_url.indexOf("?") ? this[r].src = sd.para.server_url + "&data=" + encodeURIComponent(_.base64Encode(e)) : this[r].src = sd.para.server_url + "?data=" + encodeURIComponent(_.base64Encode(e))
        };
    var saNewUser = {
            checkIsAddSign: function(e) {
                "track" === e.type && (null !== _.cookie.get("sensorsdata_is_new_user") ? e.properties.$is_first_day = !0 : e.properties.$is_first_day = !1)
            },
            is_first_visit_time: !1,
            checkIsFirstTime: function(e) {
                "track" === e.type && (this.is_first_visit_time ? (e.properties.$is_first_time = !0, this.is_first_visit_time = !1) : e.properties.$is_first_time = !1)
            },
            storeInitCheck: function() {
                if (is_first_visitor) {
                    var e = new Date,
                        t = {
                            h: 23 - e.getHours(),
                            m: 59 - e.getMinutes(),
                            s: 59 - e.getSeconds()
                        };
                    _.cookie.set("sensorsdata_is_new_user", "true", 3600 * t.h + 60 * t.m + t.s + "s"), this.is_first_visit_time = !0
                } else null === _.cookie.get("sensorsdata_is_new_user") && (this.checkIsAddSign = function(e) {
                    "track" === e.type && (e.properties.$is_first_day = !1)
                }), this.checkIsFirstTime = function(e) {
                    "track" === e.type && (e.properties.$is_first_time = !1)
                }
            },
            checkIsFirstLatest: function() {
                var e = _.info.pageProp.url_domain,
                    t = _.info.pageProp.referrer_domain;
                "" !== e && e !== t && sa.register({
                    $latest_referrer: _.info.pageProp.referrer,
                    $latest_referrer_host: _.info.pageProp.referrer_host
                });
                var r = _.info.campaignParamsStandard("$latest_").$utms;
                _.isEmptyObject(r) || sd.register(r)
            }
        },
        saEvent = {};
    saEvent.checkOption = {
        regChecks: {
            regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
        },
        checkPropertiesKey: function(e) {
            var t = this,
                r = !0;
            return _.each(e, function(e, n) {
                t.regChecks.regName.test(n) || (r = !1)
            }), r
        },
        check: function(e, t) {
            return "string" == typeof this[e] ? this[this[e]](t) : this[e](t)
        },
        str: function(e) {
            return _.isString(e) ? !0 : (logger.info("请检查参数格式,必须是字符串"), !0)
        },
        properties: function(e) {
            return _.strip_sa_properties(e), e ? _.isObject(e) ? this.checkPropertiesKey(e) ? !0 : (logger.info("properties里的key必须是由字符串数字_组成，且不能是系统保留字"), !0) : (logger.info("properties可以没有，但有的话必须是对象"), !0) : !0
        },
        propertiesMust: function(e) {
            return _.strip_sa_properties(e), void 0 === e || !_.isObject(e) || _.isEmptyObject(e) ? (logger.info("properties必须是对象且有值"), !0) : this.checkPropertiesKey(e) ? !0 : (logger.info("properties里的key必须是由字符串数字_组成，且不能是系统保留字"), !0)
        },
        event: function(e) {
            return _.isString(e) && this.regChecks.regName.test(e) ? !0 : (logger.info("请检查参数格式,必须是字符串,且eventName必须是字符串_开头,且不能是系统保留字"), !0)
        },
        test_id: "str",
        group_id: "str",
        distinct_id: function(e) {
            return _.isString(e) && /^.{1,255}$/.test(e) ? !0 : (logger.info("distinct_id必须是不能为空，且小于255位的字符串"), !1)
        }
    }, saEvent.check = function(e) {
        var t = !0;
        for (var r in e)
            if (!this.checkOption.check(r, e[r])) return !1;
        return t
    }, saEvent.send = function(e, t) {
        var r = {
            distinct_id: store.getDistinctId(),
            lib: {
                $lib: "js",
                $lib_method: "code",
                $lib_version: String(LIB_VERSION)
            },
            properties: {}
        };
        if ("string" != typeof store.getDistinctId() || "" == typeof store.getDistinctId()) {
            var n = "";
            switch (store.getDistinctId()) {
                case null:
                    n = "null";
                    break;
                case void 0:
                    n = "undefined";
                    break;
                case "":
                    n = "空";
                    break;
                default:
                    n = String(store.getDistinctId())
            }
            error_msg.push("distinct_id_wrong" + n + "-" + (new Date).getTime())
        }
        _.extend(r, e), error_msg.length > 0 && (r.jssdk_error = error_msg.join("--")), _.isObject(e.properties) && !_.isEmptyObject(e.properties) && _.extend(r.properties, e.properties), _.isObject(t) && _.extend(r.lib, t), e.type && "profile" === e.type.slice(0, 7) || (r.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, r.properties)), r.properties.$time && _.isDate(r.properties.$time) ? (r.time = 1 * r.properties.$time, delete r.properties.$time) : sd.para.use_client_time && (r.time = 1 * new Date), _.searchObjDate(r), _.searchObjString(r), saNewUser.checkIsAddSign(r), saNewUser.checkIsFirstTime(r), sd.para.debug_mode === !0 ? (logger.info(r), this.debugPath(JSON.stringify(r), t)) : sd.sendState.getSendCall(r, t)
    }, saEvent.debugPath = function(e, t) {
        var r = "";
        r = -1 !== sd.para.debug_mode_url.indexOf("?") ? sd.para.debug_mode_url + "&data=" + encodeURIComponent(_.base64Encode(e)) : sd.para.debug_mode_url + "?data=" + encodeURIComponent(_.base64Encode(e)), _.ajax({
            url: r,
            type: "GET",
            cors: !0,
            header: {
                "Dry-Run": String(sd.para.debug_mode_upload)
            }
        })
    };
    var store = sd.store = {
            getProps: function() {
                return this._state.props
            },
            getSessionProps: function() {
                return this._sessionState
            },
            getDistinctId: function() {
                return this._state.distinct_id
            },
            toState: function(e) {
                var t = null;
                null !== e && "object" == typeof(t = JSON.parse(e)) ? t.distinct_id ? this._state = t : (this.set("distinct_id", _.UUID()), error_msg.push("parseCookieDistinctJSSDKError")) : (this.set("distinct_id", _.UUID()), error_msg.push("parseCookieJSSDKError"))
            },
            initSessionState: function() {
                var e = _.cookie.get("sensorsdata2015session"),
                    t = null;
                null !== e && "object" == typeof(t = JSON.parse(e)) && (this._sessionState = t)
            },
            setOnce: function(e, t) {
                e in this._state || this.set(e, t)
            },
            set: function(e, t) {
                this._state[e] = t, this.save()
            },
            change: function(e, t) {
                this._state[e] = t
            },
            setSessionProps: function(e) {
                var t = this._sessionState;
                _.extend(t, e), this.sessionSave(t)
            },
            setSessionPropsOnce: function(e) {
                var t = this._sessionState;
                _.coverExtend(t, e), this.sessionSave(t)
            },
            setProps: function(e) {
                var t = this._state.props || {};
                _.extend(t, e), this.set("props", t)
            },
            setPropsOnce: function(e) {
                var t = this._state.props || {};
                _.coverExtend(t, e), this.set("props", t)
            },
            sessionSave: function(e) {
                this._sessionState = e, _.cookie.set("sensorsdata2015session", JSON.stringify(this._sessionState), 0)
            },
            save: function() {
                _.cookie.set("sensorsdata2015jssdkcross", JSON.stringify(this._state), 730, sd.para.cross_subdomain)
            },
            _sessionState: {},
            _state: {},
            init: function() {
                navigator.cookieEnabled || (error_msg.push("cookieNotEnable"), _.localStorage.isSupport || error_msg.push("localStorageNotEnable")), this.initSessionState();
                var e = _.cookie.get(sd.para.cross_subdomain ? "sensorsdata2015jssdkcross" : "sensorsdata2015jssdk");
                null === e ? (is_first_visitor = !0, this.set("distinct_id", _.UUID())) : this.toState(e), saNewUser.storeInitCheck(), saNewUser.checkIsFirstLatest()
            }
        },
        commonWays = {
            getUtm: function() {
                return _.info.campaignParams()
            },
            getStayTime: function() {
                return (new Date - sd._t) / 1e3
            },
            setInitReferrer: function() {
                var e = document.referrer.slice(0, sd.para.max_referrer_string_length);
                sd.setOnceProfile({
                    _init_referrer: e,
                    _init_referrer_host: _.info.pageProp.referrer_host
                })
            },
            setSessionReferrer: function() {
                var e = document.referrer.slice(0, sd.para.max_referrer_string_length);
                store.setSessionPropsOnce({
                    _session_referrer: e,
                    _session_referrer_host: _.info.pageProp.referrer_host
                })
            },
            setDefaultAttr: function() {
                _.info.register({
                    _current_url: location.href,
                    _referrer: document.referrer.slice(0, sd.para.max_referrer_string_length),
                    _referring_host: _.info.pageProp.referrer_host
                })
            },
            autoTrackWithoutProfile: function(e) {
                this.autoTrack(_.extend(e, {
                    not_set_profile: !0
                }))
            },
            autoTrack: function(e) {
                e = _.isObject(e) ? e : {};
                var t = _.info.campaignParams(),
                    r = {};
                for (var n in t) - 1 !== (" " + source_channel_standard + " ").indexOf(" " + n + " ") ? r["$" + n] = t[n] : r[n] = t[n];
                is_first_visitor && !e.not_set_profile && sd.setOnceProfile(_.extend({
                    $first_visit_time: new Date,
                    $first_referrer: document.referrer.slice(0, sd.para.max_referrer_string_length),
                    $first_browser_language: navigator.language,
                    $first_referrer_host: _.info.pageProp.referrer_host
                }, r)), e.not_set_profile && delete e.not_set_profile, sd.track("$pageview", _.extend({
                    $referrer: document.referrer.slice(0, sd.para.max_referrer_string_length),
                    $referrer_host: _.info.pageProp.referrer_host,
                    $url: location.href,
                    $url_path: location.pathname,
                    $title: document.title
                }, r, e))
            }
        };
    sd.quick = function() {
        var e = slice.call(arguments),
            t = e[0],
            r = e.slice(1);
        return "string" == typeof t && commonWays[t] ? commonWays[t].apply(commonWays, r) : void("function" == typeof t ? t.apply(sd, r) : logger.info("quick方法中没有这个功能" + e[0]))
    }, sd.track = function(e, t, r) {
        saEvent.check({
            event: e,
            properties: t
        }) && saEvent.send({
            type: "track",
            event: e,
            properties: t
        }, r)
    }, sd.setProfile = function(e, t) {
        saEvent.check({
            propertiesMust: e
        }) && saEvent.send({
            type: "profile_set",
            properties: e
        }, t)
    }, sd.setOnceProfile = function(e, t) {
        saEvent.check({
            propertiesMust: e
        }) && saEvent.send({
            type: "profile_set_once",
            properties: e
        }, t)
    }, sd.appendProfile = function(e, t) {
        saEvent.check({
            propertiesMust: e
        }) && (_.each(e, function(t, r) {
            _.isString(t) ? e[r] = [t] : _.isArray(t) || (delete e[r], logger.info("appendProfile属性的值必须是字符串或者数组"))
        }), _.isEmptyObject(e) || saEvent.send({
            type: "profile_append",
            properties: e
        }, t))
    }, sd.incrementProfile = function(e, t) {
        function r(e) {
            for (var t in e)
                if (!/-*\d+/.test(String(e[t]))) return !1;
            return !0
        }
        var n = e;
        _.isString(e) && (e = {}, e[n] = 1), saEvent.check({
            propertiesMust: e
        }) && (r(e) ? saEvent.send({
            type: "profile_increment",
            properties: e
        }, t) : logger.info("profile_increment的值只能是数字"))
    }, sd.deleteProfile = function(e) {
        saEvent.send({
            type: "profile_delete"
        }, e), store.set("distinct_id", _.UUID())
    }, sd.unsetProfile = function(e, t) {
        var r = e,
            n = {};
        _.isString(e) && (e = [], e.push(r)), _.isArray(e) ? (_.each(e, function(e) {
            _.isString(e) ? n[e] = !0 : logger.info("profile_unset给的数组里面的值必须时string,已经过滤掉", e)
        }), saEvent.send({
            type: "profile_unset",
            properties: n
        }, t)) : logger.info("profile_unset的参数是数组")
    }, sd.identify = function(e, t) {
        "undefined" == typeof e ? store.set("distinct_id", _.UUID()) : saEvent.check({
            distinct_id: e
        }) ? t === !0 ? store.set("distinct_id", e) : store.change("distinct_id", e) : logger.info("identify的参数必须是字符串")
    }, sd.trackSignup = function(e, t, r, n) {
        saEvent.check({
            distinct_id: e,
            event: t,
            properties: r
        }) && (saEvent.send({
            original_id: store.getDistinctId(),
            distinct_id: e,
            type: "track_signup",
            event: t,
            properties: r
        }, n), store.set("distinct_id", e))
    }, sd.trackAbtest = function(e, t) {}, sd.registerPage = function(e) {
        saEvent.check({
            properties: e
        }) ? _.extend(_.info.currentProps, e) : logger.info("register输入的参数有误")
    }, sd.register = function(e) {
        saEvent.check({
            properties: e
        }) ? store.setProps(e) : logger.info("register输入的参数有误")
    }, sd.registerOnce = function(e) {
        saEvent.check({
            properties: e
        }) ? store.setPropsOnce(e) : logger.info("registerOnce输入的参数有误")
    }, sd.registerSession = function(e) {
        saEvent.check({
            properties: e
        }) ? store.setSessionProps(e) : logger.info("registerSession输入的参数有误")
    }, sd.registerSessionOnce = function(e) {
        saEvent.check({
            properties: e
        }) ? store.setSessionPropsOnce(e) : logger.info("registerSessionOnce输入的参数有误")
    }, sd.init = function() {
        app_js_bridge(), _.info.initPage(), store.init(), _.each(sd._q, function(e) {
            sd[e[0]].apply(sd, slice.call(e[1]))
        })
    }, sd.init()
}(window.sensorsDataAnalytic201505);