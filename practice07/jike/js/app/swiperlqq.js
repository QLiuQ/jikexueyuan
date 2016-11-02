/**
 * Created by liuqingqing on 2016/6/8.
 */
// 轮播

define(function (require, exports, module) {
    // return;

    var mySwiper = {};

    // 箭头样式控制
    mySwiper.onHover = function () {
        var banner = $(".banner-box"); // banner轮播区域
        var bannerLesson = $(".focuswork-wrap"); // 轮播下面课程
        var enterprise = $(".enterprise-box"); // 合作企业
        var university = $(".swiper-car-box"); // 合作院校
        var media = $(".media-report-box"); // 媒体报道
        var swiperArr = [ bannerLesson, banner, enterprise, university, media ];
        var arrow = $(".arrow");

        // var positionBefore = ["-5px", "-5px"];
        // hover轮播区域
        swiperArr.forEach(function (ele) {
            showArrow(ele);
            
        });

        // hover arrow
        arrow.each(function (index) {
            var bannerLessonIndex = [2,  3];
            var isBannerLessonIndex = bannerLessonIndex.indexOf(index) > -1;

            var laterPositionY = isBannerLessonIndex ? "-40px" : "-65px";
            var formalPositionY = isBannerLessonIndex ?　"0" : "-5px";

            $(this).hover(function () {
                $(this).css({
                    "background-position-y": laterPositionY

                });
            }, function () {
                $(this).css({
                    "background-position-y": formalPositionY

                });

            });
        });

        function showArrow(hoverArea) {
            hoverArea.hover(function () {
                hoverArea.find(".arrow ").show();

            }, function () {
                hoverArea.find(".arrow ").hide();

            });
        }

        $("#banner-left").click(function () {
            $(this).next(".swiper-slide-next").removeClass(".swiper-slide-next");
        });
    };
    
    // banner轮播
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

    // banner课程轮播
    mySwiper.bannerLessonSwiper = function () {
        var swiper = new Swiper('.focuswork-wrap', {
            nextButton: '.work-right-next',
            prevButton: '.work-left-prev',
            loop: true,
            width: 186.667,
            lazyLoading:true
        });
    };

    // 战略合作企业
    mySwiper.enterpriseSwiper = function () {
        var swiper = new Swiper('.enterprise', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            width: 160.67,
            loopAdditionalSlides: 4,
            lazyLoading:true

        });
    };

    // 合作院校
    mySwiper.universitySwiper = function () {
        var swiper = new Swiper('.swiper-car', {
            nextButton: '.work-right-next',
            prevButton: '.work-left-prev',
            width: 138,
            loop: true,
            loopAdditionalSlides: 4,
            lazyLoading:true
        });
    };
    
    // 媒体报道
    mySwiper.mediaReportSwiper = function () {
        var swiper = new Swiper('.media-report', {
            nextButton: '.work-right-next',
            prevButton: '.work-left-prev',
            loop: true,
            width: 159.67,
            loopAdditionalSlides: 4,
            slidesPerview: 'auto',
            lazyLoading:true
        });
    };

    module.exports = mySwiper;

});