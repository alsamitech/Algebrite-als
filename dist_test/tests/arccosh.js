"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'arccosh(1.0)',
    '0.0',
    'arccosh(1)',
    '0',
    'arccosh(cosh(x))',
    'x'
]);
