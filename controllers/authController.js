const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const Category = require('../models/Category');
const Course = require('../models/Course');




exports.createUser = async (req, res) => {
    try {

        const user = await User.create(req.body).catch((err) => {
            console.log(err);
            req.flash("error", "Something Went Wrong");
            res.status(400).redirect('/register');
        })
        res.redirect('/login')
    } catch (error) {
        console.log(error)

        const errors = validationResult(req);
        console.log(errors);
        console.log(errors.array()[0].msg);

        for (let i = 0; i < errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg}`);
        }

        res.status(400).redirect('/register');

    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Assuming you're sending email and password in the request body 
        const user = await User.findOne({ email }); // Find the user by email 
        if (user) {
            const same = await bcrypt.compare(password, user.password); // Compare passwords 
            if (same) {
                req.session.userID = user._id;
                res.redirect('/users/dashboard')
            } else {
                req.flash("error", "Your password is not correct!");
                res.status(400).redirect('/login');
            }


        } else {
            req.flash("error", "User is not exist!");
            res.status(400).redirect('/login');
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message, });
    }
};
exports.logoutUser = async (req, res) => {
    req.session.destroy(() => res.redirect('/'))

};
exports.getDashboardPage = async (req, res) => {
    const id = req.session.userID
    const courses = await Course.find({ user: id });
    const user = await User.findOne({ _id: id }).populate('courses');
    const categories = await Category.find();
    const users = await User.find();
    res.render('dashboard', {
        page_name: "dashboard",
        user,
        categories,
        courses,
        users
    })
}
exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        await Course.deleteMany({ user: req.params.id })

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}
