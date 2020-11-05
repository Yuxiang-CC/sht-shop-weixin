// pages/goods_datail/index.js
const api = require('../../config/api')
const { request } = require('../../utils/util')
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const SelectSizePrefix = "选择：";
Page({

    /**
     * 页面的初始数据
     */

    data: {
        wxlogin: true,

        goodsDetail: {},
        hasMoreSelect: false,
        selectSize: SelectSizePrefix,
        selectSizePrice: 0,
        selectSizeOPrice: 0,
        totalScoreToPay: 0,
        shopNum: 0,
        hideShopPopup: true,
        buyNumber: 0,
        buyNumMin: 1,
        buyNumMax: 0,

        propertyChildIds: "",
        propertyChildNames: "",
        canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
        shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchGoodsDetail(options.id)
    },
    // 获取商品详细信息
    fetchGoodsDetail(id) {
        request(api.GoodsDetail + "/" + id, {}, 'get').then(res => {
            console.log(res)
            this.setData({
                goodsDetail: res.data
            })
        })
    },
    // 跳转购物车
    goShopCar() {
        wx.switchTab({
            url: '/pages/cart/index',
        })
    },
    // 添加商品到购物车
    addShopCar() {
        let cart = wx.getStorageSync("cart") || [];

        console.log(cart)
        let index = cart.data.findIndex(v => v.id === this.data.goodsDetail.id);
        // 判断该商品是否存在购物车缓存中
        if (index === -1) {
            let goodsDetail = this.data.goodsDetail
            goodsDetail.isChecked = true
            goodsDetail.num = 1
            cart.data.push(goodsDetail)

            let scmCart = {
                    "userId": '1',
                    "goodsId": goodsDetail.id,
                    "goodsName": goodsDetail.title,
                    "originalPrice": goodsDetail.originalPrice,
                    "presentPrice": goodsDetail.presentPrice,
                    "number": goodsDetail.number,
                    "unit": goodsDetail.unit,
                    "imageIndex": goodsDetail.imageIndex
                }
                // 向后台发送请求
            request(api.Cart, JSON.stringify(scmCart), 'post', "application/json").then(res => {

                // 重新存入缓存
                wx.setStorageSync("cart", { time: Date.now(), data: cart.data });

                Notify({ type: 'success', message: '已加入购物车' });

            }).catch(err => {
                Notify({ type: 'warning', message: '加入购物车失败' });
            })

        } else {
            cart[index].num++
        }

    },
    // 购买
    buyNow() {

    },
    // 收藏
    addFav() {

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