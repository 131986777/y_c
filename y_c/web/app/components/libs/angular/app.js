angular.module("jiaOrder.service", ['blockUI'])
    .factory("http", function ($http, blockUI) {
            var _post = function (url, data) {
                return $http.post(url, $.param(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            };

            var _get = function (url) {
                return $http.get(url);
            };

            return {
                post: function (url, data) {
                    return _post(url, data);
                }, post: function (url, data, successCallback) {
                    return _post(url, data).success(function (result, status) {
                        successCallback(result, status);
                    });
                }, post: function (url, data, successCallback) {
                    return _post(url, data).success(function (result) {
                        successCallback(result);
                    });
                }, post: function (url, data, successCallback, errorCallback) {
                    return _post(url, data).success(function (result, status) {
                        successCallback(result, status);
                    }).error(function (err) {
                        errorCallback(err);
                    });
                }, post: function (url, data, successCallback, errorCallback) {
                    return _post(url, data).success(function (result) {
                        successCallback(result);
                    }).error(function (err) {
                        errorCallback(err);
                    });
                }
            };
        }
    );