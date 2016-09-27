AndSellMainModule.controller('memberListController', function ($scope, memberFactory, memberSourceFactory, modalFactory, $q) {

    //设置页面Title
    modalFactory.setTitle('客户管理');

    modalFactory.setBottom(false);

    $scope.memberAdd = {};
    $scope.memberEdited = {};
    $scope.memberFilter = {};

    $scope.bindData = function (response) {
        console.log(response);

        $scope.deferLoad = $q.defer();

        $scope.loadSource();

        $scope.promiseAll = $q.all([$scope.deferLoad.promise]);

        $scope.promiseAll.then(function () {

            $scope.memberList = response.data;
            console.log($scope.memberList);
        });

    };

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


    //新增客户
    $scope.addMemberList = function () {

        if ($scope.memberAdd['member.USER_NAME'] == undefined || $scope.memberAdd['member.LOGIN_ID'] == undefined || $scope.memberAdd['member.MOBILE'] == undefined) {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }
        $scope.memberAdd['member.LOGIN_PWD'] = "A123456";
        console.log($scope.memberAdd);
        memberFactory.addMemberList($scope.memberAdd).get({}, function (response) {
            if (response.code != undefined && (response.code == 4000 || response.code == 400)) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                $("#add").modal('hide');
                $scope.clearForm();
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

    $scope.getMemberListById = function (sl) {
        console.log(sl);
        $scope.memberEdited = clone(sl);
    };

    $scope.modMemberList = function () {

        if ($scope.memberEdited['member.USER_NAME'] == undefined || $scope.memberEdited['member.LOGIN_ID'] == undefined || $scope.memberEdited['member.MOBILE'] == undefined) {
            modalFactory.showAlert("请先填写完必填项。");
            return;
        }

        memberFactory.modMemberListById($scope.memberEdited).get({}, function (response) {
            if (response.extraData.state == 'true') {
                $('#edit').modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

    //删除客户
    $scope.delMemberListById = function (ml) {
        modalFactory.showAlert("确定删除客户：［" + ml['member.USER_NAME'] + "］?", function () {
            memberFactory.delById(ml).get({}, function (response) {
                if (response.extraData.state == 'true') {
                    $scope.$broadcast('pageBar.reload');
                }
            });
        });
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

