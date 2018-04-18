AndSellMainModule.service('sysConfigFactory', function (http) {

    this.getSys = http.post('/sys/sys_config/queryAll');

    this.modSysByKey = http.post('/sys/sys_config/modifyByKey');

});