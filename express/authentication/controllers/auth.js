const User = require('../models/user');

const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false,
        csrfToken: req.csrfToken()
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        csrfToken: req.csrfToken()
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                })

        })
        .catch(err => console.log(err));
};

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        const userDoc = await User.findOne({email: email})

        if (userDoc) {
            return res.redirect('/signup');
        }

        const hash = await bcrypt.hash(password, 12);

        const user = new User({
            name: 'test',
            email: email,
            password: hash,
            cart: {items: []}
        });

        await user.save();

        res.redirect('/login');
    } catch (e) {
        console.log(e);
    }

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
