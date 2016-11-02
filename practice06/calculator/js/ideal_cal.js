/**
 * Created by liuqingqing on 2016/5/23.
 */
// 显示器底部
var displayBottom = function () {
    this.el =  document.getElementsByClassName("screen-bottom")[0];
};

displayBottom.prototype.display = function(expr) {
    this.el.innerHTML = expr;
};

// 显示器顶部
var displayTop = function () {
    this.el = document.getElementsByClassName("screen-top")[0];
};

displayTop.prototype.display = function (expr) {
    this.el.innerHTML = expr;
};

var CalculatorFactory = function () {
    this.tokens = [];     // 用户输入的token, 如［"1", "+", "2", "-", "sin(", "2", ")"]
    this.result = "";

    this.funcTokens = [   // 数学函数表达token
        "sin(", "cos(", "asin(", "acos(", "tan(", "√(",
        "ln(", "lg(", "e^("
    ];

    this.displayTop = new displayTop();
    this.displayBottom = new displayBottom();
};

// 输入与表达式映射
CalculatorFactory.prototype.jsMathExpr = function () {
        var map = {
        "sin(": "Math.sin(",
        "cos(": "Math.cos(",
        "asin(": "Math.asin(",
        "acos(": "Math.acos(",
        "tan(": "Math.tan(",
        "√(": "Math.sqrt(",
        "ln(": "Math.log(",
        "lg(": "Math.log2(",
        "e^(": "Math.exp(",
        "π": "Math.PI",
        "x": "*",
        "÷": "/"
    };

    var mapFunc = function (token) {
        return token in map && map[token] || token;
    };

    var jsMathTokens = this.tokens.map(mapFunc);

    return jsMathTokens.join("");
};

/*
 * 输入token
 */
CalculatorFactory.prototype.push = function (token) {

    // 上次计算后，又输入数字时的情况处理
    if (this.result && (/\d/.test(token) || this.funcTokens.indexOf(token) >= 0 )) {
        this.tokens = [token];
        this.result = "";

        this.refresh();  // 输出到屏幕
        return;
    }

    // 上次计算后，又输入＋， －， x, ÷, . 时的情况
    if (this.result && ["+", "-", "x", "÷"].indexOf(token) >= 0) {

        // 改变屏幕上方显示
        this.displayTop.display(this.result);
        // 屏幕下方输入
        this.tokens = [this.result, token];

        this.result = "";
        this.refresh();

        return;
    }

    // 处理表达式有.号的情况
    if (token == "."){

        // 首字为.号的情况
        if (token == "." && this.tokens.length == 0){
            this.tokens = [0, token];
            this.refresh();
            return;
        }

        var tokensLength = this.tokens.length;
        var lastToken = this.tokens[tokensLength - 1];

        // 处理多次输入"."号的情况
        if (token == "." && lastToken == ".") {
            return;
        }

        // 上次计算后，又输入. 时的情况
        if (this.result && token == ".") {

            // 结果为小数时情况结果
            if (this.result.indexOf(".") >= 0) {
                this.tokens = [0, token];

            } else { // 结果为整数的情况
                this.tokens = [this.result, token]
            }

            this.result = "";
            this.refresh();
            return;
        }
    }


    // 显示器最右边是["+", "-", "x", "÷"]时的处理
    var pmmd = ["+", "-", "x", "÷"];

    if ((pmmd.indexOf(lastToken) > -1) && (pmmd.indexOf(token) > -1)){
        this.tokens[tokensLength - 1] = token;

        this.refresh();

        return;
    }

    this.tokens.push(token);

    this.refresh();
};

// 退格处理
CalculatorFactory.prototype.pop = function () {

    // 如果已经有计算结果
    if (this.result) {
        this.tokens = this.result.split("");
        this.result = "";
    }

    this.tokens.pop();

    this.refresh();
};

// 清空计算数据
CalculatorFactory.prototype.clearData = function () {
    this.tokens.splice(0);
    this.result = "";
};

// 清空第一排表达式数据 C按钮
CalculatorFactory.prototype.clear = function () {
    this.clearData();

    this.refresh();
};

/*
 * 校验表达式
  * 1.括号补全
  * 2.*号补全 2sin(9)转换成2*sin(9)
 */
CalculatorFactory.prototype.verify = function () {
    var exprStr = this.tokens.join("");

    // 括号补全
    var leftBracketMatch = exprStr.match(/\(/g);
    var rightBracketMatch = exprStr.match(/\)/g);

    var leftBracketNum = leftBracketMatch && leftBracketMatch.length || 0;
    var rightBracketNum = rightBracketMatch && rightBracketMatch.length || 0;

    if (leftBracketNum == 0 || leftBracketNum < rightBracketNum) {
        return;
    }

    for (var i = rightBracketNum; i < leftBracketNum; i ++) {
        this.tokens.push(")");
    }

    var finalTokens = [];

    // *号补全
    for (var i = 0, j = 1, n = this.tokens.length; j < n; i++, j++) {
        var former = this.tokens[i];
        var next = this.tokens[j];

        finalTokens.push(former);

        if (/\d|\(/.test(former) && this.funcTokens.indexOf(next) >= 0) {
            finalTokens.push("x");
        }
    }

    finalTokens.push(this.tokens.pop());

    this.tokens = finalTokens;
};

/*
 * 数据输出到屏幕
 */
CalculatorFactory.prototype.refresh = function () {
    var exprStr = this.tokens.join("");

    this.displayBottom.display(exprStr);
};

 /*
  * 计算结果
  * 1.校验表达式
  * 2.正则替换 如sin( 换成 Math.sin(
  * 3.输出结果校验
  */
CalculatorFactory.prototype.cal = function () {
    this.verify();

    var jsMathExpr = this.jsMathExpr();

    try {
        this.result = parseFloat(eval(jsMathExpr).toFixed(9)).toString();

        if (isNaN(this.result) || this.result == Infinity) {
            this.displayBottom.display("error");
            this.clearData();
        } else {
            this.displayBottom.display(this.result);
        }

    } catch (e) {
        this.displayBottom.display("error");
        this.clearData();

    }

    this.displayTop.display(this.tokens.join(""));
};

var Calculator = new CalculatorFactory();

/**
 * 点击非等号按钮
 * 1.清空按钮
 * 2.退格按钮
 * 3.其他非等号按钮
 * @param event
 */
var operatorBtnClick = function (event) {
    var target = event.target || event.srcElement;

    var operator = target.getAttribute("value");

    if (operator == "delete") {
        Calculator.pop();
        return;
    }

    if (operator == "clear") {
        Calculator.clear();
        return;
    }
    
    Calculator.push(operator);
};

// 点击等号按钮
var equalBtnClick = function () {
    Calculator.cal();
};

// 绑定事件
var bind = function (el, event, func) {
    var bindFunc = "addEventListener";
    var eventName = event;

    if (window.attachEvent) {
        bindFunc = "attachEvent";
        eventName = "on" + event;
    }

    el[bindFunc](eventName, func);
};

// 调用事件绑定--非等号
var operators = document.getElementsByClassName("operator");
for (var i = 0, n = operators.length; i < n; i ++) {
    var operator = operators[i];

    bind(operator, "click", operatorBtnClick);
}

// 调用事件绑定--等号
var equalOperator = document.getElementsByClassName("equal-operator")[0];
bind(equalOperator, "click", equalBtnClick);

