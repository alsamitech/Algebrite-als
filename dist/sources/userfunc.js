"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_user_function = void 0;
const defs_1 = require("../runtime/defs");
const run_1 = require("../runtime/run");
const symbol_1 = require("../runtime/symbol");
const derivative_1 = require("./derivative");
const eval_1 = require("./eval");
const list_1 = require("./list");
const tensor_1 = require("./tensor");
// Evaluate a user defined function
// F is the function body
// A is the formal argument list
// B is the calling argument list
// S is the argument substitution list
// we got here because there was a function invocation and
// it's not been parsed (and consequently tagged) as any
// system function.
// So we are dealing with another function.
// The function could be actually defined, or not yet,
// so we'll deal with both cases.
/* d =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
f,x

General description
-------------------
Returns the partial derivative of f with respect to x. x can be a vector e.g. [x,y].

*/
function Eval_user_function(p1) {
    // Use "derivative" instead of "d" if there is no user function "d"
    if (defs_1.DEBUG) {
        console.log(`Eval_user_function evaluating: ${defs_1.car(p1)}`);
    }
    if (defs_1.car(p1) === symbol_1.symbol(defs_1.SYMBOL_D) &&
        symbol_1.get_binding(symbol_1.symbol(defs_1.SYMBOL_D)) === symbol_1.symbol(defs_1.SYMBOL_D)) {
        return derivative_1.Eval_derivative(p1);
    }
    // normally car(p1) is a symbol with the function name
    // but it could be something that has to be
    // evaluated to get to the function definition instead
    // (e.g. the function is an element of an array)
    // so we do an eval to sort it all out.
    // we expect to find either the body and
    // formula arguments, OR, if the function
    // has not been defined yet, then the
    // function will just contain its own name, as
    // all undefined variables do.
    const bodyAndFormalArguments = eval_1.Eval(defs_1.car(p1));
    if (defs_1.isNumericAtom(bodyAndFormalArguments)) {
        run_1.stop("expected function invocation, found multiplication instead. Use '*' symbol explicitly for multiplication.");
    }
    else if (defs_1.istensor(bodyAndFormalArguments)) {
        run_1.stop("expected function invocation, found tensor product instead. Use 'dot/inner' explicitly.");
    }
    else if (defs_1.isstr(bodyAndFormalArguments)) {
        run_1.stop('expected function, found string instead.');
    }
    let F = defs_1.car(defs_1.cdr(bodyAndFormalArguments));
    // p4 is the formal argument list
    // that is also contained here in the FUNCTION node
    let A = defs_1.car(defs_1.cdr(defs_1.cdr(bodyAndFormalArguments)));
    let B = defs_1.cdr(p1);
    // example:
    //  f(x) = x+2
    // then:
    //  F.toString() = "x + 2"
    //  A = x
    //  B = 2
    // first check is whether we don't obtain a function
    if (defs_1.car(bodyAndFormalArguments) !== symbol_1.symbol(defs_1.FUNCTION) ||
        // next check is whether evaluation did nothing, so the function is undefined
        bodyAndFormalArguments === defs_1.car(p1)) {
        // leave everything as it was and return
        return list_1.makeList(bodyAndFormalArguments, ...eval_1.evalList(B));
    }
    // Create the argument substitution list S
    p1 = A;
    let p2 = B;
    const S = [];
    while (defs_1.iscons(p1) && defs_1.iscons(p2)) {
        S.push(defs_1.car(p1));
        S.push(defs_1.car(p2));
        // why explicitly Eval the parameters when
        // the body of the function is
        // evalled anyways? Commenting it out. All tests pass...
        //Eval()
        p1 = defs_1.cdr(p1);
        p2 = defs_1.cdr(p2);
    }
    // Evaluate the function body
    if (S.length) {
        F = rewrite_args(F, S);
    }
    //console.log("rewritten body: " + F)
    return eval_1.Eval(F);
}
exports.Eval_user_function = Eval_user_function;
// Rewrite by expanding symbols that contain args
/**
 *
 * @param p1 expr to substitute in i.e. the function body
 * @param p2 subst. list which is a list where each consecutive pair
 * is what needs to be substituted and with what
 */
function rewrite_args(p1, p2) {
    //console.log "subst. list " + p2
    //console.log "expr: " + p1
    if (defs_1.istensor(p1)) {
        return rewrite_args_tensor(p1, p2);
    }
    if (defs_1.iscons(p1)) {
        let result = [];
        if (defs_1.car(p1) === p2[0]) {
            // rewrite a function in
            // the body with the one
            // passed from the paramaters
            result.push(list_1.makeList(symbol_1.symbol(defs_1.EVAL), p2[1]));
        }
        else {
            // if there is no match
            // then no substitution necessary
            result.push(defs_1.car(p1));
        }
        // continue recursively to
        // rewrite the rest of the body
        p1 = defs_1.cdr(p1);
        while (defs_1.iscons(p1)) {
            result.push(rewrite_args(defs_1.car(p1), p2));
            p1 = defs_1.cdr(p1);
        }
        return list_1.makeList(...result);
    }
    // ground cases here
    // (apart from function name which has
    // already been substituted as it's in the head
    // of the cons)
    // -----------------
    // If not a symbol then no
    // substitution to be done
    if (!defs_1.issymbol(p1)) {
        return p1;
    }
    // Here we are in a symbol case
    // so we need to substitute
    // Check if there is a direct match
    // of symbols right away
    for (let i = 0; i < p2.length; i += 2) {
        if (p1 === p2[i]) {
            return p2[i + 1];
        }
    }
    // Get the symbol's content, if _that_
    // matches then do the substitution
    let p3 = symbol_1.get_binding(p1);
    if (p1 !== p3) {
        const n = rewrite_args(p3, p2);
        if (n === p3) {
            return p1; // restore if not rewritten with arg
        }
    }
    return p3;
}
function rewrite_args_tensor(p1, p2) {
    p1 = tensor_1.copy_tensor(p1);
    p1.tensor.elem = p1.tensor.elem.map((el) => rewrite_args(el, p2));
    tensor_1.check_tensor_dimensions(p1);
    return p1;
}
