// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 1.reset.css
import "./assets/css/reset.css"
/* eslint-disable no-new */
// 2.vuex： 安装 目录 引入 挂到根实例
import store from "./store"
// 3.数据交互：安装 配置代理 utils/http.js 基本架子
// 4.过滤器
import "./filter"
// 5.公共组件
import "./components"
// 7.element-ui:安装 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
