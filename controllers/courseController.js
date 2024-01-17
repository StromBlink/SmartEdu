const Course = require('../models/Course')


exports.createCourse = async (req, res) => {
    const course = await Course.create(req.body)
    try {
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