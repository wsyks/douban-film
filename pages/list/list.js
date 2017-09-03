// pages/movie/movie.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    hasMore:true,
    start:0,
    count:21,
    total:1,
    pageType:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageType:options.type
    })
    var title = app.globalData.pageTypelist[options.type];
    wx.setNavigationBarTitle({ title: title })
    console.log(this.data.pageType);
    // wx.showLoading({
    //   title: '玩命加载中',
    //   mask: true,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
    this.getFilm();
    
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
    if(this.data.hasMore){//如果还有数据未请求，就继续请求
      this.getFilm();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  detail:function(e){
    var data = e.currentTarget.dataset;//获取当前组件上由data-开头的自定义属性组成的集合
    wx.navigateTo({
      url: '../movie/movie?id=' + data.id + '&title=' + data.title
    })
  },
  getFilm:function(){
    var url = "https://api.douban.com/v2/movie/"+this.data.pageType;
    var that = this;
    console.log(that.data.start,that.data.total);
    app.getFilminfo(this.data.pageType,this.data.start,this.data.count,function(res){
      wx.hideLoading();
      var data = res.data;    
      data.subjects.map(function (item) {
        if (item.title.length > 8) {
                // var temp = item.title.slice()
          item.title = item.title.slice(0, 7) + "...";
        }
        if (item.rating.average >= 9.5) {
          item.rating.star = "star10";
        } else {
          item.rating.star = "star" + Math.round(item.rating.average);
        }
      })
      that.setData({
        films: that.data.films.concat(data.subjects),
        start: that.data.start + data.subjects.length,
        total: data.total
      })

      if (that.data.start == that.data.total) {
        that.setData({
          hasMore: false,
        })
        wx.showToast({
          title: '没有更多了',
          duration: 1000
        })
      }
    
    })
  }
})