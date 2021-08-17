const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/users');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function () {
    before(function (done) {
        mongoose.connect('mongodb+srv://test4:cizHQ8ioIEkwy8yw@cluster0.84l6v.mongodb.net/test-messages')
            .then(() => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'tester',
                    name: 'Test',
                    post: [],
                    _id: '6101b794b550444b88a65f35'
                });
                return user.save();
            })
            .then(() => {
                done();
            })
    })

    it('should throw an error with code 500 if accessing the database fails', function () {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };

        AuthController.login(req, {}, () => {
        })
            .then(result => {
                expect(result).to.be.an('error');
                expect(result).to.have.property('statusCode', 500);
                done();
            });

        User.findOne.restore();
    });

    it('should send a response with a valid user status for an existing user', function (done) {
        const req = {userId: '6101b794b550444b88a65f35'};
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };
        done();
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            })
    });
})