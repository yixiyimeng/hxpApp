<template>
	<view class="card order-item">
		<div class="order-item-hd flex align-center justify-between">
			<text>下单时间：2020-02-05</text>
			<text class="state">待评价</text>
		</div>
		<div class="goodsinfo flex  align-center ">
			<div class="imgbox">
				<image src="../static/demo/img.jpg" mode="widthFix"></image>
			</div>
			<div class="flex-sub">
				<div class="flex justify-between">
					<div class="name">多头玫瑰</div>
					<text class="num">×5</text>
				</div>
				<div class="tag">等级：A 单位：20支/扎 长度：60CM</div>
				<div class="flex align-center justify-between">
					<div class="price">￥15.00</div>
					<div class="tkprice">总金额:<text>￥15.00</text></div>
				</div>
			</div>
		</div>
		<div class="order-item-ft flex align-center justify-between">
			<div class="shopname flex">
				<view>自营</view>
				<view>小王的店</view>
			</div>
			<div class="btnlist flex">
				<view class="btn active" @tap="gotopage(0)">去评价</view>
				<view class="btn active"  @tap="gotopage(1)">查看评价</view>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			orderinfo: {
				type: Object,
				default: {}
			},
		},
		created() {
			console.log()
		},
		methods:{
			gotopage(type){
				let url="/extend/productEvaluation/productEvaluation"
				if(type==1){
					url="/extend/viewEvaluation/viewEvaluation"
				}
				uni.navigateTo({
					url:url
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
			padding: 20upx 0;

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

			.shopname {
				color: #666;
				font-size: 22upx;
			}
		}
	}
</style>
