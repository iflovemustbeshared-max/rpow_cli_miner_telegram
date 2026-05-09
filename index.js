function ef(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const l in r)
                if (l !== "default" && !(l in e)) {
                    const i = Object.getOwnPropertyDescriptor(r, l);
                    i && Object.defineProperty(e, l, i.get ? i : {
                        enumerable: !0,
                        get: () => r[l]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
        r(l);
    new MutationObserver(l => {
        for (const i of l)
            if (i.type === "childList")
                for (const o of i.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(l) {
        const i = {};
        return l.integrity && (i.integrity = l.integrity),
        l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
        l.crossOrigin === "use-credentials" ? i.credentials = "include" : l.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin",
        i
    }
    function r(l) {
        if (l.ep)
            return;
        l.ep = !0;
        const i = n(l);
        fetch(l.href, i)
    }
}
)();
function tf(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Ts = {
    exports: {}
}
  , kl = {}
  , Ls = {
    exports: {}
}
  , O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr = Symbol.for("react.element")
  , nf = Symbol.for("react.portal")
  , rf = Symbol.for("react.fragment")
  , lf = Symbol.for("react.strict_mode")
  , of = Symbol.for("react.profiler")
  , uf = Symbol.for("react.provider")
  , sf = Symbol.for("react.context")
  , af = Symbol.for("react.forward_ref")
  , cf = Symbol.for("react.suspense")
  , ff = Symbol.for("react.memo")
  , df = Symbol.for("react.lazy")
  , cu = Symbol.iterator;
function pf(e) {
    return e === null || typeof e != "object" ? null : (e = cu && e[cu] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var Rs = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , js = Object.assign
  , zs = {};
function Sn(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = zs,
    this.updater = n || Rs
}
Sn.prototype.isReactComponent = {};
Sn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
Sn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function Os() {}
Os.prototype = Sn.prototype;
function vo(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = zs,
    this.updater = n || Rs
}
var go = vo.prototype = new Os;
go.constructor = vo;
js(go, Sn.prototype);
go.isPureReactComponent = !0;
var fu = Array.isArray
  , Is = Object.prototype.hasOwnProperty
  , yo = {
    current: null
}
  , Ms = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Ds(e, t, n) {
    var r, l = {}, i = null, o = null;
    if (t != null)
        for (r in t.ref !== void 0 && (o = t.ref),
        t.key !== void 0 && (i = "" + t.key),
        t)
            Is.call(t, r) && !Ms.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1)
        l.children = n;
    else if (1 < u) {
        for (var s = Array(u), a = 0; a < u; a++)
            s[a] = arguments[a + 2];
        l.children = s
    }
    if (e && e.defaultProps)
        for (r in u = e.defaultProps,
        u)
            l[r] === void 0 && (l[r] = u[r]);
    return {
        $$typeof: cr,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: yo.current
    }
}
function hf(e, t) {
    return {
        $$typeof: cr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function wo(e) {
    return typeof e == "object" && e !== null && e.$$typeof === cr
}
function mf(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var du = /\/+/g;
function Kl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? mf("" + e.key) : t.toString(36)
}
function Dr(e, t, n, r, l) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var o = !1;
    if (e === null)
        o = !0;
    else
        switch (i) {
        case "string":
        case "number":
            o = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case cr:
            case nf:
                o = !0
            }
        }
    if (o)
        return o = e,
        l = l(o),
        e = r === "" ? "." + Kl(o, 0) : r,
        fu(l) ? (n = "",
        e != null && (n = e.replace(du, "$&/") + "/"),
        Dr(l, t, n, "", function(a) {
            return a
        })) : l != null && (wo(l) && (l = hf(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(du, "$&/") + "/") + e)),
        t.push(l)),
        1;
    if (o = 0,
    r = r === "" ? "." : r + ":",
    fu(e))
        for (var u = 0; u < e.length; u++) {
            i = e[u];
            var s = r + Kl(i, u);
            o += Dr(i, t, n, s, l)
        }
    else if (s = pf(e),
    typeof s == "function")
        for (e = s.call(e),
        u = 0; !(i = e.next()).done; )
            i = i.value,
            s = r + Kl(i, u++),
            o += Dr(i, t, n, s, l);
    else if (i === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o
}
function wr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , l = 0;
    return Dr(e, r, "", "", function(i) {
        return t.call(n, i, l++)
    }),
    r
}
function vf(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var fe = {
    current: null
}
  , Ur = {
    transition: null
}
  , gf = {
    ReactCurrentDispatcher: fe,
    ReactCurrentBatchConfig: Ur,
    ReactCurrentOwner: yo
};
function Us() {
    throw Error("act(...) is not supported in production builds of React.")
}
O.Children = {
    map: wr,
    forEach: function(e, t, n) {
        wr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return wr(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return wr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!wo(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
O.Component = Sn;
O.Fragment = rf;
O.Profiler = of;
O.PureComponent = vo;
O.StrictMode = lf;
O.Suspense = cf;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gf;
O.act = Us;
O.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = js({}, e.props)
      , l = e.key
      , i = e.ref
      , o = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref,
        o = yo.current),
        t.key !== void 0 && (l = "" + t.key),
        e.type && e.type.defaultProps)
            var u = e.type.defaultProps;
        for (s in t)
            Is.call(t, s) && !Ms.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s])
    }
    var s = arguments.length - 2;
    if (s === 1)
        r.children = n;
    else if (1 < s) {
        u = Array(s);
        for (var a = 0; a < s; a++)
            u[a] = arguments[a + 2];
        r.children = u
    }
    return {
        $$typeof: cr,
        type: e.type,
        key: l,
        ref: i,
        props: r,
        _owner: o
    }
}
;
O.createContext = function(e) {
    return e = {
        $$typeof: sf,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: uf,
        _context: e
    },
    e.Consumer = e
}
;
O.createElement = Ds;
O.createFactory = function(e) {
    var t = Ds.bind(null, e);
    return t.type = e,
    t
}
;
O.createRef = function() {
    return {
        current: null
    }
}
;
O.forwardRef = function(e) {
    return {
        $$typeof: af,
        render: e
    }
}
;
O.isValidElement = wo;
O.lazy = function(e) {
    return {
        $$typeof: df,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: vf
    }
}
;
O.memo = function(e, t) {
    return {
        $$typeof: ff,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
O.startTransition = function(e) {
    var t = Ur.transition;
    Ur.transition = {};
    try {
        e()
    } finally {
        Ur.transition = t
    }
}
;
O.unstable_act = Us;
O.useCallback = function(e, t) {
    return fe.current.useCallback(e, t)
}
;
O.useContext = function(e) {
    return fe.current.useContext(e)
}
;
O.useDebugValue = function() {}
;
O.useDeferredValue = function(e) {
    return fe.current.useDeferredValue(e)
}
;
O.useEffect = function(e, t) {
    return fe.current.useEffect(e, t)
}
;
O.useId = function() {
    return fe.current.useId()
}
;
O.useImperativeHandle = function(e, t, n) {
    return fe.current.useImperativeHandle(e, t, n)
}
;
O.useInsertionEffect = function(e, t) {
    return fe.current.useInsertionEffect(e, t)
}
;
O.useLayoutEffect = function(e, t) {
    return fe.current.useLayoutEffect(e, t)
}
;
O.useMemo = function(e, t) {
    return fe.current.useMemo(e, t)
}
;
O.useReducer = function(e, t, n) {
    return fe.current.useReducer(e, t, n)
}
;
O.useRef = function(e) {
    return fe.current.useRef(e)
}
;
O.useState = function(e) {
    return fe.current.useState(e)
}
;
O.useSyncExternalStore = function(e, t, n) {
    return fe.current.useSyncExternalStore(e, t, n)
}
;
O.useTransition = function() {
    return fe.current.useTransition()
}
;
O.version = "18.3.1";
Ls.exports = O;
var w = Ls.exports;
const yf = tf(w)
  , wf = ef({
    __proto__: null,
    default: yf
}, [w]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sf = w
  , kf = Symbol.for("react.element")
  , Ef = Symbol.for("react.fragment")
  , xf = Object.prototype.hasOwnProperty
  , Cf = Sf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , _f = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Fs(e, t, n) {
    var r, l = {}, i = null, o = null;
    n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
    for (r in t)
        xf.call(t, r) && !_f.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: kf,
        type: e,
        key: i,
        ref: o,
        props: l,
        _owner: Cf.current
    }
}
kl.Fragment = Ef;
kl.jsx = Fs;
kl.jsxs = Fs;
Ts.exports = kl;
var k = Ts.exports
  , $s = {
    exports: {}
}
  , xe = {}
  , As = {
    exports: {}
}
  , Bs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(N, j) {
        var z = N.length;
        N.push(j);
        e: for (; 0 < z; ) {
            var Y = z - 1 >>> 1
              , q = N[Y];
            if (0 < l(q, j))
                N[Y] = j,
                N[z] = q,
                z = Y;
            else
                break e
        }
    }
    function n(N) {
        return N.length === 0 ? null : N[0]
    }
    function r(N) {
        if (N.length === 0)
            return null;
        var j = N[0]
          , z = N.pop();
        if (z !== j) {
            N[0] = z;
            e: for (var Y = 0, q = N.length, gr = q >>> 1; Y < gr; ) {
                var Pt = 2 * (Y + 1) - 1
                  , Ql = N[Pt]
                  , Nt = Pt + 1
                  , yr = N[Nt];
                if (0 > l(Ql, z))
                    Nt < q && 0 > l(yr, Ql) ? (N[Y] = yr,
                    N[Nt] = z,
                    Y = Nt) : (N[Y] = Ql,
                    N[Pt] = z,
                    Y = Pt);
                else if (Nt < q && 0 > l(yr, z))
                    N[Y] = yr,
                    N[Nt] = z,
                    Y = Nt;
                else
                    break e
            }
        }
        return j
    }
    function l(N, j) {
        var z = N.sortIndex - j.sortIndex;
        return z !== 0 ? z : N.id - j.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var o = Date
          , u = o.now();
        e.unstable_now = function() {
            return o.now() - u
        }
    }
    var s = []
      , a = []
      , h = 1
      , p = null
      , m = 3
      , y = !1
      , g = !1
      , S = !1
      , C = typeof setTimeout == "function" ? setTimeout : null
      , d = typeof clearTimeout == "function" ? clearTimeout : null
      , c = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function f(N) {
        for (var j = n(a); j !== null; ) {
            if (j.callback === null)
                r(a);
            else if (j.startTime <= N)
                r(a),
                j.sortIndex = j.expirationTime,
                t(s, j);
            else
                break;
            j = n(a)
        }
    }
    function v(N) {
        if (S = !1,
        f(N),
        !g)
            if (n(s) !== null)
                g = !0,
                Vl(x);
            else {
                var j = n(a);
                j !== null && Hl(v, j.startTime - N)
            }
    }
    function x(N, j) {
        g = !1,
        S && (S = !1,
        d(L),
        L = -1),
        y = !0;
        var z = m;
        try {
            for (f(j),
            p = n(s); p !== null && (!(p.expirationTime > j) || N && !H()); ) {
                var Y = p.callback;
                if (typeof Y == "function") {
                    p.callback = null,
                    m = p.priorityLevel;
                    var q = Y(p.expirationTime <= j);
                    j = e.unstable_now(),
                    typeof q == "function" ? p.callback = q : p === n(s) && r(s),
                    f(j)
                } else
                    r(s);
                p = n(s)
            }
            if (p !== null)
                var gr = !0;
            else {
                var Pt = n(a);
                Pt !== null && Hl(v, Pt.startTime - j),
                gr = !1
            }
            return gr
        } finally {
            p = null,
            m = z,
            y = !1
        }
    }
    var P = !1
      , T = null
      , L = -1
      , U = 5
      , R = -1;
    function H() {
        return !(e.unstable_now() - R < U)
    }
    function ye() {
        if (T !== null) {
            var N = e.unstable_now();
            R = N;
            var j = !0;
            try {
                j = T(!0, N)
            } finally {
                j ? _e() : (P = !1,
                T = null)
            }
        } else
            P = !1
    }
    var _e;
    if (typeof c == "function")
        _e = function() {
            c(ye)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var tt = new MessageChannel
          , Wl = tt.port2;
        tt.port1.onmessage = ye,
        _e = function() {
            Wl.postMessage(null)
        }
    } else
        _e = function() {
            C(ye, 0)
        }
        ;
    function Vl(N) {
        T = N,
        P || (P = !0,
        _e())
    }
    function Hl(N, j) {
        L = C(function() {
            N(e.unstable_now())
        }, j)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(N) {
        N.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        g || y || (g = !0,
        Vl(x))
    }
    ,
    e.unstable_forceFrameRate = function(N) {
        0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : U = 0 < N ? Math.floor(1e3 / N) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return m
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(s)
    }
    ,
    e.unstable_next = function(N) {
        switch (m) {
        case 1:
        case 2:
        case 3:
            var j = 3;
            break;
        default:
            j = m
        }
        var z = m;
        m = j;
        try {
            return N()
        } finally {
            m = z
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(N, j) {
        switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            N = 3
        }
        var z = m;
        m = N;
        try {
            return j()
        } finally {
            m = z
        }
    }
    ,
    e.unstable_scheduleCallback = function(N, j, z) {
        var Y = e.unstable_now();
        switch (typeof z == "object" && z !== null ? (z = z.delay,
        z = typeof z == "number" && 0 < z ? Y + z : Y) : z = Y,
        N) {
        case 1:
            var q = -1;
            break;
        case 2:
            q = 250;
            break;
        case 5:
            q = 1073741823;
            break;
        case 4:
            q = 1e4;
            break;
        default:
            q = 5e3
        }
        return q = z + q,
        N = {
            id: h++,
            callback: j,
            priorityLevel: N,
            startTime: z,
            expirationTime: q,
            sortIndex: -1
        },
        z > Y ? (N.sortIndex = z,
        t(a, N),
        n(s) === null && N === n(a) && (S ? (d(L),
        L = -1) : S = !0,
        Hl(v, z - Y))) : (N.sortIndex = q,
        t(s, N),
        g || y || (g = !0,
        Vl(x))),
        N
    }
    ,
    e.unstable_shouldYield = H,
    e.unstable_wrapCallback = function(N) {
        var j = m;
        return function() {
            var z = m;
            m = j;
            try {
                return N.apply(this, arguments)
            } finally {
                m = z
            }
        }
    }
}
)(Bs);
As.exports = Bs;
var Pf = As.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nf = w
  , Ee = Pf;
function E(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Ws = new Set
  , Qn = {};
function Bt(e, t) {
    dn(e, t),
    dn(e + "Capture", t)
}
function dn(e, t) {
    for (Qn[e] = t,
    e = 0; e < t.length; e++)
        Ws.add(t[e])
}
var Xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , wi = Object.prototype.hasOwnProperty
  , Tf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , pu = {}
  , hu = {};
function Lf(e) {
    return wi.call(hu, e) ? !0 : wi.call(pu, e) ? !1 : Tf.test(e) ? hu[e] = !0 : (pu[e] = !0,
    !1)
}
function Rf(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function jf(e, t, n, r) {
    if (t === null || typeof t > "u" || Rf(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function de(e, t, n, r, l, i, o) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = l,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = i,
    this.removeEmptyString = o
}
var re = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    re[e] = new de(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    re[t] = new de(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    re[e] = new de(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    re[e] = new de(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    re[e] = new de(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    re[e] = new de(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    re[e] = new de(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    re[e] = new de(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    re[e] = new de(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var So = /[\-:]([a-z])/g;
function ko(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(So, ko);
    re[t] = new de(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(So, ko);
    re[t] = new de(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(So, ko);
    re[t] = new de(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    re[e] = new de(e,1,!1,e.toLowerCase(),null,!1,!1)
});
re.xlinkHref = new de("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    re[e] = new de(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function Eo(e, t, n, r) {
    var l = re.hasOwnProperty(t) ? re[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (jf(t, n, l, r) && (n = null),
    r || l === null ? Lf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName,
    r = l.attributeNamespace,
    n === null ? e.removeAttribute(t) : (l = l.type,
    n = l === 3 || l === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var et = Nf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , Sr = Symbol.for("react.element")
  , Yt = Symbol.for("react.portal")
  , Gt = Symbol.for("react.fragment")
  , xo = Symbol.for("react.strict_mode")
  , Si = Symbol.for("react.profiler")
  , Vs = Symbol.for("react.provider")
  , Hs = Symbol.for("react.context")
  , Co = Symbol.for("react.forward_ref")
  , ki = Symbol.for("react.suspense")
  , Ei = Symbol.for("react.suspense_list")
  , _o = Symbol.for("react.memo")
  , lt = Symbol.for("react.lazy")
  , Qs = Symbol.for("react.offscreen")
  , mu = Symbol.iterator;
function xn(e) {
    return e === null || typeof e != "object" ? null : (e = mu && e[mu] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var V = Object.assign, Yl;
function jn(e) {
    if (Yl === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Yl = t && t[1] || ""
        }
    return `
` + Yl + e
}
var Gl = !1;
function Xl(e, t) {
    if (!e || Gl)
        return "";
    Gl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (a) {
                    var r = a
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (a) {
                    r = a
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (a) {
                r = a
            }
            e()
        }
    } catch (a) {
        if (a && r && typeof a.stack == "string") {
            for (var l = a.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; )
                u--;
            for (; 1 <= o && 0 <= u; o--,
            u--)
                if (l[o] !== i[u]) {
                    if (o !== 1 || u !== 1)
                        do
                            if (o--,
                            u--,
                            0 > u || l[o] !== i[u]) {
                                var s = `
` + l[o].replace(" at new ", " at ");
                                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)),
                                s
                            }
                        while (1 <= o && 0 <= u);
                    break
                }
        }
    } finally {
        Gl = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? jn(e) : ""
}
function zf(e) {
    switch (e.tag) {
    case 5:
        return jn(e.type);
    case 16:
        return jn("Lazy");
    case 13:
        return jn("Suspense");
    case 19:
        return jn("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = Xl(e.type, !1),
        e;
    case 11:
        return e = Xl(e.type.render, !1),
        e;
    case 1:
        return e = Xl(e.type, !0),
        e;
    default:
        return ""
    }
}
function xi(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Gt:
        return "Fragment";
    case Yt:
        return "Portal";
    case Si:
        return "Profiler";
    case xo:
        return "StrictMode";
    case ki:
        return "Suspense";
    case Ei:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case Hs:
            return (e.displayName || "Context") + ".Consumer";
        case Vs:
            return (e._context.displayName || "Context") + ".Provider";
        case Co:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case _o:
            return t = e.displayName || null,
            t !== null ? t : xi(e.type) || "Memo";
        case lt:
            t = e._payload,
            e = e._init;
            try {
                return xi(e(t))
            } catch {}
        }
    return null
}
function Of(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return xi(t);
    case 8:
        return t === xo ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function St(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function Ks(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function If(e) {
    var t = Ks(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get
          , i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return l.call(this)
            },
            set: function(o) {
                r = "" + o,
                i.call(this, o)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(o) {
                r = "" + o
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function kr(e) {
    e._valueTracker || (e._valueTracker = If(e))
}
function Ys(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = Ks(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function Xr(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function Ci(e, t) {
    var n = t.checked;
    return V({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function vu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = St(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function Gs(e, t) {
    t = t.checked,
    t != null && Eo(e, "checked", t, !1)
}
function _i(e, t) {
    Gs(e, t);
    var n = St(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Pi(e, t.type, n) : t.hasOwnProperty("defaultValue") && Pi(e, t.type, St(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function gu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function Pi(e, t, n) {
    (t !== "number" || Xr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var zn = Array.isArray;
function on(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var l = 0; l < n.length; l++)
            t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            l = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== l && (e[n].selected = l),
            l && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + St(n),
        t = null,
        l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                e[l].selected = !0,
                r && (e[l].defaultSelected = !0);
                return
            }
            t !== null || e[l].disabled || (t = e[l])
        }
        t !== null && (t.selected = !0)
    }
}
function Ni(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(E(91));
    return V({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function yu(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(E(92));
            if (zn(n)) {
                if (1 < n.length)
                    throw Error(E(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: St(n)
    }
}
function Xs(e, t) {
    var n = St(t.value)
      , r = St(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function wu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function Js(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function Ti(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Js(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var Er, Zs = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, l)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (Er = Er || document.createElement("div"),
        Er.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = Er.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Kn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Dn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , Mf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Dn).forEach(function(e) {
    Mf.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        Dn[t] = Dn[e]
    })
});
function qs(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Dn.hasOwnProperty(e) && Dn[e] ? ("" + t).trim() : t + "px"
}
function bs(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , l = qs(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, l) : e[n] = l
        }
}
var Df = V({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function Li(e, t) {
    if (t) {
        if (Df[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(E(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(E(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(E(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(E(62))
    }
}
function Ri(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var ji = null;
function Po(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var zi = null
  , un = null
  , sn = null;
function Su(e) {
    if (e = pr(e)) {
        if (typeof zi != "function")
            throw Error(E(280));
        var t = e.stateNode;
        t && (t = Pl(t),
        zi(e.stateNode, e.type, t))
    }
}
function ea(e) {
    un ? sn ? sn.push(e) : sn = [e] : un = e
}
function ta() {
    if (un) {
        var e = un
          , t = sn;
        if (sn = un = null,
        Su(e),
        t)
            for (e = 0; e < t.length; e++)
                Su(t[e])
    }
}
function na(e, t) {
    return e(t)
}
function ra() {}
var Jl = !1;
function la(e, t, n) {
    if (Jl)
        return e(t, n);
    Jl = !0;
    try {
        return na(e, t, n)
    } finally {
        Jl = !1,
        (un !== null || sn !== null) && (ra(),
        ta())
    }
}
function Yn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = Pl(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(E(231, t, typeof n));
    return n
}
var Oi = !1;
if (Xe)
    try {
        var Cn = {};
        Object.defineProperty(Cn, "passive", {
            get: function() {
                Oi = !0
            }
        }),
        window.addEventListener("test", Cn, Cn),
        window.removeEventListener("test", Cn, Cn)
    } catch {
        Oi = !1
    }
function Uf(e, t, n, r, l, i, o, u, s) {
    var a = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, a)
    } catch (h) {
        this.onError(h)
    }
}
var Un = !1
  , Jr = null
  , Zr = !1
  , Ii = null
  , Ff = {
    onError: function(e) {
        Un = !0,
        Jr = e
    }
};
function $f(e, t, n, r, l, i, o, u, s) {
    Un = !1,
    Jr = null,
    Uf.apply(Ff, arguments)
}
function Af(e, t, n, r, l, i, o, u, s) {
    if ($f.apply(this, arguments),
    Un) {
        if (Un) {
            var a = Jr;
            Un = !1,
            Jr = null
        } else
            throw Error(E(198));
        Zr || (Zr = !0,
        Ii = a)
    }
}
function Wt(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function ia(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function ku(e) {
    if (Wt(e) !== e)
        throw Error(E(188))
}
function Bf(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Wt(e),
        t === null)
            throw Error(E(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null)
            break;
        var i = l.alternate;
        if (i === null) {
            if (r = l.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (l.child === i.child) {
            for (i = l.child; i; ) {
                if (i === n)
                    return ku(l),
                    e;
                if (i === r)
                    return ku(l),
                    t;
                i = i.sibling
            }
            throw Error(E(188))
        }
        if (n.return !== r.return)
            n = l,
            r = i;
        else {
            for (var o = !1, u = l.child; u; ) {
                if (u === n) {
                    o = !0,
                    n = l,
                    r = i;
                    break
                }
                if (u === r) {
                    o = !0,
                    r = l,
                    n = i;
                    break
                }
                u = u.sibling
            }
            if (!o) {
                for (u = i.child; u; ) {
                    if (u === n) {
                        o = !0,
                        n = i,
                        r = l;
                        break
                    }
                    if (u === r) {
                        o = !0,
                        r = i,
                        n = l;
                        break
                    }
                    u = u.sibling
                }
                if (!o)
                    throw Error(E(189))
            }
        }
        if (n.alternate !== r)
            throw Error(E(190))
    }
    if (n.tag !== 3)
        throw Error(E(188));
    return n.stateNode.current === n ? e : t
}
function oa(e) {
    return e = Bf(e),
    e !== null ? ua(e) : null
}
function ua(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = ua(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var sa = Ee.unstable_scheduleCallback
  , Eu = Ee.unstable_cancelCallback
  , Wf = Ee.unstable_shouldYield
  , Vf = Ee.unstable_requestPaint
  , G = Ee.unstable_now
  , Hf = Ee.unstable_getCurrentPriorityLevel
  , No = Ee.unstable_ImmediatePriority
  , aa = Ee.unstable_UserBlockingPriority
  , qr = Ee.unstable_NormalPriority
  , Qf = Ee.unstable_LowPriority
  , ca = Ee.unstable_IdlePriority
  , El = null
  , We = null;
function Kf(e) {
    if (We && typeof We.onCommitFiberRoot == "function")
        try {
            We.onCommitFiberRoot(El, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var De = Math.clz32 ? Math.clz32 : Xf
  , Yf = Math.log
  , Gf = Math.LN2;
function Xf(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (Yf(e) / Gf | 0) | 0
}
var xr = 64
  , Cr = 4194304;
function On(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function br(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , l = e.suspendedLanes
      , i = e.pingedLanes
      , o = n & 268435455;
    if (o !== 0) {
        var u = o & ~l;
        u !== 0 ? r = On(u) : (i &= o,
        i !== 0 && (r = On(i)))
    } else
        o = n & ~l,
        o !== 0 ? r = On(o) : i !== 0 && (r = On(i));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & l) && (l = r & -r,
    i = t & -t,
    l >= i || l === 16 && (i & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - De(t),
            l = 1 << n,
            r |= e[n],
            t &= ~l;
    return r
}
function Jf(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function Zf(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
        var o = 31 - De(i)
          , u = 1 << o
          , s = l[o];
        s === -1 ? (!(u & n) || u & r) && (l[o] = Jf(u, t)) : s <= t && (e.expiredLanes |= u),
        i &= ~u
    }
}
function Mi(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function fa() {
    var e = xr;
    return xr <<= 1,
    !(xr & 4194240) && (xr = 64),
    e
}
function Zl(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function fr(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - De(t),
    e[t] = n
}
function qf(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - De(n)
          , i = 1 << l;
        t[l] = 0,
        r[l] = -1,
        e[l] = -1,
        n &= ~i
    }
}
function To(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - De(n)
          , l = 1 << r;
        l & t | e[r] & t && (e[r] |= t),
        n &= ~l
    }
}
var M = 0;
function da(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var pa, Lo, ha, ma, va, Di = !1, _r = [], ft = null, dt = null, pt = null, Gn = new Map, Xn = new Map, ot = [], bf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function xu(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        ft = null;
        break;
    case "dragenter":
    case "dragleave":
        dt = null;
        break;
    case "mouseover":
    case "mouseout":
        pt = null;
        break;
    case "pointerover":
    case "pointerout":
        Gn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Xn.delete(t.pointerId)
    }
}
function _n(e, t, n, r, l, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l]
    },
    t !== null && (t = pr(t),
    t !== null && Lo(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    l !== null && t.indexOf(l) === -1 && t.push(l),
    e)
}
function ed(e, t, n, r, l) {
    switch (t) {
    case "focusin":
        return ft = _n(ft, e, t, n, r, l),
        !0;
    case "dragenter":
        return dt = _n(dt, e, t, n, r, l),
        !0;
    case "mouseover":
        return pt = _n(pt, e, t, n, r, l),
        !0;
    case "pointerover":
        var i = l.pointerId;
        return Gn.set(i, _n(Gn.get(i) || null, e, t, n, r, l)),
        !0;
    case "gotpointercapture":
        return i = l.pointerId,
        Xn.set(i, _n(Xn.get(i) || null, e, t, n, r, l)),
        !0
    }
    return !1
}
function ga(e) {
    var t = jt(e.target);
    if (t !== null) {
        var n = Wt(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = ia(n),
                t !== null) {
                    e.blockedOn = t,
                    va(e.priority, function() {
                        ha(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Fr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Ui(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            ji = r,
            n.target.dispatchEvent(r),
            ji = null
        } else
            return t = pr(n),
            t !== null && Lo(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function Cu(e, t, n) {
    Fr(e) && n.delete(t)
}
function td() {
    Di = !1,
    ft !== null && Fr(ft) && (ft = null),
    dt !== null && Fr(dt) && (dt = null),
    pt !== null && Fr(pt) && (pt = null),
    Gn.forEach(Cu),
    Xn.forEach(Cu)
}
function Pn(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    Di || (Di = !0,
    Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, td)))
}
function Jn(e) {
    function t(l) {
        return Pn(l, e)
    }
    if (0 < _r.length) {
        Pn(_r[0], e);
        for (var n = 1; n < _r.length; n++) {
            var r = _r[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (ft !== null && Pn(ft, e),
    dt !== null && Pn(dt, e),
    pt !== null && Pn(pt, e),
    Gn.forEach(t),
    Xn.forEach(t),
    n = 0; n < ot.length; n++)
        r = ot[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ot.length && (n = ot[0],
    n.blockedOn === null); )
        ga(n),
        n.blockedOn === null && ot.shift()
}
var an = et.ReactCurrentBatchConfig
  , el = !0;
function nd(e, t, n, r) {
    var l = M
      , i = an.transition;
    an.transition = null;
    try {
        M = 1,
        Ro(e, t, n, r)
    } finally {
        M = l,
        an.transition = i
    }
}
function rd(e, t, n, r) {
    var l = M
      , i = an.transition;
    an.transition = null;
    try {
        M = 4,
        Ro(e, t, n, r)
    } finally {
        M = l,
        an.transition = i
    }
}
function Ro(e, t, n, r) {
    if (el) {
        var l = Ui(e, t, n, r);
        if (l === null)
            ui(e, t, r, tl, n),
            xu(e, r);
        else if (ed(l, e, t, n, r))
            r.stopPropagation();
        else if (xu(e, r),
        t & 4 && -1 < bf.indexOf(e)) {
            for (; l !== null; ) {
                var i = pr(l);
                if (i !== null && pa(i),
                i = Ui(e, t, n, r),
                i === null && ui(e, t, r, tl, n),
                i === l)
                    break;
                l = i
            }
            l !== null && r.stopPropagation()
        } else
            ui(e, t, r, null, n)
    }
}
var tl = null;
function Ui(e, t, n, r) {
    if (tl = null,
    e = Po(r),
    e = jt(e),
    e !== null)
        if (t = Wt(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = ia(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return tl = e,
    null
}
function ya(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (Hf()) {
        case No:
            return 1;
        case aa:
            return 4;
        case qr:
        case Qf:
            return 16;
        case ca:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var st = null
  , jo = null
  , $r = null;
function wa() {
    if ($r)
        return $r;
    var e, t = jo, n = t.length, r, l = "value"in st ? st.value : st.textContent, i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++)
        ;
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === l[i - r]; r++)
        ;
    return $r = l.slice(e, 1 < r ? 1 - r : void 0)
}
function Ar(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function Pr() {
    return !0
}
function _u() {
    return !1
}
function Ce(e) {
    function t(n, r, l, i, o) {
        this._reactName = n,
        this._targetInst = l,
        this.type = r,
        this.nativeEvent = i,
        this.target = o,
        this.currentTarget = null;
        for (var u in e)
            e.hasOwnProperty(u) && (n = e[u],
            this[u] = n ? n(i) : i[u]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Pr : _u,
        this.isPropagationStopped = _u,
        this
    }
    return V(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = Pr)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = Pr)
        },
        persist: function() {},
        isPersistent: Pr
    }),
    t
}
var kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, zo = Ce(kn), dr = V({}, kn, {
    view: 0,
    detail: 0
}), ld = Ce(dr), ql, bl, Nn, xl = V({}, dr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Oo,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (ql = e.screenX - Nn.screenX,
        bl = e.screenY - Nn.screenY) : bl = ql = 0,
        Nn = e),
        ql)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : bl
    }
}), Pu = Ce(xl), id = V({}, xl, {
    dataTransfer: 0
}), od = Ce(id), ud = V({}, dr, {
    relatedTarget: 0
}), ei = Ce(ud), sd = V({}, kn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), ad = Ce(sd), cd = V({}, kn, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), fd = Ce(cd), dd = V({}, kn, {
    data: 0
}), Nu = Ce(dd), pd = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, hd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, md = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function vd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = md[e]) ? !!t[e] : !1
}
function Oo() {
    return vd
}
var gd = V({}, dr, {
    key: function(e) {
        if (e.key) {
            var t = pd[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = Ar(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? hd[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Oo,
    charCode: function(e) {
        return e.type === "keypress" ? Ar(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? Ar(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , yd = Ce(gd)
  , wd = V({}, xl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , Tu = Ce(wd)
  , Sd = V({}, dr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Oo
})
  , kd = Ce(Sd)
  , Ed = V({}, kn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , xd = Ce(Ed)
  , Cd = V({}, xl, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , _d = Ce(Cd)
  , Pd = [9, 13, 27, 32]
  , Io = Xe && "CompositionEvent"in window
  , Fn = null;
Xe && "documentMode"in document && (Fn = document.documentMode);
var Nd = Xe && "TextEvent"in window && !Fn
  , Sa = Xe && (!Io || Fn && 8 < Fn && 11 >= Fn)
  , Lu = " "
  , Ru = !1;
function ka(e, t) {
    switch (e) {
    case "keyup":
        return Pd.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function Ea(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var Xt = !1;
function Td(e, t) {
    switch (e) {
    case "compositionend":
        return Ea(t);
    case "keypress":
        return t.which !== 32 ? null : (Ru = !0,
        Lu);
    case "textInput":
        return e = t.data,
        e === Lu && Ru ? null : e;
    default:
        return null
    }
}
function Ld(e, t) {
    if (Xt)
        return e === "compositionend" || !Io && ka(e, t) ? (e = wa(),
        $r = jo = st = null,
        Xt = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return Sa && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var Rd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function ju(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Rd[e.type] : t === "textarea"
}
function xa(e, t, n, r) {
    ea(r),
    t = nl(t, "onChange"),
    0 < t.length && (n = new zo("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var $n = null
  , Zn = null;
function jd(e) {
    Ia(e, 0)
}
function Cl(e) {
    var t = qt(e);
    if (Ys(t))
        return e
}
function zd(e, t) {
    if (e === "change")
        return t
}
var Ca = !1;
if (Xe) {
    var ti;
    if (Xe) {
        var ni = "oninput"in document;
        if (!ni) {
            var zu = document.createElement("div");
            zu.setAttribute("oninput", "return;"),
            ni = typeof zu.oninput == "function"
        }
        ti = ni
    } else
        ti = !1;
    Ca = ti && (!document.documentMode || 9 < document.documentMode)
}
function Ou() {
    $n && ($n.detachEvent("onpropertychange", _a),
    Zn = $n = null)
}
function _a(e) {
    if (e.propertyName === "value" && Cl(Zn)) {
        var t = [];
        xa(t, Zn, e, Po(e)),
        la(jd, t)
    }
}
function Od(e, t, n) {
    e === "focusin" ? (Ou(),
    $n = t,
    Zn = n,
    $n.attachEvent("onpropertychange", _a)) : e === "focusout" && Ou()
}
function Id(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Cl(Zn)
}
function Md(e, t) {
    if (e === "click")
        return Cl(t)
}
function Dd(e, t) {
    if (e === "input" || e === "change")
        return Cl(t)
}
function Ud(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Fe = typeof Object.is == "function" ? Object.is : Ud;
function qn(e, t) {
    if (Fe(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!wi.call(t, l) || !Fe(e[l], t[l]))
            return !1
    }
    return !0
}
function Iu(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function Mu(e, t) {
    var n = Iu(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = Iu(n)
    }
}
function Pa(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pa(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function Na() {
    for (var e = window, t = Xr(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = Xr(e.document)
    }
    return t
}
function Mo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Fd(e) {
    var t = Na()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Pa(n.ownerDocument.documentElement, n)) {
        if (r !== null && Mo(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var l = n.textContent.length
                  , i = Math.min(r.start, l);
                r = r.end === void 0 ? i : Math.min(r.end, l),
                !e.extend && i > r && (l = r,
                r = i,
                i = l),
                l = Mu(n, i);
                var o = Mu(n, r);
                l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(),
                t.setStart(l.node, l.offset),
                e.removeAllRanges(),
                i > r ? (e.addRange(t),
                e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var $d = Xe && "documentMode"in document && 11 >= document.documentMode
  , Jt = null
  , Fi = null
  , An = null
  , $i = !1;
function Du(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    $i || Jt == null || Jt !== Xr(r) || (r = Jt,
    "selectionStart"in r && Mo(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    An && qn(An, r) || (An = r,
    r = nl(Fi, "onSelect"),
    0 < r.length && (t = new zo("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = Jt)))
}
function Nr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Zt = {
    animationend: Nr("Animation", "AnimationEnd"),
    animationiteration: Nr("Animation", "AnimationIteration"),
    animationstart: Nr("Animation", "AnimationStart"),
    transitionend: Nr("Transition", "TransitionEnd")
}
  , ri = {}
  , Ta = {};
Xe && (Ta = document.createElement("div").style,
"AnimationEvent"in window || (delete Zt.animationend.animation,
delete Zt.animationiteration.animation,
delete Zt.animationstart.animation),
"TransitionEvent"in window || delete Zt.transitionend.transition);
function _l(e) {
    if (ri[e])
        return ri[e];
    if (!Zt[e])
        return e;
    var t = Zt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Ta)
            return ri[e] = t[n];
    return e
}
var La = _l("animationend")
  , Ra = _l("animationiteration")
  , ja = _l("animationstart")
  , za = _l("transitionend")
  , Oa = new Map
  , Uu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Et(e, t) {
    Oa.set(e, t),
    Bt(t, [e])
}
for (var li = 0; li < Uu.length; li++) {
    var ii = Uu[li]
      , Ad = ii.toLowerCase()
      , Bd = ii[0].toUpperCase() + ii.slice(1);
    Et(Ad, "on" + Bd)
}
Et(La, "onAnimationEnd");
Et(Ra, "onAnimationIteration");
Et(ja, "onAnimationStart");
Et("dblclick", "onDoubleClick");
Et("focusin", "onFocus");
Et("focusout", "onBlur");
Et(za, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var In = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , Wd = new Set("cancel close invalid load scroll toggle".split(" ").concat(In));
function Fu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    Af(r, t, void 0, e),
    e.currentTarget = null
}
function Ia(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , l = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var u = r[o]
                      , s = u.instance
                      , a = u.currentTarget;
                    if (u = u.listener,
                    s !== i && l.isPropagationStopped())
                        break e;
                    Fu(l, u, a),
                    i = s
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (u = r[o],
                    s = u.instance,
                    a = u.currentTarget,
                    u = u.listener,
                    s !== i && l.isPropagationStopped())
                        break e;
                    Fu(l, u, a),
                    i = s
                }
        }
    }
    if (Zr)
        throw e = Ii,
        Zr = !1,
        Ii = null,
        e
}
function F(e, t) {
    var n = t[Hi];
    n === void 0 && (n = t[Hi] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Ma(t, e, 2, !1),
    n.add(r))
}
function oi(e, t, n) {
    var r = 0;
    t && (r |= 4),
    Ma(n, e, r, t)
}
var Tr = "_reactListening" + Math.random().toString(36).slice(2);
function bn(e) {
    if (!e[Tr]) {
        e[Tr] = !0,
        Ws.forEach(function(n) {
            n !== "selectionchange" && (Wd.has(n) || oi(n, !1, e),
            oi(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Tr] || (t[Tr] = !0,
        oi("selectionchange", !1, t))
    }
}
function Ma(e, t, n, r) {
    switch (ya(t)) {
    case 1:
        var l = nd;
        break;
    case 4:
        l = rd;
        break;
    default:
        l = Ro
    }
    n = l.bind(null, t, n, e),
    l = void 0,
    !Oi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0),
    r ? l !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
        passive: l
    }) : e.addEventListener(t, n, !1)
}
function ui(e, t, n, r, l) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || u.nodeType === 8 && u.parentNode === l)
                    break;
                if (o === 4)
                    for (o = r.return; o !== null; ) {
                        var s = o.tag;
                        if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo,
                        s === l || s.nodeType === 8 && s.parentNode === l))
                            return;
                        o = o.return
                    }
                for (; u !== null; ) {
                    if (o = jt(u),
                    o === null)
                        return;
                    if (s = o.tag,
                    s === 5 || s === 6) {
                        r = i = o;
                        continue e
                    }
                    u = u.parentNode
                }
            }
            r = r.return
        }
    la(function() {
        var a = i
          , h = Po(n)
          , p = [];
        e: {
            var m = Oa.get(e);
            if (m !== void 0) {
                var y = zo
                  , g = e;
                switch (e) {
                case "keypress":
                    if (Ar(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    y = yd;
                    break;
                case "focusin":
                    g = "focus",
                    y = ei;
                    break;
                case "focusout":
                    g = "blur",
                    y = ei;
                    break;
                case "beforeblur":
                case "afterblur":
                    y = ei;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    y = Pu;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    y = od;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    y = kd;
                    break;
                case La:
                case Ra:
                case ja:
                    y = ad;
                    break;
                case za:
                    y = xd;
                    break;
                case "scroll":
                    y = ld;
                    break;
                case "wheel":
                    y = _d;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    y = fd;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    y = Tu
                }
                var S = (t & 4) !== 0
                  , C = !S && e === "scroll"
                  , d = S ? m !== null ? m + "Capture" : null : m;
                S = [];
                for (var c = a, f; c !== null; ) {
                    f = c;
                    var v = f.stateNode;
                    if (f.tag === 5 && v !== null && (f = v,
                    d !== null && (v = Yn(c, d),
                    v != null && S.push(er(c, v, f)))),
                    C)
                        break;
                    c = c.return
                }
                0 < S.length && (m = new y(m,g,null,n,h),
                p.push({
                    event: m,
                    listeners: S
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (m = e === "mouseover" || e === "pointerover",
                y = e === "mouseout" || e === "pointerout",
                m && n !== ji && (g = n.relatedTarget || n.fromElement) && (jt(g) || g[Je]))
                    break e;
                if ((y || m) && (m = h.window === h ? h : (m = h.ownerDocument) ? m.defaultView || m.parentWindow : window,
                y ? (g = n.relatedTarget || n.toElement,
                y = a,
                g = g ? jt(g) : null,
                g !== null && (C = Wt(g),
                g !== C || g.tag !== 5 && g.tag !== 6) && (g = null)) : (y = null,
                g = a),
                y !== g)) {
                    if (S = Pu,
                    v = "onMouseLeave",
                    d = "onMouseEnter",
                    c = "mouse",
                    (e === "pointerout" || e === "pointerover") && (S = Tu,
                    v = "onPointerLeave",
                    d = "onPointerEnter",
                    c = "pointer"),
                    C = y == null ? m : qt(y),
                    f = g == null ? m : qt(g),
                    m = new S(v,c + "leave",y,n,h),
                    m.target = C,
                    m.relatedTarget = f,
                    v = null,
                    jt(h) === a && (S = new S(d,c + "enter",g,n,h),
                    S.target = f,
                    S.relatedTarget = C,
                    v = S),
                    C = v,
                    y && g)
                        t: {
                            for (S = y,
                            d = g,
                            c = 0,
                            f = S; f; f = Qt(f))
                                c++;
                            for (f = 0,
                            v = d; v; v = Qt(v))
                                f++;
                            for (; 0 < c - f; )
                                S = Qt(S),
                                c--;
                            for (; 0 < f - c; )
                                d = Qt(d),
                                f--;
                            for (; c--; ) {
                                if (S === d || d !== null && S === d.alternate)
                                    break t;
                                S = Qt(S),
                                d = Qt(d)
                            }
                            S = null
                        }
                    else
                        S = null;
                    y !== null && $u(p, m, y, S, !1),
                    g !== null && C !== null && $u(p, C, g, S, !0)
                }
            }
            e: {
                if (m = a ? qt(a) : window,
                y = m.nodeName && m.nodeName.toLowerCase(),
                y === "select" || y === "input" && m.type === "file")
                    var x = zd;
                else if (ju(m))
                    if (Ca)
                        x = Dd;
                    else {
                        x = Id;
                        var P = Od
                    }
                else
                    (y = m.nodeName) && y.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (x = Md);
                if (x && (x = x(e, a))) {
                    xa(p, x, n, h);
                    break e
                }
                P && P(e, m, a),
                e === "focusout" && (P = m._wrapperState) && P.controlled && m.type === "number" && Pi(m, "number", m.value)
            }
            switch (P = a ? qt(a) : window,
            e) {
            case "focusin":
                (ju(P) || P.contentEditable === "true") && (Jt = P,
                Fi = a,
                An = null);
                break;
            case "focusout":
                An = Fi = Jt = null;
                break;
            case "mousedown":
                $i = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                $i = !1,
                Du(p, n, h);
                break;
            case "selectionchange":
                if ($d)
                    break;
            case "keydown":
            case "keyup":
                Du(p, n, h)
            }
            var T;
            if (Io)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var L = "onCompositionStart";
                        break e;
                    case "compositionend":
                        L = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        L = "onCompositionUpdate";
                        break e
                    }
                    L = void 0
                }
            else
                Xt ? ka(e, n) && (L = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (L = "onCompositionStart");
            L && (Sa && n.locale !== "ko" && (Xt || L !== "onCompositionStart" ? L === "onCompositionEnd" && Xt && (T = wa()) : (st = h,
            jo = "value"in st ? st.value : st.textContent,
            Xt = !0)),
            P = nl(a, L),
            0 < P.length && (L = new Nu(L,e,null,n,h),
            p.push({
                event: L,
                listeners: P
            }),
            T ? L.data = T : (T = Ea(n),
            T !== null && (L.data = T)))),
            (T = Nd ? Td(e, n) : Ld(e, n)) && (a = nl(a, "onBeforeInput"),
            0 < a.length && (h = new Nu("onBeforeInput","beforeinput",null,n,h),
            p.push({
                event: h,
                listeners: a
            }),
            h.data = T))
        }
        Ia(p, t)
    })
}
function er(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function nl(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e
          , i = l.stateNode;
        l.tag === 5 && i !== null && (l = i,
        i = Yn(e, n),
        i != null && r.unshift(er(e, i, l)),
        i = Yn(e, t),
        i != null && r.push(er(e, i, l))),
        e = e.return
    }
    return r
}
function Qt(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function $u(e, t, n, r, l) {
    for (var i = t._reactName, o = []; n !== null && n !== r; ) {
        var u = n
          , s = u.alternate
          , a = u.stateNode;
        if (s !== null && s === r)
            break;
        u.tag === 5 && a !== null && (u = a,
        l ? (s = Yn(n, i),
        s != null && o.unshift(er(n, s, u))) : l || (s = Yn(n, i),
        s != null && o.push(er(n, s, u)))),
        n = n.return
    }
    o.length !== 0 && e.push({
        event: t,
        listeners: o
    })
}
var Vd = /\r\n?/g
  , Hd = /\u0000|\uFFFD/g;
function Au(e) {
    return (typeof e == "string" ? e : "" + e).replace(Vd, `
`).replace(Hd, "")
}
function Lr(e, t, n) {
    if (t = Au(t),
    Au(e) !== t && n)
        throw Error(E(425))
}
function rl() {}
var Ai = null
  , Bi = null;
function Wi(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var Vi = typeof setTimeout == "function" ? setTimeout : void 0
  , Qd = typeof clearTimeout == "function" ? clearTimeout : void 0
  , Bu = typeof Promise == "function" ? Promise : void 0
  , Kd = typeof queueMicrotask == "function" ? queueMicrotask : typeof Bu < "u" ? function(e) {
    return Bu.resolve(null).then(e).catch(Yd)
}
: Vi;
function Yd(e) {
    setTimeout(function() {
        throw e
    })
}
function si(e, t) {
    var n = t
      , r = 0;
    do {
        var l = n.nextSibling;
        if (e.removeChild(n),
        l && l.nodeType === 8)
            if (n = l.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(l),
                    Jn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = l
    } while (n);
    Jn(t)
}
function ht(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function Wu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var En = Math.random().toString(36).slice(2)
  , Be = "__reactFiber$" + En
  , tr = "__reactProps$" + En
  , Je = "__reactContainer$" + En
  , Hi = "__reactEvents$" + En
  , Gd = "__reactListeners$" + En
  , Xd = "__reactHandles$" + En;
function jt(e) {
    var t = e[Be];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[Je] || n[Be]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = Wu(e); e !== null; ) {
                    if (n = e[Be])
                        return n;
                    e = Wu(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function pr(e) {
    return e = e[Be] || e[Je],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function qt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(E(33))
}
function Pl(e) {
    return e[tr] || null
}
var Qi = []
  , bt = -1;
function xt(e) {
    return {
        current: e
    }
}
function $(e) {
    0 > bt || (e.current = Qi[bt],
    Qi[bt] = null,
    bt--)
}
function D(e, t) {
    bt++,
    Qi[bt] = e.current,
    e.current = t
}
var kt = {}
  , ue = xt(kt)
  , me = xt(!1)
  , Dt = kt;
function pn(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return kt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, i;
    for (i in n)
        l[i] = t[i];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = l),
    l
}
function ve(e) {
    return e = e.childContextTypes,
    e != null
}
function ll() {
    $(me),
    $(ue)
}
function Vu(e, t, n) {
    if (ue.current !== kt)
        throw Error(E(168));
    D(ue, t),
    D(me, n)
}
function Da(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var l in r)
        if (!(l in t))
            throw Error(E(108, Of(e) || "Unknown", l));
    return V({}, n, r)
}
function il(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || kt,
    Dt = ue.current,
    D(ue, e),
    D(me, me.current),
    !0
}
function Hu(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(E(169));
    n ? (e = Da(e, t, Dt),
    r.__reactInternalMemoizedMergedChildContext = e,
    $(me),
    $(ue),
    D(ue, e)) : $(me),
    D(me, n)
}
var Qe = null
  , Nl = !1
  , ai = !1;
function Ua(e) {
    Qe === null ? Qe = [e] : Qe.push(e)
}
function Jd(e) {
    Nl = !0,
    Ua(e)
}
function Ct() {
    if (!ai && Qe !== null) {
        ai = !0;
        var e = 0
          , t = M;
        try {
            var n = Qe;
            for (M = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            Qe = null,
            Nl = !1
        } catch (l) {
            throw Qe !== null && (Qe = Qe.slice(e + 1)),
            sa(No, Ct),
            l
        } finally {
            M = t,
            ai = !1
        }
    }
    return null
}
var en = []
  , tn = 0
  , ol = null
  , ul = 0
  , Pe = []
  , Ne = 0
  , Ut = null
  , Ke = 1
  , Ye = "";
function Tt(e, t) {
    en[tn++] = ul,
    en[tn++] = ol,
    ol = e,
    ul = t
}
function Fa(e, t, n) {
    Pe[Ne++] = Ke,
    Pe[Ne++] = Ye,
    Pe[Ne++] = Ut,
    Ut = e;
    var r = Ke;
    e = Ye;
    var l = 32 - De(r) - 1;
    r &= ~(1 << l),
    n += 1;
    var i = 32 - De(t) + l;
    if (30 < i) {
        var o = l - l % 5;
        i = (r & (1 << o) - 1).toString(32),
        r >>= o,
        l -= o,
        Ke = 1 << 32 - De(t) + l | n << l | r,
        Ye = i + e
    } else
        Ke = 1 << i | n << l | r,
        Ye = e
}
function Do(e) {
    e.return !== null && (Tt(e, 1),
    Fa(e, 1, 0))
}
function Uo(e) {
    for (; e === ol; )
        ol = en[--tn],
        en[tn] = null,
        ul = en[--tn],
        en[tn] = null;
    for (; e === Ut; )
        Ut = Pe[--Ne],
        Pe[Ne] = null,
        Ye = Pe[--Ne],
        Pe[Ne] = null,
        Ke = Pe[--Ne],
        Pe[Ne] = null
}
var ke = null
  , Se = null
  , A = !1
  , Me = null;
function $a(e, t) {
    var n = Te(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function Qu(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        ke = e,
        Se = ht(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        ke = e,
        Se = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = Ut !== null ? {
            id: Ke,
            overflow: Ye
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = Te(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        ke = e,
        Se = null,
        !0) : !1;
    default:
        return !1
    }
}
function Ki(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function Yi(e) {
    if (A) {
        var t = Se;
        if (t) {
            var n = t;
            if (!Qu(e, t)) {
                if (Ki(e))
                    throw Error(E(418));
                t = ht(n.nextSibling);
                var r = ke;
                t && Qu(e, t) ? $a(r, n) : (e.flags = e.flags & -4097 | 2,
                A = !1,
                ke = e)
            }
        } else {
            if (Ki(e))
                throw Error(E(418));
            e.flags = e.flags & -4097 | 2,
            A = !1,
            ke = e
        }
    }
}
function Ku(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    ke = e
}
function Rr(e) {
    if (e !== ke)
        return !1;
    if (!A)
        return Ku(e),
        A = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !Wi(e.type, e.memoizedProps)),
    t && (t = Se)) {
        if (Ki(e))
            throw Aa(),
            Error(E(418));
        for (; t; )
            $a(e, t),
            t = ht(t.nextSibling)
    }
    if (Ku(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(E(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Se = ht(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            Se = null
        }
    } else
        Se = ke ? ht(e.stateNode.nextSibling) : null;
    return !0
}
function Aa() {
    for (var e = Se; e; )
        e = ht(e.nextSibling)
}
function hn() {
    Se = ke = null,
    A = !1
}
function Fo(e) {
    Me === null ? Me = [e] : Me.push(e)
}
var Zd = et.ReactCurrentBatchConfig;
function Tn(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(E(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(E(147, e));
            var l = r
              , i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
                var u = l.refs;
                o === null ? delete u[i] : u[i] = o
            }
            ,
            t._stringRef = i,
            t)
        }
        if (typeof e != "string")
            throw Error(E(284));
        if (!n._owner)
            throw Error(E(290, e))
    }
    return e
}
function jr(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(E(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function Yu(e) {
    var t = e._init;
    return t(e._payload)
}
function Ba(e) {
    function t(d, c) {
        if (e) {
            var f = d.deletions;
            f === null ? (d.deletions = [c],
            d.flags |= 16) : f.push(c)
        }
    }
    function n(d, c) {
        if (!e)
            return null;
        for (; c !== null; )
            t(d, c),
            c = c.sibling;
        return null
    }
    function r(d, c) {
        for (d = new Map; c !== null; )
            c.key !== null ? d.set(c.key, c) : d.set(c.index, c),
            c = c.sibling;
        return d
    }
    function l(d, c) {
        return d = yt(d, c),
        d.index = 0,
        d.sibling = null,
        d
    }
    function i(d, c, f) {
        return d.index = f,
        e ? (f = d.alternate,
        f !== null ? (f = f.index,
        f < c ? (d.flags |= 2,
        c) : f) : (d.flags |= 2,
        c)) : (d.flags |= 1048576,
        c)
    }
    function o(d) {
        return e && d.alternate === null && (d.flags |= 2),
        d
    }
    function u(d, c, f, v) {
        return c === null || c.tag !== 6 ? (c = vi(f, d.mode, v),
        c.return = d,
        c) : (c = l(c, f),
        c.return = d,
        c)
    }
    function s(d, c, f, v) {
        var x = f.type;
        return x === Gt ? h(d, c, f.props.children, v, f.key) : c !== null && (c.elementType === x || typeof x == "object" && x !== null && x.$$typeof === lt && Yu(x) === c.type) ? (v = l(c, f.props),
        v.ref = Tn(d, c, f),
        v.return = d,
        v) : (v = Yr(f.type, f.key, f.props, null, d.mode, v),
        v.ref = Tn(d, c, f),
        v.return = d,
        v)
    }
    function a(d, c, f, v) {
        return c === null || c.tag !== 4 || c.stateNode.containerInfo !== f.containerInfo || c.stateNode.implementation !== f.implementation ? (c = gi(f, d.mode, v),
        c.return = d,
        c) : (c = l(c, f.children || []),
        c.return = d,
        c)
    }
    function h(d, c, f, v, x) {
        return c === null || c.tag !== 7 ? (c = Mt(f, d.mode, v, x),
        c.return = d,
        c) : (c = l(c, f),
        c.return = d,
        c)
    }
    function p(d, c, f) {
        if (typeof c == "string" && c !== "" || typeof c == "number")
            return c = vi("" + c, d.mode, f),
            c.return = d,
            c;
        if (typeof c == "object" && c !== null) {
            switch (c.$$typeof) {
            case Sr:
                return f = Yr(c.type, c.key, c.props, null, d.mode, f),
                f.ref = Tn(d, null, c),
                f.return = d,
                f;
            case Yt:
                return c = gi(c, d.mode, f),
                c.return = d,
                c;
            case lt:
                var v = c._init;
                return p(d, v(c._payload), f)
            }
            if (zn(c) || xn(c))
                return c = Mt(c, d.mode, f, null),
                c.return = d,
                c;
            jr(d, c)
        }
        return null
    }
    function m(d, c, f, v) {
        var x = c !== null ? c.key : null;
        if (typeof f == "string" && f !== "" || typeof f == "number")
            return x !== null ? null : u(d, c, "" + f, v);
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
            case Sr:
                return f.key === x ? s(d, c, f, v) : null;
            case Yt:
                return f.key === x ? a(d, c, f, v) : null;
            case lt:
                return x = f._init,
                m(d, c, x(f._payload), v)
            }
            if (zn(f) || xn(f))
                return x !== null ? null : h(d, c, f, v, null);
            jr(d, f)
        }
        return null
    }
    function y(d, c, f, v, x) {
        if (typeof v == "string" && v !== "" || typeof v == "number")
            return d = d.get(f) || null,
            u(c, d, "" + v, x);
        if (typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
            case Sr:
                return d = d.get(v.key === null ? f : v.key) || null,
                s(c, d, v, x);
            case Yt:
                return d = d.get(v.key === null ? f : v.key) || null,
                a(c, d, v, x);
            case lt:
                var P = v._init;
                return y(d, c, f, P(v._payload), x)
            }
            if (zn(v) || xn(v))
                return d = d.get(f) || null,
                h(c, d, v, x, null);
            jr(c, v)
        }
        return null
    }
    function g(d, c, f, v) {
        for (var x = null, P = null, T = c, L = c = 0, U = null; T !== null && L < f.length; L++) {
            T.index > L ? (U = T,
            T = null) : U = T.sibling;
            var R = m(d, T, f[L], v);
            if (R === null) {
                T === null && (T = U);
                break
            }
            e && T && R.alternate === null && t(d, T),
            c = i(R, c, L),
            P === null ? x = R : P.sibling = R,
            P = R,
            T = U
        }
        if (L === f.length)
            return n(d, T),
            A && Tt(d, L),
            x;
        if (T === null) {
            for (; L < f.length; L++)
                T = p(d, f[L], v),
                T !== null && (c = i(T, c, L),
                P === null ? x = T : P.sibling = T,
                P = T);
            return A && Tt(d, L),
            x
        }
        for (T = r(d, T); L < f.length; L++)
            U = y(T, d, L, f[L], v),
            U !== null && (e && U.alternate !== null && T.delete(U.key === null ? L : U.key),
            c = i(U, c, L),
            P === null ? x = U : P.sibling = U,
            P = U);
        return e && T.forEach(function(H) {
            return t(d, H)
        }),
        A && Tt(d, L),
        x
    }
    function S(d, c, f, v) {
        var x = xn(f);
        if (typeof x != "function")
            throw Error(E(150));
        if (f = x.call(f),
        f == null)
            throw Error(E(151));
        for (var P = x = null, T = c, L = c = 0, U = null, R = f.next(); T !== null && !R.done; L++,
        R = f.next()) {
            T.index > L ? (U = T,
            T = null) : U = T.sibling;
            var H = m(d, T, R.value, v);
            if (H === null) {
                T === null && (T = U);
                break
            }
            e && T && H.alternate === null && t(d, T),
            c = i(H, c, L),
            P === null ? x = H : P.sibling = H,
            P = H,
            T = U
        }
        if (R.done)
            return n(d, T),
            A && Tt(d, L),
            x;
        if (T === null) {
            for (; !R.done; L++,
            R = f.next())
                R = p(d, R.value, v),
                R !== null && (c = i(R, c, L),
                P === null ? x = R : P.sibling = R,
                P = R);
            return A && Tt(d, L),
            x
        }
        for (T = r(d, T); !R.done; L++,
        R = f.next())
            R = y(T, d, L, R.value, v),
            R !== null && (e && R.alternate !== null && T.delete(R.key === null ? L : R.key),
            c = i(R, c, L),
            P === null ? x = R : P.sibling = R,
            P = R);
        return e && T.forEach(function(ye) {
            return t(d, ye)
        }),
        A && Tt(d, L),
        x
    }
    function C(d, c, f, v) {
        if (typeof f == "object" && f !== null && f.type === Gt && f.key === null && (f = f.props.children),
        typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
            case Sr:
                e: {
                    for (var x = f.key, P = c; P !== null; ) {
                        if (P.key === x) {
                            if (x = f.type,
                            x === Gt) {
                                if (P.tag === 7) {
                                    n(d, P.sibling),
                                    c = l(P, f.props.children),
                                    c.return = d,
                                    d = c;
                                    break e
                                }
                            } else if (P.elementType === x || typeof x == "object" && x !== null && x.$$typeof === lt && Yu(x) === P.type) {
                                n(d, P.sibling),
                                c = l(P, f.props),
                                c.ref = Tn(d, P, f),
                                c.return = d,
                                d = c;
                                break e
                            }
                            n(d, P);
                            break
                        } else
                            t(d, P);
                        P = P.sibling
                    }
                    f.type === Gt ? (c = Mt(f.props.children, d.mode, v, f.key),
                    c.return = d,
                    d = c) : (v = Yr(f.type, f.key, f.props, null, d.mode, v),
                    v.ref = Tn(d, c, f),
                    v.return = d,
                    d = v)
                }
                return o(d);
            case Yt:
                e: {
                    for (P = f.key; c !== null; ) {
                        if (c.key === P)
                            if (c.tag === 4 && c.stateNode.containerInfo === f.containerInfo && c.stateNode.implementation === f.implementation) {
                                n(d, c.sibling),
                                c = l(c, f.children || []),
                                c.return = d,
                                d = c;
                                break e
                            } else {
                                n(d, c);
                                break
                            }
                        else
                            t(d, c);
                        c = c.sibling
                    }
                    c = gi(f, d.mode, v),
                    c.return = d,
                    d = c
                }
                return o(d);
            case lt:
                return P = f._init,
                C(d, c, P(f._payload), v)
            }
            if (zn(f))
                return g(d, c, f, v);
            if (xn(f))
                return S(d, c, f, v);
            jr(d, f)
        }
        return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f,
        c !== null && c.tag === 6 ? (n(d, c.sibling),
        c = l(c, f),
        c.return = d,
        d = c) : (n(d, c),
        c = vi(f, d.mode, v),
        c.return = d,
        d = c),
        o(d)) : n(d, c)
    }
    return C
}
var mn = Ba(!0)
  , Wa = Ba(!1)
  , sl = xt(null)
  , al = null
  , nn = null
  , $o = null;
function Ao() {
    $o = nn = al = null
}
function Bo(e) {
    var t = sl.current;
    $(sl),
    e._currentValue = t
}
function Gi(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function cn(e, t) {
    al = e,
    $o = nn = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (he = !0),
    e.firstContext = null)
}
function Re(e) {
    var t = e._currentValue;
    if ($o !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        nn === null) {
            if (al === null)
                throw Error(E(308));
            nn = e,
            al.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            nn = nn.next = e;
    return t
}
var zt = null;
function Wo(e) {
    zt === null ? zt = [e] : zt.push(e)
}
function Va(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n,
    Wo(t)) : (n.next = l.next,
    l.next = n),
    t.interleaved = n,
    Ze(e, r)
}
function Ze(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var it = !1;
function Vo(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function Ha(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function Ge(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function mt(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    I & 2) {
        var l = r.pending;
        return l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        r.pending = t,
        Ze(e, n)
    }
    return l = r.interleaved,
    l === null ? (t.next = t,
    Wo(r)) : (t.next = l.next,
    l.next = t),
    r.interleaved = t,
    Ze(e, n)
}
function Br(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        To(e, n)
    }
}
function Gu(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var l = null
          , i = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? l = i = o : i = i.next = o,
                n = n.next
            } while (n !== null);
            i === null ? l = i = t : i = i.next = t
        } else
            l = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function cl(e, t, n, r) {
    var l = e.updateQueue;
    it = !1;
    var i = l.firstBaseUpdate
      , o = l.lastBaseUpdate
      , u = l.shared.pending;
    if (u !== null) {
        l.shared.pending = null;
        var s = u
          , a = s.next;
        s.next = null,
        o === null ? i = a : o.next = a,
        o = s;
        var h = e.alternate;
        h !== null && (h = h.updateQueue,
        u = h.lastBaseUpdate,
        u !== o && (u === null ? h.firstBaseUpdate = a : u.next = a,
        h.lastBaseUpdate = s))
    }
    if (i !== null) {
        var p = l.baseState;
        o = 0,
        h = a = s = null,
        u = i;
        do {
            var m = u.lane
              , y = u.eventTime;
            if ((r & m) === m) {
                h !== null && (h = h.next = {
                    eventTime: y,
                    lane: 0,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                });
                e: {
                    var g = e
                      , S = u;
                    switch (m = t,
                    y = n,
                    S.tag) {
                    case 1:
                        if (g = S.payload,
                        typeof g == "function") {
                            p = g.call(y, p, m);
                            break e
                        }
                        p = g;
                        break e;
                    case 3:
                        g.flags = g.flags & -65537 | 128;
                    case 0:
                        if (g = S.payload,
                        m = typeof g == "function" ? g.call(y, p, m) : g,
                        m == null)
                            break e;
                        p = V({}, p, m);
                        break e;
                    case 2:
                        it = !0
                    }
                }
                u.callback !== null && u.lane !== 0 && (e.flags |= 64,
                m = l.effects,
                m === null ? l.effects = [u] : m.push(u))
            } else
                y = {
                    eventTime: y,
                    lane: m,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null
                },
                h === null ? (a = h = y,
                s = p) : h = h.next = y,
                o |= m;
            if (u = u.next,
            u === null) {
                if (u = l.shared.pending,
                u === null)
                    break;
                m = u,
                u = m.next,
                m.next = null,
                l.lastBaseUpdate = m,
                l.shared.pending = null
            }
        } while (!0);
        if (h === null && (s = p),
        l.baseState = s,
        l.firstBaseUpdate = a,
        l.lastBaseUpdate = h,
        t = l.shared.interleaved,
        t !== null) {
            l = t;
            do
                o |= l.lane,
                l = l.next;
            while (l !== t)
        } else
            i === null && (l.shared.lanes = 0);
        $t |= o,
        e.lanes = o,
        e.memoizedState = p
    }
}
function Xu(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , l = r.callback;
            if (l !== null) {
                if (r.callback = null,
                r = n,
                typeof l != "function")
                    throw Error(E(191, l));
                l.call(r)
            }
        }
}
var hr = {}
  , Ve = xt(hr)
  , nr = xt(hr)
  , rr = xt(hr);
function Ot(e) {
    if (e === hr)
        throw Error(E(174));
    return e
}
function Ho(e, t) {
    switch (D(rr, t),
    D(nr, e),
    D(Ve, hr),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Ti(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = Ti(t, e)
    }
    $(Ve),
    D(Ve, t)
}
function vn() {
    $(Ve),
    $(nr),
    $(rr)
}
function Qa(e) {
    Ot(rr.current);
    var t = Ot(Ve.current)
      , n = Ti(t, e.type);
    t !== n && (D(nr, e),
    D(Ve, n))
}
function Qo(e) {
    nr.current === e && ($(Ve),
    $(nr))
}
var B = xt(0);
function fl(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var ci = [];
function Ko() {
    for (var e = 0; e < ci.length; e++)
        ci[e]._workInProgressVersionPrimary = null;
    ci.length = 0
}
var Wr = et.ReactCurrentDispatcher
  , fi = et.ReactCurrentBatchConfig
  , Ft = 0
  , W = null
  , J = null
  , b = null
  , dl = !1
  , Bn = !1
  , lr = 0
  , qd = 0;
function le() {
    throw Error(E(321))
}
function Yo(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Fe(e[n], t[n]))
            return !1;
    return !0
}
function Go(e, t, n, r, l, i) {
    if (Ft = i,
    W = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Wr.current = e === null || e.memoizedState === null ? np : rp,
    e = n(r, l),
    Bn) {
        i = 0;
        do {
            if (Bn = !1,
            lr = 0,
            25 <= i)
                throw Error(E(301));
            i += 1,
            b = J = null,
            t.updateQueue = null,
            Wr.current = lp,
            e = n(r, l)
        } while (Bn)
    }
    if (Wr.current = pl,
    t = J !== null && J.next !== null,
    Ft = 0,
    b = J = W = null,
    dl = !1,
    t)
        throw Error(E(300));
    return e
}
function Xo() {
    var e = lr !== 0;
    return lr = 0,
    e
}
function Ae() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return b === null ? W.memoizedState = b = e : b = b.next = e,
    b
}
function je() {
    if (J === null) {
        var e = W.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = J.next;
    var t = b === null ? W.memoizedState : b.next;
    if (t !== null)
        b = t,
        J = e;
    else {
        if (e === null)
            throw Error(E(310));
        J = e,
        e = {
            memoizedState: J.memoizedState,
            baseState: J.baseState,
            baseQueue: J.baseQueue,
            queue: J.queue,
            next: null
        },
        b === null ? W.memoizedState = b = e : b = b.next = e
    }
    return b
}
function ir(e, t) {
    return typeof t == "function" ? t(e) : t
}
function di(e) {
    var t = je()
      , n = t.queue;
    if (n === null)
        throw Error(E(311));
    n.lastRenderedReducer = e;
    var r = J
      , l = r.baseQueue
      , i = n.pending;
    if (i !== null) {
        if (l !== null) {
            var o = l.next;
            l.next = i.next,
            i.next = o
        }
        r.baseQueue = l = i,
        n.pending = null
    }
    if (l !== null) {
        i = l.next,
        r = r.baseState;
        var u = o = null
          , s = null
          , a = i;
        do {
            var h = a.lane;
            if ((Ft & h) === h)
                s !== null && (s = s.next = {
                    lane: 0,
                    action: a.action,
                    hasEagerState: a.hasEagerState,
                    eagerState: a.eagerState,
                    next: null
                }),
                r = a.hasEagerState ? a.eagerState : e(r, a.action);
            else {
                var p = {
                    lane: h,
                    action: a.action,
                    hasEagerState: a.hasEagerState,
                    eagerState: a.eagerState,
                    next: null
                };
                s === null ? (u = s = p,
                o = r) : s = s.next = p,
                W.lanes |= h,
                $t |= h
            }
            a = a.next
        } while (a !== null && a !== i);
        s === null ? o = r : s.next = u,
        Fe(r, t.memoizedState) || (he = !0),
        t.memoizedState = r,
        t.baseState = o,
        t.baseQueue = s,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        l = e;
        do
            i = l.lane,
            W.lanes |= i,
            $t |= i,
            l = l.next;
        while (l !== e)
    } else
        l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function pi(e) {
    var t = je()
      , n = t.queue;
    if (n === null)
        throw Error(E(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , l = n.pending
      , i = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var o = l = l.next;
        do
            i = e(i, o.action),
            o = o.next;
        while (o !== l);
        Fe(i, t.memoizedState) || (he = !0),
        t.memoizedState = i,
        t.baseQueue === null && (t.baseState = i),
        n.lastRenderedState = i
    }
    return [i, r]
}
function Ka() {}
function Ya(e, t) {
    var n = W
      , r = je()
      , l = t()
      , i = !Fe(r.memoizedState, l);
    if (i && (r.memoizedState = l,
    he = !0),
    r = r.queue,
    Jo(Ja.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || b !== null && b.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        or(9, Xa.bind(null, n, r, l, t), void 0, null),
        ee === null)
            throw Error(E(349));
        Ft & 30 || Ga(n, t, l)
    }
    return l
}
function Ga(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = W.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    W.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function Xa(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    Za(t) && qa(e)
}
function Ja(e, t, n) {
    return n(function() {
        Za(t) && qa(e)
    })
}
function Za(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Fe(e, n)
    } catch {
        return !0
    }
}
function qa(e) {
    var t = Ze(e, 1);
    t !== null && Ue(t, e, 1, -1)
}
function Ju(e) {
    var t = Ae();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ir,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = tp.bind(null, W, e),
    [t.memoizedState, e]
}
function or(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = W.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    W.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function ba() {
    return je().memoizedState
}
function Vr(e, t, n, r) {
    var l = Ae();
    W.flags |= e,
    l.memoizedState = or(1 | t, n, void 0, r === void 0 ? null : r)
}
function Tl(e, t, n, r) {
    var l = je();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (J !== null) {
        var o = J.memoizedState;
        if (i = o.destroy,
        r !== null && Yo(r, o.deps)) {
            l.memoizedState = or(t, n, i, r);
            return
        }
    }
    W.flags |= e,
    l.memoizedState = or(1 | t, n, i, r)
}
function Zu(e, t) {
    return Vr(8390656, 8, e, t)
}
function Jo(e, t) {
    return Tl(2048, 8, e, t)
}
function ec(e, t) {
    return Tl(4, 2, e, t)
}
function tc(e, t) {
    return Tl(4, 4, e, t)
}
function nc(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function rc(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    Tl(4, 4, nc.bind(null, t, e), n)
}
function Zo() {}
function lc(e, t) {
    var n = je();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Yo(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function ic(e, t) {
    var n = je();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Yo(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function oc(e, t, n) {
    return Ft & 21 ? (Fe(n, t) || (n = fa(),
    W.lanes |= n,
    $t |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    he = !0),
    e.memoizedState = n)
}
function bd(e, t) {
    var n = M;
    M = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = fi.transition;
    fi.transition = {};
    try {
        e(!1),
        t()
    } finally {
        M = n,
        fi.transition = r
    }
}
function uc() {
    return je().memoizedState
}
function ep(e, t, n) {
    var r = gt(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    sc(e))
        ac(t, n);
    else if (n = Va(e, t, n, r),
    n !== null) {
        var l = ae();
        Ue(n, e, r, l),
        cc(n, t, r)
    }
}
function tp(e, t, n) {
    var r = gt(e)
      , l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (sc(e))
        ac(t, l);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer,
        i !== null))
            try {
                var o = t.lastRenderedState
                  , u = i(o, n);
                if (l.hasEagerState = !0,
                l.eagerState = u,
                Fe(u, o)) {
                    var s = t.interleaved;
                    s === null ? (l.next = l,
                    Wo(t)) : (l.next = s.next,
                    s.next = l),
                    t.interleaved = l;
                    return
                }
            } catch {} finally {}
        n = Va(e, t, l, r),
        n !== null && (l = ae(),
        Ue(n, e, r, l),
        cc(n, t, r))
    }
}
function sc(e) {
    var t = e.alternate;
    return e === W || t !== null && t === W
}
function ac(e, t) {
    Bn = dl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function cc(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        To(e, n)
    }
}
var pl = {
    readContext: Re,
    useCallback: le,
    useContext: le,
    useEffect: le,
    useImperativeHandle: le,
    useInsertionEffect: le,
    useLayoutEffect: le,
    useMemo: le,
    useReducer: le,
    useRef: le,
    useState: le,
    useDebugValue: le,
    useDeferredValue: le,
    useTransition: le,
    useMutableSource: le,
    useSyncExternalStore: le,
    useId: le,
    unstable_isNewReconciler: !1
}
  , np = {
    readContext: Re,
    useCallback: function(e, t) {
        return Ae().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: Re,
    useEffect: Zu,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        Vr(4194308, 4, nc.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return Vr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return Vr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = Ae();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = Ae();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = ep.bind(null, W, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = Ae();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: Ju,
    useDebugValue: Zo,
    useDeferredValue: function(e) {
        return Ae().memoizedState = e
    },
    useTransition: function() {
        var e = Ju(!1)
          , t = e[0];
        return e = bd.bind(null, e[1]),
        Ae().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = W
          , l = Ae();
        if (A) {
            if (n === void 0)
                throw Error(E(407));
            n = n()
        } else {
            if (n = t(),
            ee === null)
                throw Error(E(349));
            Ft & 30 || Ga(r, t, n)
        }
        l.memoizedState = n;
        var i = {
            value: n,
            getSnapshot: t
        };
        return l.queue = i,
        Zu(Ja.bind(null, r, i, e), [e]),
        r.flags |= 2048,
        or(9, Xa.bind(null, r, i, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = Ae()
          , t = ee.identifierPrefix;
        if (A) {
            var n = Ye
              , r = Ke;
            n = (r & ~(1 << 32 - De(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = lr++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = qd++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , rp = {
    readContext: Re,
    useCallback: lc,
    useContext: Re,
    useEffect: Jo,
    useImperativeHandle: rc,
    useInsertionEffect: ec,
    useLayoutEffect: tc,
    useMemo: ic,
    useReducer: di,
    useRef: ba,
    useState: function() {
        return di(ir)
    },
    useDebugValue: Zo,
    useDeferredValue: function(e) {
        var t = je();
        return oc(t, J.memoizedState, e)
    },
    useTransition: function() {
        var e = di(ir)[0]
          , t = je().memoizedState;
        return [e, t]
    },
    useMutableSource: Ka,
    useSyncExternalStore: Ya,
    useId: uc,
    unstable_isNewReconciler: !1
}
  , lp = {
    readContext: Re,
    useCallback: lc,
    useContext: Re,
    useEffect: Jo,
    useImperativeHandle: rc,
    useInsertionEffect: ec,
    useLayoutEffect: tc,
    useMemo: ic,
    useReducer: pi,
    useRef: ba,
    useState: function() {
        return pi(ir)
    },
    useDebugValue: Zo,
    useDeferredValue: function(e) {
        var t = je();
        return J === null ? t.memoizedState = e : oc(t, J.memoizedState, e)
    },
    useTransition: function() {
        var e = pi(ir)[0]
          , t = je().memoizedState;
        return [e, t]
    },
    useMutableSource: Ka,
    useSyncExternalStore: Ya,
    useId: uc,
    unstable_isNewReconciler: !1
};
function Oe(e, t) {
    if (e && e.defaultProps) {
        t = V({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function Xi(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : V({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Ll = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Wt(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = ae()
          , l = gt(e)
          , i = Ge(r, l);
        i.payload = t,
        n != null && (i.callback = n),
        t = mt(e, i, l),
        t !== null && (Ue(t, e, l, r),
        Br(t, e, l))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = ae()
          , l = gt(e)
          , i = Ge(r, l);
        i.tag = 1,
        i.payload = t,
        n != null && (i.callback = n),
        t = mt(e, i, l),
        t !== null && (Ue(t, e, l, r),
        Br(t, e, l))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = ae()
          , r = gt(e)
          , l = Ge(n, r);
        l.tag = 2,
        t != null && (l.callback = t),
        t = mt(e, l, r),
        t !== null && (Ue(t, e, r, n),
        Br(t, e, r))
    }
};
function qu(e, t, n, r, l, i, o) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(l, i) : !0
}
function fc(e, t, n) {
    var r = !1
      , l = kt
      , i = t.contextType;
    return typeof i == "object" && i !== null ? i = Re(i) : (l = ve(t) ? Dt : ue.current,
    r = t.contextTypes,
    i = (r = r != null) ? pn(e, l) : kt),
    t = new t(n,i),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = Ll,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = l,
    e.__reactInternalMemoizedMaskedChildContext = i),
    t
}
function bu(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ll.enqueueReplaceState(t, t.state, null)
}
function Ji(e, t, n, r) {
    var l = e.stateNode;
    l.props = n,
    l.state = e.memoizedState,
    l.refs = {},
    Vo(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? l.context = Re(i) : (i = ve(t) ? Dt : ue.current,
    l.context = pn(e, i)),
    l.state = e.memoizedState,
    i = t.getDerivedStateFromProps,
    typeof i == "function" && (Xi(e, t, i, n),
    l.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state,
    typeof l.componentWillMount == "function" && l.componentWillMount(),
    typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
    t !== l.state && Ll.enqueueReplaceState(l, l.state, null),
    cl(e, n, l, r),
    l.state = e.memoizedState),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}
function gn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += zf(r),
            r = r.return;
        while (r);
        var l = n
    } catch (i) {
        l = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: l,
        digest: null
    }
}
function hi(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function Zi(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var ip = typeof WeakMap == "function" ? WeakMap : Map;
function dc(e, t, n) {
    n = Ge(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        ml || (ml = !0,
        uo = r),
        Zi(e, t)
    }
    ,
    n
}
function pc(e, t, n) {
    n = Ge(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        n.payload = function() {
            return r(l)
        }
        ,
        n.callback = function() {
            Zi(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        Zi(e, t),
        typeof r != "function" && (vt === null ? vt = new Set([this]) : vt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : ""
        })
    }
    ),
    n
}
function es(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new ip;
        var l = new Set;
        r.set(t, l)
    } else
        l = r.get(t),
        l === void 0 && (l = new Set,
        r.set(t, l));
    l.has(n) || (l.add(n),
    e = wp.bind(null, e, t, n),
    t.then(e, e))
}
function ts(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function ns(e, t, n, r, l) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = l,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1),
    t.tag = 2,
    mt(n, t, 1))),
    n.lanes |= 1),
    e)
}
var op = et.ReactCurrentOwner
  , he = !1;
function se(e, t, n, r) {
    t.child = e === null ? Wa(t, null, n, r) : mn(t, e.child, n, r)
}
function rs(e, t, n, r, l) {
    n = n.render;
    var i = t.ref;
    return cn(t, l),
    r = Go(e, t, n, r, i, l),
    n = Xo(),
    e !== null && !he ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    qe(e, t, l)) : (A && n && Do(t),
    t.flags |= 1,
    se(e, t, r, l),
    t.child)
}
function ls(e, t, n, r, l) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !iu(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = i,
        hc(e, t, i, r, l)) : (e = Yr(n.type, null, r, t, t.mode, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (i = e.child,
    !(e.lanes & l)) {
        var o = i.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : qn,
        n(o, r) && e.ref === t.ref)
            return qe(e, t, l)
    }
    return t.flags |= 1,
    e = yt(i, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function hc(e, t, n, r, l) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (qn(i, r) && e.ref === t.ref)
            if (he = !1,
            t.pendingProps = r = i,
            (e.lanes & l) !== 0)
                e.flags & 131072 && (he = !0);
            else
                return t.lanes = e.lanes,
                qe(e, t, l)
    }
    return qi(e, t, n, r, l)
}
function mc(e, t, n) {
    var r = t.pendingProps
      , l = r.children
      , i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            D(ln, we),
            we |= n;
        else {
            if (!(n & 1073741824))
                return e = i !== null ? i.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                D(ln, we),
                we |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = i !== null ? i.baseLanes : n,
            D(ln, we),
            we |= r
        }
    else
        i !== null ? (r = i.baseLanes | n,
        t.memoizedState = null) : r = n,
        D(ln, we),
        we |= r;
    return se(e, t, l, n),
    t.child
}
function vc(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function qi(e, t, n, r, l) {
    var i = ve(n) ? Dt : ue.current;
    return i = pn(t, i),
    cn(t, l),
    n = Go(e, t, n, r, i, l),
    r = Xo(),
    e !== null && !he ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    qe(e, t, l)) : (A && r && Do(t),
    t.flags |= 1,
    se(e, t, n, l),
    t.child)
}
function is(e, t, n, r, l) {
    if (ve(n)) {
        var i = !0;
        il(t)
    } else
        i = !1;
    if (cn(t, l),
    t.stateNode === null)
        Hr(e, t),
        fc(t, n, r),
        Ji(t, n, r, l),
        r = !0;
    else if (e === null) {
        var o = t.stateNode
          , u = t.memoizedProps;
        o.props = u;
        var s = o.context
          , a = n.contextType;
        typeof a == "object" && a !== null ? a = Re(a) : (a = ve(n) ? Dt : ue.current,
        a = pn(t, a));
        var h = n.getDerivedStateFromProps
          , p = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        p || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== a) && bu(t, o, r, a),
        it = !1;
        var m = t.memoizedState;
        o.state = m,
        cl(t, r, o, l),
        s = t.memoizedState,
        u !== r || m !== s || me.current || it ? (typeof h == "function" && (Xi(t, n, h, r),
        s = t.memoizedState),
        (u = it || qu(t, n, u, r, m, s, a)) ? (p || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = s),
        o.props = r,
        o.state = s,
        o.context = a,
        r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        o = t.stateNode,
        Ha(e, t),
        u = t.memoizedProps,
        a = t.type === t.elementType ? u : Oe(t.type, u),
        o.props = a,
        p = t.pendingProps,
        m = o.context,
        s = n.contextType,
        typeof s == "object" && s !== null ? s = Re(s) : (s = ve(n) ? Dt : ue.current,
        s = pn(t, s));
        var y = n.getDerivedStateFromProps;
        (h = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== p || m !== s) && bu(t, o, r, s),
        it = !1,
        m = t.memoizedState,
        o.state = m,
        cl(t, r, o, l);
        var g = t.memoizedState;
        u !== p || m !== g || me.current || it ? (typeof y == "function" && (Xi(t, n, y, r),
        g = t.memoizedState),
        (a = it || qu(t, n, a, r, m, g, s) || !1) ? (h || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, g, s),
        typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, g, s)),
        typeof o.componentDidUpdate == "function" && (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = g),
        o.props = r,
        o.state = g,
        o.context = s,
        r = a) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return bi(e, t, n, r, i, l)
}
function bi(e, t, n, r, l, i) {
    vc(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o)
        return l && Hu(t, n, !1),
        qe(e, t, i);
    r = t.stateNode,
    op.current = t;
    var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && o ? (t.child = mn(t, e.child, null, i),
    t.child = mn(t, null, u, i)) : se(e, t, u, i),
    t.memoizedState = r.state,
    l && Hu(t, n, !0),
    t.child
}
function gc(e) {
    var t = e.stateNode;
    t.pendingContext ? Vu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Vu(e, t.context, !1),
    Ho(e, t.containerInfo)
}
function os(e, t, n, r, l) {
    return hn(),
    Fo(l),
    t.flags |= 256,
    se(e, t, n, r),
    t.child
}
var eo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function to(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function yc(e, t, n) {
    var r = t.pendingProps, l = B.current, i = !1, o = (t.flags & 128) !== 0, u;
    if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u ? (i = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1),
    D(B, l & 1),
    e === null)
        return Yi(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (o = r.children,
        e = r.fallback,
        i ? (r = t.mode,
        i = t.child,
        o = {
            mode: "hidden",
            children: o
        },
        !(r & 1) && i !== null ? (i.childLanes = 0,
        i.pendingProps = o) : i = zl(o, r, 0, null),
        e = Mt(e, r, n, null),
        i.return = t,
        e.return = t,
        i.sibling = e,
        t.child = i,
        t.child.memoizedState = to(n),
        t.memoizedState = eo,
        e) : qo(t, o));
    if (l = e.memoizedState,
    l !== null && (u = l.dehydrated,
    u !== null))
        return up(e, t, o, r, u, l, n);
    if (i) {
        i = r.fallback,
        o = t.mode,
        l = e.child,
        u = l.sibling;
        var s = {
            mode: "hidden",
            children: r.children
        };
        return !(o & 1) && t.child !== l ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = s,
        t.deletions = null) : (r = yt(l, s),
        r.subtreeFlags = l.subtreeFlags & 14680064),
        u !== null ? i = yt(u, i) : (i = Mt(i, o, n, null),
        i.flags |= 2),
        i.return = t,
        r.return = t,
        r.sibling = i,
        t.child = r,
        r = i,
        i = t.child,
        o = e.child.memoizedState,
        o = o === null ? to(n) : {
            baseLanes: o.baseLanes | n,
            cachePool: null,
            transitions: o.transitions
        },
        i.memoizedState = o,
        i.childLanes = e.childLanes & ~n,
        t.memoizedState = eo,
        r
    }
    return i = e.child,
    e = i.sibling,
    r = yt(i, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function qo(e, t) {
    return t = zl({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function zr(e, t, n, r) {
    return r !== null && Fo(r),
    mn(t, e.child, null, n),
    e = qo(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function up(e, t, n, r, l, i, o) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = hi(Error(E(422))),
        zr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (i = r.fallback,
        l = t.mode,
        r = zl({
            mode: "visible",
            children: r.children
        }, l, 0, null),
        i = Mt(i, l, o, null),
        i.flags |= 2,
        r.return = t,
        i.return = t,
        r.sibling = i,
        t.child = r,
        t.mode & 1 && mn(t, e.child, null, o),
        t.child.memoizedState = to(o),
        t.memoizedState = eo,
        i);
    if (!(t.mode & 1))
        return zr(e, t, o, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset,
        r)
            var u = r.dgst;
        return r = u,
        i = Error(E(419)),
        r = hi(i, r, void 0),
        zr(e, t, o, r)
    }
    if (u = (o & e.childLanes) !== 0,
    he || u) {
        if (r = ee,
        r !== null) {
            switch (o & -o) {
            case 4:
                l = 2;
                break;
            case 16:
                l = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                l = 32;
                break;
            case 536870912:
                l = 268435456;
                break;
            default:
                l = 0
            }
            l = l & (r.suspendedLanes | o) ? 0 : l,
            l !== 0 && l !== i.retryLane && (i.retryLane = l,
            Ze(e, l),
            Ue(r, e, l, -1))
        }
        return lu(),
        r = hi(Error(E(421))),
        zr(e, t, o, r)
    }
    return l.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = Sp.bind(null, e),
    l._reactRetry = t,
    null) : (e = i.treeContext,
    Se = ht(l.nextSibling),
    ke = t,
    A = !0,
    Me = null,
    e !== null && (Pe[Ne++] = Ke,
    Pe[Ne++] = Ye,
    Pe[Ne++] = Ut,
    Ke = e.id,
    Ye = e.overflow,
    Ut = t),
    t = qo(t, r.children),
    t.flags |= 4096,
    t)
}
function us(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    Gi(e.return, t, n)
}
function mi(e, t, n, r, l) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l
    } : (i.isBackwards = t,
    i.rendering = null,
    i.renderingStartTime = 0,
    i.last = r,
    i.tail = n,
    i.tailMode = l)
}
function wc(e, t, n) {
    var r = t.pendingProps
      , l = r.revealOrder
      , i = r.tail;
    if (se(e, t, r.children, n),
    r = B.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && us(e, n, t);
                else if (e.tag === 19)
                    us(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (D(B, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (l) {
        case "forwards":
            for (n = t.child,
            l = null; n !== null; )
                e = n.alternate,
                e !== null && fl(e) === null && (l = n),
                n = n.sibling;
            n = l,
            n === null ? (l = t.child,
            t.child = null) : (l = n.sibling,
            n.sibling = null),
            mi(t, !1, l, n, i);
            break;
        case "backwards":
            for (n = null,
            l = t.child,
            t.child = null; l !== null; ) {
                if (e = l.alternate,
                e !== null && fl(e) === null) {
                    t.child = l;
                    break
                }
                e = l.sibling,
                l.sibling = n,
                n = l,
                l = e
            }
            mi(t, !0, n, null, i);
            break;
        case "together":
            mi(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Hr(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function qe(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    $t |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(E(153));
    if (t.child !== null) {
        for (e = t.child,
        n = yt(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = yt(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function sp(e, t, n) {
    switch (t.tag) {
    case 3:
        gc(t),
        hn();
        break;
    case 5:
        Qa(t);
        break;
    case 1:
        ve(t.type) && il(t);
        break;
    case 4:
        Ho(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , l = t.memoizedProps.value;
        D(sl, r._currentValue),
        r._currentValue = l;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (D(B, B.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? yc(e, t, n) : (D(B, B.current & 1),
            e = qe(e, t, n),
            e !== null ? e.sibling : null);
        D(B, B.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return wc(e, t, n);
            t.flags |= 128
        }
        if (l = t.memoizedState,
        l !== null && (l.rendering = null,
        l.tail = null,
        l.lastEffect = null),
        D(B, B.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        mc(e, t, n)
    }
    return qe(e, t, n)
}
var Sc, no, kc, Ec;
Sc = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
no = function() {}
;
kc = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = t.stateNode,
        Ot(Ve.current);
        var i = null;
        switch (n) {
        case "input":
            l = Ci(e, l),
            r = Ci(e, r),
            i = [];
            break;
        case "select":
            l = V({}, l, {
                value: void 0
            }),
            r = V({}, r, {
                value: void 0
            }),
            i = [];
            break;
        case "textarea":
            l = Ni(e, l),
            r = Ni(e, r),
            i = [];
            break;
        default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = rl)
        }
        Li(n, r);
        var o;
        n = null;
        for (a in l)
            if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
                if (a === "style") {
                    var u = l[a];
                    for (o in u)
                        u.hasOwnProperty(o) && (n || (n = {}),
                        n[o] = "")
                } else
                    a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Qn.hasOwnProperty(a) ? i || (i = []) : (i = i || []).push(a, null));
        for (a in r) {
            var s = r[a];
            if (u = l != null ? l[a] : void 0,
            r.hasOwnProperty(a) && s !== u && (s != null || u != null))
                if (a === "style")
                    if (u) {
                        for (o in u)
                            !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}),
                            n[o] = "");
                        for (o in s)
                            s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}),
                            n[o] = s[o])
                    } else
                        n || (i || (i = []),
                        i.push(a, n)),
                        n = s;
                else
                    a === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                    u = u ? u.__html : void 0,
                    s != null && u !== s && (i = i || []).push(a, s)) : a === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(a, "" + s) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (Qn.hasOwnProperty(a) ? (s != null && a === "onScroll" && F("scroll", e),
                    i || u === s || (i = [])) : (i = i || []).push(a, s))
        }
        n && (i = i || []).push("style", n);
        var a = i;
        (t.updateQueue = a) && (t.flags |= 4)
    }
}
;
Ec = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function Ln(e, t) {
    if (!A)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags & 14680064,
            r |= l.flags & 14680064,
            l.return = e,
            l = l.sibling;
    else
        for (l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags,
            r |= l.flags,
            l.return = e,
            l = l.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function ap(e, t, n) {
    var r = t.pendingProps;
    switch (Uo(t),
    t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return ie(t),
        null;
    case 1:
        return ve(t.type) && ll(),
        ie(t),
        null;
    case 3:
        return r = t.stateNode,
        vn(),
        $(me),
        $(ue),
        Ko(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (Rr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Me !== null && (co(Me),
        Me = null))),
        no(e, t),
        ie(t),
        null;
    case 5:
        Qo(t);
        var l = Ot(rr.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            kc(e, t, n, r, l),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(E(166));
                return ie(t),
                null
            }
            if (e = Ot(Ve.current),
            Rr(t)) {
                r = t.stateNode,
                n = t.type;
                var i = t.memoizedProps;
                switch (r[Be] = t,
                r[tr] = i,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    F("cancel", r),
                    F("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    F("load", r);
                    break;
                case "video":
                case "audio":
                    for (l = 0; l < In.length; l++)
                        F(In[l], r);
                    break;
                case "source":
                    F("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    F("error", r),
                    F("load", r);
                    break;
                case "details":
                    F("toggle", r);
                    break;
                case "input":
                    vu(r, i),
                    F("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!i.multiple
                    },
                    F("invalid", r);
                    break;
                case "textarea":
                    yu(r, i),
                    F("invalid", r)
                }
                Li(n, i),
                l = null;
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        var u = i[o];
                        o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && Lr(r.textContent, u, e),
                        l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && Lr(r.textContent, u, e),
                        l = ["children", "" + u]) : Qn.hasOwnProperty(o) && u != null && o === "onScroll" && F("scroll", r)
                    }
                switch (n) {
                case "input":
                    kr(r),
                    gu(r, i, !0);
                    break;
                case "textarea":
                    kr(r),
                    wu(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof i.onClick == "function" && (r.onclick = rl)
                }
                r = l,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                o = l.nodeType === 9 ? l : l.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = Js(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                    is: r.is
                }) : (e = o.createElement(n),
                n === "select" && (o = e,
                r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n),
                e[Be] = t,
                e[tr] = r,
                Sc(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (o = Ri(n, r),
                    n) {
                    case "dialog":
                        F("cancel", e),
                        F("close", e),
                        l = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        F("load", e),
                        l = r;
                        break;
                    case "video":
                    case "audio":
                        for (l = 0; l < In.length; l++)
                            F(In[l], e);
                        l = r;
                        break;
                    case "source":
                        F("error", e),
                        l = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        F("error", e),
                        F("load", e),
                        l = r;
                        break;
                    case "details":
                        F("toggle", e),
                        l = r;
                        break;
                    case "input":
                        vu(e, r),
                        l = Ci(e, r),
                        F("invalid", e);
                        break;
                    case "option":
                        l = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        l = V({}, r, {
                            value: void 0
                        }),
                        F("invalid", e);
                        break;
                    case "textarea":
                        yu(e, r),
                        l = Ni(e, r),
                        F("invalid", e);
                        break;
                    default:
                        l = r
                    }
                    Li(n, l),
                    u = l;
                    for (i in u)
                        if (u.hasOwnProperty(i)) {
                            var s = u[i];
                            i === "style" ? bs(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0,
                            s != null && Zs(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Kn(e, s) : typeof s == "number" && Kn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Qn.hasOwnProperty(i) ? s != null && i === "onScroll" && F("scroll", e) : s != null && Eo(e, i, s, o))
                        }
                    switch (n) {
                    case "input":
                        kr(e),
                        gu(e, r, !1);
                        break;
                    case "textarea":
                        kr(e),
                        wu(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + St(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        i = r.value,
                        i != null ? on(e, !!r.multiple, i, !1) : r.defaultValue != null && on(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof l.onClick == "function" && (e.onclick = rl)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return ie(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            Ec(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(E(166));
            if (n = Ot(rr.current),
            Ot(Ve.current),
            Rr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[Be] = t,
                (i = r.nodeValue !== n) && (e = ke,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        Lr(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && Lr(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                i && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[Be] = t,
                t.stateNode = r
        }
        return ie(t),
        null;
    case 13:
        if ($(B),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (A && Se !== null && t.mode & 1 && !(t.flags & 128))
                Aa(),
                hn(),
                t.flags |= 98560,
                i = !1;
            else if (i = Rr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!i)
                        throw Error(E(318));
                    if (i = t.memoizedState,
                    i = i !== null ? i.dehydrated : null,
                    !i)
                        throw Error(E(317));
                    i[Be] = t
                } else
                    hn(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                ie(t),
                i = !1
            } else
                Me !== null && (co(Me),
                Me = null),
                i = !0;
            if (!i)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || B.current & 1 ? Z === 0 && (Z = 3) : lu())),
        t.updateQueue !== null && (t.flags |= 4),
        ie(t),
        null);
    case 4:
        return vn(),
        no(e, t),
        e === null && bn(t.stateNode.containerInfo),
        ie(t),
        null;
    case 10:
        return Bo(t.type._context),
        ie(t),
        null;
    case 17:
        return ve(t.type) && ll(),
        ie(t),
        null;
    case 19:
        if ($(B),
        i = t.memoizedState,
        i === null)
            return ie(t),
            null;
        if (r = (t.flags & 128) !== 0,
        o = i.rendering,
        o === null)
            if (r)
                Ln(i, !1);
            else {
                if (Z !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (o = fl(e),
                        o !== null) {
                            for (t.flags |= 128,
                            Ln(i, !1),
                            r = o.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                i = n,
                                e = r,
                                i.flags &= 14680066,
                                o = i.alternate,
                                o === null ? (i.childLanes = 0,
                                i.lanes = e,
                                i.child = null,
                                i.subtreeFlags = 0,
                                i.memoizedProps = null,
                                i.memoizedState = null,
                                i.updateQueue = null,
                                i.dependencies = null,
                                i.stateNode = null) : (i.childLanes = o.childLanes,
                                i.lanes = o.lanes,
                                i.child = o.child,
                                i.subtreeFlags = 0,
                                i.deletions = null,
                                i.memoizedProps = o.memoizedProps,
                                i.memoizedState = o.memoizedState,
                                i.updateQueue = o.updateQueue,
                                i.type = o.type,
                                e = o.dependencies,
                                i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return D(B, B.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                i.tail !== null && G() > yn && (t.flags |= 128,
                r = !0,
                Ln(i, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = fl(o),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    Ln(i, !0),
                    i.tail === null && i.tailMode === "hidden" && !o.alternate && !A)
                        return ie(t),
                        null
                } else
                    2 * G() - i.renderingStartTime > yn && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    Ln(i, !1),
                    t.lanes = 4194304);
            i.isBackwards ? (o.sibling = t.child,
            t.child = o) : (n = i.last,
            n !== null ? n.sibling = o : t.child = o,
            i.last = o)
        }
        return i.tail !== null ? (t = i.tail,
        i.rendering = t,
        i.tail = t.sibling,
        i.renderingStartTime = G(),
        t.sibling = null,
        n = B.current,
        D(B, r ? n & 1 | 2 : n & 1),
        t) : (ie(t),
        null);
    case 22:
    case 23:
        return ru(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? we & 1073741824 && (ie(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : ie(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(E(156, t.tag))
}
function cp(e, t) {
    switch (Uo(t),
    t.tag) {
    case 1:
        return ve(t.type) && ll(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return vn(),
        $(me),
        $(ue),
        Ko(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return Qo(t),
        null;
    case 13:
        if ($(B),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(E(340));
            hn()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return $(B),
        null;
    case 4:
        return vn(),
        null;
    case 10:
        return Bo(t.type._context),
        null;
    case 22:
    case 23:
        return ru(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var Or = !1
  , oe = !1
  , fp = typeof WeakSet == "function" ? WeakSet : Set
  , _ = null;
function rn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                Q(e, t, r)
            }
        else
            n.current = null
}
function ro(e, t, n) {
    try {
        n()
    } catch (r) {
        Q(e, t, r)
    }
}
var ss = !1;
function dp(e, t) {
    if (Ai = el,
    e = Na(),
    Mo(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset
                      , i = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        i.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var o = 0
                      , u = -1
                      , s = -1
                      , a = 0
                      , h = 0
                      , p = e
                      , m = null;
                    t: for (; ; ) {
                        for (var y; p !== n || l !== 0 && p.nodeType !== 3 || (u = o + l),
                        p !== i || r !== 0 && p.nodeType !== 3 || (s = o + r),
                        p.nodeType === 3 && (o += p.nodeValue.length),
                        (y = p.firstChild) !== null; )
                            m = p,
                            p = y;
                        for (; ; ) {
                            if (p === e)
                                break t;
                            if (m === n && ++a === l && (u = o),
                            m === i && ++h === r && (s = o),
                            (y = p.nextSibling) !== null)
                                break;
                            p = m,
                            m = p.parentNode
                        }
                        p = y
                    }
                    n = u === -1 || s === -1 ? null : {
                        start: u,
                        end: s
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (Bi = {
        focusedElem: e,
        selectionRange: n
    },
    el = !1,
    _ = t; _ !== null; )
        if (t = _,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            _ = e;
        else
            for (; _ !== null; ) {
                t = _;
                try {
                    var g = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (g !== null) {
                                var S = g.memoizedProps
                                  , C = g.memoizedState
                                  , d = t.stateNode
                                  , c = d.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Oe(t.type, S), C);
                                d.__reactInternalSnapshotBeforeUpdate = c
                            }
                            break;
                        case 3:
                            var f = t.stateNode.containerInfo;
                            f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(E(163))
                        }
                } catch (v) {
                    Q(t, t.return, v)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    _ = e;
                    break
                }
                _ = t.return
            }
    return g = ss,
    ss = !1,
    g
}
function Wn(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var i = l.destroy;
                l.destroy = void 0,
                i !== void 0 && ro(t, n, i)
            }
            l = l.next
        } while (l !== r)
    }
}
function Rl(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function lo(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function xc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    xc(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[Be],
    delete t[tr],
    delete t[Hi],
    delete t[Gd],
    delete t[Xd])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function Cc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function as(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || Cc(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function io(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = rl));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (io(e, t, n),
        e = e.sibling; e !== null; )
            io(e, t, n),
            e = e.sibling
}
function oo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (oo(e, t, n),
        e = e.sibling; e !== null; )
            oo(e, t, n),
            e = e.sibling
}
var te = null
  , Ie = !1;
function nt(e, t, n) {
    for (n = n.child; n !== null; )
        _c(e, t, n),
        n = n.sibling
}
function _c(e, t, n) {
    if (We && typeof We.onCommitFiberUnmount == "function")
        try {
            We.onCommitFiberUnmount(El, n)
        } catch {}
    switch (n.tag) {
    case 5:
        oe || rn(n, t);
    case 6:
        var r = te
          , l = Ie;
        te = null,
        nt(e, t, n),
        te = r,
        Ie = l,
        te !== null && (Ie ? (e = te,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : te.removeChild(n.stateNode));
        break;
    case 18:
        te !== null && (Ie ? (e = te,
        n = n.stateNode,
        e.nodeType === 8 ? si(e.parentNode, n) : e.nodeType === 1 && si(e, n),
        Jn(e)) : si(te, n.stateNode));
        break;
    case 4:
        r = te,
        l = Ie,
        te = n.stateNode.containerInfo,
        Ie = !0,
        nt(e, t, n),
        te = r,
        Ie = l;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!oe && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            l = r = r.next;
            do {
                var i = l
                  , o = i.destroy;
                i = i.tag,
                o !== void 0 && (i & 2 || i & 4) && ro(n, t, o),
                l = l.next
            } while (l !== r)
        }
        nt(e, t, n);
        break;
    case 1:
        if (!oe && (rn(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (u) {
                Q(n, t, u)
            }
        nt(e, t, n);
        break;
    case 21:
        nt(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (oe = (r = oe) || n.memoizedState !== null,
        nt(e, t, n),
        oe = r) : nt(e, t, n);
        break;
    default:
        nt(e, t, n)
    }
}
function cs(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new fp),
        t.forEach(function(r) {
            var l = kp.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(l, l))
        })
    }
}
function ze(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var i = e
                  , o = t
                  , u = o;
                e: for (; u !== null; ) {
                    switch (u.tag) {
                    case 5:
                        te = u.stateNode,
                        Ie = !1;
                        break e;
                    case 3:
                        te = u.stateNode.containerInfo,
                        Ie = !0;
                        break e;
                    case 4:
                        te = u.stateNode.containerInfo,
                        Ie = !0;
                        break e
                    }
                    u = u.return
                }
                if (te === null)
                    throw Error(E(160));
                _c(i, o, l),
                te = null,
                Ie = !1;
                var s = l.alternate;
                s !== null && (s.return = null),
                l.return = null
            } catch (a) {
                Q(l, t, a)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            Pc(t, e),
            t = t.sibling
}
function Pc(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (ze(t, e),
        $e(e),
        r & 4) {
            try {
                Wn(3, e, e.return),
                Rl(3, e)
            } catch (S) {
                Q(e, e.return, S)
            }
            try {
                Wn(5, e, e.return)
            } catch (S) {
                Q(e, e.return, S)
            }
        }
        break;
    case 1:
        ze(t, e),
        $e(e),
        r & 512 && n !== null && rn(n, n.return);
        break;
    case 5:
        if (ze(t, e),
        $e(e),
        r & 512 && n !== null && rn(n, n.return),
        e.flags & 32) {
            var l = e.stateNode;
            try {
                Kn(l, "")
            } catch (S) {
                Q(e, e.return, S)
            }
        }
        if (r & 4 && (l = e.stateNode,
        l != null)) {
            var i = e.memoizedProps
              , o = n !== null ? n.memoizedProps : i
              , u = e.type
              , s = e.updateQueue;
            if (e.updateQueue = null,
            s !== null)
                try {
                    u === "input" && i.type === "radio" && i.name != null && Gs(l, i),
                    Ri(u, o);
                    var a = Ri(u, i);
                    for (o = 0; o < s.length; o += 2) {
                        var h = s[o]
                          , p = s[o + 1];
                        h === "style" ? bs(l, p) : h === "dangerouslySetInnerHTML" ? Zs(l, p) : h === "children" ? Kn(l, p) : Eo(l, h, p, a)
                    }
                    switch (u) {
                    case "input":
                        _i(l, i);
                        break;
                    case "textarea":
                        Xs(l, i);
                        break;
                    case "select":
                        var m = l._wrapperState.wasMultiple;
                        l._wrapperState.wasMultiple = !!i.multiple;
                        var y = i.value;
                        y != null ? on(l, !!i.multiple, y, !1) : m !== !!i.multiple && (i.defaultValue != null ? on(l, !!i.multiple, i.defaultValue, !0) : on(l, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    l[tr] = i
                } catch (S) {
                    Q(e, e.return, S)
                }
        }
        break;
    case 6:
        if (ze(t, e),
        $e(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(E(162));
            l = e.stateNode,
            i = e.memoizedProps;
            try {
                l.nodeValue = i
            } catch (S) {
                Q(e, e.return, S)
            }
        }
        break;
    case 3:
        if (ze(t, e),
        $e(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Jn(t.containerInfo)
            } catch (S) {
                Q(e, e.return, S)
            }
        break;
    case 4:
        ze(t, e),
        $e(e);
        break;
    case 13:
        ze(t, e),
        $e(e),
        l = e.child,
        l.flags & 8192 && (i = l.memoizedState !== null,
        l.stateNode.isHidden = i,
        !i || l.alternate !== null && l.alternate.memoizedState !== null || (tu = G())),
        r & 4 && cs(e);
        break;
    case 22:
        if (h = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (oe = (a = oe) || h,
        ze(t, e),
        oe = a) : ze(t, e),
        $e(e),
        r & 8192) {
            if (a = e.memoizedState !== null,
            (e.stateNode.isHidden = a) && !h && e.mode & 1)
                for (_ = e,
                h = e.child; h !== null; ) {
                    for (p = _ = h; _ !== null; ) {
                        switch (m = _,
                        y = m.child,
                        m.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            Wn(4, m, m.return);
                            break;
                        case 1:
                            rn(m, m.return);
                            var g = m.stateNode;
                            if (typeof g.componentWillUnmount == "function") {
                                r = m,
                                n = m.return;
                                try {
                                    t = r,
                                    g.props = t.memoizedProps,
                                    g.state = t.memoizedState,
                                    g.componentWillUnmount()
                                } catch (S) {
                                    Q(r, n, S)
                                }
                            }
                            break;
                        case 5:
                            rn(m, m.return);
                            break;
                        case 22:
                            if (m.memoizedState !== null) {
                                ds(p);
                                continue
                            }
                        }
                        y !== null ? (y.return = m,
                        _ = y) : ds(p)
                    }
                    h = h.sibling
                }
            e: for (h = null,
            p = e; ; ) {
                if (p.tag === 5) {
                    if (h === null) {
                        h = p;
                        try {
                            l = p.stateNode,
                            a ? (i = l.style,
                            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = p.stateNode,
                            s = p.memoizedProps.style,
                            o = s != null && s.hasOwnProperty("display") ? s.display : null,
                            u.style.display = qs("display", o))
                        } catch (S) {
                            Q(e, e.return, S)
                        }
                    }
                } else if (p.tag === 6) {
                    if (h === null)
                        try {
                            p.stateNode.nodeValue = a ? "" : p.memoizedProps
                        } catch (S) {
                            Q(e, e.return, S)
                        }
                } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
                    p.child.return = p,
                    p = p.child;
                    continue
                }
                if (p === e)
                    break e;
                for (; p.sibling === null; ) {
                    if (p.return === null || p.return === e)
                        break e;
                    h === p && (h = null),
                    p = p.return
                }
                h === p && (h = null),
                p.sibling.return = p.return,
                p = p.sibling
            }
        }
        break;
    case 19:
        ze(t, e),
        $e(e),
        r & 4 && cs(e);
        break;
    case 21:
        break;
    default:
        ze(t, e),
        $e(e)
    }
}
function $e(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Cc(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(E(160))
            }
            switch (r.tag) {
            case 5:
                var l = r.stateNode;
                r.flags & 32 && (Kn(l, ""),
                r.flags &= -33);
                var i = as(e);
                oo(e, i, l);
                break;
            case 3:
            case 4:
                var o = r.stateNode.containerInfo
                  , u = as(e);
                io(e, u, o);
                break;
            default:
                throw Error(E(161))
            }
        } catch (s) {
            Q(e, e.return, s)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function pp(e, t, n) {
    _ = e,
    Nc(e)
}
function Nc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; _ !== null; ) {
        var l = _
          , i = l.child;
        if (l.tag === 22 && r) {
            var o = l.memoizedState !== null || Or;
            if (!o) {
                var u = l.alternate
                  , s = u !== null && u.memoizedState !== null || oe;
                u = Or;
                var a = oe;
                if (Or = o,
                (oe = s) && !a)
                    for (_ = l; _ !== null; )
                        o = _,
                        s = o.child,
                        o.tag === 22 && o.memoizedState !== null ? ps(l) : s !== null ? (s.return = o,
                        _ = s) : ps(l);
                for (; i !== null; )
                    _ = i,
                    Nc(i),
                    i = i.sibling;
                _ = l,
                Or = u,
                oe = a
            }
            fs(e)
        } else
            l.subtreeFlags & 8772 && i !== null ? (i.return = l,
            _ = i) : fs(e)
    }
}
function fs(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        oe || Rl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !oe)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var l = t.elementType === t.type ? n.memoizedProps : Oe(t.type, n.memoizedProps);
                                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var i = t.updateQueue;
                        i !== null && Xu(t, i, r);
                        break;
                    case 3:
                        var o = t.updateQueue;
                        if (o !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            Xu(t, o, n)
                        }
                        break;
                    case 5:
                        var u = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = u;
                            var s = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                s.autoFocus && n.focus();
                                break;
                            case "img":
                                s.src && (n.src = s.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var a = t.alternate;
                            if (a !== null) {
                                var h = a.memoizedState;
                                if (h !== null) {
                                    var p = h.dehydrated;
                                    p !== null && Jn(p)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(E(163))
                    }
                oe || t.flags & 512 && lo(t)
            } catch (m) {
                Q(t, t.return, m)
            }
        }
        if (t === e) {
            _ = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            _ = n;
            break
        }
        _ = t.return
    }
}
function ds(e) {
    for (; _ !== null; ) {
        var t = _;
        if (t === e) {
            _ = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            _ = n;
            break
        }
        _ = t.return
    }
}
function ps(e) {
    for (; _ !== null; ) {
        var t = _;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    Rl(4, t)
                } catch (s) {
                    Q(t, n, s)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var l = t.return;
                    try {
                        r.componentDidMount()
                    } catch (s) {
                        Q(t, l, s)
                    }
                }
                var i = t.return;
                try {
                    lo(t)
                } catch (s) {
                    Q(t, i, s)
                }
                break;
            case 5:
                var o = t.return;
                try {
                    lo(t)
                } catch (s) {
                    Q(t, o, s)
                }
            }
        } catch (s) {
            Q(t, t.return, s)
        }
        if (t === e) {
            _ = null;
            break
        }
        var u = t.sibling;
        if (u !== null) {
            u.return = t.return,
            _ = u;
            break
        }
        _ = t.return
    }
}
var hp = Math.ceil
  , hl = et.ReactCurrentDispatcher
  , bo = et.ReactCurrentOwner
  , Le = et.ReactCurrentBatchConfig
  , I = 0
  , ee = null
  , X = null
  , ne = 0
  , we = 0
  , ln = xt(0)
  , Z = 0
  , ur = null
  , $t = 0
  , jl = 0
  , eu = 0
  , Vn = null
  , pe = null
  , tu = 0
  , yn = 1 / 0
  , He = null
  , ml = !1
  , uo = null
  , vt = null
  , Ir = !1
  , at = null
  , vl = 0
  , Hn = 0
  , so = null
  , Qr = -1
  , Kr = 0;
function ae() {
    return I & 6 ? G() : Qr !== -1 ? Qr : Qr = G()
}
function gt(e) {
    return e.mode & 1 ? I & 2 && ne !== 0 ? ne & -ne : Zd.transition !== null ? (Kr === 0 && (Kr = fa()),
    Kr) : (e = M,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : ya(e.type)),
    e) : 1
}
function Ue(e, t, n, r) {
    if (50 < Hn)
        throw Hn = 0,
        so = null,
        Error(E(185));
    fr(e, n, r),
    (!(I & 2) || e !== ee) && (e === ee && (!(I & 2) && (jl |= n),
    Z === 4 && ut(e, ne)),
    ge(e, r),
    n === 1 && I === 0 && !(t.mode & 1) && (yn = G() + 500,
    Nl && Ct()))
}
function ge(e, t) {
    var n = e.callbackNode;
    Zf(e, t);
    var r = br(e, e === ee ? ne : 0);
    if (r === 0)
        n !== null && Eu(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && Eu(n),
        t === 1)
            e.tag === 0 ? Jd(hs.bind(null, e)) : Ua(hs.bind(null, e)),
            Kd(function() {
                !(I & 6) && Ct()
            }),
            n = null;
        else {
            switch (da(r)) {
            case 1:
                n = No;
                break;
            case 4:
                n = aa;
                break;
            case 16:
                n = qr;
                break;
            case 536870912:
                n = ca;
                break;
            default:
                n = qr
            }
            n = Mc(n, Tc.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function Tc(e, t) {
    if (Qr = -1,
    Kr = 0,
    I & 6)
        throw Error(E(327));
    var n = e.callbackNode;
    if (fn() && e.callbackNode !== n)
        return null;
    var r = br(e, e === ee ? ne : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = gl(e, r);
    else {
        t = r;
        var l = I;
        I |= 2;
        var i = Rc();
        (ee !== e || ne !== t) && (He = null,
        yn = G() + 500,
        It(e, t));
        do
            try {
                gp();
                break
            } catch (u) {
                Lc(e, u)
            }
        while (!0);
        Ao(),
        hl.current = i,
        I = l,
        X !== null ? t = 0 : (ee = null,
        ne = 0,
        t = Z)
    }
    if (t !== 0) {
        if (t === 2 && (l = Mi(e),
        l !== 0 && (r = l,
        t = ao(e, l))),
        t === 1)
            throw n = ur,
            It(e, 0),
            ut(e, r),
            ge(e, G()),
            n;
        if (t === 6)
            ut(e, r);
        else {
            if (l = e.current.alternate,
            !(r & 30) && !mp(l) && (t = gl(e, r),
            t === 2 && (i = Mi(e),
            i !== 0 && (r = i,
            t = ao(e, i))),
            t === 1))
                throw n = ur,
                It(e, 0),
                ut(e, r),
                ge(e, G()),
                n;
            switch (e.finishedWork = l,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(E(345));
            case 2:
                Lt(e, pe, He);
                break;
            case 3:
                if (ut(e, r),
                (r & 130023424) === r && (t = tu + 500 - G(),
                10 < t)) {
                    if (br(e, 0) !== 0)
                        break;
                    if (l = e.suspendedLanes,
                    (l & r) !== r) {
                        ae(),
                        e.pingedLanes |= e.suspendedLanes & l;
                        break
                    }
                    e.timeoutHandle = Vi(Lt.bind(null, e, pe, He), t);
                    break
                }
                Lt(e, pe, He);
                break;
            case 4:
                if (ut(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                l = -1; 0 < r; ) {
                    var o = 31 - De(r);
                    i = 1 << o,
                    o = t[o],
                    o > l && (l = o),
                    r &= ~i
                }
                if (r = l,
                r = G() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * hp(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = Vi(Lt.bind(null, e, pe, He), r);
                    break
                }
                Lt(e, pe, He);
                break;
            case 5:
                Lt(e, pe, He);
                break;
            default:
                throw Error(E(329))
            }
        }
    }
    return ge(e, G()),
    e.callbackNode === n ? Tc.bind(null, e) : null
}
function ao(e, t) {
    var n = Vn;
    return e.current.memoizedState.isDehydrated && (It(e, t).flags |= 256),
    e = gl(e, t),
    e !== 2 && (t = pe,
    pe = n,
    t !== null && co(t)),
    e
}
function co(e) {
    pe === null ? pe = e : pe.push.apply(pe, e)
}
function mp(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r]
                      , i = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!Fe(i(), l))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function ut(e, t) {
    for (t &= ~eu,
    t &= ~jl,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - De(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function hs(e) {
    if (I & 6)
        throw Error(E(327));
    fn();
    var t = br(e, 0);
    if (!(t & 1))
        return ge(e, G()),
        null;
    var n = gl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Mi(e);
        r !== 0 && (t = r,
        n = ao(e, r))
    }
    if (n === 1)
        throw n = ur,
        It(e, 0),
        ut(e, t),
        ge(e, G()),
        n;
    if (n === 6)
        throw Error(E(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    Lt(e, pe, He),
    ge(e, G()),
    null
}
function nu(e, t) {
    var n = I;
    I |= 1;
    try {
        return e(t)
    } finally {
        I = n,
        I === 0 && (yn = G() + 500,
        Nl && Ct())
    }
}
function At(e) {
    at !== null && at.tag === 0 && !(I & 6) && fn();
    var t = I;
    I |= 1;
    var n = Le.transition
      , r = M;
    try {
        if (Le.transition = null,
        M = 1,
        e)
            return e()
    } finally {
        M = r,
        Le.transition = n,
        I = t,
        !(I & 6) && Ct()
    }
}
function ru() {
    we = ln.current,
    $(ln)
}
function It(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    Qd(n)),
    X !== null)
        for (n = X.return; n !== null; ) {
            var r = n;
            switch (Uo(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && ll();
                break;
            case 3:
                vn(),
                $(me),
                $(ue),
                Ko();
                break;
            case 5:
                Qo(r);
                break;
            case 4:
                vn();
                break;
            case 13:
                $(B);
                break;
            case 19:
                $(B);
                break;
            case 10:
                Bo(r.type._context);
                break;
            case 22:
            case 23:
                ru()
            }
            n = n.return
        }
    if (ee = e,
    X = e = yt(e.current, null),
    ne = we = t,
    Z = 0,
    ur = null,
    eu = jl = $t = 0,
    pe = Vn = null,
    zt !== null) {
        for (t = 0; t < zt.length; t++)
            if (n = zt[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var l = r.next
                  , i = n.pending;
                if (i !== null) {
                    var o = i.next;
                    i.next = l,
                    r.next = o
                }
                n.pending = r
            }
        zt = null
    }
    return e
}
function Lc(e, t) {
    do {
        var n = X;
        try {
            if (Ao(),
            Wr.current = pl,
            dl) {
                for (var r = W.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null),
                    r = r.next
                }
                dl = !1
            }
            if (Ft = 0,
            b = J = W = null,
            Bn = !1,
            lr = 0,
            bo.current = null,
            n === null || n.return === null) {
                Z = 1,
                ur = t,
                X = null;
                break
            }
            e: {
                var i = e
                  , o = n.return
                  , u = n
                  , s = t;
                if (t = ne,
                u.flags |= 32768,
                s !== null && typeof s == "object" && typeof s.then == "function") {
                    var a = s
                      , h = u
                      , p = h.tag;
                    if (!(h.mode & 1) && (p === 0 || p === 11 || p === 15)) {
                        var m = h.alternate;
                        m ? (h.updateQueue = m.updateQueue,
                        h.memoizedState = m.memoizedState,
                        h.lanes = m.lanes) : (h.updateQueue = null,
                        h.memoizedState = null)
                    }
                    var y = ts(o);
                    if (y !== null) {
                        y.flags &= -257,
                        ns(y, o, u, i, t),
                        y.mode & 1 && es(i, a, t),
                        t = y,
                        s = a;
                        var g = t.updateQueue;
                        if (g === null) {
                            var S = new Set;
                            S.add(s),
                            t.updateQueue = S
                        } else
                            g.add(s);
                        break e
                    } else {
                        if (!(t & 1)) {
                            es(i, a, t),
                            lu();
                            break e
                        }
                        s = Error(E(426))
                    }
                } else if (A && u.mode & 1) {
                    var C = ts(o);
                    if (C !== null) {
                        !(C.flags & 65536) && (C.flags |= 256),
                        ns(C, o, u, i, t),
                        Fo(gn(s, u));
                        break e
                    }
                }
                i = s = gn(s, u),
                Z !== 4 && (Z = 2),
                Vn === null ? Vn = [i] : Vn.push(i),
                i = o;
                do {
                    switch (i.tag) {
                    case 3:
                        i.flags |= 65536,
                        t &= -t,
                        i.lanes |= t;
                        var d = dc(i, s, t);
                        Gu(i, d);
                        break e;
                    case 1:
                        u = s;
                        var c = i.type
                          , f = i.stateNode;
                        if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (vt === null || !vt.has(f)))) {
                            i.flags |= 65536,
                            t &= -t,
                            i.lanes |= t;
                            var v = pc(i, u, t);
                            Gu(i, v);
                            break e
                        }
                    }
                    i = i.return
                } while (i !== null)
            }
            zc(n)
        } catch (x) {
            t = x,
            X === n && n !== null && (X = n = n.return);
            continue
        }
        break
    } while (!0)
}
function Rc() {
    var e = hl.current;
    return hl.current = pl,
    e === null ? pl : e
}
function lu() {
    (Z === 0 || Z === 3 || Z === 2) && (Z = 4),
    ee === null || !($t & 268435455) && !(jl & 268435455) || ut(ee, ne)
}
function gl(e, t) {
    var n = I;
    I |= 2;
    var r = Rc();
    (ee !== e || ne !== t) && (He = null,
    It(e, t));
    do
        try {
            vp();
            break
        } catch (l) {
            Lc(e, l)
        }
    while (!0);
    if (Ao(),
    I = n,
    hl.current = r,
    X !== null)
        throw Error(E(261));
    return ee = null,
    ne = 0,
    Z
}
function vp() {
    for (; X !== null; )
        jc(X)
}
function gp() {
    for (; X !== null && !Wf(); )
        jc(X)
}
function jc(e) {
    var t = Ic(e.alternate, e, we);
    e.memoizedProps = e.pendingProps,
    t === null ? zc(e) : X = t,
    bo.current = null
}
function zc(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = cp(n, t),
            n !== null) {
                n.flags &= 32767,
                X = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                Z = 6,
                X = null;
                return
            }
        } else if (n = ap(n, t, we),
        n !== null) {
            X = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            X = t;
            return
        }
        X = t = e
    } while (t !== null);
    Z === 0 && (Z = 5)
}
function Lt(e, t, n) {
    var r = M
      , l = Le.transition;
    try {
        Le.transition = null,
        M = 1,
        yp(e, t, n, r)
    } finally {
        Le.transition = l,
        M = r
    }
    return null
}
function yp(e, t, n, r) {
    do
        fn();
    while (at !== null);
    if (I & 6)
        throw Error(E(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(E(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (qf(e, i),
    e === ee && (X = ee = null,
    ne = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ir || (Ir = !0,
    Mc(qr, function() {
        return fn(),
        null
    })),
    i = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || i) {
        i = Le.transition,
        Le.transition = null;
        var o = M;
        M = 1;
        var u = I;
        I |= 4,
        bo.current = null,
        dp(e, n),
        Pc(n, e),
        Fd(Bi),
        el = !!Ai,
        Bi = Ai = null,
        e.current = n,
        pp(n),
        Vf(),
        I = u,
        M = o,
        Le.transition = i
    } else
        e.current = n;
    if (Ir && (Ir = !1,
    at = e,
    vl = l),
    i = e.pendingLanes,
    i === 0 && (vt = null),
    Kf(n.stateNode),
    ge(e, G()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            l = t[n],
            r(l.value, {
                componentStack: l.stack,
                digest: l.digest
            });
    if (ml)
        throw ml = !1,
        e = uo,
        uo = null,
        e;
    return vl & 1 && e.tag !== 0 && fn(),
    i = e.pendingLanes,
    i & 1 ? e === so ? Hn++ : (Hn = 0,
    so = e) : Hn = 0,
    Ct(),
    null
}
function fn() {
    if (at !== null) {
        var e = da(vl)
          , t = Le.transition
          , n = M;
        try {
            if (Le.transition = null,
            M = 16 > e ? 16 : e,
            at === null)
                var r = !1;
            else {
                if (e = at,
                at = null,
                vl = 0,
                I & 6)
                    throw Error(E(331));
                var l = I;
                for (I |= 4,
                _ = e.current; _ !== null; ) {
                    var i = _
                      , o = i.child;
                    if (_.flags & 16) {
                        var u = i.deletions;
                        if (u !== null) {
                            for (var s = 0; s < u.length; s++) {
                                var a = u[s];
                                for (_ = a; _ !== null; ) {
                                    var h = _;
                                    switch (h.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Wn(8, h, i)
                                    }
                                    var p = h.child;
                                    if (p !== null)
                                        p.return = h,
                                        _ = p;
                                    else
                                        for (; _ !== null; ) {
                                            h = _;
                                            var m = h.sibling
                                              , y = h.return;
                                            if (xc(h),
                                            h === a) {
                                                _ = null;
                                                break
                                            }
                                            if (m !== null) {
                                                m.return = y,
                                                _ = m;
                                                break
                                            }
                                            _ = y
                                        }
                                }
                            }
                            var g = i.alternate;
                            if (g !== null) {
                                var S = g.child;
                                if (S !== null) {
                                    g.child = null;
                                    do {
                                        var C = S.sibling;
                                        S.sibling = null,
                                        S = C
                                    } while (S !== null)
                                }
                            }
                            _ = i
                        }
                    }
                    if (i.subtreeFlags & 2064 && o !== null)
                        o.return = i,
                        _ = o;
                    else
                        e: for (; _ !== null; ) {
                            if (i = _,
                            i.flags & 2048)
                                switch (i.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Wn(9, i, i.return)
                                }
                            var d = i.sibling;
                            if (d !== null) {
                                d.return = i.return,
                                _ = d;
                                break e
                            }
                            _ = i.return
                        }
                }
                var c = e.current;
                for (_ = c; _ !== null; ) {
                    o = _;
                    var f = o.child;
                    if (o.subtreeFlags & 2064 && f !== null)
                        f.return = o,
                        _ = f;
                    else
                        e: for (o = c; _ !== null; ) {
                            if (u = _,
                            u.flags & 2048)
                                try {
                                    switch (u.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Rl(9, u)
                                    }
                                } catch (x) {
                                    Q(u, u.return, x)
                                }
                            if (u === o) {
                                _ = null;
                                break e
                            }
                            var v = u.sibling;
                            if (v !== null) {
                                v.return = u.return,
                                _ = v;
                                break e
                            }
                            _ = u.return
                        }
                }
                if (I = l,
                Ct(),
                We && typeof We.onPostCommitFiberRoot == "function")
                    try {
                        We.onPostCommitFiberRoot(El, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            M = n,
            Le.transition = t
        }
    }
    return !1
}
function ms(e, t, n) {
    t = gn(n, t),
    t = dc(e, t, 1),
    e = mt(e, t, 1),
    t = ae(),
    e !== null && (fr(e, 1, t),
    ge(e, t))
}
function Q(e, t, n) {
    if (e.tag === 3)
        ms(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                ms(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vt === null || !vt.has(r))) {
                    e = gn(n, e),
                    e = pc(t, e, 1),
                    t = mt(t, e, 1),
                    e = ae(),
                    t !== null && (fr(t, 1, e),
                    ge(t, e));
                    break
                }
            }
            t = t.return
        }
}
function wp(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = ae(),
    e.pingedLanes |= e.suspendedLanes & n,
    ee === e && (ne & n) === n && (Z === 4 || Z === 3 && (ne & 130023424) === ne && 500 > G() - tu ? It(e, 0) : eu |= n),
    ge(e, t)
}
function Oc(e, t) {
    t === 0 && (e.mode & 1 ? (t = Cr,
    Cr <<= 1,
    !(Cr & 130023424) && (Cr = 4194304)) : t = 1);
    var n = ae();
    e = Ze(e, t),
    e !== null && (fr(e, t, n),
    ge(e, n))
}
function Sp(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    Oc(e, n)
}
function kp(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(E(314))
    }
    r !== null && r.delete(t),
    Oc(e, n)
}
var Ic;
Ic = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || me.current)
            he = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return he = !1,
                sp(e, t, n);
            he = !!(e.flags & 131072)
        }
    else
        he = !1,
        A && t.flags & 1048576 && Fa(t, ul, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Hr(e, t),
        e = t.pendingProps;
        var l = pn(t, ue.current);
        cn(t, n),
        l = Go(null, t, r, e, l, n);
        var i = Xo();
        return t.flags |= 1,
        typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        ve(r) ? (i = !0,
        il(t)) : i = !1,
        t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null,
        Vo(t),
        l.updater = Ll,
        t.stateNode = l,
        l._reactInternals = t,
        Ji(t, r, e, n),
        t = bi(null, t, r, !0, i, n)) : (t.tag = 0,
        A && i && Do(t),
        se(null, t, l, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Hr(e, t),
            e = t.pendingProps,
            l = r._init,
            r = l(r._payload),
            t.type = r,
            l = t.tag = xp(r),
            e = Oe(r, e),
            l) {
            case 0:
                t = qi(null, t, r, e, n);
                break e;
            case 1:
                t = is(null, t, r, e, n);
                break e;
            case 11:
                t = rs(null, t, r, e, n);
                break e;
            case 14:
                t = ls(null, t, r, Oe(r.type, e), n);
                break e
            }
            throw Error(E(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Oe(r, l),
        qi(e, t, r, l, n);
    case 1:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Oe(r, l),
        is(e, t, r, l, n);
    case 3:
        e: {
            if (gc(t),
            e === null)
                throw Error(E(387));
            r = t.pendingProps,
            i = t.memoizedState,
            l = i.element,
            Ha(e, t),
            cl(t, r, null, n);
            var o = t.memoizedState;
            if (r = o.element,
            i.isDehydrated)
                if (i = {
                    element: r,
                    isDehydrated: !1,
                    cache: o.cache,
                    pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                    transitions: o.transitions
                },
                t.updateQueue.baseState = i,
                t.memoizedState = i,
                t.flags & 256) {
                    l = gn(Error(E(423)), t),
                    t = os(e, t, r, n, l);
                    break e
                } else if (r !== l) {
                    l = gn(Error(E(424)), t),
                    t = os(e, t, r, n, l);
                    break e
                } else
                    for (Se = ht(t.stateNode.containerInfo.firstChild),
                    ke = t,
                    A = !0,
                    Me = null,
                    n = Wa(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (hn(),
                r === l) {
                    t = qe(e, t, n);
                    break e
                }
                se(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return Qa(t),
        e === null && Yi(t),
        r = t.type,
        l = t.pendingProps,
        i = e !== null ? e.memoizedProps : null,
        o = l.children,
        Wi(r, l) ? o = null : i !== null && Wi(r, i) && (t.flags |= 32),
        vc(e, t),
        se(e, t, o, n),
        t.child;
    case 6:
        return e === null && Yi(t),
        null;
    case 13:
        return yc(e, t, n);
    case 4:
        return Ho(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = mn(t, null, r, n) : se(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Oe(r, l),
        rs(e, t, r, l, n);
    case 7:
        return se(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return se(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return se(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            l = t.pendingProps,
            i = t.memoizedProps,
            o = l.value,
            D(sl, r._currentValue),
            r._currentValue = o,
            i !== null)
                if (Fe(i.value, o)) {
                    if (i.children === l.children && !me.current) {
                        t = qe(e, t, n);
                        break e
                    }
                } else
                    for (i = t.child,
                    i !== null && (i.return = t); i !== null; ) {
                        var u = i.dependencies;
                        if (u !== null) {
                            o = i.child;
                            for (var s = u.firstContext; s !== null; ) {
                                if (s.context === r) {
                                    if (i.tag === 1) {
                                        s = Ge(-1, n & -n),
                                        s.tag = 2;
                                        var a = i.updateQueue;
                                        if (a !== null) {
                                            a = a.shared;
                                            var h = a.pending;
                                            h === null ? s.next = s : (s.next = h.next,
                                            h.next = s),
                                            a.pending = s
                                        }
                                    }
                                    i.lanes |= n,
                                    s = i.alternate,
                                    s !== null && (s.lanes |= n),
                                    Gi(i.return, n, t),
                                    u.lanes |= n;
                                    break
                                }
                                s = s.next
                            }
                        } else if (i.tag === 10)
                            o = i.type === t.type ? null : i.child;
                        else if (i.tag === 18) {
                            if (o = i.return,
                            o === null)
                                throw Error(E(341));
                            o.lanes |= n,
                            u = o.alternate,
                            u !== null && (u.lanes |= n),
                            Gi(o, n, t),
                            o = i.sibling
                        } else
                            o = i.child;
                        if (o !== null)
                            o.return = i;
                        else
                            for (o = i; o !== null; ) {
                                if (o === t) {
                                    o = null;
                                    break
                                }
                                if (i = o.sibling,
                                i !== null) {
                                    i.return = o.return,
                                    o = i;
                                    break
                                }
                                o = o.return
                            }
                        i = o
                    }
            se(e, t, l.children, n),
            t = t.child
        }
        return t;
    case 9:
        return l = t.type,
        r = t.pendingProps.children,
        cn(t, n),
        l = Re(l),
        r = r(l),
        t.flags |= 1,
        se(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        l = Oe(r, t.pendingProps),
        l = Oe(r.type, l),
        ls(e, t, r, l, n);
    case 15:
        return hc(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : Oe(r, l),
        Hr(e, t),
        t.tag = 1,
        ve(r) ? (e = !0,
        il(t)) : e = !1,
        cn(t, n),
        fc(t, r, l),
        Ji(t, r, l, n),
        bi(null, t, r, !0, e, n);
    case 19:
        return wc(e, t, n);
    case 22:
        return mc(e, t, n)
    }
    throw Error(E(156, t.tag))
}
;
function Mc(e, t) {
    return sa(e, t)
}
function Ep(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function Te(e, t, n, r) {
    return new Ep(e,t,n,r)
}
function iu(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function xp(e) {
    if (typeof e == "function")
        return iu(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === Co)
            return 11;
        if (e === _o)
            return 14
    }
    return 2
}
function yt(e, t) {
    var n = e.alternate;
    return n === null ? (n = Te(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function Yr(e, t, n, r, l, i) {
    var o = 2;
    if (r = e,
    typeof e == "function")
        iu(e) && (o = 1);
    else if (typeof e == "string")
        o = 5;
    else
        e: switch (e) {
        case Gt:
            return Mt(n.children, l, i, t);
        case xo:
            o = 8,
            l |= 8;
            break;
        case Si:
            return e = Te(12, n, t, l | 2),
            e.elementType = Si,
            e.lanes = i,
            e;
        case ki:
            return e = Te(13, n, t, l),
            e.elementType = ki,
            e.lanes = i,
            e;
        case Ei:
            return e = Te(19, n, t, l),
            e.elementType = Ei,
            e.lanes = i,
            e;
        case Qs:
            return zl(n, l, i, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case Vs:
                    o = 10;
                    break e;
                case Hs:
                    o = 9;
                    break e;
                case Co:
                    o = 11;
                    break e;
                case _o:
                    o = 14;
                    break e;
                case lt:
                    o = 16,
                    r = null;
                    break e
                }
            throw Error(E(130, e == null ? e : typeof e, ""))
        }
    return t = Te(o, n, t, l),
    t.elementType = e,
    t.type = r,
    t.lanes = i,
    t
}
function Mt(e, t, n, r) {
    return e = Te(7, e, r, t),
    e.lanes = n,
    e
}
function zl(e, t, n, r) {
    return e = Te(22, e, r, t),
    e.elementType = Qs,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function vi(e, t, n) {
    return e = Te(6, e, null, t),
    e.lanes = n,
    e
}
function gi(e, t, n) {
    return t = Te(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Cp(e, t, n, r, l) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = Zl(0),
    this.expirationTimes = Zl(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = Zl(0),
    this.identifierPrefix = r,
    this.onRecoverableError = l,
    this.mutableSourceEagerHydrationData = null
}
function ou(e, t, n, r, l, i, o, u, s) {
    return e = new Cp(e,t,n,u,s),
    t === 1 ? (t = 1,
    i === !0 && (t |= 8)) : t = 0,
    i = Te(3, null, null, t),
    e.current = i,
    i.stateNode = e,
    i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    Vo(i),
    e
}
function _p(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Yt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function Dc(e) {
    if (!e)
        return kt;
    e = e._reactInternals;
    e: {
        if (Wt(e) !== e || e.tag !== 1)
            throw Error(E(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (ve(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(E(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (ve(n))
            return Da(e, n, t)
    }
    return t
}
function Uc(e, t, n, r, l, i, o, u, s) {
    return e = ou(n, r, !0, e, l, i, o, u, s),
    e.context = Dc(null),
    n = e.current,
    r = ae(),
    l = gt(n),
    i = Ge(r, l),
    i.callback = t ?? null,
    mt(n, i, l),
    e.current.lanes = l,
    fr(e, l, r),
    ge(e, r),
    e
}
function Ol(e, t, n, r) {
    var l = t.current
      , i = ae()
      , o = gt(l);
    return n = Dc(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = Ge(i, o),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = mt(l, t, o),
    e !== null && (Ue(e, l, o, i),
    Br(e, l, o)),
    o
}
function yl(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function vs(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function uu(e, t) {
    vs(e, t),
    (e = e.alternate) && vs(e, t)
}
function Pp() {
    return null
}
var Fc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function su(e) {
    this._internalRoot = e
}
Il.prototype.render = su.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(E(409));
    Ol(e, t, null, null)
}
;
Il.prototype.unmount = su.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        At(function() {
            Ol(null, e, null, null)
        }),
        t[Je] = null
    }
}
;
function Il(e) {
    this._internalRoot = e
}
Il.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = ma();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++)
            ;
        ot.splice(n, 0, e),
        n === 0 && ga(e)
    }
}
;
function au(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Ml(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function gs() {}
function Np(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var a = yl(o);
                i.call(a)
            }
        }
        var o = Uc(t, r, e, 0, null, !1, !1, "", gs);
        return e._reactRootContainer = o,
        e[Je] = o.current,
        bn(e.nodeType === 8 ? e.parentNode : e),
        At(),
        o
    }
    for (; l = e.lastChild; )
        e.removeChild(l);
    if (typeof r == "function") {
        var u = r;
        r = function() {
            var a = yl(s);
            u.call(a)
        }
    }
    var s = ou(e, 0, !1, null, null, !1, !1, "", gs);
    return e._reactRootContainer = s,
    e[Je] = s.current,
    bn(e.nodeType === 8 ? e.parentNode : e),
    At(function() {
        Ol(t, s, n, r)
    }),
    s
}
function Dl(e, t, n, r, l) {
    var i = n._reactRootContainer;
    if (i) {
        var o = i;
        if (typeof l == "function") {
            var u = l;
            l = function() {
                var s = yl(o);
                u.call(s)
            }
        }
        Ol(t, o, e, l)
    } else
        o = Np(n, t, e, l, r);
    return yl(o)
}
pa = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = On(t.pendingLanes);
            n !== 0 && (To(t, n | 1),
            ge(t, G()),
            !(I & 6) && (yn = G() + 500,
            Ct()))
        }
        break;
    case 13:
        At(function() {
            var r = Ze(e, 1);
            if (r !== null) {
                var l = ae();
                Ue(r, e, 1, l)
            }
        }),
        uu(e, 1)
    }
}
;
Lo = function(e) {
    if (e.tag === 13) {
        var t = Ze(e, 134217728);
        if (t !== null) {
            var n = ae();
            Ue(t, e, 134217728, n)
        }
        uu(e, 134217728)
    }
}
;
ha = function(e) {
    if (e.tag === 13) {
        var t = gt(e)
          , n = Ze(e, t);
        if (n !== null) {
            var r = ae();
            Ue(n, e, t, r)
        }
        uu(e, t)
    }
}
;
ma = function() {
    return M
}
;
va = function(e, t) {
    var n = M;
    try {
        return M = e,
        t()
    } finally {
        M = n
    }
}
;
zi = function(e, t, n) {
    switch (t) {
    case "input":
        if (_i(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var l = Pl(r);
                    if (!l)
                        throw Error(E(90));
                    Ys(r),
                    _i(r, l)
                }
            }
        }
        break;
    case "textarea":
        Xs(e, n);
        break;
    case "select":
        t = n.value,
        t != null && on(e, !!n.multiple, t, !1)
    }
}
;
na = nu;
ra = At;
var Tp = {
    usingClientEntryPoint: !1,
    Events: [pr, qt, Pl, ea, ta, nu]
}
  , Rn = {
    findFiberByHostInstance: jt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , Lp = {
    bundleType: Rn.bundleType,
    version: Rn.version,
    rendererPackageName: Rn.rendererPackageName,
    rendererConfig: Rn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: et.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = oa(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: Rn.findFiberByHostInstance || Pp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Mr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Mr.isDisabled && Mr.supportsFiber)
        try {
            El = Mr.inject(Lp),
            We = Mr
        } catch {}
}
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Tp;
xe.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!au(t))
        throw Error(E(200));
    return _p(e, t, null, n)
}
;
xe.createRoot = function(e, t) {
    if (!au(e))
        throw Error(E(299));
    var n = !1
      , r = ""
      , l = Fc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    t = ou(e, 1, !1, null, null, n, !1, r, l),
    e[Je] = t.current,
    bn(e.nodeType === 8 ? e.parentNode : e),
    new su(t)
}
;
xe.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(E(188)) : (e = Object.keys(e).join(","),
        Error(E(268, e)));
    return e = oa(t),
    e = e === null ? null : e.stateNode,
    e
}
;
xe.flushSync = function(e) {
    return At(e)
}
;
xe.hydrate = function(e, t, n) {
    if (!Ml(t))
        throw Error(E(200));
    return Dl(null, e, t, !0, n)
}
;
xe.hydrateRoot = function(e, t, n) {
    if (!au(e))
        throw Error(E(405));
    var r = n != null && n.hydratedSources || null
      , l = !1
      , i = ""
      , o = Fc;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0),
    n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    t = Uc(t, null, e, 1, n ?? null, l, !1, i, o),
    e[Je] = t.current,
    bn(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            l = n._getVersion,
            l = l(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
    return new Il(t)
}
;
xe.render = function(e, t, n) {
    if (!Ml(t))
        throw Error(E(200));
    return Dl(null, e, t, !1, n)
}
;
xe.unmountComponentAtNode = function(e) {
    if (!Ml(e))
        throw Error(E(40));
    return e._reactRootContainer ? (At(function() {
        Dl(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[Je] = null
        })
    }),
    !0) : !1
}
;
xe.unstable_batchedUpdates = nu;
xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Ml(n))
        throw Error(E(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(E(38));
    return Dl(e, t, n, !1, r)
}
;
xe.version = "18.3.1-next-f1338f8080-20240426";
function $c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($c)
        } catch (e) {
            console.error(e)
        }
}
$c(),
$s.exports = xe;
var Rp = $s.exports, Ac, ys = Rp;
Ac = ys.createRoot,
ys.hydrateRoot;
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function sr() {
    return sr = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    sr.apply(this, arguments)
}
var ct;
(function(e) {
    e.Pop = "POP",
    e.Push = "PUSH",
    e.Replace = "REPLACE"
}
)(ct || (ct = {}));
const ws = "popstate";
function jp(e) {
    e === void 0 && (e = {});
    function t(l, i) {
        let {pathname: o="/", search: u="", hash: s=""} = Vt(l.location.hash.substr(1));
        return !o.startsWith("/") && !o.startsWith(".") && (o = "/" + o),
        fo("", {
            pathname: o,
            search: u,
            hash: s
        }, i.state && i.state.usr || null, i.state && i.state.key || "default")
    }
    function n(l, i) {
        let o = l.document.querySelector("base")
          , u = "";
        if (o && o.getAttribute("href")) {
            let s = l.location.href
              , a = s.indexOf("#");
            u = a === -1 ? s : s.slice(0, a)
        }
        return u + "#" + (typeof i == "string" ? i : wl(i))
    }
    function r(l, i) {
        Ul(l.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(i) + ")")
    }
    return Op(t, n, r, e)
}
function K(e, t) {
    if (e === !1 || e === null || typeof e > "u")
        throw new Error(t)
}
function Ul(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}
function zp() {
    return Math.random().toString(36).substr(2, 8)
}
function Ss(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}
function fo(e, t, n, r) {
    return n === void 0 && (n = null),
    sr({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? Vt(t) : t, {
        state: n,
        key: t && t.key || r || zp()
    })
}
function wl(e) {
    let {pathname: t="/", search: n="", hash: r=""} = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
}
function Vt(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n),
        e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r),
        e = e.substr(0, r)),
        e && (t.pathname = e)
    }
    return t
}
function Op(e, t, n, r) {
    r === void 0 && (r = {});
    let {window: l=document.defaultView, v5Compat: i=!1} = r
      , o = l.history
      , u = ct.Pop
      , s = null
      , a = h();
    a == null && (a = 0,
    o.replaceState(sr({}, o.state, {
        idx: a
    }), ""));
    function h() {
        return (o.state || {
            idx: null
        }).idx
    }
    function p() {
        u = ct.Pop;
        let C = h()
          , d = C == null ? null : C - a;
        a = C,
        s && s({
            action: u,
            location: S.location,
            delta: d
        })
    }
    function m(C, d) {
        u = ct.Push;
        let c = fo(S.location, C, d);
        n && n(c, C),
        a = h() + 1;
        let f = Ss(c, a)
          , v = S.createHref(c);
        try {
            o.pushState(f, "", v)
        } catch (x) {
            if (x instanceof DOMException && x.name === "DataCloneError")
                throw x;
            l.location.assign(v)
        }
        i && s && s({
            action: u,
            location: S.location,
            delta: 1
        })
    }
    function y(C, d) {
        u = ct.Replace;
        let c = fo(S.location, C, d);
        n && n(c, C),
        a = h();
        let f = Ss(c, a)
          , v = S.createHref(c);
        o.replaceState(f, "", v),
        i && s && s({
            action: u,
            location: S.location,
            delta: 0
        })
    }
    function g(C) {
        let d = l.location.origin !== "null" ? l.location.origin : l.location.href
          , c = typeof C == "string" ? C : wl(C);
        return c = c.replace(/ $/, "%20"),
        K(d, "No window.location.(origin|href) available to create URL for href: " + c),
        new URL(c,d)
    }
    let S = {
        get action() {
            return u
        },
        get location() {
            return e(l, o)
        },
        listen(C) {
            if (s)
                throw new Error("A history only accepts one active listener");
            return l.addEventListener(ws, p),
            s = C,
            () => {
                l.removeEventListener(ws, p),
                s = null
            }
        },
        createHref(C) {
            return t(l, C)
        },
        createURL: g,
        encodeLocation(C) {
            let d = g(C);
            return {
                pathname: d.pathname,
                search: d.search,
                hash: d.hash
            }
        },
        push: m,
        replace: y,
        go(C) {
            return o.go(C)
        }
    };
    return S
}
var ks;
(function(e) {
    e.data = "data",
    e.deferred = "deferred",
    e.redirect = "redirect",
    e.error = "error"
}
)(ks || (ks = {}));
function Ip(e, t, n) {
    return n === void 0 && (n = "/"),
    Mp(e, t, n)
}
function Mp(e, t, n, r) {
    let l = typeof t == "string" ? Vt(t) : t
      , i = wn(l.pathname || "/", n);
    if (i == null)
        return null;
    let o = Bc(e);
    Dp(o);
    let u = null;
    for (let s = 0; u == null && s < o.length; ++s) {
        let a = Yp(i);
        u = Qp(o[s], a)
    }
    return u
}
function Bc(e, t, n, r) {
    t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = "");
    let l = (i, o, u) => {
        let s = {
            relativePath: u === void 0 ? i.path || "" : u,
            caseSensitive: i.caseSensitive === !0,
            childrenIndex: o,
            route: i
        };
        s.relativePath.startsWith("/") && (K(s.relativePath.startsWith(r), 'Absolute route path "' + s.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."),
        s.relativePath = s.relativePath.slice(r.length));
        let a = wt([r, s.relativePath])
          , h = n.concat(s);
        i.children && i.children.length > 0 && (K(i.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + a + '".')),
        Bc(i.children, t, h, a)),
        !(i.path == null && !i.index) && t.push({
            path: a,
            score: Vp(a, i.index),
            routesMeta: h
        })
    }
    ;
    return e.forEach( (i, o) => {
        var u;
        if (i.path === "" || !((u = i.path) != null && u.includes("?")))
            l(i, o);
        else
            for (let s of Wc(i.path))
                l(i, o, s)
    }
    ),
    t
}
function Wc(e) {
    let t = e.split("/");
    if (t.length === 0)
        return [];
    let[n,...r] = t
      , l = n.endsWith("?")
      , i = n.replace(/\?$/, "");
    if (r.length === 0)
        return l ? [i, ""] : [i];
    let o = Wc(r.join("/"))
      , u = [];
    return u.push(...o.map(s => s === "" ? i : [i, s].join("/"))),
    l && u.push(...o),
    u.map(s => e.startsWith("/") && s === "" ? "/" : s)
}
function Dp(e) {
    e.sort( (t, n) => t.score !== n.score ? n.score - t.score : Hp(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const Up = /^:[\w-]+$/
  , Fp = 3
  , $p = 2
  , Ap = 1
  , Bp = 10
  , Wp = -2
  , Es = e => e === "*";
function Vp(e, t) {
    let n = e.split("/")
      , r = n.length;
    return n.some(Es) && (r += Wp),
    t && (r += $p),
    n.filter(l => !Es(l)).reduce( (l, i) => l + (Up.test(i) ? Fp : i === "" ? Ap : Bp), r)
}
function Hp(e, t) {
    return e.length === t.length && e.slice(0, -1).every( (r, l) => r === t[l]) ? e[e.length - 1] - t[t.length - 1] : 0
}
function Qp(e, t, n) {
    let {routesMeta: r} = e
      , l = {}
      , i = "/"
      , o = [];
    for (let u = 0; u < r.length; ++u) {
        let s = r[u]
          , a = u === r.length - 1
          , h = i === "/" ? t : t.slice(i.length) || "/"
          , p = po({
            path: s.relativePath,
            caseSensitive: s.caseSensitive,
            end: a
        }, h)
          , m = s.route;
        if (!p)
            return null;
        Object.assign(l, p.params),
        o.push({
            params: l,
            pathname: wt([i, p.pathname]),
            pathnameBase: qp(wt([i, p.pathnameBase])),
            route: m
        }),
        p.pathnameBase !== "/" && (i = wt([i, p.pathnameBase]))
    }
    return o
}
function po(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let[n,r] = Kp(e.path, e.caseSensitive, e.end)
      , l = t.match(n);
    if (!l)
        return null;
    let i = l[0]
      , o = i.replace(/(.)\/+$/, "$1")
      , u = l.slice(1);
    return {
        params: r.reduce( (a, h, p) => {
            let {paramName: m, isOptional: y} = h;
            if (m === "*") {
                let S = u[p] || "";
                o = i.slice(0, i.length - S.length).replace(/(.)\/+$/, "$1")
            }
            const g = u[p];
            return y && !g ? a[m] = void 0 : a[m] = (g || "").replace(/%2F/g, "/"),
            a
        }
        , {}),
        pathname: i,
        pathnameBase: o,
        pattern: e
    }
}
function Kp(e, t, n) {
    t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Ul(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = []
      , l = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (o, u, s) => (r.push({
        paramName: u,
        isOptional: s != null
    }),
    s ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }),
    l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? l += "\\/*$" : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l,t ? void 0 : "i"), r]
}
function Yp(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return Ul(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")),
        e
    }
}
function wn(e, t) {
    if (t === "/")
        return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase()))
        return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length
      , r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
const Gp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , Xp = e => Gp.test(e);
function Jp(e, t) {
    t === void 0 && (t = "/");
    let {pathname: n, search: r="", hash: l=""} = typeof e == "string" ? Vt(e) : e, i;
    if (n)
        if (Xp(n))
            i = n;
        else {
            if (n.includes("//")) {
                let o = n;
                n = n.replace(/\/\/+/g, "/"),
                Ul(!1, "Pathnames cannot have embedded double slashes - normalizing " + (o + " -> " + n))
            }
            n.startsWith("/") ? i = xs(n.substring(1), "/") : i = xs(n, t)
        }
    else
        i = t;
    return {
        pathname: i,
        search: bp(r),
        hash: eh(l)
    }
}
function xs(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(l => {
        l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l)
    }
    ),
    n.length > 1 ? n.join("/") : "/"
}
function yi(e, t, n, r) {
    return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.'
}
function Zp(e) {
    return e.filter( (t, n) => n === 0 || t.route.path && t.route.path.length > 0)
}
function Vc(e, t) {
    let n = Zp(e);
    return t ? n.map( (r, l) => l === n.length - 1 ? r.pathname : r.pathnameBase) : n.map(r => r.pathnameBase)
}
function Hc(e, t, n, r) {
    r === void 0 && (r = !1);
    let l;
    typeof e == "string" ? l = Vt(e) : (l = sr({}, e),
    K(!l.pathname || !l.pathname.includes("?"), yi("?", "pathname", "search", l)),
    K(!l.pathname || !l.pathname.includes("#"), yi("#", "pathname", "hash", l)),
    K(!l.search || !l.search.includes("#"), yi("#", "search", "hash", l)));
    let i = e === "" || l.pathname === "", o = i ? "/" : l.pathname, u;
    if (o == null)
        u = n;
    else {
        let p = t.length - 1;
        if (!r && o.startsWith("..")) {
            let m = o.split("/");
            for (; m[0] === ".."; )
                m.shift(),
                p -= 1;
            l.pathname = m.join("/")
        }
        u = p >= 0 ? t[p] : "/"
    }
    let s = Jp(l, u)
      , a = o && o !== "/" && o.endsWith("/")
      , h = (i || o === ".") && n.endsWith("/");
    return !s.pathname.endsWith("/") && (a || h) && (s.pathname += "/"),
    s
}
const wt = e => e.join("/").replace(/\/\/+/g, "/")
  , qp = e => e.replace(/\/+$/, "").replace(/^\/*/, "/")
  , bp = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e
  , eh = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function th(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data"in e
}
const Qc = ["post", "put", "patch", "delete"];
new Set(Qc);
const nh = ["get", ...Qc];
new Set(nh);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ar() {
    return ar = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    ar.apply(this, arguments)
}
const Fl = w.createContext(null)
  , Kc = w.createContext(null)
  , _t = w.createContext(null)
  , $l = w.createContext(null)
  , Ht = w.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
})
  , Yc = w.createContext(null);
function rh(e, t) {
    let {relative: n} = t === void 0 ? {} : t;
    mr() || K(!1);
    let {basename: r, navigator: l} = w.useContext(_t)
      , {hash: i, pathname: o, search: u} = Al(e, {
        relative: n
    })
      , s = o;
    return r !== "/" && (s = o === "/" ? r : wt([r, o])),
    l.createHref({
        pathname: s,
        search: u,
        hash: i
    })
}
function mr() {
    return w.useContext($l) != null
}
function vr() {
    return mr() || K(!1),
    w.useContext($l).location
}
function Gc(e) {
    w.useContext(_t).static || w.useLayoutEffect(e)
}
function Xc() {
    let {isDataRoute: e} = w.useContext(Ht);
    return e ? vh() : lh()
}
function lh() {
    mr() || K(!1);
    let e = w.useContext(Fl)
      , {basename: t, future: n, navigator: r} = w.useContext(_t)
      , {matches: l} = w.useContext(Ht)
      , {pathname: i} = vr()
      , o = JSON.stringify(Vc(l, n.v7_relativeSplatPath))
      , u = w.useRef(!1);
    return Gc( () => {
        u.current = !0
    }
    ),
    w.useCallback(function(a, h) {
        if (h === void 0 && (h = {}),
        !u.current)
            return;
        if (typeof a == "number") {
            r.go(a);
            return
        }
        let p = Hc(a, JSON.parse(o), i, h.relative === "path");
        e == null && t !== "/" && (p.pathname = p.pathname === "/" ? t : wt([t, p.pathname])),
        (h.replace ? r.replace : r.push)(p, h.state, h)
    }, [t, r, o, i, e])
}
function Al(e, t) {
    let {relative: n} = t === void 0 ? {} : t
      , {future: r} = w.useContext(_t)
      , {matches: l} = w.useContext(Ht)
      , {pathname: i} = vr()
      , o = JSON.stringify(Vc(l, r.v7_relativeSplatPath));
    return w.useMemo( () => Hc(e, JSON.parse(o), i, n === "path"), [e, o, i, n])
}
function ih(e, t) {
    return oh(e, t)
}
function oh(e, t, n, r) {
    mr() || K(!1);
    let {navigator: l} = w.useContext(_t)
      , {matches: i} = w.useContext(Ht)
      , o = i[i.length - 1]
      , u = o ? o.params : {};
    o && o.pathname;
    let s = o ? o.pathnameBase : "/";
    o && o.route;
    let a = vr(), h;
    if (t) {
        var p;
        let C = typeof t == "string" ? Vt(t) : t;
        s === "/" || (p = C.pathname) != null && p.startsWith(s) || K(!1),
        h = C
    } else
        h = a;
    let m = h.pathname || "/"
      , y = m;
    if (s !== "/") {
        let C = s.replace(/^\//, "").split("/");
        y = "/" + m.replace(/^\//, "").split("/").slice(C.length).join("/")
    }
    let g = Ip(e, {
        pathname: y
    })
      , S = fh(g && g.map(C => Object.assign({}, C, {
        params: Object.assign({}, u, C.params),
        pathname: wt([s, l.encodeLocation ? l.encodeLocation(C.pathname).pathname : C.pathname]),
        pathnameBase: C.pathnameBase === "/" ? s : wt([s, l.encodeLocation ? l.encodeLocation(C.pathnameBase).pathname : C.pathnameBase])
    })), i, n, r);
    return t && S ? w.createElement($l.Provider, {
        value: {
            location: ar({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, h),
            navigationType: ct.Pop
        }
    }, S) : S
}
function uh() {
    let e = mh()
      , t = th(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e)
      , n = e instanceof Error ? e.stack : null
      , l = {
        padding: "0.5rem",
        backgroundColor: "rgba(200,200,200, 0.5)"
    };
    return w.createElement(w.Fragment, null, w.createElement("h2", null, "Unexpected Application Error!"), w.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? w.createElement("pre", {
        style: l
    }, n) : null, null)
}
const sh = w.createElement(uh, null);
class ah extends w.Component {
    constructor(t) {
        super(t),
        this.state = {
            location: t.location,
            revalidation: t.revalidation,
            error: t.error
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n) {
        console.error("React Router caught the following error during render", t, n)
    }
    render() {
        return this.state.error !== void 0 ? w.createElement(Ht.Provider, {
            value: this.props.routeContext
        }, w.createElement(Yc.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}
function ch(e) {
    let {routeContext: t, match: n, children: r} = e
      , l = w.useContext(Fl);
    return l && l.static && l.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    w.createElement(Ht.Provider, {
        value: t
    }, r)
}
function fh(e, t, n, r) {
    var l;
    if (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null) {
        var i;
        if (!n)
            return null;
        if (n.errors)
            e = n.matches;
        else if ((i = r) != null && i.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
            e = n.matches;
        else
            return null
    }
    let o = e
      , u = (l = n) == null ? void 0 : l.errors;
    if (u != null) {
        let h = o.findIndex(p => p.route.id && (u == null ? void 0 : u[p.route.id]) !== void 0);
        h >= 0 || K(!1),
        o = o.slice(0, Math.min(o.length, h + 1))
    }
    let s = !1
      , a = -1;
    if (n && r && r.v7_partialHydration)
        for (let h = 0; h < o.length; h++) {
            let p = o[h];
            if ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (a = h),
            p.route.id) {
                let {loaderData: m, errors: y} = n
                  , g = p.route.loader && m[p.route.id] === void 0 && (!y || y[p.route.id] === void 0);
                if (p.route.lazy || g) {
                    s = !0,
                    a >= 0 ? o = o.slice(0, a + 1) : o = [o[0]];
                    break
                }
            }
        }
    return o.reduceRight( (h, p, m) => {
        let y, g = !1, S = null, C = null;
        n && (y = u && p.route.id ? u[p.route.id] : void 0,
        S = p.route.errorElement || sh,
        s && (a < 0 && m === 0 ? (gh("route-fallback"),
        g = !0,
        C = null) : a === m && (g = !0,
        C = p.route.hydrateFallbackElement || null)));
        let d = t.concat(o.slice(0, m + 1))
          , c = () => {
            let f;
            return y ? f = S : g ? f = C : p.route.Component ? f = w.createElement(p.route.Component, null) : p.route.element ? f = p.route.element : f = h,
            w.createElement(ch, {
                match: p,
                routeContext: {
                    outlet: h,
                    matches: d,
                    isDataRoute: n != null
                },
                children: f
            })
        }
        ;
        return n && (p.route.ErrorBoundary || p.route.errorElement || m === 0) ? w.createElement(ah, {
            location: n.location,
            revalidation: n.revalidation,
            component: S,
            error: y,
            children: c(),
            routeContext: {
                outlet: null,
                matches: d,
                isDataRoute: !0
            }
        }) : c()
    }
    , null)
}
var Jc = function(e) {
    return e.UseBlocker = "useBlocker",
    e.UseRevalidator = "useRevalidator",
    e.UseNavigateStable = "useNavigate",
    e
}(Jc || {})
  , Zc = function(e) {
    return e.UseBlocker = "useBlocker",
    e.UseLoaderData = "useLoaderData",
    e.UseActionData = "useActionData",
    e.UseRouteError = "useRouteError",
    e.UseNavigation = "useNavigation",
    e.UseRouteLoaderData = "useRouteLoaderData",
    e.UseMatches = "useMatches",
    e.UseRevalidator = "useRevalidator",
    e.UseNavigateStable = "useNavigate",
    e.UseRouteId = "useRouteId",
    e
}(Zc || {});
function dh(e) {
    let t = w.useContext(Fl);
    return t || K(!1),
    t
}
function ph(e) {
    let t = w.useContext(Kc);
    return t || K(!1),
    t
}
function hh(e) {
    let t = w.useContext(Ht);
    return t || K(!1),
    t
}
function qc(e) {
    let t = hh()
      , n = t.matches[t.matches.length - 1];
    return n.route.id || K(!1),
    n.route.id
}
function mh() {
    var e;
    let t = w.useContext(Yc)
      , n = ph()
      , r = qc();
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function vh() {
    let {router: e} = dh(Jc.UseNavigateStable)
      , t = qc(Zc.UseNavigateStable)
      , n = w.useRef(!1);
    return Gc( () => {
        n.current = !0
    }
    ),
    w.useCallback(function(l, i) {
        i === void 0 && (i = {}),
        n.current && (typeof l == "number" ? e.navigate(l) : e.navigate(l, ar({
            fromRouteId: t
        }, i)))
    }, [e, t])
}
const Cs = {};
function gh(e, t, n) {
    Cs[e] || (Cs[e] = !0)
}
function yh(e, t) {
    e == null || e.v7_startTransition,
    e == null || e.v7_relativeSplatPath
}
function Rt(e) {
    K(!1)
}
function wh(e) {
    let {basename: t="/", children: n=null, location: r, navigationType: l=ct.Pop, navigator: i, static: o=!1, future: u} = e;
    mr() && K(!1);
    let s = t.replace(/^\/*/, "/")
      , a = w.useMemo( () => ({
        basename: s,
        navigator: i,
        static: o,
        future: ar({
            v7_relativeSplatPath: !1
        }, u)
    }), [s, u, i, o]);
    typeof r == "string" && (r = Vt(r));
    let {pathname: h="/", search: p="", hash: m="", state: y=null, key: g="default"} = r
      , S = w.useMemo( () => {
        let C = wn(h, s);
        return C == null ? null : {
            location: {
                pathname: C,
                search: p,
                hash: m,
                state: y,
                key: g
            },
            navigationType: l
        }
    }
    , [s, h, p, m, y, g, l]);
    return S == null ? null : w.createElement(_t.Provider, {
        value: a
    }, w.createElement($l.Provider, {
        children: n,
        value: S
    }))
}
function Sh(e) {
    let {children: t, location: n} = e;
    return ih(ho(t), n)
}
new Promise( () => {}
);
function ho(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return w.Children.forEach(e, (r, l) => {
        if (!w.isValidElement(r))
            return;
        let i = [...t, l];
        if (r.type === w.Fragment) {
            n.push.apply(n, ho(r.props.children, i));
            return
        }
        r.type !== Rt && K(!1),
        !r.props.index || !r.props.children || K(!1);
        let o = {
            id: r.props.id || i.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (o.children = ho(r.props.children, i)),
        n.push(o)
    }
    ),
    n
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Sl() {
    return Sl = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    Sl.apply(this, arguments)
}
function bc(e, t) {
    if (e == null)
        return {};
    var n = {}, r = Object.keys(e), l, i;
    for (i = 0; i < r.length; i++)
        l = r[i],
        !(t.indexOf(l) >= 0) && (n[l] = e[l]);
    return n
}
function kh(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function Eh(e, t) {
    return e.button === 0 && (!t || t === "_self") && !kh(e)
}
const xh = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"]
  , Ch = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"]
  , _h = "6";
try {
    window.__reactRouterVersion = _h
} catch {}
const Ph = w.createContext({
    isTransitioning: !1
})
  , Nh = "startTransition"
  , _s = wf[Nh];
function Th(e) {
    let {basename: t, children: n, future: r, window: l} = e
      , i = w.useRef();
    i.current == null && (i.current = jp({
        window: l,
        v5Compat: !0
    }));
    let o = i.current
      , [u,s] = w.useState({
        action: o.action,
        location: o.location
    })
      , {v7_startTransition: a} = r || {}
      , h = w.useCallback(p => {
        a && _s ? _s( () => s(p)) : s(p)
    }
    , [s, a]);
    return w.useLayoutEffect( () => o.listen(h), [o, h]),
    w.useEffect( () => yh(r), [r]),
    w.createElement(wh, {
        basename: t,
        children: n,
        location: u.location,
        navigationType: u.action,
        navigator: o,
        future: r
    })
}
const Lh = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u"
  , Rh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , Mn = w.forwardRef(function(t, n) {
    let {onClick: r, relative: l, reloadDocument: i, replace: o, state: u, target: s, to: a, preventScrollReset: h, viewTransition: p} = t, m = bc(t, xh), {basename: y} = w.useContext(_t), g, S = !1;
    if (typeof a == "string" && Rh.test(a) && (g = a,
    Lh))
        try {
            let f = new URL(window.location.href)
              , v = a.startsWith("//") ? new URL(f.protocol + a) : new URL(a)
              , x = wn(v.pathname, y);
            v.origin === f.origin && x != null ? a = x + v.search + v.hash : S = !0
        } catch {}
    let C = rh(a, {
        relative: l
    })
      , d = zh(a, {
        replace: o,
        state: u,
        target: s,
        preventScrollReset: h,
        relative: l,
        viewTransition: p
    });
    function c(f) {
        r && r(f),
        f.defaultPrevented || d(f)
    }
    return w.createElement("a", Sl({}, m, {
        href: g || C,
        onClick: S || i ? r : c,
        ref: n,
        target: s
    }))
})
  , Kt = w.forwardRef(function(t, n) {
    let {"aria-current": r="page", caseSensitive: l=!1, className: i="", end: o=!1, style: u, to: s, viewTransition: a, children: h} = t
      , p = bc(t, Ch)
      , m = Al(s, {
        relative: p.relative
    })
      , y = vr()
      , g = w.useContext(Kc)
      , {navigator: S, basename: C} = w.useContext(_t)
      , d = g != null && Oh(m) && a === !0
      , c = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname
      , f = y.pathname
      , v = g && g.navigation && g.navigation.location ? g.navigation.location.pathname : null;
    l || (f = f.toLowerCase(),
    v = v ? v.toLowerCase() : null,
    c = c.toLowerCase()),
    v && C && (v = wn(v, C) || v);
    const x = c !== "/" && c.endsWith("/") ? c.length - 1 : c.length;
    let P = f === c || !o && f.startsWith(c) && f.charAt(x) === "/", T = v != null && (v === c || !o && v.startsWith(c) && v.charAt(c.length) === "/"), L = {
        isActive: P,
        isPending: T,
        isTransitioning: d
    }, U = P ? r : void 0, R;
    typeof i == "function" ? R = i(L) : R = [i, P ? "active" : null, T ? "pending" : null, d ? "transitioning" : null].filter(Boolean).join(" ");
    let H = typeof u == "function" ? u(L) : u;
    return w.createElement(Mn, Sl({}, p, {
        "aria-current": U,
        className: R,
        ref: n,
        style: H,
        to: s,
        viewTransition: a
    }), typeof h == "function" ? h(L) : h)
});
var mo;
(function(e) {
    e.UseScrollRestoration = "useScrollRestoration",
    e.UseSubmit = "useSubmit",
    e.UseSubmitFetcher = "useSubmitFetcher",
    e.UseFetcher = "useFetcher",
    e.useViewTransitionState = "useViewTransitionState"
}
)(mo || (mo = {}));
var Ps;
(function(e) {
    e.UseFetcher = "useFetcher",
    e.UseFetchers = "useFetchers",
    e.UseScrollRestoration = "useScrollRestoration"
}
)(Ps || (Ps = {}));
function jh(e) {
    let t = w.useContext(Fl);
    return t || K(!1),
    t
}
function zh(e, t) {
    let {target: n, replace: r, state: l, preventScrollReset: i, relative: o, viewTransition: u} = t === void 0 ? {} : t
      , s = Xc()
      , a = vr()
      , h = Al(e, {
        relative: o
    });
    return w.useCallback(p => {
        if (Eh(p, n)) {
            p.preventDefault();
            let m = r !== void 0 ? r : wl(a) === wl(h);
            s(e, {
                replace: m,
                state: l,
                preventScrollReset: i,
                relative: o,
                viewTransition: u
            })
        }
    }
    , [a, s, h, r, l, n, e, i, o, u])
}
function Oh(e, t) {
    t === void 0 && (t = {});
    let n = w.useContext(Ph);
    n == null && K(!1);
    let {basename: r} = jh(mo.useViewTransitionState)
      , l = Al(e, {
        relative: t.relative
    });
    if (!n.isTransitioning)
        return !1;
    let i = wn(n.currentLocation.pathname, r) || n.currentLocation.pathname
      , o = wn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
    return po(l.pathname, o) != null || po(l.pathname, i) != null
}
const Gr = ["default", "amber", "green"];
function Ih(e) {
    e === "default" ? document.documentElement.removeAttribute("data-theme") : document.documentElement.setAttribute("data-theme", e),
    localStorage.setItem("rpow_theme", e)
}
function Mh() {
    const e = localStorage.getItem("rpow_theme");
    return e && Gr.includes(e) ? e : "default"
}
function Dh(e) {
    const t = Gr.indexOf(e);
    return Gr[(t + 1) % Gr.length]
}
const Uh = "https://api.rpow2.com";
async function rt(e, t, n) {
    const r = await fetch(`${Uh}${t}`, {
        method: e,
        credentials: "include",
        headers: n ? {
            "content-type": "application/json"
        } : void 0,
        body: n ? JSON.stringify(n) : void 0
    });
    if (!r.ok) {
        let l;
        try {
            l = await r.json()
        } catch {
            l = {
                error: "INTERNAL",
                message: r.statusText
            }
        }
        throw l
    }
    if (r.status !== 204)
        return r.json()
}
const be = {
    authRequest: e => rt("POST", "/auth/request", e),
    me: () => rt("GET", "/me"),
    logout: () => rt("POST", "/auth/logout"),
    challenge: () => rt("POST", "/challenge"),
    mint: e => rt("POST", "/mint", e),
    send: e => rt("POST", "/send", e),
    activity: () => rt("GET", "/activity"),
    ledger: () => rt("GET", "/ledger")
};
function Bl() {
    const [e,t] = w.useState(null)
      , [n,r] = w.useState(!0)
      , l = async () => {
        r(!0);
        try {
            t(await be.me())
        } catch {
            t(null)
        } finally {
            r(!1)
        }
    }
    ;
    return w.useEffect( () => {
        l()
    }
    , []),
    {
        me: e,
        loading: n,
        refresh: l
    }
}
const Ns = "+----------------------------------------------------------------------+";
function ce({title: e, children: t}) {
    return k.jsxs("section", {
        style: {
            margin: "12px 0"
        },
        children: [e ? k.jsx("pre", {
            style: {
                margin: 0
            },
            children: `+-- ${e} ${"-".repeat(Math.max(2, 66 - e.length))}+`
        }) : k.jsx("pre", {
            style: {
                margin: 0
            },
            children: Ns
        }), k.jsx("div", {
            style: {
                padding: "8px 12px"
            },
            children: t
        }), k.jsx("pre", {
            style: {
                margin: 0
            },
            children: Ns
        })]
    })
}
function Fh() {
    const [e,t] = w.useState("")
      , [n,r] = w.useState("idle")
      , [l,i] = w.useState("");
    async function o(u) {
        u.preventDefault(),
        r("sending"),
        i("");
        try {
            await be.authRequest({
                email: e
            }),
            r("sent")
        } catch (s) {
            r("error"),
            i((s == null ? void 0 : s.message) ?? "unknown error")
        }
    }
    return k.jsx(ce, {
        title: "LOGIN",
        children: k.jsxs("form", {
            onSubmit: o,
            children: [k.jsxs("div", {
                children: ["EMAIL : ", k.jsx("input", {
                    value: e,
                    onChange: u => t(u.target.value),
                    required: !0,
                    type: "email",
                    autoFocus: !0,
                    style: {
                        width: "36ch"
                    }
                })]
            }), k.jsx("div", {
                style: {
                    marginTop: 8
                },
                children: k.jsx("button", {
                    type: "submit",
                    disabled: n === "sending" || n === "sent",
                    children: n === "sending" ? "[ ... ]" : n === "sent" ? "[ LINK SENT ]" : "[ SEND LINK ]"
                })
            }), n === "sent" && k.jsx("div", {
                style: {
                    marginTop: 8
                },
                children: "check your inbox. the link expires in 15 minutes."
            }), n === "error" && k.jsxs("div", {
                className: "error",
                style: {
                    marginTop: 8
                },
                children: ["error: ", l]
            })]
        })
    })
}
function $h() {
    const {me: e, loading: t, refresh: n} = Bl();
    if (t)
        return k.jsx(ce, {
            children: k.jsx("div", {
                children: "loading..."
            })
        });
    if (!e)
        return k.jsxs(ce, {
            title: "WALLET",
            children: [k.jsx("div", {
                children: "not signed in."
            }), k.jsx("div", {
                style: {
                    marginTop: 8
                },
                children: k.jsx(Mn, {
                    to: "/login",
                    children: "[ go to login ]"
                })
            })]
        });
    async function r() {
        await be.logout(),
        await n()
    }
    return k.jsxs(ce, {
        title: "WALLET",
        children: [k.jsx("pre", {
            style: {
                margin: 0
            },
            children: `  > LOGGED IN AS: ${e.email}
  > BALANCE     : ${String(e.balance).padStart(4, "0")} RPOW
  > MINTED      : ${String(e.minted).padStart(4, "0")}
  > SENT        : ${String(e.sent).padStart(4, "0")}
  > RECEIVED    : ${String(e.received).padStart(4, "0")}
`
        }), k.jsxs("div", {
            style: {
                marginTop: 8
            },
            children: [k.jsx(Mn, {
                to: "/mine",
                children: "[ MINE ]"
            }), " ", k.jsx(Mn, {
                to: "/send",
                children: "[ SEND ]"
            }), " ", k.jsx(Mn, {
                to: "/activity",
                children: "[ ACTIVITY ]"
            }), " ", k.jsx("button", {
                onClick: r,
                children: "[ LOGOUT ]"
            })]
        })]
    })
}
function Ah() {
    const {me: e, loading: t, refresh: n} = Bl()
      , r = Xc()
      , [l,i] = w.useState("idle")
      , [o,u] = w.useState(null)
      , [s,a] = w.useState("0")
      , [h,p] = w.useState(0)
      , [m,y] = w.useState("")
      , [g,S] = w.useState("")
      , [C,d] = w.useState(0)
      , c = w.useRef(null)
      , f = w.useRef(!1);
    w.useEffect( () => () => {
        var R;
        f.current = !0,
        (R = c.current) == null || R.terminate()
    }
    , []);
    async function v() {
        if (f.current) {
            i("idle");
            return
        }
        i("mining"),
        y(""),
        a("0"),
        p(0);
        let R;
        try {
            R = await be.challenge()
        } catch (ye) {
            i("error"),
            y((ye == null ? void 0 : ye.message) ?? "failed to fetch challenge");
            return
        }
        u(R.difficulty_bits);
        const H = new Worker(new URL("/assets/miner.worker-_dYsV_mq.js",import.meta.url),{
            type: "module"
        });
        c.current = H,
        H.onmessage = async ye => {
            const _e = ye.data;
            if (_e.type === "progress") {
                a(_e.hashes),
                p(_e.elapsed_ms);
                return
            }
            if (_e.type === "aborted") {
                H.terminate(),
                c.current = null,
                i("idle");
                return
            }
            if (_e.type === "found") {
                i("submitting"),
                H.terminate(),
                c.current = null;
                try {
                    const tt = await be.mint({
                        challenge_id: R.challenge_id,
                        solution_nonce: _e.solution_nonce
                    });
                    S(tt.token.id),
                    d(Wl => Wl + 1),
                    await n(),
                    f.current ? i("idle") : v()
                } catch (tt) {
                    i("error"),
                    y((tt == null ? void 0 : tt.message) ?? "mint failed")
                }
            }
        }
        ,
        H.postMessage({
            type: "start",
            nonce_prefix: R.nonce_prefix,
            difficulty_bits: R.difficulty_bits
        })
    }
    function x() {
        if (!e) {
            r("/login");
            return
        }
        f.current = !1,
        d(0),
        S(""),
        v()
    }
    function P() {
        var R;
        f.current = !0,
        (R = c.current) == null || R.postMessage({
            type: "abort"
        })
    }
    function T() {
        return h ? (Number(s) / 1e6 / (h / 1e3)).toFixed(2) + " MH/s" : "0"
    }
    function L() {
        const R = Math.floor(h / 1e3)
          , H = String(Math.floor(R / 60)).padStart(2, "0")
          , ye = String(R % 60).padStart(2, "0");
        return `00:${H}:${ye}`
    }
    if (t)
        return k.jsx(ce, {
            children: k.jsx("div", {
                children: "loading..."
            })
        });
    if (!e)
        return k.jsx(ce, {
            title: "MINE",
            children: k.jsx("div", {
                children: "not signed in."
            })
        });
    const U = l === "mining" || l === "submitting";
    return k.jsxs(ce, {
        title: "MINE",
        children: [k.jsx("pre", {
            style: {
                margin: 0
            },
            children: `  TARGET           : ${o ?? "--"} trailing zero bits
  HASHES (current) : ${Number(s).toLocaleString()}
  RATE             : ${T()}
  ELAPSED          : ${L()}
  STATUS           : ${l.toUpperCase()}
  MINED THIS RUN   : ${C}${g ? `
  LAST TOKEN       : ${g}` : ""}${m ? `
  ERROR            : ${m}` : ""}
`
        }), k.jsx("div", {
            style: {
                marginTop: 8
            },
            children: U ? k.jsx("button", {
                onClick: P,
                children: "[ STOP ]"
            }) : k.jsx("button", {
                onClick: x,
                children: "[ MINE ]"
            })
        })]
    })
}
function Bh() {
    const {me: e, refresh: t} = Bl()
      , [n,r] = w.useState("")
      , [l,i] = w.useState(1)
      , [o,u] = w.useState("idle")
      , [s,a] = w.useState("")
      , [h,p] = w.useState("")
      , [m,y] = w.useState(!1)
      , [g,S] = w.useState("")
      , [C,d] = w.useState(0);
    async function c(f) {
        if (f.preventDefault(),
        !!e) {
            u("sending"),
            a(""),
            y(!1);
            try {
                const v = await be.send({
                    recipient_email: n,
                    amount: l,
                    idempotency_key: crypto.randomUUID()
                });
                u("sent"),
                p(v.transfer_id),
                y(v.pending === !0),
                S(v.recipient_email),
                d(v.transferred),
                await t()
            } catch (v) {
                u("error");
                const x = (v == null ? void 0 : v.error) ?? "INTERNAL"
                  , P = {
                    INSUFFICIENT_BALANCE: "not enough tokens in your wallet",
                    BAD_REQUEST: (v == null ? void 0 : v.message) ?? "bad request",
                    RATE_LIMITED: (v == null ? void 0 : v.message) ?? "too many attempts"
                };
                a(P[x] ?? x)
            }
        }
    }
    return e ? k.jsxs(ce, {
        title: "SEND",
        children: [k.jsxs("form", {
            onSubmit: c,
            children: [k.jsxs("div", {
                children: ["TO     : ", k.jsx("input", {
                    type: "email",
                    required: !0,
                    value: n,
                    onChange: f => r(f.target.value),
                    style: {
                        width: "40ch"
                    }
                })]
            }), k.jsxs("div", {
                style: {
                    marginTop: 4
                },
                children: ["AMOUNT : ", k.jsx("input", {
                    type: "number",
                    min: 1,
                    max: e.balance,
                    required: !0,
                    value: l,
                    onChange: f => i(Number(f.target.value)),
                    style: {
                        width: "10ch"
                    }
                }), " RPOW"]
            }), k.jsx("div", {
                style: {
                    marginTop: 8
                },
                children: k.jsxs("button", {
                    type: "submit",
                    disabled: o === "sending",
                    children: ["[ ", o === "sending" ? "..." : "SEND", " ]"]
                })
            })]
        }), o === "sent" && !m && k.jsx("pre", {
            style: {
                margin: "12px 0 0"
            },
            children: `  + SENT  ${C} RPOW → ${g}
  transfer id: ${h}`
        }), o === "sent" && m && k.jsx("pre", {
            style: {
                margin: "12px 0 0"
            },
            children: `  + PENDING CLAIM
  ${g} does not have an rpow2 account yet.
  An email has been sent inviting them to claim ${C} RPOW.
  Your tokens are reserved until they claim or the link expires (30d).
  transfer id: ${h}`
        }), o === "error" && k.jsxs("div", {
            className: "error",
            style: {
                marginTop: 8
            },
            children: ["error: ", s]
        })]
    }) : k.jsx(ce, {
        title: "SEND",
        children: k.jsx("div", {
            children: "not signed in."
        })
    })
}
function Wh() {
    const [e,t] = w.useState(null)
      , [n,r] = w.useState("");
    return w.useEffect( () => {
        be.activity().then(t).catch(l => r((l == null ? void 0 : l.message) ?? "failed"))
    }
    , []),
    n ? k.jsx(ce, {
        title: "ACTIVITY",
        children: k.jsx("div", {
            className: "error",
            children: n
        })
    }) : e ? k.jsx(ce, {
        title: "ACTIVITY",
        children: k.jsx("pre", {
            style: {
                margin: 0
            },
            children: e.length === 0 ? "  (no activity yet)" : e.map(l => {
                const i = l.at.replace("T", " ").slice(0, 19)
                  , o = l.counterparty_email ?? ""
                  , u = l.type.toUpperCase().padEnd(8)
                  , s = `${l.type === "send" ? "-" : "+"}${l.amount}`;
                return `  ${i}  ${u}  ${s.padStart(4)}  ${o}`
            }
            ).join(`
`)
        })
    }) : k.jsx(ce, {
        title: "ACTIVITY",
        children: k.jsx("div", {
            children: "loading..."
        })
    })
}
function Vh() {
    const [e,t] = w.useState(null);
    return w.useEffect( () => {
        be.ledger().then(t)
    }
    , []),
    e ? k.jsxs(k.Fragment, {
        children: [k.jsxs(ce, {
            title: "PUBLIC LEDGER",
            children: [k.jsx("pre", {
                style: {
                    margin: 0
                },
                children: `  TOTAL MINTED        : ${e.total_minted}
  TOTAL TRANSFERRED   : ${e.total_transferred}
  CIRCULATING SUPPLY  : ${e.circulating_supply}
  CURRENT DIFFICULTY  : ${e.current_difficulty_bits} trailing zero bits
  USER COUNT          : ${e.user_count}
`
            }), k.jsxs("div", {
                style: {
                    marginTop: 12
                },
                className: "tagline",
                children: ["a modern tribute to a tribute to the original rpow by hal finney —", k.jsx("a", {
                    href: "https://nakamotoinstitute.org/finney/rpow/",
                    target: "_blank",
                    rel: "noreferrer",
                    children: " finney's announcement"
                })]
            })]
        }), k.jsx(ce, {
            title: "ABOUT RPOW",
            children: k.jsx("pre", {
                style: {
                    margin: 0,
                    whiteSpace: "pre-wrap"
                },
                children: `  Hal Finney published RPOW (Reusable Proofs of Work) in 2004 as the
  first cryptographic money based on proof-of-work. Bitcoin came four
  years later, in 2008/2009.

  Finney was deeply involved in early Bitcoin: he received the first
  bitcoin transaction from Satoshi Nakamoto in January 2009. Many have
  speculated he was part of the team behind the Satoshi pseudonym — a
  claim he denied during his lifetime.

  The original RPOW was centralized. A single trusted server, running
  on an IBM 4758 secure coprocessor, signed token transfers and
  prevented double-spends. There was no blockchain, no decentralized
  consensus, and no difficulty adjustment — meaning the supply was
  effectively unbounded as long as someone had compute. (A trusted
  server could enforce a cap; Finney just didn't.)

  Bitcoin solved all three: decentralized consensus via PoW mining tied
  to a chain, automatic difficulty adjustment, and a fixed 21M supply
  cap.

  rpow2.com is a modern tribute to the spirit of Finney's original.
  No IBM 4758 — Ed25519 signatures, magic-link auth, Postgres ledger.
  Still centralized. Still no supply cap. Still no difficulty
  adjustment. Faithful by design.
`
            })
        })]
    }) : k.jsx(ce, {
        title: "PUBLIC LEDGER",
        children: k.jsx("div", {
            children: "loading..."
        })
    })
}
const Hh = ["+======================================================================+", "|                   RPOW2 - Reusable Proofs of Work                    |", "+======================================================================+"].join(`
`);
function Qh() {
    const [e,t] = w.useState(Mh());
    w.useEffect( () => {
        Ih(e)
    }
    , [e]);
    const {me: n} = Bl();
    async function r() {
        try {
            await be.logout()
        } catch {}
        window.location.href = "/"
    }
    return k.jsx(Th, {
        children: k.jsxs("div", {
            className: "app-shell",
            children: [k.jsxs("header", {
                children: [k.jsx("pre", {
                    style: {
                        margin: 0
                    },
                    children: Hh
                }), k.jsx("div", {
                    className: "tagline",
                    children: "a modern tribute to a tribute to the original rpow by hal finney"
                }), k.jsxs("nav", {
                    style: {
                        marginTop: 8
                    },
                    children: [k.jsx(Kt, {
                        to: "/",
                        children: "[ wallet ]"
                    }), " ", k.jsx(Kt, {
                        to: "/mine",
                        children: "[ mine ]"
                    }), " ", k.jsx(Kt, {
                        to: "/send",
                        children: "[ send ]"
                    }), " ", k.jsx(Kt, {
                        to: "/activity",
                        children: "[ activity ]"
                    }), " ", k.jsx(Kt, {
                        to: "/ledger",
                        children: "[ ledger ]"
                    }), " ", n ? k.jsx("button", {
                        onClick: r,
                        title: "end session",
                        children: "[ logout ]"
                    }) : k.jsx(Kt, {
                        to: "/login",
                        children: "[ login ]"
                    }), " · ", k.jsxs("button", {
                        onClick: () => t(Dh(e)),
                        title: "cycle theme",
                        children: ["[ theme: ", e, " ]"]
                    })]
                })]
            }), k.jsx("main", {
                children: k.jsxs(Sh, {
                    children: [k.jsx(Rt, {
                        path: "/",
                        element: k.jsx($h, {})
                    }), k.jsx(Rt, {
                        path: "/login",
                        element: k.jsx(Fh, {})
                    }), k.jsx(Rt, {
                        path: "/mine",
                        element: k.jsx(Ah, {})
                    }), k.jsx(Rt, {
                        path: "/send",
                        element: k.jsx(Bh, {})
                    }), k.jsx(Rt, {
                        path: "/activity",
                        element: k.jsx(Wh, {})
                    }), k.jsx(Rt, {
                        path: "/ledger",
                        element: k.jsx(Vh, {})
                    })]
                })
            })]
        })
    })
}
Ac(document.getElementById("root")).render(k.jsx(w.StrictMode, {
    children: k.jsx(Qh, {})
}));
