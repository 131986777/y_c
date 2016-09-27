var AndSellRouter = angular.module('AndSell.Router', ['ui.router']);
var AndSellService = angular.module('AndSell.Service', ['ngResource']);
var AndSellUI = angular.module('AndSell.UI', ['nya.bootstrap.select', 'ngTagsInput', 'AndSell.Service']);
var AndSellMainModule = angular.module('AndSell.Main', ['AndSell.Service', 'AndSell.Router', 'AndSell.UI']);

AndSellService.constant('baseURL', 'http://localhost:8080/AndSell/bubu');

AndSellService.factory("http", function ($http) {
    var _post = function (url, data) {
        return $http.post(url, $.param(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    };

    var _get = function (url) {
        return $http.get(url);
    };

    var _postFile = function (url, file) {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(url, fd, {
            transformRequest: angular.identity, headers: {'Content-Type': undefined}
        });
    };

    return {
        post: function (url, data, successCallback, errorCallback) {
            return _post(url, data).success(function (result) {

                if (angular.isFunction(successCallback)) {
                    successCallback(result);
                }
            }).error(function (err) {
                if (angular.isFunction(errorCallback)) {
                    errorCallback(err);
                }
            });
        }, get: function (url, successCallback, errorCallback) {
            return _get(url).success(function (result) {
                if (angular.isFunction(successCallback)) {
                    successCallback(result);
                }
            }).error(function (err) {
                if (angular.isFunction(errorCallback)) {
                    errorCallback(err);
                }
            });
        }, postFile: function (url, fileData, successCallback) {
            return _postFile(url, fileData).success(function (response) {
                successCallback(response);
            });
        }
    };
});

AndSellUI.service('modalFactory', function ($rootScope) {

    this.setBottom = function (state, funcSubm, funcCanc) {
        var bottom = {};
        bottom.OnOffState = state;
        if (bottom.OnOffState) {
            bottom.SubmitFunc = funcSubm;
            bottom.CancelFunc = funcCanc;
        }
        $rootScope.$broadcast("nav-bottom", bottom);
    };

    this.setTitle = function (title) {
        $rootScope.$broadcast("title", title);
    };

    this.showAlert = function (msg, func) {
        $rootScope.$broadcast("to-modal", {
            message: msg, callback: func
        });
    };

    this.showShortAlert = function (msg, func) {
        $rootScope.$broadcast("to-short-modal", {
            message: msg, callback: func
        });
    };

});

AndSellUI.directive('messageModal', function () {
    return {
        scope: {
            title: '@title', btnLeft: '@cancel', btnRight: '@confirm'
        },
        templateUrl: "/AndSell/public/angular/template/modal.html",
        restrict: 'EA',
        transclude: true,
        link: function postLink(scope, element, attrs) {

            scope.title = '默认提示';

            scope.btnLeft = '取消';

            scope.callback = {};

            scope.btnRight = '确认';

            scope.ifShow = false;

            scope.$on('to-modal', function (d, data) {
                scope.title = data.message;
                scope.callback = data.callback;
                scope.ifShow = true;
                return true;
            });

            scope.btnLeftClick = function () {
                scope.ifShow = false;
            };

            scope.btnRightClick = function () {
                scope.ifShow = false;
                if (undefined != scope.callback) {
                    scope.callback();
                }
            };
        }
    };
});

AndSellUI.directive('shortMessageModal', function ($timeout) {
    return {
        scope: {
            title: '@title'
        },
        templateUrl: "/AndSell/public/angular/template/shortmodal.html",
        restrict: 'EA',
        transclude: true,
        link: function postLink(scope, element, attrs) {

            scope.title = '默认提示';

            scope.ifShow = false;
            scope.callback = {};

            scope.$on('to-short-modal', function (d, data) {
                scope.title = data.message;
                scope.callback = data.callback;
                scope.ifShow = true;
                $timeout(function () {
                    scope.ifShow = false;
                    if (undefined != scope.callback) {
                        scope.callback();
                    }
                }, 800);
                return true;
            });
        }
    };
});

AndSellUI.directive('showModal', function () {
    return {
        link: function (scope, elements) {
            elements[0].onclick = function () {
                $(this.id).modal('show');
            }
        }
    };
});

AndSellUI.directive('pageBar', function (http, baseURL) {
    return {
        restrict: 'EA', templateUrl: '/AndSell/public/angular/template/pageBar.html', scope: {
            callback: '&', url: '@', filter: '=filterObj'
        }, controller: function ($scope) {

            $scope.pageObject = {};
            $scope.initPageSize = 0;

            $scope.hasPrevPage = function () {
                return $scope.currentPage > 1;
            };

            $scope.hasNextPage = function () {
                return $scope.currentPage < $scope.totalPage;
            };

            $scope.changePage = function () {
                $scope.currentPage = $scope.currentPageMirror;
            };

            //只是页数改变
            $scope.loadPage = function (pageIndex) {
                if ( $scope.pageIndex != $scope.currentPage && !($scope.pageIndex
                    < 1 || $scope.pageIndex > $scope.totalPage )) {
                    $scope.currentPage = pageIndex;
                }
            };

            $scope.nextPage = function () {
                if ($scope.hasNextPage()) {
                    $scope.loadPage(parseInt($scope.currentPage) + 1);
                }
            };

            $scope.prevPage = function () {
                if ($scope.hasPrevPage()) {
                    $scope.loadPage(parseInt($scope.currentPage) - 1);
                }
            };

            $scope.loadData = function () {
                if ($scope.isInitLoad) {
                    $scope.isInitLoad = false;
                    return;
                }

                $scope.currentPageMirror = $scope.currentPage;
                var pageForm = $scope.filter;
                var obj = angular.copy(pageForm);
                $scope.initPageSize = obj.initPageSize;
                if ($scope.initPageSize == 0 || $scope.initPageSize == undefined) {
                    obj.PAGE_SIZE = $scope.selectPageSize;
                } else {
                    obj.PAGE_SIZE = $scope.initPageSize;
                }
                obj.PN = $scope.currentPage;
                var url = baseURL + $scope.url;
                http.post(url, obj, function (data) {
                    if (data != undefined && data.data.length > 0) {
                        $scope.pageObject = data.data;
                        var tmp = parseInt(data.extraData.page.querySize / data.extraData.page.pageSize);
                        $scope.totalPage =( tmp * data.extraData.page.pageSize == data.extraData.page.querySize) ? tmp : tmp
                        + 1;
                        $scope.totalCount = data.extraData.page.querySize;

                        if ($scope.totalCount == 0) {
                            $scope.showPageBar = false;
                        } else {
                            $scope.showPageBar = true;
                        }
                    }
                    $scope.callback({response: data});
                });
            };

        }, link: function (scope, element, attr) {

            scope.totalCount = 0;
            scope.pageSize = 10;
            scope.totalPage = 1;
            scope.isInitLoad = true;
            scope.currentPage = 1;
            scope.showPageBar = false;

            scope.$watch('selectPageSize', function () {
                if (!scope.isInitLoad) {
                    if (scope.currentPage == 1) {
                        scope.loadData();
                    } else {
                        scope.currentPage = 1;
                    }
                }
            });

            scope.$watch('currentPage', function () {
                if (!(scope.currentPage < 1 || scope.currentPage > scope.totalPage)) {
                    scope.loadData();
                }
            });
            if (undefined == scope.filter) {
                scope.filter = {};
            }
            scope.$watch('filter', function () {
                scope.currentPage = 1;
                scope.loadData();
            }, true);

            scope.$on("pageBar.reload", function (d, data) {
                scope.currentPage = 1;
                scope.loadData();
            });

        }
    };
});

AndSellUI.filter('FormatStrDate', function () {
    return function (input) {
        var date = new Date(input);
        var formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formatDate;
    }
});

AndSellUI.filter('FormatAllDate', function () {
    return function (input) {
        var date = new Date(input);
        var formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return formatDate;
    }
});

AndSellUI.filter('FormatState', function () {
    return function (input) {
        var a;
        if (input == 1) {
            a = "启用";
        }else if (input == -1){
            a = "停用";
        }
        return a;
    }
});

//
//AndSellRouter.config(function ($stateProvider, $urlRouterProvider) {
//  $stateProvider
//      .state('app', {
//        url: '/', views: {
//          'nav': {
//            templateUrl: '/AndSell/app/components/nav/nav.html'
//          }, //'sidebar': {
//          //  templateUrl: '/AndSell/app/components/sidebar/sidebar.html'
//          //},
//          'footer': {
//            templateUrl: '/AndSell/app/components/footer/footer.html'
//          }
//        }
//      });
//
//  $urlRouterProvider.otherwise('/');
//});
