const Role = require('../../models/role');
module.exports = (app) => {
  /*############################################### */
  //                    ADD ROLE 
  /*############################################### */

  app.post("/add-role", function (req, res) {
    let body = req.body;
    let role = new Role({
      name: body.name,
      module: body.module
    });
    role.save((err, Role) => {
      if (err) {
        return res.json({
          ok: false,
          message: err
        });
      }
      res.json({
        ok: true,
        message: false,
        save: Role
      });
    });
  })

  /*############################################### */
  //                  GET ROLE 
  /*############################################### */

  app.get("/get-role", function (req, res) {
    //muestra los  nuevos datos ingresados
    Role.find({}
    ).exec((err, role) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        role
      });
    });
  });

  /*############################################### */
  //                  DELETE  ROLE 
  /*############################################### */
  app.post("/delete", function (req, res) {
    let id = req.body.id;
    Role.findByIdAndRemove(id, (err, roleDelete) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        Role: roleDelete
      });
    });
  });

};
