angular.module('AndSell.Main').controller('marketing_banner_banner_Controller', function ($q, $scope, $http, $stateParams, bannerFactory, modalFactory) {

    modalFactory.setTitle('横幅列表');
    $scope.uploadImageFiles1 = '';
    $scope.uploadImageFiles2 = '';
    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    connALiYun();

    $scope.bindData = function (response) {

        $scope.bannerList = response.data;
        $scope.positionList = response.extraData.positionList;
        $scope.positionMap = response.extraData.positionMap;

        $scope.tagList = response.extraData.tagList;
        $scope.tagMap = response.extraData.tagMap;

    };

    $scope.changeOrderNumUpDown = function (item, key, up) {

        var temp = item['BANNER.ORDER_NUM'];

        var formDown = {};
        formDown['BANNER.ID'] = item['BANNER.ID'];
        formDown['BANNER.ORDER_NUM'] = $scope.bannerList[key - 1 * Number(up)]['BANNER.ORDER_NUM'];
        bannerFactory.bannerUpDown(formDown, function (response) {
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
        var formUp = {};
        formUp['BANNER.ID'] = $scope.bannerList[key - 1 * Number(up)]['BANNER.ID'];
        formUp['BANNER.ORDER_NUM'] = temp;

        var deferred1 = $q.defer();
        var deferred2 = $q.defer();

        upDown(formDown, deferred1);
        upDown(formUp, deferred2);

        $q.all([deferred1.promise, deferred2.promise]).then(function (result) {
            $scope.$broadcast('pageBar.reload');
        })

    };

    var upDown = function (form, deferred) {

        bannerFactory.bannerUpDown(form, function (response) {
            deferred.resolve(response);
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    }

    $scope.addBannerInfo = function () {

        $scope.add['BANNER.PICTURE'] = $scope.uploadImageFiles1;
        $scope.add['BANNER.PICTURE2'] = $scope.uploadImageFiles2;
        var startTime = document.getElementById("startTime").value;
        startTime = startTime.replace("T", " ");
        $scope.add['BANNER.BEGIN_DATETIME'] = startTime;  //开始时间

        var endTime = document.getElementById("endTime").value;
        endTime = endTime.replace("T", " ");
        $scope.add['BANNER.END_DATETIME'] = endTime;  //结束时间

        bannerFactory.addBanner($scope.add, function (response) {
            modalFactory.showShortAlert('新增成功');
            $scope.add = {};
            $("#addBanner").modal('hide');
            $scope.$broadcast('pageBar.reload');
            $scope.uploadImageFiles1 = '';
            $scope.uploadImageFiles2 = '';
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.modifyTime = function (timeStr) {
        var temp = timeStr + '';
        temp = temp.split('.')[0];
        temp = temp.replace(" ", 'T');
        return temp;
    };
    $scope.modifyClick = function (item) {
        $scope.mod = clone(item);
        $scope.uploadImageFiles1 = $scope.mod['BANNER.PICTURE'];
        $scope.uploadImageFiles2 = $scope.mod['BANNER.PICTURE2'];
    };

    $scope.modBannerInfo = function () {
        var mstartTime = document.getElementById("mStartTime").value;

        mstartTime = mstartTime.replace("T", " ");

        if ($scope.mod['BANNER.URL'] == '' || $scope.mod['BANNER.URL'] == undefined) {
            $scope.mod['BANNER.URL'] = '{$null}';
        }

        $scope.mod['BANNER.BEGIN_DATETIME'] = mstartTime;  //开始时间

        var mendTime = document.getElementById("mEndTime").value;
        mendTime = mendTime.replace("T", " ");
        $scope.mod['BANNER.END_DATETIME'] = mendTime;  //结束时间

        $scope.mod['BANNER.PICTURE'] = $scope.uploadImageFiles1;
        $scope.mod['BANNER.PICTURE2'] = $scope.uploadImageFiles2;

        bannerFactory.modifyBanner($scope.mod, function (response) {
            $("#modBanner").modal('hide');
            modalFactory.showShortAlert("修改成功");
            $scope.$broadcast('pageBar.reload');
            $scope.uploadImageFiles1 = '';
            $scope.uploadImageFiles2 = '';
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    $scope.stopBanner = function (item) {

        if (item['BANNER.STATE'] == 1) {
            modalFactory.showAlert("确认停用吗?", function () {
                item['BANNER.STATE'] = -1;
                bannerFactory.stopBannerById(item, function (res) {
                    modalFactory.showShortAlert("停用成功");
                    $scope.$broadcast('pageBar.reload');
                });
            });
        } else {
            item['BANNER.STATE'] = 1;
            bannerFactory.stopBannerById(item, function (res) {
                modalFactory.showShortAlert("启用成功");
                $scope.$broadcast('pageBar.reload');
            });
        }

    };
    $scope.delBanner = function (item) {

        modalFactory.showAlert("确认删除吗?", function () {
            bannerFactory.delBannerById(item, function (res) {
                modalFactory.showShortAlert("删除成功");
                $scope.$broadcast('pageBar.reload');
            });
        });

    }

    //阿里云连接
    function connALiYun() {
        var actionUrl = "../../aliYun";
        $http.post(actionUrl).success(function (response) {
            $scope.filePath = response.split(',')[0];
            $scope.policy = response.split(',')[1];
            $scope.signature = response.split(',')[2];
        });
    }

    /**
     *  上传商品的图片， 最多上传6个
     **/
    $scope.uploadImage = function (element, index) {

        switch (index) {
            case 1:
                _uploadFiles(element.files, $scope.uploadImageFiles1, 'image', function (errResponse) {
                }, function (successResponse) {
                    $scope.uploadImageFiles1 = successResponse.url;
                });
                break;
            case 2:
                _uploadFiles(element.files, $scope.uploadImageFiles2, 'image', function (errResponse) {
                }, function (successResponse) {
                    $scope.uploadImageFiles2 = successResponse.url;
                });
                break;
        }
    };

    //上传文件
    var _uploadFiles = function (files, bindToList, type, errCall, successCall) {

        //发送请求
        _postFile(files, type).success(function (response) {
            // console.log(response);
            var state = '"state\":\"SUCCESS",';
            var title = '"title":' + '"' + fileName + '",';
            var original = '"original":' + '"' + file.name + '",';
            var type = '"type":' + '".' + fileSuffix + '",';

            var index1 = response.indexOf('<Key>');
            var index2 = response.indexOf('</Key>');
            fileurl = response.substring(index1 + 5, index2);
            var url = '"url":"' + fileurl + '",';
            var size = '"size":"' + file.size + '"';
            var json = '{' + state + title + original + type + url + size + '}';
            console.log('要返回的json字符串为' + json);
            var jsonObj = JSON.parse(json);   //将字符串装换为json对象;
            successCall(jsonObj);
        }).error(function (response) {
            errCall(response);
        });

    };

    var _postFile = function (file1, filetype) {
        file = file1[0];
        // console.log(file);
        var fd = new FormData();
        var date = new Date();
        var tempArray = file.name.split('.');
        fileSuffix = tempArray[tempArray.length - 1];     //文件后缀名
        fileName = date.getTime()
            + (Math.round(Math.random() * 1000)).toString()
            + '.'
            + fileSuffix;    //文件名
        fd.append('OSSAccessKeyId', 'LTAIEHpVQat6f83C');
        fd.append('policy', $scope.policy);
        fd.append('Signature', $scope.signature);
        if (filetype == 'image') {
            fd.append('key', '10000/Banner' + '/image/' + fileName);  //filePath为用户的ServiceId
        }
        fd.append('success_action_status', '201');
        fd.append('file', file);              //'file'必须为表单的最后一个字段
        var url2 = 'http://bbl-upload.oss-cn-shanghai.aliyuncs.com';    //阿里云存储的地址

        return $http.post(url2, fd, {
            transformRequest: angular.identity, headers: {'Content-Type': undefined}
        });
    };

});

