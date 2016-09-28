AndSellMainModule.service('memberGroupFactory', function ($resource, baseURL) {

      this.getMemberGroupList = function () {
        return $resource(baseURL +'/member/group/queryAll', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    this.getMemberGroupListByType = function () {
        return $resource(baseURL +'/member/group/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

      this.getMemberTypeList=function () {
          return $resource(baseURL +'/member/type/queryAll', null, {
              'update': {
                  method: 'PUT'
              }
          });
      }

      this.addMemberGroup = function (form) {    ///member/group/add
        return $resource(baseURL + '/member/group/add', form, {           //http://192.168.1.200:8080/ape/bubu/member/source/add
          'update': {
            method: 'PUT'
          }
        });
      };

      this.delMemberGroup = function (id) {         //id应为字符串类型

          return $resource(baseURL + '/member/group/delById?member_code_group.ID=:ID', {'ID': id}, {
          'update': {
            method: 'PUT'
          }
        });
      };

      this.modifyById = function () {
        return $resource(baseURL + '/member/group/modifyById', null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    });