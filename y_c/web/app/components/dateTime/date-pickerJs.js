$(function () {
    /**
     * 隐藏默认时间初始化方法
     * 16.08.25
     * ZHJ
     */
    $('#date-pickerNew').datepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        format: 'yyyy/mm/dd hh:ii',
        todayBtn: 'linked'
    });


    $('#start_time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        minView: 2,
        format: 'yyyy-mm-dd',
        todayBtn: 'linked'
    }).on('click', function (ev) {
        $("#start_time").datetimepicker("setEndDate", $("#end_time").val());
    });

    $('#end_time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        minView: 2,
        format: 'yyyy-mm-dd',
        todayBtn: 'linked',
    }).on('click', function (ev) {
        $("#end_time").datetimepicker("setStartDate", $("#start_time").val());
    });

    $('#batch_start_time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        startView: 2,
        minView: 2,
        format: 'yyyy/mm/dd',
        todayBtn: 'linked'
    }).on('click', function (ev) {
        $("#batch_start_time").datetimepicker("setEndDate", $("#batch_end_time").val());
    });

    $('#batch_end_time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        weekStart: 1,
        minView: 2,
        format: 'yyyy/mm/dd',
        todayBtn: 'linked',
    }).on('click', function (ev) {
        $("#batch_end_time").datetimepicker("setStartDate", $("#batch_start_time").val());
    });
});


    /**
     * 目前不知道.form_datetime具体初始化作用域  先注释
     * 16.08.25
     * ZHJ
     */
//        $('.form_datetime').datetimepicker({
//            language:  'zh-CN',
//            weekStart: 1,
//            todayBtn:  1,
//            autoclose: 1,
//            todayHighlight: 1,
//            startView: 2,
//            forceParse: true,
//            showMeridian: 1
//        });
    /**
     * 日期显示到小时 分钟
     * 16.08.25
     * ZHJ
     */


/*
$('.timepicker').datetimepicker({
    language: "zh-CN",
    format: 'yyyy-mm-dd hh:ii',
    autoclose: true,
    pickerPosition: "top-right"
}).on("hide", function () {
    var $this = $(this);
    var _this = this;
    scope.$apply(function () {
        scope[$this.attr('ng-model')] = _this.value;
    });
});*/
