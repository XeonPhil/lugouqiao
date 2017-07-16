var app = getApp()
Page({
  data: {
    navbar: ['未反馈', '已反馈'],
    currentTab: 0,
    logs1: [],
    index: 0
  },
  navbarTap: function (e) {
    //      console.log(1);
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
  },
    toast: function () {
    wx.navigateTo({
      url: '../change_huifu/change_huifu'
    })
  }
})  