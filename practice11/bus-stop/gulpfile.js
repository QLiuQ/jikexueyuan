/**
 * Created by liuqingqing on 2016/10/27.
 */
// 导入工具包 node_modules对应的模块
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),// css压缩
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'), // 提示信息
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'), // 文件更名
    concat = require('gulp-concat'), // 文件合并
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload');

// 编译less后压缩css
gulp.task('compileLess', function () {
    return gulp.src(['src/less/index.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message: 'css task complete'}))
});

// 异常处理
gulp.task('exceptionLess', function () {
    gulp.src('src/less/*.less')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

// 清理
gulp.task('clean', function () {
    gulp.src(['dist/css'], {read: false})
        .pipe(clean());
});

// 监听
gulp.task('lessWatch', function () {
    gulp.watch('src/**/*.less', ['compileLess']);

    var server = livereload();

    gulp.watch(['dist/**']).on('change', function (file) {
        server.changed(file.path);
    })
});

gulp.task('default', ['clean', 'exceptionLess'], function () {
    gulp.start('compileLess');
});
