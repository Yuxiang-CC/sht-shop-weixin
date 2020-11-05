// pages/addgoods/index.js
const { request } = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {
      title: ''
    },
    fileList: [],
    multiArray: [
      ['无脊柱动物', '脊柱动物'], 
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
    ],
    multiIndex: [0, 0],
  },
  // 提交表单
  formSubmit(e) {
    console.log("***********************************")
    console.log(this.data.goodsInfo)
    console.log(this.data.fileList)
    console.log(this.data.multiArray[0][this.data.multiIndex[0]])
    console.log(this.data.multiArray[1][this.data.multiIndex[1]])
    console.log("***********************************")
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  cateOnChange(e) {
    const { picker, value, index } = e.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
  numberOnChange(e) {
    let goods = this.data.goodsInfo
    goods.number = e.detail
    this.setData({
      goodsInfo: goods
    })
  },
  originPriceOnChange(e) {
    let goods = this.data.goodsInfo
    goods.originPrice = e.detail
    this.setData({
      goodsInfo: goods
    })
  },
  presentPriceOnChange(e) {
    let goods = this.data.goodsInfo
    goods.presentPrice = e.detail
    this.setData({
      goodsInfo: goods
    })
  },
  // 上传图片前的校验
  uploadBefore(e) {
    const { file, callback } = e.detail;
    callback(file.type === 'image');
  },
  // 上传文件
  uploadFile(e) {
    var that = this
    const {file} = e.detail
    console.log(file.url)
    // 获取文件临时路径，随后上传到自己的服务器
    // this.data.fileList.push({url: file.url,name:'图片2'})
    wx.uploadFile({
      filePath: file.url,
      name: 'file',
      url: api.Upload + "?module=goods",
      success: function(res) {
        var url = JSON.parse(res.data).data.url
        // 将上传成功的图片添加到fileList中
        var fileList = that.data.fileList || []
        fileList.push({"url":url})
        that.setData({
          fileList: fileList
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '上传失败',
          icon: 'loading'
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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