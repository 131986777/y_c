//noinspection JSAnnotator
angular.module('AndSell.Main').controller('sys_comment_Controller', function ($scope,$http,modalFactory) {

    //设置页面Title
    modalFactory.setTitle('评论管理');


    modalFactory.setBottom(false);

    $scope.isShowState = function (ele) {
        if(ele['SHOP_COMMENT.STATE']==1){
            return "设为不可见";
        }
        else if(ele['SHOP_COMMENT.STATE']==-1){
            return "设为可见";
        }else{
            return "";
        }
    }

    $scope.bindData = function (response) {
        $scope.allComments = response.data;
    }

    $scope.query = function () {
        $scope.filter['SHOP_COMMENT.CONTENT'] = $scope.queryContent;
    };

    $scope.showDetailById = function (ele) {
        $scope.comment = ele;
    }

    $scope.isShow = function (ele) {
        alert('sss');
        ele['SHOP_COMMENT.STATE'] *= -1;
        alert(ele['SHOP_COMMENT.COMMENT_ID']);
        $.post('/AndSell/bubu/shop/comment/modifyById',{'SHOP_COMMENT.COMMENT_ID':ele['SHOP_COMMENT.COMMENT_ID'],'SHOP_COMMENT.STATE':ele['SHOP_COMMENT.STATE']},function (resp) {
            if(resp.extraData.state == 'true'){
                if(ele['SHOP_COMMENT.STATE']==1){
                    modalFactory.showShortAlert('已设为可见');
                }
                if(ele['SHOP_COMMENT.STATE']==-1){
                    modalFactory.showShortAlert('已设为不可见');
                }
            }
        });
        $scope.$apply();
    }
});

