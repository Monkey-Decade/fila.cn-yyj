
function $id(id){
    return document.querySelector(id)
}

function getStyle(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom,null)[attr];
    }else{
        return dom.currentStyle[attr]
    }
}

function animate(dom,json,fn){
    clearInterval(dom.timer)
    dom.timer = setInterval(function(){
        var flag = true;
        for(var attr in json){
            if(attr == "opacity"){
                var current = parseInt(getStyle(dom,attr)*100)
            }else{
                var current = parseInt(getStyle(dom,attr))
            }
            var target = parseInt(json[attr]);
            var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)
            if(attr == "zIndex"){
                var next = target;
            }else{
                var next = current + speed;
            }
            if(attr == "opacity"){
                dom.style.opacity = next/100;
                dom.style.filter = "alpha(opacity="+next+")"
            }else if(attr == "zIndex"){
                dom.style.zIndex = next;
            }else{
                dom.style[attr] = next + "px";
            }
            if(next != target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(dom.timer);
            if(fn){
                fn()
            }
        }
    },1000/60)
}
    //轮播图图片跟随着页面变化改变高度
    // var WIDTH = null;
   /*  window.onresize = function() {
        var YM = document.querySelectorAll('.page_container li');
        WIDTH = window.getComputedStyle(YM).getPropertyValue("width");
        // WIDTH = YM.offsetWidth
        YM.style.height = ((1020*WIDTH.split('p')[0])/1620).toFixed(2)+'px'
        
        // console.log()
        
    } */
    var slider = $id('.slider');
    var WIDTH = slider.offsetWidth;
    var ImgArr = slider.children[0].children[0].children;
    var xbtn = $id('.xbtn')
    var slider_btn = slider.children[1];
    var index = 0;

    for(var i=0 ; i<ImgArr.length ; i++){
        var span = document.createElement('span');
        span.className = "dot";
        span.index = i;
        xbtn.appendChild(span);
        ImgArr[i].style.left = WIDTH + 'px';
    }
    var spanArr = xbtn.children;
    spanArr[index].className = "dot dot_color";
    ImgArr[index].style.left = 0;
    slider_btn.onclick = function(e){
        e = e||window.event;
        var target = e.target||e.srcElement;
        if(target.className=="prev"){
            var newIndex = index-1;
            if(newIndex<0){
                newIndex = ImgArr.length-1;
            }
            ImgArr[newIndex].style.left = -WIDTH + "px"
            animate(ImgArr[index],{left:WIDTH})
            animate(ImgArr[newIndex],{left:0});
            index = newIndex;
            light();
        }else if(target.className=="next"){
            nextImg();
        }else if(target.className.indexOf("dot")>-1){
            var newIndex = target.index;
            if(newIndex>index){
                ImgArr[newIndex].style.left = WIDTH + "px";
                animate(ImgArr[index],{left:-WIDTH})
                animate(ImgArr[newIndex],{left:0})
            }
            else if(newIndex<index){
                ImgArr[newIndex].style.left = -WIDTH + "px"
                animate(ImgArr[index],{left:WIDTH})
                animate(ImgArr[newIndex],{left:0})
            }
            index = newIndex;
            light();
        }
    }
    var timer = setInterval(nextImg,5000);
    document.onvisibilitychange = function(){
        if(document.visibilityState=="hidden"){
            clearInterval(timer)
        }
        if(document.visibilityState=="visible"){
            timer = setInterval(nextImg,5000);
        }
    }
    // 鼠标移上去关闭轮播
    slider.onmouseenter = function(){
        clearInterval(timer);
    }
    slider.onmouseleave = function(){
        clearInterval(timer);
        timer = setInterval(nextImg,5000)
    }
    function light(){
        for(var i=0 ; i<ImgArr.length ;i++){
            spanArr[i].className = "dot"
        }
        spanArr[index].className = "dot dot_color"
    }
    function nextImg(){
        var newIndex = +index + 1;
        if(newIndex>ImgArr.length-1){
            newIndex = 0;
        }
        ImgArr[newIndex].style.left = WIDTH + "px";
        animate(ImgArr[index],{left:-WIDTH})
        animate(ImgArr[newIndex],{left:0})
        index = newIndex;
        light();
    }
    
