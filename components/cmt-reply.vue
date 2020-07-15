<template>
	<view class="cmtreply flex">
		<!-- <view class="imgbox">
			<image src="/static/webwxgetmsgimg.png" class="tui-avatar"></image>
		</view> -->
		<view class="flex-sub">
			<view class="tui-nickname-box">
				<view class="flex">
					<view class="text-orange text-lg margin-right-sm">买家：</view>
					<view class="tui-cmt-nickname">{{info.member_name||'匿名'}}</view>
				</view>
				<view class="tui-cmt-time">{{info.created_at}}</view>
			</view>
			<view class="tui-cmt-content margin-top-xs">
				<view>{{info.info}}</view>
				<view class="imglist flex flex-wrap ">
					<image :lazy-load="true" :src="img+'?imageView2/0/w/180'" mode="aspectFill" v-for="(img,index) in info.img_url" @tap="previewImage(info.img_url,index)" :key="index"></image>
					<!-- <image src="/static/demo/1.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		methods: {
			previewImage(imageList,index) {
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
	.cmtreply {
		text-align: left;
		line-height: 48upx;
		color: #000;
		margin-bottom: 20upx;

		.imgbox {
			height: 64upx;
			width: 64upx;
			border-radius: 100%;
			overflow: hidden;
			background: #535353;
			margin-right: 25upx;
		}

		.tui-cmt-time {
			font-size: 20upx;
			color: #adadad;
			margin-top: 10upx;
			line-height: 24upx;
		}

		.imglist {
			image {
				width: calc((100vw - 160upx)/3);
				height: calc((100vw - 160upx)/3);
				margin:10upx 0;
				&:nth-child(3n+2){
					margin:10upx 20upx;
				}
			}
		}
	}
</style>
