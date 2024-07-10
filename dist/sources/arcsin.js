"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_arcsin = void 0;
const defs_1 = require("../runtime/defs");
const symbol_1 = require("../runtime/symbol");
const bignum_1 = require("./bignum");
const eval_1 = require("./eval");
const is_1 = require("./is");
const list_1 = require("./list");
const multiply_1 = require("./multiply");
/* arcsin =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------
Returns the inverse sine of x.

*/
function Eval_arcsin(x) {
    return arcsin(eval_1.Eval(defs_1.cadr(x)));
}
exports.Eval_arcsin = Eval_arcsin;
function arcsin(x) {
    if (defs_1.car(x) === symbol_1.symbol(defs_1.SIN)) {
        return defs_1.cadr(x);
    }
    if (defs_1.isdouble(x)) {
        return bignum_1.double(Math.asin(x.d));
    }
    // if x == 1/sqrt(2) then return 1/4*pi (45 degrees)
    // second if catches the other way of saying it, sqrt(2)/2
    if (is_1.isoneoversqrttwo(x) ||
        (defs_1.ismultiply(x) &&
            is_1.equalq(defs_1.car(defs_1.cdr(x)), 1, 2) &&
            defs_1.car(defs_1.car(defs_1.cdr(defs_1.cdr(x)))) === symbol_1.symbol(defs_1.POWER) &&
            is_1.equaln(defs_1.car(defs_1.cdr(defs_1.car(defs_1.cdr(defs_1.cdr(x))))), 2) &&
            is_1.equalq(defs_1.car(defs_1.cdr(defs_1.cdr(defs_1.car(defs_1.cdr(defs_1.cdr(x)))))), 1, 2))) {
        return multiply_1.multiply(bignum_1.rational(1, 4), symbol_1.symbol(defs_1.PI));
    }
    // if x == -1/sqrt(2) then return -1/4*pi (-45 degrees)
    // second if catches the other way of saying it, -sqrt(2)/2
    if (is_1.isminusoneoversqrttwo(x) ||
        (defs_1.ismultiply(x) &&
            is_1.equalq(defs_1.car(defs_1.cdr(x)), -1, 2) &&
            defs_1.car(defs_1.car(defs_1.cdr(defs_1.cdr(x)))) === symbol_1.symbol(defs_1.POWER) &&
            is_1.equaln(defs_1.car(defs_1.cdr(defs_1.car(defs_1.cdr(defs_1.cdr(x))))), 2) &&
            is_1.equalq(defs_1.car(defs_1.cdr(defs_1.cdr(defs_1.car(defs_1.cdr(defs_1.cdr(x)))))), 1, 2))) {
        return defs_1.defs.evaluatingAsFloats
            ? bignum_1.double(-Math.PI / 4.0)
            : multiply_1.multiply(bignum_1.rational(-1, 4), symbol_1.symbol(defs_1.PI));
    }
    // if x == sqrt(3)/2 then return 1/3*pi (60 degrees)
    if (is_1.isSqrtThreeOverTwo(x)) {
        return defs_1.defs.evaluatingAsFloats
            ? bignum_1.double(Math.PI / 3.0)
            : multiply_1.multiply(bignum_1.rational(1, 3), symbol_1.symbol(defs_1.PI));
    }
    // if x == -sqrt(3)/2 then return -1/3*pi (-60 degrees)
    if (is_1.isMinusSqrtThreeOverTwo(x)) {
        return defs_1.defs.evaluatingAsFloats
            ? bignum_1.double(-Math.PI / 3.0)
            : multiply_1.multiply(bignum_1.rational(-1, 3), symbol_1.symbol(defs_1.PI));
    }
    if (!defs_1.isrational(x)) {
        return list_1.makeList(symbol_1.symbol(defs_1.ARCSIN), x);
    }
    const n = bignum_1.nativeInt(multiply_1.multiply(x, bignum_1.integer(2)));
    switch (n) {
        case -2:
            return defs_1.defs.evaluatingAsFloats
                ? bignum_1.double(-Math.PI / 2.0)
                : multiply_1.multiply(bignum_1.rational(-1, 2), symbol_1.symbol(defs_1.PI));
        case -1:
            return defs_1.defs.evaluatingAsFloats
                ? bignum_1.double(-Math.PI / 6.0)
                : multiply_1.multiply(bignum_1.rational(-1, 6), symbol_1.symbol(defs_1.PI));
        case 0:
            return defs_1.Constants.Zero();
        case 1:
            return defs_1.defs.evaluatingAsFloats
                ? bignum_1.double(Math.PI / 6.0)
                : multiply_1.multiply(bignum_1.rational(1, 6), symbol_1.symbol(defs_1.PI));
        case 2:
            return defs_1.defs.evaluatingAsFloats
                ? bignum_1.double(Math.PI / 2.0)
                : multiply_1.multiply(bignum_1.rational(1, 2), symbol_1.symbol(defs_1.PI));
        default:
            return list_1.makeList(symbol_1.symbol(defs_1.ARCSIN), x);
    }
}
