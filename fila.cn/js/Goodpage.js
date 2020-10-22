var ID = window.location.href.split('?')[1].split('=')[1]




$.ajax({
    type:"GET",
    url:"../Goods.json",
    dataType:"json",
    // async:false,
    success:function(data){
        // 详情页渲染
        // 左边切换列表
        var ul = data[ID].infoimg.map(function(item,index){
            return (
                '<div class="small-list more">'+
                '<a href="javascript:;" class="small-prev"></a>'+
                '<ul>'+
                item.imglist.map(item=>'<li class="i"><img original="'+item+'" src="'+item+'?x-image-process=image/resize,w_220,h_220" style="display: inline;" alt="" class="cloudzoom-gallery loading"></li>').join('')+
                '</ul>'+
                '<a href="javascript:;" class="small-next"></a>'+
                '</div>'
            )
        })
        var SmallList = $('.pro-smallImgs');
        SmallList.append(ul.join(''));
        SmallList.children().eq(0).addClass('current')
        // 大图
        var bigImg_box = $('.bigImg-box');
        bigImg_box.children('.cloudzoom')[0].src = data[ID].infoimg[0].imglist[0]

        // 商品信息
        // 商品标题
        var GoodsTitle = $('.J_pro_infos_t');
        GoodsTitle.children('.goods-name').text(data[ID].name);
        GoodsTitle.children('.goods-sn').text('款号'+data[ID].good_ID);
        GoodsTitle.children('.goods-price').html('￥'+data[ID].price+'<span class="mktprice">￥'+data[ID].mkt_price+'</span>');
        
        // 商品内容
        var GoodsContent = $('.J_pro_infos_b');
        // 商品颜色转换
        GoodsContent.children('.color_list').append(
            data[ID].infoimg.map(item=>'<li class="attr_code color_code"><img class="loading" src="'+item.imglist[0]+'?x-image-process=image/resize,w_120,h_120" alt="" title="'+item.imgColor+'">').join('')
        )
        // 商品尺码
        GoodsContent.children('.size_list').append(
            data[ID].size.map(item=>'<li class="attr_code size_code"><span>'+item+'</span>').join('')
        )
        // 图片切换
        TX();
        // 放大镜
        zoom();
    },
    error:function(){
        alert('获取数据失败,可能地址错误')
    }
})

$(function(){
    
    // 加入购物车
    $('.btn-addCart').on('click',function(){
        var NowColor = $('.goods-color').children('.NowColor').text();
        var NowSize = $('.goods-size').children('.NowSize').text();
 
        if(NowColor === "" || NowSize === ""){
            alert('颜色和尺寸都要选择')
        }else{
            var NowImg = $('.color_list').children('.current').children('.loading')[0].src.split('?')[0];
            var GOODS = $('.J_pro_infos_t');
            var NowName = GOODS.children('.goods-name').text();
            var NowPrice = GOODS.children('.goods-price').html().split('<')[0];
            var NowMktprice = GOODS.children('.goods-price').children('.mktprice').text();
            var NowNum = $('#selectNum').val();
            // console.log(NowSize,NowColor,NowImg,NowName,NowPrice,NowMktprice,NowNum);
            $.ajax({
                url:'http://localhost/php/addwq.php',
                data:{
                    id:ID,
                    name:NowName,
                    img:NowImg+'?x-image-process=image/resize,w_220,h_220',
                    price:NowPrice,
                    num:NowNum,
                    mktprice:NowMktprice,
                    color:NowColor,
                    size:NowSize
                },
                success:function(res){
                    if(res.code){
                        alert('加入成功')
                    }
                },
                error:function(){
                    alert('域名错误,localhost!')
                },
                dataType:'json'
            })
            
        }
    });
    // 去购物车
    $('.btn-toBuy').on('click',function(){
        location.href="./Shoppingcart.html";
    })
})
// 放大镜
const MASK_WIDTH = 200;
const ZOOM_WIDTH = 400;
const MINI_WIDTH = 745;
function zoom(){
    var Pro_bigImg = $('.pro-bigImg');
    Pro_bigImg.css('position','relative');
    // 遮罩
    var mask =  $('<div class="mask"></div>').css({
        width: MASK_WIDTH,
        height: MASK_WIDTH,
        position: "absolute",
        display: "none",
        background:"purple",
        opacity:0.5,
        cursor: "move"
    });
    // 放大后的图
    var zoom =  $('<div class="zoom"></div>').css({
        width: ZOOM_WIDTH,
        height: ZOOM_WIDTH,
        position: "absolute",
        left: MINI_WIDTH,
        top: 0,
        zIndex: 99,
        display: "none"
    });
    Pro_bigImg.children().append(mask);
    Pro_bigImg.parent().append(zoom);
    Pro_bigImg.on({
        'mouseenter':function(){
            mask.show();
            zoom.show();
            zoom.css({
                backgroundImage: 'url('+$(this).children().eq(0).children().eq(0)[0].src+')'
            })
        },
        'mousemove':function(e){
            e = e||window.event;
            var x = e.clientX  - MASK_WIDTH/2 - $(this).offset().left;
            var y = e.clientY  - MASK_WIDTH/2 - $(this).offset().top ;
            if (x <= 0) x=0;
            if (y <= 0) y=0;
            if (x >= MINI_WIDTH - MASK_WIDTH - 100) x = MINI_WIDTH - MASK_WIDTH - 100;
            if (y >= MINI_WIDTH - MASK_WIDTH - 100) y = MINI_WIDTH - MASK_WIDTH - 100;
            mask.css({
                left : x,
                top : y
            })
            zoom.css({
                backgroundPositionX : -x * (ZOOM_WIDTH / MASK_WIDTH),
                backgroundPositionY : -y * (ZOOM_WIDTH / MASK_WIDTH),
                backgroundSize : 645*2,
            })
        },
        'mouseleave':function(){
            mask.hide();
            zoom.hide();
        }
    })
}
// 图片切换
function TX(){
    // 收藏切换
    $('.pro-operates').on('click',function(){
        $(this).children('.pro-collect').toggleClass('isCollected');
        var cur = $(this).children('.pro-collect').text();
        if(cur){
            $(this).children('.pro-collect').text(cur==="收藏"?"已收藏":"收藏")
        }
    })
    // 右边颜色图片点击 左边图片列表根据选的颜色切换
    $('.color_code').on('click',function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.NowColor').text($(this).children('.loading').attr('title'));
        $('.pro-smallImgs').children().eq($(this).index()).addClass('current').siblings().removeClass('current');
        $('.bigImg-box').children('.cloudzoom')[0].src = ($(this).children('.loading')[0].src).split('?')[0];
        $('.pro-smallImgs').children().eq($(this).index()).children().eq(1).children().first().addClass('current').siblings().removeClass('current');
    })
    // 左边图片列表点击导入大图
    $('.small-list ul .i').on('click',function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.bigImg-box').children('.cloudzoom')[0].src = ($(this).children('.cloudzoom-gallery')[0].src).split('?')[0];
    })


    // 尺码
    $('.size_code').on('click',function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.NowSize').text($(this).children().eq(0).text());
    })
    // 购买数量
    $('.num-minus').on('click',function(){
        if($(this).next().val() >1 ){
            $(this).next().val(Number($(this).next().val())-1);
        }else{
            alert('不能在少了');
        }
    })
    $('.num-plus').on('click',function(){
        $(this).prev().val(Number($(this).prev().val())+1);
    })
}
