
AndSellMainModule.controller('salesListController', function ($scope, $stateParams, salesFactory, modalFactory) {

    modalFactory.setTitle('促销管理');
    modalFactory.setBottom(false);


    var planList=[{id:1,name:'单个商品促销'},
        {id:2,name:'某个类别促销'},
        {id:1,name:'某个标签促销'},
        {id:1,name:'订单促销'}
    ];

    $scope.planList =  planList;


    $scope.getCurrentPro = function(item) {
        $scope.updatePlanForm = clone(item);
        if(item['SALES_PLAN.TARGET_OBJ_ID'] == null){
            $scope.currentPro = null;
        }
        else{
            $scope.currentPro = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
            console.log($scope.currentPro);
        }
    }

    $scope.prdSwitch = function (data) {
        var array = new Array();
        var addarray = $scope.currentPro;

        for (var i = 0; i < data.length; i++) {
                array.push(data[i]['SHOP_PRODUCT_SKU.PRD_ID']);
            }
        for (var i = 0; i < addarray.length; i++) {
                array.push(addarray[i]);

        }

        var result = [];
        for(var i=0; i<array.length; i++){
            if(result.indexOf(array[i])==-1){
                result.push(array[i])
            }
        }
            //插入促销商品
            $scope.updatePlanForm['SALES_PLAN.TARGET_OBJ_ID'] = result;
            var form = {};
            form = $scope.updatePlanForm;
            salesFactory.ModifySalesProduct(form). get({}, function (response) {
                if (response.code == 400) {
                    modalFactory.showShortAlert(response.msg);
                } else if (response.extraData.state == 'true') {
                    modalFactory.showShortAlert('新增成功');
                    $("#addSalePlan").modal('hide');
                    $scope.$broadcast('pageBar.reload');
                }
            })
    }

    $scope.getCurrentClass = function(item) {
        $scope.updatePlanForm = clone(item);
        if(item['SALES_PLAN.TARGET_OBJ_ID'] == null){
            $scope.currentClass = null;
        }
        else{
            $scope.currentClass = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    }

    $scope.classSwitch = function(data){
        var array = new Array();
        var addarray = $scope.currentClass;

        for (var i = 0; i < data.length; i++) {
            array.push(data[i]['SHOP_PRODUCT_CLASS.CLASS_ID']);
        }
        for (var i = 0; i < addarray.length; i++) {
                array.push(addarray[i]);
            }

        var result = [];
        for(var i=0; i<array.length; i++){
            if(result.indexOf(array[i])==-1){
                result.push(array[i])
            }
        }
        //插入促销商品
        $scope.updatePlanForm['SALES_PLAN.TARGET_OBJ_ID'] = result;
        var form = {};
        form = $scope.updatePlanForm;
        salesFactory.ModifySalesProduct(form). get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $("#addSalePlan").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        })
    }

    $scope.getCurrentTag = function(item) {
        $scope.updatePlanForm = clone(item);
        if(item['SALES_PLAN.TARGET_OBJ_ID'] == null){
            $scope.currentTag = null;
        }
        else{
            $scope.currentTag = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    }

    $scope.tagSwitch = function (data) {
        var array = new Array();
        var addarray = $scope.currentTag;

        for (var i = 0; i < data.length; i++) {
            array.push(data[i]['SHOP_TAG.TAG_ID']);
        }
        for (var i = 0; i < addarray.length; i++) {
            array.push(addarray[i]);
        }
        var result = [];
        for(var i=0; i<array.length; i++){
            if(result.indexOf(array[i])==-1){
                result.push(array[i])
            }
        }
        //插入促销商品
        $scope.updatePlanForm['SALES_PLAN.TARGET_OBJ_ID'] = result;
        var form = {};
        form = $scope.updatePlanForm;
        salesFactory.ModifySalesProduct(form). get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('新增成功');
                $("#addSalePlan").modal('hide');
                $scope.$broadcast('pageBar.reload');
            }
        })
    }


  $scope.initLoad = function () {
      salesFactory.querySalesPlan().get({}, function (response) {
          console.log(response);
          $scope.salesPlan = response.data;

          //商品类别的ID和名称的Map
          $scope.proClassInfo = response.extraData.proClassMap;
          //商品的ID和名称的Map
          $scope.productMap = response.extraData.productMap;
          //获得促销规则的ID和详细信息的Map
          $scope.salesMap = response.extraData.salesMap;
          //获得促销规则详情
          $scope.salesList = response.extraData.salesList;
          //获得商品标签的ID和名称的Map
          $scope.tagMap = response.extraData.tagMap;

          $scope.salesPlan.forEach(function(ele){
              $scope.salesList.forEach(function(item){
                  if(ele['SALES_PLAN.SALE_ID'] == item['SALES.ID']){
                      var totalArray = new Array();
                      if(item['SALES.SALE_TYPE'] == 3){
                          for(var i =1;i<=6;i++){
                              if(item['SALES.CONDITION_NUM'+i] != null){
                                  var jsonInfo = item['SALES.SALE_CONTENT'+i].toString();
                                  var info = JSON.parse(jsonInfo);
                                  var array = new Array();
                                  array.push(item['SALES.CONDITION_NUM'+i]);
                                  array.push($scope.productMap[info['ProId']]);
                                  array.push(info['Num']);
                                  totalArray.push(array);
                                  $scope.salesDetailInfo = totalArray;
                              }
                          }
                          ele['salesInfo'] = $scope.salesDetailInfo;
                      }
                      else if(item['SALES.SALE_TYPE'] == 1||item['SALES.SALE_TYPE'] == 2){
                          for(var i =1;i<=6;i++){
                              if(item['SALES.CONDITION_NUM'+i] != null){
                                  var array = new Array();
                                  array.push(item['SALES.CONDITION_NUM'+i]);
                                  array.push(item['SALES.SALE_CONTENT'+i]);
                                  totalArray.push(array);
                                  $scope.salesDetailInfo = totalArray;
                              }
                              ele['salesInfo'] = $scope.salesDetailInfo;
                              ele['salesClass'] = item['SALES.SALE_TYPE'];
                          }
                      }
                  }
              })
          })
      })
  };
    $scope.initLoad();

  $scope.addSalePlan=function (form) {
      console.log(form);
      salesFactory.AddSalesPlan(form).get({}, function (response) {
      if (response.code == 400) {
        modalFactory.showShortAlert(response.msg);
      } else if (response.extraData.state == 'true') {
        modalFactory.showShortAlert('新增成功');
          $("#addSalePlan").modal('hide');
          $scope.$broadcast('pageBar.reload');
      }
    });
  };


   $scope.detailClick = function (item){
        $scope.detaileInfo = clone(item);
    }


  $scope.modSalePlan = function (form) {
      console.log(form);
      salesFactory.ModifySalesProduct(form).get({}, function (res) {
          if (res.extraData.state = 'true') {
              modalFactory.showShortAlert("修改成功");
              $scope.$broadcast('pageBar.reload');
          }
      })
  };

  $scope.stopSalesPlan = function (item) {
      if(item['SALES_PLAN.STATE']==1){
          modalFactory.showAlert("确认停用吗?", function () {
              item['SALES_PLAN.STATE']=-1;
              salesFactory.stopSalePlanById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("停用成功");
                  $scope.$broadcast('pageBar.reload');
              }
          });
      });
      } else{
          item['SALES_PLAN.STATE']=1;
          salesFactory.stopSalePlanById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("启用成功");
                  $scope.$broadcast('pageBar.reload');
              }
          });
      }
  } ;

  $scope.delSalesPlan = function (item) {
    modalFactory.showAlert("确认删除吗?", function () {
        item['SALES_PLAN.IS_DEL'] =1;
        salesFactory.delSalePlanById(item).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
          $scope.$broadcast('pageBar.reload');
        }
      });
    });
  }
});
