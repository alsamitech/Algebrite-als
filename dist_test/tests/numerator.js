"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'numerator(2/3)',
    '2',
    'numerator(x)',
    'x',
    'numerator(1/x)',
    '1',
    'numerator(a+b)',
    'a+b',
    'numerator(1/a+1/b)',
    'a+b',
]);
