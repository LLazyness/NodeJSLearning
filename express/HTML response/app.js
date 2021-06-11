const express = require('express');
const path = require('path');

const app = express();

const rootDir = require('../util/path');

const adminRoutes = require('./routes/admin');
const shopRoute = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes.router);
app.use(shopRoute);

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000);