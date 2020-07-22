(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"08da":function(t,a,n){},"20f3":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar||20,CustomBar:this.CustomBar||60}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,u="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(n,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("6e42")["default"])},"4c04":function(t,a,n){"use strict";var u=n("08da"),e=n.n(u);e.a},"5d5e":function(t,a,n){"use strict";n.r(a);var u=n("20f3"),e=n.n(u);for(var c in u)"default"!==c&&function(t){n.d(a,t,function(){return u[t]})}(c);a["default"]=e.a},"69bb":function(t,a,n){"use strict";n.r(a);var u=n("d728"),e=n("5d5e");for(var c in e)"default"!==c&&function(t){n.d(a,t,function(){return e[t]})}(c);n("4c04");var o=n("2877"),r=Object(o["a"])(e["default"],u["a"],u["b"],!1,null,null,null);a["default"]=r.exports},d728:function(t,a,n){"use strict";var u=function(){var t=this,a=t.$createElement;t._self._c},e=[];n.d(a,"a",function(){return u}),n.d(a,"b",function(){return e})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("69bb"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);                
