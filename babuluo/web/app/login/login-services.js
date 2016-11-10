AndSellMainModule.service('loginFactory', function ($resource, baseURL) {

    this.login = function (form) {
        return $resource(baseURL + '/login/login', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});