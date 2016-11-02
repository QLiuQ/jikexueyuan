
function getItemInConfig(pattern,item,config){
    const patterns=['image','file','video','snapscreen','scrawl'];
    if(patterns.indexOf(pattern)==-1){
        return null;
    }
    const key=pattern+item;
    if(config && config.hasOwnProperty(key)){
        return config[key];
    }else{
        return null;
    }
}

module.exports=getItemInConfig;