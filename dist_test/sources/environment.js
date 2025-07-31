"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_restoreEnvironment = exports.Eval_saveEnvironment = exports.Eval_listEnvironments = exports.Eval_getCurrentEnvironment = exports.Eval_switchEnvironment = exports.Eval_createEnvironment = void 0;
const defs_1 = require("../runtime/defs");
const run_1 = require("../runtime/run");
const symbol_1 = require("../runtime/symbol");
const list_1 = require("./list");
/* createEnvironment =======================================================

Tags
----
environment, scripting, JS, internal, treenode

Parameters
----------
name

General description
-------------------

Creates a new environment with the given name and returns the environment name.

*/
function Eval_createEnvironment(p1) {
    const nameArg = defs_1.cadr(p1);
    if (!nameArg) {
        run_1.stop('createEnvironment: missing environment name');
    }
    let envName;
    if (defs_1.isstr(nameArg)) {
        envName = nameArg.str;
    }
    else if (nameArg.k === defs_1.SYM) {
        envName = nameArg.printname;
    }
    else {
        run_1.stop('createEnvironment: environment name must be a string or symbol');
    }
    const result = symbol_1.createEnvironment(envName);
    return new defs_1.Str(result);
}
exports.Eval_createEnvironment = Eval_createEnvironment;
/* switchEnvironment =======================================================

Tags
----
environment, scripting, JS, internal, treenode

Parameters
----------
name (optional)

General description
-------------------

Switches to the specified environment. If no name is provided, switches to default.
Returns the environment name.

*/
function Eval_switchEnvironment(p1) {
    // p1 is the whole expression, e.g. (switchEnvironment "env1") or (switchEnvironment)
    // cadr(p1) gets the first argument
    const nameArg = defs_1.cadr(p1);
    let envName;
    // Debug: check what nameArg looks like
    // console.log('nameArg:', nameArg, 'type:', typeof nameArg, 'printname:', nameArg?.printname);
    // If there's no argument or it's the NIL symbol, use default environment
    if (!nameArg || (nameArg.k === defs_1.SYM && nameArg.printname === 'nil')) {
        envName = undefined; // Will default to 'default'
    }
    else {
        if (defs_1.isstr(nameArg)) {
            envName = nameArg.str;
        }
        else if (nameArg.k === defs_1.SYM) {
            envName = nameArg.printname;
        }
        else {
            run_1.stop('switchEnvironment: environment name must be a string or symbol');
        }
    }
    const result = symbol_1.switchEnvironment(envName);
    return new defs_1.Str(result);
}
exports.Eval_switchEnvironment = Eval_switchEnvironment;
/* getCurrentEnvironment ===================================================

Tags
----
environment, scripting, JS, internal, treenode

General description
-------------------

Returns the name of the current environment.

*/
function Eval_getCurrentEnvironment() {
    const result = symbol_1.getCurrentEnvironment();
    return new defs_1.Str(result);
}
exports.Eval_getCurrentEnvironment = Eval_getCurrentEnvironment;
/* listEnvironments ========================================================

Tags
----
environment, scripting, JS, internal, treenode

General description
-------------------

Returns a list of all available environment names.

*/
function Eval_listEnvironments() {
    const envNames = symbol_1.listEnvironments();
    return list_1.makeList(...envNames.map(name => new defs_1.Str(name)));
}
exports.Eval_listEnvironments = Eval_listEnvironments;
/* saveEnvironment =========================================================

Tags
----
environment, scripting, JS, internal, treenode

Parameters
----------
envName
backupName

General description
-------------------

Saves the specified environment with the given backup name.
Returns the backup name.

*/
function Eval_saveEnvironment(p1) {
    const envNameArg = defs_1.cadr(p1);
    const backupNameArg = defs_1.caddr(p1);
    if (!envNameArg || !backupNameArg) {
        run_1.stop('saveEnvironment: missing environment name or backup name');
    }
    let envName;
    let backupName;
    if (defs_1.isstr(envNameArg)) {
        envName = envNameArg.str;
    }
    else if (envNameArg.k === defs_1.SYM) {
        envName = envNameArg.printname;
    }
    else {
        run_1.stop('saveEnvironment: environment name must be a string or symbol');
    }
    if (defs_1.isstr(backupNameArg)) {
        backupName = backupNameArg.str;
    }
    else if (backupNameArg.k === defs_1.SYM) {
        backupName = backupNameArg.printname;
    }
    else {
        run_1.stop('saveEnvironment: backup name must be a string or symbol');
    }
    const result = symbol_1.saveEnvironment(envName, backupName);
    return new defs_1.Str(result);
}
exports.Eval_saveEnvironment = Eval_saveEnvironment;
/* restoreEnvironment ======================================================

Tags
----
environment, scripting, JS, internal, treenode

Parameters
----------
backupName

General description
-------------------

Restores an environment from the specified backup.
Returns the environment name.

*/
function Eval_restoreEnvironment(p1) {
    const backupNameArg = defs_1.cadr(p1);
    if (!backupNameArg) {
        run_1.stop('restoreEnvironment: missing backup name');
    }
    let backupName;
    if (defs_1.isstr(backupNameArg)) {
        backupName = backupNameArg.str;
    }
    else if (backupNameArg.k === defs_1.SYM) {
        backupName = backupNameArg.printname;
    }
    else {
        run_1.stop('restoreEnvironment: backup name must be a string or symbol');
    }
    const result = symbol_1.restoreEnvironment(backupName);
    return new defs_1.Str(result);
}
exports.Eval_restoreEnvironment = Eval_restoreEnvironment;
