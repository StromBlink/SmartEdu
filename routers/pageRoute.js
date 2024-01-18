const express = require('express')
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();


router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendMail)
//router.route('/:page').get(pageController.getPage)


module.exports = router;
