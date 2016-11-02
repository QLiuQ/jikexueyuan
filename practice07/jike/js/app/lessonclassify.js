/**
 * Created by liuqingqing on 2016/6/7.
 */
// 课程分类导航

define(function (require, exports, module) {

    var lessonClassify = {};

    lessonClassify.onHover = function () {

        var liItems = $(".lesson-classify-nav li"); // 课程li项
        
        liItems.each(function () {
            var lessonList = $(this).children(".lesson-list-show");
            $(this).hover(function () {
                lessonList.show();
                $(this).css({
                    "background": "#fff",
                    "border-left": "2px solid #35b558",
                    "border-right": "0"
                });

            }, function () {
                lessonList.hide();
                $(this).removeAttr("style");
            });
        });
        
    };

    module.exports = lessonClassify;
});