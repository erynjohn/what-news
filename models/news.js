var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newsSchema = new Schema({
    headline: {
        type: String,
        require: true
    },
    summary: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "comments"
    }
});
var news = mongoose.model("news", newsSchema);

module.exports = news;