const api = require('../../config/api')
const { request } = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        noticeList: [],
        categoryIndexList: [],
        indexGoodsList: [],
        loadingMoreHidden: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchSwiperIndexList();
        this.fetchNoticeIndexList();
        this.fetchCategoryIndexList();
        this.fetchGoodsList();
    },
    fetchSwiperIndexList: function() {
        request(api.SwiperIndexList, {}, 'get').then(res => {
            this.setData({
                swiperList: res.rows
            })
        })
    },
    fetchNoticeIndexList: function() {
        request(api.NoticeIndexList, {}, 'get').then(res => {
            this.setData({
                noticeList: res.data
            })
        })
    },
    fetchCategoryIndexList: function() {
        request(api.CategoryIndexList, { isIndex: 1, isShow: 1, parentId: '0', pageSize: '10' }, 'get')
            .then(res => {
                this.setData({
                    categoryIndexList: res.data
                })
            })
    },
    fetchGoodsList() {
        request(api.GoodsListIndex, { pageNum: '0', pageSize: '10' }, 'get').then(res => {
            this.setData({
                indexGoodsList: res.rows
            })
        })
    },
    // 跳转商品详细界面
    toDetailsTap: function(e) {
        wx.navigateTo({
            url: "/pages/goods_datail/index?id=" + e.currentTarget.dataset.id
        })
    },
    // 跳转分类页面
    tabClick: function(e) {
        // const id = e.currentTarget.dataset.id
        getApp().globalData.showCategoryIndex = e.currentTarget.dataset.id
        wx.switchTab({
          url: `/pages/category/index`,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})