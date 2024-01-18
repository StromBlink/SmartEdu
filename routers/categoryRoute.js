const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router();

// get localhost:3000/category
router.route('/create').post(categoryController.createCategory)
router.route('/:id').delete(categoryController.deleteCategory)



module.exports = router;
