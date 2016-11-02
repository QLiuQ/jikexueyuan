/**
 * Created by liuqingqing on 2016/5/22.
 */
'use strict';
// 获取所有要监听的按钮
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var specialOpe = ['sin', 'cos', 'tan', 'lg', 'ln', 'asin', 'acos'];
var decimalAdded = false;
// 给按钮绑定事件 兼容chrome ie
var bindEvent = window.addEventListener && "addEventListener" || "attachEvent";
var clickEventName = window.addEventListener && "click" || "onclick";


// 添加监听事件
for(var i = 0; i < keys.length; i++) {

    keys[i][bindEvent](clickEventName, cal);
}

function cal(e) {
    // 获取屏幕输入
    var input = document.querySelector('.screen');
    var inputVal = input.innerHTML;
    var inputValLen = inputVal.length;
    var btnVal = this.innerHTML;

    var resultFlag = false;

    // 页面出现错误，任意按钮触发即清空
    if (inputVal == '错误'){

        input.innerHTML = '';

    }

    // 清空按钮处理
    if(btnVal == 'C') {
        input.innerHTML = '';
        decimalAdded = false;

    } else if (btnVal == '←'){
        // 退格按钮处理
        if (inputVal.indexOf('asin(') == inputValLen - 5) {

            input.innerHTML = inputVal.slice(0, -5);

        } else if (inputVal.indexOf(' acos(') == inputValLen - 6) {

            input.innerHTML = inputVal.slice(0, -6);

        } else if (inputVal.indexOf(' tan(') == inputValLen - 5) {

            input.innerHTML = inputVal.slice(0, -5);

        } else if (inputVal.indexOf(' cos(') == inputValLen - 5) {

            input.innerHTML = inputVal.slice(0, -5);

        } else if (inputVal.indexOf(' sin(') == inputValLen - 5) {

            input.innerHTML = inputVal.slice(0, -5);

        } else if (inputVal.indexOf('lg(') == inputValLen - 3) {

            input.innerHTML = inputVal.slice(0, -2);

        } else if (inputVal.indexOf('ln(') == inputValLen - 3) {

            input.innerHTML = inputVal.slice(0, -2);

        }else {
            input.innerHTML = inputVal.slice(0, -1);
        }

    } else if (specialOpe.indexOf(btnVal) > -1){
        // 特殊操作符处理
        input.innerHTML += ' ' + btnVal + '(';

    } else if (btnVal == '√x') {
        // 开方处理
        input.innerHTML += '√(';

    } else if (btnVal == 'e'){

        input.innerHTML += 'e^(';

    } else if(btnVal == '=') {

        resultFlag = true;
        // 计算结果
        var equation = inputVal;
        var lastChar = equation[equation.length - 1];

        // 替换表达式
        equation = equation.replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/[^a]sin/g, 'Math.sin')
            .replace(/[^a]cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/π/g, 'Math.PI')
            .replace(/lg/g, 'Math.log2')
            .replace(/ln/g, 'Math.log')
            .replace(/e\^/g, 'Math.exp')
            .replace(/√/g, 'Math.sqrt');

        // 小数点只点一次
        if(operators.indexOf(lastChar) > -1 || lastChar == '.')
            equation = equation.replace(/.$/, '');

        // 解析
        if(equation){
            var evalue;

            if (equation.indexOf('(') > -1) {
                // 自动加上右括号
                var matchBracket = equation.match(/\(/g);
                var leftBracketLen = matchBracket.length;

                if (equation.indexOf(')') > -1){
                    var rightBracketLen = equation.match(/\(/g);

                    for (var i = rightBracketLen; i < leftBracketLen; i++){
                        equation += ')';
                    }
                }else {
                    for (var i = 0; i < leftBracketLen; i++){
                        equation += ')';
                    }
                }

            }



            // 解析异常捕获
            try{
                evalue = parseFloat(eval(equation).toFixed(9));

                if (isNaN(evalue) || evalue == Infinity) {

                    input.innerHTML = "错误";

                }else {

                    input.innerHTML = evalue;
                }

            } catch (e) {
                
                input.innerHTML = "错误";
            }
        }
    } else if(operators.indexOf(btnVal) > -1) { // 输入+-/*
        
        var lastChar = inputVal[inputVal.length - 1];

        // + - * /不在最后一位
        if(inputVal != '' && operators.indexOf(lastChar) == -1) {

            input.innerHTML += btnVal;

        } else if(inputVal == '' && btnVal == '-') {

            input.innerHTML += btnVal;

        }

        // 处理屏幕最后一个显示操作符，输入的又是操作符的问题
        if (operators.indexOf(lastChar) > -1 && operators.indexOf(btnVal) > -1) {

            input.innerHTML = inputVal.slice(0, -1) + btnVal;
        }

    }

    // 小数点不重复写入
    else if(btnVal == '.') {
        
        if(inputVal.slice(-1) != '.') {
            input.innerHTML += btnVal;
        }
    }

    // 其他输入包括数字
    else {
        input.innerHTML += btnVal;
    }

    // 输入等于号之后
    if (resultFlag) {

        if (typeof btnVal == "number") {
            input.innerHTML = btnVal;
        } else {
            input.innerHTML += btnVal;
        }
        resultFlag = false;
    }
    
}
