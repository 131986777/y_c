var app=angular.module('app',[])
app.service('loginServer', function() {
	//获取当前用户角色，门店的看不了，储值卡导入和开卡
	this.getcookie = function getcookie(name){
		var strcookie=document.cookie;
		var arrcookie=strcookie.split("; ");
		for(var i=0;i<arrcookie.length;i++){
		var arr=arrcookie[i].split("=");
		if(arr[0]==name)return arr[1];
		}
		return "";
	}


});

angular.module('AndSell.Main').controller('card_card_cardList_Controller', function (http, $scope,loginServer, $stateParams, cardFactory, modalFactory, fileUpload) {

    modalFactory.setTitle('已开会员卡');
    $scope.item={};
    $scope.cardAdd = {};
    $scope.isFaceValue = false;
    $scope.memberDetail = {};
    $scope.getCookie = function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if(arr = document.cookie.match(reg))

			return unescape(arr[2]);
		else
			return null;
	}
    $scope.cookies=  $scope.getCookie('ADM')

    $scope.filter = {
        'MEMBER_CARD.STATE': '-1,1'
    };

    $scope.bindData = function (response) {
        $scope.cardList = response.data;
        $scope.querySize = response.extraData.page.querySize;
        $scope.typeMap = response.extraData.typeMap;
        $scope.sourceList = response.extraData.sourceList;
        $scope.shopList = response.extraData.shopList;
        $scope.typeListMap = response.extraData.typeListMap;
        $scope.ACCOUNT_TYPE= loginServer.getcookie('ACCOUNT_TYPE');        
        console.log(response);
    };

    $scope.queryMemberById = function (loginId) {
        cardFactory.getUIDByLOGINID({'MEMBER.LOGIN_ID': loginId}, function (response) {
            if (response.data.length != 0) {
                $scope.memberDetail['MEMBER.USER_ID'] = response.data[0]['MEMBER.USER_ID'];
                var temp = response.data[0]['MEMBER.MOBILE'];
                cardFactory.getMemberInfoByUserId({'MEMBER_INFO.USER_ID': response.data[0]['MEMBER.USER_ID']}, function (response1) {
                    $scope.memberDetail['MEMBER.USER_NAME'] = response1.data[0]['MEMBER_INFO.TRUE_NAME'];
                    console.log(response1.data[0]);
                    $scope.memberDetail['MEMBER.MOBILE'] = temp;
                });
            } else {
                modalFactory.showAlert("未找到该客户");
            }
        });

    };

    $scope.queryTypeBySourceId = function (sourceId) {
        $scope.typeList = $scope.typeListMap[sourceId];
        $scope.filter['MEMBER_CARD.TYPE_ID'] = 'null';
        console.log($scope.typeList);
    };

    $scope.addQueryTypeBySourceId = function (sourceId) {
        $scope.typeListAdd = $scope.typeListMap[sourceId];
        $scope.cardAdd['MEMBER_CARD.TYPE_ID'] = 'null';
        console.log($scope.typeListAdd);
    };

    $scope.addCard = function () {
        if ($scope.memberDetail == undefined) {
            modalFactory.showAlert("未选择客户");
            return;
        }
        if ($scope.cardAdd['MEMBER_CARD.SOURCE_ID'] == 'null') {
            modalFactory.showAlert("请选择发卡渠道");
            return;
        }
        if ($scope.cardAdd['MEMBER_CARD.TYPE_ID'] == 'null') {
            modalFactory.showAlert("请选择卡类型");
            return;
        }
        if ($scope.cardAdd['MEMBER_CARD.BALANCE'] < 0) {
            modalFactory.showAlert("金额不能小于0");
            return;
        }
        if ($scope.isNull($scope.cardAdd['MEMBER_CARD.BALANCE'])) {
            $scope.cardAdd['MEMBER_CARD.BALANCE'] = 0;
        }
        $scope.cardAdd['MEMBER_CARD.USER_ID'] = $scope.memberDetail['MEMBER.USER_ID'];
        if ($scope.isFaceValue == false) {
            $scope.cardAdd['MEMBER_CARD.IS_FACE_VALUE'] = -1;
            $scope.cardAdd['MEMBER_CARD.FACE_VALUE'] = 0;
        } else {
            $scope.cardAdd['MEMBER_CARD.IS_FACE_VALUE'] = 1;
            if ($scope.cardAdd['MEMBER_CARD.FACE_VALUE']
                - $scope.cardAdd['MEMBER_CARD.BALANCE']
                < 0) {
                modalFactory.showAlert("可用余额不可大于面额！");
                return;
            }
        }

        if ($scope.isNull($scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'])) {
            $scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'] = 0;
        }
        cardFactory.addMemberCard($scope.cardAdd, function (response) {
            $("#cardList").modal('hide');
            $scope.clearForm();
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    };

    //用于清除填写的内容
    $scope.clearForm = function () {
        $scope.cardAdd['MEMBER_CARD.SOURCE_ID'] = "null";
        $scope.cardAdd['MEMBER_CARD.TYPE_ID'] = "null";
        $scope.cardAdd['MEMBER_CARD.CARD_NO'] = undefined;
        $scope.cardAdd['MEMBER_CARD.FACE_VALUE'] = undefined;
        $scope.cardAdd['MEMBER_CARD.CARD_NO'] = undefined;
        $scope.cardAdd['MEMBER_CARD.BALANCE'] = undefined;
        $scope.cardAdd['MEMBER_CARD.FREEZE_BALANCE'] = undefined;
        $scope.isFaceValue = false;
        $scope.memberId = undefined;
        $scope.memberDetail = {};
    };

    $scope.query = function () {

        $scope.Member = {};
        if ($scope.isNotNull($scope.query['MEMBER_CARD.CARD_NO'])) {
            $scope.filter['MEMBER_CARD.CARD_NO'] = $scope.query['MEMBER_CARD.CARD_NO'];
        } else {
            $scope.filter['MEMBER_CARD.CARD_NO'] = "null";
        }
        if ($scope.isNotNull($scope.query['MEMBER_CARD.MEMBER'])) {

            $scope.Member['MEMBER.LOGIN_ID'] = $scope.query['MEMBER_CARD.MEMBER'];
            $scope.Member['MEMBER.MOBILE'] = $scope.query['MEMBER_CARD.MEMBER'];
            cardFactory.getUIDByLOGINID($scope.Member, function (response) {
                if (response.data.length != 0) {
                    $scope.filter['MEMBER_CARD.USER_ID'] = response.data[0]['MEMBER.USER_ID'];
                } else {
                    cardFactory.getUIDByMobile($scope.Member, function (response) {
                        if (response.data.length != 0) {
                            $scope.filter['MEMBER_CARD.USER_ID'] = response.data[0]['MEMBER.USER_ID'];
                        } else {
                            $scope.filter['MEMBER_CARD.USER_ID'] = -1;
                        }
                    });
                }
            });
        } else {
            $scope.filter['MEMBER_CARD.USER_ID'] = "null";
        }
    };

    $scope.frezzeCard = function (item) {
    	//item['FINANCE_LIST.EVENT_INTRO']=prompt("请输入冻结卡备注","");
    	modalFactory.showPrompt("请输入冻结操作者及原因",function(response){
    	  item['FINANCE_LIST.EVENT_INTRO']=response;
      	  if (item['FINANCE_LIST.EVENT_INTRO']!=null && item['FINANCE_LIST.EVENT_INTRO']!="")
      	    {
      		  modalFactory.showAlert("确认冻结卡号：" + item['MEMBER_CARD.CARD_NO'] + "吗？", function () {
      	            cardFactory.frezzeCard(item, function () {
      	                item['MEMBER_CARD.STATE'] = -1;
      	            }, function (response) {
      	                modalFactory.showShortAlert(response.msg);
      	            });
      	        });
      	    }else{  modalFactory.showAlert("冻结失败！请输入冻结卡操作者和原因！");}
    	});
    }
//销卡
    $scope.pinCard = function (item) {
    	//item['FINANCE_LIST.EVENT_INTRO']=prompt("请输入冻结卡备注","");
    	modalFactory.showPrompt("请输入销卡操作者及原因",function(response){
    	  item['FINANCE_LIST.EVENT_INTRO']=response;
      	  if (item['FINANCE_LIST.EVENT_INTRO']!=null && item['FINANCE_LIST.EVENT_INTRO']!="")
      	    { item['REMARK']=item['FINANCE_LIST.EVENT_INTRO'];
      	      item['CARD_NO']=item['MEMBER_CARD.CARD_NO'];
      	      item['PHONE']=item['MEMBER_CARD.MEMBER_LOGIN_ID'];
      		  modalFactory.showAlert("确认线上销卡：" + item['MEMBER_CARD.CARD_NO'] + "吗？", function () {
      	          console.log(item); 
      			  cardFactory.pinCard(item, function () {
      	               
      	            }, function (response) {
      	                modalFactory.showShortAlert(response.msg);
      	            });
      	        });
      	    }else{  modalFactory.showAlert("线上销卡失败！请输入销卡操作者和原因！");}
    	});
    } 
   //申请退vip卡
    $scope.empty = function (item) {
    	 $scope.item=item;
    	 cardFactory.getMemberCardList({'MEMBER_CARD.USER_ID':  item['MEMBER_CARD.USER_ID']}, function (response) {
             var cardList=[];
             var vipcardList=[];
             var map = {};
             var money = 0;
             for (var int = 0; int < response.data.length; int++) {
                     map[response.data[int]['MEMBER_CARD.CARD_ID']] = response.data[int];
                     money = money + Number(response.data[int]['MEMBER_CARD.BALANCE']);
              
            	 var obj={}
            	if( response.data[int]['MEMBER_CARD.TYPE_ID']==3007){
            		obj=response.data[int];
            		cardList.push(obj);
            	}
			}
             $scope.cardMap = map;
             $scope.cardTotalMoney = moneyFormat(money);
             $scope.cardListy = cardList;
             console.log($scope.MEMBER_CARD_ID)
             $scope.MEMBER_CARD_ID='null';
             console.log(response.data);
         });

    }
    //销卡
    $scope.getCardBalance = function (id) {
        var card = $scope.cardMap[id];
        if (card != undefined) {
            $scope.memberDetail['MEMBER.BALANCE'] = card['MEMBER_CARD.BALANCE'];
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
    $scope.savePinCard=function(){
    	if($scope.MEMBER_CARD_ID=='null'||$scope.MEMBER_CARD_ID==''||$scope.MEMBER_CARD_ID==null||$scope.MEMBER_CARD_ID==undefined){
    		modalFactory.showAlert('请选择返点的会员卡')
    		return;
    	}
    	
    	console.log($scope.MEMBER_CARD_ID)
    	console.log($scope.item);
    	var item={};
    	item=$scope.item;
    	//检验返点的卡是否一致
//    		cardFactory.checkRebatesCard(item, function (response) {
//    		console.log("212");
//    		console.log(response.data);
//    		$scope.RebatesCard=response.data;
//    		if (response.data.length != 0) {
////   			for (var int = 0; int < response.data.length; int++) {
////	   				if(response.data[int]['FINANCE_LIST.EVENT_INTRO']!=("返点"+$scope.MEMBER_CARD_ID)){
////	   					response.data[int]['FINANCE_LIST.EVENT_INTRO']
////	   				modalFactory.showAlert('请选择同一返点的会员卡')
////	  				return false;
////	  				
////	   				}
////				}
//    				  if($scope.RebatesCard[0]['FINANCE_LIST.EVENT_INTRO']!=("返点"+$scope.MEMBER_CARD_ID)){
//    					  console.log($scope.RebatesCard[0]['FINANCE_LIST.EVENT_INTRO']);
//    					  it=true;
//    					  return;
//    				  }
//    		}
//			});
    	//检验卡是否一致
	    	   var aDataSet=null;
	           $.ajax({  
	               type : "post",  
	                url : "http://localhost:8080/AndSell/bubu/member/balance/checkRebatesCard",  
	                data : "MEMBER_CARD.USER_ID=" + $scope.item['MEMBER_CARD.USER_ID'],  
	                async : false,  
	                success : function(data){  
	                  aDataSet = data.data; 
	                  console.log(aDataSet);
	                }  
	           }); 
	           if (aDataSet.length != 0) {
	        	   if(aDataSet[0]['FINANCE_LIST.EVENT_INTRO']!=("返点"+$scope.MEMBER_CARD_ID)){
		        	   modalFactory.showAlert('请选择同一返点的会员卡');
		        	   return;
		           }
	           }
    	 item['FINANCE_LIST.EVENT_INTRO']="返点"+$scope.MEMBER_CARD_ID;//需要返点的卡
		   cardFactory.frezzeCard(item, function () {
			item['MEMBER_CARD.STATE'] = -1;
			 $("#balance").modal('hide');  
			}, function (response) {
			modalFactory.showShortAlert(response.msg);
			});
    }
    $scope.FrozenCard = function (item) {
    	 item['FINANCE_LIST.EVENT_INTRO']=null;
    	modalFactory.showPrompt("请输入解冻卡操作者及原因",function(a){
    		item['FINANCE_LIST.EVENT_INTRO']=a
    		  if (item['FINANCE_LIST.EVENT_INTRO']!=null && item['FINANCE_LIST.EVENT_INTRO']!=""){
        		  modalFactory.showAlert("确认解冻卡号：" + item['MEMBER_CARD.CARD_NO'] + "吗？", function () {
        	            cardFactory.FrozenCard(item, function () {
        	                item['MEMBER_CARD.STATE'] = 1;
        	            }, function (response) {
        	                modalFactory.showShortAlert(response.msg);
        	            });
        	        });
        	  }else{ modalFactory.showAlert("启用失败！请输入启用卡操作者和原因！");}
    	});
    }
    //卡解绑
    $scope.unwrap = function (item) {
    	//item['FINANCE_LIST.EVENT_INTRO']=prompt("请输入冻结卡备注","");
    	 item['FINANCE_LIST.EVENT_INTRO']=null;
    	modalFactory.showPrompt("请输入解绑卡操作者及原因",function(a){
    		item['FINANCE_LIST.EVENT_INTRO']=a
    		  if (item['FINANCE_LIST.EVENT_INTRO']!=null && item['FINANCE_LIST.EVENT_INTRO']!=""){
        		  modalFactory.showAlert("卡号绑错，确认解绑卡号：" + item['MEMBER_CARD.CARD_NO'] + "吗？", function () {
        	            cardFactory.unwrap(item, function () {
        	                item['MEMBER_CARD.STATE'] = -1;
        	            }, function (response) {
        	                modalFactory.showShortAlert(response.msg);
        	            });
        	        });
        	  }else{ modalFactory.showAlert("解绑失败！请输入解绑卡操作者和原因！");}
    	});
    }

    $scope.outPutQuery = function () {
    	$('#ouputBtn').attr("disabled","disabled");
        var url = "../../outputQuery";
        $scope.outputList = {};
        $scope.outputList['type'] = "card";
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

    $scope.downMoban = function () {
        var url = "/AndSell/file/download/template/ValueCard.xlsx";
        window.location.href = url;
    };
    
    $scope.initState = function(){
    	$scope.STATE_CHECK = false;
    }
    
    $scope.changeState = function(){
    	if($scope.STATE_CHECK == true){
        	modalFactory.showShortAlert("冻结导入的所有卡");
        }
    }

    $scope.uploadFile = function () {

        var file = $scope.myFile;
        var state = 1;
        if($scope.STATE_CHECK == true){
        	state =  -1;
        }
        if (file == undefined) {
            modalFactory.showShortAlert("请选择文件");
            return;
        }
        if (file.type == "application/vnd.ms-excel" || file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            var uploadUrl = "../../SimpleFileupload";
            fileUpload.uploadFileToUrl(file, uploadUrl, function (response) {
                if (response == "success") {
                    $scope.importValueCard(file.name,state);
                    $("#czkCardIn").modal('hide');
                }
            });

        } else {
            modalFactory.showShortAlert("请导入Excel文件");
            $scope.myFile = undefined;
        }
    };

    $scope.importValueCard = function (fileName,state) {
        var url = "../../importValueCard";
        $scope.file = {};
        $scope.file['fileUrl'] = fileName;
        $scope.file['STATE'] = state;
        modalFactory.showShortAlert("正在导入，请稍等，请勿进行其他操作。");
        http.post_ori(url, $scope.file, function (response) {
            if (response == "success") {
                modalFactory.showShortAlert("储值卡导入成功");
                $scope.$broadcast('pageBar.reload');
            }
        });
    };

    $scope.isNull = function (str) {
        return str == null || str == '';
    };

    $scope.isNotNull = function (str) {
        return !$scope.isNull(str);
    };


    $scope.filterTime = function (type) {
        if (type == 'all') {
            $scope.filter['MEMBER_CARD.ADD_DATETIME_FROM'] = '';
            $scope.filter['MEMBER_CARD.ADD_DATETIME_TO'] = '';
        }
    };

    $('#start_hour').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        minView: 'month',
        format: 'yyyy/mm/dd',
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
        minView: 'month',
        format: 'yyyy/mm/dd',
        todayBtn: 'linked'
    }).on("hide", function () {
        var $this = $(this);
        var _this = this;
        $scope.$apply(function () {
            $scope[$this.attr('ng-model')] = _this.value;
        });
    });

});
