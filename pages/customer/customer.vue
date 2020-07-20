<template>
	<mescroll-body  @down="downCallback"  @up="upCallback" @init="mescrollInit" :fixed="false">
		<view class="customerlist">
			<div class="customer-item" v-for="(item, index) in orderlist" :key="index">
				<div class="titlebar flex justify-between align-center">
					<div class="flex-sub ">{{item.info||''}}
					</div>
					<div class="state" :class="'state'+item.status">{{item.status_}}</div>
				</div>
				<div class="grid col-2 solid-top solid-bottom">
					<view>
						<span>商品：</span>
						<span>{{item.product_name}}</span>
					</view>
					<view>
						<span>投诉金额：</span>
						<span>{{item.amount}}</span>
					</view>
					<view>
						<span>下单日期：</span>
						<span>{{item.order_time}}</span>
					</view>
					<view>
						<span>申诉日期：</span>
						<span>{{item.created_at}}</span>
					</view>
				</div>
				<div class="footerbar flex justify-between align-center">
					<div class="flex-sub">
						理赔金额：<span class="price"><em>￥</em>{{item.tk_amount}}</span>
					</div>
					<div class="btn" @tap="details(item.id)">查看</div>
				</div>
			</div>
		</view>
	</mescroll-body>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {

				orderlist: []
			};
		},
		mixins: [MescrollMixin],
		methods: {
			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.getAftersalelist()
			},
			details(id) {
				uni.navigateTo({
					url: '/pages/feedback/feedback?id='+id
				})
			},
			getAftersalelist() {
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				let param = {
					page: pageNum,
					limit: pageSize,
				}
				this.$postajax(this.$shopapi.getAftersalelist, param).then(da => {
					if (da.code == 0 && da.data && da.data.length > 0) {
						let curPageData = da.data;
						this.mescroll.endBySize(curPageData.length, da.count);
						if (pageNum == 1) {
							this.orderlist = []
						}
						this.orderlist = this.orderlist.concat(curPageData); //追加新数据
					} else {
						this.orderlist = []; //如果是第一页需手动制空列表
						this.mescroll.endSuccess(0, false);
					}
				})
			}
		},
		filters: {
			statefilter(value) {
				if (value == 1) {
					return '待处理'
				} else if (value == 2) {
					return '已处理'
				}
			}
		}
	};
</script>

<style scoped>
	page {
		background: #fff;
	}

	.customerlist {
		padding: 0 30upx;
	}

	.customer-item {
		margin-top: 20upx;
		box-shadow: 0px 4upx 16upx 0px rgba(213, 213, 213, 1);
		border-radius: 8upx;
		padding: 8upx 25upx 0 25upx;
		font-size: 26upx;
		color: #8D8D8D;
	}

	.customer-item .titlebar {
		padding: 24upx 0;
		font-size: 30upx;

	}

	.customer-item .titlebar .flex-sub {
		color: #FD3C3E;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100upx;
		margin-right: 20upx;
	}

	.customer-item .titlebar .state.state1 {
		color: #FF9518;
	}

	.customer-item .titlebar .state.state2 {
		color: #19A967;
	}

	.customer-item .grid,
	.customer-item .grid>view {
		padding: 10upx 0;
	}

	.customer-item .grid>view>span+span {
		color: #454545;
	}

	.customer-item .footerbar {
		padding: 15upx 0;
	}

	.customer-item .footerbar .price {
		color: #FD3C3E;
		font-size: 36upx;
	}

	.customer-item .footerbar .price em {
		font-style: normal;
		font-size: 24upx;
		display: inline-block;
	}

	.customer-item .footerbar .btn {
		background: #19A967;
		border-radius: 8upx;
		width: 140upx;
		height: 58upx;
		line-height: 58upx;
		text-align: center;
		color: #fff;
	}
</style>
