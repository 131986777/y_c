AndSellMainModule.service('unitFactory', function ($resource, baseURL) {

      this.getPrdUnitList = function () {
        return $resource(baseURL + '/shop/product/unit/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.addPrdUnit = function (form) {
        return $resource(baseURL + '/shop/product/unit/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delPrdUnit = function (id) {
        return $resource(baseURL
            + '/shop/product/unit/delById?shop_unit.unit_id=:unit_id', {'unit_id': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.modifyPrdUnit = function () {
        return $resource(baseURL + '/shop/product/unit/modifyById', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    });