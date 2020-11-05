// pages/ucenter/index.js
const api = require('../../config/api')
const { request } = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        myOrder: [],
        myGoods: [],
        myCollect: [],
        myFootprint: []
    },
    onChange(event) {
        this.setData({
            active: event.detail.index
        })
        this.checkActive();
    },
    checkActive() {
        // 根据active 向后台发送请求获取数据
        switch (this.data.active) {
            case 0:
                console.log('0');
                break;
            case 1:
                request(api.MyGoods,{} ,"get").then(res => {
                    if (res.code === 403) {
                        wx.showToast({
                          icon: 'none',
                          title: '登录信息过时！请重新登录！',
                        })
                    }
                    this.setData({
                        myGoods: res.data
                    })
                })
                break;
            case 2: 
                console.log(2);
                break;
            case 3:
                console.log(3);
                break;
            default:
                console.log('default');
                break;
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            active: Number(options.cid)
        })
        this.checkActive()
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