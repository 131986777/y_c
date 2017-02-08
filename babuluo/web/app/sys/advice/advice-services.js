AndSellMainModule.service('adviceFactory', function (http) {

    this.replyAdvice = http.post('/guestbook/guestbook/replyGuestbook');

    this.delAdvice = http.post('/guestbook/guestbook/delGuestbook');

});