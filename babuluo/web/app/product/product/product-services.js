AndSellMainModule.service('productFactory', function (http) {

    this.getProduct = http.post('/shop/product/queryAll');
    this.getProductById = http.post('/shop/product/getByIdWithSku');
    this.getAllProductSku = http.post('/shop/product/sku/queryAllWithPrdInfo');
    this.getSpuCode = http.post('/shop/product/getSpuCode');
    this.addProduct = http.post('/shop/product/add');
    this.modifyProduct = http.post('/shop/product/modifyById');
    this.setProductState = http.post('/shop/product/setPrdState');
    this.setSkuState = http.post('/shop/product/sku/setSkuState');
    this.delProduct = http.post('/shop/product/falseDelete');
    this.delSku = http.post('/shop/product/sku/falseDelete');
    this.modifySkuListPrice = http.post('/shop/product/sku/modifySkuListPrice');
    this.modifyPrdsTag = http.post('/shop/product/setTag');
    this.modifyPrdsClass = http.post('/shop/product/setPrdClass');
    this.modifySku = http.post('/shop/product/sku/modifyById');
    this.getBySkuIdWithAllInfo = http.post('/shop/product/getBySkuIdWithAllInfo');

    this.addAppointmentProduct = http.post('/shop/product/appointment/add');
    this.modAppointmentProduct = http.post('/shop/product/appointment/modifyById');
    this.getAppointmentProduct = http.post('/shop/product/appointment/queryAll');
    this.delAppointmentProduct = http.post('/shop/product/appointment/delById');

});

AndSellMainModule.service('groupBuyingFactory', function (http) {
    this.addGroupBuying = http.post('/promo/groupBuying/groupBuying/add');
    this.queryAllGroupBuying = http.post('/promo/groupBuying/groupBuying/queryAll');
    this.modifyById = http.post('/promo/groupBuying/groupBuying/modifyById');
})

AndSellMainModule.service('seckillFactory', function (http) {
    this.addSeckill = http.post('/promo/seckill/seckill/add');
    this.queryAllSeckill = http.post('/promo/seckill/seckill/queryAll');
    this.modifySeckill = http.post('/promo/seckill/seckill/modifyById');
})