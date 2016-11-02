/**
 * Created by liuqingqing on 2016/5/13.
 */
'use strict';
function simpleCalculator() {
    // 获取arg1、arg2、operator
    var arg1Ele = document.getElementById("arg1");
    var arg1 = arg1Ele && arg1Ele.value || "";

    var arg2Ele = document.getElementById("arg2");
    var arg2 = arg2Ele && arg2Ele.value || "";

    var operator = document.getElementById("operator").value;

    // 判断第一个数字输入合法
    arg1 = Number(arg1);
    if (isNaN(arg1)){
        alert("请输入数字");
        arg1Ele.focus();
        return;
    }

    // 判断第一个数字输入合法
    arg2 = Number(arg2);
    if (isNaN(arg2)){
        alert("请输入数字");
        arg2Ele.focus();
        return;
    }

    // 结果
    var result;
    switch (operator){
        case "加":
            result = add(arg1, arg2);
            break;
        case "减":
            result = sub(arg1, arg2);
            break;
        case "乘":
            result = mul(arg1, arg2);
            break;
        case "除":
            if (arg2 === 0){
                alert("除数不能为0！");
                arg2Ele.focus();
                return;
            }else {
                result = div(arg1, arg2);
                break;
            }
    }

    // 将结果写入页面
    document.getElementById("result").innerHTML = result.toString();
}

// 加法
function add(arg1, arg2) {

    var arg1DecLen = 0, arg2DecLen = 0;

    try {

        arg1DecLen += arg1.toString().split(".")[1].length;

    }catch (err){

    }

    try {

        arg2DecLen += arg2.toString().split(".")[1].length;

    }catch (err){

    }

    var len = arg1DecLen > arg2DecLen ? arg1DecLen : arg2DecLen;

    var num1 = Number(arg1.toString().replace(".", "")) * Math.pow(10, len - arg1DecLen);
    var num2 = Number(arg2.toString().replace(".", "")) * Math.pow(10, len - arg2DecLen);

    return (num1 + num2) / Math.pow(10, len);

}

// 减法
function sub(arg1, arg2) {

    var arg1DecLen = 0, arg2DecLen = 0;

    try {
        arg1DecLen += arg1.toString().split(".")[1].length;
    }catch (err){

    }

    try {
        arg2DecLen = arg2.toString().split(".")[1].length;
    }catch (err){

    }

    var len = arg1DecLen > arg2DecLen ? arg1DecLen : arg2DecLen;
    var num1 = Number(arg1.toString().replace(".", "")) * Math.pow(10, len - arg1DecLen);
    var num2 = Number(arg2.toString().replace(".", "")) * Math.pow(10, len - arg2DecLen);

    return (num1 - num2) / Math.pow(10, len);
}

// 乘法
function mul(arg1, arg2) {

    var str1 = arg1.toString();
    var str2 = arg2.toString();
    var mulDecimalLen = 0; // 两数相乘小数位总长度

    // 加上第一个数的小数位
    try {
        mulDecimalLen += str1.split(".")[1].length;
    }catch (e){

    }

    // 加上第二个数的小数位
    try{
        mulDecimalLen += str2.split(".")[1].length;
    }catch (e){

    }

    return Number(str1.replace(".", "")) * Number(str2.replace(".", "")) / Math.pow(10, mulDecimalLen);

}

// 除法
function div(arg1, arg2) {

    var str1 = arg1.toString();
    var str1DecLen = 0; // 第一个数的小数位长度
    var str2 = arg2.toString();
    var str2DecLen = 0; // 第二个数的小数位长度

    try{

        str1DecLen += str1.split(".")[1].length;

    }catch (e){

    }

    try{

        str2DecLen += str2.split(".")[1].length;

    }catch (e){

    }

    var num1 = Number(str1.replace(".", ""));
    var num2 = Number(str2.replace(".", ""));

    return  mul(num1 / num2, Math.pow(10, str2DecLen - str1DecLen));

}

