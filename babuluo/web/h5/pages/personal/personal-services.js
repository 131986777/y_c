AndSellH5MainModule.service('personalFactory', function ($resource, baseURL) {

    this.getMemberCardByUserId = function (form) {
        return $resource(baseURL + '/member/membercard/getByUserId', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});