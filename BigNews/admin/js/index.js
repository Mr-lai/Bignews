$(function () {
    /*1.查询个人信息
           1.1 页面一加载发送ajax请求
           1.2 响应数据之后渲染到页面 
    */

    // 请求地址：/admin/user / info
    // 请求方式：get
    // 请求参数：无
    // 返回数据：
    // 名称   	  类型  	说明
    // nickname	string	用户昵称
    // userPic 	string	用户图片地


    // 1.1 页面一加载发送ajax请求
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        // data:'',
        success: function (backData) {
            // 1.2 响应数据之后渲染到页面
            $('.user_info>img').attr('src', backData.data.userPic)
            $('.user_center_link>img').attr('src', backData.data.userPic)
            $('.user_info>span').text('欢迎  ' + backData.data.nickname)
        }
    });

    // 2  点击退出事件
    $('.logout').click(function () { 
        $('#myModal').modal();
        $('.modal-body>p').text('你真的忍心离开伦家嘛?');
        $('#myModal').on('hidden.bs.modal', function (e) { //点击隐藏模态框后执行函数内的代码
            localStorage.removeItem('token');
            location = './login.html';
        })
    })


    // 3 一级菜单点击事件
    $('.level01').click(function(){
        // 排他思想切换类名
        $(this).addClass('active').siblings().removeClass('active');
        // 如果点击的是文章管理,则需要展开二级菜单
        if($(this).index()==1) {
            //  利用切换动画完成展开和收起
            $('.level02').slideToggle();
            // 旋转小箭头
            $('.level01 b').toggleClass('rotate0');//切换类名完成动画
            // 点击文章管理,第一个li标签默认高亮
            $('.level02>li:eq(0)').click();
        }else {
            // 如果点击的不是文章管理，则文章管理中所有的li失去高亮
            $('.level02>li').removeClass('active')
        }
    })

    // 4 二级菜单点击事件
    $('.level02>li').click(function(){
        // 排他思想切换类名
        $(this).addClass('active').siblings().removeClass('active');
    })

})
