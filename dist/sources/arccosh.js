"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_arccosh = void 0;
const defs_1 = require("../runtime/defs");
const run_1 = require("../runtime/run");
const symbol_1 = require("../runtime/symbol");
const bignum_1 = require("./bignum");
const eval_1 = require("./eval");
const is_1 = require("./is");
const list_1 = require("./list");
/* arccosh =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------
Returns the inverse hyperbolic cosine of x.

*/
function Eval_arccosh(x) {
    return arccosh(eval_1.Eval(defs_1.cadr(x)));
}
exports.Eval_arccosh = Eval_arccosh;
function arccosh(x) {
    if (defs_1.car(x) === symbol_1.symbol(defs_1.COSH)) {
        return defs_1.cadr(x);
    }
    if (defs_1.isdouble(x)) {
        let { d } = x;
        if (d < 1.0) {
            run_1.stop('arccosh function argument is less than 1.0');
        }
        d = Math.log(d + Math.sqrt(d * d - 1.0));
        return bignum_1.double(d);
    }
    if (is_1.isplusone(x)) {
        return defs_1.Constants.zero;
    }
    return list_1.makeList(symbol_1.symbol(defs_1.ARCCOSH), x);
}
