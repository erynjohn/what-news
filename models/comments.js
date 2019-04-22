var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        require: true
    },
    news: {
        type: Schema.Types.ObjectId, ref: "news"
    }
});
var comments = mongoose.model("comments", commentsSchema);

module.exports = comments;