"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ava_run = exports.run_test = exports.run_shardable_test = exports.setup_test = exports.test = void 0;
const process_1 = __importDefault(require("process"));
const fs_1 = __importDefault(require("fs"));
const defs_1 = require("./runtime/defs");
const run_1 = require("./runtime/run");
const init_1 = require("./runtime/init");
if (!defs_1.defs.inited) {
    init_1.init();
}
const shardCount = Number(process_1.default.env['TEST_TOTAL_SHARDS']) || 1;
const shardIndex = Number(process_1.default.env['TEST_SHARD_INDEX']) || 0;
const testFilter = process_1.default.env['TESTBRIDGE_TEST_ONLY'];
if (process_1.default['TEST_SHARD_STATUS_FILE']) {
    fs_1.default.writeFileSync(process_1.default['TEST_SHARD_STATUS_FILE'], '');
}
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;
process_1.default.on('exit', () => {
    console.log(`${passedTests} passed, ${failedTests} failed`);
    if (failedTests > 0) {
        process_1.default.exit(1);
    }
});
function filterTrace(trace) {
    const filtered = [];
    for (const line of trace.split('\n')) {
        if (line.indexOf('(internal/modules/cjs/loader.js:') > 0) {
            continue;
        }
        filtered.push(line);
    }
    return filtered.join('\n');
}
class Asserts {
    is(a, b, msg) {
        if (Object.is(a, b)) {
            return true;
        }
        console.log('FAIL');
        msg && console.log(msg);
        console.log('Expected: ', a);
        console.log('Actual:   ', b);
        throw new Error('Failed');
    }
    not(a, b, msg) {
        if (!Object.is(a, b)) {
            return true;
        }
        console.log('FAIL');
        msg && console.log(msg);
        console.log('Should not b: ', a);
        throw new Error('Failed');
    }
}
let testIndex = 0;
let shouldFail = false;
function shouldSkip(name) {
    if (testIndex++ % shardCount != shardIndex) {
        skippedTests++;
        return true;
    }
    else if (testFilter && name.indexOf(testFilter) != -1) {
        skippedTests++;
        return true;
    }
    return false;
}
let beforeEach = () => { };
function _runTest(name, f, ...args) {
    beforeEach();
    console.time(name);
    try {
        console.log(name);
        f(new Asserts(), ...args);
    }
    finally {
        console.timeEnd(name);
    }
}
function test(name, f, ...args) {
    if (shouldSkip(name)) {
        return;
    }
    try {
        _runTest(name, f, ...args);
        passedTests++;
        console.log('OK');
    }
    catch (ex) {
        failedTests++;
        console.log(filterTrace(ex.stack));
    }
}
exports.test = test;
test.beforeEach = function (hook) {
    const head = beforeEach;
    beforeEach = () => {
        head();
        hook();
    };
};
test.failing = function failing(name, f, ...args) {
    if (shouldSkip(name)) {
        return;
    }
    let finished = false;
    try {
        _runTest(name, f, ...args);
        finished = true;
    }
    catch (ex) {
        passedTests++;
        console.log('Expected failure: ', ex);
    }
    if (finished) {
        console.log('FAIL: test marked as failing but passed');
        failedTests++;
    }
};
function setup_test(f) {
    defs_1.defs.test_flag = true;
    run_1.run('clearall');
    run_1.run('e=quote(e)');
    try {
        f();
    }
    finally {
        defs_1.defs.test_flag = false;
    }
}
exports.setup_test = setup_test;
// Use this when order of execution doesn't matter.
// (e.g. s doesn't set any variables)
function run_shardable_test(s, prefix = '') {
    setup_test(() => {
        for (let i = 0; i < s.length; i += 2) {
            test((prefix || `${testIndex}: `) + s[i], t => {
                defs_1.defs.out_count = 0;
                t.is(s[i + 1], run_1.run(s[i]));
            });
        }
    });
}
exports.run_shardable_test = run_shardable_test;
function run_test(s, name) {
    setup_test(() => {
        test(name || `${testIndex}`, t => {
            for (let i = 0; i < s.length; i += 2) {
                defs_1.defs.out_count = 0;
                t.is(s[i + 1], run_1.run(s[i]), `${i}: ${s[i]}`);
            }
        });
    });
}
exports.run_test = run_test;
function ava_run(t, input, expected) {
    setup_test(() => t.is(expected, run_1.run(input)));
}
exports.ava_run = ava_run;
