AndSellMainModule.service('unitFactory', function ($resource, baseURL) {



      this.addPrdUnit = function (form) {
        return $resource(baseURL + '/shop/product/unit/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };

    this.getCardSourceList = function () {
        return $resource(baseURL + '/member/cardSource/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

     this.addCardSource = function (form) {
        return $resource(baseURL + '/member/cardSource/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.delCardSource = function (id) {
        return $resource(baseURL + '/member/cardSource/delById?member_card_source.ID=:ID', {'ID': id},{
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyCardSourceById = function () {
        return $resource(baseURL + '/member/cardSource/modifyById', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    });