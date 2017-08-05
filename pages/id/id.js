const APP_ID ='wxac1aca1ac555851a';//输入小程序appid
const APP_SECRET ='89458e7f1a93433b90f11789717013da';//输入小程序app_secret
var OPEN_ID=''//储存获取到openid
var SESSION_KEY=''//储存获取到session_key
Page({
  getOpenIdTap:function(){
    var that=this;
    wx.login({
      success:function(res){
        var l = 'https://xeonphil.top/message/pull/n';
        wx.request({
            //获取openid接口
          url: l,
          data:{
            appid:APP_ID,
            secret:APP_SECRET,
            js_code:res.code,
            grant_type:'authorization_code'
          },
          method:'GET',
          success:function(res){
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid
            SESSION_KEY = res.data.session_key;//获取到session_key
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
              session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            })
          }
        })
      }
    })
  }
})