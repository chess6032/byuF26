# Notes

## TS project file structure

```
root/
  package.json
  tsconfig.json
  package-lock.json
  node_modules/
  dist/
  src/
```

* `package.json` is the config file for the NPM project.
* `tsconfig.json` is the config file for the TS transpiler.
* `package-lock.json` records all NPM dependency libraries (and their exact versions, sub-dependencies, etc.).
* `node_modules/` holds all NPM dependency libaries.
  * It's recommended you **do not commit `node_modules/`**, bc it's rly big. (Add it to `.gitignore`.)
* `dist/` holds your transpiled JS scripts.
* `src/` holds your TS source code.

## Creating a TS/JS project (NPM)

| Step                              | Shell command |  
| --------------------------------- | ------------- |  
| 1. Create project (config file: `package.json`) | `$ npm init --yes` |  
| 2. Add TS compiler & Node types to project | `$ npm install typescript @types/node --save-dev` |  
| 3. Create a compiler config file (`tsconfig.json`) | `$ npx tsc --init` |  
| 4. Edit `tsconfig.json` | *N/A* |  
| 5. Add build & run scripts to `package.json` | *N/A* |  

By step 4, you can compile your TS scripts into JS with `$ npx tsc`, and run them with `$ node`. In step 5, you'll add scripts to do that so you can just run `$ npm run build` and `$ npm run start`, respectively.

### Editing `tsconfig.json`

Make sure the following properties in the `compilerOptions` object have the following values (and are uncommented):

```json
// tsconfig.json::compilerOptions
"target": "ESNext",
"module": "commonJS",
"sourceMap": true
```

> [!NOTE]
> VSCode's TS/JS debugger relies on [source maps](https://firefox-source-docs.mozilla.org/devtools-user/debugger/how_to/use_a_source_map/index.html), which is why we add the `"sourceMap": true` option.

Also specify an `outDir` for the compiled JS scripts to live. When I did this, I also had to add a `rootDir` that points to the root directory of my TS source code:

```json
// tsconfig.json::compilerOptions
"rootDir": "./src",
"outDir": "dist"
```

Lastly, as a sibling to `compilerOptions` add an `include` object to include the directory with all your source code:

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
  },
  "include": [ "src" ]
}
```

**By this point, you can compile TS into JS**:

<pre><code>&#36; npx tsc -p <i>path/to/tsconfig.json</i></code></pre>

Or just&mdash;

<pre><code>&#36; npx tsc</code></pre>

&mdash;which looks for a `tsconfig.json` in the current dir. 

> [!NOTE]
> Apparently you're supposed to be able to run `tsc` as its own command, but I wasn't. Oh well.

Then you **run the compiled JS scripts via `node`**.

### Adding scripts to `package.json`

You'll want a script to "build" your program (compile TS &rarr; JS) and a script to "start" (run) it:

```json
// package.json
{
  // ...
  "scripts": {
    "build": "npx tsc -p tsconfig.json",
    "start": "node dist/main.js"
  }
}
```

Replace `tsconfig.json` with the path to your project's `tsconfig.json` and `dist/main.js` with the (compiled) JS script you want to execute.

Then you can run these scripts with <code>&#36; npm run <i>script</i></code>:

```
$ npm run build
$ npm run start
```

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