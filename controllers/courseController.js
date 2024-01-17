const Course = require('../models/Course')
const Category = require('../models/Category')


exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body)
        res.status(201).json({
            status: 'succes',
            course
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}
exports.GetAllCourse = async (req, res) => {
    try {
        const categorySlug = req.query.categories;

        let filter = {};

        if (categorySlug) {
            const discategory = await Category.findOne({ slug: categorySlug })
            filter = { category: discategory._id }
        }

        const courses = await Course.find(filter)
        const categories = await Category.find().sort({ name: 1 })
        res.status(200).render('courses', {
            page_name: 'courses',
            courses, categories
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}
exports.GetCourse = async (req, res) => {
    try {
        const paramsSlug = req.params.slug;

        const course = await Course.find({ slug: paramsSlug });

        const page_name = '';
        res.status(200).render('course-single', {
            page_name,
            course
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}