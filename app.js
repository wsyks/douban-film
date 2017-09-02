//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getFilminfo:function(pageType,start,count,cb) {
    var that = this;

    wx.request({
      url: that.globalData.basicUrl +"/" + pageType + '?start=' + start + '&count=' + count,
      // url:url,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        console.log(res);
        // wx.hideLoading();
        // var data = res.data;
        cb(res);
        // data.subjects.map(function (item) {
        //   if (item.title.length > 8) {
        //     // var temp = item.title.slice()
        //     item.title = item.title.slice(0, 7) + "...";
        //   }
        // })
        // that.setData({
        //   films: that.data.films.concat(data.subjects),
        //   start: that.data.start + data.subjects.length,
        //   total: data.total
        // })
        // console.log(that.data.films);

      }
    }) 
  },
  globalData: {
    userInfo: null,
    basicUrl:"https://api.douban.com/v2/movie",
    pageTypelist: {"coming_soon":"即将上映","in_theaters":"正在热映","top250":"TOP250电影"}
  }
})
