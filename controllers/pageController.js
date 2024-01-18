const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const User = require("../models/User");


exports.getIndexPage = async (req, res) => {
    const courses = await Course.find().sort('-createdAt').limit(2)
    const totalCourses = await Course.find().countDocuments()
    const totalStudents = await User.countDocuments({ role: 'student' })
    const totalTeachers = await User.countDocuments({ role: 'teacher' })

    res.render('index', {
        page_name: "index",
        courses,
        totalCourses,
        totalStudents,
        totalTeachers
    })
}
exports.getAboutPage = (req, res) => {
    res.render('about', { page_name: "about" })
}
exports.getRegisterPage = (req, res) => {
    res.render('register', {
        page_name: "register",
    })
}
exports.getLoginPage = (req, res) => {

    res.render('login', {
        page_name: "login",
    })
}
exports.getContactPage = (req, res) => {
    res.render('contact', { page_name: "contact" })
}
exports.sendMail = async (req, res) => {
    try {
        const outputMessage = `
    <h1>Message Details</h1>
    <ul>
    <li> Name:${req.body.first_name} ${req.body.last_name}</li>
    <li> email:${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.comments}</p>
    `
        console.log(req.body);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "erdem.fatih.ib@gmail.com",
                pass: "yusvvtztutymralv",
            },
        });

        // async..await is not allowed in global scope, must use a wrapper

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Smart EDU Contact Form" <erdem.fatih.ib@gmail.com', // sender address
            to: "erdem_fatih-@hotmail.com", // list of receivers
            subject: "Contact Form New Message", // Subject line
            text: "Hello world?", // plain text body
            html: outputMessage, // html body
        });

        console.log("Message sent: %s", info.messageId);
        req.flash('success', 'We Received your message succesfully')
        res.status(200).redirect('contact')
    } catch (err) {
        req.flash('error', 'Somthing happened!')
        res.status(200).redirect('contact')
    }
}
