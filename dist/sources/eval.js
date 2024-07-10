"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalList = exports.Eval_predicate = exports.Eval_unit = exports.Eval_subst = exports.Eval_stop = exports.Eval_sqrt = exports.Eval_setq = exports.Eval_rank = exports.Eval_quote = exports.Eval_operator = exports.Eval_number = exports.Eval_isinteger = exports.Eval_invg = exports.Eval_inv = exports.Eval_index = exports.Eval_hilbert = exports.Eval_hermite = exports.Eval_factorpoly = exports.Eval_factorial = exports.Eval_exp = exports.Eval_Eval = exports.Eval_dsolve = exports.Eval_do = exports.Eval_divisors = exports.Eval_dim = exports.Eval_det = exports.Eval_check = exports.Eval_binding = exports.Eval_cons = exports.Eval_sym = exports.Eval = exports.evaluate_integer = void 0;
const _1 = require(".");
const alloc_1 = require("../runtime/alloc");
const defs_1 = require("../runtime/defs");
const run_1 = require("../runtime/run");
const symbol_1 = require("../runtime/symbol");
const bignum_1 = require("./bignum");
const define_1 = require("./define");
const det_1 = require("./det");
const divisors_1 = require("./divisors");
const factorial_1 = require("./factorial");
const factorpoly_1 = require("./factorpoly");
const hermite_1 = require("./hermite");
const hilbert_1 = require("./hilbert");
const inv_1 = require("./inv");
const is_1 = require("./is");
const list_1 = require("./list");
const misc_1 = require("./misc");
const power_1 = require("./power");
const subst_1 = require("./subst");
const tensor_1 = require("./tensor");
const userfunc_1 = require("./userfunc");
function evaluate_integer(p) {
    return bignum_1.nativeInt(Eval(p));
}
exports.evaluate_integer = evaluate_integer;
// Evaluate an expression, for example...
//
//  push(p1)
//  Eval()
//  p2 = pop()
function Eval(p1) {
    let willEvaluateAsFloats;
    run_1.check_esc_flag();
    if (p1 == null) {
        defs_1.breakpoint;
    }
    if (!defs_1.defs.evaluatingAsFloats && is_1.isfloating(p1)) {
        willEvaluateAsFloats = true;
        defs_1.defs.evaluatingAsFloats = true;
    }
    try {
        switch (p1.k) {
            case defs_1.CONS:
                return Eval_cons(p1);
            case defs_1.NUM:
                return defs_1.defs.evaluatingAsFloats
                    ? bignum_1.double(bignum_1.convert_rational_to_double(p1))
                    : p1;
            case defs_1.DOUBLE:
            case defs_1.STR:
                return p1;
            case defs_1.TENSOR:
                return tensor_1.Eval_tensor(p1);
            case defs_1.SYM:
                return Eval_sym(p1);
            default:
                run_1.stop('atom?');
        }
    }
    finally {
        if (willEvaluateAsFloats) {
            defs_1.defs.evaluatingAsFloats = false;
        }
    }
}
exports.Eval = Eval;
function Eval_sym(p1) {
    // note that function calls are not processed here
    // because, since they have an argument (at least an empty one)
    // they are actually CONs, which is a branch of the
    // switch before the one that calls this function
    // bare keyword?
    // If it's a keyword, then we don't look
    // at the binding array, because keywords
    // are not redefinable.
    if (symbol_1.iskeyword(p1)) {
        return Eval(list_1.makeList(p1, symbol_1.symbol(defs_1.LAST)));
    }
    else if (p1 === symbol_1.symbol(defs_1.PI) && defs_1.defs.evaluatingAsFloats) {
        return defs_1.Constants.piAsDouble;
    }
    // Evaluate symbol's binding
    let p2 = symbol_1.get_binding(p1);
    if (defs_1.DEBUG) {
        console.log(`looked up: ${p1} which contains: ${p2}`);
    }
    // differently from standard Lisp,
    // here the evaluation is not
    // one-step only, rather it keeps evaluating
    // "all the way" until a symbol is
    // defined as itself.
    // Uncomment these two lines to get Lisp
    // behaviour (and break most tests)
    if (p1 !== p2) {
        // detect recursive lookup of symbols, which would otherwise
        // cause a stack overflow.
        // Note that recursive functions will still work because
        // as mentioned at the top, this method doesn't look
        // up and evaluate function calls.
        const positionIfSymbolAlreadyBeingEvaluated = defs_1.defs.chainOfUserSymbolsNotFunctionsBeingEvaluated.indexOf(p1);
        if (positionIfSymbolAlreadyBeingEvaluated !== -1) {
            let cycleString = '';
            for (let i = positionIfSymbolAlreadyBeingEvaluated; i < defs_1.defs.chainOfUserSymbolsNotFunctionsBeingEvaluated.length; i++) {
                cycleString +=
                    defs_1.defs.chainOfUserSymbolsNotFunctionsBeingEvaluated[i].printname +
                        ' -> ';
            }
            cycleString += p1.printname;
            run_1.stop('recursive evaluation of symbols: ' + cycleString);
            return;
        }
        defs_1.defs.chainOfUserSymbolsNotFunctionsBeingEvaluated.push(p1);
        p2 = Eval(p2);
        defs_1.defs.chainOfUserSymbolsNotFunctionsBeingEvaluated.pop();
    }
    return p2;
}
exports.Eval_sym = Eval_sym;
function Eval_cons(p1) {
    const cons_head = defs_1.car(p1);
    // normally the cons_head is a symbol,
    // but sometimes in the case of
    // functions we don't have a symbol,
    // we have to evaluate something to get to the
    // symbol. For example if a function is inside
    // a tensor, then we need to evaluate an index
    // access first to get to the function.
    // In those cases, we find an EVAL here,
    // so we proceed to EVAL
    if (defs_1.car(cons_head) === symbol_1.symbol(defs_1.EVAL)) {
        return userfunc_1.Eval_user_function(p1);
    }
    // If we didn't fall in the EVAL case above
    // then at this point we must have a symbol.
    if (!defs_1.issymbol(cons_head)) {
        run_1.stop('cons?');
    }
    if (cons_head.keyword) {
        return cons_head.keyword(p1);
    }
    return userfunc_1.Eval_user_function(p1);
}
exports.Eval_cons = Eval_cons;
function Eval_binding(p1) {
    return symbol_1.get_binding(defs_1.cadr(p1));
}
exports.Eval_binding = Eval_binding;
/* check =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
p

General description
-------------------
Returns whether the predicate p is true/false or unknown:
0 if false, 1 if true or remains unevaluated if unknown.
Note that if "check" is passed an assignment, it turns it into a test,
i.e. check(a = b) is turned into check(a==b)
so "a" is not assigned anything.
Like in many programming languages, "check" also gives truthyness/falsyness
for numeric values. In which case, "true" is returned for non-zero values.
Potential improvements: "check" can't evaluate strings yet.

*/
function Eval_check(p1) {
    // check the argument
    const checkResult = is_1.isZeroLikeOrNonZeroLikeOrUndetermined(defs_1.cadr(p1));
    if (checkResult == null) {
        // returned null: unknown result
        // leave the whole check unevalled
        return p1;
    }
    else {
        // returned true or false -> 1 or 0
        return bignum_1.integer(Number(checkResult));
    }
}
exports.Eval_check = Eval_check;
function Eval_det(p1) {
    const arg = Eval(defs_1.cadr(p1));
    return det_1.det(arg);
}
exports.Eval_det = Eval_det;
/* dim =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
m,n

General description
-------------------
Returns the cardinality of the nth index of tensor "m".

*/
function Eval_dim(p1) {
    //int n
    const p2 = Eval(defs_1.cadr(p1));
    const n = defs_1.iscons(defs_1.cddr(p1)) ? evaluate_integer(defs_1.caddr(p1)) : 1;
    if (!defs_1.istensor(p2)) {
        return defs_1.Constants.one; // dim of scalar is 1
    }
    else if (n < 1 || n > p2.tensor.ndim) {
        return p1;
    }
    else {
        return bignum_1.integer(p2.tensor.dim[n - 1]);
    }
}
exports.Eval_dim = Eval_dim;
function Eval_divisors(p1) {
    return divisors_1.divisors(Eval(defs_1.cadr(p1)));
}
exports.Eval_divisors = Eval_divisors;
/* do =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
a,b,...

General description
-------------------
Evaluates each argument from left to right. Returns the result of the last argument.

*/
function Eval_do(p1) {
    let result = defs_1.car(p1);
    p1 = defs_1.cdr(p1);
    while (defs_1.iscons(p1)) {
        result = Eval(defs_1.car(p1));
        p1 = defs_1.cdr(p1);
    }
    return result;
}
exports.Eval_do = Eval_do;
function Eval_dsolve(p1) {
    const a = Eval(defs_1.cadr(p1));
    const b = Eval(defs_1.caddr(p1));
    const c = Eval(defs_1.cadddr(p1));
    run_1.stop('dsolve');
    //return dsolve(a, b, c);
}
exports.Eval_dsolve = Eval_dsolve;
// for example, Eval(f,x,2)
function Eval_Eval(p1) {
    let tmp = Eval(defs_1.cadr(p1));
    p1 = defs_1.cddr(p1);
    while (defs_1.iscons(p1)) {
        tmp = subst_1.subst(tmp, Eval(defs_1.car(p1)), Eval(defs_1.cadr(p1)));
        p1 = defs_1.cddr(p1);
    }
    return Eval(tmp);
}
exports.Eval_Eval = Eval_Eval;
// exp evaluation: it replaces itself with
// a POWER(E,something) node and evals that one
function Eval_exp(p1) {
    return misc_1.exponential(Eval(defs_1.cadr(p1)));
}
exports.Eval_exp = Eval_exp;
function Eval_factorial(p1) {
    return factorial_1.factorial(Eval(defs_1.cadr(p1)));
}
exports.Eval_factorial = Eval_factorial;
function Eval_factorpoly(p1) {
    p1 = defs_1.cdr(p1);
    const arg1 = Eval(defs_1.car(p1));
    p1 = defs_1.cdr(p1);
    const arg2 = Eval(defs_1.car(p1));
    let temp = factorpoly_1.factorpoly(arg1, arg2);
    if (defs_1.iscons(p1)) {
        temp = p1.tail().reduce((a, b) => factorpoly_1.factorpoly(a, Eval(b)), temp);
    }
    return temp;
}
exports.Eval_factorpoly = Eval_factorpoly;
function Eval_hermite(p1) {
    const arg2 = Eval(defs_1.caddr(p1));
    const arg1 = Eval(defs_1.cadr(p1));
    return hermite_1.hermite(arg1, arg2);
}
exports.Eval_hermite = Eval_hermite;
function Eval_hilbert(p1) {
    return hilbert_1.hilbert(Eval(defs_1.cadr(p1)));
}
exports.Eval_hilbert = Eval_hilbert;
function Eval_index(p1) {
    const orig = p1;
    // look into the head of the list,
    // when evaluated it should be a tensor
    p1 = defs_1.cdr(p1);
    const theTensor = Eval(defs_1.car(p1));
    if (defs_1.isNumericAtom(theTensor)) {
        run_1.stop('trying to access a scalar as a tensor');
    }
    if (!defs_1.istensor(theTensor)) {
        // the tensor is not allocated yet, so
        // leaving the expression unevalled
        return orig;
    }
    const stack = [];
    // we examined the head of the list which was the tensor,
    // now look into the indexes
    p1 = defs_1.cdr(p1);
    while (defs_1.iscons(p1)) {
        stack.push(Eval(defs_1.car(p1)));
        if (!is_1.isintegerorintegerfloat(stack[stack.length - 1])) {
            // index with something other than an integer
            return orig;
        }
        p1 = defs_1.cdr(p1);
    }
    return _1.index_function(theTensor, stack);
}
exports.Eval_index = Eval_index;
function Eval_inv(p1) {
    const arg = Eval(defs_1.cadr(p1));
    return inv_1.inv(arg);
}
exports.Eval_inv = Eval_inv;
function Eval_invg(p1) {
    const arg = Eval(defs_1.cadr(p1));
    return inv_1.invg(arg);
}
exports.Eval_invg = Eval_invg;
function Eval_isinteger(p1) {
    p1 = Eval(defs_1.cadr(p1));
    if (defs_1.isrational(p1)) {
        return is_1.isinteger(p1) ? defs_1.Constants.one : defs_1.Constants.zero;
    }
    if (defs_1.isdouble(p1)) {
        const n = Math.floor(p1.d);
        return n === p1.d ? defs_1.Constants.one : defs_1.Constants.zero;
    }
    return list_1.makeList(symbol_1.symbol(defs_1.ISINTEGER), p1);
}
exports.Eval_isinteger = Eval_isinteger;
function Eval_number(p1) {
    p1 = Eval(defs_1.cadr(p1));
    if (p1.k === defs_1.NUM || p1.k === defs_1.DOUBLE) {
        return defs_1.Constants.one;
    }
    else {
        return defs_1.Constants.zero;
    }
}
exports.Eval_number = Eval_number;
function Eval_operator(p1) {
    return list_1.makeList(symbol_1.symbol(defs_1.OPERATOR), ...evalList(defs_1.cdr(p1)));
}
exports.Eval_operator = Eval_operator;
// quote definition
function Eval_quote(p1) {
    return defs_1.cadr(p1);
}
exports.Eval_quote = Eval_quote;
// rank definition
function Eval_rank(p1) {
    p1 = Eval(defs_1.cadr(p1));
    if (defs_1.istensor(p1)) {
        return bignum_1.integer(p1.tensor.ndim);
    }
    else {
        return defs_1.Constants.zero;
    }
}
exports.Eval_rank = Eval_rank;
// Evaluates the right side and assigns the
// result of the evaluation to the left side.
// It's called setq because it stands for "set quoted" from Lisp,
// see:
//   http://stackoverflow.com/questions/869529/difference-between-set-setq-and-setf-in-common-lisp
// Note that this also takes case of assigning to a tensor
// element, which is something that setq wouldn't do
// in list, see comments further down below.
// Example:
//   f = x
//   // f evaluates to x, so x is assigned to g really
//   // rather than actually f being assigned to g
//   g = f
//   f = y
//   g
//   > x
function Eval_setq(p1) {
    // case of tensor
    if (defs_1.caadr(p1) === symbol_1.symbol(defs_1.INDEX)) {
        return setq_indexed(p1);
    }
    // case of function definition
    if (defs_1.iscons(defs_1.cadr(p1))) {
        return define_1.define_user_function(p1);
    }
    if (!defs_1.issymbol(defs_1.cadr(p1))) {
        run_1.stop('symbol assignment: error in symbol');
    }
    const p2 = Eval(defs_1.caddr(p1));
    symbol_1.set_binding(defs_1.cadr(p1), p2);
    // An assignment returns nothing.
    // This is unlike most programming languages
    // where an assignment does return the
    // assigned value.
    // TODO Could be changed.
    return symbol_1.symbol(defs_1.NIL);
}
exports.Eval_setq = Eval_setq;
// Here "setq" is a misnomer because
// setq wouldn't work in Lisp to set array elements
// since setq stands for "set quoted" and you wouldn't
// quote an array element access.
// You'd rather use setf, which is a macro that can
// assign a value to anything.
//   (setf (aref YourArray 2) "blue")
// see
//   http://stackoverflow.com/questions/18062016/common-lisp-how-to-set-an-element-in-a-2d-array
//-----------------------------------------------------------------------------
//
//  Example: a[1] = b
//
//  p1  *-------*-----------------------*
//    |  |      |
//    setq  *-------*-------*  b
//      |  |  |
//      index  a  1
//
//  cadadr(p1) -> a
//
//-----------------------------------------------------------------------------
function setq_indexed(p1) {
    const p4 = defs_1.cadadr(p1);
    console.log(`p4: ${p4}`);
    if (!defs_1.issymbol(p4)) {
        // this is likely to happen when one tries to
        // do assignments like these
        //   1[2] = 3
        // or
        //   f(x)[1] = 2
        // or
        //   [[1,2],[3,4]][5] = 6
        //
        // In other words, one can only do
        // a straight assignment like
        //   existingMatrix[index] = something
        run_1.stop('indexed assignment: expected a symbol name');
    }
    const lvalue = Eval(defs_1.caddr(p1));
    let args = [];
    let p2 = defs_1.cdadr(p1);
    if (defs_1.iscons(p2)) {
        args = ([...p2].map(Eval));
    }
    const p3 = _1.set_component(lvalue, ...args);
    symbol_1.set_binding(p4, p3);
    return symbol_1.symbol(defs_1.NIL);
}
function Eval_sqrt(p1) {
    const base = Eval(defs_1.cadr(p1));
    return power_1.power(base, bignum_1.rational(1, 2));
}
exports.Eval_sqrt = Eval_sqrt;
function Eval_stop() {
    run_1.stop('user stop');
}
exports.Eval_stop = Eval_stop;
function Eval_subst(p1) {
    const newExpr = Eval(defs_1.cadr(p1));
    const oldExpr = Eval(defs_1.caddr(p1));
    const expr = Eval(defs_1.cadddr(p1));
    return Eval(subst_1.subst(expr, oldExpr, newExpr));
}
exports.Eval_subst = Eval_subst;
// always returns a matrix with rank 2
// i.e. two dimensions,
// the passed parameter is the size
function Eval_unit(p1) {
    const n = evaluate_integer(defs_1.cadr(p1));
    if (isNaN(n)) {
        return p1;
    }
    if (n < 1) {
        return p1;
    }
    p1 = alloc_1.alloc_tensor(n * n);
    p1.tensor.ndim = 2;
    p1.tensor.dim[0] = n;
    p1.tensor.dim[1] = n;
    for (let i = 0; i < n; i++) {
        p1.tensor.elem[n * i + i] = defs_1.Constants.one;
    }
    tensor_1.check_tensor_dimensions(p1);
    return p1;
}
exports.Eval_unit = Eval_unit;
// like Eval() except "=" (assignment) is treated
// as "==" (equality test)
// This is because
//  * this allows users to be lazy and just
//    use "=" instead of "==" as per more common
//    mathematical notation
//  * in many places we don't expect an assignment
//    e.g. we don't expect to test the zero-ness
//    of an assignment or the truth value of
//    an assignment
// Note that these are questionable assumptions
// as for example in most programming languages one
// can indeed test the value of an assignment (the
// value is just the evaluation of the right side)
function Eval_predicate(p1) {
    if (defs_1.car(p1) === symbol_1.symbol(defs_1.SETQ)) {
        // replace the assignment in the
        // head with an equality test
        p1 = list_1.makeList(symbol_1.symbol(defs_1.TESTEQ), defs_1.cadr(p1), defs_1.caddr(p1));
    }
    return Eval(p1);
}
exports.Eval_predicate = Eval_predicate;
function* evalList(p1) {
    if (defs_1.iscons(p1)) {
        for (const el of p1) {
            yield Eval(el);
        }
    }
}
exports.evalList = evalList;
