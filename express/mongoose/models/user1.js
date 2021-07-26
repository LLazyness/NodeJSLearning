const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number, required: true
            }
        }]
    },
    order: [{
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number, required: true
            }
        }]
    }]
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    })
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        updatedCartItems.push({productId: product._id, quantity: newQuantity})
    }

    this.cart = {
        items: updatedCartItems
    };

    this.save();
}

userSchema.methods.removeFromCart = function(productId) {
    this.cart.items = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    return this.save();
}

userSchema.methods.addOrder = function () {
    this.order.push({items: [...this.cart.items]});
    this.cart.items = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

/*

    addOrder() {
        const db = getDb();
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: this._id,
                        name: this.name
                    }
                }
                return db.collection('orders')
                    .insertOne(order)
            })
            .then(result => {
                this.cart = {items: []}
                return db
                    .collection('users')
                    .updateOne(
                        {_id: this._id},
                        {$set: {cart: {items: []}}}
                    )
            })

    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({'user._id': this._id}).toArray();
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({_id: mongodb.ObjectId(userId)})
            .then(user => {
                return user
            });
    }

}


module.exports = User;*/