const typescript = require('typescript');
const fs = require('fs');

eval(typescript.transpile(fs.readFileSync('./gulpfile.ts').toString()));