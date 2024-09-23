#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const className = process.argv[2];

if (!className) {
  console.error('Please provide a class name.');
  process.exit(1);
}

const classDir = path.join(__dirname, 'classes', className);
const classFilePath = path.join(classDir, `${className}.js`);

const classTemplate = `
class ${className} {
  constructor() {
    // constructor logic
  }
  
  // methods
}

module.exports = ${className};
`;

fs.mkdirSync(classDir, { recursive: true });
fs.writeFileSync(classFilePath, classTemplate.trim());
console.log(`Class ${className} created successfully at ${classFilePath}`);
