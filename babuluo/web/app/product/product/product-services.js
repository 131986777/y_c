AndSellMainModule.service('productFactory', function (http) {

    this.getProduct=http.post('/shop/product/queryAll');
    this.getProductById=http.post('/shop/product/getByIdWithSku');
    this.getAllProductSku=http.post('/shop/product/sku/queryAllWithPrdInfo');
    this.getSpuCode=http.post('/shop/product/getSpuCode');
    this.addProduct=http.post('/shop/product/add');
    this.modifyProduct=http.post('/shop/product/modifyById');
    this.setProductState=http.post('/shop/product/setPrdState');
    this.setSkuState=http.post('/shop/product/sku/setSkuState');
    this.delProduct=http.post('/shop/product/falseDelete');
    this.delSku=http.post('/shop/product/sku/falseDelete');
    this.modifySkuListPrice=http.post('/shop/product/sku/modifySkuListPrice');
    this.modifyPrdsTag=http.post('/shop/product/setTag');
    this.modifyPrdsClass=http.post('/shop/product/setPrdClass');


});