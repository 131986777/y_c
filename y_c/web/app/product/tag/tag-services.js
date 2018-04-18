AndSellMainModule.service('tagFactory', function (http) {

    this.getPrdTagList = http.post('/shop/product/tag/queryAll');
    this.addPrdTag = http.post('/shop/product/tag/add');
    this.delPrdTag = http.post('/shop/product/tag/delById');
    this.modifyPrdTag = http.post('/shop/product/tag/modifyById');

});