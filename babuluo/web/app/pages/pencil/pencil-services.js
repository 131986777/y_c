'use strict';

angular.module('pencilService', ['ngResource'])

    .constant('baseURL', 'http://localhost:8080/AndSell/')

    .service('pencilFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getPencils = function () {

            return $resource(baseURL + "/bubu/bubu/PENCIL_4/query", null, {'update': {method: 'PUT'}});
        };


        this.getComment = function () {
            return $resource(baseURL + '-service/shop/product/comment/queryAll', null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        this.getCommentById = function (id) {
            return $resource(baseURL + '-service/shop/product/comment/getById?shop_product_comment.COMMENT_ID=:COMMENT_ID', {'COMMENT_ID': id}, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        this.getTag = function () {
            return $resource(baseURL + '-service/shop/tag/queryAll', null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

    }]);

