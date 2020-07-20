<template>
	<view class="pageview">
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content">
					<text class="name">{{info.product_name}}</text>
				</view>
				<view>
					<text class="state">{{info.status_}}</text>
				</view>
			</view>


			<view class="cu-item">
				<view class="content flex">
					<view class="title">购买数量：</view>
					<view class="flex-sub">{{info.qty}}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<view class="title">下单日期：</view>
					<view class="flex-sub">{{info.order_time}}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<view class="title">投诉日期：</view>
					<view class="flex-sub">{{info.created_at}}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<view class="title">申请金额：</view>
					<view class="flex-sub">{{info.amount}}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex align-start">
					<view class="title">申诉内容：</view>
					<view class="flex-sub">
						{{info.info}}
					</view>
				</view>

			</view>
			<view class="cu-item">
				<view class="content">
					<view class="title">实物图片：</view>
					<view class="imgbox">
						<image :src="img+'?imageView2/0/w/180'" mode="aspectFill" @tap="previewImage(info.img_url,index)" v-for="(img,index) in info.img_url"></image>
					</view>
				</view>
			</view>

		</view>
		<view class="cu-bar bg-white margin-top solid-bottom" v-if="info.status==2">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>处理结果</text>
			</view>
		</view>
		<view class="cu-list menu sm-border" v-if="info.status==2">
			<view class="cu-item">
				<view class="content flex">
					<view class="title">处理时间：</view>
					<view class="flex-sub">{{info.updated_at}}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<view class="title">赔付金额：</view>
					<view class="flex-sub price">￥{{info.tk_amount}}(供应商：￥{{info.aftersale_amount}}，平台：￥{{info.aftersale_amount_supper}})</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content flex">
					<view class="title">处理意见：</view>
					<view class="flex-sub">{{info.remark}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				info: {}
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.getOrderInfo();
		},
		methods: {
			getOrderInfo() {
				this.$getajax(this.$shopapi.getAftersalelist + this.id).then(da => {
					if (da.code == 0) {
						this.info = da.data;
					} else {

					}
				})
			},
			previewImage: function(imageList,index) {
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

<style lang="scss" scoped>
	.pageview {
		background: #f0f0f0;
	}

	.name {
		font-size: 32upx;
		color: #FD3C3E;
	}

	.state {
		color: #FF9518;
		font-size: 30upx;
	}

	.price {
		color: #FD3C3E;
		font-size: 30upx;
	}

	.cu-list {
		color: #7C7C7C;
		font-size: 28upx;

		.cu-item {
			.content {
				padding: 40upx 0;
			}
		}

		.title {
			color: #333;
			font-weight: bold;
			min-width: calc(4em + 15px);
		}

		.imgbox {
			width: 100%;
			margin-top: 30upx;
			box-shadow: 0 10upx 10upx rgba(0, 0, 0, .1);
			border-radius: 12upx;
			overflow: hidden;

			image {
				width: calc((100vw - 168upx)/3);
				height: calc((100vw - 168upx)/3);
				margin: 0 10upx;

				// &:nth-child(3n+2) {
				// 	margin: 0 .05%;
				// }
			}
		}
	}
</style>
