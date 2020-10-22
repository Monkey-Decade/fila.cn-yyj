$(function(){
    // 选项卡
    $('.login_tabs h6').on('click',function(){
        if($(this).hasClass('active')){
            return;
        }else{
            $(this).addClass('active')
            .siblings()
            .removeClass('active')
            .parent()
            .next()
            .children()
            .eq(0)
            .children()
            .eq($(this).index())
            .addClass('active')
            .siblings()
            .removeClass('active')
        }
    })
    // 验证码切换
    // $('#captcha-img2').on('click',function(){
    //     $('#captcha-img2')[0].src = "http://www.fila.cn/api.php?s=fila/passport/code.html&w=120&h=36&1601806804636";
    // })
    
    // 登录表单
    var Form = $('.loginbox');
    var Btn = Form.find('.btnadpt')
    Btn.on('click',function(){
        var UserTel = $(Form.children('.active').find('input[name=user]')).val();
        var UserPwd = $(Form.children('.active').find('input[name=pwd]')).val();
        console.log(UserTel,UserPwd)
        var isTUserTel = /^\d{11}$/.test(UserTel);
        // 8位以上至少一个字母和数字
        var isTUserPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(UserPwd);
        console.log(isTUserPwd,isTUserTel)
        if(isTUserTel&&isTUserPwd){
            $('#errorTip1').css('display','none')
            console.log('格式正确')
            $.ajax({
                url:'http://localhost/php/login.php',
                data:{
                    id:UserTel,
                    pwd:UserPwd
                },
                success:function(res){
                    console.log(res)
                    if(res.code){
                        // console.log('账号密码正确')
                        $('#errorTip').css('display','none');
                        document.cookie="UserName=" + escape(UserTel)
                        location.href="http://localhost/index.html";
                    }else{
                        // console.log('账号密码错误')
                        $('#errorTip').css('display','block');
                    }
                },
                error:function(){
                    console.log(res);
                    console.log('数据库连接失败');
                },
                dataType:'json'
            })
        }else{
            $('#errorTip1').css('display','block');
            // console.log('输入格式错误')
        }
    })
})

