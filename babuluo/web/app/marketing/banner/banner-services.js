AndSellMainModule.service('bannerFactory', function ($resource, baseURL) {

    this.addBannerPos = function (form) {
       // console.log('新增数据');
        console.log(form);
       // console.log('新增数据');
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

    this.delBannerPosById = function (form) {    //假删除
        return $resource(baseURL + '/banner/position/modIsDel', form, {
            'update': {
                method: 'PUT'
            }
        });

    };

    this.addBanner= function (form) {   //添加横幅
        console.log('新增数据');
        console.log(form);
        console.log('新增数据');
        return $resource(baseURL + '/banner/banner/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.modifyBanner= function (form) {
        return $resource(baseURL + '/banner/banner/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delBannerById = function (form) {    //假删除
        return $resource(baseURL + '/banner/banner/modIsDel', form, {
            'update': {
                method: 'PUT'
            }
        });

    };
     this.stopBannerById = function (form) {
     console.log(123);
     console.log(form);
     return $resource(baseURL + '/banner/banner/modifyIsStop', form, {
     'update': {
     method: 'PUT'
     }
     });
     };

});