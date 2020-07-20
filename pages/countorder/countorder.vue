<template>
	<view  class="pageview flex flex-direction">
			<view class="toptitle flex align-center">
			<image src="/static/shop/prompt@2x.png" mode="widthFix"></image>
			<view class="flex-sub">
				该统计表统计数据实时更新，方便供货商
				备货，最终供货总数以交易结束为准。
			</view>
			<view class="btn justify-center flex align-center" @tap="totalOrder">
				<image src="/static/shop/refresh@2x.png" mode="widthFix"></image>
				<text>刷新</text>
			</view>
		</view>
		<view class="tablebox flex-sub">
			<view class="table">
				<view class="table-hd flex">
					<span>名称</span>
					<span class="flex-sub">属性</span>
					<span>数量</span>
					<!-- <span>单价</span>
					<span>单价</span> -->
				</view>
				<view class="table-bd" v-for="(item, index) in orderlist" :key="index">
					<view class="table-td flex">
						<span>{{item.name}}</span>
						<span class="flex-sub">{{item.product_dengji}}；{{item.product_guige}}；中熟</span>
						<span>{{item.qty}}</span>

					</view>

				</view>
				<view class="table-ft flex">
					<span class="flex-sub text-right">合计:</span>
					<span>{{total}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderlist: []
			};
		},
		props:{
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default(){
					return 0
				}
			}
		},
		computed: {
			total() {
				if (this.orderlist.length > 0) {
					return this.orderlist.reduce((prev, cur) => {
						return parseInt(cur.qty) + prev;
					}, 0);
				} else {
					return 0
				}

			}
		},
		created() {
			this.totalOrder();
		},
		methods: {
			totalOrder() {
				this.$postajax(this.$shopapi.totalOrder).then(da => {
					if (da.code == 0) {
						this.orderlist = da.data.slice(0,da.data.length-1);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.pageview{
		.tablebox{
			overflow: auto;
		}
	}
	.toptitle {
		padding: 24upx 30upx;
		color: #545454;
		font-size: 26upx;
		background: #F7F7F7;
		line-height: 36upx;

		image {
			width: 48upx;
		}

		&>text {
			margin: 0 30upx 0 13upx;
		}

		.btn {
			background: #19A967;
			color: #fff;
			width: 130upx;
			height: 54upx;
			line-height: 54upx;
			text-align: center;
			color: #fff;
			font-size: 24upx;
			border-radius: 8upx;

			image {
				width: 22upx;
				margin-right: 10upx;
			}
		}
	}
</style>
