/**
 * Created by remix on 2016/12/12.
 */
angular.module('AndSell.Main').controller('analysis_analysis_compareAnalysis_Controller', function ($scope, $stateParams,$timeout, analysisFactory, modalFactory) {
    modalFactory.setTitle("作站室");
    $scope.initLoad=function () {
        getSource('2016-12-01','2016-12-01');
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
    function getSource(startDay,endDay) {
        analysisFactory.getCompareChangeByRange(startDay,endDay).get({},function(response){
            console.log(response);
            var flag = response.data;
            for(var i = 0;i<flag.length;i++){

            }
        });
    }
});
//获取昨天
function getYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return yesterday.getFullYear()+"-"+(yesterday.getMonth()+1)+"-"+yesterday.getDate()
}
