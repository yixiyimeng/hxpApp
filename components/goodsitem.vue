<template>
	<view class="card">
		<!-- <div class="tjtag">{{goodsinfo.tjtag==2?'平台推荐':'今日特惠'}}</div> -->
		<div class="flex bg-white">
			<div>
				<div class="imgbox" @tap="previewImage(goodsinfo.img_url,goodsinfo.img_url)">
					<image :lazy-load="true" :src="goodsinfo.img_url+'?imageView2/0/w/140'" mode="widthFix"></image>
				</div>
				<view class="margin-top-xs">共<text class="shopnum">{{goodsinfo.supplier_count}}</text>家供应商报价</view>
			</div>
			<div class="flex-sub">
				<div class="flex justify-between">
					<text class="name">{{goodsinfo.name}}</text>
					<text class="oldprice">平均价￥{{goodsinfo.avg_price}}</text>
				</div>
				<div class="flex justify-between align-center padding-top-sm padding-bottom-sm">
					<div>颜色：{{goodsinfo.product_color_}}</div>
					<div class="price">￥{{goodsinfo.min_price}}
						<text class="text-sm">起</text></div>
				</div>
				<div class="flex justify-between align-end solid-top padding-top-sm">
					<div class="num">
						<div>库存：{{goodsinfo.stock}}</div>
						<div class="margin-top-sm">销量：{{(goodsinfo.sales-0)+(goodsinfo.f_sales-0)}}</div>
					</div>
					<view class="buybtn" :class="{'open':isOpen}" @tap="tapOpen">
						<text>{{isOpen?'收起':'选 购'}}</text>
						<image src="/static/icon26.png" mode="widthFix" v-if="!isOpen"></image>
						<image src="/static/icon27.png" mode="widthFix" v-else></image>
					</view>
				</div>
			</div>
		</div>
		<template v-if="isOpen">
			<div class="maillist margin-top" :class="{active:isOpenitem}">
				<goods type="1" :goodsinfo="item" v-for="(item, index) in supplierlist" :key="index" @addCar="showDetails"></goods>
			</div>
		</template>
	</view>
</template>

<script>
	import goods from "./goods.vue"
	export default {
		data() {
			return {
				isOpen: false,
				isOpenitem: false,
				page: 1,
				isMore: true,
				supplierlist: []
			};
		},
		components: {
			goods
		},
		props: {
			goodsinfo: {
				type: Object,
				default: {}
			},
		},
		filters: {
			filtertag(value) {
				if (value == 1) {
					return '自营'
				} else if (value == 2) {
					return '品牌'
				} else {
					return '基地'
				}
			}
		},
		methods: {
			tapOpen() {
				if (this.isOpen) {
					this.isOpenitem = false;
					this.$nextTick(() => {
						this.isOpen = false;
					})
				} else {
					this.isOpen = true;
					this.$nextTick(() => {
						this.isOpenitem = true
					});
					this.page = 1
					this.getSupplier();

				}
			},
			getSupplier() {
				let param = {
					page: this.page,
					limit: 10
				}
				/* 获取供应商列表 */
				this.$postajax(this.$api.getProductSupplierList + this.goodsinfo.id, param).then(da => {
					if (da.code == 0) {
						let curPageData = da.data;
						if (this.page == 1) {
							this.supplierlist = []
						}
						this.supplierlist = this.supplierlist.concat(curPageData)
						console.log(this.supplierlist)
						if (da.count > this.supplierlist.length) {
							this.isMore = true;
							this.page++;
						} else {
							this.isMore = false;
						}
						console.log(this.supplierlist)
					}
				})
			},
			showDetails(info) {
				this.$emit('buygoods', info)
			},
			previewImage: function(imgalist, current) {
				console.log('122')
				uni.previewImage({
					current: current, // 当前显示图片的http链接
					urls: [imgalist] // 需要预览的图片http链接列表
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 20upx;
		position: relative;
		overflow: hidden;
		padding: 35upx 20upx;
		background: #fff;
		font-size: 26upx;
		margin: 0 20upx 20upx;

		.flex-sub {
			color: #b5b5b5;
			font-size: 26upx;
		}

		.shopnum {
			color: #e53f3f;
			font-size: 32upx;
		}

		.tjtag {
			position: absolute;
			left: 30upx;
			top: 0;
			height: 58upx;
			width: 58upx;
			border-radius: 0 20upx 0 20upx;
			color: #fff;
			font-size: 16upx;
			padding: 10upx;
			background: #e60012;
			z-index: 99;
			text-align: center;

			&.tjtag1 {
				background: #917bdd;
			}
		}

		.name {
			font-size: 30upx;
			font-weight: bold;
		}

		.oldprice {
			color: #b5b8c1;
			font-size: 24upx;
			text-decoration: line-through;

		}

		.imgbox {
			width: 191upx;
			height: 191upx;
			overflow: hidden;
			margin-right: 35upx;

			image {
				height: 100%;
				width: 100%;
				display: block;
			}
		}

		.num {
			color: #b3b6be;
			font-size: 24upx;
		}

		.price {
			color: #fc733b;
			font-size: 38upx;
			font-weight: bold;
		}

		.buybtn {
			color: #fc733b;
			font-size: 30upx;
			height: 60upx;
			width: 150upx;
			border-radius: 16upx;
			border: 2upx solid #fc733b;
			text-align: center;
			line-height: 60upx;

			text,
			image {
				vertical-align: middle;
			}

			image {
				margin-left: 14upx;
				width: 18upx;
			}

			&.open {
				color: #fff;
				background: #ff0000;
				border: 2upx solid #ff0000;
			}
		}

	}

	.goodsinfo+.goodsinfo {
		margin-top: 20upx;
	}
</style>
