const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log("second call");
    res.send('<html>hello</html>');
});

app.use('/', (req, res, next) => {
   console.log("first call");
    res.send('<html>test</html>');
});

app.listen(3000);