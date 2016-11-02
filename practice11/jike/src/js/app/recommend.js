/**
 * Created by liuqingqing on 2016/6/7.
 */
// 推荐 问答-wiki-课程-社群样式显示
define(function (require, exports, module) {
    var recommend = {};

    recommend.onHoverItem = function () {
        var itemOne = $(".start-list .item1");
        var startList = $(".start-list");
        var moveList = $(".move-list");
        var typeList = $(".type-list li");
        var tabContent = $(".content .tab-content li");
        var content = $(".content ul");
        var itemTwo = $(".start-list .item2");
        var iconPosition = ["33px -114px", "32px -142px", "32px -171px", "32px -200px"];

        // hover 问答-wiki-课程-社群-下载-知识-职业-vip
        itemOne.each(function (index) {
            var i = index + 1;

            $(this).hover(function () {
                startList.hide();
                moveList.show();

                // 内容区域分开显示
                $(".content ul:nth-child(" + i + ")").show();

            }, function () {
                $(".content ul:nth-child(" + i + ")").hide();

            });

        });

        // hover 问答-wiki-课程-社群
        typeList.each(function (index) {
            var j = index + 1;
            $(this).hover(function () {
                $(".content ul:nth-child("+ j + ")").show();

            }, function () {
                $(".content ul:nth-child("+ j + ")").hide();

            });
        });
        
        // hover ul内容区域
        content.each(function (index) {
            var i = index + 1;
            var typeList = $(".type-list li:nth-child(" + i + ")");

            $(this).hover(function () {
                typeList.css({
                    "border-bottom": "0",
                    "background": "#fff",
                    "color": "#35b558"
                });

                // 内容区域分开显示
                $(".content ul:nth-child(" + i + ")").show();

            }, function () {
                $(".content ul:nth-child(" + i + ")").hide();
                typeList.removeAttr("style");

            });
        });

        // hover li内容区域
        tabContent.each(function () {
            var title = $(this).find(".title");

            $(this).hover(function () {
                title.css({
                    "color": "#35b558"
                });
                
            }, function () {
                title.removeAttr("style");

            });

        });

        moveList.hover(function () {
            startList.hide();
            moveList.show();

            }, function () {

            startList.show();
            moveList.hide();
        });
        
        // hover热门推荐第二行
        itemTwo.each(function (index) {
            var icon = $(this).find(".icon");
            var title = $(this).find(".title");

            $(this).hover(function () {
                icon.css({
                    "background-position": iconPosition[index]
                });

                title.css({
                    "color": "#35b558"
                });

            }, function () {
                icon.removeAttr("style");
                title.removeAttr("style");

            });
        });


    };

    module.exports = recommend;
});
