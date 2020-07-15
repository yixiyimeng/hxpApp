<template>
	<view class="card order-item">
		<div class="order-item-hd flex align-center justify-between">
			<text>下单时间：{{orderinfo.created_at}}</text>
			<text class="state">
				<!-- <text class="margin-right-xs">9分钟后过期</text> -->
				{{orderinfo.status_}}</text>
		</div>
		<div class="goodslist flex  align-center " @click="orderShow(orderinfo.id)">
			<div class="imglist flex-sub flex">
				<image v-for="(item,index) in orderinfo.img_url" :key="index" :src="item+'?imageView2/0/w/140'" mode="widthFix"
				 v-if="index<3"></image>
			</div>
			<div class="num">共{{orderinfo.qty}}件 ></div>
		</div>
		<div class="order-item-ft flex align-center justify-between">
			<div class="price">总金额：<text class="text-red">￥{{orderinfo.order_amount}}</text></div>
			<div class="btnlist flex">
				<!-- <view class="btn mr10" v-if="orderinfo.status==1" @click="orderClose(orderinfo.id)">取消订单</view> -->
				<view class="btn" :class="{active:orderinfo.status==10}" @click="orderShow(orderinfo.id)">查看订单</view>
				<view class="btn active" v-if="orderinfo.status==1" @click="buttonPay(orderinfo.id)">确认支付</view>
				<view class="btn active" v-if="orderinfo.status==3||orderinfo.status==4" @tap="showContact">联系客服</view>
				<view class="btn active" v-if="orderinfo.status==2" @click="orderDelete(orderinfo.id)">删除订单</view>
				<view class="btn active" v-if="orderinfo.status==5" @click="orderConfirm(orderinfo.id)">确认收货</view>

			</div>
		</div>
		<contact ref="contact"></contact>
	</view>
</template>

<script>
	// #ifdef H5
	var wx = require('jweixin-module');
	// #endif
	import contact from "@/components/contact"
	//status 1待付款 2已过期 3待发货4备货中5待收货 10待评价
	export default {
		data() {
			return {

			};
		},
		components: {
			contact
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
		methods: {
			//联系客服
			showContact() {
				this.$refs.contact.show();

			},
			//取消订单
			orderClose(id) {
				let $me = this;
				$me.$postajax($me.$api.orderClose + id).then(da => {
					if (da.code == 0) {
						uni.showToast({
							icon: 'none',
							title: '订单已取消'

						});
						$me.$emit('upload')
					}
				})
			},
			//确认支付
			buttonPay(id) {
				let $me = this;
				uni.showModal({
					title: '',
					content: '确认支付？',
					success: function(res) {
						if (res.confirm) {
							$me.$postajax($me.$api.buttonPay + id).then(da => {
								console.log("确认支付" + JSON.stringify(da))
								if (da.code == 0) {
									let orderInfo = da.data;
									//微信支付	
									// #ifndef H5
									uni.requestPayment({
										provider: 'wxpay',
										timeStamp: orderInfo.timeStamp,
										nonceStr: orderInfo.nonceStr,
										package: orderInfo.package,
										signType: orderInfo.signType,
										paySign: orderInfo.paySign,
										service: 3,

										success: function(res) {
											uni.showToast({
												icon: 'none',
												title: '订单支付成功'

											});
											$me.$emit('upload')
										},

										fail: function(err) {
											uni.showToast({
												icon: 'none',
												title: '订单支付失败'

											});
										}
									});
									// #endif
									// #ifdef H5
									wx.chooseWXPay({
										debug: false,
										timestamp: orderInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
										nonceStr: orderInfo.nonceStr, // 支付签名随机串，不长于 32 位
										package: orderInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
										signType: orderInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
										paySign: orderInfo.paySign,
										success: function(res) {
											uni.showToast({
												icon: 'none',
												title: '订单支付成功'

											});
											$me.$emit('upload')
										},
										fail: function(res) {
											console.info('requestPayment fail:', res);
											var errMsg = res.errMsg == 'chooseWXPay:cancel' ? '已取消支付' : res.errMsg.replace(
												'chooseWXPay:', '');
											uni.showToast({
												icon: 'none',
												title: errMsg

											});

										}
									});
									// #endif

								}
							})

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});



			},
			//查看订单
			orderShow(id) {
				setTimeout(function() {
					uni.navigateTo({
						url: "/extend/orderdetail/orderdetail?id=" + id
					})
				}, 200);
			},
			//确认收货
			orderConfirm(id) {
				let $me = this;
				uni.showModal({
					title: '',
					content: '确认收货？',
					success: function(res) {
						if (res.confirm) {
							$me.$postajax($me.$api.orderConfirm + id).then(da => {
								if (da.code == 0) {
									$me.$emit('upload')
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//删除订单
			orderDelete(id) {
				let $me = this;
				uni.showModal({
					title: '',
					content: '确认删除订单？',
					success: function(res) {
						if (res.confirm) {
							$me.$postajax($me.$api.orderDelete + id).then(da => {
								if (da.code == 0) {
									this.$emit('upload')
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

<style lang="scss" scoped>
	.mr10 {
		margin-right: 10upx;
	}

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
					width: 33%;

					&+image {
						margin-left: .05%;
					}
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

				&+.btn {
					margin-left: 20upx;
				}
			}
		}
	}
</style>
