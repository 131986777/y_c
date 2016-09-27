AndSellMainModule.service('districtFactory', function ($resource, baseURL) {

    this.getDistrictList = function (form) {
        return $resource(baseURL + '/shop/shop_district/queryAll', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getDistrictById = function (form) {
        return $resource(baseURL + '/shop/shop_district/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modDistrictById = function (form) {
        return $resource(baseURL + '/shop/shop_district/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addDistrict = function (form) {
        return $resource(baseURL + '/shop/shop_district/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delById = function (form) {
        return $resource(baseURL + '/shop/shop_district/delById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});