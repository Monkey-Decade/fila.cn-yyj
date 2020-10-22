$('.main_container').append($('<div class="countdown"><h1 class="cd_title">商品秒杀</h1></div>'))
$('.countdown').css({
    left: 30,
    top: 600,
    position: 'fixed',
    width: 148,
    height: 148,
    zIndex: 999,
    color: 'darkorange',
    backgroundColor:'black',
    borderRadius: 20,
    backgroundSize: 148,
    // opacity: 0.7,
    backgroundImage: 'url(./img/timebg.jpg)'
})
$('.cd_title').css({
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 28,
    // opacity: 0.7
})

var NEWTIME = $('<p class="time">本场倒计时<br/>load...</p >');
NEWTIME.appendTo($('.countdown'));
$('.time').css({
    paddingTop: 30,
    textAlign: 'center',
    fontSize: 26,
    color: 'white'
 });
setInterval(function() {
    NEWTIME.html('<p class="time">本场倒计时<br/>'+formatDate()+'</p >');
    NEWTIME.appendTo($('.countdown'));
},1000)
function formatDate(){
    var timer = new Array(2,4,6,8,10,12,14,16,18,20,22,24);
    var nowTime = new Date();
    var hours = nowTime.getHours();
    var news = new Date();
    for(var i=0; i < timer.length ; i++){
        if(hours < timer[i]){
            hours = timer[i];
            news.setHours(hours);
            news.setMinutes(0);
            news.setSeconds(0);
            break;
        }
    }
    var newss = +new Date(news);
    var times = (newss - nowTime);
    var d = new Date();
    d.setTime(times);
    var hour = d.getHours()-8;
    hour = hour<10?"0"+hour:hour;
    var minute = d.getMinutes();
    minute = minute<10?"0"+minute:minute;
    var second = d.getSeconds();
    second = second<10?"0"+second:second;
    return hour+":"+minute+":"+second;
}
