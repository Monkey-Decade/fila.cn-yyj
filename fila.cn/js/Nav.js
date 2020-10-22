$(function(){
    $('.page_nav .has-children').on('click',function(){
        $(this)
        .toggleClass('active')
        .siblings()
        .removeClass('active')
    })
})
/* function Nav(x,y){
    var UL = document.querySelectorAll(x);
    var H4 = document.querySelectorAll(y);
    for(var i=0 ; i<H4.length ; i++){
        for(var j=0 ; j<UL.length ; j++){
            UL[j].style.display = 'none';
        }
        H4[i].onclick = function(e){
            
            e = e||window.event;
            e.preventDefault?e.preventDefault():e.returnValue = false;
            var UL_I = this.nextElementSibling;
            if(this.firstElementChild && this.firstElementChild.className==''){
                this.firstElementChild.className='active';
            }
            else if(this.firstElementChild && this.firstElementChild.className=='active'){
                this.firstElementChild.className='';
            }
            if(UL_I.style.display === 'none'){
                for(var j=0 ; j<UL.length ; j++){
                    UL[j].style.display = 'none';
                }
                UL_I.style.display = 'block';
            }
            else if(UL_I.style.display === 'block'){
                UL_I.style.display = 'none';
            }
        }
    }
}
Nav('.sidebar_top .cat2-list','.sidebar_top .h4');
Nav('.sidebar_bottom .cat2-list','.sidebar_bottom .h4'); */