"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("../sources/misc");
const defs_1 = require("../runtime/defs");
const bignum_1 = require("../sources/bignum");
const multiply_1 = require("../sources/multiply");
const quickfactor_1 = require("../sources/quickfactor");
const test_harness_1 = require("../test-harness");
test_harness_1.test('quickfactor', t => {
    for (let i = 2; i < 10001; i++) {
        let base = i;
        const qf = quickfactor_1.quickfactor(bignum_1.integer(base), bignum_1.integer(1));
        const arr = [];
        let j = 0;
        while (base > 1) {
            let expo = 0;
            while (base % defs_1.primetab[j] === 0) {
                base /= defs_1.primetab[j];
                expo++;
            }
            if (expo) {
                arr.push(quickfactor_1.quickpower(bignum_1.integer(defs_1.primetab[j]), bignum_1.integer(expo))[0]);
            }
            j++;
        }
        let p2 = multiply_1.multiply_all(arr);
        let p1 = qf;
        t.is(true, misc_1.equal(p1, p2), `${p1} != ${p2}`);
    }
});
