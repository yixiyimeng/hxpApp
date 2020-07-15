<template>
	<view class="evaluate-item">
		<div class="evaluate-item-hd solid-bottom">
			<div class="title  flex justify-between">
				<span>{{info.product_name}}</span>
				<view>
					<!-- <tui-rate :current="info.grade" disabled :size="14"></tui-rate> -->
					<span>评分：</span>
					<span>{{info.grade}}</span>
				</view>
			</div>
			<view class="margin-top-sm margin-bottom">等级：{{info.product_dengji_}} 单位：{{info.product_guige_}} 长度：{{info.product_changdu_}} 成熟度：{{info.product_chengshudu_}}</view>
		</div>
		<div class="info ">{{info.info}}</div>
		<view class="imgbox">
			<image :src="img+'?imageView2/0/w/180'" mode="aspectFill" @tap="previewImage(info.img_url,index)" v-for="(img,index) in info.img_url"></image>
		</view>
		<div class="flex evaluate-item-bd justify-between solid-top">
			<span>{{info.created_at}}</span>
			<span>买家:{{info.user_name}}</span>
		</div>
	</view>
</template>

<script>
	import tuiRate from "@/components/rate/rate"
	export default {
		data() {
			return {
				index: 4
			};
		},
		components: {
			tuiRate
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		watch: {
			info(newval, oldval) {
				this.index = parseInt(newval.grade)
			}
		},
		methods: {
			previewImage: function(imageList, index) {
				if (!imageList.length) return;
				uni.previewImage({
					current: imageList[index],
					loop: true,
					urls: imageList
				})
			}
		}
	}
</script>

<style lang="scss">
	.evaluate-item {
		margin: 20upx 30upx 0;
		background: #fff;
		box-shadow: 0px 4upx 16upx 0px rgba(213, 213, 213, 1);
		border-radius: 16upx;
		padding: 34upx 0;
		color: #ABABAB;
		font-size: 24upx;

		.evaluate-item-hd {
			padding: 0 24upx 20upx;
		}

		.title {
			color: #23b571;
			font-size: 30upx;
		}

		.info {
			color: #5F5F5F;
			font-size: 28upx;
			margin: 25upx 40upx;
			line-height: 40upx;
		}
	}

	.imgbox {
		margin: 20upx 25upx;

		image {
			width: calc((100vw - 200upx)/3);
			height: calc((100vw - 200upx)/3);
			margin: 10upx 0;

			&:nth-child(3n+2) {
				margin: 10upx 40upx;
			}
		}
	}
	.evaluate-item-bd{
		padding: 30upx 40upx 0;
	}
</style>
