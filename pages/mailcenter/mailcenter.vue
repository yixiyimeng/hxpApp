<template>
	<view class="pageview flex flex-direction">
		<image src="/static/shop/bg@2x.png" mode="widthFix" class="bg"></image>
		<cu-custom :bgColor="bgColor"><block slot="content">商家中心</block></cu-custom>
		<div class="mailInfo flex">
			<div class="imgbox"><image :src="info.supplier_img"></image></div>
			<div class="info flex-sub">
				<div class="name">{{ info.supplier_name }}</div>
				<p>类别：{{ info.supplier_group_id }}</p>
				<p>平台佣金比例：{{ info.supplier_yj_money }}%</p>
				<view class="edit" @tap="supplierinfo">
					<text>编辑</text>
					<image src="../../static/shop/edit@2x.png" mode="widthFix"></image>
				</view>
				<div class="state">
					<text :class="{ green: info.supplier_status == 1 }">{{ info.supplier_status == 1 ? '营业中' : '未营业' }}</text>
					<switch class="green" @change="SwitchA" :class="info.supplier_status == 1 ? 'checked' : ''" :checked="info.supplier_status == 1 ? true : false"></switch>
				</div>
			</div>
		</div>
		<div class="flex-sub main">
			<mescroll-uni @down="downCallback" @up="upCallback" @init="mescrollInit" :fixed="false" :up="upOption">
				<div class="title-bar">商家概况</div>
				<div class="grid col-4 cu-list">
					<view class="menu-item">
						<view class="num">{{ info.shop.amount || 0 }}</view>
						<view>总收入(纯)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.people_number }}</view>
						<view>购买人数(人)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.order_number }}</view>
						<view>订单总数(单)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.order_qty }}</view>
						<view>总销量(扎)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.ytx_money }}</view>
						<view>已提现(元)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.money }}</view>
						<view>账户余额(元)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.txz_money }}</view>
						<view>提现中(元)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.shop.jsz_money }}</view>
						<view>待入账(元)</view>
					</view>
				</div>
				<div class="title-bar">今日详情</div>
				<div class="grid col-4 cu-list">
					<view class="menu-item">
						<view class="num">{{ info.today.order_total }}</view>
						<view>订单总数(笔)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.today.hc_class }}</view>
						<view>花材种类</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.today.order_qty }}</view>
						<view>销售数量(扎)</view>
					</view>
					<view class="menu-item">
						<view class="num">{{ info.today.order_amount }}</view>
						<view>销售额(元)</view>
					</view>
				</div>
				<div class="title-bar flex justify-between align-center">
					<span>我的订单</span>
					<span class="more" @tap="gotoOrder(0)">
						查看全部
						<text class="cuIcon-right"></text>
					</span>
				</div>
				<div class="grid col-4 cu-list">
					<view class="menu-item" @tap="gotoOrder(0)">
						<view class="imgbox">
							<image src="../../static/shop/delivery@2x.png" mode="widthFix"></image>
							<view class="cu-tag badge" v-if="info.order && info.order.daipeisong > 0">{{ info.order.daipeisong >= 100 ? '99+' : info.order.daipeisong }}</view>
						</view>
						<view>待配送</view>
					</view>
					<view class="menu-item" @tap="gotoOrder(1)">
						<view class="imgbox">
							<image src="../../static/shop/delivery_two@2x.png" mode="widthFix"></image>
							<view class="cu-tag badge" v-if="info.order && info.order.yipeisong > 0">{{ info.order.yipeisong >= 100 ? '99+' : info.order.yipeisong }}</view>
						</view>
						<view>已配送</view>
					</view>
					<view class="menu-item" @tap="gotoOrder(2)">
						<view class="imgbox">
							<image src="../../static/shop/settlement@2x.png" mode="widthFix"></image>
							<view class="cu-tag badge" v-if="info.order && info.order.jiesuanzhong > 0">
								{{ info.order.jiesuanzhong >= 100 ? '99+' : info.order.jiesuanzhong }}
							</view>
						</view>
						<view>结算中</view>
					</view>
					<view class="menu-item" @tap="gotoOrder(3)">
						<view class="imgbox">
							<image src="../../static/shop/completed@2x.png" mode="widthFix"></image>
							<view class="cu-tag badge" v-if="info.order && info.order.yiwancheng > 0">{{ info.order.yiwancheng >= 100 ? '99+' : info.order.yiwancheng }}</view>
						</view>
						<view>已完成</view>
					</view>
				</div>
				<view class="cu-list menu sm-border">
					<view class="cu-item arrow" v-for="(item, index) in menulist" :key="index">
						<view class="content">
							<navigator :url="item.url" hover-class="none">{{ item.name }}</navigator>
						</view>
					</view>
					<view class="cu-item arrow" @tap="exit"><view class="content">退出登录</view></view>
				</view>
			</mescroll-uni>
		</div>
		<tui-actionsheet
			:show="showActionSheet"
			:tips="tips"
			:item-list="itemList"
			:mask-closable="true"
			:is-cancel="true"
			@click="itemClick"
			@cancel="showActionSheet = false"
		></tui-actionsheet>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import tuiActionsheet from '@/components/actionsheet/actionsheet';
export default {
	data() {
		return {
			bgColor: 'nobg',
			switchA: false,
			menulist: [
				{
					url: '/pages/wallet/wallet',
					name: '我的钱包'
				},
				{
					url: '/pages/calclist/calclist',
					name: '结算记录'
				},
				{
					url: '/pages/trade/trade',
					name: '交易查询'
				},
				{
					url: '/pages/customer/customer',
					name: '售后订单'
				},
				{
					url: '/pages/evaluate/evaluate',
					name: '我的评价'
				},
				{
					url: '/pages/checkPwd/checkPwd',
					name: '修改密码'
				}
			],
			info: {
				shop: {},
				today: {},
				order: {
					daipeisong: 0
				}
			},
			upOption: {
				empty: {
					use: false
				}
			},
			showActionSheet:false,
			tips: '退出登录会清除您的登录信息，确认退出吗？',
			itemList: [
				{
					text: '退出登录',
					color: '#e53a37'
				}
			],
		};
	},
	components: {
		tuiActionsheet
	},
	mixins: [MescrollMixin],
	methods: {
		...mapMutations(['uploadSupplierInfo', 'SET_NAVINDEX']),
		downCallback() {
			this.getSupplierInfo();
		},
		SwitchA(e) {
			this.info.supplier_status = e.detail.value ? 1 : 0;
			this.supplierStatus();
		},
		getSupplierInfo() {
			this.$postajax(this.$shopapi.getSupplierInfo).then(da => {
				if (da.code == 0) {
					this.info = da.data;
					this.uploadSupplierInfo(this.info);
				}
				this.mescroll.endSuccess(0, false);
			});
		},
		supplierStatus() {
			this.$postajax(this.$shopapi.supplierStatus);
		},
		supplierinfo() {
			/* 编辑用户信息 */
			let param = {
				supplier_group_id: this.info.supplier_group_id,
				supplier_img: this.info.supplier_img,
				supplier_name: this.info.supplier_name,
				supplier_user_name: this.info.supplier_user_name,
				supplier_user_phone: this.info.supplier_user_phone
			};
			uni.navigateTo({
				url: '/pages/mailinfo/mailinfo?info=' + JSON.stringify(param)
			});
		},
		gotoOrder(type) {
			this.SET_NAVINDEX(type);
			uni.switchTab({
				url: '/pages/orderlist/orderlist'
			});
			// this.$emit('showOrderlist', type);
		},
		exit() {
			/* 退出登录 */
			console.log('点击退出')
			this.showActionSheet=true
		},
		itemClick: function(e) {
			this.showActionSheet = false;
			/* 退出登录 */
			this.logout();
		},
		logout() {
			this.$postajax(this.$api.loginout).then(da => {
				if (da.code == 0) {
					uni.clearStorageSync();
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			});
		},
	}
};
</script>

<style lang="scss">
.pageview {
	height: 100vh;
	overflow: hidden;
	position: relative;
}

.pageview .main {
	overflow: auto;
	-webkit-overflow-scrolling: touch;
}

.bg {
	width: 100%;
	position: absolute !important;
	top: 0;
	left: 0;
	z-index: 0;
}

.mailInfo {
	color: #717171;
	font-size: 26upx;
	padding: 24upx;
	margin: 35upx 30upx 0;
	background: #fff;
	box-shadow: 0px 2upx 6upx 0px rgba(26, 170, 104, 0.27);
	border-radius: 12upx;
	z-index: 1;
	position: relative;

	.imgbox {
		width: 140upx;
		height: 140upx;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #19a967;
		margin-right: 25upx;

		image {
			width: 102%;
			height: 102%;
		}
	}

	.name {
		color: #323232;
		font-size: 34upx;
		margin-bottom: 23upx;
	}

	p + p {
		margin-top: 15upx;
	}

	.edit {
		position: absolute;
		color: #bcbcbc;
		top: 35upx;
		right: 20upx;

		image {
			width: 34upx;
			vertical-align: middle;
		}

		text {
			vertical-align: middle;
			margin-right: 5upx;
		}
	}

	.state {
		position: absolute;
		right: 24upx;
		bottom: 20upx;

		text {
			margin-right: 17upx;
		}

		.green {
			color: #19a967;
		}
	}
}

.title-bar {
	color: #19a967;
	font-size: 32upx;
	position: relative;
	padding: 30upx;

	&:before {
		background: #19a967;
		width: 10upx;
		height: 40upx;
		border-radius: 5upx;
		display: block;
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	&:after {
		content: '';
		display: block;
		height: 1px;
		position: absolute;
		left: 30upx;
		bottom: 0;
		background: #eee;
		transform: scaleY(0.5);
		right: 0;
	}

	.more {
		color: #545454;
		font-size: 26upx;
	}
}

.cu-list.grid {
	.menu-item {
		color: #a2a2a2;
		font-size: 24upx;
		padding: 30upx 0;
		position: relative;

		.num {
			color: #2e302f;
			font-size: 44upx;
			margin-bottom: 10upx;
		}

		.imgbox {
			position: relative;
			width: 48upx;
			margin: 0 auto 10upx;
		}

		image {
			width: 48upx;
		}
	}
}
</style>
