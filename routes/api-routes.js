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
                    article.imgSrc = $(element).children("a").children(".c-entry-box--compact__image").children("noscript").html().split('"')[3]
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

    app.delete("/articles/clear", function (req, res) {
        db.Article.deleteMany().then(response => {
            res.json(response)
        }).catch(error => {
            res.json(error)
        })
    })

    //USING THIS ROUTE TO RETURN DATA FOR COMMENT PAGE WITH FULL ARTICLE INFO //
    app.get("/article/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(response => {
                res.json(response)
            })
    })

    app.delete("/article/delete/:id", function (req, res) {
        db.Article.findOneAndRemove({ _id: req.params.id }).then(response => {
            console.log(response)
        })
    })

    //TRIGGERED BY COMMENT BUTTON ON CLICK => RENDER A NEW PAGE WITH THE RESPONSE ARTICLE (INCLUDING COMMENTS)
    app.post("/article/comment/:id", function (req, res) {

        db.Comment.create(req.body)
            .then(dbComment => {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
            })
            .then(dbArticle => {
                res.json(dbArticle);
            })
            .catch(err => {
                res.json(err);
            });

    })

    app.delete("/article/comment/:id", function (req, res) {
        db.Comment.deleteOne({ _id: req.params.id })
            .then(dbComment => {
                res.json(dbComment);
            }).catch(err => {
                res.json(err);
            })

    })

};