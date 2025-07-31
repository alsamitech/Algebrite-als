"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'exp(-3/4*i*pi)',
    //"exp(-3/4*i*pi)",
    '-1/2*2^(1/2)-1/2*i*2^(1/2)',
    'simplify(exp(-3/4*i*pi))',
    //"exp(-3/4*i*pi)",
    //"-1/2*2^(1/2)-1/2*i*2^(1/2)",
    '-(1+i)/(2^(1/2))',
]);
