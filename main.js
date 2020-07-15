import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import {
	postajax,api,getajax,shopapi
} from "./utils/api"
import $http from '@/config/requestConfig'
Vue.prototype.$http = $http;
Vue.prototype.$postajax = postajax;
Vue.prototype.$api = api;
Vue.prototype.$shopapi = shopapi;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
