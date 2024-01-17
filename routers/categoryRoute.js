const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router();


router.route('/').post(categoryController.createCategory) // get localhost:3000/courses
/* router.route('/courses').get(categoryController.GetAllCategory)
router.route('/course-single/:slug').get(categoryController.GetCategory) */



module.exports = router;
