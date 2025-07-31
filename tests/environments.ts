import { run_test } from '../test-harness';

run_test([
  // Basic environment creation and switching
  'createEnvironment("env1")',
  '"env1"',

  'createEnvironment("env2")', 
  '"env2"',

  // Test isolated variable assignments
  'switchEnvironment("env1")',
  '"env1"',

  'x = 10',
  '',

  'switchEnvironment("env2")',
  '"env2"',

  'x = 20',
  '',

  // Verify isolation
  'switchEnvironment("env1")',
  '"env1"',

  'x',
  '10',

  'switchEnvironment("env2")',
  '"env2"',

  'x',
  '20',

  // Test function definitions are also isolated
  'switchEnvironment("env1")',
  '"env1"',

  'f(a) = a + 1',
  '',

  'f(5)',
  '6',

  'switchEnvironment("env2")',
  '"env2"',

  'f(5)',
  'f(5)',

  'f(a) = a * 2',
  '',

  'f(5)',
  '10',

  // Verify built-in functions work in all environments
  'switchEnvironment("env1")',
  '"env1"',

  'sin(0)',
  '0',

  'factor(12)',
  '2^2*3',

  'switchEnvironment("env2")',
  '"env2"',

  'sin(0)',
  '0',

  'factor(12)',
  '2^2*3',

  // Test default environment behavior (backwards compatibility)
  'switchEnvironment()',
  '"default"',

  'y = 30',
  '',

  'y',
  '30',

  // Default environment should not interfere with named environments
  'switchEnvironment("env1")',
  '"env1"',

  'y',
  'y',

  // Test environment listing
  'listEnvironments()',
  '"default"("env1","env2")',

  // TODO: Fix save/restore functionality
  // Test saving and restoring environments
  // 'switchEnvironment("env1")',
  // '"env1"',

  // 'z = 100',
  // '',

  // 'saveEnvironment("env1", "backup1")',
  // '"backup1"',

  // 'z = 200',
  // '',

  // 'z',
  // '200',

  // 'restoreEnvironment("backup1")',
  // '"env1"',

  // 'z',
  // '100',

  // Test running code in specific environment without switching
  'run("a + b", false, "env2")',
  'a+b',

  'switchEnvironment("env2")',
  '"env2"',

  'a = 1',
  '',

  'b = 2', 
  '',

  'run("a + b", false, "env2")',
  '3',

  // Original environment should be unchanged
  'switchEnvironment("env1")',
  '"env1"',

  'a',
  'a',
]);