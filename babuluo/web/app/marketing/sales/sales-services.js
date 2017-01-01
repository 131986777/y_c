AndSellMainModule.service('salesFactory', function (http) {

    this.MosdifyAdaptor=http.post('/promo/role/andSell/modifyById');

    this.ModifySalesState=http.post('/sales/sales/modifyById');
    //
    //this.AddSales=http.post('/sales/sales/add');
    //
    //this.AddPromoRole=http.postPromo('http://192.168.2.145:8080/bubu/promo/role/add') ;

    this.AddPromoRoleAdaptor=http.post('/promo/role/andSell/add') ;

    this.QueryPromoRoleAdaptor=http.post('/promo/role/andSell/queryAll') ;

    this.AddSkuInfo=http.post("/sales/sales/queryAll");

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
