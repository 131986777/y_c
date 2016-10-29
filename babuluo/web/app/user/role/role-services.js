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
});