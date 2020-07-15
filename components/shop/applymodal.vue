<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>提示</text>
				<text class="cuIcon-close" @tap="showModal=false"></text>
			</view>
			<view class="padding-sm text-left margin">
				<!-- <input  type="text" value="" v-model="info" placeholder="申请原因" /> -->
				<text class="text-red">请确保您的产品具有价格优势且品质保证</text>
			</view>
			<view class="ftbar flex">
				<view class="btn flex-sub" @tap="gotopage">
					取消
				</view>
				<view class="btn flex-sub" @tap="submit">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				showModal: false,
				info: '',
				id:''
			};
		},
		computed: {
			...mapState(['session_key', 'openid'])
		},
		methods: {
			...mapMutations(['uploadPhone', 'uploadMemberId', 'uploadUserInfo', 'login']),
			show(id) {
				this.id=id;
				this.showModal = true;
			},
			gotopage() {
				this.showModal=false
			},
			submit(){
				this.$postajax(this.$shopapi.applyProductSales+this.id,{info:this.info}).then(da=>{
					if(da.code==0){
						uni.showToast({
							title:'申请成功',
							icon:'none'
						})
						this.showModal=false;
						this.$emit('upload')
					}else{
						uni.showToast({
							title:da.msg,
							icon:'none'
						})
					}
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
					line-height: 110upx;
					color: #576B95;
					font-size: 34upx;
					background: none;
				}

			}
		}
	}
</style>
