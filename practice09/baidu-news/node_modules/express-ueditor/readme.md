# express-ueditor

一套 Express 服务端中间件。

本身为 [UEditor](http://ueditor.baidu.com/website/) 编写，但是`express-ueditor`完全可以脱离`UEditor`使用，比如上传文件、上传图片、上传视频等操作。

* `UEditor`类是`express-ueditor`各功能的统一出入口，
* 各组件以高阶函数的形式提供，比如`config()`,`upload(actionStr)`分别返回一个中间件函数。
* 支持各种自定义配置
* 测试驱动

## 入口程序：UEditor

示例：

```JavaScript
const app=express();
const router=express.Router();

const ueditor=new UEditor({
    //...如果不提供，则使用默认参数
});

router.use("/controller",ueditor.config());
router.use("/controller",ueditor.upload('uploadimage'));
router.use("/controller",ueditor.upload('uploadfile'));

app.use(router);
```

会根据ueditor前端传来的action做出响应

## api

### config()

生成配置中间件。当ueditor前端传来的action="config"时，会自动根据服务端的配置来返回JSON字符串给前端。

### upload(actionStr="uploadfile")

生成上传中间件：根据actionStr的不同，生成不同的中间件用以处理图像上传、文件上传、视频上传、涂鸦上传、和远程抓取上传。

`actionStr`的取值和百度UEditor前端定义的上传类动作名一致，全小写命名。比如要在某个路由下响应'uploadimage'、`uploadvideo`，则其配置为：

```JavaScript
const router=express.Router();
const ueditor=new UEditor({
    videoMaxSize:5*1014*1024*1024,  
});

router.post("/image",ueditor.upload("uploadimage"));
router.post("/video",ueditor.upload("uploadvideo"));
```

百度`UEditor`编辑器前端上传文件时，会向相应后端URL发送请求，在`QueryString`中带上`action=uploadimage`、`action=uploadfile`之类的参数。

注意，如果脱离`UEditor`使用，前端向服务器发起上传请求时，应手工带上这类的`action`参数。

## todo

* listimage暂时之搭建了一个框架
* 更方便的路由配置（默认）
* 上传到其他服务器七牛、亚马逊 