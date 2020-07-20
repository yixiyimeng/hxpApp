<template>
	<view class="pageview ">
		<mescroll-body  @down="downCallback"  @up="upCallback" @init="mescrollInit" :fixed="false">
			<evaluate-item v-for="(item, index) in orderlist" :key="index" :info="item"></evaluate-item>
		</mescroll-body>
	</view>
</template>

<script>
	import evaluateItem from '@/components/shop/evaluateItem.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		data() {
			return {
				orderlist: []

			};
		},
		mixins: [MescrollMixin],
		components: {
			evaluateItem
		},
		methods: {

			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.getevaluateList();
			},
			getevaluateList() {
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				let param = {
					page: pageNum,
					limit: pageSize,
				}
				this.$postajax(this.$shopapi.getevaluateList, param).then(da => {
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
		height: 100%;
		overflow: auto;
	}
</style>
