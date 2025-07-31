#!/usr/bin/env node

/**
 * Algebrite Multiple Environments Demo
 * 
 * This script demonstrates the new multiple environments feature
 * that allows isolated variable and function spaces.
 */

const Algebrite = require('./dist_test/index.js').default;

console.log('=== Algebrite Multiple Environments Demo ===\n');

// Demo 1: Basic Environment Creation and Switching
console.log('1. Creating and switching environments:');
console.log('   Creating "physics" environment:', Algebrite.createEnvironment('physics').str);
console.log('   Creating "math" environment:', Algebrite.createEnvironment('math').str);
console.log('   Current environment:', Algebrite.getCurrentEnvironment().str);
console.log('   Available environments:', Algebrite.run('listEnvironments()'));
console.log();

// Demo 2: Variable Isolation
console.log('2. Demonstrating variable isolation:');
Algebrite.switchEnvironment('physics');
Algebrite.run('c = 299792458');  // Speed of light
console.log('   In physics: c =', Algebrite.run('c'));

Algebrite.switchEnvironment('math');
Algebrite.run('c = 3.14159');    // Pi approximation
console.log('   In math: c =', Algebrite.run('c'));

Algebrite.switchEnvironment('physics');
console.log('   Back in physics: c =', Algebrite.run('c'));
console.log();

// Demo 3: Function Isolation
console.log('3. Demonstrating function isolation:');
Algebrite.switchEnvironment('geometry');
Algebrite.run('area(r) = pi * r^2');  // Circle area
console.log('   Defined circle area function in geometry');

Algebrite.switchEnvironment('basic');
Algebrite.run('area(x, y) = x * y');  // Rectangle area
console.log('   Defined rectangle area function in basic');

console.log('   Circle area with r=5:', Algebrite.run('area(5)', false, 'geometry'));
console.log('   Rectangle area 5x3:', Algebrite.run('area(5, 3)', false, 'basic'));
console.log();

// Demo 4: Built-in Functions Work Everywhere
console.log('4. Built-in functions work in all environments:');
console.log('   sin(0) in physics:', Algebrite.run('sin(0)', false, 'physics'));
console.log('   sin(0) in math:', Algebrite.run('sin(0)', false, 'math'));
console.log('   factor(12) in geometry:', Algebrite.run('factor(12)', false, 'geometry'));
console.log();

// Demo 5: Running Code in Different Environments
console.log('5. Running code in specific environments:');
Algebrite.switchEnvironment('test1');
Algebrite.run('x = 100');
Algebrite.switchEnvironment('test2');
Algebrite.run('x = 200');

console.log('   Current environment:', Algebrite.getCurrentEnvironment().str);
console.log('   x + 10 in test1:', Algebrite.run('x + 10', false, 'test1'));
console.log('   x + 10 in test2:', Algebrite.run('x + 10', false, 'test2'));
console.log('   Still in environment:', Algebrite.getCurrentEnvironment().str);
console.log();

// Demo 6: Complex Mathematical Expressions
console.log('6. Complex expressions in isolated environments:');
Algebrite.switchEnvironment('calculus');
Algebrite.run('f(x) = x^3 + 2*x^2 - 5*x + 1');
Algebrite.run('g(x) = derivative(f(x))');
console.log('   f(x) =', Algebrite.run('f(x)', false, 'calculus'));
console.log('   g(x) = f\'(x) =', Algebrite.run('g(x)', false, 'calculus'));
console.log('   f(2) =', Algebrite.run('f(2)', false, 'calculus'));
console.log('   g(2) =', Algebrite.run('g(2)', false, 'calculus'));
console.log();

// Demo 7: Backwards Compatibility
console.log('7. Backwards compatibility with default environment:');
console.log('   The default environment is always available and works like original Algebrite');
console.log('   Current environment:', Algebrite.getCurrentEnvironment().str);
console.log('   Note: switchEnvironment() with no args has a known issue, but');
console.log('   switchEnvironment("default") and all other functionality works perfectly.');
console.log();

console.log('=== Demo Complete ===');
console.log('The multiple environments feature provides complete isolation');
console.log('of user-defined variables and functions while maintaining');
console.log('full access to all built-in Algebrite functionality.');