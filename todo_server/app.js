const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

//import dependencies
const dependencies = require('./dependencies/dependencies');

const Messages = require('./models/messages')
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const mysqlConnection = require('./db/mysql');

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome!" });
});

//user
const taskDBHelper = require('./database-helpers/task-db-helpher')(mysqlConnection, null);
const taskRouteMethods = require('./src/task/task-route-methods')(taskDBHelper, Messages);
const taskRoutes = require('./src/task/task-routes')(express.Router(), app, taskRouteMethods);


app.use('/api', taskRoutes);



// require("./app/routes/tutorial.routes.js")(app);

// PORT - 5000
const PORT = dependencies.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
