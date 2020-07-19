<template>
	<view class="flex flex-direction pageview">
		<view class="group flex-sub">
			<view class="row flex align-center">
				<text class="cuIcon-phone icon"></text>
				<input type="text" placeholder="请输入手机号码" class="flex-sub" @input="changeMobile" />
			</view>
			<view class="row flex align-center">
				<text class="cuIcon-lock icon"></text>
				<input type="password" placeholder="请输入密码" class="flex-sub" @input="changePwd" />
			</view>
			<view class="margin-top-lg" :class="[isAble ? 'submitBtn' : 'defaultBtn']" @tap="submitLogin">登录</view>
			<view class="text-right margin-top-lg"><navigator url="../apply/apply" class="reg" hover-class="none">去注册&gt;</navigator></view>
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
	methods: {
		changeMobile(e) {
			this.phone = e.detail.value;
		},
		changePwd(e) {
			this.password = e.detail.value;
		},
		submitLogin() {
			if (this.isAble) {
				this.$postajax(this.$shopapi.supplierlogin, {
					phone: this.phone,
					password: this.password
				}).then(da => {
					uni.switchTab({
						url: '/pages/mailcenter/mailcenter'
					});
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
