/**
 * Created by remix on 2016/12/8.
 */
angular.module('AndSell.Main').controller('analysis_analysis_dailyAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle("经营日报");
    modalFactory.setBottom(false);

    function getDailySource(startDay,endDay) {
        analysisFactory.getshopDailyChangeByRange().get({},function (response) {
            console.log(response);

        },null);
    }
});

