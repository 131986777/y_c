AndSellMainModule.service('salesFactory', function ($resource, baseURL) {

    this.ModifySalesState= function (form) {
        return $resource(baseURL + '/sales/sales/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.AddSales= function (form) {
        return $resource(baseURL + '/sales/sales/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.AddSalesPlan= function (form) {
        return $resource(baseURL + '/sales/salesplan/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.querySalesById= function (form) {
        return $resource(baseURL + '/sales/sales/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.queryProductById = function (form){
        return $resource(baseURL + '/shop/product/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    }
    this.querySalesPlan = function (){
        return $resource(baseURL + '/sales/salesplan/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.ModifySalesProduct = function (form){
        return $resource(baseURL + '/sales/salesplan/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.delSalePlanById  = function (form){
        return $resource(baseURL + '/sales/salesplan/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    }

    this.stopSalePlanById  = function (form){
        console.log(form);
        return $resource(baseURL + '/sales/salesplan/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    }
});
