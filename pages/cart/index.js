// pages/shop-cart/index.js
const { checkLogin } = require('../../utils/user.js');
const { request } = require('../../utils/util.js');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const api = require('../../config/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartGoods: [],
        cartTotal: {
            "goodsCount": 0,
            "goodsAmount": 0.00,
            "checkedGoodsCount": 0,
            "checkedGoodsAmount": 0.00
        },
        isEditCart: false,
        checkedAllStatus: false,
        editCartList: [],
        checkedGoodsAmount: 0,
        checkedGoodsCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        // var cart = wx.getStorageSync("cart");
        // if (cart === null || cart === '') {
        //     this.fetchCartList()
        // } else {
        //     // 判断是否过期
        //     if (Date.now() - cart.time > 1000) {
        //         this.fetchCartList()
        //     }
        // }

    },
    fetchCartList() {
        request(api.CartList, {}, 'get').then(res => {
            let carts = res.data
            carts.forEach(e => {
                e.isChecked = false
            })
            this.setData({
                cartGoods: carts
            })
            this.setData({
                checkedAllStatus: this.isCheckedAll()
            })
            wx.setStorageSync("cart", { time: Date.now(), data: carts });
        })
    },
    toIndexPage: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    // 勾选或取消商品
    checkedItem(e) {
        let itemIndex = e.target.dataset.itemIndex;
        // 更改缓存中的商品的 isChecked属性
        let carts = this.data.cartGoods;
        let count = this.data.checkedGoodsAmount
        carts[itemIndex].isChecked = !carts[itemIndex].isChecked;
        this.setData({
            cartGoods: carts,
            checkedAllStatus: this.isCheckedAll()
        })
        if (carts[itemIndex].isChecked) {
            // 如果是选中则增加
            count = this.data.checkedGoodsAmount + carts[itemIndex].presentPrice
        } else {
            count = this.data.checkedGoodsAmount - carts[itemIndex].presentPrice
        }
        this.setData({
            checkedGoodsAmount: count,
            checkedGoodsCount: this.getCheckedGoodsCount()
        })
        wx.setStorageSync("cart", { time: Date.now(), data: carts });
    },
    // 切换购物车编辑状态
    editCart() {
        var that = this;
        if (this.data.isEditCart) {
            this.setData({
                isEditCart: !this.data.isEditCart
            });
        } else {
            //编辑状态
            let tmpCartList = this.data.cartGoods.map(function(v) {
                v.isChecked = false;
                return v;
            });
            this.setData({
                // editCartList: this.data.cartGoods,
                cartGoods: tmpCartList,
                isEditCart: !this.data.isEditCart,
                checkedAllStatus: that.isCheckedAll(),
                checkedGoodsCount: that.getCheckedGoodsCount()
            });
        }

    },
    checkedAll() {
        let carts = this.data.cartGoods

        if (this.data.checkedAllStatus) {
            carts.forEach(v => {
                v.isChecked = false
            })
            this.setData({
                cartGoods: carts,
                checkedAllStatus: false,
                checkedGoodsAmount: 0
            })
            wx.setStorageSync("cart", { time: Date.now(), data: carts });
        } else {
            let count = 0;
            carts.forEach(v => {
                v.isChecked = true
                count += v.presentPrice
            })
            this.setData({
                cartGoods: carts,
                checkedAllStatus: true,
                checkedGoodsAmount: count
            })
            wx.setStorageSync("cart", { time: Date.now(), data: carts });
        }
        this.setData({
            checkedGoodsCount: this.getCheckedGoodsCount()
        })
    },
    // 判断购物车商品是否全选
    isCheckedAll() {
        let goods = this.data.cartGoods
        return goods.every(function(element, index, array) {
            if (element.isChecked == true) {
                return true;
            } else {
                return false;
            }
        });
    },
    // 获取商品总数量
    getCheckedGoodsCount() {
        let checkedGoodsCount = 0;
        this.data.cartGoods.forEach(function(v) {
            if (v.isChecked === true) {
                checkedGoodsCount += 1;
            }
        });
        return checkedGoodsCount;
    },
    // 从购物车中删除商品
    deleteCart() {
        if (this.data.checkedGoodsCount > 0) {
            // 从缓存中获取被选中的商品
            let carts = wx.getStorageSync('cart')
            let ids = []
            carts.data.forEach(v => {
                if (v.isChecked) {
                    ids.push(v.id)
                }
            })
            console.log(ids);
            // 向后台发送请求，删除购物车
            request(api.Cart + "/" + ids, {}, 'delete').then(res => {
                console.log(res)
            });

            this.fetchCartList()
        } else {
            wx.showToast({
                title: '未选中商品!',
                icon: 'none',
                image: '../../static/images/user/tishi.png',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        }

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

        checkLogin().then(res => {
            // 获取购物车信息
            var cart = wx.getStorageSync("cart");
            if (cart === null || cart === '') {
                this.fetchCartList()
            } else {
                // 判断是否过期
                if (Date.now() - cart.time > 1000) {
                    this.fetchCartList()
                }
                this.setData({
                    cartGoods: cart.data
                })
            }
        }).catch(err => {
            // 用户未登录
            Dialog.confirm({
                    title: '提示',
                    message: '您还没有登录，请先登录!',
                    confirmButtonText: '去登录',
                    cancelButtonText: '暂不登录'
                })
                .then(() => {
                    // on confirm
                    wx.switchTab({
                        url: '/pages/my/index'
                    });
                })
        })
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