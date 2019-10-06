const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'userCode',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, userCode, password, done) => {
    const user = await User.findOne({
      'userCode': userCode
    })
    console.log(user)
    if (user) {
      return done(null, false, req.flash('signupMessage', 'The name is already Taken.'));
    } else {
      let body = req.body;
      let newUser = new User({
        userCode: body.userCode,
        fullName: body.fullName,
        role: body.role,
        cargo: body.cargo,
        gender: body.gender,
        password: cryptr.encrypt(body.password),
        date: body.date ,
        email: body.email,
        tel: body.tel,
        movile: body.movile,
        direction: body.direction,
        lastLogin: body.lastLogin,
      });
      // + ' ' + '19:00:00.000'
      console.log(newUser)
      await newUser.save();
      done(null, newUser);
    }
  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'userCode',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, userCode, password, done) => {
    const user = await User.findOne({
      userCode: userCode
    });
    if (!user) {
      return done(null, false, req.flash('signinMessage', 'No User Found'));
    } else {
      cryptr.decrypt(user.password)
    }
    return done(null, user);
  }));
};