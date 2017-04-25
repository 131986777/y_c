/**
 * Created by liutao on 2017/4/13.
 */
AndSellMainModule.service('groupBuyPlanFactory', function (http) {
    this.addGroupBuyPlan = http.post("/group/buy/plan/add");
    this.queryAllGroupBuyPlan = http.post("/group/buy/plan/queryAll");
    this.modifyById = http.post("/group/buy/plan/modifyById");
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
});
AndSellMainModule.service('groupBuyGroupFactory', function (http) {
    this.getAllGroupByGbpId = http.post("/group/buy/group/getAllByGbpId");
    this.getByGbgIds = http.post("/group/buy/group/getByGbgIds");
    this.add = http.post("/group/buy/group/add");
    this.modifyById = http.post("/group/buy/group/modifyById");
    this.addGroupBuyGroup = http.post("/group/buy/group/add");
});
AndSellMainModule.service('groupBuyMemberFactory', function (http) {
    this.getAllMemberInGbgIds = http.post("/group/buy/member/getInGbgIds");
    this.getByUserId = http.post("/group/buy/member/getByUserId	");
    this.add = http.post("/group/buy/member/add");
    this.getByOrderId = http.post("/group/buy/member/getByOrderIds");
    this.modifyById = http.post("/group/buy/member/modifyById")
});
AndSellMainModule.service('memberFactory', function (http) {
    this.getMemberByUID = http.post('/member/memberData/getById');
});
