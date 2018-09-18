// const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/scrape", function (req, res) {

        axios.get("https://www.theverge.com/tech")
            .then(response => {

                const $ = cheerio.load(response.data);
                let newArticles = []

                $("div .c-entry-box--compact--article").each((i, element) => {

                    let article = {};
                    //WITTLE THIS DOWN WITH $(element).children().FIND(".className")//
                    article.imgHTML = $(element).children("a").children(".c-entry-box--compact__image").children("noscript").html()
                    article.title = $(element).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").text()
                    article.link = $(element).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").attr("href")
                    article.author = $(element).children(".c-entry-box--compact__body").children(".c-byline").children(".c-byline__item").children("a").text()
                    article.authorLink = $(element).children(".c-entry-box--compact__body").children(".c-byline").children(".c-byline__item").children("a").attr("href")
                    newArticles.push(article)
                })
                Promise
                    .all(newArticles)
                    .then(data => {
                        res.json(data)
                    })
            })
    })

    app.get("/articles", function (req, res) {

        db.Article.find({}, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                res.json(docs)
            }
        })

    })

    app.post("/article/save", function (req, res) {

        let article = req.body.newArticle;
        console.log(article)

        db.Article.create(article)
            .then(dbArticle => {
                res.json(dbArticle)
            })
            .catch(function (err) {
                console.log(err)
            });

    })

    app.delete("/article/delete/:id", function (req, res) {
        console.log(req.params.id)
        db.Article.findOneAndRemove({_id: req.params.id}).then(response => {
            console.log(response)
        })
    })
}
