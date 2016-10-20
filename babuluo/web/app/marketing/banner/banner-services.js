AndSellMainModule.service('bannerFactory', function ($resource, baseURL) {

    this.addBannerPos = function (form) {
        console.log('新增数据');
        console.log(form);
        console.log('新增数据');
        return $resource(baseURL + '/banner/position/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyBannerPos = function (form) {
        return $resource(baseURL + '/banner/position/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
   /* this.stopSouponById = function (form) {
        console.log(123);
        console.log(form);
        return $resource(baseURL + '/coupon/rule/modifyIsStop', form, {
            'update': {
                method: 'PUT'
            }
        });
    };*/
    this.delBannerPosById = function (form) {    //假删除
        return $resource(baseURL + '/banner/position/modIsDel', form, {
            'update': {
                method: 'PUT'
            }
        });

    };

});