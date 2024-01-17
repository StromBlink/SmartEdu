const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router();


router.route('/courses').post(courseController.createCourse) // get localhost:3000/courses
router.route('/courses').get(courseController.GetAllCourse)
router.route('/course-single/:slug').get(courseController.GetCourse)



module.exports = router;
