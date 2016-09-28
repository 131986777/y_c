AndSellMainModule.controller('MemberDetailsController', function ($scope, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户详情');

    modalFactory.setBottom(true);

    $scope.memberAdd = {};
    $scope.memberEdited = {};
    $scope.memberFilter = {};

    $scope.initLoad = function () {


    };

    $scope.loadMemberDetails = function () {

        $scope.deferLoad = $q.defer();

        $scope.loadSource();

        $scope.promiseAll = $q.all([$scope.deferLoad.promise]);

        $scope.promiseAll.then(function () {

            $scope.memberList = response.data;
            console.log($scope.memberList);
        });
    };

    $scope.initLoad();

    $scope.sourceMap = new Map;
    //加载客户来源
    $scope.loadSource = function () {

        memberSourceFactory.getMemberSourceList().get({}, function (response) {
            console.log(response);
            $scope.sourceList = response.data;
            $scope.sourceList.forEach(function (ele) {
                $scope.sourceMap.set(ele['member_code_source.CODE'], ele['member_code_source.NAME']);
            });
            $scope.deferLoad.resolve(response);
        }, null);
    };

    $scope.changeState = function (ml) {
        if (ml['member.USE_STATE'] == 1) {
            //停用
            ml['member.USE_STATE'] = -1;
            modalFactory.showAlert("确定停用客户：［" + ml['member.USER_NAME'] + "］?", function () {
                memberFactory.modMemberListById(ml).get({}, function (response) {
                    if (response.extraData.state == 'true') {
                        modalFactory.showShortAlert("停用客户成功");
                    }
                });
            });
        } else {
            //启用
            ml['member.USE_STATE'] = 1;
            memberFactory.modMemberListById(ml).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert("启用客户成功");
                }
            });
        }
    };

    //用于清除填写的内容
    $scope.clearForm = function () {
        $scope.memberAdd['member.USER_NAME'] = undefined;
        $scope.memberAdd['member.LOGIN_ID'] = undefined;
        $scope.memberAdd['member.MOBILE'] = undefined;
        // $scope.shopAdd['shop.latitude'] = undefined;
        // $scope.shopEdited['shop.longtude'] = undefined;
        // $scope.shopEdited['shop.latitude'] = undefined;
    };

    //用于清除地图的内容
    $scope.clearMap = function () {
        document.getElementById("tipinput").value = null;
        document.getElementById("lnglat").value = null;
    };
});

