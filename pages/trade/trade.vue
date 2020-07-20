
<template>
	<view>
		<view class="filterbar bg-white">
			<view class="filter-item flex align-center">
				<view class="title">起始时间：</view>
				<!-- <picker mode="date" class="flex-sub" :value="startDate" @change="TimeChange"> -->
				<view class="inputbox  flex-sub flex align-center" @tap="choosetime(0)">
					<text class="flex-sub">{{startDate?startDate:'请选择起始时间'}}</text>
					<image src="../../static/shop/sessions@2x.png" mode="widthFix"></image>
				</view>
				<!-- </picker> -->

				<!-- <view class="line"></view>
				<picker mode="date" class="flex-sub" :value="startDate" @change="TimeChange">
					<view class="inputbox  flex align-center">
						<text class="flex-sub">第一场</text>
						<image src="../../static/shop/calendar@2x.png" mode="widthFix"></image>
					</view>
				</picker> -->
			</view>
			<view class="filter-item margin-top flex align-center">
				<view class="title">截至时间：</view>
				<view class="inputbox  flex-sub flex align-center" @tap="choosetime(1)">
					<text class="flex-sub">{{endDate?endDate:'请选择截至时间'}}</text>
					<image src="../../static/shop/sessions@2x.png" mode="widthFix"></image>
				</view>

				<!-- <view class="line"></view>
				<picker mode="date" class="flex-sub" :value="startDate" @change="TimeChange">
					<view class="inputbox  flex align-center">
						<text class="flex-sub">第一场</text>
						<image src="../../static/shop/calendar@2x.png" mode="widthFix"></image>
					</view>
				</picker> -->
			</view>
			<view class="searchBtn" @tap="gettradelist">查询</view>
		</view>
		<div class="space"></div>
		<view class="tablebox">
			<view class="table">
				<view class="table-hd flex">
					<span>品种</span>
					<span class="flex-sub">属性</span>
					<span>数量</span>
					<span>均价</span>
					<span>总价</span>
				</view>
				<view class="table-bd" v-if="list.length>0">
					<view class="table-td flex" v-for="(item,index) in list" :key="index">
						<span>{{item.name}}</span>
						<span class="flex-sub">{{item.product_dengji}}；{{item.product_guige}}；中熟</span>
						<span>{{item.total_num}}</span>
						<span>{{item.avg_amount}}</span>
						<span>{{item.total_amount}}</span>
					</view>
					
				</view>
				<view class="table-ft flex">
					<span class="flex-sub text-right">合计:</span>
					<span>{{total.total_num||0}}</span>
					<span>{{total.avg_amount||0}}</span>
					<span>{{total.total_amount||0}}</span>
				</view>
			</view>
			<view class="title margin-top-lg">备注：</view>
			<p>1、查询结果是该时间段的销售总量，不包含售后数量和未配送数量</p>
			<p>2、查询结果，显示的总价是毛收入（不含售后退款和佣金）</p>
			<p>3、查询结果的均价，是指该时间段销售价格的平均值</p>
			<p>4、如有疑问，请联系平台管理人员核对。</p>
		</view>
		<tui-datetime ref="dateTime" :type="1" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	import tuiDatetime from "@/components/dateTime/dateTime"
	export default {
		data() {
			return {
				startDate: '',
				endDate: '',
				type: 0,
				list: [],
				total:{}
			};
		},
		components: {
			tuiDatetime
		},
		methods: {
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
			gettradelist() {
				if (this.startDate && this.endDate) {
					this.$postajax(this.$shopapi.gettradelist, {
						created_at: this.startDate + ':00|' + this.endDate + ':59'
					}).then(da => {
						if (da.code == 0 && da.data.length > 1) {
							this.list = da.data.slice(0, da.data.length - 1);
							console.log(this.list)
							this.total=da.data[da.data.length - 1]
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.filterbar {
		padding: 35upx 30upx 50upx;

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
			margin: 46upx auto 0;
		}
	}

	.space {
		height: 14upx;
		background: #F5F5F5;
	}

	.tablebox {
		.title {
			color: #2E2E2E;
			font-size: 28upx;
			font-weight: bold;
		}

		p {
			margin-top: 30upx;
		}
	}
</style>
