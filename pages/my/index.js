var user = require('../../utils/user');
var app = getApp();

Page({
    data: {
        userInfo: {
            avatarUrl: "../../static/images/nologin.png",
            nickname: "游客"
        },
        token: null,
        hasMobile: ''
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {

    },
    onShow: function() {

        let userInfo = wx.getStorageSync('userInfo');
        let token = wx.getStorageSync('token') || null;
        // 页面显示
        if (userInfo && token) {
            app.globalData.userInfo = userInfo;
            app.globalData.token = token;
        } else {
            app.globalData.userInfo = {
                avatarUrl: "../../static/images/nologin.png",
                nickName: "游客"
            }
        }
        this.setData({
            userInfo: app.globalData.userInfo,
            token: token
        });

    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭
    },
    bindGetUserInfo(e) {
        let userInfo = wx.getStorageSync('userInfo');
        let token = wx.getStorageSync('token');
        if (userInfo && token) {
            return;
        }
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            user.loginByWeixin(e.detail).then(res => {
                this.setData({
                    userInfo: res.data.userInfo
                });
                app.globalData.userInfo = res.data.userInfo;
                app.globalData.token = res.data.token;
                wx.switchTab({
                    url: '/pages/index/index'
                });
            }).catch((err) => {});
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告通知',
                content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                success: function(res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: (result) => {
                                if (result.authSetting["scope.userInfo"]) { // 如果用户重新同意了授权登录
                                    user.loginByWeixin(e.detail).then(res => {
                                        this.setData({
                                            userInfo: res.data.userInfo
                                        });
                                        app.globalData.userInfo = res.data.userInfo;
                                        app.globalData.token = res.data.token;
                                        Notify({ type: 'success', message: '登录成功' });
                                        wx.switchTab({
                                            url: '/pages/my/index'
                                        });
                                    }).catch((err) => {});
                                }
                            },
                            fail: () => {},
                            complete: () => {}
                        });
                    }
                }
            });
        }
    },
    exitLogin: function() {
        wx.showModal({
            title: '',
            confirmColor: '#b4282d',
            content: '退出登录？',
            success: function(res) {
                if (res.confirm) {
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('userInfo');
                    wx.removeStorageSync('cart')
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }
        })

    }
})