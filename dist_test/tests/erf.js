"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'erf(a)',
    'erf(a)',
    'erf(0.0) + 1',
    '1.0',
    'float(erf(0))',
    '0.0',
    'erf(0.0)',
    '0.0',
    'erf(-0.0)',
    '0.0',
    'erf(0)',
    '0',
    'erf(-0)',
    '0',
    'float(erf(0)) + 1',
    '1.0',
    'float(erf(1))',
    '0.842701...',
]);
