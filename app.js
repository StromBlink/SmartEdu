const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('connect-flash');


const pageRouter = require('./routers/pageRoute');
const courseRouter = require('./routers/courseRoute');
const categoryRoute = require('./routers/categoryRoute');
const userRoute = require('./routers/userRoute');
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
    .then(() => console.log('connetct db'))
    .catch((err) => console.log(err));

//Template Engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;

// MiddleWares

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })

}))
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})

app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);


//Router
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
})
app.use('/', pageRouter)
app.use('/', courseRouter)
app.use('/category', categoryRoute);
app.use('/users', userRoute);



const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})