/**
 * Created by liuqingqing on 2016/10/12.
 */

var express = require('express');
var router = express.Router();
var News = require('../models/news');

router.get('/:id', function (req, res) {
    var id = req.params.id;

    News.update({_id: id}, {$inc: {pv: 1}}, function (err) {
        if (err) {
            console.log(err);
        }
    });

    News.findById(id, function (err, news) {
        if (err) {
            console.log(err);
        }
        res.render('detail', {
            news: news
        });
    });

});

module.exports = router;