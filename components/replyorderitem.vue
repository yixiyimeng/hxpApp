<template>
	<view class="card order-item">
		<div class="order-item-hd flex align-center justify-between">
			<text>下单时间：{{orderinfo.created_at}}</text>
			<text class="state">{{orderinfo.status_}}</text>
		</div>
		<div class="goodsinfo flex  align-center ">
			<div class="imgbox">
				<image :src="orderinfo.product_img+'?imageView2/0/w/140'" mode="widthFix"></image>
				<!-- <image src="../static/demo/img.jpg" mode="widthFix"></image> -->
			</div>
			<div class="flex-sub">
				<div class="flex justify-between">
					<div class="name">{{orderinfo.product_name}}</div>
					<text class="num">×{{orderinfo.qty}}</text>
				</div>
				<div class="tag">等级：{{orderinfo.product_dengji}} 单位：{{orderinfo.product_guige}} 长度：{{orderinfo.product_changdu}}</div>
				<div class="flex align-center justify-between">
					<div class="price">￥{{orderinfo.price}}</div>
					<div class="tkprice">总金额:<text>￥{{orderinfo.amount}}</text></div>
				</div>
			</div>
		</div>
		<div class="order-item-ft flex align-center justify-between">
			<div class="shopname flex">
				<!-- <view>{{orderinfo.supplier_grade_id_}}</view> -->
				<view>{{orderinfo.supplier_name}}</view>
			</div>
			<div class="btnlist flex">
				<view class="btn active" @tap="details">{{orderinfo.evaluate==1?'查看评价':'去评价'}}</view>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 0
			};
		},
		props: {
			orderinfo: {
				type: Object,
				default: {}
			},
		},
		created() {
			// console.log("评价订单信息" + JSON.stringify(this.orderinfo))
		},
		methods: {
			details() {
				let url = '/extend/productEvaluation/productEvaluation?id='+this.orderinfo.pid+'&order_product_id='+this.orderinfo.order_product_id;
				if (this.orderinfo.evaluate==1) {
					url='/extend/viewEvaluation/viewEvaluation?order_product_id='+this.orderinfo.order_product_id
				}else{
					// uni.setStorageSync('orderInfo',JSON.stringify(this.orderinfo))
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		background: #fff;
		color: #000;
		font-size: 24upx;
		margin-bottom: 25upx;

		&.card {
			border-radius: 30upx;
			border-top: none;
			padding: 0;
		}

		.state {
			color: #fc743c;
		}

		.text-red {
			color: #e60012;
			font-size: 28upx;
		}

		.order-item-hd {
			border-bottom: 1px solid #e5e5e5;
		}

		.order-item-ft {
			border-top: 1px solid #e5e5e5;
		}

		.order-item-hd,
		.order-item-ft {
			padding: 30upx 35upx;
		}

		.goodslist {


			padding: 10upx;

			.imglist {
				image {
					width: 33.33%;
				}
			}

			.num {
				color: #5c5c5c;
				text-align: center;
				padding: 0 25upx;
			}
		}

		.btnlist {
			.btn {
				display: block;
				color: #fc733b;
				border: 1px solid #fc733b;
				border-radius: 15upx;
				line-height: 60upx;
				text-align: center;
				width: 150upx;

				&.active {
					color: #fff;
					background-image: linear-gradient(90deg, #fe8c2d, #fe5504);
					border: none;
					margin-left: 30upx;
				}
			}
		}

		.goodsinfo {
			padding: 20upx;

			.imgbox {
				width: 140upx;
				margin-right: 20upx;
			}

			.name {
				color: #000;
				font-size: 30upx;
			}

			.num {
				color: #e03d3e;
				font-size: 28upx;
				margin-right: 60upx;
				font-weight: bold;
			}

			.tag {
				color: #b3b6be;
				font-size: 22upx;
				margin: 20upx 0;
			}

			.price {
				color: #e03d3e;
				font-weight: bold;
				font-size: 38upx;
			}

			.tkprice {
				text {
					color: #e03d3e;
				}

				margin-right: 40upx;
			}


		}

		.shopname {
			color: #666;
			font-size: 22upx;
			vertical-align: middle;
			font-weight: bold;
			text-align: center;

			.tag {
				color: #fff;
				background: #e60012;
				line-height: 25upx;
				height: 25upx;
				display: inline-block;
				padding: 0 10upx;
				border-radius: 5upx;
				font-size: 16upx;
				margin-right: 10upx;
			}
		}
	}
</style>
