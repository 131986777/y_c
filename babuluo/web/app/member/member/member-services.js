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

    this.loadMemberAccount = function (form) {
        return $resource(baseURL + '/member/account/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modMemberAccount = function (form) {
        return $resource(baseURL + '/member/account/modifyById', form, {
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

    this.getMemberData = function (userId) {
        console.log(userId);
        return $resource(baseURL + '/member/memberData/getById?member_info.USER_ID=:ID', {'ID': userId}, {
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


    this.getMembercardInfo = function (userId) {
        console.log(userId);
        return $resource(baseURL + '/member/membercard/getById?member_card.USER_ID=:ID', {'ID': userId}, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getMembercardType= function (typeId) {
        console.log('typeId'+typeId);
        return $resource(baseURL + '/member/cardType/getById?MEMBER_CARD_TYPE.ID=:ID', {'ID': typeId}, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getMembercardSource= function (sourceId) {
        console.log(sourceId);
        return $resource(baseURL + '/member/cardSource/getById?MEMBER_CARD_SOURCE.ID=:ID', {'ID':sourceId}, {
            'update': {
                method: 'PUT'
            }
        });
    };

});