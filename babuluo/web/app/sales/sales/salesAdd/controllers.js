AndSellMainModule.controller('salesAddController', function ($scope, $stateParams, salesFactory, modalFactory) {
    $(function(){
        var len = $('.radio').length;
        for(var i = 0 ; i<len;i++){
            $('.radio').eq(i).click(function(){
                //点击显示
                $(this).children('.content').removeClass('hidden');
                $(this).siblings().children('.content').addClass('hidden');
                var detail_html = $(this).children('.detailBox').html();
                $(this).children('.addItem').click(function(){
                    $('.detailBox').append(detail_html);

                });
            });
        }
        $('.addItem').on("click",function(){
            var detail_html = $(this).siblings('.detailBox').html();
            $(this).siblings('.detailBox').append(detail_html);
        });

    })
});