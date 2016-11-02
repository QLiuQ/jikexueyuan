/**
 * Created by liuqingqing on 2016/5/19.
 */
'use strict';

// 给按钮绑定事件
var bindEvent = window.addEventListener && "addEventListener" || "attachEvent";
// 点击事件
var clickEventName = window.addEventListener && "click" || "onclick";
// 获取绑定按钮
var triggerElArr = document.getElementsByClassName("change-color");

for (var i = 0, n = triggerElArr.length; i < n; i ++) {

    var triggerEl = triggerElArr[i];
    // 绑定点击
    triggerEl[bindEvent](clickEventName, changeThemeClick);

}

/*
 1.监听事件
 2.设置cookie
 */
function changeThemeClick(event) {
    var srcEle = event.target || event.srcElement;
    var themeClass = srcEle.getAttribute("theme");

    changeTheme(themeClass);
    localStorage.setItem("themeClass", themeClass);
    // setCookie("themeClass", themeClass, 365);
}


// 更改主题函数
function changeTheme(themeClass) {
    // 获取背景色
    var bgColor = document.getElementsByClassName("bg-color");

    for (var i = 0, n = bgColor.length; i < n; i++){

        var ele = bgColor[i];

        if (ele.className.indexOf("theme") !== -1){
            ele.className = ele.className.replace(/\s?[^\s]+-theme/, " bg-" + themeClass);
        }else {
            ele.className += " bg-" + themeClass;
        }
    }

    // 获取字体颜色
    var fontColor = document.getElementsByClassName("font-color");
    for (var i = 0, n = fontColor.length; i < n; i++){
        var el = fontColor[i];

        if (el.className.indexOf("theme") !== -1){
            el.className = el.className.replace(/\s?[^\s]+-theme/, " font-" + themeClass);
        }else {
            el.className += " font-" + themeClass;
        }
    }

    // 获取顶部颜色
    var topBorderColor = document.getElementsByClassName("border-top-color");
    for (var i = 0, n = topBorderColor.length; i < n; i++) {

        var ele = topBorderColor[i];

        if (ele.className.indexOf("theme") !== -1){
            ele.className = ele.className.replace(/\s?[^\s]+-theme/, " border-" + themeClass);
        }else {
            ele.className += " border-" + themeClass;
        }
    }

    // 获取hover样式
    var hoverColor = document.getElementsByClassName("hover-color");
    for (var i = 0, n = hoverColor.length; i < n; i++) {

        var ele = hoverColor[i];

        if (ele.className.indexOf("theme") !== -1){
            ele.className = ele.className.replace(/\s?[^\s]+-theme/, " hover-" + themeClass);
        }else {
            ele.className += " hover-" + themeClass;
        }
    }
}

// 初始化
function init() {
    var themeClass = localStorage.getItem("themeClass") || "green-theme"; // getCookie("themeClass") || "green-theme";

    changeTheme(themeClass);
}

// 设置cookie
function getCookie(c_name) {

    if (document.cookie.length>0)
    {
        var c_start = document.cookie.indexOf(c_name + "=");

        if (c_start!=-1)
        {
            c_start = c_start + c_name.length+1;
            var c_end = document.cookie.indexOf(";",c_start);

            if (c_end==-1) {
                c_end = document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return ""
}

// 获取cookie
function setCookie(c_name,value, expiredays) {

    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);

    document.cookie = c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

// 调用初始化
init();
