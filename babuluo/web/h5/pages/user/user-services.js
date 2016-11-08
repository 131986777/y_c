AndSellH5MainModule.service('userFactory', function ($resource, baseURL) {

    this.newUserReg = function (form) {
        return $resource(baseURL + '/member/member/add',form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.login = function (form){
        return $resource(baseURL + '/login/login', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getShopById = function (id) {
        return $resource(baseURL + '/shop/shop/getById?SHOP.SHOP_ID=:ID', {ID:id}, {
            'update': {
                method: 'PUT'
            }
        });
    };

});