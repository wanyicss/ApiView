# ApiView
后端接口可视化工具,实现本地及线上前端自我开发测试接口系统，无数据库的情况下，实现数据持久化，提高前端开发效率！

#### 技术框架：Express+react+antd


## 预览：##
![image](https://raw.githubusercontent.com/wanyicss/ApiView/master/app/public/imgs/home.png)

## 已实现功能 ##
 1. 完整的操作页面
 2. 首页展示所有项目及项目对应接口列表
 3. 考虑到数据量极小且时效短，创建的接口信息保存到本地
 4. 支持接口的重新编辑、预览及删除
 5. 编辑过程实时预览

## 背景 ##
前端开发工作很重要一部分是和后台实现数据交互。
如果等待后端开发好数据，前端才继续，这种串行开发效率低下。
实际上我们只需要约定好数据格式，前端自己模拟数据，就可以并行开发,效率可以显著提高。
## 现有方案 ##
1. 直接在前端代码里mock数据

    ```
    ...
    var data = {...}
    ...
    //这种方案适合小型结构的数据，一旦数据过于庞大，不适合放在js文件里面，不利于维护
    //不能很好的模拟ajax
    $.ajax({
        url:'..'//这个时候ajax接口不存在，调不通
    })
    //不能重复利用，上生产肯定要删掉
    ```
 2. 使用mockjs：http://mockjs.com
    生成随机数据，拦截 Ajax 请求


## 使用方法介绍 ##

 1.点击创建项目
 ![image](https://raw.githubusercontent.com/wanyicss/ApiView/master/app/public/imgs/createPro.png)

 2.选择左侧项目列表
![image](https://raw.githubusercontent.com/wanyicss/ApiView/master/app/public/imgs/home.png)

 3.点击添加项目接口
 ![image](https://raw.githubusercontent.com/wanyicss/ApiView/master/app/public/imgs/createApi.png)
	
 4.可重新编辑接口信息
 ![image](https://raw.githubusercontent.com/wanyicss/ApiView/master/app/public/imgs/editApi.png)

## 总结 ##
二次开发

备注：来自：http://kquanr.com
