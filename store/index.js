import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openid: 'oVWe15EIbbO1yR3cbeT2g6HoLL8A',
		session_key: '',
		phone: '',
		userInfo: {},
		memberId: uni.getStorageSync('memberId') || '',
		hasLogin: false,
		addressInfo: '',
		keyword: '',
		supplierInfo: {},
		invited: uni.getStorageSync('invited') || '',
		navIndex:0
	},
	mutations: {
		login(state, payload) {
			console.log("登录信息" + JSON.stringify(payload))
			state.openid = payload.openid;
			uni.setStorageSync('openid', state.openid);
			state.session_key = payload.session_key
		},
		uploadPhone(state, phone) {
			state.phone = phone;

		},
		uploadMemberId(state, memberId) {
			state.memberId = memberId;
			uni.setStorageSync('memberId', memberId);
			state.hasLogin = true;
		},
		uploadUserInfo(state, userinfo) {
			state.userInfo = userinfo;
		},
		SET_ADDRINFO(state, addrinfo) {
			state.addressInfo = addrinfo;
		},
		SET_KEYWORD(state, keyword) {
			state.keyword = keyword;
		},
		SET_INVITED(state, invited) {
			uni.setStorageSync('invited', invited);
			state.invited = invited;
		},
		uploadSupplierInfo(state, supplierInfo) {
			state.supplierInfo = supplierInfo;
		},
		logout(state) {
			for (var key in state) {
				if (key == 'hasLogin') {
					state[key] = false
				} else {
					state[key] = ''
				}
			}
			uni.clearStorageSync('')
		},
		SET_NAVINDEX(state, navIndex) {
			uni.setStorageSync('navIndex', navIndex);
			state.navIndex = navIndex;
		}
	}
})

export default store
