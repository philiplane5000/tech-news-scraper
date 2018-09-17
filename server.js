const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper");

// ROUTES
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`)
})
