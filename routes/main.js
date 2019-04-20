var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');

var db = require("../models");

var router = express.Router();

// Gets the news from nytimes
router.get('/get-news', function (req, res, next) {
  axios.get("https://www.nytimes.com/section/technology")
    .then(function (response) {
      var $ = cheerio.load(response.data);
      // loop over articles
      $('.css-1i4ie59').each(function(i, element) {
        var result = {};
        var articleArr = [];
        result.img = $(this).find('img').attr('src');
        result.headline = $(this).find('a').text();
        result.url = 'https://www.nytimes.com'+$(this).find('a').attr('href');
        articleArr.push(articleArr);
        //create news articles
        db.news.create(result)
        .then(function (dbnews) {
          console.log(dbnews);
          res.redirect("/");
          })
          .catch(function (err) { 
            if(err.code == 11000) {
              res.redirect("/");
            } else { next(err); }
          });
        });
    });
});
//Render news from nytime
router.get("/", function (req, res, next) {
  db.news.find({})
    .then(function (dbnews) {
      res.render('index', {dbnews: dbnews});

    })
    .catch(function (err) { throw err });
});

//Render API
router.get("/api/news", ((req, res, next) => {
  db.news.find({})
  .then(((dbnews) => { 
    res.json(dbnews)
  }))
  .catch((err) => { throw err })
  
}))



module.exports = router;
