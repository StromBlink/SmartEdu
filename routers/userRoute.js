const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();


router.route('/signup').post(authController.createUser) // get localhost:3000/users/ 
router.route('/login').post(authController.loginUser) // get localhost:3000/users/ 
router.route('/logout').get(authController.logoutUser) // get localhost:3000/users/ 
router.route('/dashboard').get(authMiddleware, authController.getDashboard) // get localhost:3000/users/ 

module.exports = router;
