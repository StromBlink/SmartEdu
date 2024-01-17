const User = require('../models/User')


exports.createUser = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.create(req.body)
        res.status(201).json({
            status: 'succes',
            user
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })

    }
}
exports.GetAllCategory = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).render('courses', {
            page_name: 'course',
            user
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

        const user = await User.find({ slug: paramsSlug });

        const page_name = '';
        res.status(200).render('course-single', {
            page_name,
            user
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}