AndSellMainModule.service('classFactory', function ($resource, baseURL) {

      this.getPrdClassList = function () {
        return $resource(baseURL + '/shop/product/class/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.addPrdClass = function (form) {
        return $resource(baseURL + '/shop/product/class/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delPrdClass = function (id) {
        return $resource(baseURL
            + '/shop/product/class/delById?shop_product_class.class_id=:class_id', {'class_id': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.modifyPrdClass = function () {
        return $resource(baseURL + '/shop/product/class/modifyById', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    });