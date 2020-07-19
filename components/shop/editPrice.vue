<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>修改<text style="color: #FD3C3E;">{{info.name}}</text>的<text style="color: #19A967;">{{state==0?'库存':'价格'}}</text></text>
				<text class="cuIcon-close" @tap="showModal=false"></text>
			</view>
			<view class="margin solids text-left">
				<input class="num" :type="state==1?'digit':'number'" :placeholder="'请输入'+(state==0?'库存':'价格')" v-model="num" />
			</view>
			<view class="ftbar flex">
				<view class="btn flex-sub" @tap="showModal=false">
					取消
				</view>
				<view class="btn flex-sub" @tap="save">确定</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				num: 0,
				info:{},
				state:0
			};
		},
		
		methods: {
			show(state,info){
				console.log(info)
				this.info=info;
				this.state=state;
				this.num = this.state == 0 ? this.info.stock : this.info.price;
				this.showModal=true;
			},
			save() {
				let param = {};
				if (this.state == 0) {
					param.stock = this.num;
				} else {
					param.price = this.num;
				}
				this.$postajax(this.$shopapi.editProduct + this.info.id, Object.assign({}, this.info, param)).then(da => {
					console.log(da)
					if (da.code == 0) {
						this.showModal = false;
						this.$emit('upload')
					}
					uni.showToast({
						title: da.msg,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-modal {
		.cu-dialog {
			width: 640upx;
		}

		.title {
			color: #000;
			font-size: 40upx;
			padding: 38upx 36upx 30upx 48upx;

			image {
				width: 46upx;
			}
		}

		.logo {
			width: 118upx;
			margin: 50upx auto;
		}

		.copyitem {
			font-size: 34upx;
			color: rgba($color: #000000, $alpha: .6);
			padding: 20upx 60upx;

			.btn {
				color: #3DC098;
				border: 1px solid #3DC098;
				border-radius: 20upx;
				font-size: 24upx;
				line-height: 40upx;
				width: 80upx;
			}
		}

		.ftbar {
			border-top: 2upx solid rgba(0, 0, 0, .1);
			height: 112upx;
			margin-top: 50upx;

			.btn {
				font-weight: bold;
				font-size: 34upx;
				line-height: 110upx;
				text-align: center;

				&+.btn {
					border-left: 2upx solid rgba(0, 0, 0, .1);
					color: #576B95;

				}

			}
		}
	}
	.num{
		height:80upx;padding-left: 20upx; color: #000; font-size: 36upx; width: 100%; border:none;
		box-sizing: border-box;
		outline: none;
	}
</style>
