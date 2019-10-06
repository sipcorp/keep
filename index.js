const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('flash');
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// const roleApi = require('./api/role/add')(app)
require('./config/port');
/*
###################### Configuration of  Middleware #####################
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  next();
});
/*
###################### Configuration  of views and routes  #####################
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
require('./api/role/config-role')(app);
require('./api/user/user-api')(app);
require('./api/home/add-task')(app);
require('./api/ticket/ticket')(app);
app.use(express.static(path.join(__dirname, 'public')));
require('./routes/routesSession')(app, passport, LocalStrategy);
require('./session/api-session')(passport);
require('./config/database')(mongoose);
require('./routes/module')(app);
// require('./service/serviceGetUsers')(app)
/*
###################### Configuration of Port  #####################
*/
app.set('port', process.env.PORT || 5055);
/*
###################### Message of server  #####################
*/
app.listen(port, () => {
  console.log(`SERVER LISTEN PORT ${port}`);
});

