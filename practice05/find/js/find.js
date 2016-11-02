/**
 * Created by liuqingqing on 2016/5/13.
 */
'use strict';

/*
 * 1.将字母作为key，出现的次数count和下标position作为value，得到一个dic对象
 * 2.遍历dic，找出最大值count，得到最终数据
 * 3.新增dom节点，并将数据写入
 */

function find() {

    // 如果显示结果的节点存在，则删除
    var findAddArr = document.getElementsByClassName("find-add");
    var len = findAddArr.length;
    var resultList = document.getElementById("result-list");

    while (resultList.hasChildNodes()){

        resultList.removeChild(resultList.childNodes[0]);

    }

    //获取输入的字符串
    var strEle = document.getElementById("arr");
    var str = strEle && strEle.value || "";
    console.log("ad:" + strEle.value);
    console.log("ad2:" + str);
    var arr = [];

    // 判断输入合法
    if (str.length === 0){

        console.log("df" + str);
        alert("请输入数组！");
        strEle.focus();
        return;

    }else {

        // 判断输入格式正确
        str = str.toLowerCase();
        arr = str.split(" ");
        for(var i = 0, len = arr.length; i < len; i++){
            if (arr[i].length !== 1){
                alert("请确保每个字符之间用空格隔开！");
                strEle.focus();
                return;
            }
        }
    }

    var dic = {};
    dic[arr[0]] = [1];  // value为数组，第一个表示该key的次数
    dic[arr[0]].push(0);

    // 先将数组存入对象中
    for (var i=1, len = arr.length; i< len; i++){

        var keyI = arr[i];
        if (keyI in dic){
            dic[keyI][0]++; // 出现次数加1
            dic[keyI].push(i); // 把下标记录在数字中
        }else {
            dic[keyI] = [1]; // 出现的次数为1
            dic[keyI].push(i);  // 加入新的key记录下标
        }
    }

    // 找到出现次数最多的key
    var maxKey = new Array(arr[0]);  // 出现次数最多的key
    var maxCount = dic[maxKey[0]][0];  // 出现的次数
    var position = new Array([dic[maxKey[0]].slice(1)]); // 出现的位置

    for (var key in dic){

        if (maxCount < dic[key][0]){

            // 清空数组里面的key，把新的key加进去
            maxKey.splice(0, maxKey.length);
            maxKey[0] = key;
            // 修改出现的次数
            maxCount = dic[key][0];
            // 清空数组里面的position，把新的position加进去
            position.splice(0, position.length);
            position[0] = dic[key].slice(1);

        }else if (maxCount === dic[key][0] && maxKey[0] !== key){ // 出现的次数相等，且key不是第一个key

            // 将key加进去
            maxKey.push(key);
            // 将position加进去
            position.push([dic[key].slice(1)]);

        }
    }

    // 将数据写入指定的html
    for (var i = 0, n = maxKey.length; i < n; i++){

        var hasKeyText = document.createElement('label');
        hasKeyText.className = "find-add";
        hasKeyText.innerHTML = "出现次数最多的字母：";
        resultList.appendChild(hasKeyText);

        var hasKeyResult = document.createElement('span');
        hasKeyResult.className = "find-add";
        hasKeyResult.innerHTML = maxKey[i];
        resultList.appendChild(hasKeyResult);
        
        var hasCountText = document.createElement('label');
        hasCountText.className = "find-add";
        hasCountText.innerHTML = "出现的次数：";
        resultList.appendChild(hasCountText);

        var hasCountResult = document.createElement("span");
        hasCountResult.className = "find-add";
        hasCountResult.innerHTML = maxCount;
        resultList.appendChild(hasCountResult);
        
        var hasPositionText = document.createElement('label');
        hasPositionText.className = "find-add";
        hasPositionText.innerHTML = "出现的位置：";
        resultList.appendChild(hasPositionText);

        var hasPositionResult = document.createElement('span');
        hasPositionResult.className = "find-add";
        hasPositionResult.innerHTML = position[i];
        resultList.appendChild(hasPositionResult);

        var br = document.createElement('br');
        resultList.appendChild(br);

    }

}

