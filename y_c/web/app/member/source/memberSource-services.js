AndSellMainModule.service('memberSourceFactory', function (http) {

    this.getMemberSourceList = http.post('/member/source/queryAll');
    this.addMemberSource = http.post('/member/source/add');
    this.delMemberSource = http.post('/member/source/delById');
    this.modifyById = http.post('/member/source/modifyById');

});