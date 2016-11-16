AndSellH5MainModule.service('shopFactory', function ($resource) {

    this.getShopList = $post($resource,'/shop/shop/queryAllByAgent');

    this.getShopById = $post($resource,'/shop/shop/getById');

    this.getBannerList = $post($resource,'/banner/banner/getAllData');

});