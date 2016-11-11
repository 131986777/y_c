AndSellH5MainModule.service('userFactory', function ($resource, baseURL) {

    this.newUserReg = function (form) {
        return $resource(baseURL + '/member/member/reg',form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.login = function (form){
        return $resource(baseURL + '/login/login', form, {
            'update': {
                method: 'PUT'
            }
        });
    };

    this.isLogin = function () {
        return $resource(baseURL+'/login/isLogin',{},{
           'update':{
               method:'PUT'
           }
        });
    }

    this.loginOut = function () {
        return $resource(baseURL+'/login/logout',{},{
           'update':{
               method:'PUT'
           }
        });
    }

    this.sendVerificationCode = function (form) {
        return $resource(baseURL+'/sys/sms/reg',form,{
            'update':{
                method:'PUT'
            }
        });
    }

});