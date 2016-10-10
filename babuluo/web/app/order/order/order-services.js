AndSellMainModule.service('orderFactory', function ($resource, baseURL) {

    this.getMemberCardList = function () {
        return $resource(baseURL + '/member/membercard/queryAll', {}, {
            'update': {
                method: 'PUT'
            }
        });
    };
});