showTbody();
function showTbody(){
    $.ajax({
        url:'http://localhost/php/showlist.php',
        success:function(res){
            if(res.code){
                var arr = res.data;
                if(res.data){
                    //如果有商品,table显示,div隐藏
                    $('.cart_top').show();
                    $('.cart_table').show();
                    $('.cart_empty').hide();
                    //在table里面展示商品信息
                    $('tbody').empty();
                    $.each(arr,function(index,item){
                        $('tbody').append(
                            `<tr class="goods_item" id="${item.product_id}">
                                <td class="td_check">
                                    <label class="checkbox_label checkbox_one">
                                        <input type="checkbox" class="checkbox_input" name="Onecheckbox">
                                    </label>
                                </td>
                                <td class="td_img">
                                    <a href="#" title="${item.product_name}">
                                        <img src="${item.product_img}" alt="">
                                    </a>
                                </td>
                                <td class="td_infos">
                                    <div class="td_infos_top clear-fix">
                                        <div class="fl">
                                            <h5>${item.product_name}</h5>
                                            <p>
                                                <span>颜色:${item.product_color};尺码:${item.product_size}</span>
                                            </p>
                                        </div>
                                        <div class="fr">
                                            <span class="infos_price">${item.product_price}</span>
                                            <span class="infos_mktprice">${item.product_mktprice}</span>
                                        </div>
                                    </div>
                                    <div class="td_infos_bot clear-fix">
                                        <p class="fl">
                                            <span>数量：</span>
                                            <a href="javascript:;" class="num_minus">-</a>
                                            <input type="text" name="goodsnum" class="num_input" value="${item.product_num}">
                                            <a href="javascript:;" class="num_plus">+</a>
                                        </p>
                                        <p class="fr"> 
                                            <a href="javascript:;" class="delete_one">删除</a>
                                        </p>
                                    </div>
                                </td>
                            </tr>`
                        )
                    })
                }              
            }else{
                $('.cart_top').hide();
                $('.cart_table').hide();
                $('.cart_empty').show();
            }
            // 标题右边总件数
            $('.total_num').text("共 "+Number($('.goods_item').last().index()+1)+" 件")
            
        },
        error:function(){
            console.log('地址错误,localhost!')
        },
        dataType:'json',
        cache:false
    })
}
$(function(){
    // 数量加减
    $('tbody').on('click',function(e){
        var target = e.target;
        var PriceS = 0;
        // console.log(target)
        if((target.className=='num_plus')||(target.className=='num_minus')){
            $.ajax({
                url:'http://localhost/php/updatewq.php',
                data:{
                    type:target.className,
                    id:$(target).parents('.goods_item').attr('id')
                },
                success:function(res){
                    if(res.code){
                        showTbody()
                        $('.price').text('￥0.00')
                    }
                },
                error:function(){
                    console.log('地址错误,localhost!')
                },
                dataType:'json'
            })
        }else if(target.className=='delete_one'){
            $.ajax({
                url:'http://localhost/php/delwq.php',
                data:{
                    id:$(target).parents('.goods_item').attr('id')
                },
                success:function(res){
                    if(res.code){
                        showTbody()
                        $('.price').text('￥0.00')
                    }
                },
                error:function(){
                    console.log('地址错误,localhost!')
                },
                dataType:'json'
            })
        }
        if(target.className=='checkbox_input'){
            var IsChecked = [];
            $.each($('input[name=Onecheckbox]:checked'),function(){
                var NUM = $(this).parents('.goods_item').find('.num_input').val();
                var PRICE = $(this).parents('.goods_item').find('.infos_price').text().split('￥')[1];
                IsChecked.push(NUM*PRICE)
            })
            console.log(IsChecked)
            
            $.each(IsChecked,function(i,item){
                PriceS +=item;
            })
            $('.price').text('￥'+PriceS+'.00')
        }
    })

})
