const moment = require("moment");
var db = require("../../models");

module.exports = function (app) {
    app.get("/api/timesheets", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/users/:user", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                employee_id: req.params.user
            },
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/entries/:id", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                id: req.params.id
            },
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/limit=50", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/limit=50/eng", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
                where: {
                    dept: 'Engineering'
                },
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/limit=50/mfg", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
                where: {
                    dept: 'Manufacturing'
                },
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/limit=50/pm", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
                where: {
                    dept: 'Program Management'
                },
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/limit=50/:user?", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                employee_id: req.params.user
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/programs/:rfb", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                program: req.params.rfb
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/programs/ecr/:ecr", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                ecr: req.params.ecr
            },
            order: [
                ['id', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // Data based on last Xn of days
    app.get("/api/timesheets/tasks", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                createdAt: {
                    $gte: moment().subtract(7, 'days').toDate()
                }
            },
            order: [
                ['date', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.post("/api/timesheets", function (req, res) {
        db.Timesheet.create(req.body,
            {
                include: [db.Employee],
            }).then(function (dbTimesheet) {
                res.json(dbTimesheet);
            });
    });

    app.delete("/api/timesheets/entries/:id", function (req, res) {
        db.Timesheet.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.put("/api/timesheets/entries/:id", function (req, res) {
        db.Timesheet.update(req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbTimesheet) {
                res.json(dbTimesheet);
            });
    });

};

