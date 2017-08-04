//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    array: ['老师', '学生'],
    Xiarray: ['数字媒体技术', '广播电视工程','自动化'],
    classrray: ['2014级数字媒体技术1班', '2014级数字媒体技术2班'],
    index: 0,
    index1:0,
    index2:0,
    currentTab:0
  },
  onShow: function (options) {
    // Do some initialize when page load.
    wx.showToast({
      title: '请先注册',
      icon: 'success',
      duration: 2000
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      currentTab: e.detail.value
    })
  },
  bindXiChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      index1: e.detail.value,
    })
  },
  bindClassChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      index2: e.detail.value,
    })
  },
  bindSubmit: function (e) {
    wx.navigateTo({
      url: '../LoginSucess/LoginSucess',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
