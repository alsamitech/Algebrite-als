"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ysinh = exports.Eval_sinh = void 0;
const defs_1 = require("../runtime/defs");
const symbol_1 = require("../runtime/symbol");
const bignum_1 = require("./bignum");
const eval_1 = require("./eval");
const is_1 = require("./is");
const list_1 = require("./list");
//            exp(x) - exp(-x)
//  sinh(x) = ----------------
//                   2
function Eval_sinh(p1) {
    return ysinh(eval_1.Eval(defs_1.cadr(p1)));
}
exports.Eval_sinh = Eval_sinh;
function ysinh(p1) {
    if (defs_1.car(p1) === symbol_1.symbol(defs_1.ARCSINH)) {
        return defs_1.cadr(p1);
    }
    if (defs_1.isdouble(p1)) {
        let d = Math.sinh(p1.d);
        if (Math.abs(d) < 1e-10) {
            d = 0.0;
        }
        return bignum_1.double(d);
    }
    if (is_1.isZeroAtomOrTensor(p1)) {
        return defs_1.Constants.zero;
    }
    return list_1.makeList(symbol_1.symbol(defs_1.SINH), p1);
}
exports.ysinh = ysinh;
