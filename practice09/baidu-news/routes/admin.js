/**
 * Created by liuqingqing on 2016/10/12.
 */
var express = require('express');
var router = express.Router();
var News = require('../models/news');
var Category = require('../models/category');
var _ = require('underscore');

// admin home page
router.get('/', function (req, res) {
    News.find({})
        .populate('category', 'name')
        .exec(function (err, news) {
            if (err) {
                console.log(err);
            }

            res.render('list', {
                title: '后台列表页',
                news: news
            })
        })

});

// add news page
router.get('/news/new', function (req, res) {
    Category.find({}, function (err, categories) {
        res.render('admin', {
            title: '百度后台录入页',
            categories: categories,
            news: {}
        })
    })
});

// update news page
router.get('/news/update/:id', function (req, res) {
    var id = req.params.id;

    if (id) {
        News.findById(id, function (err, news) {
            Category.find({}, function (err, categories) {
                res.render('admin', {
                    title: '新闻更新页',
                    news: news,
                    categories: categories
                })
            })
        })
    }
});

// post news
router.post('/news', function (req, res) {
    var id = req.body.news._id;
    var newsObj = req.body.news;
    var _news;

    if (id) {
        News.findById(id, function (err, news) {
            if (err) {
                console.log(err);
            }

            _news = _.extend(news, newsObj);
            _news.save(function (err, news) {
                if (err) {
                    console.log(err);
                }

                // res.redirect('/admin/');
                res.redirect('/news/' + news._id);
            })
        })
    } else {
        _news = new News(newsObj);
        
        var categoryId = newsObj.category;
        var categoryName = newsObj.categoryName;
        
        _news.save(function (err, news) {
            if (err) {
                console.log(err);
            }
            
            if (categoryId) {
                Category.findById(categoryId, function (err, category) {
                    category.news.push(news._id);
                    category.save(function (err, category) {
                        // res.redirect('/admin');
                        res.redirect('/news/' + news._id);
                    })
                })
            } else if (categoryName) {
                var category = new Category({
                    name: categoryName,
                    news: [news._id]
                });
                category.save(function (err, category) {
                    news.category = category._id;
                    news.save(function (err, news) {
                        // res.redirect('/admin');
                        res.redirect('/news/' + news._id);
                    })
                })
            }
        })
        
    }
});

// delete news
router.delete('/', function (req, res) {
    var id = req.query.id;

    if (id) {
        News.remove({_id: id}, function (err, news) {
            if (err) {
                console.log(err);
                res.json({
                    success: 0
                })
            } else {
                res.json({
                    success: 1
                })
            }

        })
    }
});

// add category page
router.get('/category/new', function (req, res) {
    res.render('category_admin', {
        title: '新闻分类录入页',
        category: {}
    });
});

// category list page
router.get('/category/list', function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('category_list', {
            title: '新闻分类列表页',
            categories: categories
        })
    })
});

// delete category page
router.delete('/category/list', function (req, res) {
     var id = req.query.id;
    
    if (id) {
        Category.remove({_id: id}, function (err, category) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: 1
                })
            }
        })
    }
});

// post category
router.post('/category', function (req, res) {
    var id = req.body.category._id;
    var _category = req.body.category;
    var category;

    if (id) {
        Category.findById(id, function (err, cat) {
            if (err) {
                console.log(err);
            }
            
            category = _.extend(cat, _category);
            category.save(function (err, cat) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/category/list');
            })
            
        })
    } else {
        category = new Category(_category);
        
        category.save(function (err, cat) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/category/list');
        })
    }
});

// update category page
router.get('/category/update/:id', function (req, res) {
    var id = req.params.id;
    
    if (id) {
        Category.findById(id, function (err, category) {
            News.find({}, function (err, news) {
                res.render('category_admin', {
                    title: '更新新闻分类',
                    category: category
                })
            })
        })
    }
});

module.exports = router;



















