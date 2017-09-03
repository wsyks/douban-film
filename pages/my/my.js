// pages/my/my.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
  },
  login: function(){
    var that = this;
    wx.showModal({
      // title: '提示',
      content: '请授权允许使用您公开的用户信息(昵称，头像等)',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: function (data) {
              if (data) {
                if (data.authSetting["scope.userInfo"] == true) {
                  wx.getUserInfo({
                    withCredentials: false,
                    success: function (data) {
                      that.setData({
                        userInfo: data.userInfo
                      })
                    },
                    fail: function () {
                      console.info("授权失败");
                    }
                  });
                }
              }
            },
            fail: function () {
              console.info("设置失败");
            }
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      app.getUserInfo(function(data){
        that.setData({
          userInfo:data
        })
      })
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

  }
})