
angular.module('AndSell.Main').controller('marketing_banner_banner_Controller', function ($scope,$http, $stateParams, bannerFactory, modalFactory) {

  modalFactory.setTitle('横幅列表');
    $scope.uploadImageFiles ='';
    $scope.FILE_SERVER_DOMAIN = FILE_SERVER_DOMAIN;

    connALiYun();

  $scope.bindData = function (response) {

    //  console.log(response);
      $scope.bannerList={};
      $scope.bannerList = response.data;
      $scope.positionList= response.extraData.positionList;
      $scope.positionMap = response.extraData.positionMap;


  };

    $scope.addBannerInfo = function () {
      //  console.log('add');

        $scope.add['BANNER.PICTURE']=$scope.uploadImageFiles;
       //  console.log($scope.add['BANNER.PICTURE']);
        var startTime=document.getElementById("startTime").value;
        startTime=startTime.replace("T"," ");
       // console.log(startTime);
        $scope.add['BANNER.BEGIN_DATETIME']=startTime;  //开始时间



        var endTime=document.getElementById("endTime").value;
        endTime=endTime.replace("T"," ");
        $scope.add['BANNER.END_DATETIME']=endTime;  //结束时间
      //  console.log( $scope.add['BANNER.END_DATETIME']);

        bannerFactory.addBanner($scope.add).get({}, function (response) {

            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);

            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $scope.add = {};
                $("#addBanner").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

    $scope.modifyTime=function(timeStr){
       // console.log(123);
       // console.log(timeStr);
        var temp =timeStr+'';
        temp=temp.split('.')[0];
        temp = temp.replace(" ",'T');
       // console.log(temp);
        return temp;
    };
  $scope.modifyClick = function (item) {

      $scope.mod=clone(item);
      $scope.uploadImageFiles=$scope.mod['BANNER.PICTURE'];


  };

  $scope.modBannerInfo = function () {
      var mstartTime=document.getElementById("mStartTime").value;

      mstartTime=mstartTime.replace("T"," ");

      $scope.mod['BANNER.BEGIN_DATETIME']=mstartTime;  //开始时间



      var mendTime=document.getElementById("mEndTime").value;
      mendTime=mendTime.replace("T"," ");
      $scope.mod['BANNER.END_DATETIME']=mendTime;  //结束时间


     $scope.mod['BANNER.PICTURE']=$scope.uploadImageFiles;

    bannerFactory.modifyBanner($scope.mod).get({}, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        $("#modBanner").modal('hide');
        modalFactory.showShortAlert("修改成功");
          $scope.$broadcast('pageBar.reload');
      }
    });
  };

    $scope.stopBanner= function (item) {

        if (item['BANNER.STATE'] == 1) {
            modalFactory.showAlert("确认停用吗?", function () {
                item['BANNER.STATE'] = -1;
                bannerFactory.stopBannerById (item).get({}, function (res) {
                    if (res.extraData.state = 'true') {
                        modalFactory.showShortAlert("停用成功");
                        $scope.$broadcast('pageBar.reload');
                    }
                });
            });
        } else {
            item['BANNER.STATE'] = 1;
            bannerFactory.stopBannerById (item).get({}, function (res) {
                if (res.extraData.state = 'true') {
                    modalFactory.showShortAlert("启用成功");
                    $scope.$broadcast('pageBar.reload');
                }
            });
        }


    };
  $scope.delBanner = function (item) {

    modalFactory.showAlert("确认删除吗?", function () {
      bannerFactory.delBannerById(item).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.$broadcast('pageBar.reload');
        }
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
    $scope.uploadImage = function (element) {
        _uploadFiles(element.files, $scope.uploadImageFiles, 'image', function (errResponse) {
          //  console.log(errResponse);
        }, function (successResponse) {
            $scope.uploadImageFiles=successResponse.url;
           // console.log(successResponse);
           // console.log($scope.uploadImageFiles);
        });
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
        fileName = date.getTime()+ (Math.round(Math.random() * 1000)).toString() + '.' + fileSuffix;    //文件名
        fd.append('OSSAccessKeyId', 'LTAImVQlWKQXIQcD');
        fd.append('policy', $scope.policy);
        fd.append('Signature', $scope.signature);
        if (filetype == 'image') {
            fd.append('key', '10000/Banner'+ '/image/' + fileName);  //filePath为用户的ServiceId
        }
        fd.append('success_action_status', '201');
        fd.append('file', file);              //'file'必须为表单的最后一个字段
        var url2 = 'http://babuluo-file.oss-cn-hangzhou.aliyuncs.com';    //阿里云存储的地址

        return $http.post(url2, fd, {
            transformRequest: angular.identity, headers: {'Content-Type': undefined}
        });
    };


});

