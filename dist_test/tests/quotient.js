"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'quotient(x^2+1,x+1)-x+1',
    '0',
    'quotient(a*x^2+b*x+c,d*x+e)-(-a*e/(d^2)+a*x/d+b/d)',
    '0',
]);
