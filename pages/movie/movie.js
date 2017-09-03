// pages/movie/movie.js
var url = getApp().globalData.basicUrl;   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filminfo:"",
    filmgenres:"",
    filmcountry:"",
    filmcast:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.showLoading({
      title: '玩命加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    if(options.id&&options.title){
      
      
      var that = this;
      wx.request({
        url: "https://api.douban.com/v2/movie/subject/" + options.id,
        // url:url,
        header: {
          "Content-Type": "json",
        },
        success: function (res) {
          wx.hideLoading();
          if (res.statusCode === 200) {
            var data = res.data;
            console.log(data);
            // data.directors.map(function(item){
              //  return item + "(导演)";
      
            var directors = [];
            var casts = [];
            if (data.rating.average >= 9.5) {
              data.rating.star = "star10";
            } else {
              data.rating.star = "star" + Math.round(data.rating.average);
            }
            for(var item in data.directors){
                console.log(item);
                directors.push(data.directors[item].name + "(导演) ");
            }
            console.log(data);
            for (var item in data.casts) {
              console.log(item);
              casts.push(" " + data.casts[item].name + " ");
            }
            that.setData({
                filminfo: data,
                filmgenres:data.genres.join(" / "),
                filmcountry:data.countries.join(" / "),
                filmcast:directors.join("/") + "/" + casts.join("/")
            })
            wx.setNavigationBarTitle({ title: data.title })
          } else {
            wx.showToast({
              title: '没有找到该电影呢',
            })
            wx.setNavigationBarTitle({ title: "查无此片" })
          }
        }
      })

    }
    

    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res);
    //     // 可使用窗口宽度、高度
    //     console.log('height=' + res.windowHeight);
    //     console.log('width=' + res.windowWidth);
    //     // 计算主体部分高度,单位为px
    //     that.setData({
    //       // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
    //       second_height: res.windowHeight - res.windowWidth / 750 * 300
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  concatName:function(past,item){ //合并导演名字和主演名字
    return past+item.name;
  }
})