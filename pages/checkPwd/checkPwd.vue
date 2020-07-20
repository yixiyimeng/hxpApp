<template>
	<view class="flex flex-direction pageview">
		<view class="group flex-sub">
			<view class="row flex align-center">
				<text class="cuIcon-phone icon"></text>
				<input type="text" placeholder="请输入手机号码" class="flex-sub" @input="changeMobile" />
			</view>
			<view class="row flex align-center">
				<text class="cuIcon-command icon"></text>
				<input type="text" placeholder="请输入验证码" class="flex-sub" @input="changeCode">
				<view class="getcode" @tap="getcode">{{codetxt}}</view>
			</view>
			<view class="row flex align-center">
				<text class="cuIcon-lock icon"></text>
				<input type="password" placeholder="请输入密码" class="flex-sub" @input="changePwd" />
			</view>
			<view class="row flex align-center">
				<text class="cuIcon-lock icon"></text>
				<input type="password" placeholder="请输入确认密码" class="flex-sub" @input="changetPwd" />
			</view>
			<view class="margin-top-lg" :class="[isAble ? 'submitBtn' : 'defaultBtn']" @tap="submitLogin">确认</view>

		</view>
	</view>
</template>

<script>
	import {
		regPhone
	} from '@/utils/index';
	let num = 60;
	export default {
		data() {
			return {
				phone: '',
				password: '',
				tpassword: '',
				verify: '',
				codetxt: '获取验证码'
			};
		},
		onShow() {},
		mounted() {},
		computed: {
			isAble() {
				if (regPhone(this.phone) && this.password && this.password && this.tpassword) {
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
			changeCode(e) {
				this.verify = e.detail.value;
			},
			changetPwd(e) {
				this.tpassword = e.detail.value;
			},
			getcode() {
				let $me = this;
				if (num < 60) {
					return false;
				}
				if (regPhone(this.phone)) {
					/* 设置倒计时 */
					$me.codetxt = num + 's';
					var timer = setInterval(function() {
						if (num == 1) {
							clearInterval(timer);
							$me.codetxt = '获取验证码';
							num = 60;
						} else {
							num--;
							$me.codetxt = num + 's';
						}
					}, 1000);
					/* 获取验证码 */
					this.$postajax(this.$api.getcode + this.phone).then(da => {
						uni.showToast({
							title: da.msg,
							icon: 'none'
						});
					})
				} else {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					});
				}
			},
			submitLogin() {
				if (this.isAble) {
					if (this.tpassword != this.password) {
						uni.showToast({
							title: '两次密码输入不相同',
							icon: 'none'
						});
						return false
					}
					this.$postajax(this.$shopapi.checkPwd, {
						phone: this.phone,
						password: this.password,
						tpassword: this.tpassword,
						verify: this.verify
					}).then(da => {
						if (da.code == 0) {
							uni.showToast({
								title: '修改密码成功，请重新登录',
								icon: 'none'
							});
							uni.clearStorageSync();
							uni.navigateTo({
								url: '/pages/login/login'
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
	}

	.group {
		margin: 0 30upx;
		font-size: 26upx;

		.row {
			border-bottom: 1px solid #e5e5e5;
			margin: 0 15upx;
			padding: 25upx 20upx;

			.getcode {
				color: #fff;
				width: 165upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 10upx;
				background: #19a967;
			}

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
