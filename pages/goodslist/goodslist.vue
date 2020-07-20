<template>
	<view>
		<view class="top-warp">
			<div class="topbar flex align-center">
				<div class="flex-sub">
					<scroll-view scroll-x class="bg-white nav scrollview ">
						<view class="flex text-center">
							<span v-for="(item,index) in menulist" :key="index" :class="{'active':class_id==item.id}" @tap="selectCate(item.id)">{{item.name}}</span>
						</view>
					</scroll-view>
				</div>
				<navigator class="add" url="/pages/selectCate/selectCate">
					<text class="cuIcon-add"></text>
					<text>添加产品</text>
				</navigator>
			</div>
		</view>
		<mescroll-body top="100" :isSafearea='true' :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
		 @init="mescrollInit" :fixed="false">
			<cate v-for="(item, index) in productlist" :key="index" :info="item" @upload="upload" @applyPrice="applyPrice"
			 @editprice="editprice"></cate>
		</mescroll-body>
		<applymodal ref='applymodal' @upload="upload"></applymodal>
		<editPrice ref="editPrice" @upload="upload"></editPrice>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import cate from '@/components/shop/cate.vue';
	import editPrice from '@/components/shop/editPrice.vue';
	import applymodal from '@/components/shop/applymodal'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				bgColor: 'bg-white',
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
				productlist: [],
				CustomBar: this.CustomBar || 60,
				StatusBar: this.StatusBar || 20
			};
		},
		components: {
			cate,
			applymodal,
			editPrice
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
				this.$postajax(this.$shopapi.getProductlist, param).then(da => {
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
			},
			upload() {
				this.mescroll.resetUpScroll();
			},
			applyPrice(id) {
				console.log('id', id)
				this.$refs.applymodal.show(id)
			},
			editprice(index, info) {
				this.$refs.editPrice.show(index, info)
			}

		}
	}
</script>

<style lang="scss">
	.top-warp {
		z-index: 999;
		position: fixed;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		background-color: white;
	}

	// .pageview {
	// 	height: 100vh;
	// 	overflow: hidden;
	// }

	// .pageview .main {
	// 	overflow: auto;
	// }

	.cate-item {
		margin: 20upx 30upx;
	}

	.topbar {
		height: 100upx;
		padding: 0 30upx;
		border-bottom: 1px solid #EAEAEA;

		&>.flex-sub {
			width: 200upx;
		}

		.add {
			width: 190upx;
			height: 64upx;
			background: rgba(25, 169, 103, 1);
			box-shadow: 0 2upx 9upx 0 rgba(25, 169, 103, 0.58);
			border-radius: 8upx;
			font-size: 26upx;
			color: #fff;
			line-height: 64upx;
			text-align: center;
			margin-left: 25upx;

			.cuIcon-add {
				font-size: 30upx;
			}
		}

		.scrollview {
			line-height: 80upx;
			color: #A5A5A5;
			font-size: 30upx;
			width: 100%;
			-webkit-mask: -webkit-gradient(linear, left top, right bottom, from(rgba(0, 0, 0, 1)), color-stop(0.75, #fff), to(rgba(0, 0, 0, 0)));

			span {
				position: relative;
				display: inline-block;

				&+span {
					margin-left: 35upx;
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
					bottom: 0;
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
