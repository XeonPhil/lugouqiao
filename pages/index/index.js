//index.js
//获取应用实例
//index1和index3可共用优化
var app = getApp()
Page({
  data: {
    array: ['老师', '学生'],
    Xiarray: ['数字媒体技术', '广播电视工程','自动化'],
    index:0,
    index1:0,
    majorName:'',
    classIndex:0,
    currentTab:0,
    inputname:'',
    student_id:'',
    majorNameGroup:{},
    classGroup:[],
    acGroup_num:0,
  },
  onShow: function(options) {
           // Do some initialize when page load
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
  bindClassChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
       index3: e.detail.value, 
    })
  },
  bindMajorChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
    })
  },

  bindXiChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      index1: e.detail.value,
    })
  },
  InputName: function (e) {
    this.setData({
      inputname: e.detail.value
    }),
    console.log(this.data.inputname)
  },  
  Input_stuid:function(e){
    this.setData({
      student_id:e.detail.value
    }),
    console.log(this.data.student_id)
  },
  bindSubmit_tea: function (e) {
    var that = this;
    console.log(that.data);
    wx.login({
      success: function (res) {
        wx.request
        ({
          url: 'https://xeonphil.top/user/add-teacher',
          method:'POST',
          data: {
            code: res.code,
            name: that.data.inputname,
            major: that.data.acGroup[that.data.index1].major,
            },
            success: function (){
              wx.navigateTo({
                url: '../LoginSucess/LoginSucess',
                })
                },
            fail: function(err){
              wx.showToast({
                title: '已注册，请登录！',
                icon: 'succcess',
                duration: 2000 
                })
                }    
          })
        }
    })
  },
  bindSubmit_stu: function (e) {
    var that = this;
    console.log(that.data);
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://xeonphil.top/user/add-student',
          method: 'POST',
          data: {
            code: res.code,
            name: that.data.inputname,
            major: that.data.acGroup[that.data.index2].major,
            student_id:that.data.student_id
            },
          success: function () {
            wx.navigateTo({
              url: '../LoginSucess/LoginSucess',
            })
          },
          fail: function (err) { }
        })
      }
    })
  },
  getAcgroup:function(){
    var that = this;
    wx.request({
      url: 'https://xeonphil.top/group/administrative-class',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res.data.length);
        console.log(res.data);
        var classDict = {}
//        console.log('新的返回格式:'+majorArray)
        that.setData({
          majorNameGroup: Object.keys(res.data),
//          majorNameGroup: res.data,
          classGroup:classDict[that.data.majorName],
          majorName: Object.keys(res.data)[1],
          classIndex:1
        })
      },
      fail: function (err) { }
    })
    /*that.setData({
      'Xarray': that.data.Xarray.push(acGroup[0].groupname)
      });*/
  },
  onLoad: function () {
    console.log('onLoad')
    this.getAcgroup();
    console.log(this.data.acGroup);
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
