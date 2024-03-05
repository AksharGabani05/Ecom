const express = require('express');
const port = 8090;
const app = express();
const path = require('path');

const db = require('./config/mongoose');//offline database leva mate ane un coment karvi

// const mongoose = require('mongoose')
// mongoose.connect(("mongodb+srv://kanabarakshar08:AKSHAR@akshar.7qjb0c5.mongodb.net/Ecommerce"), {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
//     .then(() => console.log('Database Connected'))
//     .catch((err) => console.log(err)); //offline daqtabase letivakhte a code ne comment karvo 


app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');
const falsh = require('connect-flash');
app.use(falsh())
app.use(express.json());
const custmflash = require("./config/Custemflash");

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const googleauth = require("./config/google-autho")
const user = require("./config/user-google-autho")
const google = require("passport-google-oauth20");

app.use(express.urlencoded());

app.use(session({
    name : "Akshar",
    secret:"ak",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*100
    }
}))
app.use(custmflash.Setflash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAutho);
app.use('/admin',require('./routes/admin'));
app.use('/',require('./routes/user'))
app.use(express.static(path.join(__dirname,'assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(express.static(path.join(__dirname,'user_assets')));





app.listen(port,(err)=>{
    if(err)
    console.log(err);
    console.log("servedr runing in port",port);
})
