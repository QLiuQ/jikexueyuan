/**
 * Created by liuqingqing on 2016/6/14.
 */
// 导航分页猜你喜欢，显示返利
define(function (require, exports, module) {

    var rebate = {};

    rebate.onHover = function () {
        var rebateItems = $(".fanli-nav");
        rebateItems.each(function (index) {
            var thisItem = $(this);
            thisItem.hover(function () {
                thisItem.children(".rebate").show();
                
            }, function () {
                thisItem.children(".rebate").hide();
                
            });
        });
        
    };

    module.exports = rebate;
});