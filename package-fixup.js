const path = require("path");
const package = require("./package.json");
const fs = require("fs");

fs.writeFileSync(path.resolve(__dirname, "dist/cjs/package.json"), JSON.stringify({ ...package, "type": "commonjs" }, null, 2));
fs.writeFileSync(path.resolve(__dirname, "dist/esm/package.json"), JSON.stringify({ ...package, "type": "module" }, null, 2));
