Page({
  data:{
    // text:"这是一个页面"
    text:''

  },
  checkboxgroupBindchange:function(e){
    var temp1=e.detail.value
   
    var temp2=''
    console.log(temp1)
    if(temp1.length!=0){
      for(var i=0,len=temp1.length;i<len;i++){
        temp2=temp2+temp1[i]+','
      }
      this.setData({
        text:'您选择了：'+temp2
      })
    }else{
      this.setData({
        text:'您选择了：'
      })
    }
    
  },
  upChoose:function(e){
    wx.navigateTo({
      url: '../log/logs'
    })
  }
})