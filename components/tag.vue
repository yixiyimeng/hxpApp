<template>
	<view class="cu-tag" :class="tagclass">
		{{text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			text: {
				type: String,
				default: ''
			}
		},
		computed: {
			tagclass() {
				// let tagname=''
				switch (this.text) {
					case '自营':
						{
							return 'tag1'
							break;
						}
					case '特惠':
						{
							return 'tag2'
							break;
						}
					case '基地':
						{
							return 'tag3'
							break;
						}
					case '热销':
						{
							return 'tag4'
							break;
						}
					case '品牌':
						{
							return 'tag5'
							break;
						}
					case '平台推荐':
						{
							return 'tag6'
							break;
						}
				}
			}
		}
	}
</script>

<style lang="scss">
	.cu-tag {
		font-size: 18upx;
		height: 26upx;
		color: #fff;
		border-radius: 4upx;
		margin-right: 8upx;
	}

	.tag1 {
		background-image: linear-gradient(90deg, #e32927, #fe6f2a);
	}

	.tag2 {
		color: #222;
		background-image: linear-gradient(90deg, #ffd909, #ffce09);
	}

	.tag3 {
		background-image: linear-gradient(90deg, #3bba91, #0ca461);
	}

	.tag4 {
		background-image: linear-gradient(90deg, #ff4d4c, #fa3812);
	}

	.tag5 {
		background-image: linear-gradient(90deg, #4396ec, #05bdfe);
	}

	.tag6 {
		background-image: linear-gradient(90deg, #2b2b2c, #373737);
	}
</style>
