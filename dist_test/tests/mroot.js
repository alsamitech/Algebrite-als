"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignum_1 = require("../sources/bignum");
const mpow_1 = require("../sources/mpow");
const mroot_1 = require("../sources/mroot");
const test_harness_1 = require("../test-harness");
// small numbers
for (let i = 0; i < 10; i++) {
    const a = bignum_1.mint(i);
    for (let j = 1; j < 10; j++) {
        test_harness_1.test(`mroot(mpow(${i},${j}),${j})=${i}`, t => {
            const b = mpow_1.mpow(a, j);
            const c = mroot_1.mroot(b, j);
            t.not(0, c);
            t.is(a.toString(), c.toString());
        });
    }
}
// big numbers
const a = bignum_1.mint(12345);
for (let i = 1; i < 10; i++) {
    test_harness_1.test(`mroot(mpow(${a},${i}),${i})=${a}`, t => {
        const b = mpow_1.mpow(a, i);
        const c = mroot_1.mroot(b, i);
        t.not(0, c);
        t.is(a.toString(), c.toString());
    });
}
