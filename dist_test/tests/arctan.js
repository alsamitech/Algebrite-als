"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'arctan(x)',
    'arctan(x)',
    'arctan(-x)',
    '-arctan(x)',
    'arctan(0)',
    '0',
    'arctan(tan(x))',
    'x',
    'arctan(1/sqrt(3))-pi/6',
    '0',
    'arctan(1)-pi/4',
    '0',
    'arctan(sqrt(3))-pi/3',
    '0',
    'arctan(a-b)',
    'arctan(a-b)',
    'arctan(b-a)',
    '-arctan(a-b)',
    'arctan(tan(x))',
    'x',
]);
