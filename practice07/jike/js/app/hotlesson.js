/**
 * Created by liuqingqing on 2016/6/7.
 */
// 热门推荐-最新课程-免费课程-项目实战-全球首发-企业合作
define(function (require, exports, module) {
    var hotLesson = {};

    hotLesson.onHover = function () {
        var hotLessonBox = $("#hot-lesson-box");
        var hotLesson = $(".hot-lesson"); // 导航
        var hotLessonLi = $(".hot-lesson li"); // 导航条li
        var lessonListLi = $("#hot-lesson-box .lesson-list li"); // 内容

        // hover 到热门导航条
        hotLessonLi.each(function (index) {

            var i = index + 1;
            var list = $(this);
            list.hover(function () {
                // 先删除on
                hotLesson.find(".on").each(function () {
                    $(this).removeClass("on");
                });
                hotLessonBox.find(".on").each(function () {
                    $(this).removeClass("on");
                });
                // 添加on到新的class里面去
                list.addClass("on");
                $(".lesson-list:nth-child(" + i + ")").addClass("on");
            });

        });

        // hover到课程区
        lessonListLi.each(function (index) {
            var lessonPlay = $(this).find(".lesson-play");
            var lessonInfo = $(this).find(".lesson-info");
            var p = $(this).find("p");
            var level = $(this).find(".zhongji");
            var learnNum = $(this).find(".learn-num");
            
            $(this).hover(function () {
                // 显示播放图标
                lessonPlay.css({
                    "opacity": "1"
                });
                // 避免课程信息被覆盖
                lessonInfo.css({
                    "z-index": 100 - index
                });
                // 显示介绍文字
                p.stop(true, true).slideDown();
                // 显示等级 初级
                level.css({
                    "display": "block"
                });
                // 显示学习人数
                learnNum.css({
                    "display": "block"
                });

            }, function () {
                p.stop(true, true).slideUp();
                lessonPlay.removeAttr("style");
                lessonInfo.removeAttr("style");
                level.removeAttr("style");
                learnNum.removeAttr("style");

            });
        });

    };

    module.exports = hotLesson;
});
