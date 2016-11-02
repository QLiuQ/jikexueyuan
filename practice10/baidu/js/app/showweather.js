/**
 * Created by liuqingqing on 2016/6/15.
 */
// 显示天气
define(function (require, exports, module) {
    var showWeather = {};

    showWeather.onHover = function () {
        var weather = $(".show-weather");
        var weatherMode = $(".s-mode-weather");
        weather.hover(function () {
            weatherMode.show();

        }, function () {
            weatherMode.hover(function () {
                weatherMode.show();

            }, function () {
                weatherMode.hide();

            });
        });
    };

    module.exports = showWeather;
});