"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignum_1 = require("../sources/bignum");
const mpow_1 = require("../sources/mpow");
const test_harness_1 = require("../test-harness");
// small numbers
for (let i = -10; i < 10; i++) {
    const a = bignum_1.mint(i);
    let x = 1;
    for (let j = 0; j < 10; j++) {
        test_harness_1.test(`${i}^${j}=${x}`, t => {
            const b = mpow_1.mpow(a, j);
            const c = bignum_1.mint(x);
            t.is(c.toString(), b.toString());
            x *= i;
        });
    }
}
