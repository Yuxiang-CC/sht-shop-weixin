// pages/category/category.js
const api = require('../../config/api')
const {request} = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        // 左侧的菜单数据
        leftMenuList: [],
        // 右侧的商品数据
        rightContent: [],
        // 被选中的分类索引
        currentIndex: 0,
        // 右侧滚动条距离顶部的距离
        scrollTop: 0
    },
    // 返回的数据
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /*
        1. 先判断是否有缓存的数据
        2. 没有则获取 有则判断是否过期
        */
        const Cates = wx.getStorageSync("cates");
        if (Cates === null || Cates === '') {
            this.fetchCategoryList()
        } else {
            // 判断是否过期
            if (Date.now() - Cates.time > 1000) {
            this.fetchCategoryList()
            }
            this.Cates = Cates.data
        }
    },
    // 左侧菜单的点击事件
    handleItemTap(e) {
        // console.log(e);
        const { index } = e.currentTarget.dataset
        getApp().globalData.showCategoryIndex = e.currentTarget.dataset.id
        this.setData({
            currentIndex: index,
            rightContent: this.Cates[index].children,
            scrollTop: 0
        })
    },
    fetchCategoryList() {
        request(api.CategoryList, {}, 'get').then(res => {
            // console.log(res);
            this.Cates = res.data;
            // 存储从后台获取到的数据
            wx.setStorageSync("cates", {time: Date.now(), data: res.data});
            // 构造左侧的大菜单数据
            let leftMenuList = this.Cates.map(v => { return {"id":v.id,"name":v.name}})
            // 构造右侧的数据
            let rightContent = this.Cates[0].children
            this.setData({
                leftMenuList,
                rightContent
            })
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
        var index = getApp().globalData.showCategoryIndex
        var leftList = this.data.leftMenuList
        if (leftList.length != 0 && index != undefined) {
            for (var i =0;i<leftList.length;i++) {
                if (leftList[i].id == index) {
                    index = i
                }
            }
            this.setData({
                currentIndex: index,
                rightContent: this.Cates[index].children,
                scrollTop: 0
            })
        }
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