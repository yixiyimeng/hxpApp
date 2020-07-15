<template>
	<view class="flex flex-direction pageview">
		<view class="group flex-sub">
			<view class="row flex align-center">
				<text class="cuIcon-phone"></text>
				<input type="text" placeholder="请输入手机号码" class="flex-sub" @input="changeMobile">
			</view>
			<view class="row flex align-center">
				<text class="cuIcon-lock align-center"></text>
				<input type="text" placeholder="请输入密码" class="flex-sub" @input="changePwd">
			</view>
			{{ceshi.abc}}
			<view class="margin-top-lg" :class="[isAble?'submitBtn':'defaultBtn']" @tap="submitLogin">登录</view>
		</view>

	</view>
</template>

<script>
	import {
		regPhone
	} from '@/utils/index';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	let num = 60;
	export default {
		data() {
			return {
				phone: '',
				password: '',
				verify: '',
				codetxt: '获取验证码',
				unionid: '',
				isAble: true,
				ceshi: {
					abc: 12323
				}
			};
		},
		computed: {
			// isAble() {
			// 	if (regPhone(this.phone) && this.password) {
			// 		return true
			// 	} else {
			// 		return false
			// 	}

			// },
			...mapState(['session_key', 'openid', 'invited'])
		},
		watch: {
			phone(newval, oldval) {
				if (newval != oldval) {

					this.isAble = regPhone(this.phone) && this.password.length > 0
					console.log(this.isAble)
				}
			},
			password(newval, oldval) {
				if (newval != oldval) {
					this.isAble = regPhone(this.phone) && this.password.length > 0;
					console.log(this.isAble)
				}
			}
		},
		onReady() {
			console.log("运行环境版本号(客户端uni-app的基座版本号):" + plus.runtime.uniVersion);
			console.log("应用基座版本号(客户端5+运行环境的版本号):" + plus.runtime.innerVersion); //格式为：[主版本号].[次版本号].[修订版本号].[编译代号]
		},
		onShow() {

		},
		mounted() {

		},
		methods: {
			changeMobile(e) {
				this.phone = e.detail.value;
			},
			changePwd(e) {
				this.password = e.detail.value;
			},
			submitLogin() {
				this.$set(this.ceshi, 'abc', 567)
				console.log(this.ceshi)
				let param = {
					phone: this.phone,
					password: this.password
				}
				if (this.phone && this.password) {
					this.loginUser(param)
				}
			},
			/* 登录 */
			loginUser(param) {
				this.$postajax(this.$shopapi.login, param).then(da => {
					if (da.code == 0) {
						this.getUserinfo()
					}
					uni.showToast({
						title: da.msg,
						icon: 'none'
					});
				})
			},
			getUserinfo() {
				var $me = this;
				$me.$postajax($me.$api.getUserinfo)
					.then(res => {
						if (res.code == 0) {
							// if (res.data.phone) {
							// 	$me.uploadPhone(res.data.phone)
							// }
							// if (res.data.id) {
							// 	$me.uploadMemberId(res.data.id)
							// }
							// $me.uploadUserInfo(res.data);
							// $me.gotopage();
						}
					})
					.catch(err => {

					});
			},
			gotopage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}

		}
	}
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
				border-radius: 20upx;
				background-image: linear-gradient(90deg, #fa9649, #fc713a);
			}
		}
	}

	.otherway {
		text-align: center;
		font-size: 26upx;
		color: #878787;

		.title {
			margin: 0 30upx;
			font-weight: bold;

			.line {
				height: 1px;
				background: #e5e5e5;
			}

			&>view:nth-child(2) {
				margin: 0 30upx;
			}
		}

		.wechat {
			background: #fff;
			font-size: 26upx;
		}

		image {
			display: block;
			margin: 35upx auto 25upx;
			width: 116upx;
		}

		navigator {
			display: inline-block;
		}
	}
</style>
