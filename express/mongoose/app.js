const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user1');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('60d24ebba9b893a0e0c03cb2')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect('mongodb+srv://test4:cizHQ8ioIEkwy8yw@cluster0.84l6v.mongodb.net/shop?retryWrites=true&w=majority')
    .then(() => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Vadim',
                        email: 'test@test.ru',
                        cart: {
                            items: []
                        }
                    });
                    user.save().then();
                }
            })
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

