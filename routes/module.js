const Module = require('../models/module')

module.exports = (app) => {
    app.get("/get-module", function (req, res) {
        Module.find({}, function (err, doc) {
            if (err) throw err;
            if (doc) {
                res.json({
                    message: true,
                    data: doc
                })
            } else {
                res.json({
                    message: false,
                    data: doc
                })
            }
        });
    });
};

