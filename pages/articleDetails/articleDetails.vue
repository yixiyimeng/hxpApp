<template>
	<view>
		<view class="title flex justify-between align-center">
			<view class="action text-orange">{{ articleDetail.name }}</view>
			<view>浏览量：{{ articleDetail.read }}</view>
		</view>
		<view class="richText"><rich-text :nodes="articleDetail.info"></rich-text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			articleDetail: {
				name: '',
				read: '',
				info: ''
			},
			isoneArticle: false, //是否为单个文章
			type: null
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.isoneArticle = options.isoneArticle;
		this.type = options.type;
		if (!this.id) {
			var title = '';
			switch (this.type) {
				case '1':
					title = '交易规则';
					break;
				case '2':
					title = '运输说明';
					break;
				case '3':
					title = '售后规定';
					break;
				case '6':
					title = '等级标准';
					break;
				case '7':
					title = '运输协议';
					break;
				case '8':
					title = '隐私政策';
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			});
		}
		this.getArticleDetail();
	},
	onShow() {
		
	},
	methods: {
		getArticleDetail() {
			if (this.isoneArticle) {
				var param = {
					type: this.type
				};
				this.$getajax(this.$api.getOneArticle, param).then(da => {
					if (da.code == 0) {
						this.articleDetail = da.data;
					}
				});
			} else {
				this.$getajax(this.$api.getArticleDetail + this.id).then(da => {
					if (da.code == 0) {
						this.articleDetail = da.data;
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.title {
	color: #8e8e8d;
	padding: 40upx 60upx;
	border-bottom: 1px solid #f0f0f0;
	font-size: 22upx;

	.action {
		font-size: 28upx;
		font-weight: bold;
	}
}
.richText {
	padding: 30upx 60upx;
}
</style>
