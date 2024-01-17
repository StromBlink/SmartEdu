const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();


router.route('/signup').post(authController.createUser) // get localhost:3000/courses
/* router.route('/courses').get(categoryController.GetAllCategory)
router.route('/course-single/:slug').get(categoryController.GetCategory) */



module.exports = router;
