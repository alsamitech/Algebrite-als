"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_clear = exports.do_clearall = exports.Eval_clearall = void 0;
const defs_1 = require("../runtime/defs");
const init_1 = require("../runtime/init");
const otherCFunctions_1 = require("../runtime/otherCFunctions");
const run_1 = require("../runtime/run");
const symbol_1 = require("../runtime/symbol");
const pattern_1 = require("./pattern");
/* clearall =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

General description
-------------------

Completely wipes all variables from the environment.

*/
function Eval_clearall() {
    do_clearall();
    return symbol_1.symbol(defs_1.NIL);
}
exports.Eval_clearall = Eval_clearall;
function do_clearall() {
    if (!defs_1.defs.test_flag) {
        otherCFunctions_1.clear_term();
    }
    pattern_1.do_clearPatterns();
    symbol_1.clear_symbols();
    init_1.defn();
    return (defs_1.defs.codeGen = false);
}
exports.do_clearall = do_clearall;
// clearall from application GUI code
function clearall() {
    return run_1.run('clearall');
}
/* clear =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------

Completely wipes a variable from the environment (while doing x = quote(x) just unassigns it).

*/
function Eval_clear(p1) {
    let p2;
    p2 = defs_1.cdr(p1);
    while (defs_1.iscons(p2)) {
        const variableToBeCleared = defs_1.car(p2);
        //console.log variableToBeCleared + ""
        if (variableToBeCleared.k !== defs_1.SYM) {
            run_1.stop('symbol error');
        }
        //console.log "getting binding of " + p.toString()
        //if p.toString() == "aaa"
        //  breakpoint
        symbol_1.clear_symbol(variableToBeCleared);
        p2 = defs_1.cdr(p2);
    }
    return symbol_1.symbol(defs_1.NIL);
}
exports.Eval_clear = Eval_clear;
