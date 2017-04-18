/**
 * Created by liutao on 2017/4/17.
 */
AndSellH5MainModule.service('groupBuyGroupFactory', function (http) {
    this.getAllGroupByGbpId = http.post("/group/buy/group/getAllByGbpId");
});
AndSellH5MainModule.service('groupBuyMemberFactory', function (http) {
    this.getAllMemberInGbgIds = http.post("/group/buy/member/getInGbgIds");
});
AndSellH5MainModule.service('memberFactory', function (http) {
    this.getMemberByUID = http.post('/member/memberData/getById');
});