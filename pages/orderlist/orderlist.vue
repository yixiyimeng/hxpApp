<template>
	<view>
		<view class="top-warp">
			<view class="navbar flex justify-between align-center">
				<span @tap="changeTab(index)" v-for="(item, index) in tablist" :key="index" :class="{ active: navIndex == index }">{{ item.name }}</span>
			</view>
		</view>
		<mescroll-body :top="topH" :up="upOption" :isSafearea="true" @down="downCallback" @up="upCallback" @init="mescrollInit" :down="downOption">
			<order-item v-for="(item, index) in orderlist" :key="index" :info="item" @upload="upload"></order-item>
		</mescroll-body>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
import orderItem from '@/components/shop/order-item.vue';
export default {
	data() {
		return {
			tablist: [
				{
					id: '10,11',
					name: '待配送'
				},
				{
					id: 12,
					name: '已配送'
				},
				{
					id: 13,
					name: '结算中'
				},
				{
					id: 14,
					name: '已完成'
				}
			],
			orderStatus: '10,11', //订单状态 10待配送 11配送中 12配送完成 13待收货|结算中 14已完成；默认不填写为待配送状态;多状态支持逗号分隔
			orderlist: [],
			// topH: 220,
			CustomBar: this.CustomBar || 60,
			StatusBar: this.StatusBar || 20,
			downOption: {
				use: true,
				auto: true //是否在初始化后,自动执行下拉回调callback; 默认true
			},
			upOption: {
				use: true,
				auto: true
			},
			isInit: false
		};
	},
	mixins: [MescrollMixin, MescrollMoreItemMixin],
	components: {
		orderItem
	},
	computed: {
		topH() {
			let winWidth = uni.getSystemInfoSync().windowWidth;
			let h = 120;
			return h;
		},
		...mapState(['navIndex'])
	},
	onShow() {
		this.orderStatus = this.tablist[this.navIndex].id;
		if (this.orderStatus&&this.isInit&&this.mescroll) {
			this.getOrderlist();
		}
	},
	methods: {
		...mapMutations(['SET_NAVINDEX']),
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
			this.mescrollInitByRef(); // 兼容字节跳动小程序
		},
		/*上拉加载的回调*/
		upCallback(mescroll) {
			this.getOrderlist();
		},
		getOrderlist() {
			if (!this.isInit) {
				this.isInit = true;
			}
			let pageNum = this.mescroll.num; // 页码, 默认从1开始
			let pageSize = this.mescroll.size;
			let param = {
				page: pageNum,
				limit: pageSize,
				status: this.orderStatus
			};
			this.$postajax(this.$shopapi.getOrderlist, param).then(da => {
				if (da.code == 0 && da.data && da.data.length > 0) {
					let curPageData = da.data;
					this.mescroll.endBySize(curPageData.length, da.count);
					if (pageNum == 1) {
						this.orderlist = [];
					}
					this.orderlist = this.orderlist.concat(curPageData); //追加新数据
				} else {
					this.orderlist = []; //如果是第一页需手动制空列表
					this.mescroll.endSuccess(0, false);
				}
			});
		},
		changeTab(index) {
			this.SET_NAVINDEX(index);
			// this.navIndex = index;
			this.orderStatus = this.tablist[this.navIndex].id;
			this.mescroll.resetUpScroll();
		},
		upload() {
			this.mescroll.resetUpScroll();
		}
	}
};
</script>

<style lang="scss">
.pageview {
	height: 100vh;
	width: 100%;
	overflow: hidden;
}

.top-warp {
	z-index: 9990;
	position: fixed;
	top: --window-top;
	/* css变量 */
	left: 0;
	width: 100%;
	background-color: white;
}

.navbar {
	height: 100upx;
	color: #626262;
	padding: 0 50upx;
	border-bottom: 1px solid #eaeaea;
	font-size: 30upx;

	span {
		height: 100%;
		line-height: 100rpx;
	}

	.active {
		color: #19a967;
		position: relative;

		&:after {
			width: 35upx;
			height: 5upx;
			background: rgba(25, 169, 103, 1);
			border-radius: 3upx;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}
}

.list {
	// overflow: auto;
	padding-top: 20upx;
	height: 200upx;
	// -webkit-overflow-scrolling: touch;
}
</style>
