AndSellMainModule.service('productFactory', function ($resource, baseURL) {

      this.getProduct = function () {
        return $resource(baseURL + '/shop/product/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.getSpuCode = function () {
        return $resource(baseURL + '/shop/product/getSpuCode', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.addProduct = function (form) {
        return $resource(baseURL + '/shop/product/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };

      /*this.addProduct = function (id) {
        return $resource(baseURL
            + '-service/shop/product/comment/getById?shop_product_comment.COMMENT_ID=:COMMENT_ID', {'COMMENT_ID': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };*/

    })