AndSellMainModule.service('pointFactory', function ($resource, baseURL) {



      this.addPoint = function (form) {
        return $resource(baseURL + '/shop/product/unit/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };


    });