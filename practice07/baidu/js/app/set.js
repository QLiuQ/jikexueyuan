/**
 * Created by liuqingqing on 2016/6/14.
 */

// 个人设置
define(function (require, exports, module) {
    var set = {};
    set.onHover = function () {
        var setting = $(".lb");
        var settingBlock = $("#s_user_name_menu");
        setting.hover(function () {
            settingBlock.show();
            
        }, function () {
            settingBlock.hover(function () {
                settingBlock.show();
                
            }, function () {
                settingBlock.hide();
                
            });
        });
    };

    module.exports = set;
});
