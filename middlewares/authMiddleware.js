
const User = require('../models/User');

module.exports = (req, res, next) => {
    const user = req.session.userID;
    User.findById(user).then(() => {

        if (!user) { console.log("then"); return res.redirect('/login'); }
        next();
    }).catch(err => {

        if (err || !user) { console.log(err); return res.redirect('/login'); }
        next();
    });



};