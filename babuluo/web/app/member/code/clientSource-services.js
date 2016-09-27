AndSellMainModule.service('memberFactory', function ($resource, baseURL) {

      this.getMemberSourceList = function () {
        return $resource(baseURL +'/member/source/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.addMember = function (form) {
        return $resource('http://192.168.1.200:8080/ape/bubu/member/source/add', form, {           //http://192.168.1.200:8080/ape/bubu/member/source/add
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delMember = function (id) {
        return $resource('http://192.168.1.200:8080/ape/bubu/member/source/delById?member_code_source.CODE=:code', {'code': id}, {
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

    })