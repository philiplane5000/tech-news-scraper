const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({

    title: {
        type: String,
        require: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
    },
    authorLink: {
        type: String,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

})

let Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;