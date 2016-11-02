/**
 * Created by liuqingqing on 2016/6/6.
 */
// 头部导航栏 首页-职业课程-就业学习...
define(function (require, exports, module) {
    var headNav = {};
    
    headNav.onHover = function () {
        var navBox = $(".nav-box"); // 头部导航区域
        var navLink = $(".nav-link"); // 头部链接
        var navPanel = $(".nav-panel"); // 下拉课程区域
        var panelItem = $(".panel-item"); // 下拉列表li项
        var angle = $(".angle"); // 下拉箭头
        var anglePosition = [ '54px', '173px', '303px', '427px' ];

        // 鼠标hover头部导航区域显示下拉课程列表
        navBox.hover(function () {
            navPanel.show();

        }, function () {
            navPanel.hide();

        });
        
        // 鼠标hover头部链接，显示angle和背景色
        navLink.each(function (index) {
            $(this).hover(function () {
                angleShow(index);
        
            }, function () {
                angleHide(index);
        
            });
        });
        
        // 鼠标hover下拉列表li项，显示angle和背景色
        panelItem.each(function (index) {
            $(this).hover(function () {
                angleShow(index);
        
            }, function () {
                angleHide(index);
        
            });
        });

        // 显示angle和背景色
        function angleShow(index) {
            angle.show();
            angle.css("left", anglePosition[index]);

            $(".panel-item:nth-child(" + (index + 1) + ")").css("background-color", "#f7f7f7");
        }

        // 隐藏angle和背景色
        function angleHide(index) {
            angle.hide();
            $(".panel-item:nth-child(" + (index + 1) + ")").removeAttr("style");
        }
    };


    module.exports = headNav;
});