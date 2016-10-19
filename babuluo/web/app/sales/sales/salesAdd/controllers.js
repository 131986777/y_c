AndSellMainModule.controller('salesAddController', function ($scope, $stateParams, salesFactory, modalFactory) {
    $(function(){

        var len = $('.radio').length;
        for(var i = 0 ; i<len;i++){
            $('.radio').eq(i).click(function(){
                //点击显示
                $(this).children('.content').removeClass('hidden');
                $(this).siblings().children('.content').addClass('hidden');
            });
        }

        $('.addItem').on("click",function(){
            var a = $(this).parents('.content'),
                b = a.find('.template').clone();
            b.removeClass("template hidden").addClass("detail");
            var c = a.find('.detailBox');
            c.append(b);
            $('.itemDel').on('click',function(){
                $(this).parents('.detail').remove();

            });
        });

    })
});