AndSellMainModule.service('salesFactory', function (http) {

    this.ModifySalesState=http.post('/sales/sales/modifyById');

    this.AddSales=http.post('/sales/sales/add');

    this.AddSalesPlan=http.post('/sales/salesplan/add');

    this.ModifySalesProduct=http.post('/sales/salesplan/modifyById');

    this.delSalePlanById=http.post('/sales/salesplan/modifyById');

    this.stopSalePlanById=http.post('/sales/salesplan/modifyById');

});

AndSellMainModule.service('eventFactory', function (http) {

    this.addEvent=http.post('/sale/evnet/add');

    this.modEvent=http.post('/sale/evnet/modifyById');

    this.delEvent=http.post('/sale/evnet/delById');

    this.getEvent=http.post('/sale/evnet/queryAll');

    this.getByName=http.post('/sale/evnet/getByName');

});
