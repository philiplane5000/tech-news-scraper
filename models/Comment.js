const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    user: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
})

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;