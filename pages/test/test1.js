// var app = getApp()
Page({  
  data: {  
    navbar: ['发布留言', '留言反馈'],  
    currentTab: 0,
    logs1:[],  
    text:'',
    inputMsg:'',
    //array: ['陈伟', '雷玲', '于瀛', '蓝善祯', '徐品'],
    flag: 0,
    teacher_arr:[],
    pick_arr:'',
//    session_key_b: 'd8f9f971a6914a9e8f006716cd4838bc'
    session_key_b:''
    },
    onLoad:function(options)
    {
/*      this.setData({
        session_key_b:options.skb
      }),*/
      var that=this;
      wx.getStorage({
        key: 'session_key_b',
        success: function (res) {
          console.log(res.data)
          that.setData({
            session_key_b:res.data
          })
          console.log('11111111111111')
        }
      })
      this.getdata_stu();
      this.getteacher();
    },
    bindPickerChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        flag: e.detail.value
      })
    },
    navbarTap: function (e) {
      this.setData({
        currentTab: e.currentTarget.dataset.idx,
        })
        },
    getdata_stu:function () {
      var that = this;
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://xeonphil.top/message/all/sent/'+that.data.session_key_b,
            data:{},
            method:'GET',
            success:function(res){
              //console.log(res.data);
              that.setData({
                logs1:res.data
              })
              //console.log(res.data);
            },
            fail:function(err){}
          })
        }
      })
    },
    getteacher: function () {
      var that = this;
      wx.login({
        success: function (res) {
          console.log(that.data.session_key_b)
          wx.request({
            url: 'https://xeonphil.top/user/pull-accessible-teachers/'+that.data.session_key_b,
            data: {},
            method: 'GET',
            success: function (res) {
              that.setData({
                teacher_arr: res.data
              })
              //console.log(res.data);
            },
            fail: function (err) { }
          })          
        }
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
        teacher_arr:this.data.teacher_arr,
      })
      console.log(this.data);
      var index=this.data.flag;
      console.log(index);
      var that = this;
      wx.request({
        url: 'https://xeonphil.top/message/push',
//        header: { "Content-Type": "application/json"},
        data: { text: this.data.inputMsg,          
                session_key_b:that.data.session_key_b,
                receiverUID: this.data.teacher_arr[index].UID,
              },
        method: 'POST',
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      this.getdata_stu();
    }
        })  