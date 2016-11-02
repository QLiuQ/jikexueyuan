const assert = require('assert');
const Helper = require('../../lib/helper/upload-path-helper.js');


describe('测试 upload-path-helper.test.js', function () {

    describe('以默认的配置进行测试', function () {
        const defaultConfig = require('../../lib/config.default.js');
        const helper = new Helper(defaultConfig);

        describe('测试_algin()方法', function () {
            it('测试超过指定宽度截取',()=>{
                assert.equal(helper._align("12345678",7,'z'),'1234567','超过长度应从左截取');
            });
            it('测试短于指定宽度填充',()=>{
                assert.equal(helper._align("123456",7,'h'),'h123456','短于长度应自左填充');
            });
            it('测试短于指定宽度的默认填充',()=>{
                assert.equal(helper._align("123456",7),'0123456','短于长度应自左填充,默认填0');
            });
        });
        
        describe('测试 _getConfigPathFormat()方法：', () => {
            it('should equals image', function () {
                let pf;
                pf = helper._getConfigPathFormat('image');
                assert.equal(pf,defaultConfig.imagePathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('file');
                assert.equal(pf,defaultConfig.filePathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('video');
                assert.equal(pf,defaultConfig.videoPathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('snapscreen');
                assert.equal(pf,defaultConfig.snapscreenPathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('scrawl');
                assert.equal(pf,defaultConfig.scrawlPathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('helloworld');
                assert.equal(pf,'upload/unknown/{yyyy}{mm}{dd}/{time}{rand:6}','理应为默认值');
            });



        });
        
        
        describe('getPathWithOutExt(pattern)',()=>{
            it('测试file上传时的path',()=>{
                let pattern=helper.getPattern('uploadfile');
                let p=helper.getPathWithoutExt(pattern);
                assert.ok(p.indexOf("{yyyy}")==-1,"模板不再有{yyyy}占位符");
                assert.ok(p.indexOf("{yy}")==-1,"模板不再有{yy}占位符");
                assert.ok(p.indexOf("{mm}")==-1,"模板不再有{mm}占位符");
                assert.ok(p.indexOf("{nn}")==-1,"模板不再有{nn}占位符");
                assert.ok(p.indexOf("{ii}")==-1,"模板不再有{ii}占位符");
                assert.ok(p.indexOf("{ss}")==-1,"模板不再有{ss}占位符");
            });
        });


        describe('测试 getUrlPrefix()',()=>{
            it("参数为'uploadimage',返回的应该和直接从配置文件读取的一致",()=>{
                let pattern=helper.getPattern('uploadimage');
                let prefix=helper.getUrlPrefix(pattern);
                assert.equal(prefix,defaultConfig.imageUrlPrefix);
            });
            
            it("参数为'uploadfile',返回的应该和直接从配置文件读取的一致",()=>{
                let pattern=helper.getPattern('uploadfile');
                let prefix=helper.getUrlPrefix(pattern);
                assert.equal(prefix,defaultConfig.fileUrlPrefix);
            });
            
            it("参数为'uploadvideo',返回的应该和直接从配置文件读取的一致",()=>{
                let pattern=helper.getPattern('uploadvideo');
                let prefix=helper.getUrlPrefix(pattern);
                assert.equal(prefix,defaultConfig.videoUrlPrefix);
            });
            
        });

    });
    
    describe('给定的配置进行测试', function () {
        const customConfig = {
            imagePathFormat:"upload/image/{yyyy}/{mm}/{dd}/{time}{rand:7}",
            imageUrlPrefix:'/test/',
            filePathFormat:'upload/file/{yyyy}/{mm}/{dd}/{time}{rand:7}',
            fileUrlPrefix:'/fuck',
            videoPathFormat:'upload/video/{yyyy}/{mm}/{dd}/{time}{rand:7}',
            videoUrlPrefix:'/shit',
            scrawlPathFormat:'upload/video/{yy}/{mm}/{dd}/{time}{rand:7}',
            scrawlUrlPrefx:'scrawl',
            snapscreenPathFormat:'upload/video/{yy}/{mm}/{dd}/{time}{rand:7}',
            snapscreenUrlPrefix:'snap',
        };
        const helper = new Helper(customConfig);
        describe('测试 getPattern()方法：', () => {
            it('should equals image', function () {
                const p = helper.getPattern('uploadimage');
                assert.equal(p, "image", "uploadimage应该对应image");
            });

            it('should equals video', function () {
                const p = helper.getPattern('uploadvideo');
                assert.equal(p, "video", "uploadvideo应该对应video");
            });

            it('should not equals video', function () {
                const p = helper.getPattern('uploadsnapscreen');
                assert.notEqual(p, "video", "uploadsnapscreen不应该对应video");
            });

            it('should equals unknown', function () {
                const p = helper.getPattern('uplodnapscn');
                assert.equal(p, "unknown", "传递一个莫名其妙的action应该返回unknown");
            });

        });

        describe('测试_algin()方法', function () {
            it('测试超过指定宽度截取',()=>{
                assert.equal(helper._align("12345678",7,'z'),'1234567','超过长度应从左截取');
            });
            it('测试短于指定宽度填充',()=>{
                assert.equal(helper._align("123456",7,'h'),'h123456','短于长度应自左填充');
            });
            it('测试短于指定宽度的默认填充',()=>{
                assert.equal(helper._align("123456",7),'0123456','短于长度应自左填充,默认填0');
            });
        });
        
        describe('测试 _getConfigPathFormat()方法：', () => {
            it('should equals image', function () {
                let pf;
                pf = helper._getConfigPathFormat('image');
                assert.equal(pf,customConfig.imagePathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('file');
                assert.equal(pf,customConfig.filePathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('video');
                assert.equal(pf,customConfig.videoPathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('snapscreen');
                assert.equal(pf,customConfig.snapscreenPathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('scrawl');
                assert.equal(pf,customConfig.scrawlPathFormat,'理应为默认值');
                pf = helper._getConfigPathFormat('helloworld');
                assert.equal(pf,'upload/unknown/{yyyy}{mm}{dd}/{time}{rand:6}','理应为默认值');
            });
        });


        describe('getPathWithOutExt(pattern)',()=>{
            it('测试file上传时的path',()=>{
                let pattern=helper.getPattern('uploadfile');
                let p=helper.getPathWithoutExt(pattern);
                assert.ok(p.indexOf("{yyyy}")==-1,"模板不再有{yyyy}占位符");
                assert.ok(p.indexOf("{yy}")==-1,"模板不再有{yy}占位符");
                assert.ok(p.indexOf("{mm}")==-1,"模板不再有{mm}占位符");
                assert.ok(p.indexOf("{nn}")==-1,"模板不再有{nn}占位符");
                assert.ok(p.indexOf("{ii}")==-1,"模板不再有{ii}占位符");
                assert.ok(p.indexOf("{ss}")==-1,"模板不再有{ss}占位符");
            });
        });

        describe('测试 getUrlPrefix()', () => {
            it("参数为'uploadimage',返回的应该和直接读取对象的一致", () => {
                let pattern = helper.getPattern('uploadimage');
                let prefix = helper.getUrlPrefix(pattern);
                assert.equal(prefix, customConfig.imageUrlPrefix);
            });

            it("参数为'uploadfile',返回的应该和直接从对象读取的一致", () => {
                let pattern = helper.getPattern('uploadfile');
                let prefix = helper.getUrlPrefix(pattern);
                assert.equal(prefix, customConfig.fileUrlPrefix);
            });

            it("参数为'uploadvideo',返回的应该和直接从对象文件读取的一致", () => {
                let pattern = helper.getPattern('uploadvideo');
                let prefix = helper.getUrlPrefix(pattern);
                assert.equal(prefix, customConfig.videoUrlPrefix);
            });

        });
    });

});

