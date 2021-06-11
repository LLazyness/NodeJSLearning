const fs = require('fs');
const path = require('path');

const jsonFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
    constructor(title) {
        this.title = title;
        this.products = [];
    }

    read() {
        return new Promise((resolve) => {
            fs.readFile(jsonFile, (err, fileContent) => {
                if (err) {
                    this.products = [];
                } else {
                    this.products = JSON.parse(fileContent.toString());
                }
                resolve();
            })
        })
    }

    save() {
        this.read()
        .then(() => {
            this.products.push({title: this.title});
            fs.writeFile(jsonFile, JSON.stringify(this.products), (err) => {
                console.log(err);
            })
        })
    }

    fetchAll(render) {
        this.read()
        .then(() => {
            render(this.products);
        })
    }
}