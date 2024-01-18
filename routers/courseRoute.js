const express = require('express')
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();


router.route('/courses').post(roleMiddleware(["teacher", "admin"]), courseController.createCourse) // get localhost:3000/courses
router.route('/courses').get(courseController.GetAllCourse)
router.route('/course-single/:slug').get(courseController.GetCourse)
router.route('/courses/enroll').post(courseController.enrollCourse);
router.route('/courses/release').post(courseController.releaseCourse);

module.exports = router;
