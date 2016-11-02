/**
 * 根据action 返回 pattern ,pattern是用判断上传路径的“型式”
 */
function getPatternViaAction(action) {
    let pattern = "unknown";
    switch (action) {
        case 'uploadimage':
            pattern = 'image';
            break;
        case 'uploadfile':
            pattern = 'file';
            break;
        case 'uploadvideo':
            pattern = 'video';
            break;
        case 'uploadsnapscreen':
            pattern = 'snapscreen';
            break;
        case 'uploadscrawl':
            pattern = 'scrawl';
            break;
        default:
            pattern = 'unknown';
            break;
    }
    return pattern;
}

module.exports=getPatternViaAction;