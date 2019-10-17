module.exports = (app, passport, LocalStrategy) => {
  /*
#######################################################
                     LOGIN
#######################################################
*/
  app.post("/login", passport.authenticate("local-signin", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
  }));

  app.get("/", (req, res) => {
    res.render("index", {
      titulo: "home",
      message: req.flash("signinMessage")
    });
  });
  /*
#######################################################
                 USER REGISTER
#######################################################
*/
  app.post("/Signup", passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/Signup",
    failureFlash: true
  }));

  app.get("/Signup", (req, res) => {
    res.render("Login", {
      titulo: "SIP-Signup",
      message: req.flash("Signupmessage")
    });
  });
  /*
  #######################################################
                    AUTHORIZED ACCESS
  #######################################################
  */
  app.get('/home', isAuthenticated, (req, res, next) => {
    res.render('home.ejs', {
      titulo: "home",
      name: req.userCode
    });
  });
  app.get('/about',  (req, res, next) => {
    res.render('about.ejs', {
      titulo: "about",
      name: req.userCode
    });
  });
  app.get('/servicios',  (req, res, next) => {
    res.render('servicio.ejs', {
      titulo: "servicios",
      name: req.userCode
    });
  });
  app.get('/contact',  (req, res, next) => {
    res.render('contact.ejs', {
      titulo: "contactenos",
      name: req.userCode
    });
  });
  app.get('/login',  (req, res, next) => {
    res.render('login.ejs', {
      titulo: "login",
      name: req.userCode
    });
  });
  app.get('/tecno',  (req, res, next) => {
    res.render('tecno.ejs', {
      titulo: "tecnologia",
      name: req.userCode
    });
  });
  app.get('/member',  (req, res, next) => {
    res.render('member.ejs', {
      titulo: "Keep Dashboard",
      name: req.userCode
    });
  });
  app.get('/calculator',  (req, res, next) => {
    res.render('calculator.ejs', {
      titulo: "Calculadora",
      name: req.userCode
    });
  });
  /*
#######################################################
                 CLOSE SESSION
#######################################################
*/
  app.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }
};