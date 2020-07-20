<template>
	<view>
		<view class="cu-form-group justify-between">
			<view class="title">店铺头像：</view>
			<div class="avatar">
				<image :src="info.supplier_img"></image>
			</div>
		</view>
		<view class="cu-form-group">
			<view class="title">店铺名称：</view>
			<span>{{info.supplier_name}}</span>
		</view>
		<view class="cu-form-group">
			<view class="title">类别：</view>
			<span>{{info.supplier_group_id}}</span>
		</view>
		<view class="cu-form-group">
			<view class="title">联系人：</view>
			<span>{{info.supplier_user_name}} {{info.supplier_user_phone}}</span>
		</view>
		<view class="cu-form-group">
			<view class="tip">若修改资料，请联系平台管理人员。</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #fff;
	}


	.cu-form-group span {
		text-align: right;
		color: #7C7C7C;
	}

	.tip {
		color: #8B8B8B;
		font-size: 28upx;
	}

	.avatar {
		width: 140upx;
		height: 140upx;
		margin: 30upx 0;

		image {
			border-radius: 100%;
			width: 100%;
			height: 100%;
			overflow: hidden;
			border: 1px solid #19A967;
		}
	}
</style>
