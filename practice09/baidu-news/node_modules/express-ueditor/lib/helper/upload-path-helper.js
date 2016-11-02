const path = require('path');

const getPatternViaAction=require('./get-pattern-via-action.js');

class UploadPathHelper {

    /**
     * 本身并不会去读取配置文件，别人给他传递什么config，就接收什么config，
     * 调用方本身来保证config已经按照给定格式配置好
     */
    constructor(config) {
        this.config = config;
    }


    /**
     * 根据action 返回 pattern ,pattern是用判断上传路径的“型式”
     * 更新：简单调用getPatternViaAction(action)方法
     */
    getPattern(action) {
        return getPatternViaAction(action);
    }


    /**
     * 对齐，
     * 如果大于指定宽度，则取指定宽度的子串
     * 如果小于，则以z字符填充其右边
     */
    _align(str, width, z) {
        z = z || '0';
        str = str + '';
        if (str.length > width) {
            return str.substr(0, width);
        } else if (str.length < width) {
            return new Array(width - str.length + 1).join(z) + str;
        } else {
            return str;
        }
    }

    /**
     * 根据当前配置，获取预先配置好的路径格式
     */
    _getConfigPathFormat(pattern) {
        let pathStr;
        switch (pattern) {
            case 'image':
                pathStr = this.config.imagePathFormat;
                break;
            case 'file':
                pathStr = this.config.filePathFormat;
                break;
            case 'video':
                pathStr = this.config.videoPathFormat;
                break;
            case 'snapscreen':
                pathStr = this.config.snapscreenPathFormat;
                break;
            case 'scrawl':
                pathStr = this.config.snapscreenPathFormat;
                break;
            default:
                pathStr = "upload/unknown/{yyyy}{mm}{dd}/{time}{rand:6}";
                break;
        }
        // 如果读取到的配置为空，则给定一个
        return pathStr || `upload/${pattern}/{yyyy}{mm}{dd}/{time}{rand:6}`;
    }


    /**
     * 获取文件上传到服务器上的目的路径。通用方法，只负责计算出路径字符串，并不负责创建
     * @param pattern 可能为 "image" "file" "video" "snapscreen" "scrawl" ""
     */
    getPathWithoutExt(pattern) {
        let pathStr = this._getConfigPathFormat(pattern);
        const date = new Date();
        const that=this;
        pathStr = pathStr.replace("{time}", date.getTime())
            .replace("{yyyy}", date.getFullYear())
            .replace("{yy}", date.getFullYear().toString().substring(2, 4))
            .replace("{mm}", that._align(date.getMonth()+1, 2))
            .replace("{dd}", that._align(date.getDate(), 2))
            .replace("{hh}", that._align(date.getHours(), 2))
            .replace("{ii}", that._align(date.getMinutes(), 2))
            .replace("{ss}", that._align(date.getSeconds(), 2))
            .replace(/\{rand:(\d+)}/gi, function (match, num) {
                let rand = parseInt(Math.random() * 100000000);
                return that._align(rand, num);
            });
        return pathStr;
    }

    /**
     * 获取上传文件的URL前缀
     */
    getUrlPrefix(pattern) {
        let prefix;
        switch (pattern) {
            case 'image':
                prefix = this.config.imageUrlPrefix;
                break;
            case 'file':
                prefix = this.config.fileUrlPrefix;
                break;
            case 'video':
                prefix = this.config.videoUrlPrefix;
                break;
            case 'snapscreen':
                prefix = this.config.snapscreenUrlPrefix;
                break;
            case 'scrawl':
                prefix = this.config.scrawlUrlPrefix;
                break;
            default:
                prefix = "/";
                break;
        }
        return prefix ;
    }


}

module.exports = UploadPathHelper;

