const express = require('express');
const mongoose = require('mongoose');


const pageRouter = require('./routers/pageRoute');
const courseRouter = require('./routers/courseRoute');
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
    .then(() => console.log('connetct db'))
    .catch((err) => console.log(err));

//Template Engine
app.set("view engine", "ejs");

// MiddleWares
app.use(express.static('public'));



//Router

app.use('/', pageRouter)
app.use('/courses', courseRouter)



const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})