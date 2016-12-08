AndSellMainModule.service('salesFactory', function (http) {

    this.ModifySalesState=http.post('/sales/sales/modifyById');

    this.AddSales=http.post('/sales/sales/add');

    this.AddSalesPlan=http.post('/sales/salesplan/add');

    this.ModifySalesProduct=http.post('/sales/salesplan/modifyById');

    this.delSalePlanById=http.post('/sales/salesplan/modifyById');

    this.stopSalePlanById=http.post('/sales/salesplan/modifyById');

});

AndSellMainModule.service('eventFactory', function (http) {

    this.addEvent=http.post('/sales/event/add');

    this.modEvent=http.post('/sales/event/modifyById');

    this.delEvent=http.post('/sales/event/delById');

    this.getEvent=http.post('/sales/event/queryAll');

});
