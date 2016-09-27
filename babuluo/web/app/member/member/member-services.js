AndSellMainModule.service('memberFactory', function ($resource, baseURL) {

    this.getMemberList = function () {
        return $resource(baseURL + '/member/member/queryAll', {}, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.modMemberListById = function (form) {
        return $resource(baseURL + '/member/member/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addMemberList = function (form) {
        return $resource(baseURL + '/member/member/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delById = function (form) {
        return $resource(baseURL + '/member/member/delById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});