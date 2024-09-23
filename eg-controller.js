const path = require('path');
const fs = require("fs");

class EgController {
    constructor(parameters) {
        
    }

    create(classNameEntered) {
        if (!classNameEntered) {
            console.error('Please provide a class name.');
            process.exit(1);
        }
    
        if (!this.verifyName(classNameEntered)) {
            console.error('Invalid class name. Only alphanumeric characters and dashes are allowed.');
            process.exit(1);
        }
    
        let words = classNameEntered.split("-");
        let classNameCaps = words.map(word => this.capitalize(word)).join("");
        let classNameCamel = classNameCaps.charAt(0).toLowerCase() + classNameCaps.slice(1);
        const classDir = path.join(process.cwd(), 'src/controllers');
        const classFilePath = path.join(classDir, `${classNameCamel}Controller.js`);
    
        if (fs.existsSync(classFilePath)) {
            console.error(`File ${classFilePath} already exists.`);
            process.exit(1);
        }
    
        const classTemplate = `
class ${classNameCaps}Controller {
    constructor() {
        // constructor logic
    }

    async getAll${classNameCaps}s(req, res) {
        // logic
    }

    async get${classNameCaps}(req, res) {
        // logic
    }

    async create${classNameCaps}(req, res) {
        // logic
    }

    async delete${classNameCaps}(req, res) {
        // logic
    }

    async edit${classNameCaps}(req, res) {
        // logic
    }
}

module.exports = ${classNameCaps}Controller;
`;
    
        fs.mkdirSync(classDir, { recursive: true });
        fs.writeFileSync(classFilePath, classTemplate.trim());
        console.log(`Class ${classNameCamel} created successfully at ${classFilePath}`);
    }
    
    capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    verifyName(name) {
        const regex = /^[a-zA-Z0-9-]+$/;
        return regex.test(name);
    }
}

module.exports = EgController;