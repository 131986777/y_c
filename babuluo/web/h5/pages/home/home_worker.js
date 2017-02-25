

function timedCount()
{

    //通知主线程
    postMessage('0');
    setTimeout("timedCount()",1000);
}

timedCount();