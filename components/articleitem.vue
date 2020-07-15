<template>
	<!-- <view class="flex justify-between item">
		<view class="title">免责说明</view>
		<view>查看</view>
	</view> -->
	<view class="flex justify-between item">
		<view class="title">{{articleinfo.name}}</view>
		<view @click="detail">查看</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		created() {
			console.log("文章信息"+JSON.stringify(this.articleinfo))
		},
		props:{
			articleinfo: {
				type: Object,
				default: {}
			},
		},
		methods:{
			detail(){
				var id = this.articleinfo.id;
				uni.navigateTo({
					url: '/pages/articleDetails/articleDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.item{
		line-height: 120upx;
		border-bottom: 1px solid #f0f0f0;
		font-size: 28upx;
		padding: 0 65upx;
		color: #fc743c;
		.title{
			color: #000;
		}
	}

</style>
