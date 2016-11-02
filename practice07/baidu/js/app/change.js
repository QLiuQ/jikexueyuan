/**
 * Created by liuqingqing on 2016/6/14.
 */
// 换一换
define(function (require, exports, module) {

    var change = {};

    change.onHover = function () {
        var arrow = $(".hot-refresh");
        var arrowIcon = $(".hot-refresh-icon");
        var arrowText = $(".hot-refresh-text");

        arrow.hover(function () {
            arrowIcon.css({
                "background-position": "-23px -42px"
            });

            arrowText.css({
                "color": "#07f"
            });

        }, function () {
            arrowIcon.removeAttr("style");
            arrowText.removeAttr("style");
        });
        

    };

    module.exports = change;
});