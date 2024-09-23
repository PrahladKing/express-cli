#!/usr/bin/env node
const Db = require('./eg-db');
const EgController = require('./eg-controller');
const EgModel = require('./eg-model');

const type = process.argv[2];
const className = process.argv[3];


function main() {
    switch (type) {
        case "db":
            const db = new Db();
            db.create(className);
            break;
        case "controller":
            const controller = new EgController();
            controller.create(className);
            break;
        case "model":
            const model = new EgModel();
            model.create(className);
            break;
        default:
            console.log("Invalid arguments");
            break;
    }    
}

main();

