 var app = getApp()
Page({  
  data: {  
    navbar: ['发布留言', '留言反馈'],  
    currentTab: 0,
    logs1:[],  
    text:'',
    inputMsg:'',
    //array: ['陈伟', '雷玲', '于瀛', '蓝善祯', '徐品'],
    flag: 0,
    array:''
    },
    onLoad:function()
    {
      this.getdata();
      this.getteacher();
    },
    bindPickerChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        flag: e.detail.value
      })
    },
    navbarTap: function (e) {
//      console.log(1);
      this.setData({
        currentTab: e.currentTarget.dataset.idx,
        })
        },
    getdata:function () {
      var that = this;
      wx.request({
        url: 'https://xeonphil.top/message/pull/o4_bmasdasdsad6_4sgVt7hMZOPfL',
        data:{},
        method:'GET',
        success:function(res){
          //console.log(res.data);
          that.setData({
            logs1:res.data
          })
          console.log(res.data);
        },
        fail:function(err){}
      })
    },
    getteacher: function () {
      var that = this;
      wx.request({
        url: 'https://xeonphil.top/user/pull-accessible-teachers/o4_bmasdasdsad6_4sgVt7hMZOPfL',
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          that.setData({
            array: res.data
          })
        },
        fail: function (err) { }
      })
    },
    charchange:function(e){
      this.setData({
        inputMsg:e.detail.value
      })
      console.log(this.data.inputMsg)
    },  
    msgSubmit: function(e){
      this.setData({
        inputMsg:this.data.inputMsg,
      })
      var that = this;
      wx.request({
        url: 'https://xeonphil.top/message/push/o4_bmasdasdsad6_4sgVt7hMZOPfL/idsh6jxhjc6jvxvnjrnnc82bch6vk',
//        header: { "Content-Type": "application/json"},
        data: {text: this.data.inputMsg},
        method: 'POST',
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      this.getdata();
    }
        })  