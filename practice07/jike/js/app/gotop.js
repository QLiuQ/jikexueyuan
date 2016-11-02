/**
 * Created by liuqingqing on 2016/6/8.
 */
// 回到顶部
define(function (require, exports, module) {
    var goTop = {
        "top": $(".top")
    };
    
    // 显示top
    goTop.onShow = function () {
        // var topHeight = $(window).scrollTop();
        var top = this.top;

        // 第一次加载时判断回到顶部是否出现
        $(document).ready(function () {
            showToggle(0);
        });

        // 滑动鼠标回到顶部出现
        $(window).scroll(function () {
            showToggle(400);
        });

        // 判断鼠标是否出现
        function showToggle(duration) {
            if ($(window).scrollTop() > 1) {
                top.fadeIn(duration);

            } else {
                top.fadeOut(duration);
            }
        }
    };

    // 点击回到顶部
    goTop.onTop = function () {
        var top = this.top;
        top.on("click", function () {
            $("html, body").animate({
                "scrollTop": 0

            }, "slow");
        });

    };

    // 显示微信图标

    
    module.exports = goTop;

});