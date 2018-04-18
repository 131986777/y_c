AndSellMainModule.service('districtFactory', function (http) {

    this.getDistrictList=http.post('/shop/shop_district/queryAll');
    this.getDistrictById=http.post('/shop/shop_district/getById');
    this.modDistrictById=http.post('/shop/shop_district/modifyById');
    this.addDistrict=http.post('/shop/shop_district/add');
    this.delById=http.post('/shop/shop_district/delById');

});