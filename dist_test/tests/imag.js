"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'imag(a+i*b)',
    'b',
    'imag(1+exp(i*pi/3))',
    '1/2*3^(1/2)',
    'imag(i)',
    '1',
    'imag((-1)^(1/3))',
    '1/2*3^(1/2)',
    'imag(-i)',
    '-1',
]);
