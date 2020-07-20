import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
import {
	postajax,api,getajax,shopapi
} from "./utils/api"
Vue.prototype.$postajax = postajax;
Vue.prototype.$getajax = getajax;
Vue.prototype.$api = api;
Vue.prototype.$shopapi = shopapi;
// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
import cuCustom from '@/colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom)
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
