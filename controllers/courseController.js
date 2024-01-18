const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User');
const { splitText } = require('../middlewares/textCalculator');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID
        });

        req.flash('success', `${course.name} has been created  successfully`)
        res.status(201).redirect('/courses');
    } catch (error) {
        req.flash('error', `Something happened!`)
        res.status(404).redirect('/courses');
    }
}
exports.GetAllCourse = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        const query = req.query.search;

        const category = await Category.findOne({ slug: categorySlug })
        let filter = {};

        if (categorySlug) {
            filter = { category: category._id }
        }
        if (query) {
            filter = { name: query }
        }
        if (!query && !categorySlug) {
            filter.name = '',
                filter.Category = null
        }
        const courses = await Course.find({
            $or: [
                { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
                { category: filter.category }
            ]
        }).sort('-createdAt').populate('user')
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
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({ slug: paramsSlug }).populate('user')
        const categories = await Category.find().sort({ name: 1 })
        const description = splitText(course.description);
        const page_name = '';
        res.status(200).render('course-single', {
            page_name,
            course,
            user,
            categories,
            description
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error
        })
    }
}
exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);

        await user.courses.push({ _id: req.body.course_id });
        await user.save();

        req.flash('success', `Registered successfully`)
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash('error', `Something happened!`)
        res.status(200).redirect('/courses');
    }
};
exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
exports.deleteCourse = async (req, res) => {

    try {


        const course = await Course.findOneAndDelete({ slug: req.params.slug })
        console.log(course);
        req.flash("error", `${course.name} has been removed successfully`);

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
exports.updateCourse = async (req, res) => {

    try {


        const course = await Course.findOne({ slug: req.params.slug })
        course.name = req.body.name
        course.description = req.body.description
        course.category = req.body.category
        course.save()
        req.flash("success", `${course.name} has been updated successfully`);

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};