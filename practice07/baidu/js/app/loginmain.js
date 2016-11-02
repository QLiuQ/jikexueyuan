/**
 * Created by liuqingqing on 2016/6/14.
 */
// js入口
define(function (require, exports, module) {

    $(document).ready(function () {
        require("jquery");
        
        // 回到顶部
        var goTop = require("app/gotop");
        goTop.onShow();
        goTop.onHover();
        goTop.onTop();

        // 换一换
        var change = require("app/change");
        change.onHover();

        // 切换导航页
        var changeTab = require("app/changetab");
        changeTab.onClick();

        // 导航页猜你喜欢
        var navGuess = require("app/navguess");
        navGuess.onHover();

        // 视频图片hover
        var video = require("app/video");
        video.onHover();
    
        // 更多产品
        var moreProduct = require("app/moreproduct");
        moreProduct.init();
        
        // 个人设置
        var set = require("app/set");
        set.onHover();

        // 显示天气
        var showWeather = require("app/showweather");
        showWeather.onHover();

        // 显示换肤
        var skinChange = require("app/skinchange");
        skinChange.onClick();   // 换肤
        skinChange.preview();   // 预览
        skinChange.pageNext();  // 分页
        skinChange.changeBg();  // 更换背景
        skinChange.getLocalStory(); // 获取历史记录
        
    });
    
});