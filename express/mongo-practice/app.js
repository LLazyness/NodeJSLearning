const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const movieRoutes = require('./routes/movie');
const userRoutes = require('./routes/user_');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(movieRoutes);
app.use(userRoutes);

app.use(errorController.get404);

mongoose
    .connect('mongodb+srv://test4:cizHQ8ioIEkwy8yw@cluster0.84l6v.mongodb.net/shop?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

