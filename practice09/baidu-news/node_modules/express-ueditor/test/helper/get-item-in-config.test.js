const assert=require('assert');

const getItemInConfig=require('../../lib/helper/get-item-in-config.js');
const UEditor=require('../../lib/ueditor.js');
const defaultConfig=require('../../lib/config.default.js');


describe('测试 get-item-in-config.js ：', () => {
    const ueditor=new UEditor();
    it('默认情况下应该和直接读取配置文件相一致', function () {
        const pattern=['image',"file","video","snapscreen",'scrawl'];
        const items=['PathFormat','UrlPrefix','AllowFiles','MaxSize','ActionName'];
        pattern.forEach(p=>{
            items.forEach(i=>{
                const v=getItemInConfig(p,i,ueditor.finalConfig);
                assert.equal(v,defaultConfig[p+i],`pattern=${p},item=${i}:错误`);
            });
        });
    });

});