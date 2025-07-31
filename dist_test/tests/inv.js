"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'inv(a)',
    'inv(a)',
    'inv(inv(a))',
    'a',
    'inv(inv(inv(a)))',
    'inv(a)',
    'inv(inv(inv(inv(a))))',
    'a',
    'inv(a·b·c)',
    'inner(inv(c),inner(inv(b),inv(a)))',
    'inv(I)',
    'I',
]);
