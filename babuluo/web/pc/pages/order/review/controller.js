angular.module('AndSell.PC.Main').controller('pages_order_review_Controller', function (productFactory, $interval, $scope, $state, modalFactory, shopFactory) {

    modalFactory.setTitle("订单评论");

    modalFactory.setHeader(false);
    modalFactory.setShowMenu(true);
    modalFactory.setTab(true);
    modalFactory.setSide(true);
    $('.rating a').click(function(){
        var myclass=$(this).parent().attr('class');//找到a的父亲的class名
        myclass=myclass+'star';//拼接
        alert(myclass);

        //将a的父亲的父亲即ul的class删除再给他添加个新的class
        $(this).parent().parent().removeClass().addClass("rating "+myclass);
//		console.log(myclass);
        return false;//返回假，链接a不跳转

    });
});
