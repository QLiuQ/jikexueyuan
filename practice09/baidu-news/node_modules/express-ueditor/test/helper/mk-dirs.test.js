const mkdirs=require('../../lib/helper/mk-dirs.js');
const path=require('path');
const assert=require('assert');
const fs=require('fs');

var rmdirSync = (function(){
    function iterator(url,dirs){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            dirs.unshift(url);//收集目录
            inner(url,dirs);
        }else if(stat.isFile()){
            fs.unlinkSync(url);//直接删除文件
        }
    }
    function inner(path,dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }
    return function(dir,cb){
        cb = cb || function(){};
        var dirs = [];

        try{
            iterator(dir,dirs);
            for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        }catch(e){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();


describe('测试 mk-dirs.js',function(){
    describe("测试 mkdirs()",function(done){
        
        it('测试递归创建目录',function(){
            
            // 要操作的目标目录
            const homedir=path.join(__dirname,'aaa1');
            const dir=path.join(homedir,'bbb1','ccc1','dddd1');
            
            mkdirs(dir,0o777)
            .then((dirname)=>{
                fs.statSync(dir,(err,stat)=>{
                    if(err){
                        throw new Error('文件不存在');
                    }
                });
                return dirname;
            }).then(dir=>{
                rmdirSync(homedir,(e)=>{
                    assert.ok(!e,'删除所创建的目录未成功');
                    done();
                });
            }).catch(e=>{
                assert.ok(false,e);
                done();
            })
        });
    
    });
});
