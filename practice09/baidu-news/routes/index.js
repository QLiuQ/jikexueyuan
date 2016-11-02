var express = require('express');
var router = express.Router();
var News = require('../models/news');
var Category = require('../models/category');

/* GET home page. */
router.get('/', function (req, res) {

    var id = req.query.id;
    if (id) {
        Category
            .find({_id: id})
            .populate({
                path: 'news',
                select: 'title picUrl source meta.createTime'
            })
            .exec(function (err, category) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(category[0].news);

                }
            });

    } else {
        Category
            .find({})
            .populate({
                path: 'news',
                select: 'title picUrl source meta.createTime'
            })
            .exec(function (err, categories) {
                if (err) {
                    console.log(err);
                }

                res.render('index', {
                    categories: categories,
                    news: categories[0]
                });
            });

    }

});

module.exports = router;
