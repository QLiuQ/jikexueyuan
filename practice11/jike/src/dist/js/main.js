define('../app/headnav', [], function (require, exports, module) {
    var headNav = {};
    headNav.onHover = function () {
        var navBox = $('.nav-box');
        var navLink = $('.nav-link');
        var navPanel = $('.nav-panel');
        var panelItem = $('.panel-item');
        var angle = $('.angle');
        var anglePosition = [
            '54px',
            '173px',
            '303px',
            '427px'
        ];
        navBox.hover(function () {
            navPanel.show();
        }, function () {
            navPanel.hide();
        });
        navLink.each(function (index) {
            $(this).hover(function () {
                angleShow(index);
            }, function () {
                angleHide(index);
            });
        });
        panelItem.each(function (index) {
            $(this).hover(function () {
                angleShow(index);
            }, function () {
                angleHide(index);
            });
        });
        function angleShow(index) {
            angle.show();
            angle.css('left', anglePosition[index]);
            $('.panel-item:nth-child(' + (index + 1) + ')').css('background-color', '#f7f7f7');
        }
        function angleHide(index) {
            angle.hide();
            $('.panel-item:nth-child(' + (index + 1) + ')').removeAttr('style');
        }
    };
    module.exports = headNav;
});
define('../app/lessonclassify', [], function (require, exports, module) {
    var lessonClassify = {};
    lessonClassify.onHover = function () {
        var liItems = $('.lesson-classify-nav li');
        liItems.each(function () {
            var lessonList = $(this).children('.lesson-list-show');
            $(this).hover(function () {
                lessonList.show();
                $(this).css({
                    'background': '#fff',
                    'border-left': '2px solid #35b558',
                    'border-right': '0'
                });
            }, function () {
                lessonList.hide();
                $(this).removeAttr('style');
            });
        });
    };
    module.exports = lessonClassify;
});
define('../app/recommend', [], function (require, exports, module) {
    var recommend = {};
    recommend.onHoverItem = function () {
        var itemOne = $('.start-list .item1');
        var startList = $('.start-list');
        var moveList = $('.move-list');
        var typeList = $('.type-list li');
        var tabContent = $('.content .tab-content li');
        var content = $('.content ul');
        var itemTwo = $('.start-list .item2');
        var iconPosition = [
            '33px -114px',
            '32px -142px',
            '32px -171px',
            '32px -200px'
        ];
        itemOne.each(function (index) {
            var i = index + 1;
            $(this).hover(function () {
                startList.hide();
                moveList.show();
                $('.content ul:nth-child(' + i + ')').show();
            }, function () {
                $('.content ul:nth-child(' + i + ')').hide();
            });
        });
        typeList.each(function (index) {
            var j = index + 1;
            $(this).hover(function () {
                $('.content ul:nth-child(' + j + ')').show();
            }, function () {
                $('.content ul:nth-child(' + j + ')').hide();
            });
        });
        content.each(function (index) {
            var i = index + 1;
            var typeList = $('.type-list li:nth-child(' + i + ')');
            $(this).hover(function () {
                typeList.css({
                    'border-bottom': '0',
                    'background': '#fff',
                    'color': '#35b558'
                });
                $('.content ul:nth-child(' + i + ')').show();
            }, function () {
                $('.content ul:nth-child(' + i + ')').hide();
                typeList.removeAttr('style');
            });
        });
        tabContent.each(function () {
            var title = $(this).find('.title');
            $(this).hover(function () {
                title.css({ 'color': '#35b558' });
            }, function () {
                title.removeAttr('style');
            });
        });
        moveList.hover(function () {
            startList.hide();
            moveList.show();
        }, function () {
            startList.show();
            moveList.hide();
        });
        itemTwo.each(function (index) {
            var icon = $(this).find('.icon');
            var title = $(this).find('.title');
            $(this).hover(function () {
                icon.css({ 'background-position': iconPosition[index] });
                title.css({ 'color': '#35b558' });
            }, function () {
                icon.removeAttr('style');
                title.removeAttr('style');
            });
        });
    };
    module.exports = recommend;
});
define('../app/wayinfo', [], function (require, exports, module) {
    var wayInfo = {};
    wayInfo.onHover = function () {
        var indexTitle = $('.index-public-title');
        var way = $('.way');
        indexTitle.each(function () {
            var way = $(this).find('.way');
            var wayInfo = $(this).find('.way-info');
            way.hover(function () {
                wayInfo.fadeTo('slow', 1);
                wayInfo.css({ 'margin-left': '-5px' });
            }, function () {
                wayInfo.fadeOut('slow', 0);
            });
        });
    };
    module.exports = wayInfo;
});
define('../app/searchinput', [], function (require, exports, module) {
    var searchInput = {};
    var webSearchHeader = $('#web-search-header');
    var hotWords = $('.hot-words');
    var searchBtn = $('.search-btn');
    searchInput.inOrOut = function () {
        webSearchHeader.on('focus', function () {
            hotWords.css('display', 'none');
            searchBtn.css({
                'background': '#35b558 url(\'img/topsearch-icon2.png\') center no-repeat',
                'border': '1px solid #35b558'
            });
        });
        webSearchHeader.on('blur', function () {
            hotWords.css('display', 'block');
            searchBtn.css({
                'background': '#fff url(\'img/topsearch-icon.png\') center no-repeat',
                'border': '1px solid #dfdfdf'
            });
        });
    };
    module.exports = searchInput;
});
define('../app/hotlesson', [], function (require, exports, module) {
    var hotLesson = {};
    hotLesson.onHover = function () {
        var hotLessonBox = $('#hot-lesson-box');
        var hotLesson = $('.hot-lesson');
        var hotLessonLi = $('.hot-lesson li');
        var lessonListLi = $('#hot-lesson-box .lesson-list li');
        hotLessonLi.each(function (index) {
            var i = index + 1;
            var list = $(this);
            list.hover(function () {
                hotLesson.find('.on').each(function () {
                    $(this).removeClass('on');
                });
                hotLessonBox.find('.on').each(function () {
                    $(this).removeClass('on');
                });
                list.addClass('on');
                $('.lesson-list:nth-child(' + i + ')').addClass('on');
            });
        });
        lessonListLi.each(function (index) {
            var lessonPlay = $(this).find('.lesson-play');
            var lessonInfo = $(this).find('.lesson-info');
            var p = $(this).find('p');
            var level = $(this).find('.zhongji');
            var learnNum = $(this).find('.learn-num');
            $(this).hover(function () {
                lessonPlay.css({ 'opacity': '1' });
                lessonInfo.css({ 'z-index': 100 - index });
                p.stop(true, true).slideDown();
                level.css({ 'display': 'block' });
                learnNum.css({ 'display': 'block' });
            }, function () {
                p.stop(true, true).slideUp();
                lessonPlay.removeAttr('style');
                lessonInfo.removeAttr('style');
                level.removeAttr('style');
                learnNum.removeAttr('style');
            });
        });
    };
    module.exports = hotLesson;
});
define('../app/excellent', [], function (require, exports, module) {
    var excellent = {};
    excellent.onHover = function () {
        var learCard = $('.lesson-card');
        learCard.each(function () {
            var h = $(this).find('h2');
            var img = $(this).find('.images');
            $(this).hover(function () {
                h.hide();
                img.hide();
            }, function () {
                img.show();
                h.show();
            });
        });
    };
    module.exports = excellent;
});
define('../app/wiki', [], function (require, exports, module) {
    var wiki = {};
    wiki.onHover = function () {
        var imgBox = $('.img-box');
        imgBox.each(function () {
            var look = $(this).find('.look');
            var h = $(this).next('h3');
            $(this).hover(function () {
                look.show();
                h.css('color', '#35b558');
            }, function () {
                look.hide();
                h.removeAttr('style');
            });
        });
    };
    module.exports = wiki;
});
define('../app/gotop', [], function (require, exports, module) {
    var goTop = { 'top': $('.top') };
    goTop.onShow = function () {
        var top = this.top;
        $(document).ready(function () {
            showToggle(0);
        });
        $(window).scroll(function () {
            showToggle(400);
        });
        function showToggle(duration) {
            if ($(window).scrollTop() > 1) {
                top.fadeIn(duration);
            } else {
                top.fadeOut(duration);
            }
        }
    };
    goTop.onTop = function () {
        var top = this.top;
        top.on('click', function () {
            $('html, body').animate({ 'scrollTop': 0 }, 'slow');
        });
    };
    module.exports = goTop;
});
define('../app/swiperlqq', [], function (require, exports, module) {
    var mySwiper = {};
    mySwiper.onHover = function () {
        var banner = $('.banner-box');
        var bannerLesson = $('.focuswork-wrap');
        var enterprise = $('.enterprise-box');
        var university = $('.swiper-car-box');
        var media = $('.media-report-box');
        var swiperArr = [
            bannerLesson,
            banner,
            enterprise,
            university,
            media
        ];
        var arrow = $('.arrow');
        swiperArr.forEach(function (ele) {
            showArrow(ele);
        });
        arrow.each(function (index) {
            var bannerLessonIndex = [
                2,
                3
            ];
            var isBannerLessonIndex = bannerLessonIndex.indexOf(index) > -1;
            var laterPositionY = isBannerLessonIndex ? '-40px' : '-65px';
            var formalPositionY = isBannerLessonIndex ? '0' : '-5px';
            $(this).hover(function () {
                $(this).css({ 'background-position-y': laterPositionY });
            }, function () {
                $(this).css({ 'background-position-y': formalPositionY });
            });
        });
        function showArrow(hoverArea) {
            hoverArea.hover(function () {
                hoverArea.find('.arrow ').show();
            }, function () {
                hoverArea.find('.arrow ').hide();
            });
        }
        $('#banner-left').click(function () {
            $(this).next('.swiper-slide-next').removeClass('.swiper-slide-next');
        });
    };
    mySwiper.bannerSwiper = function () {
        var swiper = new Swiper('.banner-box', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            autoplay: 2500,
            loop: true,
            autoplayDisableOnInteraction: false
        });
    };
    mySwiper.bannerLessonSwiper = function () {
        var swiper = new Swiper('.focuswork-wrap', {
            nextButton: '.work-right-next',
            prevButton: '.work-left-prev',
            loop: true,
            width: 186.667,
            lazyLoading: true
        });
    };
    mySwiper.enterpriseSwiper = function () {
        var swiper = new Swiper('.enterprise', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            width: 160.67,
            loopAdditionalSlides: 4,
            lazyLoading: true
        });
    };
    mySwiper.universitySwiper = function () {
        var swiper = new Swiper('.swiper-car', {
            nextButton: '.work-right-next',
            prevButton: '.work-left-prev',
            width: 138,
            loop: true,
            loopAdditionalSlides: 4,
            lazyLoading: true
        });
    };
    mySwiper.mediaReportSwiper = function () {
        var swiper = new Swiper('.media-report', {
            nextButton: '.work-right-next',
            prevButton: '.work-left-prev',
            loop: true,
            width: 159.67,
            loopAdditionalSlides: 4,
            slidesPerview: 'auto',
            lazyLoading: true
        });
    };
    module.exports = mySwiper;
});
define('main', [
    'jquery-1.12.4.min',
    'swiper-3.3.1.min',
    '../app/searchinput',
    '../app/headnav',
    '../app/lessonclassify',
    '../app/recommend',
    '../app/wayinfo',
    '../app/hotlesson',
    '../app/excellent',
    '../app/wiki',
    '../app/gotop',
    '../app/swiperlqq'
], function (require, exports, module) {
    $(document).ready(function () {
        require('jquery-1.12.4.min');
        require('swiper-3.3.1.min');
        var search = require('../app/searchinput');
        search.inOrOut();
        var headNav = require('../app/headnav');
        headNav.onHover();
        var lessonClassify = require('../app/lessonclassify');
        lessonClassify.onHover();
        var recommend = require('../app/recommend');
        recommend.onHoverItem();
        var wayInfo = require('../app/wayinfo');
        wayInfo.onHover();
        var hotLesson = require('../app/hotlesson');
        hotLesson.onHover();
        var excellent = require('../app/excellent');
        excellent.onHover();
        var wiki = require('../app/wiki');
        wiki.onHover();
        var goTop = require('../app/gotop');
        goTop.onShow();
        goTop.onTop();
        var mySwiper = require('../app/swiperlqq');
        mySwiper.onHover();
        mySwiper.bannerSwiper();
        mySwiper.bannerLessonSwiper();
        mySwiper.enterpriseSwiper();
        mySwiper.universitySwiper();
        mySwiper.mediaReportSwiper();
    });
});
seajs.use('main');