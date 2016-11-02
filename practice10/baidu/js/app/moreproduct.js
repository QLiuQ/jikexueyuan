/**
 * Created by liuqingqing on 2016/6/14.
 */
define(function (require, exports, module) {
    var moreProduct = {
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
    };

    module.exports = moreProduct;
});