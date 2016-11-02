/**
 * Created by liuqingqing on 2016/6/6.
 * js主入口
 */
define('main', function (require, exports, module) {

    $(document).ready(function () {
        require("jquery-1.12.4.min.js");
        require("swiper-3.3.1.min.js");

        // 执行搜索输入框
        var search = require("../app/searchinput");
        search.inOrOut();

        // 课程导航
        var headNav = require("../app/headnav");
        headNav.onHover();

        // 课程列表导航
        var lessonClassify = require("../app/lessonclassify");
        lessonClassify.onHover();

        // 推荐课程-社区-wiki区域
        var recommend = require("../app/recommend");
        recommend.onHoverItem();

        // hover?号图标显示详细信息
        var wayInfo = require("../app/wayinfo");
        wayInfo.onHover();

        // 热门推荐-最新课程-免费课程-项目实战-全球首发-企业合作
        var hotLesson = require("../app/hotlesson");
        hotLesson.onHover();

        // 精品系列课程
        var excellent = require("../app/excellent");
        excellent.onHover();

        // wiki
        var wiki = require("../app/wiki");
        wiki.onHover();

        // 回到顶部
        var goTop = require("../app/gotop");
        goTop.onShow();
        goTop.onTop();

        // 轮播
        var mySwiper = require("../app/swiperlqq");
        mySwiper.onHover();  // hover出现箭头
        mySwiper.bannerSwiper();  // banner轮播
        mySwiper.bannerLessonSwiper(); // banner课程轮播
        mySwiper.enterpriseSwiper();  // 企业合作轮播
        mySwiper.universitySwiper();  // 学校合作轮播
        mySwiper.mediaReportSwiper(); // 媒体报道轮播
    });
    
});

seajs.use('main');