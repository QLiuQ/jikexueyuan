/**
 * Created by liuqingqing on 2016/6/8.
 */
// 职业路径
define(function (require, exports, module) {
    var excellent = {};

    excellent.onHover = function () {
        var learCard = $(".lesson-card");

        learCard.each(function () {
            var h = $(this).find("h2");
            var img = $(this).find(".images");
            
            $(this).hover(function () {
                h.hide();
                img.hide();

            }, function () {
                img.show();
                h.show();

            });
        });
    };

    module.exports = excellent;
});
