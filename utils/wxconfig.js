var wx = require('jweixin-module');
import Vue from 'vue'
import {
	postajax,
	api,
	getajax,
	shopapi
} from "@/utils/api"
export const APPID = 'wx6b82dfff1fff3454'
export function getJsSign(shareLink, shareTitle, shareDesc, shareimgUrl) {
	postajax(api.getJsSign, {
		url: window.location.href
	}).then(da => {
		console.log(da);
		if (da.code == 0) {
			var obj = da.data;
			wx.config({
				debug: false,
				appId: APPID,
				timestamp: obj.timestamp,
				nonceStr: obj.noncestr,
				signature: obj.signature,
				jsApiList: ['chooseWXPay', 'updateAppMessageShareData', 'updateTimelineShareData']
			});
			wx.ready(function() {
				shareTitle = shareTitle || '花比三家';
				shareDesc = shareDesc || '花比三家,花店老板都在用';
				shareLink = shareLink?('https://m.huaxianpai.com/zj' + shareLink) :'https://m.huaxianpai.com/zj/';
				shareimgUrl = shareimgUrl || 'http://img-cdn-hbsj.veimx.com/upload/images/20200609/15916555707292.jpg';
				shareFn(shareLink, shareTitle, shareDesc, shareimgUrl);
			});
		}
	});
}
/* 分享 */
export function shareFn(shareLink, shareTitle, shareDesc, shareimgUrl) {
	/* 分享到朋友圈 */
	wx.updateAppMessageShareData({
		title: shareTitle, // 分享标题
		desc: shareDesc, // 分享描述
		link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: shareimgUrl, // 分享图标
		success: function() {
			// 设置成功
			console.log("分享")
			// userShare()
		}
	})
	/* 分享到朋友 */
	wx.updateTimelineShareData({
		title: shareTitle, // 分享标题
		desc: shareDesc, // 分享描述
		link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: shareimgUrl, // 分享图标
		success: function() {
			// 设置成功
			console.log("分享")
			// userShare()
		}
	})
}
export default {
	getJsSign,
	APPID
}
