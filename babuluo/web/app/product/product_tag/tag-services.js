AndSellMainModule.service('tagFactory', function ($resource, baseURL) {

      this.getPrdTagList = function () {
        return $resource(baseURL + '/shop/product/tag/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.addPrdTag = function (form) {
        return $resource(baseURL + '/shop/product/tag/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delPrdTag = function (id) {
        return $resource(baseURL
            + '/shop/product/tag/delById?shop_tag.tag_id=:tag_id', {'tag_id': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.modifyPrdTag = function () {
        return $resource(baseURL + '/shop/product/tag/modifyById', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    })