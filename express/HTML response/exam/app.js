const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'default.html'));
})

app.listen(3000);