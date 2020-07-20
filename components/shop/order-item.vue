<template>
	<view class="card bg-white">
		<view class="card-hd flex align-center ">
			<view class="title">货位号：{{info.hj_num}}</view>
			<view class="time flex-sub margin-left">{{info.updated_at}}</view>
			<view class="arrow" @tap="showdetails">
				<text>详细</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="tablebox">
			<view class="table">
				<view class="table-hd flex">
					<span>名称</span>
					<span class="flex-sub">属性</span>
					<span>数量</span>
					<span>单价</span>
					<span>总价</span>
				</view>
				<view class="table-bd" style="border-bottom: none;">
					<view class="table-td flex" v-for="(item,index) in info.data">
						<span>{{item.name}}</span>
						<span class="flex-sub">{{item.dengji}}；{{item.guige}}；{{item.chengshudu}}</span>
						<span>{{item.qty}}</span>
						<span>{{item.price}}</span>
						<span>{{item.amount}}</span>
					</view>
					
				</view>
			</view>
		</view>
		<view class="card-ft ">
			<div class="flex padding-top-sm padding-bottom-sm">
				<text>客户备注：</text>
				<text class="flex-sub">
					{{info.remark}}
				</text>
			</div>
			<view class="flex align-center justify-between">
				<view>
					总计：{{info.count}}种，{{info.qty}}扎，
					<text class="price">{{info.goods_amount}}元</text>
				</view>
				<view class="btn" @tap="sendOrder(0)" v-if="info.status==10||info.status==11">确认配送</view>
				<view class="btn cancelBtn" @tap="sendOrder(1)" v-if="info.status==12">取消配送</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		methods: {
			showdetails() {
				uni.navigateTo({
					url: '/pages/orderdetails/orderdetails?id=' + this.info.id
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
									setTimeout(() => {
										$me.$emit('upload');
									}, 200);

								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		}
	};
</script>

<style lang="scss">
	.card {
		box-shadow: 0px 4upx 16upx 0px rgba(213, 213, 213, 1);
		border-radius: 8upx;
		margin: 0 30upx 20upx;
		color: #2e2e2e;
		font-size: 28upx;
		padding: 0 15upx;

		.tablebox {
			padding: 30upx 0 0;
		}

		.card-hd {
			height: 84upx;
			padding: 0 10upx;
			color: #ababab;
			font-size: 26upx;
			border-bottom: 1px solid #ededed;

			.title {
				color: #FD3C3E;
				font-size: 30upx
			}

			.arrow {
				color: #19A967;
				font-size: 28upx;
			}
		}

		.card-ft {
			min-height: 100upx;
			padding-bottom: 20upx;

			.price {
				color: #FD3C3E
			}

			.btn {
				color: #fff;
				background: #19a967;
				border-radius: 8upx;
				width: 160upx;
				line-height: 56upx;
				text-align: center;

				&.cancelBtn {
					background: #FD3C3E;
					font-size: 28upx;
				}
			}
		}
	}
</style>
