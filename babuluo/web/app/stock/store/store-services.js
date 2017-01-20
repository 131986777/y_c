AndSellMainModule.service('storeFactory', function (http) {

    this.addStore=http.post('/store/store/add');
    this.delStoreById=http.post('/store/store/modifyIsDel');
    this.modifyStore=http.post('/store/store/modifyById');
    this.getStoreList=http.post('/store/store/queryAll');

});