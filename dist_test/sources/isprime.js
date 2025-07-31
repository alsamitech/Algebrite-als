"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_isprime = void 0;
const defs_1 = require("../runtime/defs");
const eval_1 = require("./eval");
const is_1 = require("./is");
const mprime_1 = require("./mprime");
function Eval_isprime(p1) {
    return isprime(eval_1.Eval(defs_1.cadr(p1)));
}
exports.Eval_isprime = Eval_isprime;
function isprime(p1) {
    if (is_1.isnonnegativeinteger(p1) && mprime_1.mprime(p1.q.a)) {
        return defs_1.Constants.one;
    }
    return defs_1.Constants.zero;
}
