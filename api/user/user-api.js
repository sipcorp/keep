const Users = require('../../models/user');
module.exports = (app) => {
  /*############################################### */
  //                   GET USERS 
  /*############################################### */
  app.get("/get-user", function (req, res) {
    //muestra los  nuevos datos ingresados
    Users.find({}
    ).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        user
      });
    });
  });
  
};
