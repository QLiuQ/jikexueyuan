/**
 * Created by liuqingqing on 2016/6/14.
 */

// 切换tab页
define(function (require, exports, module) {
    var changeTab = {};

    changeTab.onClick = function () {
        var menu = $("#s_ctner_menus");
        var menuItems = $(".s-menu-item");
        var content = $(".s-ctner-contents");

        menuItems.each(function (index) {
            var currentItem = $(this);
            var i = index + 1;
            currentItem.on("click", function () {
                // 先删除on
                menu.find(".current").removeClass("current");
                content.find(".on").removeClass("on");

                // 添加on
                currentItem.addClass("current");
                $(".s-content:nth-child(" + i + ")").addClass("on");

            });

        });
    };

    module.exports = changeTab;
});