const Category = require('../models/Category')
const Course = require('../models/Course')


exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).redirect('/users/dashboard')
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}
exports.GetAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).render('courses', {
            page_name: 'course',
            courses
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}
exports.GetCategory = async (req, res) => {
    try {
        const paramsSlug = req.params.slug;

        const category = await Category.find({ slug: paramsSlug });

        const page_name = '';
        res.status(200).render('course-single', {
            page_name,
            category
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await Category.findByIdAndDelete(id);
        await Course.deleteMany({ user: id })
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}