"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defs_1 = require("../runtime/defs");
const bignum_1 = require("../sources/bignum");
const mprime_1 = require("../sources/mprime");
const test_harness_1 = require("../test-harness");
let i = 0;
let k = 0;
const m = 0;
let t = 0;
k = 0;
for (i = 0; i < 10000; i++) {
    const n = bignum_1.mint(i);
    let expectPrime = i === defs_1.primetab[k];
    if (expectPrime) {
        k++;
    }
    test_harness_1.test(`mprime(${i}) = ${expectPrime}`, t => t.is(expectPrime, mprime_1.mprime(n)));
}
//endif
