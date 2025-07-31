# Algebrite Multiple Environments Feature

This document demonstrates the new multiple environments feature in Algebrite that allows users to create, switch between, and manage separate variable/function environments.

## Overview

The multiple environments feature allows you to:
- Create isolated environments for variables and functions
- Switch between environments without affecting others
- Run code in specific environments without switching context
- Maintain backwards compatibility with existing code

## API Reference

### Environment Management Functions

#### `createEnvironment(name)`
Creates a new environment with the specified name.
- **Parameters:** `name` (string) - The name of the environment to create
- **Returns:** The environment name
- **Example:** `createEnvironment("myEnv")`

#### `switchEnvironment(name)`
Switches to the specified environment. If no name is provided, switches to the default environment.
- **Parameters:** `name` (string, optional) - The name of the environment to switch to
- **Returns:** The environment name
- **Example:** `switchEnvironment("myEnv")` or `switchEnvironment()` for default

#### `getCurrentEnvironment()`
Returns the name of the current environment.
- **Returns:** The current environment name
- **Example:** `getCurrentEnvironment()`

#### `listEnvironments()`
Returns a list of all available environment names.
- **Returns:** List of environment names
- **Example:** `listEnvironments()`

#### `run(code, generateLatex, environment)`
Extended version of the run function that can execute code in a specific environment.
- **Parameters:** 
  - `code` (string) - The Algebrite code to execute
  - `generateLatex` (boolean, optional) - Whether to generate LaTeX output
  - `environment` (string, optional) - The environment to run the code in
- **Returns:** The result of the code execution
- **Example:** `Algebrite.run("x + 1", false, "myEnv")`

## Usage Examples

### Basic Environment Isolation

```javascript
const Algebrite = require('algebrite');

// Create two environments
Algebrite.createEnvironment("physics");
Algebrite.createEnvironment("math");

// Work in physics environment
Algebrite.switchEnvironment("physics");
Algebrite.run("c = 299792458");  // Speed of light
Algebrite.run("E = m * c^2");    // Einstein's equation

console.log("In physics:", Algebrite.run("E")); // E = c^2*m

// Switch to math environment
Algebrite.switchEnvironment("math");
Algebrite.run("c = 3.14159");   // Different meaning of 'c'
Algebrite.run("E = 2.71828");   // Euler's number

console.log("In math:", Algebrite.run("E"));    // E = 2.71828
console.log("In math:", Algebrite.run("c"));    // c = 3.14159

// Switch back to physics
Algebrite.switchEnvironment("physics");
console.log("Back in physics:", Algebrite.run("c")); // c = 299792458
```

### Function Isolation

```javascript
// Define different functions in different environments
Algebrite.switchEnvironment("geometry");
Algebrite.run("area(r) = pi * r^2");  // Circle area

Algebrite.switchEnvironment("algebra");
Algebrite.run("area(x, y) = x * y");  // Rectangle area

// Test function calls
Algebrite.switchEnvironment("geometry");
console.log("Circle area:", Algebrite.run("area(5)")); // 25*pi

Algebrite.switchEnvironment("algebra");
console.log("Rectangle area:", Algebrite.run("area(5, 3)")); // 15
```

### Running Code in Specific Environments

```javascript
// Set up different environments
Algebrite.switchEnvironment("env1");
Algebrite.run("x = 10");

Algebrite.switchEnvironment("env2");
Algebrite.run("x = 20");

// Run expressions in specific environments without switching
console.log("Current env:", Algebrite.getCurrentEnvironment()); // "env2"
console.log("x in env1:", Algebrite.run("x + 1", false, "env1")); // 11
console.log("x in env2:", Algebrite.run("x + 1", false, "env2")); // 21
console.log("Still in env2:", Algebrite.getCurrentEnvironment()); // "env2"
```

### Built-in Functions Work Everywhere

```javascript
// Built-in functions work the same in all environments
Algebrite.switchEnvironment("test1");
console.log("sin(0) in test1:", Algebrite.run("sin(0)")); // 0

Algebrite.switchEnvironment("test2");
console.log("sin(0) in test2:", Algebrite.run("sin(0)")); // 0

console.log("factor(12):", Algebrite.run("factor(12)")); // 2^2*3
```

### Environment Management

```javascript
// List all environments
console.log("All environments:", Algebrite.listEnvironments());

// Create and switch between multiple environments
const environments = ["physics", "math", "chemistry"];
environments.forEach(env => {
    Algebrite.createEnvironment(env);
    Algebrite.switchEnvironment(env);
    Algebrite.run(`subject = "${env}"`);
});

// Verify isolation
environments.forEach(env => {
    const subject = Algebrite.run("subject", false, env);
    console.log(`Environment ${env}: subject = ${subject}`);
});
```

## Backwards Compatibility

The default environment behaves exactly like the original Algebrite:

```javascript
// This code works exactly as before
Algebrite.run("x = 5");
Algebrite.run("y = x^2");
console.log(Algebrite.run("y")); // 25

// The default environment is always available
console.log(Algebrite.getCurrentEnvironment()); // "default"
```

## Important Notes

1. **Built-in Functions**: All built-in mathematical functions (sin, cos, factor, etc.) work the same way in all environments. Only user-defined variables and functions are environment-specific.

2. **Default Environment**: If you don't explicitly create or switch environments, you're working in the "default" environment, which maintains full backwards compatibility.

3. **Environment Names**: Environment names are case-sensitive strings. Use descriptive names for better organization.

4. **Isolation**: Variables and functions defined in one environment do not affect any other environment.

5. **Performance**: Creating new environments has minimal overhead. The built-in function lookup remains fast across all environments.

## Use Cases

- **Educational Software**: Separate environments for different subjects or students
- **Scientific Computing**: Isolate different experiments or calculation contexts
- **Multi-tenant Applications**: Provide isolated calculation spaces for different users
- **Testing**: Run tests in isolated environments without affecting main calculations
- **Modular Calculations**: Organize related calculations in named environments