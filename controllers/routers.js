const express = require('express');
const app = express();

//Template Engine
app.set("view engine", "ejs");

// MiddleWares
app.use(express.static('public'));


//router
const router = (page) => {

    app.get(`/${page}`, async (res, req) => {
        console.log('/' + page);
        req.render(page)
    })


}


module.exports = router;