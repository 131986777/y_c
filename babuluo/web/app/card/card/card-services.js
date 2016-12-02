
AndSellMainModule.service('cardFactory', function ($resource, baseURL) {

    this.getCardMoneyChangeRange =function () {
        return $resource(baseURL+'/stat/member_card_money_change_range',{},{
            'update':{
                method:'PUT'
            }
        });
    };
    //根据参数查询对应天数的记录   参数仅包含 消费，会员充值，会员开卡，手动更改，订单支付，消费冲红。
    this.getCardMoneyGroup = function (event) {
        return $resource(baseURL +'/stat/member_card_money_group?EVENT=:EVENT',{'EVENT':event},{
            'update':{
                method:'PUT'
            }
        });
    };

    this.getMemberCardList = function () {
        return $resource(baseURL + '/member/membercard/queryAll', {}, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addMemberCard = function (form) {
        return $resource(baseURL + '/member/membercard/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.getCardSourceList = function () {
        return $resource(baseURL + '/member/cardSource/queryAll', null, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.addCardSource = function (form) {
        return $resource(baseURL + '/member/cardSource/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.delCardSource = function (id) {
        return $resource(baseURL + '/member/cardSource/delById?MEMBER_CARD_SOURCE.ID=:ID', {'ID': id},{
            'update': {
                method: 'PUT'
            }
        });
    };

    this.modifyCardSourceById = function () {
        return $resource(baseURL + '/member/cardSource/modifyById', null, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.getCardListBySource = function (sourceID) {
        console.log(456);
        console.log('id为'+sourceID);
        return $resource(baseURL + '/member/cardType/getBySource?MEMBER_CARD_TYPE.CARD_SOURCE_ID=:ID', {'ID': sourceID}, {
            'update': {
                method: 'PUT'
            }
        });
    };


    this.addCardType = function (form) {
        return $resource(baseURL + '/member/cardType/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.delCardType = function (id) {
        return $resource(baseURL + '/member/cardType/delById?MEMBER_CARD_TYPE.ID=:ID', {'ID': id},{
            'update': {
                method: 'PUT'
            }
        });
    };
    this.modifyCardTypeById = function () {
        return $resource(baseURL + '/member/cardType/modifyById', null, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getUIDByLOGINID = function (form) {
        return $resource(baseURL + '/member/member/getUIDByLOGINID', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getUIDByMobile = function (form) {
        return $resource(baseURL + '/member/member/getUIDByMobile', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});