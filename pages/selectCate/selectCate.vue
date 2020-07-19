<template>
	<view>
		<view class="top-warp">
			<scroll-view scroll-x class="bg-white nav topbar">
				<view class=" scrollview flex text-center">
					<span v-for="(item,index) in menulist" :key="index" :class="{'active':class_id==item.id}" @tap="selectCate(item.id)">{{item.name}}</span>
				</view>
			</scroll-view>
		</view>
		<mescroll-body @down="downCallback" @up="upCallback" @init="mescrollInit" :top="100">
			<view class="main">
				<selectcate v-for="(item, index) in productlist" :key="index" :goodsinfo="item"></selectcate>
			</view>
		</mescroll-body>

	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import selectcate from '@/components/shop/selectcate.vue';
	export default {
		data() {
			return {
				menulist: [],
				downOption: {
					use: true,
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 1,
					page: {
						num: 0,
						size: 10
					},
				},
				mescroll: null, //mescroll实例对象
				class_id: '',
				productlist: []
			};
		},
		mixins: [MescrollMixin],
		components: {
			selectcate
		},
		created() {
			this.getCate();
		},
		methods: {
			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.getProductlist();
			},
			getCate() {
				this.$postajax(this.$shopapi.getCate).then(da => {
					if (da.code == 0) {
						this.menulist = [{
							name: '全部',
							id: ''
						}, ...da.data]
					}
				})
			},
			getProductlist() {
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				let param = {
					page: pageNum,
					limit: pageSize,
					class_id: this.class_id
				}
				let $me = this;
				this.$getajax(this.$shopapi.getCate, param).then(da => {
					if (da.code == 0 && da.data && da.data.length > 0) {
						let curPageData = da.data;
						$me.mescroll.endBySize(curPageData.length, da.count);
						if ($me.mescroll.num == 1)
							$me.productlist = []; //如果是第一页需手动制空列表
						$me.productlist = $me.productlist.concat(curPageData); //追加新数据
					} else {
						$me.productlist = [];
						$me.mescroll.endSuccess(0, false);
					}
				})
			},
			selectCate(id) {
				this.class_id = id;
				this.mescroll.resetUpScroll();
			}

		}
	}
</script>

<style lang="scss">
	// .pageview {
	// 	height: 100%;
	// }
	.top-warp {
		z-index: 999;
		position: fixed;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		background-color: white;
	}

	// .pageview .main {
	// 	overflow: auto;
	// }

	.main .cate-item {
		margin: 20upx 30upx;
	}

	.topbar {
		height: 100upx;
		padding: 0 30upx;
		border-bottom: 1px solid #EAEAEA;
		-webkit-mask: -webkit-gradient(linear, left top, right bottom, from(rgba(0, 0, 0, 1)), color-stop(0.75, #fff), to(rgba(0, 0, 0, 0)));

		.scrollview {
			line-height: 80upx;
			color: #A5A5A5;
			font-size: 30upx;

			span {
				position: relative;
				display: inline-block;

				&+span {
					margin-left: 65upx;
				}

				&.active {
					color: #19A967;
				}

				&.active:after {
					content: '';
					background: #19A967;
					display: block;
					height: 5upx;
					width: 35upx;
					position: absolute;
					bottom: 1upx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}

	.tabbar {
		border-top: 1px solid #F1F1F1;
	}
</style>
