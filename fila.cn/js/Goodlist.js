// 隐藏菜单
var listView = [
    {
        'cate' : '性别',
        'tag' : ['男','女','中']
    },
    {
        'cate' : '大类',
        'tag' : ['鞋类','服装','配件']
    },
    {
        'cate' : '品类',
        'tag' : ['棉服','羽绒服','编织杉','梭织长裤','针织长裤','套头卫衣','户外鞋','综训鞋','板鞋']
    },
    {
        'cate' : '尺码',
        'tag' : ['35.5','36','36.5','37.5','38','38.5','39','40','40.5','41','42','42.5','43','44.5','45','XS','S','M','L','XL','2XL','3XL','4XL']
    },
    {
        'cate' : '季节',
        'tag' : ['春季','夏季','秋季','冬季']
    },
    {
        'cate' : '年份',
        'tag' : ['2020']
    },
    {
        'cate' : '系列',
        'tag' : ['PERFORMANCE']
    }
]
$.each(listView,function(i,item){
    $('.selector_contents').append(
        `<div class="selector_item">
            <div class="selector_cate">
                <span>${item.cate}</span>
            </div>
            <ul class="selector_tag">
            ${listView[i].tag.map(item=>'<li><a href="#">'+item+'</a></li>').join("")}
            </ul>
        </div>`
    );
})
// 商品列表
$.ajax({
    type:"GET",
    url:"../Goods.json",
    dataType:"json",
    // async:false,
    success:function(data){
        console.log(data)
        $.each(data,function(i,item){
            $('.goods_list').append(
                `<li class="goods_item">
                    <div class="goods_body">
                        <a target="_blank" href="./Goodpage.html?id=${i}" class="goods_pic">
                            <img src="`+ item.bigimg +`?x-image-process=image/resize,w_300,h_300" original="`+ item.bigimg +`?x-image-process=image/resize,w_300,h_300" alt="" style="display: inline;">
                        </a>
                        <a target="_blank" href="#" class="goods_name ellipsis">${item.name}</a>
                        <div class="goods_thumbs">
                            <a href="#" class="thumbs_btn prev"></a>
                            <ul class="thumbs_list">
                                ${data[i].child.map(item=>'<li><a href="#" target="_blank"><img src="'+item.image+'?x-image-process=image/resize,w_50,h_50" alt="'+item.color+'" title="'+item.color+'" style="display: inline;"></a></li>').join('')}
                            </ul>
                            <a href="#" class="thumbs_btn next"></a>
                        </div>
                        <a target="_blank" href="#" class="goods_price">
                            <span>￥${item.price}</span>
                            <span class="mkt_price">￥${item.mkt_price}</span>
                        </a>
                    </div>
                </li>`
            )
        })
        // 一些点击
        switchover();
    },
    erroe:function(){
        alert('域名错误')
    }
})


// 一些点击
function switchover(){
    // 几个商品左上角和右上角显示几个
    $('.cate_title').children().text("("+Number($('.goods_list').children().last().index()+1)+")")
    $('.result_count').text("匹配结果("+Number($('.goods_list').children().last().index()+1)+")")
    //筛选菜单打开、关闭
    $('.list_wrp .selector_open').on('click',function(){
        $('.selector_box').addClass('active')
    })
    $('.selector_btns .selector_close').on('click',function(){
        $('.selector_box').removeClass('active')
    })
    //头部隐藏菜单
    $('.list_wrp .filter_order_btn').on('click',function(){
        $(this).next().toggleClass('active')
    })
    $('.filter_order_list').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.filter_order_btn').text($(this).text())
    })
    //底部隐藏菜单
    $('.list_bottom .page_select').on('click',function(){
        $(this).children().eq(1).toggleClass('active')
    })
    $('.list_bottom li').on('click',function(){
        $('.page_select_btn').text($(this).text())
    })
    // 商品鼠标移上去展开
    $('.goods_item .goods_body').on({
        'mouseenter':function(){
            $(this).parent().addClass('hover')
        },
        'mouseleave':function(){
            $(this).parent().removeClass('hover')
            // 鼠标移出返回原来的图
            $(this).children('.goods_pic').children()[0].src = $(this).children('.goods_pic').children().attr('original')

        }
    })
    // 鼠标移到小图标 大盒子显示你鼠标所在那那张图
    $('.thumbs_list li img').on('mouseenter',function(){
            $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .children()
            .children()[0].src = ($(this)[0].src).split('?')[0]+`?x-image-process=image/resize,w_300,h_300` 
    })
}
