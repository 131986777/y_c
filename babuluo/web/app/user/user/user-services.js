AndSellMainModule.service('userFactory', function (http) {

    this.modifyState=http.post('/user/user/modifyUserState');

    this.addUser=http.post('/user/user/add');

    this.getUserByUID=http.post('/user/user/getById');

    this.modUserByUID=http.post('/user/user/modifyById');

    this.isLogin=http.post('/login/isLogin');

    this.logOut=http.post('/login/logout');

});