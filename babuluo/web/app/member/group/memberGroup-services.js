AndSellMainModule.service('memberGroupFactory', function (http) {

    this.getMemberGroupList=http.post('/member/group/queryAll');

    this.getMemberGroupListByType=http.post('/member/group/getByTypeId');

    this.getMemberTypeList=http.post('/member/type/queryAll');

    this.addMemberGroup=http.post('/member/group/add');

    this.delMemberGroup=http.post('/member/group/delById');

    this.modifyById=http.post('/member/group/modifyById');

});