/**
 * Created by liutao on 2017/4/17.
 */
AndSellH5MainModule.service('groupBuyPlanFactory', function (http) {
    this.getByGbpIds = http.post("/group/buy/plan/getByGbpIds");
    this.queryAllByState = http.post("/group/buy/plan/queryAllByState");
});
AndSellH5MainModule.service('groupBuyGroupFactory', function (http) {
    this.getAllGroupByGbpId = http.post("/group/buy/group/getAllByGbpId");
    this.getByGbgIds = http.post("/group/buy/group/getByGbgIds");
});
AndSellH5MainModule.service('groupBuyMemberFactory', function (http) {
    this.getAllMemberInGbgIds = http.post("/group/buy/member/getInGbgIds");
    this.getByUserId = http.post("/group/buy/member/getByUserId	");
});
AndSellH5MainModule.service('memberFactory', function (http) {
    this.getMemberByUID = http.post('/member/memberData/getById');
});