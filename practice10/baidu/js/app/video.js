/**
 * Created by liuqingqing on 2016/6/14.
 */
// 视频图片hover
define(function (require, exports, module) {

    var picHover = {};
    picHover.onHover = function () {
        var pic = $(".pic-hover");
        pic.each(function () {
            $(this).hover(function () {
                $(this).find(".tag-sort").hide();
                $(this).find(".dustbin").show();
                $(this).find(".subscribe").show();
                
            }, function () {
                $(this).find(".tag-sort").show();
                $(this).find(".dustbin").hide();
                $(this).find(".subscribe").hide();
                
            });

        })




    };
    module.exports = picHover;

});

