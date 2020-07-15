<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>提示</text>
				<text class="cuIcon-close"></text>
			</view>
			<view>
				<input type="text" placeholder="请输入手机号码" value="" @input="changeMobile" />
				<view class="text-xl">
					检测你还有绑定手机号码，是否绑定？
				</view>
			</view>
			<view class="ftbar flex">
				<view class="btn flex-sub" @tap="gotopage">
					取消
				</view>
				<view @tap="uploadInfo">确定</view>
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
	import {
		regPhone
	} from '@/utils/index';
	export default {
		data() {
			return {
				showModal: true,
				openid: '',
				phone: ''
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
			changeMobile(e) {
				this.phone = e.detail.value;
			},
			uploadInfo() {
				let that = this;
				if (regPhone(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					});
					return false;
				}
				let option = {
					phone: this.phone
				}
				this.$postajax(this.$api.updateUserInfo, option).then(da => {
					if (da.code == 0) {
						uni.showToast({
							title: '绑定成功',
							icon: 'none'
						});
						this.getUserinfo();
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
					color: #576B95;

				}

			}
		}
	}
</style>
