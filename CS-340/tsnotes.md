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

## Classes

- TS supports `public`, `protected`, `private`, and `readonly` (const) members.
  - Members are **public by default**.
- TS supports object literals, like JS. 
  - These look like <code>{<i>name</i>: <i>val</i>, &hellip;}</code>
- TS supports abstract classes (<code>abstract class <i>Class</i></code>).
- `extends` is the keyword for inheritance.
  - <code>class <i>Sub</i> extends <i>Super</i></code>
- Instantiate a class w/ `new`.
  - <code><i>obj</i> = new <i>Class</i>(&hellip;);</code>
- "Property" instead of "member" to refer to a class's variables, methods, etc.
- Classes can only inherit from one superclass, but they can extend multiple interfaces.

### Parameter properties (constructors)

TS has a special syntax for turning a constructor parameter into a class property with the same name/type (and value). The closest analogue I can think of is initializer lists in C++.

It looks like this:

```ts
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) { /* No body necessary */ }
}
```

### Accessors (getters/setters)

If you define a function <code>public get <i>member</i>()</code> in a class *`Class`*, then accessing <code><i>Class</i>.<i>member</i></code> (no parenthesis) will call that getter function. This is called a ***`get` accessor***.

You can make a setter by replacing `get` with `set` and giving it params. This is called a ***`set` accessor***. 

> [!NOTE]
> Both `get` and `set` are referred to in TS's documentation as "accessors", but some literature refers only to `get` as an "accessor" and `set` as a "mutator".

To handle assignments of different types, you can make its param type a union (and use `typeof` in the function body). However, you can NOT overload the `set` accessor.

## Structural typing (class/function comparison)

TS uses a structural typing system. This means that TS compares objects by their structure, not their name. (Apparently this is true for all types? Idk.) **Two classes are compatible if they share the same "shape"**.

When we say "same shape", we mean **the same property names (w/ the same types)**. When comparing classes, TS looks at each class's instance members&mdash;essentially, what it would look like as an interface.

In other words, **"If it walks and talks like a duck, it's a duck."** (In fact, structural typing is sometimes called "duck typing".)

When we say "compatibile," we mean that you can substitute one for the other. e.g., if a function's parameter is typed as a class `C1` and `C1` is compatible with a class `C2`, you can pass a `C2` object into that function.

TS uses structural typing to compare *functions* as well as objects. Functions with the same parameter types (w/ the same order) and the same return type are compatible, even if they have different names or param names.

> [!NOTE]
> The opposite of a structural typing system is a nominal type system, in which two types are compatible only if they're explicitly declared to be related (e.g., one class extends another or implements the same named interface). In other words, objects are compatible if they share an identity, not a shape. 
> 
> Java and C# are examples of languages that use nominal typing system.

Here's some important nuances:

* Excess properties are (usually(?)) fine. If a class `C1` the same members/types as a class `C2` and *then some of its own*, `C1` is still compatible with `C2`.
* Private/protected properties are always tied to the specific class body that declared them. Two classes that write the same name & type of a private member are not compatible.
  * Note that this does not apply to object literals, since object literals can't have private properties in the first place.
