<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
				/* 计算一下 宽高比例 */
				e.windowHeight / 750;
			}
		});
	},

	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';

image {
	height: auto;
}

page {
	height: 100%;
	background: #fff;
}

button::after {
	border: none;
}

.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0px 40upx 0px;
	justify-content: space-between;
}

.nav-li {
	padding: 30upx;
	border-radius: 12upx;
	width: 45%;
	margin: 0 2.5% 40upx;
	background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: '';
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10upx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-title {
	font-size: 32upx;
	font-weight: 300;
}

.nav-title::first-letter {
	font-size: 40upx;
	margin-right: 4upx;
}

.nav-name {
	font-size: 28upx;
	text-transform: Capitalize;
	margin-top: 20upx;
	position: relative;
}

.nav-name::before {
	content: '';
	position: absolute;
	display: block;
	width: 40upx;
	height: 6upx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: '';
	position: absolute;
	display: block;
	width: 100upx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40upx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36upx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30upx;
	top: 30upx;
	font-size: 52upx;
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
}

.text-light {
	font-weight: 300;
}

@keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

@-webkit-keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

.text-orange {
	color: #fc743c;
}

.submitBtn,
.cancelBtn,
.defaultBtn {
	width: 690upx;
	height: 100upx;
	background: #19a967;
	
	border-radius: 12upx;
	color: #fff;
	text-align: center;
	font-size: 36upx;
	line-height: 100upx;
	margin: 30upx auto;
}
.submitBtn{
	box-shadow: 0 9upx 27upx 0 rgba(25, 169, 103, 0.58);
}
.cancelBtn {
	background: #f0f0f0;
	color: #fc743c;
}

.defaultBtn {
	background: #d5d5d5;
}

.text-red {
	color: #e03d3e;
}

.modalbtn {
	color: #fff;
	font-size: 30upx;
	line-height: 100upx;
	text-align: center;
	background: #fc743c;
}
</style>
<style lang="scss">
.tablebox {
	padding: 30upx;
	color: #434040;
	font-size: 26upx;

	.table {
		border: 1px solid #dbdbdb;
		text-align: center;

		.table-hd,
		.table-bd .table-td,
		.table-ft {
			align-items: stretch;

			span {
				width: 93upx;
				padding: 25upx 0;

				&:first-child {
					width: 130upx;
				}

				& + span {
					border-left: 1px solid #dbdbdb;
				}
			}
		}

		.table-hd {
			border-bottom: 1px solid #dbdbdb;
			height: 75upx;
			background: #eefff7;
			color: #19a967;
			font-size: 28upx;
			font-weight: bold;
		}

		.table-bd .table-td {
			color: #6c6c6c;
			font-size: 25upx;

			& + .table-td {
				border-top: 1px solid #dbdbdb;
			}

			&:nth-child(even) {
				background: #f9f9f9;
			}
		}

		.table-bd {
			border-bottom: 1px solid #dbdbdb;
		}

		.table-ft {
			color: #fd3c3e;
			font-size: 26upx;

			height: 74upx;

			.text-right {
				color: #2e2e2e;
				font-size: 28upx;
				font-weight: bold;
				padding-right: 54upx;
				color: #2e2e2e;
			}
		}
	}
}

/* 表单样式 */
.orderinfo {
	.addrbox {
		font-size: 26upx;
		color: #000;
		position: relative;
		padding-left: 120upx;

		.name {
			font-size: 28upx;
			font-weight: bold;
			margin-right: 28upx;
		}

		.addr {
			width: 26upx;
			margin-right: 60upx;
			position: absolute;
			bottom: 0;
			left: 58upx;
		}

		.arrow {
			width: 17upx;
		}
	}
}

.cu-modal.top-modal::before {
	vertical-align: top;
}

.cu-modal.top-modal .cu-dialog {
	width: 100% !important;
	border-radius: 0;
}

.cu-modal.top-modal {
	margin-top: -1000upx;
}

.cu-modal.top-modal.show {
	margin-top: 0;
}

.cu-modal.bottom-modal {
	.cu-dialog {
		width: 100% !important;
	}
}
</style>
