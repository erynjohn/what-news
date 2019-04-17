var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');

var db = require("../models");

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Newses News' });

});
// Gets the news from nytimes
router.get('/get-news', function (req, res, next) {
  axios.get("https://www.nytimes.com/section/technology")
    .then(function (response) {
      var $ = cheerio.load(response.data);
      //get headline element
      $(".css-l2vidh").each(function (i, elem) {
        var result = {};
        //save response to result
        result.headline = $(this).children("a").text();
        result.url = $(this).children("a").attr("href");

        //create new article
        db.news.create(result)
          .then(function (dbnews) {
            console.log(dbnews);
          })
          .catch(function (err) { throw err })
      });

    });
  res.render('index', { title: 'Newses News' });

});
//displays news from nytime
router.get("/news", function (req, res) {
  db.news.find({})
    .then(function (dbnews) {
      res.json(dbnews);
    })
    .catch(function (err) {
      throw err
      res.json(err);
    })
});



module.exports = router;
