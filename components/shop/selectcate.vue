<template>
	<view class="cate-item">
		<div class="flex infobox align-center">
			<div class="imgbox">
				<image :src="goodsinfo.img_url+'?imageView2/0/w/140'" mode="scaleToFill"></image>
			</div>
			<div class="flex-sub">
				<div class="name">{{goodsinfo.name}}</div>
				<div class="mt20"><span>{{goodsinfo.product_color_}}</span>
				</div>
				<div class="mt20">约重：{{goodsinfo.weight}}kg</div>
			</div>
			<div class="btn" @tap="addgoods(goodsinfo.id,goodsinfo.class_name_)">添加</div>
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA: false
			};
		},
		props: {
			goodsinfo: {
				type: Object,
				default: {}
			}
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			addgoods(id,catename) {
				uni.navigateTo({
					url: '/shop/addgoods/addgoods?id=' + id+'&catename='+catename
				})
			}
		}
	}
</script>

<style lang="scss">
	.mt20 {
		margin-top: 20upx;
	}

	.ml30 {
		margin-left: 30upx;
	}

	.cate-item {
		background: #fff;
		padding: 20upx 42upx 20upx 20upx;
		box-shadow: 0 4upx 16upx 0 rgba(213, 213, 213, 1);
		border-radius: 8upx;
		color: #666;
		font-size: 24upx;

		.imgbox {
			width: 160upx;
			height: 160upx;
			border-radius: 8upx;
			overflow: hidden;
			margin-right: 18upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.name {
			color: #2E2E2E;
			font-size: 32upx;
		}

		.btn {
			font-size: 28upx;
			color: #fff;
			background: #19A967;
			width: 150upx;
			height: 70upx;
			border-radius: 8upx;
			text-align: center;
			line-height: 70upx;
		}

	}
</style>
