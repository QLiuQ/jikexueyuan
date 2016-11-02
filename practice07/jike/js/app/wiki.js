/**
 * Created by liuqingqing on 2016/6/8.
 */
// wiki

define(function (require, exports, module) {
    var wiki = {};

    wiki.onHover = function () {
        var imgBox = $(".img-box");
        
        imgBox.each(function () {
            var look = $(this).find(".look");
            var h = $(this).next("h3");

            $(this).hover(function () {
                look.show();
                h.css("color", "#35b558");

            }, function () {
                look.hide();
                h.removeAttr("style");
            });
        });
    };

    module.exports = wiki;

});