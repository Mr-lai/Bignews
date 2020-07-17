
$(function () { // 入口函数
    // 请求地址：/admin /user / detail
    // 请求方式：get
    // 请求参数：无
     //1.页面一加载：ajax请求个人详情信息，渲染页面
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        // data:'',
        success: function (backData) {
            console.log(backData);
            // 渲染页面
            $('.user_pic').attr('src', backData.data.userPic)
            for (var key in backData.data) {
               $('.'+key).val(backData.data[key])
            }
        }
    });

    // 2 预览文件
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    // 3 文件上传
    $('#form').on('submit',function(e){
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData(this)
        $.ajax({
            url:BigNew.user_edit,
            type:'post',
            dataType:'json',
            data:fd,
            contentType: false,
            processData: false,
            success: function(backData){
                console.log(backData);
                if(backData.code==200) {
                    alert('恭喜你,修改成功');
                  window.parent.location.reload()
                }else {
                    alert(backData.msg);
                }
                
            }
        });
    });
})
