var orderLongPolling = (function(){
    var config = {
        pollingAddress:'',//发送地址；
        pollingData:null,//发送数据；
        VoiceNode:null,//audio节点；
        acceptData:null,//接收到的数据；
        successVoicePath:'',//接受成功后的音效地址；
        pollingTime:10000//延迟时间，单位毫秒；
    }
    function setConfig(obj){
        var arr=Object.keys(obj);
        arr.forEach(function(item){
            config[item]=obj[item];
        });
    };
    function stringHandle(string,obj){
        var data = '';
        data +=string;
    };
    function sendData(obj){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",obj.pollingAddress,true);
        xhr.responseType="text";
        xhr.onreadystatechange = function (e) {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                if(JSON.parse(xhr.responseText).extraData.ifExistNoScanOrder==="true"){
                    playVoice(obj.voiceNode,obj.successVoicePath);
                };
            }
        }
        xhr.send();
    }
    function playVoice(voiceNode,path) {
        voiceNode.src="";
        voiceNode.src=path;
    }
    function loopPolling(obj){
        setInterval(function(){
            sendData(obj)
        },obj.pollingTime);
    }
    function init(obj){
        setConfig(obj);
        loopPolling(config);
    };
    return {
        init:init
    }
})()
var config = {
    pollingAddress:'/AndSell/bubu/shop/order/ifExistScanOrder',
    voiceNode:document.querySelector("audio"),
    successVoicePath:'/AndSell/app/main/order.mp3',
    pollingTime:20000,
}
orderLongPolling.init(config);