/**
 * Created by liuqingqing on 2016/4/25.
 */
// 设置下拉菜单和侧边栏的显示与隐藏
var baidu = {
    init: function(){
        this.defaultFocus();
        this.baiduSetting();
    },
    // 设置默认焦点
    defaultFocus: function(){
        $('#search-input').focus();
    },

    baiduSetting: function () {
        
        $('#nav-more, #more-product').mousemove(function(){
            $('#more-product').show();
        }).mouseout(function(){
            $('#more-product').hide();
        });
    }
}

// 加载执行
$(function(){
    baidu.init();
})