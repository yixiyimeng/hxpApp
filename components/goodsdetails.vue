<template>
	<view class="cu-modal bottom-modal" :class="showDetails?'show':''" @tap="showDetails=false">
		<view class="cu-dialog bg-white" @tap.stop="" style="padding-top: 20px;">
			<!-- 关闭 -->
			<view class="action cuIcon-close close" @tap="showDetails=false"></view>
			<view class="mail-item" style="max-height: 70vh;overflow: auto;">
				<div class="flex align-center">
					<div class="imgbox" v-if="info.img_url&&info.img_url.length>0">
						<image :lazy-load="true" :src="info.img_url[0]+'?imageView2/0/w/140'" mode="widthFix"></image>
					</div>
					<div class="info flex-sub">
						<div class="name">
							{{info.name}}
						</div>
						<div class="price margin-bottom margin-top">
							￥{{info.price}}
						</div>
						<div><span>库存:{{info.stock}}</span><span class="margin-left">销量:{{info.sales+info.f_sales}}</span></div>

					</div>
				</div>
				<div class="flex justify-between">
					<div class="flex align-center margin-top-sm">
						<!-- <div class="tag tag1">
							<image :src="info.supplier_grade_ico" mode="widthFix"></image>
						</div> -->
						<div class="state" v-if="info.supplier_is_follow==1">关注的店</div>
						<div class="mailname" @click="tapMailName">{{info.supplier_name}}></div>
					</div>
					<numberbox :value='num' @change="changeNum" :max="info.stock"></numberbox>
				</div>
				<div class="goodstag grid col-3 margin-top-sm">
					<view>等级:{{info.product_dengji_}}</view>
					<view>枝长:{{info.product_changdu_}}</view>
					<view>单位:{{info.product_guige_}}</view>
					<view>优点:{{info.product_youdian_}}</view>
					<view>缺点:{{info.product_quedian_}}</view>
					<view>成熟度:{{info.product_chengshudu_}}</view>
				</div>
				<view class="goodsinfo margin-top-sm">
					<div class="title">商品描述：</div>
					<p>{{info.info}}</p>
				</view>
				<div class="addcarbtn" @tap="addCar">加入采购单</div>
			</view>
		</view>
	</view>
</template>

<script>
	import Numberbox from '@/components/numberbox.vue'
	export default {
		data() {
			return {
				showDetails: false,
				info: {},
				num: 1
			};
		},
		components: {
			Numberbox
		},
		methods: {
			show(info) {
				this.num = 1;
				this.info = info;
				this.showDetails = true
			},
			tapMailName() {
				uni.navigateTo({
					url: '/pages/favshopinfo/favshopinfo?id=' + this.info.supplier_id
				})
			},
			changeNum(e) {
				this.num = e.value;
			},
			addCar() {
				let pid=this.info.pid||this.info.id
				this.$postajax(this.$api.addcar + pid, {
					num: this.num
				}).then(da => {
					this.showDetails = false;
					if(da.code==0){
						uni.showToast({
							title:'添加成功',
							icon:'none'
						})
					}
					// console.log('')
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'colorui/modal.scss';
</style>
