/**
 * Created by remix on 2016/12/12.
 */
angular.module('AndSell.Main').controller('analysis_analysis_compareAnalysis_Controller', function ($scope, $stateParams,$timeout, analysisFactory, modalFactory) {
    modalFactory.setTitle("作站室");
    $scope.initLoad=function () {
        $scope.val=true;
        var arr=[
            {"name":"日榜单",
                "val":true
            },
            {"name":"月榜单",
                "val":false
            },
            {"name":"周榜单",
                "val":false
            }
        ];
        $scope.arr=arr;
        var lastkey=-1;
        $scope.show=function (key) {
            if($scope.arr[key].val==false){
                if(lastkey==-1){
                    $scope.arr[0].val=false;
                    $scope.arr[key].val=!$scope.arr[key].val;
                    lastkey=key;

                }else {
                    $scope.arr[lastkey].val=false;
                    $scope.arr[key].val=!$scope.arr[key].val;
                    lastkey=key;
                }
            }
        }
    }
});



