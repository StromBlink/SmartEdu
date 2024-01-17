
exports.getPage = (req, res) => {
    res.render(req.params.page, { page_name: req.params.page });
};
exports.getIndexPage = (res, req) => {
    req.render('index', { page_name: "index" })
}
exports.getAboutPage = (res, req) => {
    req.render('about', { page_name: "about" })
}
