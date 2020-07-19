<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">商品分类：</view>
				<span>{{catename}}</span>
			</view>
			<view class="cu-form-group">
				<view class="title">商品名称：</view>
				<input v-model="info.name" style="color: #f00;" placeholder-style="color:#C4C4C4" placeholder="请输入商品标题" name="input" :disabled="goodsid!=''&&info.sales>0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">商品等级：</view>
				<picker range-key="name" @change="PickerChangedengji" :value="product_dengji" :range="optionlist.dengji" :disabled="goodsid!=''&&info.sales>0">
					<view class="picker">
						<span :style="{color:product_dengji>-1?'#f00':'#C4C4C4'}">{{product_dengji>-1?optionlist.dengji[product_dengji].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">单位：</view>
				<picker range-key="name" @change="PickerChangeguige" :value="product_guige" :range="optionlist.guige" :disabled="goodsid!=''&&info.sales>0">
					<view class="picker">
						<span :style="{color:product_guige>-1?'#f00':'#C4C4C4'}">{{product_guige>-1?optionlist.guige[product_guige].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">长度：</view>
				<picker range-key="name" @change="PickerChangechangdu" :value="product_changdu" :range="optionlist.changdu":disabled="goodsid!=''&&info.sales>0">
					<view class="picker">
						<span :style="{color:product_changdu>-1?'#f00':'#C4C4C4'}">{{product_changdu>-1?optionlist.changdu[product_changdu].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">颜色：</view>
				<picker range-key="name" @change="PickerChangecolor" :value="product_color" :range="optionlist.color" :disabled="goodsid!=''&&info.sales>0">
					<view class="picker">
						<span :style="{color:product_color>-1?'#f00':'#C4C4C4'}">{{product_color>-1?optionlist.color[product_color].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">产地：</view>
				<input v-model="info.product_chandi" placeholder-style="color:#C4C4C4" placeholder="请输入产品产地(限4字)例如：云南玉溪" name="input"></input>
			</view> -->
			<view class="cu-form-group">
				<view class="title">优点：</view>
				<picker range-key="name" @change="PickerChangeyoudian" :value="product_youdian" :range="optionlist.youdian">
					<view class="picker">
						<span :style="{color:product_youdian>-1?'':'#C4C4C4'}">{{product_youdian>-1?optionlist.youdian[product_youdian].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">缺点：</view>
				<picker range-key="name" @change="PickerChangequedian" :value="product_quedian" :range="optionlist.quedian">
					<view class="picker">
						<span :style="{color:product_quedian>-1?'':'#C4C4C4'}">{{product_quedian>-1?optionlist.quedian[product_quedian].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">成熟度：</view>
				<picker range-key="name" @change="PickerChangechengshudu" :value="product_chengshudu" :range="optionlist.chengshudu" :disabled="goodsid!=''&&info.sales>0">
					<view class="picker">
						<span :style="{color:product_chengshudu>-1?'#f00':'#C4C4C4'}">{{product_chengshudu>-1?optionlist.chengshudu[product_chengshudu].name:'请选择'}}</span>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">库存：</view>
				<input type="number" v-model="info.stock" placeholder-style="color:#C4C4C4" placeholder="请输入商品库存数量" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">商品单价：</view>
				<input type="digit" v-model="info.price" placeholder-style="color:#C4C4C4" placeholder="请输入商品售卖单价" name="input"></input>
			</view>
			
			<view class="cu-bar bg-white   solid-top">
				<view class="action">
					上传图片：
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group ">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]+'?imageView2/0/w/100'" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="upload" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-top">
				<view class="action">
					商品描述：
				</view>
			</view>
			<view class="cu-form-group solid bg-white margin-left margin-right">
				<textarea v-model="info.info" maxlength="-1" placeholder="可简单描述您的商品..."></textarea>
			</view>
			<div class="sendBtn" @tap="addProduct">
				确认提交
			</div>

		</form>
		<avatar @upload="doUpload" @avtinit="doBefore" quality="1" ref="avatar"></avatar>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		data() {
			return {
				catename: '',
				info: {
					product_id: '',
					img_url: []
				},
				radio: 'no',
				imgList: [],
				optionlist: {},
				product_dengji: -1,
				product_guige: -1,
				product_quedian: -1,
				product_youdian: -1,
				product_changdu: -1,
				product_chengshudu: -1,
				product_color: -1,
				goodsid: ''
			};
		},
		components:{avatar},
		created() {
			this.getoption();
			
		},
		onLoad(option) {
			if (option.id) {
				this.info.product_id = option.id
			}
			if (option.catename) {
				this.catename = option.catename;
			}
			/* 编辑 */
			if (option.goodsid) {
				this.goodsid = option.goodsid;
			}
		},
		methods: {
			doBefore() {
			
			},
			doUpload(rsp) {
				// this.avatarUrl = rsp.path;
				// this.uploadImg();
				this.uploadImg(rsp.path)
			
			},
		
			upload() {
				// let that = this;
				// uni.chooseImage({
				// 	count: 4 - that.imgList.length, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album', 'camera'], //从相册选择
				// 	success: function(res) {
				// 		console.log(JSON.stringify(res.tempFilePaths));
				// 		for (var i = 0; i < res.tempFilePaths.length; i++) {
				// 			that.imgList.push(res.tempFilePaths[i])
				// 			that.uploadImg(res.tempFilePaths[i], i)
				// 		}
				// 	}
				// });
				this.$refs.avatar.fChooseImg('', {
					selWidth: '600upx',
					selHeight: '600upx',
					expWidth: '1500upx',
					expHeight: '1500upx',
					inner: 'true'
				});
			},
			uploadImg(imgpath) {
				var that = this;
				uni.uploadFile({
					url: this.$shopapi.upload,
					filePath: imgpath,
					name: 'file',
					success: function(uploadFileRes) {
						let img = JSON.parse(uploadFileRes.data).data.src;
						that.imgList.push(img) ;
						uni.showLoading({
							title: "正在上传"
						});
						setTimeout(()=>{
							uni.hideLoading();
						},300);
						// that.info.img_url.push(img)
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除这张图片吗？',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			PickerChangedengji(e) {
				/* 等级 */
				this.product_dengji = e.detail.value>=0?e.detail.value:0;
				this.info.product_dengji = this.optionlist.dengji[this.product_dengji].id
			},
			PickerChangeguige(e) {
				/* 规格 */
				this.product_guige = e.detail.value>=0?e.detail.value:0;
				this.info.product_guige = this.optionlist.guige[this.product_guige].id
			
			},
			PickerChangechangdu(e) {
				/* 长度 */
				this.product_changdu = e.detail.value>=0?e.detail.value:0;
				this.info.product_changdu = this.optionlist.changdu[this.product_changdu].id
			
			},
			PickerChangecolor(e) {
				/* 颜色 */
				this.product_color =  e.detail.value>=0?e.detail.value:0;
				this.info.product_color = this.optionlist.color[this.product_color].id
			
			},
			PickerChangeyoudian(e) {
				/* 优点 */
				this.product_youdian = e.detail.value>=0?e.detail.value:0;
				this.info.product_youdian = this.optionlist.youdian[this.product_youdian].id
			
			},
			PickerChangequedian(e) {
				/* 缺点 */
				this.product_quedian = e.detail.value>=0?e.detail.value:0;
				this.info.product_quedian = this.optionlist.quedian[this.product_quedian].id
			
			},
			PickerChangechengshudu(e) {
				/* 成熟度 */
				this.product_chengshudu = e.detail.value>=0?e.detail.value:0;
				this.info.product_chengshudu = this.optionlist.chengshudu[this.product_chengshudu].id
			
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			getoption() {
				this.$getajax(this.$shopapi.addProduct).then(da => {
					console.log(da)
					if (da.code == 0) {
						this.optionlist = da.data
						if (this.goodsid) {
							this.getProductInfo();
						}
					}
				})
			},

			addProduct() {
				let param = Object.assign({}, this.info, {
					img_url: this.imgList
				})
				console.log(param)
				let url=this.$shopapi.addProduct;
				if(this.goodsid){
					url=this.$shopapi.editProduct + this.goodsid
				}
				this.$postajax(url, param).then(da => {
					console.log(da)
					if (da.code == 0) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						})
					}
					uni.showToast({
						title: da.msg,
						icon: 'none'
					})
				})
			},
			/* 获取产品信息 */
			getProductInfo() {
				this.$getajax(this.$shopapi.editProduct + this.goodsid).then(da => {
					if (da.code == 0) {
						this.info = da.data;
						this.catename = this.info.class_name_;
						this.imgList = JSON.parse(this.info.img_url)
						/* 回填下拉选 */
						this.product_dengji = this.optionlist.dengji.findIndex(item => item.id == this.info.product_dengji);
						this.product_guige = this.optionlist.guige.findIndex(item => item.id == this.info.product_guige);
						this.product_quedian = this.optionlist.quedian.findIndex(item => item.id == this.info.product_quedian);
						this.product_youdian = this.optionlist.youdian.findIndex(item => item.id == this.info.product_youdian);
						this.product_changdu = this.optionlist.changdu.findIndex(item => item.id == this.info.product_changdu);
						this.product_chengshudu = this.optionlist.chengshudu.findIndex(item => item.id == this.info.product_chengshudu);
						this.product_color = this.optionlist.color.findIndex(item => item.id == this.info.product_color);
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

	.cu-form-group radio {
		transform: scale(.7);
		vertical-align: 3px;
	}

	.uploadCard {
		background: #fff;
		padding: 38upx 30upx;
	}

	.uploadCard .upload {
		width: 324upx;
		height: 279upx;
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
