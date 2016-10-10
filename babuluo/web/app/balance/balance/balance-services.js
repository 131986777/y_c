AndSellMainModule.service('balanceFactory', function ($resource, baseURL) {

    this.getMemberData = function (form) {
        return $resource(baseURL + '/member/balance/getById',form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.queryMemberAccount = function (form) {
        return $resource(baseURL + '/member/account/getById',form , {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modMemberAccount = function (form) {
        console.log(form);
        return $resource(baseURL + '/member/account/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modMemberBalanceById = function (form) {
        console.log(form);
        return $resource(baseURL + '/member/balance/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.modMemberDataById = function (form) {
        return $resource(baseURL + '/member/memberData/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});