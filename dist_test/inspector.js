"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defs_1 = require("./runtime/defs");
const misc_1 = require("./sources/misc");
class AtomFormatter {
    header(object) {
        if (!this.isValidAtom(object)) {
            return null;
        }
        return ['span', {}, this.atomTypeNode(object), this.summary(object)];
    }
    hasBody(object) {
        switch (object.k) {
            case defs_1.DOUBLE:
            case defs_1.STR:
            case defs_1.SYM:
                return false;
            case defs_1.CONS:
            case defs_1.TENSOR:
            case defs_1.NUM:
                return true;
        }
    }
    body(x) {
        if (x.k == defs_1.NUM) {
            return propertyList([
                { name: 'a', value: x.q.a.toString() },
                { name: 'b', value: x.q.b.toString() },
            ]);
        }
        else if (x.k == defs_1.CONS) {
            const items = defs_1.iscons(x) ? [...x] : [];
            return propertyList(items);
        }
        else if (x.k == defs_1.TENSOR) {
            const elems = split_tensor(x, 0, 0)[1];
            return propertyList(elems);
        }
        return null;
    }
    isValidAtom(x) {
        switch (x.constructor) {
            case defs_1.Cons:
            case defs_1.Num:
            case defs_1.Double:
            case defs_1.Sym:
            case defs_1.Str:
            case defs_1.Tensor:
                return true;
        }
        return false;
    }
    atomTypeNode(a) {
        return ['span', { style: 'font-weight: bold' }, this.atomType(a), ' '];
    }
    atomType(a) {
        switch (a.k) {
            case defs_1.CONS:
                return 'Cons';
            case defs_1.NUM:
                return 'Num';
            case defs_1.DOUBLE:
                return 'Double';
            case defs_1.STR:
                return 'String';
            case defs_1.TENSOR:
                return 'Tensor';
            case defs_1.SYM:
                return 'Sym';
        }
    }
    summary(a) {
        switch (a.k) {
            case defs_1.SYM:
            case defs_1.NUM:
            case defs_1.DOUBLE:
            case defs_1.STR:
                return a.toString();
            case defs_1.TENSOR:
                const dims = a.tensor.dim.slice(0, a.tensor.ndim);
                return `size = ${dims.join('x')}`;
            case defs_1.CONS:
                let name = defs_1.issymbol(a.cons.car) ? `${a.cons.car} ` : '';
                return `${name}length = ${misc_1.length(a)}`;
        }
    }
}
function isProperty(x) {
    if (x instanceof defs_1.BaseAtom || Array.isArray(x)) {
        return false;
    }
    return true;
}
function propertyList(items) {
    const ol = [
        'ol',
        {
            style: 'list-style-type:none; padding-left: 0px; margin-top: 0px; margin-bottom: 0px; margin-left: 12px',
        },
    ];
    items.forEach((x, i) => {
        const name = isProperty(x) ? x.name : `${i}`;
        const nameSpan = [
            'span',
            { style: '"color: rgb(136, 19, 145); background-color: #bada55"' },
            `${name}: `,
        ];
        const child = [
            'object',
            { object: isProperty(x) ? x.value : x },
        ];
        ol.push(['li', {}, nameSpan, child]);
    });
    return ol;
}
function split_tensor(p, j, k) {
    // based on print_tensor_inner
    let accumulator = [];
    if (j < p.tensor.ndim - 1) {
        for (let i = 0; i < p.tensor.dim[j]; i++) {
            let result;
            [k, result] = split_tensor(p, j + 1, k);
            accumulator.push(result);
        }
    }
    else {
        for (let i = 0; i < p.tensor.dim[j]; i++) {
            accumulator.push(p.tensor.elem[k]);
            k++;
        }
    }
    return [k, accumulator];
}
globalThis['devtoolsFormatters'] = [new AtomFormatter()];
