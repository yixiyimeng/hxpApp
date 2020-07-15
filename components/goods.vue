<template>
	<view class="goodsinfo" :class="{card:type!=1}">
		<!-- <div class="tjtag" :class="{tjtag1:goodsinfo.is_top==1}" v-if="goodsinfo.type==1||goodsinfo.is_top==1">{{goodsinfo.is_top==1?'平台推荐':'今日特惠'}}</div> -->
		<div class="flex">
			<div class="imgbox"  @tap="gotodetails">
				<image :lazy-load="true" :src="goodsinfo.img_url[0]+'?imageView2/0/w/140'" mode="widthFix"></image>
			</div>
			<div class="flex-sub">
				<div class="name flex justify-between">
					<view hover-class="none" @tap="gotodetails">{{goodsinfo.name}}</view>
					<view>
						<view class="fav" @tap="follow" :class="{active:isfollow}"></view>
						<!-- <button class="share" open-type="share" @tap="toShare"></button> -->
					</view>
				</div>
				<div class="taglist">
					<!-- <span class="cu-tag" style="" v-for="(item,index) in goodsinfo.product_attribute"
					 :key="index">{{item}}</span> -->
					 <tag v-if="goodsinfo.is_top==1"  text='平台推荐'></tag>
					 <tag v-if="goodsinfo.type==1"  text='特惠'></tag>
					 <tag  v-for="(item,index) in goodsinfo.product_attribute"
					 :key="index" :text='item'></tag>
				</div>
				<div class="num">
					<text>库存：{{goodsinfo.stock}}</text>
					<text class="margin-left-sm">销量：{{(goodsinfo.sales-0)+(goodsinfo.f_sales-0)}}</text>
				</div>
				<div style="position: relative;" class="margin-top-sm">
					<div class="price">￥{{goodsinfo.price}}</div>
					<span class="btn" @tap="addCar">加入采购单</span>
				</div>
			</div>
		</div>
		<div class="shopinfo flex align-center" v-if="type!=3">
			<!-- <span class="tag" v-if="goodsinfo.supplier_grade_ico">
				<image :src="goodsinfo.supplier_grade_ico" mode="widthFix"></image>
			</span> -->
			<span class='favstate' v-if="goodsinfo.supplier_is_follow==1">关注的店</span>
			<span @tap="showshop" class="margin-left-xs">{{goodsinfo.supplier_name}}</span>
			<span class="link" @tap="showshop">进店 ></span>
			<!-- <span class="btn" @tap="addCar">加入采购单</span> -->
		</div>
		<div class="info flex flex-wrap">
			<view class="text-cut">等级：{{goodsinfo.product_dengji_}}</view>
			<view class="text-cut">单位：{{goodsinfo.product_guige_}}</view>
			<view class="text-cut">长度：{{goodsinfo.product_changdu_}}</view>
			<view class="text-cut">成熟度：{{goodsinfo.product_chengshudu_}}</view>
			<view class="text-cut">优点：{{goodsinfo.product_youdian_}}</view>
			<view class="text-cut">缺点：{{goodsinfo.product_quedian_}}</view>
		</div>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import tag from '@/components/tag.vue'
	export default {
		data() {
			return {
				isfollow: false
			};
		},
		components: {
			tag
		},
		computed: {
			...mapState(['memberId'])
		},
		watch: {
			goodsinfo: {
				handler: function(val, oldVal) {
					this.isfollow = val.product_is_follow == 0 ? false : true
				},
				immediate: true
			}
		},
		props: {
			goodsinfo: {
				type: Object,
				default: {}
			},
			type: {
				type: [String, Number],
				default: 0
			}
		},
		methods: {
			addCar() {
				this.$emit('addCar', this.goodsinfo)
			},
			follow() {
				if (this.isfollow) {
					this.delFollow();
				} else {
					this.addFollow();
				}
			},
			addFollow() {
				this.$postajax(this.$api.addFollow + this.goodsinfo.id).then(da => {
					console.log(da);
					if (da.code == 0) {
						this.isfollow = true
					}
				})
			},
			delFollow() {
				this.$postajax(this.$api.delFollow + this.goodsinfo.id).then(da => {
					console.log(da);
					if (da.code == 0) {
						this.isfollow = false
					}
				})
			},
			showshop() {
				/* 进入店铺 */
				uni.navigateTo({
					url: '/pages/favshopinfo/favshopinfo?id=' + this.goodsinfo.supplier_id
				})
			},
			toShare() {
				this.$emit('share', this.goodsinfo.id, this.goodsinfo.name)
			},
			gotodetails(){
				let pid=this.goodsinfo.pid||this.goodsinfo.id;
				console.log(pid)
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + pid
				})
			}
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
		}
	}
</script>

<style lang="scss" scoped>
	.goodsinfo {
		background: #fff;
		color: #000;
		position: relative;
		overflow: hidden;
		border-top: 1px solid #ededed;
		margin-bottom: 20upx;
		padding: 30upx 0;

		&.card {
			border-radius: 20upx;
			border-top: none;
			padding: 35upx 20upx;

		}

		&:not(last-child) {
			padding-bottom: 0;
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
			// padding: 0 20upx;
			margin-top: 15upx;
			// border-bottom: 1px solid #f2f3f7;
		}

		.price {
			color: #e03d3e;
			font-size: 38upx;
			font-weight: bold;
		}

		.shopinfo {
			font-size: 24upx;
			color: #666;
			margin-top: 10upx;
			position: relative;

			.link {
				color: #000;
				margin-left: 12upx;
			}

			.tag {
				color: #fff;
				// background: #e60012;
				// line-height: 25upx;
				// height: 25upx;
				display: inline-block;
				// padding: 0 10upx;
				border-radius: 5upx;
				font-size: 22upx;
				margin-right: 10upx;
				width: 55upx;

				image {
					width: 100%;
				}
			}

			.favstate {
				color: #fb8442;
			}


		}

		.btn {
			position: absolute;
			bottom: 0;
			right: 0;
			color: #fff;
			font-size: 24upx;
			width: 150upx;
			line-height: 60upx;
			border-radius: 15upx;
			text-align: center;
			background-image: linear-gradient(90deg, #fe8c2d, #fe5504);
		}

		.info {
			background: #f2f3f7;
			margin-top: 20upx;
			font-size: 20upx;
			padding: 5upx 20upx;

			&>view {
				width: 30%;
				padding: 10upx 0;

				&:nth-child(3n+2) {
					width: 40%;
				}
			}
		}

		.fav,
		.share {
			height: 40upx;
			width: 40upx;
			background: no-repeat center center;
			background-size: contain;
			display: inline-block;
		}

		.fav {
			background-image: url(../static/icon13.png);

			&.active {
				background-image: url(../static/icon31.png);

			}
		}

		.share {
			background-image: url(../static/icon14.png);
			margin-left: 30upx;
		}
	}
</style>
