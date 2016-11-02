/**
 * Created by liuqingqing on 2016/6/14.
 */
// 回到顶部
define(function (require, exports, module) {
    var goTop = {
        "top": $(".to-top")
    };
    
    // 显示top
    goTop.onShow = function () {
        var top = this.top;

        // 第一次加载时判断回到顶部是否出现
        $(document).ready(function () {
            showToggle();
        });

        // 滑动鼠标回到顶部出现
        $(window).scroll(function () {
            showToggle();
        });

        // 判断鼠标是否出现
        function showToggle() {
            if ($(window).scrollTop() > 1) {
                top.show();

            } else {
                top.hide();
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
    
    // hover
    goTop.onHover = function () {
        var top = this.top;
        var icon = $(".icon");
        var iconMask = $(".icon-mask");

        top.hover(function () {
            iconMask.show();
            icon.hide();

        }, function () {
            iconMask.hide();
            icon.show();
        });

    };
    module.exports = goTop;
    
});