const Task = require('../../models/task');
module.exports = (app) => {
  /*############################################### */
  //                    ADD ROLE 
  /*############################################### */

  app.post("/add-task", function (req, res) {
    let body = req.body;
    let task = new Task({
        name: body.name,
        contact:body.contact,
        saleEstimate: body.sale,
        closingDate:body.date,
        email:body.email,
        movile:body.movile,
        phone:body.phone,
        address:body.address,
        position:1
   
    });
    task.save((err, task) => {
      if (err) {
        return res.json({
          ok: false,
          message: err
        });
      }
      res.json({
        ok: true,
        message: false,
        save: task
      });
    });
  })

  /*############################################### */
  //                  GET ROLE 
  /*############################################### */

  app.get("/get-task", function (req, res) {
    //muestra los  nuevos datos ingresados
    Task.find({}
    ).exec((err, info) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        task: info
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
