(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addgoods/addgoods"],{3702:function(t,i,o){"use strict";o.r(i);var n=o("8935"),d=o.n(n);for(var u in n)"default"!==u&&function(t){o.d(i,t,function(){return n[t]})}(u);i["default"]=d.a},"44c5":function(t,i,o){},"534d":function(t,i,o){"use strict";var n=function(){var t=this,i=t.$createElement;t._self._c},d=[];o.d(i,"a",function(){return n}),o.d(i,"b",function(){return d})},"60ad":function(t,i,o){"use strict";var n=o("44c5"),d=o.n(n);d.a},8935:function(t,i,o){"use strict";(function(t,n){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var d=function(){return Promise.all([o.e("common/vendor"),o.e("components/yq-avatar/yq-avatar")]).then(o.bind(null,"3c61"))},u={data:function(){return{catename:"",info:{product_id:"",img_url:[]},radio:"no",imgList:[],optionlist:{},product_dengji:-1,product_guige:-1,product_quedian:-1,product_youdian:-1,product_changdu:-1,product_chengshudu:-1,product_color:-1,goodsid:""}},components:{avatar:d},created:function(){this.getoption()},onLoad:function(t){t.id&&(this.info.product_id=t.id),t.catename&&(this.catename=t.catename),t.goodsid&&(this.goodsid=t.goodsid)},methods:{doBefore:function(){},doUpload:function(t){this.uploadImg(t.path)},upload:function(){this.$refs.avatar.fChooseImg("",{selWidth:"600upx",selHeight:"600upx",expWidth:"1500upx",expHeight:"1500upx",inner:"true"})},uploadImg:function(i){var o=this;t.uploadFile({url:this.$shopapi.upload,filePath:i,name:"file",success:function(i){var n=JSON.parse(i.data).data.src;o.imgList.push(n),t.showLoading({title:"正在上传"}),setTimeout(function(){t.hideLoading()},300)}})},ViewImage:function(i){t.previewImage({urls:this.imgList,current:i.currentTarget.dataset.url})},DelImg:function(i){var o=this;t.showModal({title:"删除",content:"确定要删除这张图片吗？",success:function(t){t.confirm&&o.imgList.splice(i.currentTarget.dataset.index,1)}})},PickerChangedengji:function(t){this.product_dengji=t.detail.value>=0?t.detail.value:0,this.info.product_dengji=this.optionlist.dengji[this.product_dengji].id},PickerChangeguige:function(t){this.product_guige=t.detail.value>=0?t.detail.value:0,this.info.product_guige=this.optionlist.guige[this.product_guige].id},PickerChangechangdu:function(t){this.product_changdu=t.detail.value>=0?t.detail.value:0,this.info.product_changdu=this.optionlist.changdu[this.product_changdu].id},PickerChangecolor:function(t){this.product_color=t.detail.value>=0?t.detail.value:0,this.info.product_color=this.optionlist.color[this.product_color].id},PickerChangeyoudian:function(t){this.product_youdian=t.detail.value>=0?t.detail.value:0,this.info.product_youdian=this.optionlist.youdian[this.product_youdian].id},PickerChangequedian:function(t){this.product_quedian=t.detail.value>=0?t.detail.value:0,this.info.product_quedian=this.optionlist.quedian[this.product_quedian].id},PickerChangechengshudu:function(t){this.product_chengshudu=t.detail.value>=0?t.detail.value:0,this.info.product_chengshudu=this.optionlist.chengshudu[this.product_chengshudu].id},RadioChange:function(t){this.radio=t.detail.value},getoption:function(){var t=this;this.$getajax(this.$shopapi.addProduct).then(function(i){console.log(n(i," at pages\\addgoods\\addgoods.vue:274")),0==i.code&&(t.optionlist=i.data,t.goodsid&&t.getProductInfo())})},addProduct:function(){var i=Object.assign({},this.info,{img_url:this.imgList});console.log(n(i," at pages\\addgoods\\addgoods.vue:288"));var o=this.$shopapi.addProduct;this.goodsid&&(o=this.$shopapi.editProduct+this.goodsid),this.$postajax(o,i).then(function(i){console.log(n(i," at pages\\addgoods\\addgoods.vue:294")),0==i.code&&setTimeout(function(){t.navigateBack({delta:1})}),t.showToast({title:i.msg,icon:"none"})})},getProductInfo:function(){var t=this;this.$getajax(this.$shopapi.editProduct+this.goodsid).then(function(i){0==i.code&&(t.info=i.data,t.catename=t.info.class_name_,t.imgList=JSON.parse(t.info.img_url),t.product_dengji=t.optionlist.dengji.findIndex(function(i){return i.id==t.info.product_dengji}),t.product_guige=t.optionlist.guige.findIndex(function(i){return i.id==t.info.product_guige}),t.product_quedian=t.optionlist.quedian.findIndex(function(i){return i.id==t.info.product_quedian}),t.product_youdian=t.optionlist.youdian.findIndex(function(i){return i.id==t.info.product_youdian}),t.product_changdu=t.optionlist.changdu.findIndex(function(i){return i.id==t.info.product_changdu}),t.product_chengshudu=t.optionlist.chengshudu.findIndex(function(i){return i.id==t.info.product_chengshudu}),t.product_color=t.optionlist.color.findIndex(function(i){return i.id==t.info.product_color}))})}}};i.default=u}).call(this,o("6e42")["default"],o("0de9")["default"])},9724:function(t,i,o){"use strict";o.r(i);var n=o("534d"),d=o("3702");for(var u in d)"default"!==u&&function(t){o.d(i,t,function(){return d[t]})}(u);o("60ad");var e=o("2877"),a=Object(e["a"])(d["default"],n["a"],n["b"],!1,null,null,null);i["default"]=a.exports}},[["4329","common/runtime","common/vendor"]]]);