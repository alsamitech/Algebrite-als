"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defn = exports.init = void 0;
const abs_1 = require("../sources/abs");
const add_1 = require("../sources/add");
const adj_1 = require("../sources/adj");
const approxratio_1 = require("../sources/approxratio");
const arccos_1 = require("../sources/arccos");
const arccosh_1 = require("../sources/arccosh");
const arcsin_1 = require("../sources/arcsin");
const arcsinh_1 = require("../sources/arcsinh");
const arctan_1 = require("../sources/arctan");
const arctanh_1 = require("../sources/arctanh");
const arg_1 = require("../sources/arg");
const besselj_1 = require("../sources/besselj");
const bessely_1 = require("../sources/bessely");
const bignum_1 = require("../sources/bignum");
const binomial_1 = require("../sources/binomial");
const ceiling_1 = require("../sources/ceiling");
const choose_1 = require("../sources/choose");
const circexp_1 = require("../sources/circexp");
const clear_1 = require("../sources/clear");
const clock_1 = require("../sources/clock");
const coeff_1 = require("../sources/coeff");
const cofactor_1 = require("../sources/cofactor");
const condense_1 = require("../sources/condense");
const conj_1 = require("../sources/conj");
const contract_1 = require("../sources/contract");
const cos_1 = require("../sources/cos");
const cosh_1 = require("../sources/cosh");
const decomp_1 = require("../sources/decomp");
const define_1 = require("../sources/define");
const defint_1 = require("../sources/defint");
const degree_1 = require("../sources/degree");
const denominator_1 = require("../sources/denominator");
const derivative_1 = require("../sources/derivative");
const dirac_1 = require("../sources/dirac");
const eigen_1 = require("../sources/eigen");
const erf_1 = require("../sources/erf");
const erfc_1 = require("../sources/erfc");
const eval_1 = require("../sources/eval");
const expand_1 = require("../sources/expand");
const expcos_1 = require("../sources/expcos");
const expsin_1 = require("../sources/expsin");
const factor_1 = require("../sources/factor");
const filter_1 = require("../sources/filter");
const float_1 = require("../sources/float");
const floor_1 = require("../sources/floor");
const for_1 = require("../sources/for");
const gamma_1 = require("../sources/gamma");
const gcd_1 = require("../sources/gcd");
const imag_1 = require("../sources/imag");
const inner_1 = require("../sources/inner");
const integral_1 = require("../sources/integral");
const isprime_1 = require("../sources/isprime");
const laguerre_1 = require("../sources/laguerre");
const lcm_1 = require("../sources/lcm");
const leading_1 = require("../sources/leading");
const legendre_1 = require("../sources/legendre");
const list_1 = require("../sources/list");
const log_1 = require("../sources/log");
const lookup_1 = require("../sources/lookup");
const mod_1 = require("../sources/mod");
const multiply_1 = require("../sources/multiply");
const nroots_1 = require("../sources/nroots");
const numerator_1 = require("../sources/numerator");
const outer_1 = require("../sources/outer");
const pattern_1 = require("../sources/pattern");
const polar_1 = require("../sources/polar");
const power_1 = require("../sources/power");
const prime_1 = require("../sources/prime");
const print_1 = require("../sources/print");
const product_1 = require("../sources/product");
const quotient_1 = require("../sources/quotient");
const rationalize_1 = require("../sources/rationalize");
const real_1 = require("../sources/real");
const rect_1 = require("../sources/rect");
const roots_1 = require("../sources/roots");
const round_1 = require("../sources/round");
const scan_1 = require("../sources/scan");
const sgn_1 = require("../sources/sgn");
const shape_1 = require("../sources/shape");
const simplify_1 = require("../sources/simplify");
const sin_1 = require("../sources/sin");
const sinh_1 = require("../sources/sinh");
const sum_1 = require("../sources/sum");
const tan_1 = require("../sources/tan");
const tanh_1 = require("../sources/tanh");
const taylor_1 = require("../sources/taylor");
const test_1 = require("../sources/test");
const transpose_1 = require("../sources/transpose");
const zero_1 = require("../sources/zero");
const defs_1 = require("./defs");
const symbol_1 = require("./symbol");
let init_flag = 0;
function init() {
    init_flag = 0;
    defs_1.reset_after_error();
    defs_1.defs.chainOfUserSymbolsNotFunctionsBeingEvaluated = [];
    if (init_flag) {
        return; // already initted
    }
    init_flag = 1;
    symbol_1.reset_symbols();
    defn();
}
exports.init = init;
/* cross =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept, script_defined

Parameters
----------
u,v

General description
-------------------
Returns the cross product of vectors u and v.

*/
/* curl =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept, script_defined

Parameters
----------
u

General description
-------------------
Returns the curl of vector u.

*/
const defn_str = [
    'version="' + defs_1.version + '"',
    'e=exp(1)',
    'i=sqrt(-1)',
    'autoexpand=1',
    'assumeRealVariables=1',
    'trange=[-pi,pi]',
    'xrange=[-10,10]',
    'yrange=[-10,10]',
    'last=0',
    'trace=0',
    'forceFixedPrintout=1',
    'maxFixedPrintoutDigits=6',
    'printLeaveEAlone=1',
    'printLeaveXAlone=0',
    // cross definition
    'cross(u,v)=[u[2]*v[3]-u[3]*v[2],u[3]*v[1]-u[1]*v[3],u[1]*v[2]-u[2]*v[1]]',
    // curl definition
    'curl(v)=[d(v[3],y)-d(v[2],z),d(v[1],z)-d(v[3],x),d(v[2],x)-d(v[1],y)]',
    // div definition
    'div(v)=d(v[1],x)+d(v[2],y)+d(v[3],z)',
    // Note that we use the mathematics / Javascript / Mathematica
    // convention that "log" is indeed the natural logarithm.
    //
    // In engineering, biology, astronomy, "log" can stand instead
    // for the "common" logarithm i.e. base 10. Also note that Google
    // calculations use log for the common logarithm.
    'ln(x)=log(x)',
];
function defn() {
    symbol_1.std_symbol(defs_1.ABS, abs_1.Eval_abs);
    symbol_1.std_symbol(defs_1.ADD, add_1.Eval_add);
    symbol_1.std_symbol(defs_1.ADJ, adj_1.Eval_adj);
    symbol_1.std_symbol(defs_1.AND, test_1.Eval_and);
    symbol_1.std_symbol(defs_1.APPROXRATIO, approxratio_1.Eval_approxratio);
    symbol_1.std_symbol(defs_1.ARCCOS, arccos_1.Eval_arccos);
    symbol_1.std_symbol(defs_1.ARCCOSH, arccosh_1.Eval_arccosh);
    symbol_1.std_symbol(defs_1.ARCSIN, arcsin_1.Eval_arcsin);
    symbol_1.std_symbol(defs_1.ARCSINH, arcsinh_1.Eval_arcsinh);
    symbol_1.std_symbol(defs_1.ARCTAN, arctan_1.Eval_arctan);
    symbol_1.std_symbol(defs_1.ARCTANH, arctanh_1.Eval_arctanh);
    symbol_1.std_symbol(defs_1.ARG, arg_1.Eval_arg);
    symbol_1.std_symbol(defs_1.ATOMIZE);
    symbol_1.std_symbol(defs_1.BESSELJ, besselj_1.Eval_besselj);
    symbol_1.std_symbol(defs_1.BESSELY, bessely_1.Eval_bessely);
    symbol_1.std_symbol(defs_1.BINDING, eval_1.Eval_binding);
    symbol_1.std_symbol(defs_1.BINOMIAL, binomial_1.Eval_binomial);
    symbol_1.std_symbol(defs_1.CEILING, ceiling_1.Eval_ceiling);
    symbol_1.std_symbol(defs_1.CHECK, eval_1.Eval_check);
    symbol_1.std_symbol(defs_1.CHOOSE, choose_1.Eval_choose);
    symbol_1.std_symbol(defs_1.CIRCEXP, circexp_1.Eval_circexp);
    symbol_1.std_symbol(defs_1.CLEAR, clear_1.Eval_clear);
    symbol_1.std_symbol(defs_1.CLEARALL, clear_1.Eval_clearall);
    symbol_1.std_symbol(defs_1.CLEARPATTERNS, pattern_1.Eval_clearpatterns);
    symbol_1.std_symbol(defs_1.CLOCK, clock_1.Eval_clock);
    symbol_1.std_symbol(defs_1.COEFF, coeff_1.Eval_coeff);
    symbol_1.std_symbol(defs_1.COFACTOR, cofactor_1.Eval_cofactor);
    symbol_1.std_symbol(defs_1.CONDENSE, condense_1.Eval_condense);
    symbol_1.std_symbol(defs_1.CONJ, conj_1.Eval_conj);
    symbol_1.std_symbol(defs_1.CONTRACT, contract_1.Eval_contract);
    symbol_1.std_symbol(defs_1.COS, cos_1.Eval_cos);
    symbol_1.std_symbol(defs_1.COSH, cosh_1.Eval_cosh);
    symbol_1.std_symbol(defs_1.DECOMP, decomp_1.Eval_decomp);
    symbol_1.std_symbol(defs_1.DEFINT, defint_1.Eval_defint);
    symbol_1.std_symbol(defs_1.DEGREE, degree_1.Eval_degree);
    symbol_1.std_symbol(defs_1.DENOMINATOR, denominator_1.Eval_denominator);
    symbol_1.std_symbol(defs_1.DET, eval_1.Eval_det);
    symbol_1.std_symbol(defs_1.DERIVATIVE, derivative_1.Eval_derivative);
    symbol_1.std_symbol(defs_1.DIM, eval_1.Eval_dim);
    symbol_1.std_symbol(defs_1.DIRAC, dirac_1.Eval_dirac);
    symbol_1.std_symbol(defs_1.DIVISORS, eval_1.Eval_divisors);
    symbol_1.std_symbol(defs_1.DO, eval_1.Eval_do);
    symbol_1.std_symbol(defs_1.DOT, inner_1.Eval_inner);
    symbol_1.std_symbol(defs_1.DRAW);
    symbol_1.std_symbol(defs_1.DSOLVE);
    symbol_1.std_symbol(defs_1.ERF, erf_1.Eval_erf);
    symbol_1.std_symbol(defs_1.ERFC, erfc_1.Eval_erfc);
    symbol_1.std_symbol(defs_1.EIGEN, eigen_1.Eval_eigen);
    symbol_1.std_symbol(defs_1.EIGENVAL, eigen_1.Eval_eigenval);
    symbol_1.std_symbol(defs_1.EIGENVEC, eigen_1.Eval_eigenvec);
    symbol_1.std_symbol(defs_1.EVAL, eval_1.Eval_Eval);
    symbol_1.std_symbol(defs_1.EXP, eval_1.Eval_exp);
    symbol_1.std_symbol(defs_1.EXPAND, expand_1.Eval_expand);
    symbol_1.std_symbol(defs_1.EXPCOS, expcos_1.Eval_expcos);
    symbol_1.std_symbol(defs_1.EXPSIN, expsin_1.Eval_expsin);
    symbol_1.std_symbol(defs_1.FACTOR, factor_1.Eval_factor);
    symbol_1.std_symbol(defs_1.FACTORIAL, eval_1.Eval_factorial);
    symbol_1.std_symbol(defs_1.FACTORPOLY, eval_1.Eval_factorpoly);
    symbol_1.std_symbol(defs_1.FILTER, filter_1.Eval_filter);
    symbol_1.std_symbol(defs_1.FLOATF, float_1.Eval_float);
    symbol_1.std_symbol(defs_1.FLOOR, floor_1.Eval_floor);
    symbol_1.std_symbol(defs_1.FOR, for_1.Eval_for);
    symbol_1.std_symbol(defs_1.FUNCTION, define_1.Eval_function_reference);
    symbol_1.std_symbol(defs_1.GAMMA, gamma_1.Eval_gamma);
    symbol_1.std_symbol(defs_1.GCD, gcd_1.Eval_gcd);
    symbol_1.std_symbol(defs_1.HERMITE, eval_1.Eval_hermite);
    symbol_1.std_symbol(defs_1.HILBERT, eval_1.Eval_hilbert);
    symbol_1.std_symbol(defs_1.IMAG, imag_1.Eval_imag);
    symbol_1.std_symbol(defs_1.INDEX, eval_1.Eval_index);
    symbol_1.std_symbol(defs_1.INNER, inner_1.Eval_inner);
    symbol_1.std_symbol(defs_1.INTEGRAL, integral_1.Eval_integral);
    symbol_1.std_symbol(defs_1.INV, eval_1.Eval_inv);
    symbol_1.std_symbol(defs_1.INVG, eval_1.Eval_invg);
    symbol_1.std_symbol(defs_1.ISINTEGER, eval_1.Eval_isinteger);
    symbol_1.std_symbol(defs_1.ISPRIME, isprime_1.Eval_isprime);
    symbol_1.std_symbol(defs_1.LAGUERRE, laguerre_1.Eval_laguerre);
    //  std_symbol(LAPLACE, Eval_laplace)
    symbol_1.std_symbol(defs_1.LCM, lcm_1.Eval_lcm);
    symbol_1.std_symbol(defs_1.LEADING, leading_1.Eval_leading);
    symbol_1.std_symbol(defs_1.LEGENDRE, legendre_1.Eval_legendre);
    symbol_1.std_symbol(defs_1.LOG, log_1.Eval_log);
    symbol_1.std_symbol(defs_1.LOOKUP, lookup_1.Eval_lookup);
    symbol_1.std_symbol(defs_1.MOD, mod_1.Eval_mod);
    symbol_1.std_symbol(defs_1.MULTIPLY, multiply_1.Eval_multiply);
    symbol_1.std_symbol(defs_1.NOT, test_1.Eval_not);
    symbol_1.std_symbol(defs_1.NROOTS, nroots_1.Eval_nroots);
    symbol_1.std_symbol(defs_1.NUMBER, eval_1.Eval_number);
    symbol_1.std_symbol(defs_1.NUMERATOR, numerator_1.Eval_numerator);
    symbol_1.std_symbol(defs_1.OPERATOR, eval_1.Eval_operator);
    symbol_1.std_symbol(defs_1.OR, test_1.Eval_or);
    symbol_1.std_symbol(defs_1.OUTER, outer_1.Eval_outer);
    symbol_1.std_symbol(defs_1.PATTERN, pattern_1.Eval_pattern);
    symbol_1.std_symbol(defs_1.PATTERNSINFO, pattern_1.Eval_patternsinfo);
    symbol_1.std_symbol(defs_1.POLAR, polar_1.Eval_polar);
    symbol_1.std_symbol(defs_1.POWER, power_1.Eval_power);
    symbol_1.std_symbol(defs_1.PRIME, prime_1.Eval_prime);
    symbol_1.std_symbol(defs_1.PRINT, print_1.Eval_print);
    symbol_1.std_symbol(defs_1.PRINT2DASCII, print_1.Eval_print2dascii);
    symbol_1.std_symbol(defs_1.PRINTFULL, print_1.Eval_printcomputer);
    symbol_1.std_symbol(defs_1.PRINTLATEX, print_1.Eval_printlatex);
    symbol_1.std_symbol(defs_1.PRINTLIST, print_1.Eval_printlist);
    symbol_1.std_symbol(defs_1.PRINTPLAIN, print_1.Eval_printhuman);
    symbol_1.std_symbol(defs_1.PRINT_LEAVE_E_ALONE);
    symbol_1.std_symbol(defs_1.PRINT_LEAVE_X_ALONE);
    symbol_1.std_symbol(defs_1.PRODUCT, product_1.Eval_product);
    symbol_1.std_symbol(defs_1.QUOTE, eval_1.Eval_quote);
    symbol_1.std_symbol(defs_1.QUOTIENT, quotient_1.Eval_quotient);
    symbol_1.std_symbol(defs_1.RANK, eval_1.Eval_rank);
    symbol_1.std_symbol(defs_1.RATIONALIZE, rationalize_1.Eval_rationalize);
    symbol_1.std_symbol(defs_1.REAL, real_1.Eval_real);
    symbol_1.std_symbol(defs_1.YYRECT, rect_1.Eval_rect);
    symbol_1.std_symbol(defs_1.ROOTS, roots_1.Eval_roots);
    symbol_1.std_symbol(defs_1.ROUND, round_1.Eval_round);
    symbol_1.std_symbol(defs_1.SETQ, eval_1.Eval_setq);
    symbol_1.std_symbol(defs_1.SGN, sgn_1.Eval_sgn);
    symbol_1.std_symbol(defs_1.SILENTPATTERN, pattern_1.Eval_silentpattern);
    symbol_1.std_symbol(defs_1.SIMPLIFY, simplify_1.Eval_simplify);
    symbol_1.std_symbol(defs_1.SIN, sin_1.Eval_sin);
    symbol_1.std_symbol(defs_1.SINH, sinh_1.Eval_sinh);
    symbol_1.std_symbol(defs_1.SHAPE, shape_1.Eval_shape);
    symbol_1.std_symbol(defs_1.SQRT, eval_1.Eval_sqrt);
    symbol_1.std_symbol(defs_1.STOP, eval_1.Eval_stop);
    symbol_1.std_symbol(defs_1.SUBST, eval_1.Eval_subst);
    symbol_1.std_symbol(defs_1.SUM, sum_1.Eval_sum);
    symbol_1.std_symbol(defs_1.SYMBOLSINFO, symbol_1.Eval_symbolsinfo);
    symbol_1.std_symbol(defs_1.TAN, tan_1.Eval_tan);
    symbol_1.std_symbol(defs_1.TANH, tanh_1.Eval_tanh);
    symbol_1.std_symbol(defs_1.TAYLOR, taylor_1.Eval_taylor);
    symbol_1.std_symbol(defs_1.TEST, test_1.Eval_test);
    symbol_1.std_symbol(defs_1.TESTEQ, test_1.Eval_testeq);
    symbol_1.std_symbol(defs_1.TESTGE, test_1.Eval_testge);
    symbol_1.std_symbol(defs_1.TESTGT, test_1.Eval_testgt);
    symbol_1.std_symbol(defs_1.TESTLE, test_1.Eval_testle);
    symbol_1.std_symbol(defs_1.TESTLT, test_1.Eval_testlt);
    symbol_1.std_symbol(defs_1.TRANSPOSE, transpose_1.Eval_transpose);
    symbol_1.std_symbol(defs_1.UNIT, eval_1.Eval_unit);
    symbol_1.std_symbol(defs_1.ZERO, zero_1.Eval_zero);
    symbol_1.std_symbol(defs_1.NIL);
    symbol_1.std_symbol(defs_1.AUTOEXPAND);
    symbol_1.std_symbol(defs_1.BAKE);
    symbol_1.std_symbol(defs_1.ASSUME_REAL_VARIABLES);
    symbol_1.std_symbol(defs_1.LAST);
    symbol_1.std_symbol(defs_1.LAST_PRINT);
    symbol_1.std_symbol(defs_1.LAST_2DASCII_PRINT);
    symbol_1.std_symbol(defs_1.LAST_FULL_PRINT);
    symbol_1.std_symbol(defs_1.LAST_LATEX_PRINT);
    symbol_1.std_symbol(defs_1.LAST_LIST_PRINT);
    symbol_1.std_symbol(defs_1.LAST_PLAIN_PRINT);
    symbol_1.std_symbol(defs_1.TRACE);
    symbol_1.std_symbol(defs_1.FORCE_FIXED_PRINTOUT);
    symbol_1.std_symbol(defs_1.MAX_FIXED_PRINTOUT_DIGITS);
    symbol_1.std_symbol(defs_1.YYE);
    symbol_1.std_symbol(defs_1.DRAWX); // special purpose internal symbols
    symbol_1.std_symbol(defs_1.METAA);
    symbol_1.std_symbol(defs_1.METAB);
    symbol_1.std_symbol(defs_1.METAX);
    symbol_1.std_symbol(defs_1.SECRETX);
    symbol_1.std_symbol(defs_1.VERSION);
    symbol_1.std_symbol(defs_1.PI);
    symbol_1.std_symbol(defs_1.SYMBOL_A);
    symbol_1.std_symbol(defs_1.SYMBOL_B);
    symbol_1.std_symbol(defs_1.SYMBOL_C);
    symbol_1.std_symbol(defs_1.SYMBOL_D);
    symbol_1.std_symbol(defs_1.SYMBOL_I);
    symbol_1.std_symbol(defs_1.SYMBOL_J);
    symbol_1.std_symbol(defs_1.SYMBOL_N);
    symbol_1.std_symbol(defs_1.SYMBOL_R);
    symbol_1.std_symbol(defs_1.SYMBOL_S);
    symbol_1.std_symbol(defs_1.SYMBOL_T);
    symbol_1.std_symbol(defs_1.SYMBOL_X);
    symbol_1.std_symbol(defs_1.SYMBOL_Y);
    symbol_1.std_symbol(defs_1.SYMBOL_Z);
    symbol_1.std_symbol(defs_1.SYMBOL_IDENTITY_MATRIX);
    symbol_1.std_symbol(defs_1.SYMBOL_A_UNDERSCORE);
    symbol_1.std_symbol(defs_1.SYMBOL_B_UNDERSCORE);
    symbol_1.std_symbol(defs_1.SYMBOL_X_UNDERSCORE);
    symbol_1.std_symbol(defs_1.C1);
    symbol_1.std_symbol(defs_1.C2);
    symbol_1.std_symbol(defs_1.C3);
    symbol_1.std_symbol(defs_1.C4);
    symbol_1.std_symbol(defs_1.C5);
    symbol_1.std_symbol(defs_1.C6);
    defineSomeHandyConstants();
    // don't add all these functions to the
    // symbolsDependencies, clone the original
    const originalCodeGen = defs_1.defs.codeGen;
    defs_1.defs.codeGen = false;
    for (let defn_i = 0; defn_i < defn_str.length; defn_i++) {
        const definitionOfInterest = defn_str[defn_i];
        const [, def] = scan_1.scan(definitionOfInterest);
        if (defs_1.DEBUG) {
            console.log(`... evaling ${definitionOfInterest}`);
            console.log('top of stack:');
            console.log(print_1.print_list(def));
        }
        eval_1.Eval(def);
    }
    // restore the symbol dependencies as they were before.
    defs_1.defs.codeGen = originalCodeGen;
}
exports.defn = defn;
function defineSomeHandyConstants() {
    // i is the square root of -1 i.e. -1 ^ 1/2
    const imaginaryunit = list_1.makeList(symbol_1.symbol(defs_1.POWER), bignum_1.integer(-1), bignum_1.rational(1, 2));
    if (defs_1.DEBUG) {
        console.log(print_1.print_list(imaginaryunit));
    }
    defs_1.Constants.imaginaryunit = imaginaryunit; // must be untagged in gc
}
