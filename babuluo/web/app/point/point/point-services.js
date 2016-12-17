AndSellMainModule.service('pointFactory', function (http) {

    this.addPointList= http.post('/member/point/add');
    this.getAllPointList= http.post('/member/point/queryAll');

});
