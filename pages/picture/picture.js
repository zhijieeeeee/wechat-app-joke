var app = getApp()
var http = require( '../../utils/util' )
var url = 'http://japi.juhe.cn/joke/img/text.from'
Page( {
  data: {
    page: 1,
    loadingHide: false,
    picList: []
  },
  onLoad: function( options ) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //请求笑话列表
    http.request( url, this.data.page, function( dataJson ) {
      that.setData( {
        picList: that.data.picList.concat( dataJson.result.data ),
        loadingHide: true
      })
    }, function( reason ) {
      console.log( reason )
      that.setData( {
        loadingHide: true
      })
    })
  },

  /**
   * 滑动到底部加载更多
   */
  loadMore() {
    //请求笑话列表
    var that = this
    http.request( url, ++this.data.page, function( dataJson ) {
      that.setData( {
        picList: that.data.picList.concat( dataJson.result.data ),

      })
    }, function( reason ) {
      console.log( reason )
      that.setData( {

      })
    })
  },

  preview( e ) {
    console.log( e.target.dataset.url )
    var urls = []
    urls.push( e.target.dataset.url )
    wx.previewImage( {
      urls: urls // 需要预览的图片http链接列表
    })
  }

})