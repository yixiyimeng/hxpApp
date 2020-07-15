<template>
	<view class="shopinfo card">
		<view class="flex align-center">
			<view class="imgbox">
				<image :src="shopinfo.supplier_img+'?imageView2/0/w/140'" mode="aspectFill"></image>
			</view>
			<view class="flex-sub">
				<view class="flex justify-between align-center">
					<!-- <span class="tag">自营</span> -->
					<view class="name flex-sub">
						{{shopinfo.supplier_name}}
					</view>
					<view class="btn" @tap="gotopage">进入店铺</view>
				</view>
				<view class="margin-top-xs margin-bottom-xs">销量：{{(shopinfo.f_sales-0)+(shopinfo.sales-0)}}</view>
				<view>
					<tui-rate :disabled="true" :current="shopinfo.evaluate" :size="14" active='#fc743c'></tui-rate>
					<text class="num" :style="{color:shopinfo.evaluate==0?'#c9c9c9':'#fc743c'}">{{shopinfo.evaluate?shopinfo.evaluate:'暂无评价'}}</text>
				</view>
			</view>

		</view>
		<view class="goodslist flex margin-top-sm" @tap="gotopage">
			<view class="goods-item" v-for="(item,index) in shopinfo.supplier_products" v-if="index <4" :key="index">
				<image :lazy-load="true" :src="item.img_url[0]+'?imageView2/0/w/140'" mode="widthFix"></image>
				<text>￥{{item.price}}/扎</text>
			</view>

		</view>
	</view>
</template>

<script>
	import tuiRate from "@/components/rate/rate"
	export default {
		data() {
			return {
				goodslist: []
			};
		},
		props: {
			shopinfo: {
				type: Object,
				default: {}
			}
		},
		watch: {
			// shopinfo: {
			// 	handler(newName, oldName) {
			// 		if (newName.supplier_products && newName.supplier_products.length > 0) {
			// 			for (var i = 0; i < newName.supplier_products.length; i++) {
			// 				let item = newName.supplier_products[i];
			// 				item.img_url =item.img_url;
			// 				this.goodslist.push(item);
			// 				if (i >= 3) {
			// 					break;
			// 				}
			// 			}
			// 		}
			// 	},
			// 	immediate: true
			// },
		},
		components: {
			tuiRate
		},
		methods: {
			gotopage() {
				uni.navigateTo({
					url: '/pages/favshopinfo/favshopinfo?id=' + (this.shopinfo.sid||this.shopinfo.id)
				});
			},
			delFollow() {
				this.$postajax(this.$api.delFollowbylist + this.goodsinfo.sid).then(da => {
					console.log(da);
					if (da.code == 0) {
						this.$emit('upload')
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.shopinfo {
		background: #fff;
		font-size: 24upx;
		margin-bottom: 20upx;
		color: #8d8d8d;

		&.card {
			border-radius: 16upx;
			border-top: none;
			padding: 35upx 20upx;

		}

		.imgbox {
			height: 130upx;
			margin-right: 50upx;
			width: 130upx;

			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}

		.name {
			color: #000;
			font-size: 30upx;
		}

		.tag {
			color: #fff;
			background: #e60012;
			line-height: 25upx;
			height: 25upx;
			display: inline-block;
			padding: 0 10upx;
			border-radius: 5upx;
			font-size: 16upx;
			margin-right: 20upx;
		}

		.btn {
			color: #fff;
			font-size: 26upx;
			width: 150upx;
			line-height: 60upx;
			border-radius: 15upx;
			text-align: center;
			background-image: linear-gradient(90deg, #fe8c2d, #fe5504);
		}

		.num {
			font-size: 26upx;
			color: #c9c9c9;
			margin-left: 10upx;
		}

		.goodslist {
			padding-right: 50upx;
			position: relative;
			text-align: center;

			&:before {
				position: absolute;
				top: 0;
				right: 10upx;
				bottom: 0;
				display: block;
				margin: auto;
				width: 30upx;
				height: 30upx;
				color: #8799a3;
				content: "\e6a3";
				text-align: center;
				font-size: 34upx;
				font-family: cuIcon;
				line-height: 30upx
			}

			.goods-item {
				color: #e60012;
				font-size: 22upx;
				width: 22%;

				image {
					width: 100%;
				}

				&+.goods-item {
					margin-left: 4%;
				}
			}
		}
	}
</style>
