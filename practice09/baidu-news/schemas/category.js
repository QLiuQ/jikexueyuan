/**
 * Created by liuqingqing on 2016/10/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var xss = require('xss');

var CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    news: [{
        type: ObjectId,
        ref: 'News'
    }],
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

// 为模式添加方法，每次存储前会调用此方法
CategorySchema.pre('save', function (next) {
    var obj = this;
    if (obj.isNew) {
        obj.meta.createTime = obj.meta.updateTime = Date.now();
    } else {

        obj.meta.updateTime = Date.now();
    }

    obj.name = xss(obj.name, {});

    next();
});

// 为模式添加静态方法
CategorySchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort({'meta.createTime': -1})
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

// CategorySchema.plugin(sanitize);

module.exports = CategorySchema;