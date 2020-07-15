<template>
	<div class="splash">
		<image src="../../static/bg1.png" alt="" class="bg1" mode="widthFix" />
		<image src="../../static/bg2.png" alt="" class="bg2" mode="widthFix" />
		<image src="../../static/clock.png" alt="" class="clock" />
		<div>
			<div class="title">下单发货时间提醒</div>
			<div class="subtitle">TIME REMINDER</div>
			<div class="time">
				<image src="../../static/num1.png" alt="" mode="widthFix" />
				<div>第一场</div>
				<ul>
					<li class="uni-flex flex-pack-justify">
						<span>交易时间:</span>
						<span>{{ info.one_start || '' }}~{{ info.one_end || '' }}</span>
					</li>
					<li class="uni-flex flex-pack-justify">
						<span>发货时间:</span>
						<span>{{ info.one_fh || '' }}</span>
					</li>
					<!-- <li class="uni-flex flex-pack-justify">
					<span>到货时间:</span>
					<span>{{info.||''}}</span>
				</li> -->
				</ul>
			</div>
			<div class="time">
				<image src="../../static/num2.png" alt="" mode="widthFix"/>
				<div>第二场</div>
				<ul>
					<li class="uni-flex flex-pack-justify">
						<span>交易时间:</span>
						<span>{{ info.two_start || '' }}~{{ info.two_end || '' }}</span>
					</li>
					<li class="uni-flex flex-pack-justify">
						<span>发货时间:</span>
						<span>{{ info.two_fh || '' }}</span>
					</li>
					<!-- <li class="uni-flex flex-pack-justify">
					<span>到货时间:</span>
					<span>{{openHours.after.dhtime||''}}</span>
				</li> -->
				</ul>
			</div>
			<div class="btn" @click="show">我知道了</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	components: {},

	data() {
		return {
			openHours: {
				morning: {},
				after: {}
			},
			info: {},
			shareUrl:''
		};
	},

	onShow() {
		// #ifdef H5
		this.$getJsSign(this.shareUrl);
		// #endif
	},
	onLoad(options) {
		let recommenderId = '';
		console.log(JSON.stringify(options));
		if (options && options.recommenderId) {
			recommenderId = options.recommenderId;
		}
		if (options && options.scene) {
			let scene = decodeURIComponent(options.scene);
			//&是我们定义的参数链接方式
			recommenderId = scene && scene != 0 ? scene : '';
			//其他逻辑处理。。。。。
		}
		console.log('recommenderId' + recommenderId);
		if (recommenderId) {
			this.SET_INVITED(recommenderId);
		}
		this.getsetting();
		let shareUrl = '/pages/splash/splash';
		if (this.memberId) {
			shareUrl += '?recommenderId=' + this.memberId;
		}
		this.shareUrl = shareUrl;
	},
	methods: {
		...mapMutations(['SET_INVITED']),
		show() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		getsetting() {
			this.$postajax(this.$api.businesstime).then(da => {
				console.log(da)
				if (da.code == 0) {
					this.info = da.data;
				}
			});
		}
	}
};
</script>

<style lang="scss">
/* .uni-page-body{
		height: 100%;
	} */
$bgcolor: #fb753b;

.splash {
	position: relative;
	height: 100%;
	line-height: 1.8;
	padding-top: 180upx;
	box-sizing: border-box;
	& > div {
		position: relative;
		z-index: 1;
	}
}

.bg1 {
	position: absolute;
	top: 0;
	right: 0;
	width: 434upx;
}

.bg2 {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 446upx;
	z-index: 0;
}

.clock {
	width: 143upx;
	height: 143upx;
	display: block;
	margin: 0 auto;
}

.title {
	text-align: center;
	color: #ff554b;
	font-size: 40upx;
}

.subtitle {
	text-align: center;
	color: #ff9ca3;
	font-size: 26upx;
}

.time {
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(251, 117, 59, 0.5);
	width: 80%;
	background: #fff;
	margin: 30rpx auto 0;
	color: #ff554b;
	padding: 20upx 40upx 30upx;
	position: relative;
}

.time ul li span:last-child {
	color: #414141;
}

.time div {
	text-align: center;
	font-size: 44upx;
	padding-top: 40upx;
}

.time image {
	position: absolute;
	width: 132upx;
	height: 88upx;
	left: 50%;
	transform: translateX(-50%);
}

.btn {
	color: #fff;
	background: $bgcolor;
	border-radius: 50upx;
	width: 70%;
	margin: 45upx auto;
	line-height: 92upx;
	text-align: center;
	font-size: 30upx;
}
</style>
