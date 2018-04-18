AndSellMainModule.service('roleFactory', function (http) {

    this.delRole=http.post('/user/role/delRole');
    this.addRole=http.post('/user/role/add');
    this.getRole=http.post('/user/role/queryAll');
    this.getRoleById=http.post('/user/role/getById');
    this.delRole=http.post('/user/role/delRole');
    this.modRoleById=http.post('/user/role/modifyById');
    this.getAppClass=http.post('/ape/app/class/queryAll');
    this.getAppByClass=http.post('/ape/app/app/getByClass');
    this.getAppListByRole=http.post('/role/app/getByRoleId');

});