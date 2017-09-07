 ### 使用方法
 
 `npm install react-ui-common`
 
 #### 目前可用 `UI` 功能
 
 * `navCircle` 圆形可拖拽导航菜单
 
 
 
 安装具体使用方式:
 
 ```
 import { NavCircle } from 'react-ui-common'      
 
 let navInfo = {
 
 		showTxt: '我是导航',
 		hideTxt: '隐藏起来',
 		itemList: [
         {txt: '我是导航1', link: 'http://www.baidu.com/'},
         {txt: '我是导航2', link: 'http://www.sina.com.cn/'},
 			]
 	}
 	
 	// 传入 navInfo 属性
 	
 	<NavCircle navInfo={ navInfo } />
 
 ```
 
 后续会不断完善添加组件