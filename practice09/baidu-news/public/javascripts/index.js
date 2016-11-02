// var moment = require("moment");
/**
 * Created by liuqingqing on 2016/10/13.
 */
$(document).ready(function () {
    var nav_menu = $(".nav-menu");
    var nav_menu_length = nav_menu.length;
    var nav = $(".nav");

    // 第一个nav默认选中
    nav_menu.first().addClass("current");

    nav_menu.each(function () {
        // nav menu样式
        if (nav_menu_length <= 6) {
            nav.css("width", 100.0 / nav_menu_length + "%");
        } else {
            nav.css("width", 100.0 / 6 + "%");
        }

        $(this).click(function (e) {
            var target= $(e.target);
            var id = target.data("id");
            var this_nav = $(".item-id-" + id);

            nav_menu.removeClass("current");
            $(this).addClass("current");

            $.ajax({
                type: "GET",
                url: "?id=" + id,
                dataType: 'json',
                // 后台传回来的data数据
                success: function (data) {
                    var newsContainer = '';

                    $.each(data, function () {

                        newsContainer += "<div class='index-list-item'>";
                        if (this.picUrl) {
                            newsContainer += '<a class="index-list-main showleft" href="/news/' + this._id + '">';
                            // 图片
                            newsContainer += '<div class="index-list-image">';
                            newsContainer += '<img src="' + this.picUrl + '" title="' + this.title + '" ' + '"></div>';
                            // 标题
                            newsContainer += '<div class="index-list-main-text">';
                            newsContainer += '<div class="index-list-main-title">' + this.title + '</div>';
                            // 时间和热点
                            newsContainer += '<div class="index-list-bottom"><div class="index-list-main-time">' +
                                    '<b class="tip-time">' + moment(this.meta.createTime).format("YYYY-MM-DD h:mm") +'</b>' +
                                '<b class="tip-hot tip-fillred">热点</b>' + '</div></div></div></a></div></div>';

                        } else {
                            newsContainer += '<a class="index-list-main showleft" href="/news/' + this._id + '">';

                            // 标题
                            newsContainer += '<div class="index-list-main-text">';
                            newsContainer += '<div class="index-list-main-title">' + this.title + '</div>';
                            // 时间和热点
                            newsContainer += '<div class="index-list-bottom"><div class="index-list-main-time">' +
                                '<b class="tip-time">' + moment(this.createTime).format('YYYY-MM-DD h:mm') +'</b>' +
                                '<b class="tip-reason tip-fillred">'+ this.source + '</b>' + '</div></div></div></a></div>';
                        }

                    });

                    $(".newslist-container").html(newsContainer);
                }
            })
                .done(function (result) {
                    if (result.success === 1) {
                        res.json({
                            success: 1,
                            msg: '新闻数据获取成功'
                        })
                    }
                })
        });

    });

});