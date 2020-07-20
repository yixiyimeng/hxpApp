<template>
	<view class="pageview">
		<!-- 菜单 -->
		<view class="top-warp">
			<view class="filterbar bg-white">
				<view class="filter-item flex align-center">
					<view class="title">起始时间：</view>
					<!-- <picker mode="date" class="flex-sub" :value="startDate" @change="TimeChange"> -->
					<view class="inputbox  flex-sub flex align-center" @tap="choosetime(0)">
						<text class="flex-sub">{{startDate?startDate:'请选择起始时间'}}</text>
						<image src="../../static/shop/sessions@2x.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="filter-item margin-top flex align-center">
					<view class="title">截至时间：</view>
					<view class="inputbox  flex-sub flex align-center" @tap="choosetime(1)">
						<text class="flex-sub">{{endDate?endDate:'请选择截至时间'}}</text>
						<image src="../../static/shop/sessions@2x.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="searchBtn" @tap="getlist">查询</view>
			</view>
			<view class="flex align-center justify-between">
				<view>
					<text>订单收入:</text>
					<text class="price">￥{{total.order_amount||0}}</text>
				</view>
				<view>
					<text>佣金:</text>
					<text class="price">￥{{total.yj_amount||0}}</text>
				</view>
			</view>
			<view class="flex align-center justify-between">
				<view>
					<text>售后:</text>
					<text class="price">￥{{total.aftersale_amount||0}}</text>
				</view>
				<view>
					<text>到账:</text>
					<text class="price">￥{{total.sj_amount||0}}</text>
				</view>
			</view>
			<!-- <picker mode="date" :value="date" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker> -->
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="470" @down="downCallback" :up="upOption" :down="downOption" @up="upCallback">
			<view class="list">
				<view class="item flex align-center" v-for="(item,index) in orderlist">
					<view class="flex-sub">
						<view class="title">{{item.info}}</view>
						<view class="margin-top-sm">日期：{{item.created_at}}</view>
						<view class="margin-top-sm">订单号：{{item.order_no}}</view>
					</view>
					<view class="price">{{item.type==1?'+':'-'}}{{item.money}}</view>
				</view>
			</view>
		</mescroll-body>
		<tui-datetime ref="dateTime" :type="1" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import tuiDatetime from "@/components/dateTime/dateTime"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				startDate: '',
				endDate: '',
				orderlist: [],
				total: {},
				downOption: {
					auto: false // 不自动加载
				},
				upOption: {
					auto: false // 不自动加载
				},
			};
		},
		components: {
			tuiDatetime
		},
		onShow() {
			let day1 = new Date();
			this.date = day1.getFullYear() + "-" + ((day1.getMonth() + 1) >= 10 ? (day1.getMonth() + 1) : '0' + (day1.getMonth() +
				1)) + "-" + (day1.getDate() >= 10 ? day1.getDate() : '0' + day1.getDate());
		},
		methods: {
			// DateChange(e) {
			// 	this.date = e.detail.value;
			// 	this.getCalcOrderlist();
			// },
			choosetime(type) {
				this.type = type;
				this.$refs.dateTime.show()
			},
			change: function(e) {
				if (this.type == 0) {
					this.startDate = e.result
				} else {
					this.endDate = e.result
				}
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.getCalcOrderlist()
			},
			getlist(){
				this.mescroll.resetUpScroll()
			},
			getCalcOrderlist() {
				let pageNum = this.mescroll.num||1; // 页码, 默认从1开始
				let pageSize = this.mescroll.size||10;
				let param = {
					page: pageNum,
					limit: pageSize,
					created_at: this.startDate + ':00|' + this.endDate + ':59'
				}
				this.$postajax(this.$shopapi.getCalcOrderlist, param).then(da => {
					this.total = da.total;
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
		}
	}
</script>

<style lang="scss">
	.pageview {
		height: 100vh;
		background: #F5F5F5;
	}

	.top-warp {
		z-index: 999;
		position: fixed;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		// height: 110upx;
		background-color: white;
		box-shadow: 0 0 10upx rgba(0,0,0,.05);
		font-size: 28upx;
		color: #2C2C2C;
		padding: 0 30upx 20upx;

		.price {
			color: #19A967;
			font-size: 36upx;
		}

		.picker {
			width: 210upx;
			height: 70upx;
			border: 1px solid #9D9D9D;
			border-radius: 8upx;
			text-align: center;
			line-height: 70upx;
		}
	}

	.list {
		.item {
			font-size: 26upx;
			color: #919191;
			padding: 28upx 30upx;
			background: #fff;

			.title {
				color: #0E0B0E;
				font-size: 32upx;
			}

			.price {
				color: #0E0B0E;
				font-size: 38upx;
			}

			&:nth-child(even) {
				background: #F9F9F9;
			}
		}
	}

	.filterbar {
		padding: 35upx 30upx 40upx;

		.title {
			color: #2F2F2F;
			font-size: 30upx;
		}

		.inputbox {
			height: 70upx;
			line-height: 70upx;
			border: 1px solid #9D9D9D;
			border-radius: 8upx;
			padding: 0 18upx;

			image {
				width: 28upx;
			}
		}

		.line {
			width: 18upx;
			background: #E3E3E3;
			height: 3upx;
			margin: 0 10upx;
		}

		.searchBtn {
			width: 600upx;
			height: 100upx;
			background: rgba(25, 169, 103, 1);
			box-shadow: 0px 9upx 27upx 0px rgba(25, 169, 103, 0.58);
			border-radius: 12upx;
			color: #fff;
			color: #fff;
			font-size: 30upx;
			text-align: center;
			line-height: 100upx;
			margin: 26upx auto 0;
		}
	}
</style>
