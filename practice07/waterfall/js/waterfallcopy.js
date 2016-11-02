/**
 * Created by liuqingqing on 2016/5/30.
 */

$(document).ready(function () {
        $(window).on("load", function () {
            imgLocation();
        });

    // 鼠标滑动设置，图片自动加载
    var imgSrc = {
        "data": [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"},
            {"src": "5.jpg"}, {"src": "6.jpg"}, {"src": "7.jpg"}, {"src": "8.jpg"},
            {"src": "9.jpg"}, {"src": "10.jpg"}, {"src": "11.jpg"}, {"src": "12.jpg"}]
    };

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


    $(window).on("resize", function () {
        imgLocation();

    });
});

function imgLocation() {
    var imgItems = $(".img-item");
    var imgItemWidth = imgItems.eq(0).outerWidth(true);

    // 每行摆放图片大小，不能为0
    var imgNum = Math.floor($(window).width() / imgItemWidth) || 1;
    // 居中设置
    $("#img-container").width(imgItemWidth * imgNum).css("margin", "0 auto");

    // 数组
    var imgItemArr = [];
    imgItems.each(function (index, ele) {

        // 清空style，解决放大缩小问题
        $(ele).removeAttr("style");

        var imgItemHeight = $(ele).outerHeight();
        if (index < imgNum) {
            imgItemArr.push(imgItemHeight);

        } else {
            var minHeight = Math.min.apply(null, imgItemArr);
            var minIndex = $.inArray(minHeight, imgItemArr);

            // var left = imgItemWidth * minIndex;

            $(ele).css({
                "position": "absolute",
                "left": imgItemWidth * minIndex + imgItems.eq(0).offset().left,
                "top": minHeight
            });

            imgItemArr[minIndex] += imgItemHeight;
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