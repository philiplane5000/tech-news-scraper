// const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios")
const cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/scrape", function (req, res) {

        axios.get("https://www.theverge.com/tech")
            .then(response => {

                const $ = cheerio.load(response.data);

                $("div .c-entry-box--compact--article").each((i, element) => {

                    let article = {};
                    //article.imgSrc => INEXPLICABLY NOT GRABBING THE RIGHT LINK://
                    // article.imgSrc = $(element).children("a").children(".c-entry-box--compact__image").children(".c-dynamic-image").attr("src")
                    article.title = $(element).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").text()
                    article.link = $(element).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").attr("href")
                    article.author = $(element).children(".c-entry-box--compact__body").children(".c-byline").children(".c-byline__item").children("a").text()
                    article.authorLink = $(element).children(".c-entry-box--compact__body").children(".c-byline").children(".c-byline__item").children("a").attr("href")

                    //REVIEW RESULTS IN CONSOLE FOR NOW:
                    console.log(JSON.stringify(article, undefined, 2))
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

    app.post("/article/test-save", function (req, res) {

        let article = req.body;
        console.log(article)

        db.Article.create(article)
            .then(dbArticle => {
                res.json(dbArticle)
            })
            .catch(function (err) {
                console.log(err)
            });

    })
}
