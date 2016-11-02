/**
 * Created by liuqingqing on 2016/10/24.
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
    uglify = require('gulp-uglify'), // js压缩
    imagemin = require('gulp-imagemin'), // 图片压缩
    cache = require('gulp-cache'),  // 缓存
    jshint = require('gulp-jshint'), // js检测
    combinejs = require('gulp-seajs-combine'), // seajs 压缩
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    pngcrush = require('imagemin-pngcrush');

// 编译less后压缩css
gulp.task('compileLess', function () {
    return gulp.src(['src/less/index.less', 'src/less/swiper.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gulp.dest('src/dist/css'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('src/dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/dist/css'))
        .pipe(notify({message: 'css task complete'}))
});

// 压缩js seajs模块化特殊处理
gulp.task('scripts', function () {
    gulp.src('src/js/app/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(combinejs(null, {
            except: ['jquery', 'swiper']
        }))
        .pipe(gulp.dest('src/dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true
        }))
        .pipe(gulp.dest('src/dist/js'))
        .pipe(notify({message: 'JS task complete'}));
});

// 压缩图片
gulp.task('images', function () {
    gulp.src('src/img/**')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use:[pngcrush()]
        })))
        .pipe(gulp.dest('src/dist/img'))
});

// 清理
gulp.task('clean', function () {
    gulp.src(['src/dist/css', 'src/dist/js', 'src/dist/img'], {read: false})
        .pipe(clean());
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

// 监听
gulp.task('lessWatch', function () {
    gulp.watch('src/**/*.less', ['compileLess']);
    gulp.watch('src/js/app/main.js', ['scripts']);
    gulp.watch('src/img/*', ['images']);

    var server = livereload();

    gulp.watch(['dist/**']).on('change', function (file) {
        server.changed(file.path);
    })
});

gulp.task('default', ['clean', 'exceptionLess'], function () {
    gulp.start('compileLess', 'scripts', 'images');
});