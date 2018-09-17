const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios")
const path = require("path")

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })

}