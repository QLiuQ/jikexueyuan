/**
 * Created by liuqingqing on 2016/4/25.
 */
// 未登录百度js主入口
define(function (require, exports, module) {
   $(document).ready(function () {
       require("jquery");

       // 更多产品
       var moreProduct = require("app/moreproduct");
       moreProduct.init();
   });
    
});



