# TS Notes

Notes on TS syntax 'n shih.

## tsconfig.json

`tsconfig.json` configures `tsc`, the TS &rarr; JS transpiler.

By default, `tsc` compiles all `.ts` files in the project. Good to know.

Here's some important compiler options (`compilerOptions` in `tsconfig.json`):

- `target`: specifies which version of JS code to generate.
- `module`: specifies which module system thould be used in the generate JS code.
- `ourDir`: specifies directory where generated JS files are placed.
- `sourceMap`: specifies whether source map files will be generated (for debugging).
  - Source map files map line numbers in the JS code back to the corresponding line numbers in the original TS code. This is necessary for debuggers to properly implement breakpoints.
- `files` can be used to explicitly list files & directories that should be compiled.

## Type declaration files (`.d.ts`)

`.d.ts` files provide type information for JS libraries they can be called from TS code (which requires types).

They also enable IDEs to provide auto-complete functionality.

`tsc` can generate `.d.ts` files for your TS code when your transpile it. That way otheres can use your JS code instead of needing your TS source files.

## Modules (`import`/`export`)

Any file containing a top-level `import` or `export` statement is considered a "module". Any file lacking this is a "script" whose contents are available in the global scope.

- Modules are executed w/in their own scope&mdash;NOT the global scope.
  - Vars, funcs, classes, etc. declared in a module are not visible elsewhere unless the module `export`s it.
  - Modules cannot see other modules' exported shih unless they `import` it.

### Export Syntax

There are two ways to `export` shih:

1. Add **`export` keyword** to declaration.

```ts
export function getInputValue(): void {}
export class Player {}
export interface Person {}
```

2. Add **`export` statement** to module.

```ts
function getInputValue(): void {}
class Player {}
interface Person {}

export { getInputValue as getUserInput, Player, Person };
```

### Import syntax

To import `item` from `module.ts`, you would do this:

```ts
import { item } from "path/to/module";
```

If you wanted to give `item` an alias, you would add `as`:

```ts
import { item as alias } from "path/to/module";
```

You can also wildcard your imports to import all exported items from a module:

```ts
import * as people from "./person";
people.getUserInput();
```
