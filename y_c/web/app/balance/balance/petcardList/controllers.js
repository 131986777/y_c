angular.module('AndSell.Main').controller('balance_balance_petcardList_Controller', function ($q, http, $scope, $stateParams, cardFactory, memberFactory, balanceFactory,analysisFactory, modalFactory, shopFactory) {
    modalFactory.setTitle('储值卡明细');
    modalFactory.setBottom(false);

    //获得所有资金明细
    $scope.bindData = function (response) {
        $scope.balanceList = response.data;
        $scope.querySize = response.extraData.page.querySize;
        console.log($scope.balanceList);
    };

    $scope.initData = function () {
        $scope.getShop();
        $scope.lastSearch = '';
        $scope.ACTIVITY_ID='';
        $scope.lastSearchType = 'LOGIN_ID';
        balanceFactory.getAllUsefulActivity({},function (response) {
            $scope.activitys=response.data;
        });
        analysisFactory.getList().get({},function (response) {
            $scope.list=response.data;
            angular.forEach($scope.list,function(data){
            	$("#shop").append("<option value='"+data['SHOP.SHOP_ID']+"'>"+data['SHOP.SHOP_NAME']+"</option>"); 
            });
            $('.selectpicker').selectpicker({  
                'selectedText': 'cat'  
            });
            $('.selectpicker').selectpicker('refresh');
            
        },null);
    }

    $scope.getShop = function () {
        shopFactory.getShopList({}, function (response) {
            $scope.shopList = response.data;
            $scope.shopMap = listToMap($scope.shopList, 'SHOP.SHOP_ID');
        });
    }


    //根据用户ID查询用户个人信息
    $scope.queryById = function (loginId) {
        if (loginId == '') {
            $scope.$broadcast('pageBar.reload');
            return;
        }
        $scope.memberDetail = {};
        $scope.cardList = {};
        memberFactory.getCardByLoginId({'MEMBER.LOGIN_ID': loginId}, function (response) {
            if (response.data.length > 0) {
                $scope.memberDetail['MEMBER.USER_ID'] = response.extraData.member['MEMBER.USER_ID'];
                var tempMOBILE = response.extraData.member['MEMBER.MOBILE'];
                var tempEMAIL = response.extraData.member['MEMBER.EMAIL'];
                $scope.cardList = response.data;
                var map = {};
                var money = 0;
                $scope.cardList.forEach(function (ele) {
                    map[ele['MEMBER_CARD.CARD_ID']] = ele;
                    money = money + Number(ele['MEMBER_CARD.BALANCE']);
                });
                $scope.cardMap = map;
                $scope.cardTotalMoney = moneyFormat(money);

                cardFactory.getMemberInfoByUserId({'MEMBER_INFO.USER_ID': response.extraData.member['MEMBER.USER_ID']}, function (response1) {
                    $scope.memberDetail['MEMBER.USER_NAME'] = response1.data[0]['MEMBER_INFO.TRUE_NAME'];
                    $scope.memberDetail['MEMBER.MOBILE'] = tempMOBILE;
                    $scope.memberDetail['MEMBER.EMAIL'] = tempEMAIL;
                });
            } else {
                modalFactory.showShortAlert("查不到相关数据");
            }
        });
    };

    $scope.getCardBalance = function (id) {
        var card = $scope.cardMap[id];
        if (card != undefined) {
            $scope.memberDetail['MEMBER.BALANCE'] = card['MEMBER_CARD.BALANCE'] / 100;
            $scope.memberDetail['MEMBER.CARD_ID'] = card['MEMBER_CARD.CARD_ID'];
            $scope.memberDetail['MEMBER.CARD_NO'] = card['MEMBER_CARD.CARD_NO'];
            $scope.memberDetail['MEMBER.CARD_TYPE_ID'] = card['MEMBER_CARD.TYPE_ID'];
            $scope.memberDetail.select = true;
        } else {
            $scope.memberDetail['MEMBER.BALANCE'] = undefined;
            $scope.memberDetail['MEMBER.CARD_ID'] = undefined;
            $scope.memberDetail['MEMBER.CARD_NO'] = undefined;
            $scope.memberDetail.select = false;
        }
    };

    //动态计算账户余额
    $scope.getDynamicBala = function () {
        if ($scope.changeType == undefined) {
            modalFactory.showShortAlert("请输入变更类型");
            return false;
        }
        if ($scope.modifyvalue == undefined || $scope.modifyvalue == '') {
            modalFactory.showShortAlert("请输入调整数值");
            return false;
        }
        if ($scope.memberDetail['MEMBER.CARD_NO'] != undefined) {
            if ($scope.changeType == 1) {
                $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])
                + parseFloat($scope.modifyvalue)).toFixed(2);
            } else {
                $scope.afterModify = (parseFloat($scope.memberDetail['MEMBER.BALANCE'])
                - parseFloat($scope.modifyvalue)).toFixed(2);
            }
        } else {
            if ($scope.changeType == 1) {
                $scope.afterModify = (parseFloat($scope.cardTotalMoney)
                + parseFloat($scope.modifyvalue)).toFixed(2);
            } else {
                $scope.afterModify = (parseFloat($scope.cardTotalMoney)
                - parseFloat($scope.modifyvalue)).toFixed(2);
            }
        }
        return true;
    }

    //保存时更新账户余额
    $scope.saveAccount = function () {
        if (!$scope.getDynamicBala()) {
            return;
        }
        if (isEmptyObject($scope.memberDetail)) {
            modalFactory.showAlert("未选择客户");
            return;
        }

        if ($scope.afterModify < 0) {
            modalFactory.showAlert("减少金额不能超过用户余额");
            return;
        }
        //给资金明细表添加记录--FINANCE_LIST（添加操作记录）
        $scope.ModifyBalanceInfo = {};
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_BALANCE'] = $scope.memberDetail['MEMBER.BALANCE'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_ID'] = $scope.memberDetail['MEMBER.CARD_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_TYPE_ID'] = $scope.memberDetail['MEMBER.CARD_TYPE_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.CARD_NO'] = $scope.memberDetail['MEMBER.CARD_NO'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.SERVICE_ID'] = $scope.memberDetail['MEMBER.SERVICE_ID'];
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT'] = "后台";
        $scope.ModifyBalanceInfo['FINANCE_LIST.EVENT_INTRO'] = $scope.introduction;
        $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_VALUE'] = $scope.modifyvalue;
        $scope.ModifyBalanceInfo['ACTIVITY_ID'] = $scope.ACTIVITY_ID;
        if ($scope.changeType == 1) {
            $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_TYPE'] = 'increase';
        } else {
            $scope.ModifyBalanceInfo['FINANCE_LIST.CHANGE_TYPE'] = 'decrease';
        }
        balanceFactory.addFinanceList($scope.ModifyBalanceInfo, function (response) {
            modalFactory.showShortAlert("资金调整成功");
            $("#balance").modal('hide');
            $scope.$broadcast('pageBar.reload');
            $scope.MEMBER_CARD_ID = "null";
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };
    //财务销卡
  //销卡
    $scope.pinCard = function () {
//    	console.log($scope.cardList);
//    	console.log($scope.cardTotalMoney);
//    	console.log($scope.cardBackMoney);
    	var item={};
    	//先销vip卡
    	item['FINANCE_LIST.EVENT_INTRO']='财务销vip无忧卡';
    	item['REMARK']='财务销vip无忧卡';
    	 $scope.cardList.forEach(function (ele) {
	    	item['CARD_NO']=ele['FINANCE_LIST.EVENT_CARD_NO'];
	    	item['MEMBER_CARD.CARD_NO']=ele['FINANCE_LIST.EVENT_CARD_NO'];
	    	item['PHONE']=ele['FINANCE_LIST.MEMBER_MOBILE'];
	    	item['MEMBER_CARD.USER_ID']=ele['FINANCE_LIST.USER_ID'];
	    	 console.log(item); 
	    	 cardFactory.pinCard(item, function (response) {
               console.log(response);
               var params={};
               params['FINANCE_LIST.ID']=ele['FINANCE_LIST.ID'];
               params['FINANCE_LIST.EVENT']='VIP卡冻结';
               cardFactory.modfiyRebatesCard(params, function (response) {
                }, function (response) {
                    modalFactory.showShortAlert(response.msg);
                });
               modalFactory.showShortAlert("销卡成功");
               $("#balance").modal('hide');
               $scope.$broadcast('pageBar.reload');
            }, function (response) {
                modalFactory.showShortAlert(response.msg);
            });
	    	
         });
    	//vip销卡成功返点黄卡balanceFactory
		 if($scope.cardBackMoney>0 && $scope.cardTotalMoney>=3000){
			 var yellowCard= $scope.cardList[0]['FINANCE_LIST.EVENT_INTRO'];
			 item['YELLOWCARD']=yellowCard.substring(2,yellowCard.length);
			 item['CARDBACKMONEY']=$scope.cardBackMoney;
			 item['REMARK']=$scope.cardList.length+"张无忧VIP卡共消费"+$scope.cardTotalMoney+"元，需要返点"+$scope.cardBackMoney;
			 console.log(item);
			 balanceFactory.backYellowCard(item,function(){
				 
			 })
		 }
    } 
    //根据登录ID查询财务信息
    $scope.queryFinanceByLoginId = function (content) {
        if ($scope.lastSearch != content || $scope.lastSearchType != $scope.searchType) {
            if ($scope.searchType == 'LOGIN_ID') {
                if (content == '') {
                    $scope.filter['FINANCE_LIST.CHANGE_VALUE'] = 'null';
                    $scope.filter['FINANCE_LIST.EVENT_CARD_NO'] = 'null';
                    $scope.filter['FINANCE_LIST.USER_ID'] = content;
                } else {
                    memberFactory.getUIDByLOGINID({'MEMBER.LOGIN_ID': content}, function (response) {
                        var ret = response.data;
                        if (ret.length > 0) {
                            $scope.filter['FINANCE_LIST.CHANGE_VALUE'] = 'null';
                            $scope.filter['FINANCE_LIST.EVENT_CARD_NO'] = 'null';
                            $scope.filter['FINANCE_LIST.USER_ID'] = ret[0]['MEMBER.USER_ID'];
                        } else {
                            modalFactory.showShortAlert('查不到相关信息');
                        }
                    });
                }
            } else if ($scope.searchType == 'PRICE') {
                $scope.filter['FINANCE_LIST.USER_ID'] = 'null';
                $scope.filter['FINANCE_LIST.EVENT_CARD_NO'] = 'null';
                $scope.filter['FINANCE_LIST.CHANGE_VALUE'] = Number(content) * 100;
                $scope.filter['FINANCE_LIST.EVENT_SOURCE_ID'] = 'null';
            } else if ($scope.searchType == 'CARD_NO') {
                $scope.filter['FINANCE_LIST.CHANGE_VALUE'] = 'null';
                $scope.filter['FINANCE_LIST.USER_ID'] = 'null';
                $scope.filter['FINANCE_LIST.EVENT_CARD_NO'] = content;
                $scope.filter['FINANCE_LIST.EVENT_SOURCE_ID'] = 'null';
            } else if ($scope.searchType == 'ORDER') {
                $scope.filter['FINANCE_LIST.CHANGE_VALUE'] = 'null';
                $scope.filter['FINANCE_LIST.USER_ID'] = 'null';
                $scope.filter['FINANCE_LIST.EVENT_CARD_NO'] = 'null';
                $scope.filter['FINANCE_LIST.EVENT_SOURCE_ID'] = content;
            }
            $scope.lastSearch = content;
            $scope.lastSearchType = $scope.searchType;
        } else {
            $scope.$broadcast('pageBar.reload');
        }
    };

    $scope.outPutQuery = function () {

    	$('#ouputBtn').attr("disabled","disabled");
        var url = "../../outputQuery";
        $scope.outputList = {};
        $scope.outputList['type'] = "finance";
        $scope.outputList['param'] = JSON.stringify($scope.filter);
        modalFactory.showReturnAlert("正在导出 请稍等",function(scope){
        	http.post_ori(url, $scope.outputList, function (response) {
        		scope.ifShow = false;
        		$('#ouputBtn').removeAttr("disabled");
                if (response != "failure") {
                    location.href = "/AndSell" + response;
                } else {
                    modalFactory.showShortAlert("导出失败");
                }
            });
			
		});
    };

    $scope.getFinanceListById = function (balanceInfo) {
        $scope.finMore = clone(balanceInfo);
    };
    //弹窗需要退的卡
    $scope.getalert = function (balanceInfo) {
        $scope.finMore = clone(balanceInfo);
        var item={};
        var arr = new Array('92000009118526','8003599238', '80038553', '80015193','80022650','80022640'); 
        item['MEMBER_CARD.USER_ID'] =balanceInfo['FINANCE_LIST.USER_ID'];
        balanceFactory.checkRebatesCard(item, function (response) {
        //查看申请退vip卡需要返点的钱
        	 $scope.cardList = response.data;
             var map = {};
             var money = 0;//已经消费金额
             var backmoney = 0;//需要返还的金额（两张卡消费金额大于等于3000，返现金额到门店会员卡，金额为消费金额的5%）
        	 $scope.cardList.forEach(function (ele) {
              //  map[ele['MEMBER_CARD.CARD_ID']] = ele;
        		// alert(arr.indexOf(ele['FINANCE_LIST.EVENT_CARD_NO']));
		          if(arr.indexOf(ele['FINANCE_LIST.EVENT_CARD_NO'])==-1){
		        	  money = money + (5000-Number(ele['FINANCE_LIST.BEFORE_CARD_BALANCE']))
		        	  ele['FINANCE_LIST.CHANGE_GIFT_VALUE']=5000-Number(ele['FINANCE_LIST.BEFORE_CARD_BALANCE']) ;
		        	  console.log(money);
		          }else{
		        	  console.log(money);
		        	  money = money + (10000-Number(ele['FINANCE_LIST.BEFORE_CARD_BALANCE']));
		        	  ele['FINANCE_LIST.CHANGE_GIFT_VALUE']=10000-Number(ele['FINANCE_LIST.BEFORE_CARD_BALANCE']);
		        	  
		          }
		        	  
             });
        	 console.log($scope.cardList);
        	 $scope.cardMap = map;
            
             console.log("消费达到多少钱"+money)
             if(money>=3000){
            	 backmoney=(money*0.05).toFixed(2);
            	// alert("需要返点的黄卡的金额"+backmoney);
            	 console.log("需要返点的黄卡的金额"+backmoney);
             }else{
            	 backmoney=0;
            	 console.log("消费没有达到不返点"+backmoney);
             }
             $scope.cardTotalMoney = money.toFixed(2);  //已经消费的金额
             $scope.cardBackMoney = backmoney; //需要返点的金额
             console.log( $scope.cardTotalMoney);
             console.log( $scope.cardBackMoney); 
            console.log(response.data);
        });
    };
	  
    $scope.delete = function () {
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
    }

    $scope.empty = function () {
        $scope.modifyvalue = null;
        $scope.afterModify = null;
        $scope.introduction = null;
        $scope.memberDetail = null;
        $scope.memberId = null;
        $scope.cardList = undefined;
        $scope.FINANCE_LIST_ID = 'null';
        $scope.changeType = 1;
        $scope.cardTotalMoney = 0;
    }

    $scope.fun = function () {
        var node = document.getElementById("hello");
        node.style.color = "black";
    }

    $scope.filterTime = function (type) {
        console.log(type);
        if (type == 'all') {
            console.log('in');
            $scope.filter['FINANCE_LIST.ADD_DATETIME_FROM'] = '';
            $scope.filter['FINANCE_LIST.ADD_DATETIME_TO'] = '';
        }
    };

    $scope.filterMoney = function (type) {
        console.log(type);
        if (type == 'all') {
            $scope.filter['FINANCE_LIST.MONEY_FROM'] = '';
            $scope.filter['FINANCE_LIST.MONEY_TO'] = '';
        }
    }

    $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked'
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
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

    $(document).ready(function () {
        $('#birthday').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
        $('#birthdayDate').daterangepicker({singleDatePicker: true}, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

});
