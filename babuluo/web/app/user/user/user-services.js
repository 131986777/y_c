AndSellMainModule.service('userFactory', function ($resource, baseURL) {

    this.modifyState = function (form) {
        return $resource(baseURL + '/user/user/modifyUserState', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

});