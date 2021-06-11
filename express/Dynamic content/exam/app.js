const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

app.use('/users', (req, res) => {
    res.render('users', {users: users});
});

app.use('/add', (req, res) => {
    users.push(req.body.user);
    res.redirect('/users');
});

app.use('/', (req, res) => {
    res.render('form');
});

app.listen(3000);
