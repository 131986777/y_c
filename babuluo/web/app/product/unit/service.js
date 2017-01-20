angular.module('AndSell.Main').service('unitFactory', function (http) {

    this.getPrdUnitList = http.post('/shop/product/unit/queryAll');
    this.addPrdUnit = http.post('/shop/product/unit/add');
    this.delPrdUnit = http.post('/shop/product/unit/delById');
    this.modifyPrdUnit = http.post('/shop/product/unit/modifyById');

});