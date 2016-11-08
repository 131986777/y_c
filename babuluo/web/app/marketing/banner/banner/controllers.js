
angular.module('AndSell.Main').controller('marketing_banner_banner_Controller', function ($scope, $stateParams, bannerFactory, modalFactory) {

  modalFactory.setTitle('横幅列表');

  $scope.bindData = function (response) {
   // console.log(123456);
      console.log(response);
      $scope.bannerList={};
      $scope.bannerList = response.data;
      $scope.positionList= response.extraData.positionList;
      $scope.positionMap = response.extraData.positionMap;
      console.log(response.extraData.positionMap);
      console.log($scope.positionList);

  };
  /*$scope.detailClick=function (item) {
    $scope.detail=item;
  }
*/
    $scope.addBannerInfo = function () {

        var startTime=document.getElementById("startTime").value;
       // console.log(startTime);
        startTime=startTime.replace("T"," ");
        console.log(startTime);
        $scope.add['BANNER.BEGIN_DATETIME']=startTime;  //开始时间



        var endTime=document.getElementById("endTime").value;
        endTime=endTime.replace("T"," ");
        $scope.add['BANNER.END_DATETIME']=endTime;  //结束时间
        console.log( $scope.add['BANNER.END_DATETIME']);

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
        console.log(123);
        console.log(timeStr);
        var temp =timeStr+'';
        //console.log(typeof (temp));
        temp = temp.replace(" ",'T');
        console.log(temp);
        return temp;
    };
  $scope.modifyClick = function (item) {

    $scope.mod=clone(item);
      var begintime=item['BANNER.BEGIN_DATETIME'];
      $scope.beginDay=begintime.split(" ")[0];
      $scope.beginTime=begintime.split(" ")[1];

      var endtime=item['BANNER.END_DATETIME'];
      $scope.endDay=endtime.split(" ")[0];
      $scope.endTime=endtime.split(" ")[1];


  };

  $scope.modBannerInfo = function () {
      var mstartTime=document.getElementById("mStartTime").value;
      // console.log(startTime);
      mstartTime=mstartTime.replace("T"," ");
      console.log(mstartTime);
      $scope.mod['BANNER.BEGIN_DATETIME']=mstartTime;  //开始时间



      var mendTime=document.getElementById("mEndTime").value;
      mendTime=mendTime.replace("T"," ");
      $scope.mod['BANNER.END_DATETIME']=mendTime;  //结束时间
      console.log( $scope.mod['BANNER.END_DATETIME']);



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

});

