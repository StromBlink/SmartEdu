const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),


        body('email').isEmail().withMessage('Please Enter Valid Email')
            .custom((userEmail) => {
                return User.findOne({ email: userEmail }).then(user => {
                    if (user) {
                        return Promise.reject('Email is already exists!')
                    }
                })
            }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],

    authController.createUser); // http://localhost:3000/users/signup

router.route('/signup').post(authController.createUser) // get localhost:3000/users/ 
router.route('/login').post(authController.loginUser) // get localhost:3000/users/ 
router.route('/logout').get(authController.logoutUser) // get localhost:3000/users/ 
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage) // get localhost:3000/users/ 
router.route('/:id').delete(authController.deleteUser) // get localhost:3000/users/ 
module.exports = router;
