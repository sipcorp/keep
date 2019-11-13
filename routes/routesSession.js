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
      titulo: "Home",
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
      titulo: "Home",
      name: req.userCode
    });
  });
  app.get('/about',  (req, res, next) => {
    res.render('about.ejs', {
      titulo: "Nosotros",
      name: req.userCode
    });
  });
  app.get('/servicios',  (req, res, next) => {
    res.render('servicio.ejs', {
      titulo: "Servicios",
      name: req.userCode
    });
  });
  app.get('/contact',  (req, res, next) => {
    res.render('contact.ejs', {
      titulo: "Contactenos",
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
      titulo: "Tecnologia",
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
  app.get('/blog',  (req, res, next) => {
    res.render('blog.ejs', {
      titulo: "Blog",
      name: req.userCode
    });
  });
  app.get('/post',  (req, res, next) => {
    res.render('single-post.ejs', {
      titulo: "Post",
      name: req.userCode
    });
  });
  app.get('/keep',  (req, res, next) => {
    res.render('keep.ejs', {
      titulo: "Post",
      name: req.userCode
    });
  });
  app.get('/add-article',  (req, res, next) => {
    res.render('blogAdd.ejs', {
      titulo: "Post",
      name: req.userCode
    });
  });
  app.get('/validate',  (req, res, next) => {
    res.render('validate.ejs', {
      titulo: "Validaciones",
      name: req.userCode
    });
  });
  app.get('/research',  (req, res, next) => {
    res.render('research.ejs', {
      titulo: "Eficiencia Biologica",
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