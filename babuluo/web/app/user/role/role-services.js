AndSellMainModule.service('roleFactory', function ($resource, baseURL) {

    this.delRole = function (form) {
        return $resource(baseURL + '/user/role/delRole', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.addRole = function (form) {
        return $resource(baseURL + '/user/role/add', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getRole = function (form) {
        return $resource(baseURL + '/user/role/queryAll', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getRoleById = function (form) {
        return $resource(baseURL + '/user/role/getById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.modRoleById = function (form) {
        return $resource(baseURL + '/user/role/modifyById', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getAppClass = function (form) {
        return $resource(baseURL + '/ape/app/class/queryAll', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getAppByClass = function (form) {
        return $resource(baseURL + '/ape/app/app/getByClass', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
    this.getAppListByRole = function (form) {
        return $resource(baseURL + '/role/app/getByRoleId', form, {
            'update': {
                method: 'PUT'
            }
        });
    };
});