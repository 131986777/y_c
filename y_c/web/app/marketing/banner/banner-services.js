AndSellMainModule.service('bannerFactory', function (http) {

    this.addBannerPos = http.post('/banner/position/add');

    this.modifyBannerPos = http.post('/banner/position/modifyById');

    this.delBannerPosById = http.post('/banner/position/modIsDel');

    this.addBanner = http.post('/banner/banner/add');

    this.modifyBanner = http.post('/banner/banner/modifyById');

    this.delBannerById = http.post('/banner/banner/modIsDel');

    this.stopBannerById = http.post('/banner/banner/modifyIsStop');

    this.bannerUpDown = http.post('/banner/banner/modifyById');

});