"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear_symbol = exports.clearRenamedVariablesToAvoidBindingToExternalScope = exports.iskeyword = exports.symbol = exports.collectUserSymbols = exports.clear_symbols = exports.reset_symbols = exports.get_binding = exports.set_binding = exports.get_printname = exports.usr_symbol = exports.std_symbol = exports.inChildScope = exports.Eval_symbolsinfo = void 0;
const count_1 = require("./count");
const defs_1 = require("./defs");
const run_1 = require("./run");
// The symbol table is a simple array of struct U.
// put symbol at index n
function Eval_symbolsinfo() {
    const symbolsinfoToBePrinted = symbolsinfo();
    if (symbolsinfoToBePrinted !== '') {
        return new defs_1.Str(symbolsinfoToBePrinted);
    }
    else {
        return symbol(defs_1.NIL);
    }
}
exports.Eval_symbolsinfo = Eval_symbolsinfo;
function symbolsinfo() {
    return [...userScope.symbolinfo()].join('\n');
}
class Scope {
    constructor(parent) {
        this.parent = parent;
        this.symbols = new Map();
        this.bindings = new Map();
    }
    getOrCreate(name) {
        const existing = this.getExisting(name);
        if (existing)
            return existing;
        const sym = new defs_1.Sym(name);
        this.symbols.set(name, sym);
        return sym;
    }
    getExisting(name) {
        var _a;
        return ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.getExisting(name)) || this.symbols.get(name);
    }
    mustGet(name) {
        var _a;
        return this.symbols.get(name) || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.mustGet(name)) || run_1.stop(`${name} not defined`);
    }
    has(s) {
        return this.symbols.has(s.printname);
    }
    binding(sym) {
        var _a;
        return this.bindings.get(sym.printname) || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.binding(sym)) || sym;
    }
    set(sym, value) {
        this.bindings.set(sym.printname, value);
    }
    clear() {
        this.bindings.clear();
    }
    delete(s) {
        var _a;
        this.symbols.delete(s.printname);
        this.bindings.delete(s.printname);
        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.delete(s);
    }
    *symbolinfo() {
        if (this.parent) {
            yield* this.parent.symbolinfo();
        }
        for (const [name, sym] of this.symbols.entries()) {
            const binding = this.bindings.get(name) || sym;
            const bindingi = (binding + '').substring(0, 4);
            yield `symbol: ${sym} size: ${count_1.countsize(binding)} value: ${bindingi}...`;
        }
    }
    clearRenamedVariablesToAvoidBindingToExternalScope() {
        var _a;
        for (const name of this.symbols.keys()) {
            if (name.indexOf('AVOID_BINDING_TO_EXTERNAL_SCOPE_VALUE') !== -1) {
                this.symbols.delete(name);
            }
        }
        for (const name of this.bindings.keys()) {
            if (name.indexOf('AVOID_BINDING_TO_EXTERNAL_SCOPE_VALUE') !== -1) {
                this.bindings.delete(name);
            }
        }
        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.clearRenamedVariablesToAvoidBindingToExternalScope();
    }
}
let keywordScope = new Scope();
let userScope = new Scope(keywordScope);
function inChildScope(f) {
    let savedScope = userScope;
    try {
        userScope = new Scope(userScope);
        return f();
    }
    finally {
        userScope = savedScope;
    }
}
exports.inChildScope = inChildScope;
function std_symbol(s, keyword) {
    // TODO: can we delete latexPrint?
    const sym = keywordScope.getOrCreate(s);
    sym.latexPrint = s;
    sym.keyword = keyword;
}
exports.std_symbol = std_symbol;
// symbol lookup, or symbol creation if symbol doesn't exist yet
// this happens often from the scanner. When the scanner sees something
// like myVar = 2, it create a tree (SETQ ("myVar" symbol as created/looked up here (2)))
// user-defined functions also have a usr symbol.
//
// Note that some symbols like, say, "abs",
// are picked up by the scanner directly as keywords,
// so they are not looked up via this.
// So in fact you could redefine abs to be abs(x) = x
// but still abs would be picked up by the scanner as a particular
// node type and calls to abs() will be always to the "native" abs
//
// Also note that some symbols such as "zero" are (strangely) not picked up by
// the scanner as special nodes, rather they are identified as keywords
// (e.g. not redefinable) at time of symbol lookup (in Eval_sym) and
// evalled, where eval has a case for ZERO.
//
// Also note that there are a number of symbols, such as a,b,c,x,y,z,...
// that are actually created by std_symbols.
// They are not special node types (like abs), they are normal symbols
// that are looked up, but the advantage is that since they are often
// used internally by algebrite, we create the symbol in advance and
// we can reference the symbol entry in a clean way
// (e.g. symbol(SYMBOL_X)) rather than
// by looking up a string.
function usr_symbol(s) {
    return userScope.getOrCreate(s);
}
exports.usr_symbol = usr_symbol;
// get the symbol's printname
function get_printname(p) {
    if (p.k !== defs_1.SYM) {
        run_1.stop('symbol error');
    }
    return p.printname;
}
exports.get_printname = get_printname;
// there are two Us at play here. One belongs to the
// symtab array and is the variable name.
// The other one is the U with the content, and that
// one will go in the corresponding "binding" array entry.
function set_binding(p, q) {
    if (p.k !== defs_1.SYM) {
        run_1.stop('symbol error');
    }
    userScope.set(p, q);
}
exports.set_binding = set_binding;
function get_binding(p) {
    if (p.k !== defs_1.SYM) {
        run_1.stop('symbol error');
    }
    return userScope.binding(p);
}
exports.get_binding = get_binding;
// the concept of user symbol is a little fuzzy
// beucase mathematics is full of symbols that actually
// have a special meaning, e.g. e,i,I in some cases j...
function is_usr_symbol(p) {
    if (p.k !== defs_1.SYM) {
        return false;
    }
    return /^[abcdjnrstxyz]_?$/.test(p.printname) || !keywordScope.has(p);
}
// total clearout of symbol table
function reset_symbols() {
    keywordScope = new Scope();
    userScope = new Scope(keywordScope);
}
exports.reset_symbols = reset_symbols;
function clear_symbols() {
    userScope = new Scope(keywordScope);
    keywordScope.clear();
}
exports.clear_symbols = clear_symbols;
// collect all the variables in a tree
function collectUserSymbols(p, accumulator) {
    if (accumulator == null) {
        accumulator = [];
    }
    if (is_usr_symbol(p)) {
        if (accumulator.indexOf(p) === -1) {
            accumulator.push(p);
            return;
        }
    }
    if (defs_1.istensor(p)) {
        for (let i = 0; i < p.tensor.nelem; i++) {
            collectUserSymbols(p.tensor.elem[i], accumulator);
        }
        return;
    }
    while (defs_1.iscons(p)) {
        collectUserSymbols(defs_1.car(p), accumulator);
        p = defs_1.cdr(p);
    }
}
exports.collectUserSymbols = collectUserSymbols;
function symbol(name) {
    // Should this just in the keywordScope?
    return userScope.mustGet(name);
}
exports.symbol = symbol;
function iskeyword(p) {
    return defs_1.issymbol(p) && p.keyword != null;
} // this transformation is done in run.coffee, see there
exports.iskeyword = iskeyword;
// for more info.
function clearRenamedVariablesToAvoidBindingToExternalScope() {
    userScope.clearRenamedVariablesToAvoidBindingToExternalScope();
}
exports.clearRenamedVariablesToAvoidBindingToExternalScope = clearRenamedVariablesToAvoidBindingToExternalScope;
function clear_symbol(s) {
    userScope.delete(s);
}
exports.clear_symbol = clear_symbol;
