var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');

var db = require("../models/");

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

        articleArr.push(result);
        //create news articles
        db.news.create(articleArr)
        .then(function (dbnews) {
          res.redirect("/");
          })
          .catch(function (err) { 
            if(err.code == 11000) {
              res.redirect("/");
            }
          });
        });
    });
});
//Render news from nytime
router.get("/", function (req, res, next) {
  db.news.find({})
    .then(function (dbnews) {
      res.render('index', {dbnews: dbnews});
      console.log(dbnews)

    })
    .catch(function (err) { throw err });
});

//Render API
router.get("/api/news", ((req, res, next) => {
  db.news.find({})
  .populate("comments")
  .exec(((err, dbnews) => {
    if(err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(dbnews)
    }
  }));
}));

router.get("/api/comments", ((req, res, next) => {
  comments.find({})
  .exec((err, dbcomments) => {
    if(err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(dbcomments)
    }
  })
}))

router.get("/api/news/:id", ((req, res) => {
  db.news.findOne({"_id": req.params.id})
  .populate("comments")
  .exec((err, dbnews) => {
    if(err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(dbnews)
    }
  });
}));
router.post("/api/news/:id", ((req, res) => {
  db.comments.create(req.body)
  .then(function(dbcomments) {
    res.json(dbcomments)
    console.log(dbcomments)
    return db.news.findOneAndUpdate({_id: req.params.id},{$push:{comments: dbcomments._id}}, {new: true})
  })
  .then(function(dbnews) { res.json(dbnews)})
  .catch(function(err) { res.json(err) });
}));

router.post("/api/delete/:id", ((req, res) => {
  db.comments.findByIdAndDelete(req.body._id)
  .then(function(dbcomments) {
    res.json(dbcomments)
    console.log(dbcomments)
    return db.news.findOneAndUpdate({_id: req.params.id},{$push:{comments: dbcomments._id}}, {new: true})
  })
  .then(function(dbnews) { res.json(dbnews)})
  .catch(function(err) { res.json(err) });
}));

module.exports = router;