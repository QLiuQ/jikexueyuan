/**
 * Created by liuqingqing on 2016/10/12.
 */
var mongoose = require('mongoose');

var NewsSchema = require('../schemas/news');
var News = mongoose.model('News', NewsSchema);

module.exports = News;