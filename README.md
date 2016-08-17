# “智能药柜”上位机技术文档

## 一、技术框架
* 前端：Angular2（ionic2）
* 后端：JavaEE（Sturts2 + Hibernate）
* 服务器环境：JDK7 + Tomcat7 + MySQL
* 部署环境：Docker（Ubuntu 系统环境，Docker 虚拟化，Apache 官方 Tomcat7 镜像）

## 二、前端架构

### 2-1 简介
框架采用基于 Angular2 的 ionic2 框架（注：ionic 更新较快，开发该项目时版本为 v2 beta32），支持的开发语言为基于 es6 的 typescript，开发过程中所使用的编辑器为 WebStorm (version 16.02)。

调试环境为 Chrome 52，搭配浏览器跨域插件 Allow-Control-Allow-Origin。

### 2-2 模块与功能

主要分为三大模块：病号模块、药品模块、病例模块，对应于 UI tab 栏从左到右每个 tab。

#### 2-2-1 病号模块

> 注：以下所有 Android 端 Screenshot 取自 Galaxy S5，iOS 端 Screenshot 取自 iPhone 5。

1. 能够展示用户的基本信息，包括头像、姓名、简介、手机号。
2. 能够通过点击右下角的按钮，可以跳转至添加病号界面
3. 能够点击每个病号右侧的黄色小药箱按钮，打开对应病号的所有药箱

Android 端 UI 如图：
![](http://airing.ursb.me/image/drug/drug-m1-android.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m2-android.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m3-android.png-h600.jpg)

iOS 端 UI 如图：
![](http://airing.ursb.me/image/drug/drug-m1-ios.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m2-ios.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m3-ios.png-h600.jpg)


#### 2-2-2 药品模块

1. 能够展示药品的基本信息，包括药品照片、药品名、药品所在药柜、药品更新日期、药品状态
2. 每个药品右侧的图标表明了药品的状态，如果是黄色警告图标，代表药品环境不达标，如果是红色警告图标，代表药品过期，亟需更新
3. 点击每个药品卡片左下角的药柜图标，可以打开相应的药柜
4. 点击右上角的添加按钮，可以调转至添加药品界面

Android 端 UI 如图：
![](http://airing.ursb.me/image/drug/drug-m4-android.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m5-android.png-h600.jpg)

iOS 端 UI 如图：
![](http://airing.ursb.me/image/drug/drug-m4-ios.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m5-ios.png-h600.jpg)


#### 2-2-3 病例模块

1. 列表呈现病例信息，包括每条病例对应的病号、药品、开病例的时间
2. 左划病例，点击红色叉号按钮，可以删除病例
3. 左划病例，点击蓝色钥匙按钮，可以打开对应病例所需药品的药柜 

Android 端 UI 如图：
![](http://airing.ursb.me/image/drug/drug-m6-android.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m7-android.png-h600.jpg)

iOS 端 UI 如图：
![](http://airing.ursb.me/image/drug/drug-m6-ios.png-h600.jpg)
![](http://airing.ursb.me/image/drug/drug-m7-ios.png-h600.jpg)

## 三、服务端架构

### 3-1 简介

服务端采用 JavaEE 的框架 Struts2 与 Hibernate，开发语言为 Java，开发所使用的 IDE 为 MyEclipse 2015 CI。数据库选用 MySQL，数据库管理工具使用 PHPAdmin，设计工具使用 MySQLWorkbench。

服务器环境为 JDK7 + Tomcat7 + MySQL5.6，部署于阿里云 ECS 上，操作系统为 Ubuntu。结合国内 Docker 云平台 DaoCloud 使用，采用 Apache 官方 Tomcat7 镜像。

客户端与服务端通信使用 HTTP 协议 GET方式，文本格式为 JSON。

### 3-2 数据字典

药品信息：

1. 药品ID
2. 药品名称
3. 药品对应的柜号
4. 药品添加时间
5. 药品更新时间
6. 药品是否过期

---

病号信息：

1. 病号ID
2. 病号姓名
3. 病号看病时间
4. 病号年龄
5. 病号手机号

---

病例信息：

1. 病例ID
2. 病号ID
3. 药品ID
4. 所需药品质量
5. 是否取药
6. 取药时间

### 3-3 E-R图
![](http://airing.ursb.me/2016-07-12-14682981908862.jpg)

### 3-4 接口设计

接口路由配置如下（struts.xml）： 

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC "-//Apache Software Foundation//DTD Struts Configuration 2.1//EN" "http://struts.apache.org/dtds/struts-2.1.dtd">
<struts>
<package name="default" extends="struts-default">
	<action name="open_room" class="com.drug.action.OpenRoomAction"></action>
	<action name="bad_room" class="com.drug.action.BadRoomAction"></action>
	<action name="update_room" class="com.drug.action.UpdateDrugAction"></action>
	<action name="patient_room" class="com.drug.action.PatientRoomsAction"></action>
	
	
	<action name="home_page" class="com.drug.action.HomePageAction"></action>
	<action name="drug_page" class="com.drug.action.DrugPageAction"></action>
	<action name="case_page" class="com.drug.action.CasePageAction"></action>
	<action name="add_patient" class="com.drug.action.AddPatientAction"></action>
	<action name="add_drug" class="com.drug.action.AddDrugAction"></action>
	<action name="add_case" class="com.drug.action.AddCaseAction"></action>
	
	<action name="want_room" class="com.drug.action.WantRoomAction"></action>
	<action name="ask_room" class="com.drug.action.AskRoomAction"></action>
</package>
</struts>    
```

1. open_room 接口：开柜接口，用于客户端申请开柜，格式略。
2. bad_room 接口：硬件警告接口，用于通知药品过期警告与环境警告，格式如下。
3. update_room 接口：更新药柜接口，格式略。
4. patient_room 接口：根据病号开柜接口，用户客户端申请通过病号开柜，格式略。
5. home_page 接口：首页接口，返回病号列表信息，格式略。
6. drug_page 接口：药品页面接口，返回药品列表信息，格式略。
7. case_page 接口：病例页面接口，返回病例列表信息，格式略。
8. add_patient 接口：添加病号接口，用于客户端添加病号，格式略。
9. add_drug 接口：添加药品接口，用于客户端添加药品，格式略。
10. add_case 接口：添加病例接口，用于客户端添加病例，格式略。
11. want_room 接口：硬件申请开柜接口，用于向硬件端申请开柜的接口，详情如下。
12. ask_room 接口：硬件循问接口，用于硬件端轮询服务端是否开柜，详情如下。

**这里详细说明硬件端与服务端通信的有关接口的通信格式。**

1. 过期警报接口（bad_room）
	* 接口url：http://localhost:8080/drug/bad_room.action
	* 参数：药品id（drugId）
	* 返回：status

2. 开柜申请接口（want_room）
	* 接口url：http://localhost:8080/drug/want_room.action
	* 参数：药品id（drugId）
	* 返回：status

3. 开柜轮询接口（ask_room）
	* 接口url：http://localhost:8080/drug/ask_room.action
	* 参数：药品id（drugId）
	* 返回：status，drugRooms

> status：200，OK；500，失败。
> drugRooms：字符串数组，申请开柜的柜号。

