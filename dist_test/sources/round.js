"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_round = void 0;
const defs_1 = require("../runtime/defs");
const symbol_1 = require("../runtime/symbol");
const bignum_1 = require("./bignum");
const eval_1 = require("./eval");
const float_1 = require("./float");
const is_1 = require("./is");
const list_1 = require("./list");
function Eval_round(p1) {
    return yround(eval_1.Eval(defs_1.cadr(p1)));
}
exports.Eval_round = Eval_round;
function yround(p1) {
    if (!defs_1.isNumericAtom(p1)) {
        return list_1.makeList(symbol_1.symbol(defs_1.ROUND), p1);
    }
    if (defs_1.isdouble(p1)) {
        return bignum_1.double(Math.round(p1.d));
    }
    if (is_1.isinteger(p1)) {
        return p1;
    }
    p1 = float_1.yyfloat(p1);
    return bignum_1.integer(Math.round(p1.d));
}
