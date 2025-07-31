"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'arctanh(0.0)',
    '0.0',
    'arctanh(0)',
    '0',
    'arctanh(tanh(x))',
    'x'
]);
