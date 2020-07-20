<template>
	<view class="pageview flex flex-direction">
		<view class="topbar bg-white">
			<view class="flex justify-between align-center">
				<text class="num">货位号：{{info.hj_num}}</text>
				<!-- <view class="btn" v-if="info.status==11">确认配送</view> -->
				<view class="btn" @tap="sendOrder(0)" v-if="info.status==10||info.status==11">确认配送</view>
				<view class="btn cancelBtn" @tap="sendOrder(1)" v-if="info.status==12">取消配送</view>

			</view>
			<view class="flex justify-between bg-white">
				<view>
					<text>购买商：</text>
					<text class="text-black">{{info.contact_name}}</text>
				</view>
				<view>
					<text>下单时间：</text>
					<text class="text-black">{{info.created_at}}</text>
				</view>
			</view>
		</view>
		<view class="list flex-sub">
			<view class="goods-item" v-for="(item,index) in info.data" :key="index">
				<view class="flex justify-between">
					<text class="name">{{item.class_name}}——{{item.product_name}}</text>
					<view class="price">
						<text>x</text>
						<text>{{item.qty}}</text>
					</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<view class="imgbox">
						<image :src="item.img_url[0]+'?imageView2/0/w/180'" mode="aspectFill"></image>
					</view>
					<view class="flex-sub">
						<view class="goodsname">{{item.name}}</view>
						<view class="goodsnum">
							<text>库存:{{item.stock}}</text>
							<text class="margin-left-sm">销量:{{item.sales}}</text>
						</view>
						<view class="goodsprice"><text class="num">￥{{item.price}}</text>/扎</view>
					</view>
				</view>
				<div class="goodstag grid col-3 margin-top-sm">
					<view class="text-cut">等级：{{item.product_dengji_}}</view>
					<view class="text-cut">单位：{{item.product_guige_}}</view>
					<view class="text-cut">长度：{{item.product_changdu_}}</view>
					<view class="text-cut">成熟度：{{item.product_chengshudu_}}</view>
					<view class="text-cut">优点：{{item.product_youdian_}}</view>
					<view class="text-cut">缺点：{{item.product_quedian_}}</view>

				</div>
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
			this.orderDetails();
		},
		methods: {
			orderDetails() {
				this.$postajax(this.$shopapi.orderDetails + this.id).then(da => {
					if (da.code == 0) {
						this.info = da.data
					}
				})
			},
			sendOrder(type) {
				let $me = this;
				uni.showModal({
					title: '',
					content: '你确定要' + (type != 0 ? '取消' : '') + '配送订单吗？',
					success: function(res) {
						if (res.confirm) {
							let url = $me.$shopapi.sendOrder;
							if (type == 1) {
								url = $me.$shopapi.cancelOrder;
							}
							$me.$postajax(url + $me.info.id).then(da => {
								if (da.code == 0) {
									uni.showToast({
										title: (type != 0 ? '取消' : '') + '配送成功',
										icon: 'none'
									});
									$me.info.status=$me.info.status==11?12:11
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			
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

	.topbar {
		color: #7F7F7F;
		padding: 30upx;
		font-size: 28upx;

		.text-black {
			color: #2E2E2E;
		}

		&>view {
			margin-top: 28upx;
		}

		.num {
			font-size: 32upx;
			color: #FD3C3E;
		}

		.btn {
			color: #fff;
			background: #19A967;
			width: 160upx;
			height: 60upx;
			border-radius: 8upx;
			text-align: center;
			line-height: 60upx;

			&.cancelBtn {
				background: #FD3C3E;
				font-size: 28upx;
			}
		}
	}

	.list {
		border-top: 12upx solid #F8F8F8;
		overflow: auto;
		padding-bottom: 20upx;
		-webkit-overflow-scrolling: touch;

		.goods-item {
			margin: 20upx 30upx 0;
			border-radius: 8upx;
			padding: 25upx;
			box-shadow: 0px 4upx 16upx 0px rgba(213, 213, 213, 1);

			.name {
				color: #A0A0A0;
				font-size: 28upx;
			}

			.price {
				color: #FD3C3E;
				font-size: 32upx;
			}

			.imgbox {
				width: 140upx;
				height: 140upx;
				border-radius: 10upx;
				margin-right: 24upx;
				overflow: hidden;

				image {
					height: 100%;
					width: 100%;
				}
			}

			.goodsname {
				color: #232323;
				font-size: 32upx;
			}

			.goodsnum {
				color: #9F9F9F;
				font-size: 26upx;
				margin: 20upx 0;
			}

			.goodsprice {
				font-size: 24upx;
				color: #C0C0C0;

				.num {
					color: #FD3C3E;
				}
			}

		}
	}

	.goodstag {
		background: #F4F4F4;
		padding: 25upx 10upx;
		border-radius: 8upx;
		color: #515151;
		font-size: 24upx;

		view {
			padding: 5upx 0;
		}
	}
</style>
