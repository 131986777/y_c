AndSellMainModule.service('memberSourceFactory', function ($resource, baseURL) {

      this.getMemberSourceList = function () {
        return $resource(baseURL +'/member/source/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };



      this.addMemberSource = function (form) {
        return $resource(baseURL + '/member/source/add', form, {           //http://192.168.1.200:8080/ape/bubu/member/source/add
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delMemberSource = function (id) {

          return $resource(baseURL + '/member/source/delById?member_code_source.CODE=:code', {'code': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.modifyById = function () {
        return $resource(baseURL + '/member/source/modifyById', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    });