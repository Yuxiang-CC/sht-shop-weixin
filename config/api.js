const API_BASE_URL = 'http://localhost:8080';
module.exports = {
    // 首页轮播图
    SwiperIndexList: API_BASE_URL + '/business/swiper/list',
    // 首页公告信息
    NoticeIndexList: API_BASE_URL + '/system/notice/list/2',
    // 根据NoticeID查询公告信息
    NoticeDetail: API_BASE_URL + '/system/notice',
    // 首页分类信息
    CategoryIndexList: API_BASE_URL + '/business/category/list',
    // 分类页面数据信息
    CategoryList: API_BASE_URL + '/business/category/list',


    // 微信登录
    AuthLoginByWeixin: API_BASE_URL + '/business/login/login_by_wx',


    // 商品列表
    GoodsListIndex: API_BASE_URL + '/business/goods/list',
    // 商品详细信息
    GoodsDetail: API_BASE_URL + '/business/goods',


    // 获取购物车列表
    CartList: API_BASE_URL + '/business/cart/cart-list',
    // 删除购物车商品
    Cart: API_BASE_URL + '/business/cart',


    // 文件上传
    Upload: API_BASE_URL +'/business/upload/file',


    // 用户出售商品
    MyGoods: API_BASE_URL +'/business/goods/my',

}