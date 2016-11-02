/**
 * Created by liuqingqing on 2016/5/13.
 */
'use strict';

// 以10为分界，判断几等生
function grade() {

    // 获取输入的分数
    var scoreEle = document.getElementById("score");
    var score = scoreEle && scoreEle.value || "";

    // 判断输入的分数是否合法
    score = parseInt(score);
    if (isNaN(score)){

        alert("请输入学员分数!");
        scoreEle.focus();
        return;

    }else if (score < 0 || score > 100){

        alert("请输入0-100之间的学员分数！");
        scoreEle.focus();
        return
    }

    var num = Math.floor(score / 10);  // 得到分数整数部分
    var grade; // 定义等级

    switch (true){
        case num >= 9:
            grade = 1;
            break;
        case num < 9:
            grade = 10 - num;
            break;
    }
    var result =  grade + "等生";

    // 将得到的结果写入html
    document.getElementById("result").innerHTML = result;
    
}
