/**
 * Created by sunsai on 2016/5/14.
 */

(function () {

  var app = angular.module('weUI',[]);

  app.provider('weUI', function () {
    this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout', '$window', '$controller', '$injector',
      function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller, $injector) {
        var $body = $document.find('body');

        var privateMethods = {
          getArguments:function(e){
            var params = [];
            if(angular.isString(e)){
              params =  e.match(/\S+/g);
            }
            return params;
          },
          destroy:function(e){
            var as = this.getArguments(e);
            for(var i=0;i<as.length;i++){
              if (document.querySelector(as[i])){
                document.querySelector(as[i]).remove();
              }
            }
          },
          ruleSelector:function(selector){
            function uni(selector) {
              if(selector!=null){
                return selector.replace(/::/g, ':')
              }
            }
            return Array.prototype.filter.call(
                Array.prototype.concat.apply([],
                    Array.prototype.map.call(document.styleSheets, function(x) {
                      return Array.prototype.slice.call(x.cssRules);
                    })), function(x) {
                  return uni(x.selectorText) === uni(selector);
                });
          }
        };


        var publicMethods = {
          dialog:{
            alert:function(title, body, doneCallback) {

              var opts = {title:title, body:body, done:doneCallback};
              if (opts.title == undefined) {
                opts.title = "提示";
              }

              var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
              scope.show = function(){
                scope.dialogAlert = true;
              };
              scope.hide= function(){
                if(angular.isFunction(opts.done)){
                  opts.done();
                }
                scope.dialogAlert = false;
              };
              angular.extend(scope,opts);
              privateMethods.destroy(".weui_dialog_alert");
              $body.append($compile(
                  "<div class='weui_dialog_alert'  ng-show='dialogAlert'>" +
                  "<div class='weui_mask'></div>" +
                  "<div class='weui_dialog'>" +
                  "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>{{title}}</strong></div>" +
                  "<div class='weui_dialog_bd'>{{body}}</div>" +
                  "<div class='weui_dialog_ft'>" +
                  "<a class='weui_btn_dialog primary' ng-click='hide()'>确定</a>" +
                  "</div>" +
                  "</div>" +
                  "</div>"
              )(scope));
              scope.show();
            },
            /*
             * @param {Object} options:
             * - title {String}
             * - body {String}
             * - scope {Object}
             * - preSureCallback {Function}
             * - preCancelCallback {Function}
             * @return {Object} dialog
             */
            confirm:function(title, body, doneCallback, cancelCallback){
              var opts = {title:title, body:body, done:doneCallback, cancel:cancelCallback};

              if (opts.title == undefined) {
                opts.title = "提示";
              }
              if (opts.title == undefined) {
                opts.title = "";
              }

              var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
              scope.show = function(){
                scope.dialogConfirm = true;
              };
              scope.hide= function(){
                if(angular.isFunction(opts.cancel)){
                  opts.cancel();
                }
                scope.dialogConfirm = false;
              };
              scope.sure= function(){
                if(angular.isFunction(opts.done)){
                  opts.done();
                }
                scope.dialogConfirm = false;
              };
              angular.extend(scope,opts);
              privateMethods.destroy(".weui_dialog_confirm");
              $body.append($compile(
                  "<div class='weui_dialog_confirm'  ng-show='dialogConfirm'>" +
                  "<div class='weui_mask'></div>" +
                  "<div class='weui_dialog'>" +
                  "<div class='weui_dialog_hd'><strong class='weui_dialog_title' ng-bind='title'></strong></div>" +
                  "<div class='weui_dialog_bd' ng-bind='body'></div>" +
                  "<div class='weui_dialog_ft'>" +
                  "<a class='weui_btn_dialog primary' ng-click='sure()'>确定</a>" +
                  "<a class='weui_btn_dialog default' ng-click='hide()'>取消</a>" +
                  "</div>" +
                  "</div>" +
                  "</div>"
              )(scope));
              scope.show();
            }
          },
          toast:{
            /*
             * @param {String} options: body type time
             * @return {Object} dialog
             */
            show:function(body, type, time, callback){
              var opts = {body:body, type:type, time:time, done:callback};
              var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
              scope.show = function(){
                scope.toast = true;
              };
              scope.hide= function(){
                scope.toast = false;
                if(angular.isFunction(opts.done)){
                  opts.done();
                }
              };
              angular.extend(scope,opts);
              privateMethods.destroy(".aweui-show #aweui-show");
              switch (opts.type){
                case "error":
                  // \EA0D
                  opts.type = "\\EA0D";
                  break;
                case "info":
                  // \EA0C
                  opts.type = "\\EA0C";
                  break;
                case "ok":
                  // \EA0C
                  opts.type = "\\EA08";
                  break;
                default:
                  opts.type = "\\EA08";
                  break;
              };
              $body.append($compile(
                  "<style id='aweui-show' type='text/css'>" +
                  ".weui_icon_toast:before {" +
                  "  content: '" + opts.type +
                  "' }" +
                  "</style>" +
                  "<div class='aweui-show'  ng-show='toast'>" +
                  "<div class='weui_mask_transparent'></div>" +
                  " <div class='weui_toast'>" +
                  "<i class='weui_icon_toast'></i>" +
                  "<p class='weui_toast_content'>{{body}}</p>" +
                  "</div>" +
                  "</div>"
              )(scope));
              scope.show();
              $timeout(function(){
                scope.hide();
              },scope.time);
            },
            ok:function(body, callback) {
              this.show(body, 'ok', 1300, callback);
            },
            error:function(body, callback) {
              this.show(body, 'error', 1300, callback);
            },
            info:function(body, callback){
              this.show(body, 'info', 1300, callback);
            },
            showLoading:function(opts){
              if(angular.isString(opts)){
                opts = {loadText:opts};
              }else if(angular.isObject(opts)){
                opts.loadText = opts.loadText || "数据加载中";
              }else{
                opts = {loadText:"数据加载中"};
              };
              var scope = opts.scope = angular.isObject(opts.scope) ? opts.scope.$new() : $rootScope.$new();
              scope.show = function(){
                scope.toast = true;
              };
              scope.hide= function(){
                scope.toast = false;
              };

              angular.extend(scope,opts);
              privateMethods.destroy(".weui_loading_toast");
              switch (opts.type){
                case "error":
                  // \EA0D
                  opts.type = "\\EA0D";
                  break;
                case "info":
                  // \EA0C
                  opts.type = "\\EA0C";
                  break;
                default:
                  opts.type = "\\EA08";
                  break;
              };
              $body.append($compile(
                  "<div class='weui_loading_toast aweui-show'>" +
                  " <div class='weui_mask_transparent'></div>" +
                  "  <div class='weui_toast'>" +
                  "<div class='weui_loading'>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_0'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_1'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_2'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_3'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_4'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_5'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_6'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_7'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_8'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_9'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_10'></div>" +
                  " <div class='weui_loading_leaf weui_loading_leaf_11'></div>" +
                  "</div>" +
                  " <p class='weui_toast_content'>{{loadText}}</p>" +
                  "</div>" +
                  "</div>"
              )(scope));
              return scope;
            },
            hideLoading:function(){
              privateMethods.destroy(".weui_loading_toast");
            }
          }
        };
        return publicMethods;
      }];
  });



  return app;
})();