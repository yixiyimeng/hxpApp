import {
	basePath
} from '@/utils/index.js'
import axios from 'axios'
axios.defaults.timeout = 60000; //响应时间
axios.defaults.withCredentials = true; //让请求头携带参数cookie
axios.defaults.baseURL = basePath; //配置接口地址  
const request = axios.create({
	crossDomain: true
});
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

request.interceptors.request.use((request) => {
	request.headers['Content-Type'] = 'application/json'
	if (request.data && request.data.noloading) {
		let newparam = {};
		for (var key in request.data) {
			if (key != 'noloading') {
				newparam[key] = request.data[key]
			}
		}
		request.data = Object.assign({}, newparam);

	} else {
		uni.showLoading({
			title: '拼命加载中...'
		})
	}
	console.log(request)
	return request
})

request.interceptors.response.use(
	(response, promise) => {
		console.log(response)
		if (response && response.headers && response.headers['set-cookie']) {
			uni.setStorage({
				key: 'cookiekey',
				data: response.headers['set-cookie'][0]
			});
		}
		if (response.data.code == 0 || response.config.url == (response.config.baseURL + '/api/member/userinfo')) {
			// return promise.resolve(response.data)
			wx.hideLoading();
			return response.data
		} else {
			if (response.data.code == 4004) {

				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}, 500)

			} else {
				uni.showToast({
					title: response.data.msg || '请求发生错误了',
					icon: 'none'
				})
				return response.data
			}
			uni.hideLoading()

		}
	},
	(err, promise) => {
		return Promise.reject(err)
	}
)

export default request
