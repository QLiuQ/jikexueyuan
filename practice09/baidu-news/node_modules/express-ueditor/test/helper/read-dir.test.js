const readdir = require('../../lib/helper/read-dir.js');

const path = require('path');
const fs = require('fs');
const assert=require('assert');

describe('测试 read-dir.js', function () {

    describe('测试readdir()函数', function () {
        this.timeout(5000);

        it('和readdirSync()结果应该一致', function (done) {

            const dir =path.dirname( __dirname);

            let fileList1 = [];
            let fileList2 = [];
            readdir(dir).then((files) => {
                fileList1 = files;
                return fileList1;
            }).then(() => {
                fileList2 = fs.readdirSync(dir);
                return fileList2;
            }).then(() => {
                var flag = compare(fileList1,fileList2);
                return flag;
            }).then(flag=>{
                assert.ok(flag,"readdirSync结果不一致");
            })
            .then(done)
            .catch(done);


        });

    });

});


function compare(list1, list2) {
    var flag=true;
    for (var i = 0; i <  list1.length; i++) {
        if (list2.indexOf(list1[i]) == -1) {
            flag = false;
            break;
        }
    }
    if (!flag) {
        return flag;
    }
    for (var j = 0; j < list2.length; j++) {
        if (list1.indexOf(list2[j]) == -1) {
            flag = false;
            break;
        }
    }
    return flag;
}