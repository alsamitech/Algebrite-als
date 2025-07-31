"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    'sin(x)',
    'sin(x)',
    'sin(-x)',
    '-sin(x)',
    'sin(b-a)',
    '-sin(a-b)',
    // check against the floating point math library
    'f(a,x)=1+sin(float(a/360*2*pi))-float(x)+sin(a/360*2*pi)-x',
    '',
    'f(0,0)',
    '1.0',
    'f(90,1)',
    '1.0',
    'f(180,0)',
    '1.0',
    'f(270,-1)',
    '1.0',
    'f(360,0)',
    '1.0',
    'f(-90,-1)',
    '1.0',
    'f(-180,0)',
    '1.0',
    'f(-270,1)',
    '1.0',
    'f(-360,0)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(45,sqrt(2)/2)',
    '1.000000...',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(135,sqrt(2)/2)',
    '1.000000...',
    'f(225,-sqrt(2)/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(315,-sqrt(2)/2)',
    '1.000000...',
    'f(-45,-sqrt(2)/2)',
    '1.0',
    'f(-135,-sqrt(2)/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(-225,sqrt(2)/2)',
    '1.000000...',
    'f(-315,sqrt(2)/2)',
    '1.0',
    'f(30,1/2)',
    '1.0',
    'f(150,1/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(210,-1/2)',
    '1.000000...',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(330,-1/2)',
    '1.000000...',
    'f(-30,-1/2)',
    '1.0',
    'f(-150,-1/2)',
    '1.0',
    'f(-210,1/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(-330,1/2)',
    '1.000000...',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(60,sqrt(3)/2)',
    '1.000000...',
    'f(120,sqrt(3)/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(240,-sqrt(3)/2)',
    '1.000000...',
    'f(300,-sqrt(3)/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(-60,-sqrt(3)/2)',
    '1.000000...',
    'f(-120,-sqrt(3)/2)',
    '1.0',
    // this should really be 1.0 , however
    // we have errors doing the calculations so
    // we don't get to that exact 1.0 float
    'f(-240,sqrt(3)/2)',
    '1.000000...',
    'f(-300,sqrt(3)/2)',
    '1.0',
    'f=quote(f)',
    '',
    'sin(arcsin(x))',
    'x',
    // check the default case
    'sin(1/12*pi)',
    'sin(1/12*pi)',
    'sin(arctan(4/3))',
    '4/5',
    'sin(-arctan(4/3))',
    '-4/5',
    // phase
    'sin(x-8/2*pi)',
    'sin(x)',
    'sin(x-7/2*pi)',
    'cos(x)',
    'sin(x-6/2*pi)',
    '-sin(x)',
    'sin(x-5/2*pi)',
    '-cos(x)',
    'sin(x-4/2*pi)',
    'sin(x)',
    'sin(x-3/2*pi)',
    'cos(x)',
    'sin(x-2/2*pi)',
    '-sin(x)',
    'sin(x-1/2*pi)',
    '-cos(x)',
    'sin(x+0/2*pi)',
    'sin(x)',
    'sin(x+1/2*pi)',
    'cos(x)',
    'sin(x+2/2*pi)',
    '-sin(x)',
    'sin(x+3/2*pi)',
    '-cos(x)',
    'sin(x+4/2*pi)',
    'sin(x)',
    'sin(x+5/2*pi)',
    'cos(x)',
    'sin(x+6/2*pi)',
    '-sin(x)',
    'sin(x+7/2*pi)',
    '-cos(x)',
    'sin(x+8/2*pi)',
    'sin(x)',
]);
