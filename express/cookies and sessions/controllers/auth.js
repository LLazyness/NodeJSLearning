const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: true
  });
};

exports.postLogin = (req, res, next) => {
        res.setHeader('Set-Cookie', `user=60d48b7572f3c0805c75b6b7`);
        req.session.isLoggedIn = true;
        res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    });
};
