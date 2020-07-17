$(function () { //入口函数
    /* 登录功能思路
    1.给登录按钮注册点击事件
    2.阻止默认跳转事件（表单submit会自动跳转页面）
    3.获取用户名和密码
    4.非空判断
    5.ajax发送请求
    6.处理响应结果   a.成功：跳转管理系统首页    b.失败：提示用户
    */
    // 请求地址：/admin/user / login

    // 请求方式：post

    // 请求参数：

    // 名称      	类型    	说明
    // username	string	用户名（admin）
    // password	string	密码(123456)

    // 1.给登录按钮注册点击事件
    $('.input_sub').click(function (e) {
      // 2.阻止默认跳转事件（表单submit会自动跳转页面）
      e.preventDefault();
      // 3.获取用户名和密码
      var username = $('.input_txt').val().trim();//清除字符串左右空格符
      var password = $('.input_pass').val().trim()

      // 4.非空判断
      if (username.length == 0 || password.length == 0) {
        $('#myModal').modal();
        $('.modal-body>p').text('傻猪猪!用户名或密码不能为空哦~');
        return;
      }
      // 5.ajax发送请求
      $.ajax({
        url: BigNew.user_login,
        type: 'post',
        dataType: 'json',
        data: {
          username: username,
          password: password
        },
        success: function (backData) {
          console.log(backData);
          // 6.处理响应结果   a.成功：跳转管理系统首页    b.失败：提示用户
          if (backData.code == 200) {
            $('#myModal').modal();
            $('.modal-body>p').text('恭喜你登入成功哦');
            // 将toKen保存再本地做免登录
            localStorage.setItem('token', backData.token)
            $('#myModal').on('hidden.bs.modal', function (e) { //点击隐藏模态框后执行函数内的代码
              //  a.成功：跳转管理系统首页
              location = './index.html'
            })
          } else {
            $('#myModal').modal();
            // b.失败：提示用户
            $('.modal-body>p').text(backData.msg);

          }
        }
      });

    })
  })