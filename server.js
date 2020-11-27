var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// var routes = require("./controllers/routes/api-employee-routes.js");
// var routes = require("./controllers/routes/html-routes.js");

// app.use(routes);

//Routes
require("./controllers/routes/api-employee-routes.js")(app);
require("./controllers/routes/api-timesheet-routes.js")(app);
require("./controllers/routes/html-routes.js")(app);

// Partials functions
// Handlebars.registerHelper('mgr', '{{partials}}');


// Syncing our sequelize models and then starting our Express app
// =============================================================
// { force: true }

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});