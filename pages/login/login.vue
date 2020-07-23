<template>
	<view class="flex flex-direction pageview">
		<image src="../../static/logo.png" mode="widthFix" class="logo"></image>
		<view class="group flex-sub">
			<view class="row flex align-center">
				<text class="cuIcon-phone icon"></text>
				<input type="text" placeholder="请输入手机号码" class="flex-sub" @input="changeMobile" v-model="phone" />
			</view>
			<view class="row flex align-center">
				<text class="cuIcon-lock icon"></text>
				<input type="password" placeholder="请输入密码" class="flex-sub" @input="changePwd" v-model="password" />
			</view>
			<view class="margin-top-lg" :class="[isAble ? 'submitBtn' : 'defaultBtn']" @tap="submitLogin">登录</view>
			<view class="text-right margin-top-lg"><navigator url="../articleDetails/articleDetails?id=21" class="reg" hover-class="none">去注册&gt;</navigator></view>
		</view>
	</view>
</template>

<script>
import { regPhone } from '@/utils/index';
export default {
	data() {
		return {
			phone: '',
			password: ''
		};
	},
	onShow() {},
	mounted() {},
	computed: {
		isAble() {
			if (regPhone(this.phone) && this.password) {
				return true;
			} else {
				return false;
			}
		}
	},
	onLoad() {
		try {
			let loginInfo = uni.getStorageSync('loginInfo') || {};
			if (loginInfo.phone) {
				this.phone = loginInfo.phone;
			}
			if (loginInfo.password) {
				this.password = loginInfo.password;
			}
		} catch (e) {
			//TODO handle the exception
		}
	},
	methods: {
		changeMobile(e) {
			this.phone = e.detail.value;
		},
		changePwd(e) {
			this.password = e.detail.value;
		},
		submitLogin() {
			if (this.isAble) {
				let param = {
					phone: this.phone,
					password: this.password
				};
				this.$postajax(this.$shopapi.supplierlogin, param).then(da => {
					if (da.code == 0) {
						uni.setStorageSync('loginInfo', param);
						uni.switchTab({
							url: '/pages/goodslist/goodslist'
						});
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
page,
.pageview {
	height: 100%;
	width: 100%;
	padding-top: 60upx;
	box-sizing: border-box;
}
.logo {
	width: 200upx;
	margin: 0 auto 60upx;
}
.group {
	margin: 0 30upx;
	font-size: 26upx;

	.row {
		border-bottom: 1px solid #e5e5e5;
		margin: 0 15upx;
		padding: 25upx 20upx;

		.icon {
			font-size: 36upx;
			margin-right: 20upx;
			color: #19a967;
		}
	}
}

.reg {
	font-size: 30upx;
	color: #19a967;
}
</style>
