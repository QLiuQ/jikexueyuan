/**
 * Created by liuqingqing on 2016/6/8.
 */

// hover?显示更多信息
define(function (require, exports, module) {
    var wayInfo = {};

    wayInfo.onHover = function () {
        var indexTitle = $(".index-public-title");
        var way = $(".way");

        indexTitle.each(function () {
            var way = $(this).find(".way");
            var wayInfo = $(this).find(".way-info");

            way.hover(function () {

                wayInfo.fadeTo("slow", 1);
                wayInfo.css({
                    "margin-left": "-5px"
                });

            }, function () {
                wayInfo.fadeOut("slow", 0);
                
            });
        });

    };


    module.exports = wayInfo;
});
