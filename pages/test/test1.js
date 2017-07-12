var app = getApp()
var Util = require('../../utils/util.js');
Page({  
  data: {  
    navbar: ['发布留言', '留言反馈'],  
    currentTab: 0,
    logs1:[],  
    text:''
    },
    onLoad:function()
    {
      this.getdata();
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
        url: 'https://xeonphil.top/message/pull/idsh6jxhjc6jvxvnjrnnc82bch6vk',
        data:{},
        method:'GET',
        success:function(res){
          //console.log(res.data);
          that.setData({
            logs1:res.data.data
          })
          console.log(res.data.data);
        },
        fail:function(err){}
      })
    },
    upMessage:function(e){
      var that=this;
      wx.request({
        url: 'https://xeonphil.top/message/push/o6_bmasdasdsad6_2sgVt7hMZOPfL/5go5gm50g5ogm2omg0h289xjkf3f',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }, 
        data: Util.json2Form({text: "OK"}),
        method:'POST',
      })
    }  
        })  