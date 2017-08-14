//index.js
//获取应用实例
//index1和index3可共用优化
var app = getApp()
Page({
  data: {
    array: ['老师', '学生'],
    Xiarray: ['数字媒体技术', '广播电视工程','自动化'],
    index:0,
    xiIndex:0,
    xiName:'请选择任教专业',
    majorIndex:0,
    majorName:'',
    classIndex:0,
    currentTab:0,
    inputname:'',
    student_id:'',
    majorNameGroup:{},
    classNameGroup:[],
    classGroup:{},
    acGroup_num:0,
    classDict:{},
    className:'',
    majorGroupid:'',
    xiGroup:{}
  },
  onShow: function(options) {
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
      classIndex: e.detail.value, 
    })
    this.getAcgroup();
  },
  bindMajorChange: function (e) {
    this.setData({
      majorIndex: e.detail.value,      
      classIndex: 0, 
    }),
      this.getAcgroup();
  },

  bindXiChange: function (e) {
    var that=this;
    this.setData({
      xiIndex: e.detail.value,
      xiName: that.data.majorNameGroup[e.detail.value],
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
            major:that.data.xiGroup[that.data.majorName],
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
            major:that.data.majorGroupid,
            student_id:that.data.student_id
            },
          success: function (res) {
            //var app = getApp();
            //app.session_key_b = res.data['session_key_b'];
            wx.navigateTo({
              url: '../LoginSucess/LoginSucess?session_key_b=' + res.data['session_key_b'],
            })
            console.log(res.data['session_key_b']);
          },
          fail: function (err) { }
        })
      }
    })
  },
  getAcgroup:function(){
    var that = this;
    wx.request({
      url: 'https://xeonphil.top/group/admin-class',
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({//major
          majorNameGroup: Object.keys(res.data),
          classDict:res.data,        
          majorName: Object.keys(res.data)[that.data.majorIndex],
       //classGroup: that.data.classDict[majorName],        
        }),
        that.setData({//class
          classGroup: that.data.classDict[that.data.majorName],
          className: that.data.classDict[that.data.majorName][that.data.classIndex].group_name,
          majorGroupid: that.data.classDict[that.data.majorName][that.data.classIndex].groupID
        })
        //console.log(that.data.classDict[that.data.majorName])
        //console.log(Object.values(that.data.classGroup))
      },
      fail: function (err) { }
    })
      console.log('getac')
  },
  getxiGroup:function(){
    var that=this;
    wx.request({
      url: 'https://xeonphil.top/group/majors',
      method:'GET',
      success:function(res){
        that.setData({
          xiGroup:res.data
        })
      }
    })
  },
/*  getClassName:function(){
    var that=this;
    that.setData({
      classNameGroup:Object.assign({},that.data.classDict),
    })
    console.log('getclassname')
    console.log(that.data.classDict)
  },*/
  onLoad: function () {
    console.log('onLoad')
    this.getAcgroup();
    this.getxiGroup();
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
