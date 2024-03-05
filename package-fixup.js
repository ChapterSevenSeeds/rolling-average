const path = require("path");
const fs = require("fs");

fs.writeFileSync(path.resolve(__dirname, "dist/cjs/package.json"), JSON.stringify({ "type": "commonjs" }, null, 2));
fs.writeFileSync(path.resolve(__dirname, "dist/esm/package.json"), JSON.stringify({ "type": "module" }, null, 2));
