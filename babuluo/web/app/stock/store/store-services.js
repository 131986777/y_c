AndSellMainModule.service('storeFactory', function ($resource, baseURL) {

    this.addStore = function (form) {
        return $resource(baseURL + '/store/store/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delStoreById = function (form) {
        return $resource(baseURL + '/store/store/delById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyStore = function (form) {
        return $resource(baseURL + '/store/store/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getStoreList = function () {
        return $resource(baseURL + '/store/store/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };




});