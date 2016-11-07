
angular.module('AndSell.Main').controller('marketing_sales_sales_salesList_Controller', function ($scope, $stateParams, salesFactory, modalFactory) {

    modalFactory.setTitle('促销管理');
    modalFactory.setBottom(false);


    var salePlanMap=[{id:1,name:'单件商品促销'},
        {id:2,name:'按商品类别促销'},
        {id:3,name:'按商品标签促销'}
    ];


    $scope.salePlanMap = salePlanMap


    $scope.getCurrentPro = function(item) {
        $scope.updatePlanForm = clone(item);
        if(item['SALES_PLAN.TARGET_OBJ_ID'] == null){
            $scope.currentPro = null;
        }
        else{
            $scope.currentPro = item['SALES_PLAN.TARGET_OBJ_ID'].split(',');
        }
    }

    $scope.prdSwitch = function (data) {
        console.log(data);
        var array = new Array();

        for (var i = 0; i < data.length; i++) {
            array.push(data[i]['SHOP_PRODUCT_SKU.SKU_ID']);
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
        $scope.save(form);
    }

    /*$scope.prdSwitch = function (data) {
        var array = new Array();
        var addarray = $scope.currentPro;

        for (var i = 0; i < data.length; i++) {
                array.push(data[i]['SHOP_PRODUCT_SKU.PRD_ID']);
            }
        if(addarray != null){
            for (var i = 0; i < addarray.length; i++) {
                array.push(addarray[i]);

            }
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
        $scope.save(form);
    }*/

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
        //var addarray = $scope.currentClass;

        for (var i = 0; i < data.length; i++) {
            array.push(data[i]['SHOP_PRODUCT_CLASS.CLASS_ID']);
        }
        /*if(addarray != null){
            for (var i = 0; i < addarray.length; i++) {
                array.push(addarray[i]);
            }
        }*/

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
        $scope.save(form);
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
        //var addarray = $scope.currentTag;

        for (var i = 0; i < data.length; i++) {
            array.push(data[i]['SHOP_TAG.TAG_ID']);
        }

        /*if(addarray != null){
            for (var i = 0; i < addarray.length; i++) {
                array.push(addarray[i]);
            }
        }*/

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
        $scope.save(form);

    }

    $scope.save = function (form){
        salesFactory.ModifySalesProduct(form). get({}, function (response) {
            if (response.code == 400) {
                modalFactory.showShortAlert(response.msg);
            } else if (response.extraData.state == 'true') {
                modalFactory.showShortAlert('修改成功');
                $("#addSalePlan").modal('hide');
                $scope.initLoad();
            }
        })
    }


  $scope.bindData = function (response) {
          console.log(response);
          $scope.salesPlan = response.data;
          //商品类别的ID和名称的Map
          $scope.proClassInfo = response.extraData.proClassMap;
          //商品的ID和名称的Map
          $scope.productMap = response.extraData.productMap;
          //得到促销规则的ID和类型的Map
          $scope.salesTypeMap = response.extraData.salesTypeMap;
          //获得促销规则的ID和详细信息的Map
          $scope.salesMap = response.extraData.salesMap;
          //获得促销规则详情
          $scope.salesList = response.extraData.salesList;
          //获得商品标签的ID和名称的Map
          $scope.tagMap = response.extraData.tagMap;
          //获得商品标签的ID和促销针对的Map
          $scope.salesTarget = response.extraData.salesTarget;

          //获得优惠券信息
          $scope.couponMap = response.extraData.couponMap;

          //获得sku列表
          $scope.skuList = response.extraData.skuList;
          $scope.skuMap = response.extraData.skuMap;
          $scope.urlMap = response.extraData.urlMap;
          $scope.proAndSkuInfoMap = response.extraData.proAndSkuInfoMap;


          $scope.salesPlan.forEach(function(ele){
              $scope.salesList.forEach(function(item){
                  if(ele['SALES_PLAN.SALE_ID'] == item['SALES.ID']){
                      var totalArray = new Array();
                      if(item['SALES.SALE_TYPE'] == 3 ) {
                          for (var i = 1; i <= 6; i++) {
                              if (item['SALES.CONDITION_NUM' + i] != null) {
                                  var jsonInfo = item['SALES.SALE_CONTENT' + i].toString();
                                  var info = JSON.parse(jsonInfo);
                                  var array = new Array();
                                  array.push(item['SALES.CONDITION_NUM' + i]);
                                  array.push($scope.proAndSkuInfoMap[info['ProId']]);
                                  array.push(info['Num']);
                                  array.push($scope.skuMap[info['ProId']]);
                                  array.push($scope.urlMap[info['ProId']]);
                                  totalArray.push(array);
                                  $scope.salesDetailInfo = totalArray;
                              }
                              ele['salesInfo'] = $scope.salesDetailInfo;
                              ele['salesClass'] = item['SALES.SALE_TYPE'];
                          }
                      }
                      else if(item['SALES.SALE_TYPE'] == 4){
                          for (var i = 1; i <= 6; i++) {
                              if (item['SALES.CONDITION_NUM' + i] != null) {
                                  var jsonInfo = item['SALES.SALE_CONTENT' + i].toString();
                                  var info = JSON.parse(jsonInfo);
                                  var array = new Array();
                                  array.push(item['SALES.CONDITION_NUM' + i]);
                                  array.push($scope.couponMap[info['ProId']]);
                                  array.push(info['Num']);
                                  totalArray.push(array);
                                  $scope.salesDetailInfo = totalArray;
                              }
                              ele['salesInfo'] = $scope.salesDetailInfo;
                              ele['salesClass'] = item['SALES.SALE_TYPE'];
                          }
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
  };

  $scope.addSalePlan=function () {
      $scope.add['SALES_PLAN.BEGIN_DATETIME'] = $scope.from;
      $scope.add['SALES_PLAN.END_DATETIME'] = $scope.to;

      if($scope.add['SALES_PLAN.NAME'] == ''||$scope.add['SALES_PLAN.INTRO'] == ''
                                            ||$scope.add['SALES_PLAN.SALE_ID']==''){
          alert('请输入完整信息');
      }
      else{
          var id = $scope.add['SALES_PLAN.SALE_ID'];
          if($scope.salesTarget[id] == 1){
              $scope.add['SALES_PLAN.TARGET_OBJ_TYPE'] =-1;
              console.log($scope.add);
          }
          salesFactory.AddSalesPlan($scope.add).get({}, function (response) {
              if (response.code == 400) {
                  modalFactory.showShortAlert(response.msg);
              } else if (response.extraData.state == 'true') {
                  modalFactory.showShortAlert('新增成功');
                  $scope.empty();
                  $("#addSalePlan").modal('hide');
              }
              $scope.$broadcast('pageBar.reload');
          });
      }
  };


   $scope.detailClick = function (item){
        $scope.detaileInfo = clone(item);
    }


  $scope.modSalePlan = function (form) {
      console.log(form);
      salesFactory.ModifySalesProduct(form).get({}, function (res) {
          if (res.extraData.state = 'true') {
              modalFactory.showShortAlert("修改成功");
          }
          $scope.$broadcast('pageBar.reload');
      })
  };

  $scope.stopSalesPlan = function (item) {
      if(item['SALES_PLAN.STATE']==1){
          modalFactory.showAlert("确认停用吗?", function () {
              item['SALES_PLAN.STATE']=-1;
              salesFactory.stopSalePlanById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("停用成功");
              }
                  $scope.$broadcast('pageBar.reload');
          });
      });
      } else{
          item['SALES_PLAN.STATE']=1;
          salesFactory.stopSalePlanById(item).get({}, function (res) {
              if (res.extraData.state = 'true') {
                  modalFactory.showShortAlert("启用成功");
              }
              $scope.$broadcast('pageBar.reload');
          });
      }
  } ;

  $scope.delSalesPlan = function (item) {
    modalFactory.showAlert("确认删除吗?", function () {
        item['SALES_PLAN.IS_DEL'] =1;
        salesFactory.delSalePlanById(item).get({}, function (res) {
        if (res.extraData.state = 'true') {
          modalFactory.showShortAlert("删除成功");
        }
            $scope.$broadcast('pageBar.reload');
      });
    });
  };

    $scope.show = function () {
        var id = $scope.add['SALES_PLAN.SALE_ID'];
        if($scope.salesTypeMap[id] == 3){
            $scope.showCont = true;
        }else {
            $scope.showCont = false;
        }
    }

  $scope.empty = function () {
      $scope.add = null;
      $scope.from = null;
      $scope.to = null;
  }

    $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked'
        /* }).on('click', function (ev) {
         $("#start_hour").datetimepicker("setEndDate", $("#end_hour").val());
         });*/
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });


    $('#end_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked',
        /* }).on('click', function (ev) {
         $("#end_hour").datetimepicker("setStartDate", $("#start_hour").val());
         });*/
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });



    $(document).ready(function() {
        $('#birthday').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

    $(document).ready(function() {
        $('#birthdayDate').daterangepicker({ singleDatePicker: true }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });
});

