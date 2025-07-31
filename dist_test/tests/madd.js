"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignum_1 = require("../sources/bignum");
const madd_1 = require("../sources/madd");
const test_harness_1 = require("../test-harness");
let i = 0;
test_harness_1.test('madd', t => {
    for (i = -100; i < 100; i++) {
        for (let j = -100; j < 100; j++) {
            const a = bignum_1.mint(i);
            const b = bignum_1.mint(j);
            const c = bignum_1.mint(i + j);
            t.is(c.toString(), madd_1.madd(a, b).toString(), `${i}+${j}=${i + j}`);
        }
    }
});
test_harness_1.test('msub', t => {
    for (i = -100; i <= 100; i++) {
        for (let j = -100; j <= 100; j++) {
            const a = bignum_1.mint(i);
            const b = bignum_1.mint(j);
            const c = bignum_1.mint(i - j);
            t.is(c.toString(), madd_1.msub(a, b).toString(), `${i}-${j}=${i - j}`);
        }
    }
});
