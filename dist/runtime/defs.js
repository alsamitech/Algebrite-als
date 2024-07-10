"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalFloats = exports.evalPolar = exports.doexpand = exports.noexpand = exports.Constants = exports.$ = exports.reset_after_error = exports.MEQUAL = exports.MZERO = exports.MSIGN = exports.isidentitymatrix = exports.isinv = exports.istranspose = exports.isinnerordot = exports.isfactorial = exports.ispower = exports.ismultiply = exports.isadd = exports.caddaddr = exports.cdddaddr = exports.caddadr = exports.cddaddr = exports.cadaddr = exports.caddddr = exports.cddddr = exports.cadddr = exports.cdaddr = exports.caddar = exports.cadadr = exports.caaddr = exports.cdddr = exports.cddar = exports.cdadr = exports.cadar = exports.caddr = exports.caadr = exports.cddr = exports.cdar = exports.cadr = exports.caar = exports.cdr = exports.car = exports.issymbol = exports.isNumericAtomOrTensor = exports.istensor = exports.isstr = exports.isNumericAtom = exports.isdouble = exports.isrational = exports.iscons = exports.dotprod_unicode = exports.transpose_unicode = exports.logbuf = exports.mtotal = exports.primetab = exports.parse_time_simplifications = exports.predefinedSymbolsInGlobalScope_doNotTrackInDependencies = exports.MAXDIM = exports.MAX_CONSECUTIVE_APPLICATIONS_OF_SINGLE_RULE = exports.MAX_CONSECUTIVE_APPLICATIONS_OF_ALL_RULES = exports.MAXPRIMETAB = exports.E = exports.C6 = exports.C5 = exports.C4 = exports.C3 = exports.C2 = exports.C1 = exports.SYMBOL_X_UNDERSCORE = exports.SYMBOL_B_UNDERSCORE = exports.SYMBOL_A_UNDERSCORE = exports.SYMBOL_IDENTITY_MATRIX = exports.SYMBOL_Z = exports.SYMBOL_Y = exports.SYMBOL_X = exports.SYMBOL_T = exports.SYMBOL_S = exports.SYMBOL_R = exports.SYMBOL_N = exports.SYMBOL_J = exports.SYMBOL_I = exports.SYMBOL_D = exports.SYMBOL_C = exports.SYMBOL_B = exports.SYMBOL_A = exports.PI = exports.VERSION = exports.SECRETX = exports.METAX = exports.METAB = exports.METAA = exports.DRAWX = exports.YYE = exports.MAX_FIXED_PRINTOUT_DIGITS = exports.FORCE_FIXED_PRINTOUT = exports.TRACE = exports.ASSUME_REAL_VARIABLES = exports.BAKE = exports.AUTOEXPAND = exports.LAST_PLAIN_PRINT = exports.LAST_LIST_PRINT = exports.LAST_LATEX_PRINT = exports.LAST_FULL_PRINT = exports.LAST_2DASCII_PRINT = exports.LAST_PRINT = exports.LAST = exports.NIL = exports.ZERO = exports.UNIT = exports.TRANSPOSE = exports.TESTLT = exports.TESTLE = exports.TESTGT = exports.TESTGE = exports.TESTEQ = exports.TEST = exports.TAYLOR = exports.TANH = exports.TAN = exports.SYMBOLSINFO = exports.SUM = exports.SUBST = exports.STOP = exports.SQRT = exports.SHAPE = exports.SINH = exports.SIN = exports.SIMPLIFY = exports.SILENTPATTERN = exports.SGN = exports.SETQ = exports.ROOTS = exports.YYRECT = exports.ROUND = exports.REAL = exports.RATIONALIZE = exports.RANK = exports.QUOTIENT = exports.QUOTE = exports.PRODUCT = exports.PRINTPLAIN = exports.PRINTLIST = exports.PRINTLATEX = exports.PRINTFULL = exports.PRINT2DASCII = exports.PRINT = exports.PRINT_LEAVE_X_ALONE = exports.PRINT_LEAVE_E_ALONE = exports.PRIME = exports.POWER = exports.POLAR = exports.PATTERNSINFO = exports.PATTERN = exports.OUTER = exports.OR = exports.OPERATOR = exports.NUMERATOR = exports.NUMBER = exports.NROOTS = exports.NOT = exports.MULTIPLY = exports.MOD = exports.LOOKUP = exports.LOG = exports.LEGENDRE = exports.LEADING = exports.LCM = exports.LAGUERRE = exports.ISPRIME = exports.ISINTEGER = exports.INVG = exports.INV = exports.INTEGRAL = exports.INNER = exports.INDEX = exports.IMAG = exports.HILBERT = exports.HERMITE = exports.GCD = exports.GAMMA = exports.FUNCTION = exports.FOR = exports.FLOOR = exports.FLOATF = exports.FILTER = exports.FACTORPOLY = exports.FACTORIAL = exports.FACTOR = exports.EXPSIN = exports.EXPCOS = exports.EXPAND = exports.EXP = exports.EVAL = exports.ERFC = exports.ERF = exports.EIGENVEC = exports.EIGENVAL = exports.EIGEN = exports.DSOLVE = exports.DRAW = exports.DOT = exports.DO = exports.DIVISORS = exports.DIRAC = exports.DIM = exports.DET = exports.DERIVATIVE = exports.DENOMINATOR = exports.DEGREE = exports.DEFINT = exports.DECOMP = exports.COSH = exports.COS = exports.CONTRACT = exports.CONJ = exports.CONDENSE = exports.COFACTOR = exports.COEFF = exports.CLOCK = exports.CLEARPATTERNS = exports.CLEARALL = exports.CLEAR = exports.CIRCEXP = exports.CHOOSE = exports.CHECK = exports.CEILING = exports.BINOMIAL = exports.BINDING = exports.BESSELY = exports.BESSELJ = exports.ATOMIZE = exports.ARG = exports.ARCTANH = exports.ARCTAN = exports.ARCSINH = exports.ARCSIN = exports.ARCCOSH = exports.ARCCOS = exports.APPROXRATIO = exports.AND = exports.ADJ = exports.ADD = exports.ABS = exports.SYM = exports.TENSOR = exports.STR = exports.DOUBLE = exports.NUM = exports.CONS = exports.Sym = exports.Tensor = exports.Str = exports.Double = exports.Num = exports.Cons = exports.BaseAtom = exports.avoidCalculatingPowersIntoArctans = exports.do_simplify_nested_radicals = exports.dontCreateNewRadicalsInDenominatorWhenEvalingMultiplication = exports.defs = exports.PRINTMODE_LIST = exports.PRINTMODE_HUMAN = exports.PRINTMODE_COMPUTER = exports.PRINTMODE_2DASCII = exports.PRINTMODE_LATEX = exports.PRINTOUTRESULT = exports.DEBUG = exports.NSYM = exports.version = exports.breakpoint = void 0;
const big_integer_1 = __importDefault(require("big-integer"));
const print_1 = require("../sources/print");
const symbol_1 = require("./symbol");
function breakpoint() { }
exports.breakpoint = breakpoint;
// also change the version in the package.json file
exports.version = '1.3.1';
const SELFTEST = 1;
// size of the symbol table
exports.NSYM = 1000;
exports.DEBUG = false;
exports.PRINTOUTRESULT = false;
// printing-related constants
exports.PRINTMODE_LATEX = 'PRINTMODE_LATEX';
exports.PRINTMODE_2DASCII = 'PRINTMODE_2DASCII';
exports.PRINTMODE_COMPUTER = 'PRINTMODE_COMPUTER';
exports.PRINTMODE_HUMAN = 'PRINTMODE_HUMAN';
exports.PRINTMODE_LIST = 'PRINTMODE_LIST';
class Defs {
    constructor() {
        // when the user uses the generic "print" statement
        // this setting kicks-in.
        this.printMode = exports.PRINTMODE_COMPUTER;
        this.recursionLevelNestedRadicalsRemoval = 0;
        this.errorMessage = '';
        // needed for the mechanism to
        // find all dependencies between variables
        // in a script
        this.symbolsDependencies = {};
        this.symbolsHavingReassignments = [];
        this.symbolsInExpressionsWithoutAssignments = [];
        this.patternHasBeenFound = false;
        this.inited = false;
        this.chainOfUserSymbolsNotFunctionsBeingEvaluated = [];
        this.stringsEmittedByUserPrintouts = '';
        // flag use to potentially switch on/off some quirks "deep"
        // in the code due to call from Algebra block.
        // Currently not used.
        this.called_from_Algebra_block = false;
        this.expanding = false;
        this.evaluatingAsFloats = false;
        this.evaluatingPolar = false;
        this.esc_flag = false;
        this.trigmode = 0;
        this.out_count = 0;
        this.test_flag = false;
        this.codeGen = false;
        this.userSimplificationsInListForm = [];
        this.userSimplificationsInStringForm = [];
        this.fullDoubleOutput = false;
    }
}
exports.defs = new Defs();
exports.dontCreateNewRadicalsInDenominatorWhenEvalingMultiplication = true;
exports.do_simplify_nested_radicals = true;
exports.avoidCalculatingPowersIntoArctans = true;
// Symbolic expressions are built by connecting U structs.
//
// For example, (a b + c) is built like this:
//
//           _______      _______                                _______
//          |CONS   |--->|CONS   |----------------------------->|CONS   |
//          |       |    |       |                              |       |
//          |_______|    |_______|                              |_______|
//              |            |                                      |
//           ___v___      ___v___      _______      _______      ___v___
//          |ADD    |    |CONS   |--->|CONS   |--->|CONS   |    |SYM c  |
//          |       |    |       |    |       |    |       |    |       |
//          |_______|    |_______|    |_______|    |_______|    |_______|
//                           |            |            |
//                        ___v___      ___v___      ___v___
//                       |MUL    |    |SYM a  |    |SYM b  |
//                       |       |    |       |    |       |
//                       |_______|    |_______|    |_______|
class BaseAtom {
    toString() {
        return print_1.print_expr(this);
    }
    toLatexString() {
        return print_1.collectLatexStringFromReturnValue(this);
    }
}
exports.BaseAtom = BaseAtom;
class Cons extends BaseAtom {
    constructor(car, cdr) {
        super();
        this.k = exports.CONS;
        this.cons = { car, cdr };
    }
    *[Symbol.iterator]() {
        let u = this;
        while (iscons(u)) {
            yield car(u);
            u = cdr(u);
        }
    }
    // Return everything except the first item in the list
    tail() {
        if (iscons(this.cons.cdr)) {
            return [...this.cons.cdr];
        }
        return [];
    }
    map(f) {
        const a = car(this);
        let b = cdr(this);
        if (iscons(b)) {
            b = b.map(f);
        }
        return new Cons(f(a), b);
    }
}
exports.Cons = Cons;
class Num extends BaseAtom {
    constructor(a, b = big_integer_1.default.one) {
        super();
        this.a = a;
        this.b = b;
        this.q = this;
        this.k = exports.NUM;
    }
}
exports.Num = Num;
class Double extends BaseAtom {
    constructor(d) {
        super();
        this.d = d;
        this.k = exports.DOUBLE;
    }
}
exports.Double = Double;
class Str extends BaseAtom {
    constructor(str) {
        super();
        this.str = str;
        this.k = exports.STR;
    }
}
exports.Str = Str;
class Tensor extends BaseAtom {
    constructor() {
        super(...arguments);
        this.tensor = this;
        this.k = exports.TENSOR;
        this.ndim = 0; // number of dimensions
        this.dim = []; // dimension length, for each dimension
        this.elem = []; // an array containing all the data
    }
    get nelem() {
        return this.elem.length;
    }
}
exports.Tensor = Tensor;
class Sym extends BaseAtom {
    constructor(printname) {
        super();
        this.printname = printname;
        this.k = exports.SYM;
    }
}
exports.Sym = Sym;
// the following enum is for struct U, member k
exports.CONS = 0;
exports.NUM = 1;
exports.DOUBLE = 2;
exports.STR = 3;
exports.TENSOR = 4;
exports.SYM = 5;
// the following enum is for indexing the symbol table
// standard functions first, then nil, then everything else
let counter = 0;
exports.ABS = 'abs';
exports.ADD = 'add';
exports.ADJ = 'adj';
exports.AND = 'and';
exports.APPROXRATIO = 'approxratio';
exports.ARCCOS = 'arccos';
exports.ARCCOSH = 'arccosh';
exports.ARCSIN = 'arcsin';
exports.ARCSINH = 'arcsinh';
exports.ARCTAN = 'arctan';
exports.ARCTANH = 'arctanh';
exports.ARG = 'arg';
exports.ATOMIZE = 'atomize';
exports.BESSELJ = 'besselj';
exports.BESSELY = 'bessely';
exports.BINDING = 'binding';
exports.BINOMIAL = 'binomial';
exports.CEILING = 'ceiling';
exports.CHECK = 'check';
exports.CHOOSE = 'choose';
exports.CIRCEXP = 'circexp';
exports.CLEAR = 'clear';
exports.CLEARALL = 'clearall';
exports.CLEARPATTERNS = 'clearpatterns';
exports.CLOCK = 'clock';
exports.COEFF = 'coeff';
exports.COFACTOR = 'cofactor';
exports.CONDENSE = 'condense';
exports.CONJ = 'conj';
exports.CONTRACT = 'contract';
exports.COS = 'cos';
exports.COSH = 'cosh';
exports.DECOMP = 'decomp';
exports.DEFINT = 'defint';
exports.DEGREE = 'deg';
exports.DENOMINATOR = 'denominator';
exports.DERIVATIVE = 'derivative';
exports.DET = 'det';
exports.DIM = 'dim';
exports.DIRAC = 'dirac';
exports.DIVISORS = 'divisors';
exports.DO = 'do';
exports.DOT = 'dot';
exports.DRAW = 'draw';
exports.DSOLVE = 'dsolve';
exports.EIGEN = 'eigen';
exports.EIGENVAL = 'eigenval';
exports.EIGENVEC = 'eigenvec';
exports.ERF = 'erf';
exports.ERFC = 'erfc';
exports.EVAL = 'eval';
exports.EXP = 'exp';
exports.EXPAND = 'expand';
exports.EXPCOS = 'expcos';
exports.EXPSIN = 'expsin';
exports.FACTOR = 'factor';
exports.FACTORIAL = 'factorial';
exports.FACTORPOLY = 'factorpoly';
exports.FILTER = 'filter';
exports.FLOATF = 'float';
exports.FLOOR = 'floor';
exports.FOR = 'for';
exports.FUNCTION = 'function';
exports.GAMMA = 'Gamma';
exports.GCD = 'gcd';
exports.HERMITE = 'hermite';
exports.HILBERT = 'hilbert';
exports.IMAG = 'imag';
exports.INDEX = 'component';
exports.INNER = 'inner';
exports.INTEGRAL = 'integral';
exports.INV = 'inv';
exports.INVG = 'invg';
exports.ISINTEGER = 'isinteger';
exports.ISPRIME = 'isprime';
exports.LAGUERRE = 'laguerre';
//  LAPLACE = 
exports.LCM = 'lcm';
exports.LEADING = 'leading';
exports.LEGENDRE = 'legendre';
exports.LOG = 'log';
exports.LOOKUP = 'lookup';
exports.MOD = 'mod';
exports.MULTIPLY = 'multiply';
exports.NOT = 'not';
exports.NROOTS = 'nroots';
exports.NUMBER = 'number';
exports.NUMERATOR = 'numerator';
exports.OPERATOR = 'operator';
exports.OR = 'or';
exports.OUTER = 'outer';
exports.PATTERN = 'pattern';
exports.PATTERNSINFO = 'patternsinfo';
exports.POLAR = 'polar';
exports.POWER = 'power';
exports.PRIME = 'prime';
exports.PRINT_LEAVE_E_ALONE = 'printLeaveEAlone';
exports.PRINT_LEAVE_X_ALONE = 'printLeaveXAlone';
exports.PRINT = 'print';
exports.PRINT2DASCII = 'print2dascii';
exports.PRINTFULL = 'printcomputer';
exports.PRINTLATEX = 'printlatex';
exports.PRINTLIST = 'printlist';
exports.PRINTPLAIN = 'printhuman';
exports.PRODUCT = 'product';
exports.QUOTE = 'quote';
exports.QUOTIENT = 'quotient';
exports.RANK = 'rank';
exports.RATIONALIZE = 'rationalize';
exports.REAL = 'real';
exports.ROUND = 'round';
exports.YYRECT = 'rect';
exports.ROOTS = 'roots';
exports.SETQ = 'equals';
exports.SGN = 'sgn';
exports.SILENTPATTERN = 'silentpattern';
exports.SIMPLIFY = 'simplify';
exports.SIN = 'sin';
exports.SINH = 'sinh';
exports.SHAPE = 'shape';
exports.SQRT = 'sqrt';
exports.STOP = 'stop';
exports.SUBST = 'subst';
exports.SUM = 'sum';
exports.SYMBOLSINFO = 'symbolsinfo';
exports.TAN = 'tan';
exports.TANH = 'tanh';
exports.TAYLOR = 'taylor';
exports.TEST = 'test';
exports.TESTEQ = 'testeq';
exports.TESTGE = 'testge';
exports.TESTGT = 'testgt';
exports.TESTLE = 'testle';
exports.TESTLT = 'testlt';
exports.TRANSPOSE = 'transpose';
exports.UNIT = 'unit';
exports.ZERO = 'zero';
// ALL THE SYMBOLS ABOVE NIL ARE KEYWORDS,
// WHICH MEANS THAT USER CANNOT REDEFINE THEM
exports.NIL = 'nil'; // nil goes here, after standard functions
exports.LAST = 'last';
exports.LAST_PRINT = 'lastprint';
exports.LAST_2DASCII_PRINT = 'last2dasciiprint';
exports.LAST_FULL_PRINT = 'lastfullprint';
exports.LAST_LATEX_PRINT = 'lastlatexprint';
exports.LAST_LIST_PRINT = 'lastlistprint';
exports.LAST_PLAIN_PRINT = 'lastplainprint';
exports.AUTOEXPAND = 'autoexpand';
exports.BAKE = 'bake';
exports.ASSUME_REAL_VARIABLES = 'assumeRealVariables';
exports.TRACE = 'trace';
exports.FORCE_FIXED_PRINTOUT = 'forceFixedPrintout';
exports.MAX_FIXED_PRINTOUT_DIGITS = 'maxFixedPrintoutDigits';
exports.YYE = '~'; // tilde so sort puts it after other symbols
exports.DRAWX = '$DRAWX'; // special purpose internal symbols
exports.METAA = '$METAA';
exports.METAB = '$METAB';
exports.METAX = '$METAX';
exports.SECRETX = '$SECRETX';
exports.VERSION = 'version';
exports.PI = 'pi';
exports.SYMBOL_A = 'a';
exports.SYMBOL_B = 'b';
exports.SYMBOL_C = 'c';
exports.SYMBOL_D = 'd';
exports.SYMBOL_I = 'i';
exports.SYMBOL_J = 'j';
exports.SYMBOL_N = 'n';
exports.SYMBOL_R = 'r';
exports.SYMBOL_S = 's';
exports.SYMBOL_T = 't';
exports.SYMBOL_X = 'x';
exports.SYMBOL_Y = 'y';
exports.SYMBOL_Z = 'z';
exports.SYMBOL_IDENTITY_MATRIX = 'I';
exports.SYMBOL_A_UNDERSCORE = 'a_';
exports.SYMBOL_B_UNDERSCORE = 'b_';
exports.SYMBOL_X_UNDERSCORE = 'x_';
exports.C1 = '$C1';
exports.C2 = '$C2';
exports.C3 = '$C3';
exports.C4 = '$C4';
exports.C5 = '$C5';
exports.C6 = '$C6';
exports.E = exports.YYE;
exports.MAXPRIMETAB = 10000;
exports.MAX_CONSECUTIVE_APPLICATIONS_OF_ALL_RULES = 5;
exports.MAX_CONSECUTIVE_APPLICATIONS_OF_SINGLE_RULE = 10;
//define _USE_MATH_DEFINES // for MS C++
exports.MAXDIM = 24;
exports.predefinedSymbolsInGlobalScope_doNotTrackInDependencies = [
    'rationalize',
    'abs',
    'e',
    'i',
    'pi',
    'sin',
    'ceiling',
    'cos',
    'roots',
    'integral',
    'derivative',
    'defint',
    'sqrt',
    'eig',
    'cov',
    'deig',
    'dcov',
    'float',
    'floor',
    'product',
    'root',
    'round',
    'sum',
    'test',
    'unit',
];
// you can do some little simplifications
// at parse time, such as calculating away
// immediately simple operations on
// constants, removing 1s from products
// etc.
exports.parse_time_simplifications = true;
exports.primetab = (function () {
    const primes = [2];
    let i = 3;
    while (primes.length < exports.MAXPRIMETAB) {
        let j = 0;
        const ceil = Math.sqrt(i);
        while (j < primes.length && primes[j] <= ceil) {
            if (i % primes[j] === 0) {
                j = -1;
                break;
            }
            j++;
        }
        if (j !== -1) {
            primes.push(i);
        }
        i += 2;
    }
    primes[exports.MAXPRIMETAB] = 0;
    return primes;
})();
let draw_flag = false;
exports.mtotal = 0;
exports.logbuf = '';
const arglist = []; // will contain U
const draw_stop_return = null; // extern jmp_buf ?????
exports.transpose_unicode = 7488;
exports.dotprod_unicode = 183;
function iscons(p) {
    return p.k === exports.CONS;
}
exports.iscons = iscons;
function isrational(p) {
    return p.k === exports.NUM;
}
exports.isrational = isrational;
function isdouble(p) {
    return p.k === exports.DOUBLE;
}
exports.isdouble = isdouble;
function isNumericAtom(p) {
    return isrational(p) || isdouble(p);
}
exports.isNumericAtom = isNumericAtom;
function isstr(p) {
    return p.k === exports.STR;
}
exports.isstr = isstr;
function istensor(p) {
    return p.k === exports.TENSOR;
}
exports.istensor = istensor;
// because of recursion, we consider a scalar to be
// a tensor, so a numeric scalar will return true
function isNumericAtomOrTensor(p) {
    if (isNumericAtom(p) || p === symbol_1.symbol(exports.SYMBOL_IDENTITY_MATRIX)) {
        return true;
    }
    if (!istensor(p)) {
        //console.log "p not an atom nor a tensor: " + p
        return false;
    }
    const n = p.tensor.nelem;
    const a = p.tensor.elem;
    for (let i = 0; i < n; i++) {
        if (!isNumericAtomOrTensor(a[i])) {
            //console.log "non-numeric element: " + a[i]
            return false;
        }
    }
    return true;
}
exports.isNumericAtomOrTensor = isNumericAtomOrTensor;
function issymbol(p) {
    return p.k === exports.SYM;
}
exports.issymbol = issymbol;
function car(p) {
    if (iscons(p)) {
        return p.cons.car;
    }
    else {
        return symbol_1.symbol(exports.NIL);
    }
}
exports.car = car;
function cdr(p) {
    if (iscons(p)) {
        return p.cons.cdr;
    }
    else {
        return symbol_1.symbol(exports.NIL);
    }
}
exports.cdr = cdr;
function caar(p) {
    return car(car(p));
}
exports.caar = caar;
function cadr(p) {
    return car(cdr(p));
}
exports.cadr = cadr;
function cdar(p) {
    return cdr(car(p));
}
exports.cdar = cdar;
function cddr(p) {
    return cdr(cdr(p));
}
exports.cddr = cddr;
function caadr(p) {
    return car(car(cdr(p)));
}
exports.caadr = caadr;
function caddr(p) {
    return car(cdr(cdr(p)));
}
exports.caddr = caddr;
function cadar(p) {
    return car(cdr(car(p)));
}
exports.cadar = cadar;
function cdadr(p) {
    return cdr(car(cdr(p)));
}
exports.cdadr = cdadr;
function cddar(p) {
    return cdr(cdr(car(p)));
}
exports.cddar = cddar;
function cdddr(p) {
    return cdr(cdr(cdr(p)));
}
exports.cdddr = cdddr;
function caaddr(p) {
    return car(car(cdr(cdr(p))));
}
exports.caaddr = caaddr;
function cadadr(p) {
    return car(cdr(car(cdr(p))));
}
exports.cadadr = cadadr;
function caddar(p) {
    return car(cdr(cdr(car(p))));
}
exports.caddar = caddar;
function cdaddr(p) {
    return cdr(car(cdr(cdr(p))));
}
exports.cdaddr = cdaddr;
function cadddr(p) {
    return car(cdr(cdr(cdr(p))));
}
exports.cadddr = cadddr;
function cddddr(p) {
    return cdr(cdr(cdr(cdr(p))));
}
exports.cddddr = cddddr;
function caddddr(p) {
    return car(cdr(cdr(cdr(cdr(p)))));
}
exports.caddddr = caddddr;
function cadaddr(p) {
    return car(cdr(car(cdr(cdr(p)))));
}
exports.cadaddr = cadaddr;
function cddaddr(p) {
    return cdr(cdr(car(cdr(cdr(p)))));
}
exports.cddaddr = cddaddr;
function caddadr(p) {
    return car(cdr(cdr(car(cdr(p)))));
}
exports.caddadr = caddadr;
function cdddaddr(p) {
    return cdr(cdr(cdr(car(cdr(cdr(p))))));
}
exports.cdddaddr = cdddaddr;
function caddaddr(p) {
    return car(cdr(cdr(car(cdr(cdr(p))))));
}
exports.caddaddr = caddaddr;
function isadd(p) {
    return car(p) === symbol_1.symbol(exports.ADD);
}
exports.isadd = isadd;
function ismultiply(p) {
    return car(p) === symbol_1.symbol(exports.MULTIPLY);
}
exports.ismultiply = ismultiply;
function ispower(p) {
    return car(p) === symbol_1.symbol(exports.POWER);
}
exports.ispower = ispower;
function isfactorial(p) {
    return car(p) === symbol_1.symbol(exports.FACTORIAL);
}
exports.isfactorial = isfactorial;
function isinnerordot(p) {
    return car(p) === symbol_1.symbol(exports.INNER) || car(p) === symbol_1.symbol(exports.DOT);
}
exports.isinnerordot = isinnerordot;
function istranspose(p) {
    return car(p) === symbol_1.symbol(exports.TRANSPOSE);
}
exports.istranspose = istranspose;
function isinv(p) {
    return car(p) === symbol_1.symbol(exports.INV);
}
exports.isinv = isinv;
// TODO this is a bit of a shallow check, we should
// check when we are passed an actual tensor and possibly
// cache the test result.
function isidentitymatrix(p) {
    return p === symbol_1.symbol(exports.SYMBOL_IDENTITY_MATRIX);
}
exports.isidentitymatrix = isidentitymatrix;
function MSIGN(p) {
    if (p.isPositive()) {
        return 1;
    }
    else if (p.isZero()) {
        return 0;
    }
    else {
        return -1;
    }
}
exports.MSIGN = MSIGN;
function MLENGTH(p) {
    return p.toString().length;
}
function MZERO(p) {
    return p.isZero();
}
exports.MZERO = MZERO;
function MEQUAL(p, n) {
    if (p == null) {
        breakpoint;
    }
    return p.equals(n);
}
exports.MEQUAL = MEQUAL;
function reset_after_error() {
    exports.defs.esc_flag = false;
    draw_flag = false;
    exports.defs.evaluatingAsFloats = false;
    exports.defs.evaluatingPolar = false;
}
exports.reset_after_error = reset_after_error;
exports.$ = {};
class Constants {
    static One() {
        return exports.defs.evaluatingAsFloats ? Constants.oneAsDouble : Constants.one;
    }
    static NegOne() {
        return exports.defs.evaluatingAsFloats
            ? Constants.negOneAsDouble
            : Constants.negOne;
    }
    static Zero() {
        return exports.defs.evaluatingAsFloats ? Constants.zeroAsDouble : Constants.zero;
    }
    static Pi() {
        return exports.defs.evaluatingAsFloats ? Constants.piAsDouble : symbol_1.symbol(exports.PI);
    }
}
exports.Constants = Constants;
Constants.one = new Num(big_integer_1.default(1));
Constants.oneAsDouble = new Double(1.0);
Constants.negOne = new Num(big_integer_1.default(-1));
Constants.negOneAsDouble = new Double(-1.0);
Constants.zero = new Num(big_integer_1.default(0));
Constants.zeroAsDouble = new Double(0.0);
Constants.piAsDouble = new Double(Math.PI);
// Call a function temporarily setting "expanding" to false
function noexpand(func, ...args) {
    const prev_expanding = exports.defs.expanding;
    exports.defs.expanding = false;
    try {
        return func(...args);
    }
    finally {
        exports.defs.expanding = prev_expanding;
    }
}
exports.noexpand = noexpand;
// Call a function temporarily setting "expanding" to true
function doexpand(func, ...args) {
    const prev_expanding = exports.defs.expanding;
    exports.defs.expanding = true;
    try {
        return func(...args);
    }
    finally {
        exports.defs.expanding = prev_expanding;
    }
}
exports.doexpand = doexpand;
// Call a function temporarily setting "evaluatingPolar" to true
function evalPolar(func, ...args) {
    const prev_evaluatingPolar = exports.defs.evaluatingPolar;
    exports.defs.evaluatingPolar = true;
    try {
        return func(...args);
    }
    finally {
        exports.defs.evaluatingPolar = prev_evaluatingPolar;
    }
}
exports.evalPolar = evalPolar;
// Call a function temporarily setting "evaluatingAsFloats" to true
function evalFloats(func, ...args) {
    const prev_evaluatingAsFloats = exports.defs.evaluatingAsFloats;
    exports.defs.evaluatingAsFloats = true;
    try {
        return func(...args);
    }
    finally {
        exports.defs.evaluatingAsFloats = prev_evaluatingAsFloats;
    }
}
exports.evalFloats = evalFloats;
