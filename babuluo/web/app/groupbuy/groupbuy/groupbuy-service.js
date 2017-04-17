/**
 * Created by liutao on 2017/4/13.
 */
AndSellMainModule.service('groupBuyPlanFactory', function (http) {
    this.addGroupBuyPlan = http.post("/group/buy/plan/add");
    this.queryAllGroupBuyPlan = http.post("/group/buy/plan/queryAll");
    this.modifyById = http.post("/group/buy/plan/modifyById");
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
});
