AndSellMainModule.service('userFactory', function ($resource, baseURL) {

    this.modifyState = function (form) {
        return $resource(baseURL + '/user/user/modifyUserState', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.addUser = function (form) {
        return $resource(baseURL + '/user/user/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getUserByUID = function (form) {
        return $resource(baseURL + '/user/user/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.modUserByUID = function (form) {
        return $resource(baseURL + '/user/user/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.logOut = function () {
        return $resource(baseURL+'/login/logout',{},{
            'update':{
                method:'PUT'
            }
        });
    }


});