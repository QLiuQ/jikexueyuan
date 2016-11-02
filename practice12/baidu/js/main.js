/**
 * Created by liuqingqing on 2016/10/31.
 */
/**
 * 使用单例模式
 * 简单，在用到的时候才创建，节约内存
 **/
// 换肤
var skinChange = {
    init: function () {
        this.render();
        this.bind();
    },
    render: function () {
        var me = this;
        me.skinImgItem = $('.skin-img-item');
        me.skinLink = $('.s-skin');
        me.skinLayer = $('#skin-layer');
        me.skinUpBtn = $('.s-skin-up');
        me.html = $('html');
        me.preview = $('#s_skin_preview_skin');
        me.pageNum = $('.skin-page-number');
        me.pageDir = $('.skin-page-dire');
        me.skinTheme = $('.skin-nav');
    },
    bind: function () {
        var me = this;
        me.html.click(function () {
            me.skinLayer.slideUp();
        });

        // 点击换肤按钮显示换肤
        me.skinLink.click(function (event) {
            event.stopPropagation();
            me.skinLayer.slideDown();
        });

        // 点击换肤区域，换肤不消失
        me.skinLayer.click(function (event) {
            event.stopPropagation();
        });

        // 点击收起
        me.skinUpBtn.click(function () {
            skinLayer.slideUp();
        });

        // 预览 & 切换背景
        me.skinImgItem.each(function (index) {
            // 预览
            $(this).hover(function () {
                var dataIndex = $(this).attr('data-index');
                me.preview.attr('src', 'img/' + dataIndex + '.jpg');
            }, function () {

            });

            // 切换背景
            var imgChoose = $(this).find('.skin-img-item-choose');
            var bgPic = $('.skin-container');
            var picIndex = $(this).attr('data-index');
            $(this).click(function () {
                $(this).siblings().find('.on').removeClass('on');
                var bgImg = 'url("img/' + picIndex + '.jpeg")';
                imgChoose.addClass('on');  // 出现选中图标
                changeBgImg(bgImg); // 更改背景

                // 保存cookie
                var themeImg = bgPic.css('background-image');
                localStorage.setItem('bg-img', themeImg);
            });
        });

        // 翻页
        me.pageNum.each(function () {
            // 点击页面按钮
            $(this).click(function () {
                var n = $(this).attr('n');
                var page1 = $('.skin-img-item.page1');
                var pagePreIndex = $(this).siblings('.page-pre');
                var pageNextIndex = $(this).siblings('.page-next');

                $(this).siblings('.choose-page-btn').removeClass('choose-page-btn');
                $(this).addClass('choose-page-btn');

                me.skinImgItem.hide();
                $('.skin-img-item.page' + n).show();
                pageNextIndex.attr('n', n);
                pagePreIndex.attr('n', n);
            });
        });

        // 点击上一页 下一页
        me.pageDir.each(function () {
            $(this).click(function () {
                var n = $(this).attr('n');
                $(this).siblings('.choose-page-btn').removeClass('choose-page-btn');

                var arrN = $(this).siblings('.skin-page-number');
                arrN.each(function () {
                    if ($(this).attr('n') == n) {
                        $(this).addClass('choose-page-btn');

                    }
                });
                me.skinImgItem.hide();
                $('.skin-img-item.page' + n).show();
                $(this).attr('n', 1 - n);
            });
        });

        // 切换主题
        me.skinTheme.each(function () {
            var navType = $(this).attr('nav-type');
            var imgContent = $('.content-' + navType);

            $(this).on('click', function () {
                $(this).siblings().removeClass('choose-nav');
                $(this).addClass('choose-nav');
                imgContent.siblings().removeClass('on');
                imgContent.addClass('on');

            });
        });

    }
};

var Cookie = {
    // 获取cookie
    init: function () {
        var defaultImg = 'url("img/bg.jpg")';
        var localImg = localStorage.getItem('bg-img');
        var bgImg = localImg || defaultImg;
        changeBgImg(bgImg);
    }
};

// 更改背景颜色
function changeBgImg(bgImg) {
    var bgPic = $('.skin-container');
    bgPic.css({
        'background-image': bgImg
    });
}
// 切换分页
var tabChange = {
    init: function () {
        this.render();
        this.bind();

    },
    render: function () {
        var me = this;
        me.menu = $('#s_ctner_menus');
        me.menuItems = $('.s-menu-item');
        me.content = $('.s-ctner-contents');

    },
    bind: function () {
        var me = this;
        me.menuItems.each(function (index) {
            var currentItem = $(this);
            var i = index + 1;
            currentItem.click(function () {
                // 先删除on
                me.menu.find('.current').removeClass('current');
                me.content.find('.on').removeClass('on');

                // 添加on
                currentItem.addClass('current');
                $('.s-content:nth-child(' + i + ')').addClass('on');
            })
        });
    }
};

// 回到顶部
var goTop = {
    init: function () {
        this.render();
        this.bind();
    },
    render: function () {
        var me = this;
        me.top = $('.to-top');
        me.icon = $('.icon');
        me.iconMask = $('.icon-mask');
    },
    bind: function () {
        var me = this;
        // 第一次加载时判断回到顶部是否出现
        $(document).ready(function () {
            showToggle();
        });

        // 滑动鼠标回到顶部出现
        $(window).scroll(function () {
            showToggle();
        });

        // 点击回到顶部
        me.top.click(function () {
            $("html, body").animate({
                "scrollTop": 0

            }, "slow");
        });

        // hover
        me.top.hover(function () {
            me.iconMask.show();
            me.icon.hide();

        }, function () {
            me.iconMask.hide();
            me.icon.show();

        });

        // 判断鼠标是否出现
        function showToggle() {
            if ($(window).scrollTop() > 1) {
                me.top.show();

            } else {
                me.top.hide();
            }
        }

    }
};

// 更多产品
var moreProduct = {
    init: function () {
        this.render();
        this.bind();
    },
    render: function () {
        var me = this;
        me.search = $('#search-input');
        me.nav = $('#nav-more');
        me.more = $('#more-product');
    },
    bind: function () {
        var me = this;
        me.nav.hover(function () {
            me.more.show();
        }, function () {
            me.more.hide();
        });

        me.more.hover(function () {
            me.more.show();
        }, function () {
            me.more.hide();
        });
    }
};

// 个人设置
var set = {
    init: function () {
        this.render();
        this.bind();
    },
    render: function () {
        var me = this;
        me.setting = $('.lb');
        me.settingBlock = $('#s_user_name_menu');
    },
    bind: function () {
        var me = this;
        me.setting.hover(function () {
            me.settingBlock.show();

        }, function () {
            me.settingBlock.hover(function () {
                $(this).show();
            }, function () {
                $(this).hide();
            })
        })
    }
};

// 显示天气
var weather = {
    init: function () {
        this.render();
        this.bind();
    },
    render: function () {
        var me = this;
        me.weather = $('.show-weather');
        me.weatherMore = $('.s-mode-weather');

    },
    bind: function () {
        var me = this;
        me.weather.hover(function () {
            me.weatherMore.show();
        }, function () {
            me.weatherMore.hide();
        })
    }
};

/**
 * 外观模式
 * 便于统一管理调度
 **/
var start = (function () {
    $(document).ready(function () {
        // tabChange.init();

        skinChange.init();

        // 切换tab
        tabChange.init();

        // 回到顶部
        goTop.init();

        // 更多产品
        moreProduct.init();

        // 个人设置
        set.init();

        // 显示天气
        weather.init();

        // cookie
        Cookie.init();
    });

    // 换肤


})();