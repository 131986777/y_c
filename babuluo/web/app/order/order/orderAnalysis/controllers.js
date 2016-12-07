/**
 * Created by cynara on 2016/12/1.
 */
angular.module('AndSell.Main').controller('order_order_orderAnalysis_Controller', function ($scope, $stateParams, orderFactory, modalFactory) {

    modalFactory.setTitle("销售分析");
    modalFactory.setBottom(false);

    $scope.initLoad=function () {

    }
});
function chart(){
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: '商品销售折线图'
        },
        tooltip: {
            trigger:'axis'
        },
        legend: {
            data:['销量']
        },
        grid:{
            show:true,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"],
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 100, 20, 20, 20, 20, 20, 20,22,26,30]
        }]
    };
    myChart.setOption(option);
}