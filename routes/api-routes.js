module.exports = function (app) {
    app.get("/api/articles", function (req, res) {
        db.Article.find({}, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                res.json(docs)
            }
        })
    })
}