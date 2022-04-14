const express = require('express');
const hbs = require('hbs')
const wax = require('wax-on');
require('dotenv').config();

const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);

// require in csurf
const csrf = require('csurf');


// create express app
const app = express();

// setup the express app
app.set('view engine', 'hbs');

app.use(express.static('public'));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(express.urlencoded({
    'extended': false
}))

// custom middlewares
app.use(function(req,res,next){
    // declare a varianle named
    // date that is available for
    // all hbs file to access
    res.locals.date = Date();

    next(); // forward the request to the next middleware
            // or if there is no middleware,to the intended route function
})


// setup sessions
app.use(session({
    'store': new FileStore(),
    'secret':'keyboard cat',
    'resave': false,
    'saveUninitialized': true
}))

// setup flash message
app.use(flash());

// display in the hbs file
app.use(function(req,res,next){
    // transfer any success messages stored in the session
    // to the variables in hbs files
    res.locals.success_messages = req.flash("success_messages");
    res.locals.error_messages = req.flash('error_messages');
    next();    
})

app.use(csrf());

// middleware to share the csrf token with all hbs files
app.use(function(req,res,next){
    // the req.csrfToken() generates a new token
    // and save its to the current session
    res.locals.csrfToken = req.csrfToken();
    next();
})

// middleware to handle csrf errors
// if a middleware function takes 4 arguments
// the first argument is error
app.use(function(err, req,res,next){
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash('error_messages', "The form has expired. Please try again");
        res.redirect('back'); // go back one page
    } else {
        next();
    }
})

// share the details of the logged in user with all routes
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
})


// IMPORT IN THE ROUTES
const landingRoutes = require('./routes/landing');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cloudinaryRoutes = require('./routes/cloudinary')

async function main(){
    app.get('/', function(req,res){
                res.redirect('/landing');
            })

    app.use('/landing', landingRoutes);
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/cloudinary', cloudinaryRoutes);

}
main();

// (async function(){
//     console.log("app")
//     console.log("app.get")
//     app.get('/', function(req,res){
//         console.log(res);
//         res.send("Hello World");
//     })
// })();

app.listen(3000,function(req,res){
    console.log("Server started");
})