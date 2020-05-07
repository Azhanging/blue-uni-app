# blue-uni-app-program

#### 本项目基于[uni-app](https://uniapp.dcloud.io)集成开发，主要面向还是小程序层面（h5层面暂未考虑集成至当前项目中开发，考虑后期的Vue3.0）。当前项目为中间层，所有的项目都讲围绕该项目开发

### 介绍
对于企业内部，多数的积累操作、登录流程和细化流程都需要统一开发维护，就有了中间层的概念。本项目集成了对小程序部分api的集成，登录处理，page和request的优化等等，接下来会忙忙介绍所有的功能。

### 目录

> api(公共api配置)  
>  
> apps(所有的项目存放文件夹)    
>
> assets(公共资源)  
>> css  
>> js  
>
> code(针对request相对于的code处理)  
>
> components(公共组件，由于uni-app只能在项目文件夹内编译.vue文件,在项目编译阶段会把前端的文件夹复制到对于的项目文件夹内)
>  
> config(公共配置文件)  
>  
> mp-api(针对小程序封装的api)  
>  
> use-in-vue(扩展vue文件资源)  
>  
> vue-config(参照[vue-cli 3.x](https://cli.vuejs.org)配置)  

### mp-api

针小程序的方法，做了一定层面上的封装，入常用的request,login,showLoad,showToast等等...

#### request: Promise\<any\> 请求 
```Typescript
//请求的提醒信息，用于三种不同状态的提醒信息信息
interface TRequestTips {
	loading?: string;
	fail?: string;
	timeout?: string;
}

//请求类型参数
interface TRequestOpts {
	//是否显示loading
	showLoading?: boolean;
	//是否显示toast
	showToast?: boolean;
	//是否使用pageID
	checkPageID?: boolean;
	//请求的提醒
	tips?: TRequestTips;
	method?: string;
    //用于原始配置
	[ param: string ]: any;
}

//请求配置大部分都是与原始的小程序请求一致，相对添加了部分私有属性优化请求
const requestOpts:TRequestOpts = {};

//在vue实例中通过this.$request(opts)调用
this.$request(requestOpts).then((res)=>{
  
}).catch(()=>{

});

//也可以通过webpack的alias调用
import request from '$mp-api/request';
request(requestOpts).then((res)=>{
  console.log(res);
}).catch(()=>{
  
});
```

#### login: Promise\<any\> 登录
```Typescript
//在vue实例中通过this.$login(opts)调用

this.$login().then(()=>{
  //登录成功
}).catch((err)=>{
  //登录失败
});

//也可以通过webpack的alias调用
import login from '$mp-api/login';
login().then((res)=>{
  //登录成功
}).catch(()=>{
  //登录失败
});

```





