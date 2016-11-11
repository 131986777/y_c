angular.module('AndSell.H5.Main').controller('pages_home_Controller', function ($scope, $state, weUI, modalFactory, shopFactory) {

    modalFactory.setTitle('主页');
    modalFactory.setBottom(true);
    $scope.homeList=new Array();
    $scope.limitList=new Array();
    $scope.groupList=new Array();
    $scope.activityList=new Array();
    $scope.recommendList=new Array();
    $scope.recommThreeList=new Array();
    $scope.recommNineList=new Array();
    //商品搜索
    $scope.searchPrd = function () {
        $state.go('pages/product/list', {keyword: $scope.prdKeyword});
    }

    $scope.initData = function () {
        var id = getCookie('currentShop');
        if (id == undefined || id.trim() == '') {
            weUI.toast.info('请先选择门店');
            $state.go('pages/shop');
        } else {
            shopFactory.getShopById(id).get({}, function (response) {
                $scope.shopInfo = response.data[0];
                if ($scope.shopInfo != undefined) {
                    setCookie('currentShopInfo', JSON.stringify($scope.shopInfo));
                }
            });
        }
        // 设置轮播图图片间隔
              $scope.myInterval = 4000;
               // 轮播图数据初始化
              $scope.slides = new Array;
              // 添加轮播图源
              $scope.slides.push({ image: 'http://img1.gtimg.com/9/910/91061/9106175_980x1200_960.jpg'});
              $scope.slides.push({ image: 'http://files.15w.com/image/2015/0621/14348708842995.png'});


        shopFactory.getBannerList().get({}, function (response) {    //横幅列表
            console.log(response.data);
            var dataList=response.data;

            dataList.forEach(function (ele) {
                if (ele['BANNER.POSITION_ID']==1012){   //首页
                    $scope.homeList.push(ele);
                }
                if (ele['BANNER.POSITION_ID']==1013){        //限时抢购
                    $scope.limitList.push(ele);
                    //获取到限时抢购的开始时间和结束时间
                    var startTime=new Date(ele['BANNER.BEGIN_DATETIME'].split('.')[0]).getTime();    //开始时间
                    var  endTime=new Date(ele['BANNER.END_DATETIME'].split('.')[0]).getTime();      //结束时间
                    var currentTime=new Date().getTime();      //当前时间 毫秒

                    setInterval(function () {
                        if(currentTime>startTime&&currentTime<endTime){   //如果当前时间在活动时间内
                            currentTime+=1000;
                            fomtime(endTime-startTime);
                        }else{
                         clearInterval();
                        }

                    },1000);

                }
                if (ele['BANNER.POSITION_ID']==1014){    //  团购
                    $scope.groupList.push(ele);
                }
                if (ele['BANNER.POSITION_ID']==1015){      //活动专区
                    $scope.activityList.push(ele);
                }
                if (ele['BANNER.POSITION_ID']==1016){     //今日推荐
                    $scope.recommendList.push(ele);
                }
                if (ele['BANNER.POSITION_ID']==1017){     //今日推荐三连排
                    $scope.recommThreeList.push(ele);
                }
                if (ele['BANNER.POSITION_ID']==1018){     //今日推荐九宫格
                    $scope.recommNineList.push(ele);
                }
            })

        });

    }


            //以毫秒为单位
   var  fomtime = function  (a)    //实现倒计时
    {
        var b=new Date();
        b.setTime(0);
        var c=new Date();
        c.setTime(a);
        var day1=b.getDate();        //为方便调用，把天数、小时等单独定义
        var hours1=b.getHours();
        var minu1=b.getMinutes();
        var seco1=b.getSeconds();
        var day2=c.getDate();
        var hours2=c.getHours();
        var minu2=c.getMinutes();
        var seco2=c.getSeconds();
        var day=day2-day1;
        var hours=hours2-hours1;
        var minu=minu2-minu1;
        var seco=seco2-seco1;
        console.log(day);
        $scope.day=day;
        $scope.hour=hours;
        $scope.minute=minu;
        $scope.second=seco;
        console.log(7988);
        console.log($scope.day);


    }





});
