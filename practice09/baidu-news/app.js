var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require('ueditor-nodejs');

var routes = require('./routes/index');
var admin = require('./routes/admin');
var detail = require('./routes/detail');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/baidu");
// view engine setup
app.set('views', path.join(__dirname, './views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 表单数据格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');

app.use('/', routes);
app.use('/admin', admin);
app.use('/news', detail);

// setting ueditor for nodejs
app.use('/ueditor/ue', ueditor({
    configFile: '/ueditor/nodejs/config.json',
    mode: 'bcs',
    accessKey: 'Adxxxxxxx',
    secrectKey: 'oiUqt1VpH3fdxxxx',
    staticPath: path.join(__dirname, 'public'),
    dynamicPath: '/blogpicture'

}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
