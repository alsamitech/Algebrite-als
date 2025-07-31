"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exports.parse = void 0;
const run_1 = require("./run");
const bignum_1 = require("../sources/bignum");
const list_1 = require("../sources/list");
const scan_1 = require("../sources/scan");
const defs_1 = require("./defs");
const init_1 = require("./init");
const symbol_1 = require("./symbol");
if (!defs_1.defs.inited) {
    defs_1.defs.inited = true;
    init_1.init();
}
function parse_internal(argu) {
    if (typeof argu === 'string') {
        const [, u] = scan_1.scan(argu);
        return u;
    }
    else if (typeof argu === 'number') {
        if (argu % 1 === 0) {
            return bignum_1.integer(argu);
        }
        else {
            return bignum_1.double(argu);
        }
    }
    else if (typeof argu.k === 'number') {
        // hey look its a U
        return argu;
    }
    else {
        console.warn('unknown argument type', argu);
        return symbol_1.symbol(defs_1.NIL);
    }
}
function parse(argu) {
    let data;
    try {
        data = parse_internal(argu);
        run_1.check_stack();
    }
    catch (error) {
        defs_1.reset_after_error();
        throw error;
    }
    return data;
}
exports.parse = parse;
// exec handles the running ia JS of all the algebrite
// functions. The function name is passed in "name" and
// the corresponding function is pushed at the top of the stack
function exec(name, ...argus) {
    let result;
    const fn = symbol_1.get_binding(symbol_1.usr_symbol(name));
    run_1.check_stack();
    const p1 = list_1.makeList(fn, ...argus.map(parse_internal));
    try {
        result = run_1.top_level_eval(p1);
        run_1.check_stack();
    }
    catch (error) {
        defs_1.reset_after_error();
        throw error;
    }
    return result;
}
exports.exec = exec;
