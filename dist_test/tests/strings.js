"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_harness_1 = require("../test-harness");
test_harness_1.run_test([
    '"hey" + "you"',
    '"hey"+"you"',
    '"hey" + "hey"',
    '2*"hey"',
    '"hey" / "hey"',
    '1',
    '"hey" - "hey"',
    '0',
    '"hey" * "hey"',
    '"hey"^2',
    '"aaaaaaaaaa\nbbbbbbbbbb"',
    '"aaaaaaaaaa\nbbbbbbbbbb"',
]);
