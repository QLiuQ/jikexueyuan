const fs=require('fs');
const path=require('path');

function readdir(dir) {
    return new Promise((resolve,reject)=>{
        fs.readdir(dir,function (err,files) {
            if(err){
                reject(err);
            }else{
                resolve(files);
            }
        });
    });
}

module.exports=readdir;
