/**
 * Created by liuqingqing on 2016/6/15.
 */
// 换肤
define(function (require, exports, module) {

    var changeSkin = {
        "skinImgItem": $(".skin-img-item")
    };

    // 点击换肤
    changeSkin.onClick = function () {
        var skinLink = $(".s-skin");
        var skinLayer = $("#skin-layer");
        var skinUpBtn = $(".s-skin-up");

        $("html").on("click", function () {
            skinLayer.slideUp();
        });

        // 点击换肤按钮显示换肤
        skinLink.on("click", function (event) {
            event.stopPropagation();
            skinLayer.slideDown();

        });

        // 点击换肤区域，换肤不消失
        skinLayer.on("click", function (event) {
            event.stopPropagation();
        });

        // 点击收起
        skinUpBtn.on("click", function () {
            skinLayer.slideUp();
        });

    };

    // 预览
    changeSkin.preview = function () {
        var skinImgItem = this.skinImgItem;
        var preview = $("#s_skin_preview_skin");

        skinImgItem.each(function (index) {
            $(this).hover(function () {
                var dataIndex = $(this).attr("data-index");
                preview.attr("src", "img/" + dataIndex + ".jpg");
            }, function () {

            });
        });
    };

    // 翻页
    changeSkin.pageNext = function () {
        var pageNum = $(".skin-page-number");
        
        // 点击页面按钮
        pageNum.each(function () {
            $(this).on("click", function () {
                var n = $(this).attr("n");
                var page0 = $(".skin-img-item.page0");
                var page1 = $(".skin-img-item.page1");
                var pagePreIndex = $(this).siblings(".page-pre");
                var pageNextIndex = $(this).siblings(".page-next");

                $(this).siblings(".choose-page-btn").removeClass("choose-page-btn");
                $(this).addClass("choose-page-btn");

                $(".skin-img-item").hide();
                $(".skin-img-item.page" + n).show();
                pageNextIndex.attr("n", n);
                pagePreIndex.attr("n", n);

            });
        });

        // 点击上一页下一页
        var pageDir = $(".skin-page-dire");
        pageDir.each(function () {
            $(this).on("click", function () {
                var n = $(this).attr("n");
                $(this).siblings(".choose-page-btn").removeClass("choose-page-btn");

                var arrN = $(this).siblings(".skin-page-number");
                arrN.each(function () {
                    if ($(this).attr("n") == n) {
                        $(this).addClass("choose-page-btn");

                    }
                });
                $(".skin-img-item").hide();
                $(".skin-img-item.page" + n).show();
                $(this).attr("n", 1 - n);

            });

        });
    };

    // 切换背景
    changeSkin.changeBg = function () {
        var skinImgItem = this.skinImgItem;
        skinImgItem.each(function (index) {
            var imgChoose = $(this).find(".skin-img-item-choose");
            var bgPic = $(".skin-container");
            var picIndex = $(this).attr("data-index");

            $(this).on("click", function () {
                $(this).siblings().find(".on").removeClass("on");
                var bgImg = "url('img/" + picIndex + ".png')";
                imgChoose.addClass("on");  // 出现选中图标
                changeBgImg(bgImg); // 更改背景

                // 保存cookie
                var themeImg = bgPic.css("background-image");
                localStorage.setItem("bg-img", themeImg);

            });
        });

        // 切换主题
        var skinTheme = $(".skin-nav");
        skinTheme.each(function () {
            var navType = $(this).attr("nav-type");
            var imgContent = $(".content-" + navType);

            $(this).on("click", function () {
                $(this).siblings().removeClass("choose-nav");
                $(this).addClass("choose-nav");
                imgContent.siblings().removeClass("on");
                imgContent.addClass("on");

            });
        });
    };

    // 获取cookie
    changeSkin.getLocalStory = function () {
        var defaultImg = "url('img/bg.jpg')";
        var localImg = localStorage.getItem("bg-img");
        var bgImg = localImg || defaultImg;
        changeBgImg(bgImg);
    };

    // 更改背景颜色
    function changeBgImg(bgImg) {
        var bgPic = $(".skin-container");
        bgPic.css({
            "background-image": bgImg
        });
    }

    module.exports = changeSkin;
});