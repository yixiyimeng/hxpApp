<template>
	<mescroll-body :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
		<view class="pageview flex flex-direction">
			<image src="/static/shop/balance_bg@2x.png" mode="widthFix" class="bg"></image>
			<view class="main">
				<view class="walletinfo">
					<view>账户余额(元)</view>
					<view class="price">{{money}}</view>
					<view class="tip">最多可提现 {{money}} 元，最小提现 10 元</view>
				</view>
				<view class="flex applytxt align-center">
					<span>￥</span>
					<input class="flex-sub" type="digit" value="" v-model="accountInfo.money" @input="oninput" />
					<span class="link" @tap="getallMoney">全部提现</span>
				</view>
				<view class="applytip">提现手续费：<text class="text-green margin-right">0.7%({{actualAmount}}元)</text> 最终到账金额：<text
					 class="text-green">{{txAmount}}元</text></view>
				<view class="accountlist flex justify-between">
					<view :class="{active:curIndex==0}" @tap="curIndex=0" class="alipay flex flex-sub  align-center justify-center">
						<image src="/static/shop/alipay@2x.png" mode="widthFix"></image>
						<span>支付宝</span>
					</view>
					<view :class="{active:curIndex==1}" @tap="curIndex=1" class="flex wechat flex-sub align-center justify-center">
						<image src="/static/shop/wechat@2x.png" mode="widthFix"></image>
						<span>微信</span>
					</view>
					<view :class="{active:curIndex==2}" @tap="curIndex=2" class="flex bank_card flex-sub align-center justify-center">
						<image src="/static/shop/bank_card@2x.png" mode="widthFix"></image>
						<span>银行卡</span>
					</view>
				</view>
				<view class="applylist" v-if="curIndex==0">
					<view class="row">
						<view>支付宝账户：</view>
						<input type="text" value="" placeholder="请输入支付宝账户" placeholder-style="color:#D2D2D2" v-model="accountInfo.tx_number" />
					</view>
					<view class="row">
						<view>支付宝真实姓名：</view>
						<input type="text" value="" placeholder="请输入支付宝账户" placeholder-style="color:#D2D2D2" v-model="accountInfo.tx_name" />
					</view>
				</view>
				<view class="applylist" v-if="curIndex==1">
					<view class="row">
						<view>微信账户：</view>
						<input type="text" value="" placeholder="请输入微信账户" placeholder-style="color:#D2D2D2" v-model="accountInfo.tx_number" />
					</view>
				</view>
				<view class="applylist" v-if="curIndex==2">
					<view class="row">
						<view>银行卡账户：</view>
						<input type="text" value="" placeholder="请输入银行卡账户" placeholder-style="color:#D2D2D2" v-model="accountInfo.tx_number" />
					</view>
					<view class="row">
						<view>开户银行：</view>
						<input type="text" value="" placeholder="请输入开户银行" placeholder-style="color:#D2D2D2" v-model="accountInfo.tx_address" />
					</view>

					<view class="row">
						<view>开户姓名：</view>
						<input type="text" value="" placeholder="请输入开户姓名" placeholder-style="color:#D2D2D2" v-model="accountInfo.tx_name" />
					</view>

				</view>
				<view class="btn" @tap="submit">确认提现</view>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				bgColor: 'nobg',
				money: null, //当前余额
				accountInfo: {
					money: null,
					tx_name: '',
					tx_number: '',
					tx_address: ''
				},
				curIndex: 0,
				downOption: {
					auto: false // 不自动加载
				},
				upOption: {
					empty: {
						use: false
					},
					use: false,
					auto: false // 不自动加载
				},
				info: {}
			};
		},
		computed: {
			...mapState(['supplierInfo']),
			actualAmount() {
				let amount = 0;
				amount = this.accountInfo.money * 0.007;
				return amount.toFixed(2)
			},
			txAmount() {
				let money = this.accountInfo.money - this.accountInfo.money * 0.007
				return money.toFixed(2)
			}
		},
		onShow() {
			console.log(this.supplierInfo)
			try {
				this.money = (this.supplierInfo.shop.money-0).toFixed(2);

			} catch (e) {
				this.money = 0
			}

		},
		methods: {
			...mapMutations(['uploadSupplierInfo']),
			oninput(e) {
				this.$nextTick(() => {
					let val = e.target.value.toString();
					val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
					val = (val.match(/^\d*(\.?\d{0,2})/g)[0]) || ''

					this.accountInfo.money = val;


				});
			},
			//全部提现
			getallMoney() {
				this.accountInfo.money = this.money;
			},
			submit() {
				var tx_type = '';
				if (!this.accountInfo.money || this.accountInfo.money == null) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					});
					return false;
				} else {
					if (parseFloat(this.accountInfo.money) < 10) {
						uni.showToast({
							title: '最小提现额度为10元',
							icon: 'none'
						});
						return false;

					}
					if (parseFloat(this.accountInfo.money) > parseFloat(this.money)) {
						uni.showToast({
							title: '提现金额不能大于当前余额',
							icon: 'none'
						});
						return false;
					}
				}
				if (this.curIndex == 0) {
					tx_type = "支付宝";
					if (!this.accountInfo.tx_number) {
						uni.showToast({
							title: '请输入支付宝账户',
							icon: 'none'
						});
						return false;
					}
					if (!this.accountInfo.tx_name) {
						uni.showToast({
							title: '请输入支付宝真实姓名',
							icon: 'none'
						});
						return false;

					}

				} else if (this.curIndex == 1) {
					tx_type = "微信";
					if (!this.accountInfo.tx_number) {
						uni.showToast({
							title: '请输入微信号或其他账号',
							icon: 'none'
						});
						return false;
					}
				} else {
					tx_type = "银行卡";
					if (!this.accountInfo.tx_number) {
						uni.showToast({
							title: '请输入银行卡账户',
							icon: 'none'
						});
						return false;
					}
					if (!this.accountInfo.tx_address) {
						uni.showToast({
							title: '请输入开户银行',
							icon: 'none'
						});
						return false;
					}
					if (!this.accountInfo.tx_name) {
						uni.showToast({
							title: '请输入开户姓名',
							icon: 'none'
						});
						return false;
					}

				}
				var param = Object.assign({}, {
					tx_type: tx_type
				}, this.accountInfo)
				this.$postajax(this.$shopapi.cashout, param).then(da => {
					if (da.code == 0) {
						uni.showToast({
							title: da.msg,
							icon: 'success'
						});
						// this.supplierInfo.shop.money = this.money - this.accountInfo.money;
						this.getSupplierInfo();
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 200)

					} else {
						uni.showToast({
							title: da.msg,
							icon: 'none'
						});
					}
				})
			},
			getSupplierInfo() {
				this.$postajax(this.$shopapi.getSupplierInfo).then(da => {
					if (da.code == 0) {
						this.info = da.data;
						this.money = this.info.shop.money;
						if(this.money>0){
							this.money=(this.money-0).toFixed(2)
						}
						this.uploadSupplierInfo(this.info)
					}
					this.mescroll.endSuccess(0, false);
				})
			},
			downCallback(mescroll) {
				this.getSupplierInfo();
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #fff;
	}

	.bg {
		width: 100%;
		position: absolute;
		z-index: 0;
		top: 0;

	}

	* {
		box-sizing: border-box;

	}

	.main {
		position: relative;
		padding: 0 30upx;
		z-index: 99;

		.walletinfo {
			color: #fff;
			font-size: 28upx;
			padding: 56upx 0 60upx 40upx;

			.price {
				font-size: 56upx;
				margin: 15upx 0 20upx;
			}

			.tip {
				font-size: 26upx;
				color: #BBF6DB;
			}
		}

		.applytxt {
			padding: 30upx 0;
			color: #373737;
			font-size: 34upx;
			border-bottom: 2upx solid #19A967;

			input {
				margin-left: 14upx;
				color: #373737;
				font-size: 54upx;
			}

			.link {
				color: #19A967;
				font-size: 30upx;
			}
		}

		.applytip {
			color: #C7C7C7;
			font-size: 26upx;
			margin: 27upx 0 40upx;
		}

		.accountlist {
			&>view {
				color: #2E2E2E;
				font-size: 30upx;
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAC8CAMAAAAAYCpFAAAAilBMVEUAAADf39/j4+Pm5ubq6urY2Nji4uLj4+Pj4+Pg4ODf39/f39/f39/f39/g4ODh4eHf39/g4ODg4ODg4ODg4ODh4eHg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODn5+fp6enq6urs7Ozy8vL4+Pj6+vr8/Pz+/v7///+fC19WAAAAI3RSTlMACAkKDA0jJCUyV1iIiYqYmZqbnMjJz9DR6Onq6/T19vj5+nYITrIAAAJxSURBVHja7ddtUhpBGIXRF4NBMcQvNCBihMswIGT/28sfy5i4ALsq51nCPdXTPVVvDceX04fn6NN7fphejof1sdHN0jottbwZ/UM0+LZKut3+cPylT+942O+6ZDUZvDf6ep/0L9ZpqZc+uX93mM7n2ezN0lr7Tebnb9fRIlufuRY/e9ssXs/SyY9sDdJm28xOqqpqko1z1OpZ2mRSVfV1HfdRu/dS1qOquklvi3brc1t1uoy3d8sv8SxPa5zOEi3XZVzX2Rmi5Xa5rqlnQ+tPh2k95mCIljvksVbxk9T2r1JWldih7RJIkAQJkiAJEiRBEiRIggRJkAQJkiAJEiRBggQJkiBBEiRBgiRIggRJkCAJkiBBEiRBgiRIggRJkCAJkiBBEiRBgiRIkARJkCAJkiBBEiRBgiRIkARJkCAJkiBBEiRIgiRIkARJkCAJkiBBEiRIgiRIkARJkCAJEiRBEiRIgiRIkARJkCAJEiRBEiRIgiRIkAQJkiAJEiRBEiRIgiRIkAQJkiAJEiRBEiRIggRJkAQJkiAJEiRBEiRIggRJkAQJkiAJEiRBgiRIggRJkAQJkiAJEiRB+t+QVjnaoeWOWdVjDoZouUMea5q9IVpun2ldZ2eIltvlusbpDNFyXcZ1usyLJdrtJU+nVbfpTdFufW6rarT2dGj52bA+q6qaZONXqdWfpE2+V1XVySxbc7TZNrMvVVVVo0W2zlKL52ibxaheO59n415q7z7aZH5eb41mSe8l3tbbu09mo3rXYLJOut3+4LPXwmfusN91yXoyqL87u3mKGurn7Vl9bHhxdbdYW+fzWy/uri6Gf2R+A2Wrtj+TI4pdAAAAAElFTkSuQmCC) no-repeat center center;
				background-size: contain;
				height: 94upx;

				&.active {
					background-image: url(data:image/png;base64,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);
				}

				image {
					margin-right: 10upx;
				}

				&.alipay {
					image {
						width: 56upx;
					}
				}

				&.wechat {
					margin-left: 16upx;

					image {
						width: 57upx;
					}
				}

				&.bank_card {
					margin-left: 16upx;

					image {
						width: 64upx;
					}
				}
			}
		}

		.applylist {
			.row {
				font-size: 28upx;
				color: #1D1D1D;
				margin-top: 50upx;
				padding-bottom: 20upx;
				border-bottom: 1px solid #E5E5E5;

				input {
					margin-top: 30upx;
					text-indent: 40upx;
				}
			}
		}

		.btn {
			width: 600upx;
			line-height: 100upx;
			background: rgba(25, 169, 103, 1);
			box-shadow: 0px 9upx 27upx 0px rgba(25, 169, 103, 0.58);
			border-radius: 12upx;
			margin: 70upx auto 20upx;
			color: #fff;
			font-size: 30upx;
			text-align: center;
		}
	}

	.text-green {
		color: #19A967;
	}
</style>
