const fs = require('fs');
const jsonPath = 'data/cart.json';

module.exports = class Cart {
    read() {
        return new Promise((resolve) => {
            fs.readFile(jsonPath, (err, content) => {
                if (!err) {
                    this.cart = JSON.parse(content.toString());
                } else {
                    this.cart = {products: [], totalPrice: 0};
                }
                resolve();
            })
        })
    }

    getCart(cb) {
        this.read().then(() => {
            cb(this.cart);
        })
    }

    addProduct(id, price) {
        this.read().then(() => {
                const existingIndex = this.cart.products.findIndex(product => product.id === id);
                const existingProduct = this.cart.products[existingIndex];

                if (existingProduct) {
                    this.cart.products[existingIndex].qty += 1;
                } else {
                    this.cart.products.push({id: id, qty: 1});
                }

                this.cart.totalPrice += +price;

                fs.writeFile(jsonPath, JSON.stringify(this.cart), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        )
    }

    deleteProduct(id, price) {
        this.read().then(() => {
            const updatedCart = this.cart;
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice -= price * productQty;
            fs.writeFile(jsonPath, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
}