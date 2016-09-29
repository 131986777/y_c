AndSellMainModule.service('memberFactory', function ($resource, baseURL) {

    this.getMemberList = function () {
        return $resource(baseURL + '/member/member/queryAll', {}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.getMemberListById = function (form) {
        return $resource(baseURL + '/member/member/getById', form, {
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
    this.getMemberAddress = function (userId) {
        console.log(userId);

        return $resource(baseURL + '/member/address/getByUserId?member_address.USER_ID=:ID', {'ID': userId}, {
            'update': {
                method: 'PUT'
            }
        });
    };

});