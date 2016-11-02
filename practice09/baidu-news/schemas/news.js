/**
 * Created by liuqingqing on 2016/10/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var xss = require('xss');

var NewsSchema = new Schema({
    title: String,
    author: String,
    source: String,
    content: String,
    picUrl: String,
    pv: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    meta: {
        createTime: {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
});

// 为模式添加方法，每次存储数据前会调用此方法
NewsSchema.pre('save', function (next) {
    var obj = this;
    if (obj.isNew) {
        obj.meta.createTime = obj.meta.updateTime = Date.now();
    } else {

        obj.meta.updateTime = Date.now();
    }

    obj.title = xss(obj.title, {});
    obj.author = xss(obj.author, {});
    obj.source = xss(obj.source, {});
    
    next();
});

// 为模式添加静态方法
NewsSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateTime')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};
// NewsSchema.plugin(sanitize, {skip: ['picUrl']});
module.exports = NewsSchema;