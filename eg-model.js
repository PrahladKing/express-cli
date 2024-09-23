const path = require("path");
const fs = require("fs");

class EgModel {
  constructor(parameters) {}

  create(classNameEntered) {
    if (!classNameEntered) {
      console.error("Please provide a class name.");
      process.exit(1);
    }

    if (!this.verifyName(classNameEntered)) {
      console.error(
        "Invalid class name. Only alphanumeric characters and dashes are allowed."
      );
      process.exit(1);
    }

    let words = classNameEntered.split("-");
    let classNameCaps = words.map((word) => this.capitalize(word)).join("");
    let classNameCamel =
      classNameCaps.charAt(0).toLowerCase() + classNameCaps.slice(1);
    const classDir = path.join(process.cwd(), "src/models");
    const classFilePath = path.join(classDir, `${classNameCamel}Model.js`);

    if (fs.existsSync(classFilePath)) {
      console.error(`File ${classFilePath} already exists.`);
      process.exit(1);
    }

    const classTemplate = `
class ${classNameCaps}Model {
  constructor() {
    // constructor logic
  }

  async getAll${classNameCaps}s(req, res) {
    try {
      //your logic
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  }

  async get${classNameCaps}(req, res) {
    try {
      //your logic
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  }

  async create${classNameCaps}(req, res) {
    try {
      //your logic
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  }

  async delete${classNameCaps}(req, res) {
    try {
      //your logic
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  }

  async edit${classNameCaps}(req, res) {
    try {
      //your logic
    } catch (error) {
      throw new Error('Database query failed: ' + error.message);
    }
  }
}

module.exports = ${classNameCaps}Model;
`;

    fs.mkdirSync(classDir, { recursive: true });
    fs.writeFileSync(classFilePath, classTemplate.trim());
    console.log(
      `Class ${classNameCamel} created successfully at ${classFilePath}`
    );
    process.exit(0);
  }

  capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  verifyName(name) {
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(name);
  }
}

module.exports = EgModel;
