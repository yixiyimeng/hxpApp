(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/shop/cate"],{"1cd2":function(t,n,e){"use strict";e.r(n);var i=e("ee26"),o=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,function(){return i[t]})}(c);n["default"]=o.a},"6b16":function(t,n,e){"use strict";var i=e("c7f5"),o=e.n(i);o.a},c7f5:function(t,n,e){},da54:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return o})},ee26:function(t,n,e){"use strict";(function(t,e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{switchA:0}},props:{info:{type:Object,default:{}}},components:{},watch:{info:{handler:function(t,n){this.switchA=t.status},immediate:!0}},methods:{SwitchA:function(t){this.switchA=t.detail.value,this.$postajax(this.$shopapi.productStatus+this.info.id).then(function(t){})},edit:function(){t.navigateTo({url:"/pages/addgoods/addgoods?goodsid="+this.info.id})},del:function(){var n=this;t.showModal({title:"删除",content:"您确定删除这件商品吗？",success:function(t){t.confirm?n.$postajax(n.$shopapi.delProduct+n.info.id).then(function(t){0==t.code&&n.$emit("upload")}):t.cancel&&console.log(e("用户点击取消"," at components\\shop\\cate.vue:92"))}})},apply:function(){2==this.info.type?this.$emit("applyPrice",this.info.id):1==this.info.type&&this.cancelapply()},cancelapply:function(){var n=this;t.showModal({title:"",content:"你确定要取消特价申请吗？",success:function(t){t.confirm?n.$postajax(n.$shopapi.cancelapply+n.info.id).then(function(t){0==t.code&&n.$emit("upload")}):t.cancel&&console.log(e("用户点击取消"," at components\\shop\\cate.vue:120"))}})},editprice:function(t,n){this.$emit("editprice",t,n)}}};n.default=i}).call(this,e("6e42")["default"],e("0de9")["default"])},f65e:function(t,n,e){"use strict";e.r(n);var i=e("da54"),o=e("1cd2");for(var c in o)"default"!==c&&function(t){e.d(n,t,function(){return o[t]})}(c);e("6b16");var a=e("2877"),s=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,null,null);n["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/shop/cate-create-component',
    {
        'components/shop/cate-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("f65e"))
        })
    },
    [['components/shop/cate-create-component']]
]);                