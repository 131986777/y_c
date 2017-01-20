/**
 * Created by Vam W on 2017/1/20.
 */
AndSellMainModule.service('luckyFactory', function (http) {

    this.setLuckyByLocation = http.post('/marketing/luckyDraw/setLuckyByLocation');

    this.queryPosition = http.post('/marketing/luckyDraw/queryAll');

    this.getCouponInfo = http.post('/coupon/coupon/getById');

});