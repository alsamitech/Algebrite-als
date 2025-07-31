import { 
  cadr, 
  caddr, 
  car, 
  cdr, 
  iscons, 
  isstr, 
  NIL, 
  Str, 
  SYM, 
  U 
} from '../runtime/defs';
import { stop } from '../runtime/run';
import { 
  createEnvironment, 
  switchEnvironment, 
  getCurrentEnvironment,
  listEnvironments,
  saveEnvironment,
  restoreEnvironment,
  symbol 
} from '../runtime/symbol';
import { makeList } from './list';

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
export function Eval_createEnvironment(p1: U): U {
  const nameArg = cadr(p1);
  
  if (!nameArg) {
    stop('createEnvironment: missing environment name');
  }
  
  let envName: string;
  if (isstr(nameArg)) {
    envName = nameArg.str;
  } else if (nameArg.k === SYM) {
    envName = nameArg.printname;
  } else {
    stop('createEnvironment: environment name must be a string or symbol');
  }

  const result = createEnvironment(envName);
  return new Str(result);
}

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
export function Eval_switchEnvironment(p1: U): U {
  // p1 is the whole expression, e.g. (switchEnvironment "env1") or (switchEnvironment)
  // cadr(p1) gets the first argument
  const nameArg = cadr(p1);
  
  let envName: string | undefined;
  
  // Debug: check what nameArg looks like
  // console.log('nameArg:', nameArg, 'type:', typeof nameArg, 'printname:', nameArg?.printname);
  
  // If there's no argument or it's the NIL symbol, use default environment
  if (!nameArg || (nameArg.k === SYM && nameArg.printname === 'nil')) {
    envName = undefined; // Will default to 'default'
  } else {
    if (isstr(nameArg)) {
      envName = nameArg.str;
    } else if (nameArg.k === SYM) {
      envName = nameArg.printname;
    } else {
      stop('switchEnvironment: environment name must be a string or symbol');
    }
  }

  const result = switchEnvironment(envName);
  return new Str(result);
}

/* getCurrentEnvironment ===================================================

Tags
----
environment, scripting, JS, internal, treenode

General description
-------------------

Returns the name of the current environment.

*/
export function Eval_getCurrentEnvironment(): U {
  const result = getCurrentEnvironment();
  return new Str(result);
}

/* listEnvironments ========================================================

Tags
----
environment, scripting, JS, internal, treenode

General description
-------------------

Returns a list of all available environment names.

*/
export function Eval_listEnvironments(): U {
  const envNames = listEnvironments();
  return makeList(...envNames.map(name => new Str(name)));
}

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
export function Eval_saveEnvironment(p1: U): U {
  const envNameArg = cadr(p1);
  const backupNameArg = caddr(p1);
  
  if (!envNameArg || !backupNameArg) {
    stop('saveEnvironment: missing environment name or backup name');
  }
  
  let envName: string;
  let backupName: string;
  
  if (isstr(envNameArg)) {
    envName = envNameArg.str;
  } else if (envNameArg.k === SYM) {
    envName = envNameArg.printname;
  } else {
    stop('saveEnvironment: environment name must be a string or symbol');
  }
  
  if (isstr(backupNameArg)) {
    backupName = backupNameArg.str;
  } else if (backupNameArg.k === SYM) {
    backupName = backupNameArg.printname;
  } else {
    stop('saveEnvironment: backup name must be a string or symbol');
  }

  const result = saveEnvironment(envName, backupName);
  return new Str(result);
}

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
export function Eval_restoreEnvironment(p1: U): U {
  const backupNameArg = cadr(p1);
  
  if (!backupNameArg) {
    stop('restoreEnvironment: missing backup name');
  }
  
  let backupName: string;
  if (isstr(backupNameArg)) {
    backupName = backupNameArg.str;
  } else if (backupNameArg.k === SYM) {
    backupName = backupNameArg.printname;
  } else {
    stop('restoreEnvironment: backup name must be a string or symbol');
  }

  const result = restoreEnvironment(backupName);
  return new Str(result);
}