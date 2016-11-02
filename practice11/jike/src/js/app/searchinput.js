/**
 * Created by liuqingqing on 2016/6/6.
 */
// 搜索框
define(function (require, exports, module) {
    var searchInput = {};

    var webSearchHeader = $('#web-search-header');  // 输入框
    var hotWords = $(".hot-words"); // 热词
    var searchBtn = $(".search-btn"); // 搜索按钮

    
    searchInput.inOrOut = function () {

        // 鼠标点击输入框
        webSearchHeader.on('focus', function () {
            // 提示搜索词消失
            hotWords.css("display", "none");

            // 搜索按钮样式改变
            searchBtn.css({
                "background": "#35b558 url('img/topsearch-icon2.png') center no-repeat",
                "border": "1px solid #35b558"
            });
        });

        // 鼠标点击输入框外
        webSearchHeader.on('blur', function () {
            // 提示搜索词出现
            hotWords.css("display", "block");

            // 搜索按钮样式还原
            searchBtn.css({
                "background": "#fff url('img/topsearch-icon.png') center no-repeat",
                "border": "1px solid #dfdfdf"
            });
        });

    };
    
    module.exports = searchInput;
});