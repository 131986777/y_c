angular.module('AndSell.Main').controller('member_member_memberData_Controller', function ($scope, $state, $stateParams, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户资料');

    $scope.memberId = $stateParams.id;

    var andSellData = angular.module("AndSell.data");

    $scope.initLoad = function () {
        $scope.citys = andSellData.citys;
        $scope.loadMemberData();
    };

    //新  选择省/市/区
    $scope.newSheng = function (value) {
        $scope.ADDR_SHENG = value;
        $scope.ADDR_SHI = "";
    }
    $scope.newShi = function (value) {
        $scope.ADDR_SHI = value;
        $scope.ADDR_XIAN = "";
    }
    $scope.newXian = function (value) {
        $scope.ADDR_XIAN = value;
    }

    $scope.loadMemberData = function () {
        memberFactory.getMemberData($scope.memberId, function (response) {
            $scope.memberData = response.data[0];
            $scope.bindAddr(response.data[0]);
        }, null);
    };

    $scope.initLoad();

    //设置页面Bottom触发事件
    modalFactory.setBottom(true, function () {
        $scope.onSubmit();
    }, function () {
        //取消事件
        $state.go('member/member/memberList');
    });

    $scope.onSubmit = function () {
        if ($scope.memberData['MEMBER_INFO.TRUE_NAME'] == undefined) {
            modalFactory.showAlert("真实姓名不能为空。");
            return;
        }
        if ($scope.ADDR_SHENG != undefined && $scope.ADDR_SHENG != '') {

            $scope.memberData['MEMBER_INFO.ADDR_SHENG'] = $scope.ADDR_SHENG.p;
            if ($scope.ADDR_SHI != undefined) {
                $scope.memberData['MEMBER_INFO.ADDR_SHI'] = $scope.ADDR_SHI.n;
            }
            if ($scope.ADDR_XIAN != undefined) {
                $scope.memberData['MEMBER_INFO.ADDR_XIAN'] = $scope.ADDR_XIAN.s;
            }
        }
        memberFactory.modMemberDataById($scope.memberData, function (response) {
            modalFactory.showShortAlert("保存成功");
            $scope.initLoad();
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    /*
     将省市县的值绑定到地址组件中去
     */
    $scope.bindAddr = function (data) {
        if (data['MEMBER_INFO.ADDR_SHENG'] != null && data['MEMBER_INFO.ADDR_SHENG'] != "") {
            for (var i in $scope.citys) {
                if (data['MEMBER_INFO.ADDR_SHENG'] == $scope.citys[i].p) {
                    $scope.ADDR_SHENG = $scope.citys[i];
                    if (data['MEMBER_INFO.ADDR_SHI']
                        != null
                        && data['MEMBER_INFO.ADDR_SHI']
                        != "") {
                        for (var b in $scope.citys[i].c) {
                            if (data['MEMBER_INFO.ADDR_SHI'] == $scope.citys[i].c[b].n) {
                                $scope.ADDR_SHI = $scope.citys[i].c[b];
                                if (data['MEMBER_INFO.ADDR_XIAN'] != null && data.xian != "") {
                                    for (var d in $scope.citys[i].c[b].a) {
                                        if (data['MEMBER_INFO.ADDR_XIAN']
                                            == $scope.citys[i].c[b].a[d].s) {
                                            $scope.ADDR_XIAN = $scope.citys[i].c[b].a[d];
                                            break;
                                        }

                                    }
                                }
                                break;
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
});

