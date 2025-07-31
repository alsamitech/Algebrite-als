"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defs_1 = require("../runtime/defs");
const run_1 = require("../runtime/run");
const bignum_1 = require("../sources/bignum");
const mgcd_1 = require("../sources/mgcd");
const mmul_1 = require("../sources/mmul");
const test_harness_1 = require("../test-harness");
for (let i = 1; i < 100; i++) {
    const a = bignum_1.mint(i);
    for (let j = 1; j < 100; j++) {
        test_harness_1.test(`gcd(${i}, ${j})`, t => {
            const b = bignum_1.mint(j);
            const c = mgcd_1.mgcd(a, b);
            const d = egcd(a, b);
            t.is(d.toString(), c.toString());
        });
    }
}
// Euclid's algorithm
function egcd(a, b) {
    let sign_ = 0;
    if (defs_1.MZERO(b)) {
        run_1.stop('divide by zero');
    }
    //b = mcopy(b)
    if (defs_1.MZERO(a)) {
        return b;
    }
    sign_ = defs_1.MSIGN(b);
    //a = mcopy(a)
    while (!defs_1.MZERO(b)) {
        const c = mmul_1.mmod(a, b);
        //mfree(a)
        a = b;
        b = c;
    }
    a = bignum_1.setSignTo(a, sign_);
    return a;
}
