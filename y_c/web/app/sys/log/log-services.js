AndSellMainModule.service('logFactory', function (http) {

    this.getSmsLog=http.post('/sys/sms/queryAll');

});