angular.module('AndSell.Main').controller('salesRuleModifyController', function ($scope, $stateParams, salesFactory, modalFactory) {

    modalFactory.setTitle('促销规则详情');

    modalFactory.setBottom(true);

    $scope.initLoad = function () {
        var form = {};
        form['SALES.ID'] = $stateParams.id;
        salesFactory.querySalesById(form, function (response) {
            console.log(response);
            $scope.bindData(response);
        });
    }

    $scope.initLoad();
    $scope.bindData = function (response) {
        $scope.salesInfo = response.data[0];
    };

    modalFactory.setBottom(true, function () {
        salesFactory.ModifySalesState($scope.salesInfo, function (response) {
            modalFactory.showShortAlert("保存成功");
            $scope.empty();
            $scope.$broadcast('pageBar.reload');
        }, function (response) {
            modalFactory.showShortAlert(response.msg);
        });
    });

    //前端Jquery逻辑
    $(function () {
        $('.checkbox').click(function () {
            if ($('#meiman').is(":checked")) {
                $('.meimanjian-ruler').removeClass('hidden');
                $('.manjian-ruler').addClass('hidden');
            } else {
                $('.meimanjian-ruler').addClass('hidden');
                $('.manjian-ruler').removeClass('hidden');
            }
        });

        var len = $('.radio').length;
        for (var i = 0; i < len; i++) {
            $('.radio').eq(i).click(function () {
                //点击显示
                $(this).children('.content').removeClass('hidden');
                $(this).siblings().children('.content').addClass('hidden');
            });
        }

        $('.addItem').on("click", function () {
            var a = $(this).parents('.content'), b = a.find('.hidden');
            if (b.length == 1) {
                b.eq(0).removeClass('hidden');
                $(this).addClass('hidden');
            } else {
                b.eq(0).removeClass('hidden');
            }
        });
        $('.itemDel').click(function () {
            $(this).parents('.detailBox').addClass('hidden');
            if ($(this).parents('.content').find('.hidden').length < 6) {
                $('.content').children('.addItem').removeClass('hidden');
            }
        });
    })

});


