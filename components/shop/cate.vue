<template>
	<view class="cate-item">
		<div class="title flex align-center justify-between">
			<text class="name">{{info.class_name_}}——{{info.product_id_}}</text>
			<text class="apply" @tap="apply" :class="'apply'+info.type">{{info.type==2?'申请特价促销>':(info.type==3?'申请中':'取消特价促销>')}}</text>
		</div>
		<div class="flex infobox">
			<div class="imgbox">
				<image :src="info.img_url[0]+'?imageView2/0/w/140'" mode="widthFix"></image>
			</div>
			<div class="flex-sub">
				<div class="flex justify-between align-center padding-bottom-xs">
					<div class="name">{{info.name}}</div>
					<div>
						<span class="state" :class="{'text-yellow':switchA==1}">{{switchA==1?'上架':'下架'}}</span>
						<switch class="yellow" @change="SwitchA" :class="switchA==1?'checked':''" :checked="switchA==1?true:false"></switch>
					</div>
				</div>
				<div class="flex info flex-wrap">
					<view>等级：{{info.product_dengji_}}</view>
					<view>单位：{{info.product_guige_}}</view>
					<view>长度：{{info.product_changdu_}}</view>
					<view>颜色：{{info.product_color_}}</view>
					<view>销量：{{info.sales}}</view>
					<view @tap="editprice(0,info)">库存：{{info.stock}}</view>
				</div>
			</div>
		</div>
		<div class="btnbar flex align-center">
			<div class="flex-sub" @tap="editprice(1,info)"><span>单价：</span>
				<span class='price'>￥</span>
				<span class='price'>{{info.price}}</span>

			</div>
			<button class="btn" @tap="del">删除</button>
			<button class="btn" @tap="edit">编辑</button>
		</div>
		<!-- <applymodal ref="applymodal" ></applymodal> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA: 0
			};
		},
		props: {
			info: {
				type: Object,
				default: {}
			}
		},
		components: {
			// applymodal
		},
		watch: {
			info: {
				handler: function(val, oldVal) {
					this.switchA = val.status
				},
				immediate: true
			}
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value;
				this.$postajax(this.$shopapi.productStatus + this.info.id).then(da => {

				})
			},
			edit() {
				uni.navigateTo({
					url: '/shop/addgoods/addgoods?goodsid=' + this.info.id
				})
			},
			del() {
				let $me = this;
				uni.showModal({
					title: '删除',
					content: '您确定删除这件商品吗？',
					success: function(res) {
						if (res.confirm) {
							$me.$postajax($me.$shopapi.delProduct + $me.info.id).then(da => {
								if (da.code == 0) {
									/* 通知刷新页面 */
									$me.$emit('upload')
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			apply() {
				
				if (this.info.type == 2) {
					this.$emit('applyPrice',this.info.id)
				} else if(this.info.type == 1) {
					this.cancelapply();
				}
			},
			cancelapply() {
				/* 取消特价申请 */
				let $me = this;
				uni.showModal({
					title: '',
					content: '你确定要取消特价申请吗？',
					success: function(res) {
						if (res.confirm) {
							$me.$postajax($me.$shopapi.cancelapply + $me.info.id).then(da => {
								if (da.code == 0) {
									/* 通知刷新页面 */
									$me.$emit('upload')
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			editprice(state,info){
				this.$emit('editprice',{state,info})
			}
		}
	}
</script>

<style lang="scss">
	.cate-item {
		background: #fff;
		padding: 0 14upx;
		box-shadow: 0 4upx 16upx 0 rgba(213, 213, 213, 1);
		border-radius: 8upx;
		color: #666;
		font-size: 24upx;

		.title {
			.name {
				color: #A0A0A0;
				font-size: 28upx;
				padding: 20upx 0;
			}

			.apply {
				display: inline-block;
				color: #19A967;
				font-size: 26upx;
				margin-left: 10upx;

				&.apply3 {
					color: #999;
				}

				&.apply1 {
					color: #FD3C3E;
				}
				
			}
		}

		.infobox {
			padding-bottom: 22upx;
			border-bottom: 1px solid #EDEDED;

			.info {
				view {
					width: 30%;
					margin: 10upx 0;

					&:nth-child(3n+2) {
						width: 40%;
					}
				}
			}
		}

		.imgbox {
			width: 160upx;
			height: 160upx;
			border-radius: 8upx;
			overflow: hidden;
			margin-right: 18upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.btnbar {
			font-size: 24upx;
			padding: 18upx 0;
			color: #666;

			.price {
				color: #FD3C3E;
				font-size: 22upx;

				&+.price {
					font-size: 36upx;
				}
			}


		}

		.btnbar .btn {
			font-size: 26upx;
			width: 134upx;
			height: 59upx;
			text-align: center;
			line-height: 59upx;
			border-radius: 8upx;
			color: #FD3C3E;
			background: #fff;
			border: 1px solid #FD3C3E;
			font-size: 28upx;

			&+.btn {
				background: #19A967;
				color: #fff;
				margin-left: 10upx;
				border-color: #19A967;
			}
		}

		.name {
			color: #2E2E2E;
			font-size: 32upx;
		}

		.state {
			font-size: 26upx;
			margin-right: 25upx;
			line-height: 32upx;
			vertical-align: middle;
		}
	}
</style>
