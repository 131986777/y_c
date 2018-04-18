/**
 * Created by remix on 2016/12/21.
 */
angular.module('AndSell.Main').controller('analysis_analysis_liveAnalysis_Controller', function ($scope, $stateParams, analysisFactory, modalFactory) {
    modalFactory.setTitle('直播间');
});
function fullScreen() {
    var win=window.open("live.html","_blank","resizable=no;status=yes;toolbar=no;location=no;menubar=no;directories=no;scrollbars=no;top=0;");
    win.moveTo(0,0);
    win.resizeTo(screen.availWidth,screen.availHeight);
}