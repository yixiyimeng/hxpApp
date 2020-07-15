<template>
	<view class="cu-modal bottom-modal" :class="isContact ? 'show' : ''">
		<view class="cu-dialog bg-white">
			<view class="cu-bar ">
				<view class="action title">客服</view>
				<view class="action cuIcon-close" @tap="isContact = !isContact"></view>
			</view>

			<view class="action-list">
				<view class="action-item weixin flex align-center" v-for="(item, index) in contactList" :key="index">
					<span>{{ item.wx_name }}</span>
					<span class="flex-sub">{{ item.wx_number }}</span>
					<span class="copy" @tap="copy(item.wx_number)">复制</span>
				</view>
				<!-- #ifndef H5 -->
				<button open-type="contact" class="action-item"><view>在线客服</view></button>
				<!-- #endif-->
			</view>
		</view>
	</view>
</template>

<script>
import h5Copy from '@/js_sdk/junyi-h5-copy.js';
export default {
	data() {
		return {
			isContact: false,
			contactList: []
		};
	},
	methods: {
		getkf() {
			this.$postajax(this.$api.getkf).then(da => {
				if (da.code == 0) {
					this.contactList = da.data;
				}
			});
		},
		show() {
			this.isContact = true;
			this.getkf();
		},
		copy(value) {
			// #ifndef H5
			uni.setClipboardData({
				data: value,
				success: function() {
					console.log('success');
				}
			});
			// #endif
			// #ifdef  H5
			const result = h5Copy(value);
			if (result === false) {
				uni.showToast({
					title: '不支持'
				});
			} else {
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				});
			}
			// #endif
		}
	}
};
</script>

<style lang="scss">
@import 'colorui/modal.scss';

.action-list {
	.action-item {
		color: #ff6202;
		font-size: 28upx;
		line-height: 140upx;
		text-align: center;
		padding: 0 75upx;
		background: #fff;
		border-top: 1px solid #eee;

		& > span {
			color: #000;

			&.flex-sub {
				text-align: center;
			}

			&.copy {
				color: #ff6202;
				border: 1px solid #ff6202;
				height: 50upx;
				width: 100upx;
				line-height: 50upx;
				border-radius: 100upx;
				font-size: 24upx;
			}
		}
	}
}
</style>
