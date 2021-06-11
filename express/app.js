const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log('In the middleware');
    res.send('<html>Hello from product</html>');
});

app.use((req, res, next) => {
    console.log('In the middleware');
    next();
});

app.use((req, res, next) => {
    console.log('In another middleware');
    res.send('<html>Hello from Express</html>');
});

app.listen(3000);