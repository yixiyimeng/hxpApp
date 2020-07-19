<template>
	<view>
		<div class="tip flex align-center">
			<text class="cuIcon cuIcon-creative"></text>
			<text>请认真填写企业(个人)资料，以便于我们了解您的情况，认真所需的个人信息不会公开给任何组合和个人。
			</text>
		</div>
		<form>
			<view class="cu-form-group">
				<view class="title">公司名称：</view>
				<input placeholder-style="color:#C4C4C4" placeholder="请填写个人或公司名称" name="input" v-model="info.supplier_qy_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">店铺名称：</view>
				<input placeholder-style="color:#C4C4C4" placeholder="例如：方德玫瑰" name="input" v-model="info.supplier_dp_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">负责人：</view>
				<input placeholder-style="color:#C4C4C4" placeholder="请填写负责人姓名" name="input" v-model="info.supplier_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话：</view>
				<input type="number" placeholder-style="color:#C4C4C4" placeholder="请输入联系方式" name="input" v-model="info.supplier_phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">紧急联络人：</view>
				<input placeholder-style="color:#C4C4C4" placeholder="请填写紧急联系人" name="input" v-model="info.supplier_jj_name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">紧急联络人电话：</view>
				<input type="number" placeholder-style="color:#C4C4C4" placeholder="请填写紧急联系人" name="input" v-model="info.supplier_jj_phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地址：</view>
				<input placeholder-style="color:#C4C4C4" placeholder="请填写详细地址" name="input" v-model="info.supplier_address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">供应品种：</view>
				<input placeholder-style="color:#C4C4C4" placeholder="请输入供应的品种，便平台审核" name="input" v-model="info.supplier_pinzhong"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">负责人身份证</view>
				<input type="idcard" placeholder-style="color:#C4C4C4" placeholder="请输入身份证号" name="input" v-model="info.supplier_number_card"></input>
			</view>
			<div class="cu-form-group uploadCard flex justify-between">
				<div class="upload" @tap="upload(0)">
					<image :src="cardPic" mode="widthFix"></image>
				</div>
				<div class="upload" @tap="upload(1)">
					<image :src="cardPiR" mode="widthFix"></image>
				</div>
			</div>
			<div class="sendBtn" @tap="apply">
				确认提交
			</div>
			<div class="txt">
				我已经阅读，并同意
				<navigator url="">
					《供货商服务协议》
				</navigator>
			</div>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				cardPic: '/static/shop/positive@2x.png',
				cardPiR: '/static/shop/reverse@2x.png'
			};
		},
		methods: {
			upload(type) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						if (type == 1) {
							that.cardPiR = res.tempFilePaths[0]
						} else {
							that.cardPic = res.tempFilePaths[0]
						}
						that.uploadImg(res.tempFilePaths[0], type)
					}
				});
			},
			uploadImg(imgpath, type) {
				var that = this;
				uni.showToast({
					icon: "loading",
					title: "正在上传"
				});
				uni.uploadFile({
					url: this.$shopapi.upload,
					filePath: imgpath,
					name: 'file',
					success: function(uploadFileRes) {
						let img = JSON.parse(uploadFileRes.data).data.src;
						if (type == 0) {
							that.cardPic = img;
							that.info.supplier_card_img1 = img
						} else {
							that.cardPiR = img;
							that.info.supplier_card_img2 = img
						}
					}
				});
			},
			apply() {
				console.log(this.info)
				this.$postajax(this.$shopapi.applySupplier, this.info).then(da => {
					uni.showToast({
						icon: "none",
						title: da.msg
					});
					if (da.code == 0) {
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}, 300)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #fff;
	}

	.tip {
		padding: 20upx 30upx;
		color: #545454;
		font-size: 26upx;
		line-height: 38upx;
		background: #F7F7F7;

		.cuIcon {
			color: #19A967;
			font-size: 48upx;
			margin-right: 10upx;
		}
	}

	.cu-form-group input {
		text-align: right;
	}

	.uploadCard {
		background: #fff;
		padding: 38upx 30upx;
	}

	.uploadCard .upload {
		width: 324upx;
		height: 279upx;
		overflow: hidden;
	}

	.sendBtn {
		width: 690upx;
		height: 100upx;
		background: #19A967;
		box-shadow: 0 9upx 27upx 0 rgba(25, 169, 103, 0.58);
		border-radius: 12upx;
		color: #fff;
		text-align: center;
		font-size: 30upx;
		line-height: 100upx;
		margin: 30upx auto
	}

	.txt {
		padding: 10upx 0 40upx;
		font-size: 26upx;
		text-align: center;
		color: #6F6F6F;

		navigator {
			color: #19A967;
			display: inline;
		}
	}
</style>
