<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>提示</text>
				<text class="cuIcon-close"></text>
			</view>
			<view>
				<image src="/static/wechat.png" mode="widthFix" style="width:120upx"></image>
				<view class="text-xl">
					检测你还有绑定微信账户，是否绑定？
				</view>
			</view>
			<view class="ftbar flex">
				<view class="btn flex-sub" @tap="gotopage">
					取消
				</view>
				<view class="btn flex-sub">
					<button class="wechat" hover-class="btn-hover" withCredentials="true" lang="zh_CN" open-type="getUserInfo"
					 @getuserinfo="onGotUserInfo">
						<view>确定</view>
					</button>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				showModal: false,
				// openid: ''
			};
		},
		computed: {
			...mapState(['session_key', 'openid'])
		},
		methods: {
			...mapMutations(['uploadPhone', 'uploadMemberId', 'uploadUserInfo', 'login']),
			show() {
				this.showModal = true;
			},
			onGotUserInfo(e) {
				console.log(e.detail);
				if (e.detail.errMsg == 'getUserInfo:ok') {
					this.uploadInfo(e.detail.userInfo);
				}
			},
			uploadInfo(param) {
				let that = this;
				let option = {
					wx_name: param.nickName,
					wx_img: param.avatarUrl,
					openid: this.openid
				}
				this.$postajax(this.$api.updateUserInfo, option).then(da => {
					if (da.code == 0) {
						uni.showToast({
							title: '绑定成功',
							icon: 'none'
						});
						that.getUserinfo();
					}
				})
			},
			getUserinfo() {
				var $me = this;
				$me.$postajax($me.$api.getUserinfo)
					.then(res => {
						if (res.code == 0) {
							if (res.data.phone) {
								$me.uploadPhone(res.data.phone)
							}
							if (res.data.id) {
								$me.uploadMemberId(res.data.id)
							}
							$me.uploadUserInfo(res.data);
							$me.gotopage()
						}
					})
					.catch(err => {

					});
			},
			gotopage() {
				this.$emit('gotopage');

			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-modal {
		.cu-dialog {
			width: 640upx;
		}

		.title {
			color: #000;
			font-size: 40upx;
			padding: 38upx 36upx 30upx 48upx;

			image {
				width: 46upx;
			}
		}

		.logo {
			width: 118upx;
			margin: 50upx auto;
		}

		.copyitem {
			font-size: 34upx;
			color: rgba($color: #000000, $alpha: .6);
			padding: 20upx 60upx;

			.btn {
				color: #3DC098;
				border: 1px solid #3DC098;
				border-radius: 20upx;
				font-size: 24upx;
				line-height: 40upx;
				width: 80upx;
			}
		}

		.ftbar {
			border-top: 2upx solid rgba(0, 0, 0, .1);
			height: 112upx;
			margin-top: 50upx;

			.btn {
				font-weight: bold;
				font-size: 34upx;
				line-height: 110upx;
				text-align: center;

				&+.btn {
					border-left: 2upx solid rgba(0, 0, 0, .1);

					.wechat {
						line-height: 110upx;
						color: #576B95;
						font-size: 34upx;
						background: none;
					}
				}

			}
		}
	}
</style>
