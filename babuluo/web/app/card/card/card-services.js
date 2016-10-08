AndSellMainModule.service('unitFactory', function ($resource, baseURL) {



      this.addPrdUnit = function (form) {
        return $resource(baseURL + '/shop/product/unit/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };


    });