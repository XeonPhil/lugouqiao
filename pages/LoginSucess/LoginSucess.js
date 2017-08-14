// LoginSucess.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_key_b:'i'
  },
  bindSubmit: function (e) {
    var that=this;
    wx.switchTab({
//    wx.navigateTo({   
      url: '../test/test1'
    })
    console.log(that.data.session_key_b)
  },
  onLoad:function(options){
    var that=this;
    console.log('onloadls')
    this.setData({
      session_key_b: options.session_key_b
    });
    wx.setStorage({
      key: "session_key_b",
      data: that.data.session_key_b
    })
//    console.log(that.data.session_key_b)
  }
})