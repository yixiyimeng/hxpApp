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
			<view class="margin-top-lg" :class="[isAble?'submitBtn':'defaultBtn']" @tap="submitLogin">登录</view>
		</view>
	
	</view>
</template>

<script>
	import {
		regPhone
	} from '@/utils/index';
	export default {
		data() {
			return {
				phone: '',
				password: '',
			};
		},
		onShow() {

		},
		mounted() {

		},
		computed: {
			isAble() {
				if (regPhone(this.phone) && this.password) {
					return true
				} else {
					return false
				}
		
			},
		},
		methods: {
			changeMobile(e) {
				this.phone = e.detail.value;
			},
			changePwd(e) {
				this.password = e.detail.value;
			},
			submitLogin() {
				// this.isAble = false
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
