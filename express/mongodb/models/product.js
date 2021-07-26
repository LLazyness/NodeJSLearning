const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
        if (id) {
            this._id = new mongodb.ObjectID(id);
        }
    }

    save() {
        const db = getDb();
        let operation;
        if (this._id) {
            operation = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            operation = db.collection('products').insertOne(this);
        }

        return operation
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err)
            })
    }


    static findById(prodID) {
        const db = getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(prodID)})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static remove(prodID) {
        const db = getDb();
        return db.collection('products').remove({_id: new mongodb.ObjectId(prodID)})
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;