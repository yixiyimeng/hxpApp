import $http from '@/config/requestConfig'
import {
	basePath
} from '@/utils/index.js'

function JsontoForm(params) {
	let str = [];
	for (let key in params) {
		str.push(key + "=" + params[key])
	}
	return str.join('&');

}
export const api = {
	getOpenid: '/api/member/session_key/', //获取openid
	login: '/api/member/login',
	wxlogin: '/api/member/login/3',//H5 登录
	getcode: '/api/sms/', //获取验证码
	decrypt: '/api/member/decrypt', //获取手机号码
	getUserinfo: '/api/member/userinfo', //获取用户信息
	updateUserInfo: '/api/member/update', //更新用户信息
	getaddr: '/api/member/address/index', //获取地址列表
	addAddr: '/api/member/address/add', //新增用户地址
	getCateList: '/api/member/product/class', //产品分类获取
	getProductList: '/api/member/product/index/', //获取产品
	getProductSupplierList: '/api/member/product/show/', //获取产品供应商
	setdefaultAddr: '/api/member/address/default/', //设置默认地址
	editAddr: '/api/member/address/edit/', //编辑用户地址
	delAddr: '/api/member/address/delete/', //删除用户地址
	getIndexProductList: '/api/member/product/',
	addFollow: '/api/member/follow/add/product/', //添加产品关注
	delFollow: '/api/member/follow/delete/product/', //取消关注 产品页
	productFollowList: '/api/member/follow/product', //产品关注列表
	shopFollowList: '/api/member/follow/supplier', //店铺关注列表
	delFollowbylist: '/api/member/follow/delete/', //取消关注 关注页
	getProductEvaluate: '/api/member/product/evaluate/', //获取商品评价
	getSupplierInfo: '/api/member/supplier/', //获取商品信息
	delSupplierFollow: '/api/member/follow/delete/supplier/', //店铺关注取消（店铺界面）
	addSupplierFollow: '/api/member/follow/add/supplier/', //店铺关注添加
	addSupplierProductList: '/api/member/supplier/product/', //店铺产品
	addcar: '/api/member/cart/increase/', //添加购物车
	getCar: '/api/member/cart/index', //获取购物车
	deleteCar: '/api/member/cart/delete', //购物车产品删除（支持批量删除）
	delCar: '/api/member/cart/decrease/', //减少购物车
	inputCar: '/api/member/cart/setout/', //输入商品数量
	getTransport: '/api/member/transport', //获取运输方式
	calcOrder: '/api/member/order/calc', //订单计算
	submitOrder: '/api/member/order/submit', //订单提交	
	getorderlist: '/api/member/order/index', //订单列表
	buttonPay: '/api/member/order/pay/', //确认支付,
	orderClose: '/api/member/order/close/', //订单取消
	orderShow: '/api/member/order/show/', //订单查看
	orderDelete: '/api/member/order/delete/', //订单删除
	orderAftersale: '/api/member/order/aftersale/', //待收货订单内产品申请售后
	orderEvaluate: '/api/member/order/evaluate/', //订单评价
	orderConfirm: '/api/member/order/confirm/', //确认收货
	feedback: '/api/member/feedback', //留言反馈
	getaftersaleList: '/api/member/order/showaftersale', //售后订单列表
	getevaluateList: '/api/member/order/showevaluate', //评价订单列表
	loginout: '/api/member/loginout', //退出登录
	getmoney: '/api/member/money/more', //会员余额明细
	getscore: '/api/member/score', //会员积分明细
	getfreshbean: '/api/member/freshbean/more', //会员鲜豆明细
	exchangeMoney: '/api/member/freshbean/exchange', //鲜豆兑换余额
	tixian: '/api/member/tixian', //用户提现申请
	gettixianList: '/api/member/tixian', //用户提现明细
	getBusinessInfo: '/api/system/business', //获取营业时间和是否营业
	getIndexBanner: '/api/system/ad', //获取首页轮播图
	getNotice: '/api/system/notice', //获取公告
	getArticleList: '/api/system/article', //获取文章列表
	getArticleDetail: '/api/system/article/', //获取文章详情
	getOneArticle: '/api/system/article', //获取单个文章
	getkf: '/api/system/kf', //获取客服
	businesstime:'/api/system/business',//营业时间查询
	getJsSign:'/api/weixin/share',
	getOpenidbyCode:'/api/weixin/userinfo/'
}
export const shopapi = {
	applySupplier: '/api/supplier/apply', //post申请入驻或者get申请入驻状态获取
	upload: basePath + '/api/upload/uploader', //上传图片
	getCate: '/api/supplier/product/class', //获取产品分类
	getProductlist: '/api/supplier/product/index', //获取产品列表
	addProduct: '/api/supplier/product/add', //添加商品或者查询下拉筛选
	productStatus: '/api/supplier/product/status/', //产品上下架
	editProduct: '/api/supplier/product/edit/', //编辑产品
	delProduct: '/api/supplier/product/delete/', //删除商品
	getSupplierInfo: '/api/supplier/index', //获取店铺信息
	supplierStatus: '/api/supplier/status', //是否营业
	getOrderlist: '/api/supplier/order/index', //订单
	orderDetails: '/api/supplier/order/show/', //订单详情
	totalOrder: '/api/supplier/product/total', //订单汇总
	sendOrder: '/api/supplier/order/ps/', //订单配送
	cancelOrder: '/api/supplier/order/ps_close/', //取消配送
	getAftersalelist: '/api/supplier/aftersale/', //售后订单列表
	getCalcOrderlist: '/api/supplier/jiesuan', //计算记录
	getevaluateList: '/api/supplier/evaluate', //评价列表
	gettradelist: '/api/supplier/jiaoyi', //交易记录查询
	myWallet: '/api/supplier/qianbao', //我的钱包
	cashout: '/api/supplier/tixian', //商家提现申请
	cashoutlist: '/api/supplier/tixian/', //提现明细
	applyProductSales: '/api/supplier/product/product_sales/', //申请特价
	cancelapply: '/api/supplier/product/product_sales_close/',
	supplierlogin:'/api/member/login/4',//商家登录
}
export function getajax(url, params) {
	return $http.get(url, {
		params
	})
}
export function postajax(url, params) {
	// let myparams = JsontoForm(params);
	return $http.post(url, params)
}
