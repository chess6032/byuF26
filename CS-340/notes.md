# TS Notes

## Creating a project (NPM)

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