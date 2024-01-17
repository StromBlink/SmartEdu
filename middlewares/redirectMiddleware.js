module.exports = (req, res, next) => {
    const user = req.session.userID;
    if (user) { console.log("then"); return res.redirect('/'); }
    next();
};