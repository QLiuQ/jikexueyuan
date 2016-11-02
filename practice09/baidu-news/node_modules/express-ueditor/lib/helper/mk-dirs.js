const path=require('path');
const fs=require('fs');


/**
 * 递归创建路径，成功时或者失败触发callback
 */
function _mkdirsRecursively(dirpath, mode, callback) {
    
	fs.exists(dirpath, function(exists) {
		if(exists) {
			callback(false,dirpath);
		} else {
			//尝试创建父目录，然后再创建当前目录
			_mkdirsRecursively(path.dirname(dirpath), mode, function(){
				fs.mkdir(dirpath, mode, callback);
			});
		}
	});
}


/**
 * Promise接口
 */
function mkdirs(dirpath, mode) {
	return new Promise(function (resolve,reject) {
		_mkdirsRecursively(dirpath,mode,(err,data)=>{
		    if(err){
		        reject(err);
			}else{
				resolve(dirpath);
			}
		});
	});
}

module.exports=mkdirs;