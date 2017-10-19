AndSellH5MainModule.service('balanceFactory', function (http) {

    this.queryByUid = http.post('/member/balance/getBalanceByUid');

    this.queryAccountByUid = http.post('/member/account/queryAccountByUid');

});


AndSellH5MainModule.service('eventFactory', function (http) {
	this.getCoupon = http.post('/point/coupon/queryAll');
	this.getjifen= http.post('/member/account/queryAccountByUid');
	this.getCoupond= http.post('/point/coupon/getById');
	this.getList= http.post('/offline/coupon/queryByUserId');
	this.exchange= http.post('/offline/coupon/add');
	
	
	
    this.getEventByType = http.post('/sales/event/getByType');

    this.queryLucky = http.post('/marketing/luckyDraw/ifLuckMan');

    this.queryPosition = http.post('/marketing/luckyDraw/queryAll');


    this.getCouponInfo = http.post('/coupon/coupon/getById');
  

});
