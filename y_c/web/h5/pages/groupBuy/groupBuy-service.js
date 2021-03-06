/**
 * Created by liutao on 2017/4/17.
 */
AndSellH5MainModule.service('groupBuyPlanFactory', function (http) {
    this.getByGbpIds = http.post("/group/buy/plan/getByGbpIds");
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
    this.getBySkuIdAndStat = http.post("/group/buy/plan/getBySkuIdAndStat");
});
AndSellH5MainModule.service('groupBuyGroupFactory', function (http) {
    this.getAllGroupByGbpId = http.post("/group/buy/group/getAllByGbpId");
    this.getByGbgIds = http.post("/group/buy/group/getByGbgIds");
    this.add = http.post("/group/buy/group/add");
    this.modifyById = http.post("/group/buy/group/modifyById");
});
AndSellH5MainModule.service('groupBuyMemberFactory', function (http) {
    this.getAllMemberInGbgIds = http.post("/group/buy/member/getInGbgIds");
    this.getGbmsByGbgIdAndNoLeader = http.post("/group/buy/member/getGbmsByGbgIdAndNoLeader");
    this.getByUserId = http.post("/group/buy/member/getByUserId	");
    this.add = http.post("/group/buy/member/add");
    this.getByOrderId = http.post("/group/buy/member/getByOrderIds");
    this.modifyById = http.post("/group/buy/member/modifyById")
});
AndSellH5MainModule.service('memberFactory', function (http) {
    this.getMemberByUID = http.post('/member/memberData/getById');
});