<template>
	<view class="card bg-white">
		<view class="flex align-center card-bd" @tap="setAddr">
			<image src="/static/icon15.png" mode="widthFix" class="addr"></image>
			<view class="flex-sub">
				<view class="">
					<text class="name">{{info.contact_name}}</text>
					<text>{{info.contact_phone}}</text>
				</view>
				<view class="margin-top-sm">{{info.province}}{{info.city}}{{info.district}}{{info.address}}</view>
			</view>
			<image src="/static/icon18.png" mode="widthFix" class="arrow"></image>
		</view>
		<view class="card-ft flex align-center justify-between">
			<label @tap="changeDefault">
				<checkbox :class="info.is_default==1?'checked':''" :checked="info.is_default==1?true:false" class="round orange"
				 value="1" style="transform: scale(.7);" /><text>设为默认</text>
			</label>
			<view class="flex">
				<view class="edit" @tap="editAddr">
					<image src="/static/icon16.png" mode="widthFix"></image>
					<text>编辑</text>
				</view>
				<view class="del" @tap="handDelAddr(info.id)">
					<image src="/static/icon17.png" mode="widthFix"></image>
					<text>删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		props: {
			info: {
				type: Object,
				default: {}
			},
			settype: {
				type: [String, Number]
			}
		},
		methods: {
			...mapMutations(['SET_ADDRINFO']),
			changeDefault() {
				this.$postajax(this.$api.setdefaultAddr + this.info.id).then(da => {
					uni.showToast({
						title: da.msg
					});
					setTimeout(() => {
						/* 刷新列表 */
						this.$emit('upload')
					}, 200)

				})
				// console.log(e.detail.value)
			},
			editAddr() {
				uni.navigateTo({
					url: '/pages/addaddr/addaddr?info=' + JSON.stringify(this.info)
				})
			},
			setAddr() {
				if (this.settype == 1) {
					this.SET_ADDRINFO(this.info)
					uni.navigateBack({
						delta: 1
					});
				} else {
					this.editAddr()
				}
			},
			handDelAddr(id) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '你确定要删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.delAddr(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delAddr(id) {
				this.$postajax(this.$api.delAddr + id).then(da => {
					if (da.code == 0) {
						uni.showToast({
							title: '删除地址成功',
							icon: 'success'
						});
						setTimeout(() => {
							/* 刷新列表 */
							this.$emit('upload')
						}, 200)
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.card {
		border-radius: 20upx;
		font-size: 26upx;
		margin: 0 26upx 30upx;
		color: #000;

		.card-bd {
			padding: 30upx 36upx;
		}

		.name {
			font-size: 28upx;
			font-weight: bold;
			margin-right: 28upx;
		}

		.addr {
			width: 26upx;
			margin-right: 60upx;
		}

		.arrow {
			width: 17upx;
		}

		.card-ft {
			border-top: 1px solid #e5e5e5;
			padding: 0 36upx;
			height: 65upx;

			.round {
				transform: scale(.7);
			}

			image,
			text {
				display: inline-block;
				vertical-align: middle;
			}

			.edit {
				image {
					width: 34upx;
					margin-right: 20upx;
				}
			}

			.del {
				margin-left: 26upx;

				image {
					width: 37upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
