//全局入口文件
//导入createApp函数用于创建app实例
import { createApp } from 'vue'
//引入重置样式
import '@/assets/reset.scss'
//导入顶级根组件
import App from './App.vue'

//创建实例
const app=createApp(App)

//导入路由
import router from "@/router";

//使用路由
app.use(router)

//挂着app实例，在index.html的id为app的div内部
app.mount('#app')
