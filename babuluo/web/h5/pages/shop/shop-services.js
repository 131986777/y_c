AndSellH5MainModule.service('shopFactory', function ($resource) {

    this.getShopList = $post($resource,'/shop/shop/queryAll');

    this.getShopListByStrict = $post($resource,'/shop/shop/getShopByDistrict');

    this.getShopById = $post($resource,'/shop/shop/getById');

    this.getBannerList = $post($resource,'/banner/banner/getAllData');

});