AndSellMainModule.service('classFactory', function (http) {

    this.getPrdClassList = http.post('/shop/product/class/queryAll');
    this.addPrdClass = http.post('/shop/product/class/add');
    this.delPrdClass = http.post('/shop/product/class/delById');
    this.modifyPrdClass = http.post('/shop/product/class/modifyById');

});