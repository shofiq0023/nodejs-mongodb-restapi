const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbUri = "mongodb+srv://admin:admin@teset-cluster.ntezf7s.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8023;

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(dbUri);
app.use(express.static("public"));

const employeesRouter = require("./routes/employees.js");

// '/api/employees'
app.use("/api", employeesRouter);

app.listen(PORT, () => {
    console.log("Server connected to : " + PORT);
})

