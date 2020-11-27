var db = require("../../models");

// Import the model (employee.js) to use its database functions.
module.exports = function (app) {

  // Create Routes
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/admin", function (req, res) {
    res.render("admin");
  });

  app.get("/dept", function (req, res) {
    res.render("dept");
  });

  app.get("/analysis", function (req, res) {
    res.render("analysis");
  });

  app.get("/eng", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Engineering'
      }
    }).then(function (dbEmployee) {
      res.render("eng", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/mfg", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Manufacturing'
      }
    }).then(function (dbEmployee) {
      res.render("mfg", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/pm", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Program Management'
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.dept)
      res.render("pm", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/rfb", function (req, res) {
    res.render("rfb", {
      user: dbEmployee.employee_id,
      employeeName: dbEmployee.name,
      dept: dbEmployee.dept,
    });
  });


  app.get("/eng/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("eng", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/update/:id", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
        id: req.params.id
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("update", {
        logId: dbTimesheet.id,
        user: dbTimesheet.employee_id,
        employeeName: dbTimesheet.name,
        // program: dbTimesheet.program,
        // ecr: dbTimesheet.ecr,
        // category: dbTimesheet.category,
        // task: dbTimesheet.task,
        // time: dbTimesheet.time,
        // note: dbTimesheet.note
      });
    });
  });

  app.get("/mfg/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("eng", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/pm/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("eng", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/rfb/:rfb", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
        program: req.params.rfb
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("rfb", {
        program: dbTimesheet.program,
      });
    });
  });

  app.get("/rfb/ecr/:ecr", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
          ecr: req.params.ecr
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("ecr", {
        program: dbTimesheet.program,
        ecr: dbTimesheet.ecr,
      });
    });
  });

};
