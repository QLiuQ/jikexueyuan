/**
 * Created by liuqingqing on 2016/5/30.
 */
"use strict";



$(document).ready(function () {
    $(window).on("load", function () {
        // var marginLeft = ($(window).width() - Math.floor($(window).width() / 369) * 369) / 2;
        // $(".wrapper").css({
        //     "width": $(window).width() + "px",
        //     "margin-left": marginLeft + "px",
        //     "margin-right": marginLeft + "px"
        // });
        
        // 图片摆放设置
        imgLocation();

        // 鼠标滑动设置，图片自动加载
        var imgSrc = {
            "data": [{ "src" : "1.jpg"}, { "src" : "2.jpg"}, { "src" : "3.jpg"}, { "src" : "4.jpg"},
            { "src" : "5.jpg"}, { "src" : "6.jpg"}, { "src" : "7.jpg"}, { "src" : "8.jpg"},
            { "src" : "9.jpg"}, { "src" : "10.jpg"}, { "src" : "11.jpg"}, { "src" : "12.jpg"} ]};

        $(window).on("scroll", function () {
            if (imgLoadWhenScrolling()) {
                $.each(imgSrc.data, function (index, value) {
                    // 添加图片区域
                    var imgItem = $("<li>").addClass("img-item").appendTo(".img-list");
                    var imgBox = $("<div>").addClass("img-box").appendTo(imgItem);
                    var a = $("<a>").attr("href", "img/" + $(value).attr("src")).appendTo(imgBox);
                    $("<img>").attr("src", "img/" + $(value).attr("src")).appendTo(a);

                    // 添加底部标题区域
                    var bottomTitle = $("<div>").addClass("bottom-title").appendTo(imgItem);
                    var title = $("<a>").attr({
                        "class": "title",
                        "title": "萌翻天的宠物摄影",
                        "href": "#"
                    }).appendTo(bottomTitle);
                    title.text("萌翻天的宠物摄影");

                    $("<a>").attr({
                        "class": "download",
                        "title": "下载原图"
                    }).appendTo(bottomTitle);

                    $("<a>").attr({
                        "class": "search",
                        "title": "按图片搜索"
                    }).appendTo(bottomTitle);
                });

                imgLocation();
            }
        });

    });

    $(window).on("resize", function () {
        console.log("************");
        imgLocation();

        // var marginLeft = ($(window).width() - Math.floor($(window).width() / 369) * 369) / 2;
        // $(".wrapper").css({
        //     "width": $(window).width() + "px",
        //     "margin-left": marginLeft + "px",
        //     "margin-right": marginLeft + "px"
        // });
    })
});

// 图片摆放顺序
function imgLocation(){
    var imgItems = $(".img-item"); // 图片盒子
    var imgItemWidth = imgItems.eq(0).outerWidth(true); // 图片盒子宽度
    // 一排能摆放的图片数量
    var containerEl = $(".wrapper");
    var listNumInRow = Math.floor(($("body").width())/ imgItemWidth);
    var totalMarginWidth = (listNumInRow - 1) * 6 + 6;
    containerEl.width(listNumInRow * imgItemWidth + totalMarginWidth);

    // $(".img-box img").css("width", );

    
    // 数组，承载所有盒子的高度
    var imgItemArr = [];
    imgItems.each(function (index, ele) {
        // 获取每个图片盒子的高度
        var imgItemHeight = ele.outerHeight(true);


        if (index < listNumInRow) {
            // 将第一排盒子高度存入数组
            imgItemArr.push(imgItemHeight);
        } else {
            // 找到最小高度
            var minImgItemHeight = Math.min.apply(null, imgItemArr);

            // 找到最小高度的index
            var minImgItemIndex = $.inArray(minImgItemHeight, imgItemArr);

            $(ele).css({
                "position": "absolute",
                "top": minImgItemHeight,
                // "left": imgItems.eq(minImgItemIndex).position().left
                // "left": minImgItemIndex *
            });

            // 重新记录当前盒子的高度
            imgItemArr[minImgItemIndex] = imgItemHeight + minImgItemHeight;
        }
    });
    
}

// 鼠标下滑加载图片
function imgLoadWhenScrolling() {
    var imgItems = $(".img-item"); // 图片盒子

    // 得到最后一个图片距离浏览器顶端的高度
    var lastImgItemHeight = imgItems.last().get(0).offsetTop + Math.floor(imgItems.last().height() / 2);
    var scrollHeight = $(window).scrollTop();
    var documentHeight = $(document).height();
    
    return lastImgItemHeight < scrollHeight + documentHeight;
}