const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit"></button> </form>');
});

app.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/', (req, res) => {
    res.send("Hello");
})

app.listen(3000);