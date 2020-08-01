<template>
	<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit" :fixed="false">
		<view class="cashoutlist">
			<div class="cashout-item solid-bottom" v-for="(item, index) in list" :key="index">
				<div class="flex justify-between align-center">
					<div class="flex-sub">
						<div class="time">时间：{{ item.created_at }}</div>
						<div class="info">扣款说明：{{ item.remark }}</div>
					</div>
					<div class="state">
						<div class="num">-{{ item.money }}</div>
						<div>{{ item.status_ }}</div>
					</div>
				</div>
			</div>
		</view>
	</mescroll-uni>
</template>

<script>
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
export default {
	data() {
		return {
			downOption: {
				use: true,
				auto: true //是否在初始化后,自动执行下拉回调callback; 默认true
			},
			upOption: {
				noMoreSize: 1,
				page: {
					num: 0,
					size: 10
				}
			},
			mescroll: null,
			list: []
		};
	},
	components: {
		MescrollUni
	},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		downCallback(mescroll) {
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		upCallback(mescroll) {
			this.getcashoutlist();
		},
		getcashoutlist() {
			let pageNum = this.mescroll.num; // 页码, 默认从1开始
			let pageSize = this.mescroll.size;
			let param = {
				page: pageNum,
				limit: pageSize
			};
			let $me = this;
			this.$postajax(this.$shopapi.withhold, param).then(da => {
				if (da.code == 0 && da.data && da.data.length > 0) {
					console.log(da.data);
					let curPageData = da.data;
					$me.mescroll.endBySize(curPageData.length, da.count);
					if ($me.mescroll.num == 1) $me.list = []; //如果是第一页需手动制空列表
					$me.list = $me.list.concat(curPageData); //追加新数据
				} else {
					$me.list = [];
					$me.mescroll.endSuccess(0, false);
				}
			});
		}
	},
	filters: {
		statefilter(value) {
			if (value == 1) {
				return '提现中';
			} else if (value == 2) {
				return '提现成功';
			} else {
				return '提现失败';
			}
		}
	}
};
</script>

<style scoped>
page {
	background: #fff;
}

.cashoutlist .cashout-item {
	padding: 40upx 30upx;
	color: #919191;
	font-size: 28upx;
	color: #000;
}

.cashoutlist .cashout-item .info {
	color: #f97626;
	font-size: 24upx;
	line-height: 30upx;
	margin-top: 10upx;
}

.cashoutlist .cashout-item .state {
	color: #00af5e;
	margin-left:40upx;
}
.cashoutlist .cashout-item .state .num {
	font-size: 32upx;
	font-weight: bold;
}
</style>
