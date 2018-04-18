AndSellMainModule.service('memberTypeFactory', function (http) {

    this.getMemberTypeList = http.post('/member/type/queryAll');
    this.addMemberType = http.post('/member/type/add');
    this.delMemberType = http.post('/member/type/delById');
    this.modifyById = http.post('/member/type/modifyById');

});