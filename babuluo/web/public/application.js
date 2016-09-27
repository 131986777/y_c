var AndSellRouter = angular.module('AndSell.Router', ['ui.router']);
var AndSellService = angular.module('AndSell.Service', ['ngResource']);
var AndSellUI = angular.module('AndSell.UI', ['nya.bootstrap.select','ngTagsInput']);
var AndSellMainModule = angular.module('main', ['AndSell.Service', 'AndSell.Router', 'AndSell.UI']);

AndSellService.constant('baseURL', 'http://localhost:8080/AndSell/-service');

AndSellRouter.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('app', {
        url: '/', views: {
          'nav': {
            templateUrl: '/AndSell/app/components/nav/nav.html'
          },
          //'sidebar': {
          //  templateUrl: '/AndSell/app/components/sidebar/sidebar.html'
          //},
          'footer': {
            templateUrl: '/AndSell/app/components/footer/footer.html'
          }
        }
      });

  $urlRouterProvider.otherwise('/');
});

AndSellUI.service('modalFactory', function ($rootScope) {

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

  this.showPageAlert = function (msg, func) {
    $rootScope.$broadcast("page-modal", {
      message: msg, callback: func
    });
  }
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

AndSellUI.directive('pageBar', function (http) {
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
        if (pageIndex != $scope.currentPage && !(pageIndex < 1 || pageIndex > $scope.totalPage )) {
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
          obj.pageSize = $scope.selectPageSize;
        } else {
          obj.pageSize = $scope.initPageSize;
        }
        obj.pageIndex = $scope.currentPage;
        http.post($scope.url, obj, function (data) {
          if (data.code == 0) {
            $scope.pageObject = data.data;
            $scope.totalPage = data.data.lastPage;
            $scope.totalCount = data.data.totalCount;

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
        if (!(scope.currentPage < 1 || scope.currentPage > scope.totalPage )) {
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
//自定义时间过滤器
AndSellUI.filter('FormatStrDate', function () {
  return function (input) {
    var date = new Date(input);
    var formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatDate;
  }
});