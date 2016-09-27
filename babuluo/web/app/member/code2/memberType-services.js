AndSellMainModule.service('memberTypeFactory', function ($resource, baseURL) {

      this.getMemberTypeList = function () {
        return $resource(baseURL +'/member/type/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.addMemberType = function (form) {
        return $resource(baseURL + '/member/type/add', form, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delMemberType = function (id) {         //id应为字符串类型

          return $resource(baseURL + '/member/type/delById?member_code_type.ID=:ID', {'ID': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.modifyById = function () {
        return $resource(baseURL + '/member/type/modifyById', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    });