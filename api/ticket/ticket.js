const Ticket = require('../../models/ticket');
module.exports = (app) => {
    /*############################################### */
    //                    ADD ROLE 
    /*############################################### */

    app.post("/add-ticket", function (req, res) {
        let body = req.body;
        let ticket = new Ticket({
            ticketNum: body.ticketNum,
            typeService: body.type,
            name: body.name,
            email: body.email,
            phone: body.phone,
            subject: body.subject,
            message: body.message,
            status: "NA",
            owner: "N",
            lastUpdate: body.lastUpdate
        });
        ticket.save((err, ticket) => {
            if (err) {
                return res.json({
                    ok: false,
                    message: err
                });
            }
            res.json({
                ok: true,
                message: false,
                save: ticket
            });
        });
    })

    /*############################################### */
    //                  GET ROLE 
    /*############################################### */

    app.get("/get-ticket", function (req, res) {
        //muestra los  nuevos datos ingresados
        Ticket.find({}
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
    //                  GET TIKCET BY OWNER
    /*############################################### */

    app.post("/get-ticket-owner", function (req, res) {
        var body = req.body
        let owner = body.owner

        //muestra los  nuevos datos ingresados
        Ticket.find({ owner: owner }
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
    //                  UPDATE ROLE 
    /*############################################### */

    app.post("/add-owner", function (req, res) {
        let body = req.body;
        let id = body.ticketNum;
        let owner = body.owner;

        Ticket.findOneAndUpdate({ ticketNum: id },
            { $set: { owner: owner, status: "O" } },
            function (err, doc) {
                if (err) {
                    return res.json({
                        ok: false,
                        message: err
                    });
                }
                res.json({
                    ok: true,
                    message: false,
                    update: doc
                });
            }
        );
    });

     /*############################################### */
    //                  UPDATE STATUS 
    /*############################################### */

    app.post("/update-status", function (req, res) {
        let body = req.body;
        let id = body.ticketNum;
        let status = body.status;

        Ticket.findOneAndUpdate({ ticketNum: id },
            { $set: { status: status } },
            function (err, doc) {
                if (err) {
                    return res.json({
                        ok: false,
                        message: err
                    });
                }
                res.json({
                    ok: true,
                    message: false,
                    update: doc
                });
            }
        );
    });
};
