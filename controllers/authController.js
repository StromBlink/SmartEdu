const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {

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
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Assuming you're sending email and password in the request body 
        const user = await User.findOne({ email }); // Find the user by email 
        if (user) {
            const same = await bcrypt.compare(password, user.password); // Compare passwords 
            if (same) { // Create a user session or send a token 
                req.session.userID = user._id;
                res.redirect('/users/dashboard')
                //  res.status(200).send("You are logged in");
            } else { res.status(401).send("Invalid password"); }
        } else { res.status(404).send("User not found"); }
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message, });
    }
};
exports.logoutUser = async (req, res) => {
    req.session.destroy(() => res.redirect('/'))

};
exports.getDashboard = async (req, res) => {
    const id = req.session.userID
    const user = await User.findOne({ _id: id })
    console.log(user.name)
    console.log(req.session.userID)
    res.render('dashboard', {
        page_name: "dashboard",
        user
    })
}
