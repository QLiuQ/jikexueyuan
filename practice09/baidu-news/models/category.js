/**
 * Created by liuqingqing on 2016/10/12.
 */
var mongoose = require('mongoose');

var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;