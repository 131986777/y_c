AndSellMainModule.service('salesFactory', function (http) {

    this.ModifySalesState=http.post('/sales/sales/modifyById');

    this.AddSales=http.post('/sales/sales/add');

    this.AddSalesPlan=http.post('/sales/salesplan/add');

    this.ModifySalesProduct=http.post('/sales/salesplan/modifyById');

    this.delSalePlanById=http.post('/sales/salesplan/modifyById');

    this.stopSalePlanById=http.post('/sales/salesplan/modifyById');

});
