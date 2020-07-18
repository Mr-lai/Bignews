$(function () { //入口函数
    // 一 .页面一加载发送ajax请求数据
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        // data:'',
        success: function (backData) {
            console.log(backData);
            //   渲染页面
            $('.category_table tbody').html(template('ctg', backData))
        }
    });

    // 二  调用模态框

    $('#myModal').on('show.bs.modal', function (e) {
        // do something...
        if ($(e.relatedTarget).text() == '新增分类') {
            $('.btn-confirm').text('新增');
        } else {
            $('.btn-confirm').text('编辑');
            //  把页面上的文章信息赋值给模态框
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            // 页面间传值 把当前点击的编辑页面上的id值赋值给模态框的确认按钮
            $('.btn-confirm').attr('data-id', $(e.relatedTarget).attr('data-list'));
        }

    })

    // 三 新增取消按钮,清空表单
    $('.btn-cancel').click(function () {
        $('.modal-body>form')[0].reset();
    });

    //  四 点击确认按钮,发送ajax请求
    $('.btn-confirm').click(function () {
        if ($(this).text() == '新增') {
            // alert('发送新增ajax');
            // 4.1 非空判断
            if ($('#recipient-name').val().length == 0 || $('#message-text').val().length == 0) {
                alert('傻猪猪~你要写点啥呀?');
                return;
            }
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val()
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 201) {
                        alert('新增成功哟~');
                        window.location.reload();
                    }
                }
            });
        } else {
            // alert('发送编辑ajax');
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    id: $(this).attr('data-id'),
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val()
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 200) {
                        alert(backData.msg);
                        window.location.reload();
                    }

                }
            });
        }
    })

    // 五 点击删除文章分类
    // 注意: 文章分类是动态添加,所以用委派事件
    $('.table>tbody').on('click', '.btn-delete', function () {
        //  确认删除
        if (confirm('确认要删除伦家嘛?')) {
            $.ajax({
                url: BigNew.category_delete,
                type: 'post',
                dataType: 'json',
                data: {
                    id: $(this).attr('data-list')
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 204) {
                        alert(backData.msg);
                        window.location.reload();
                    }
                }
            });
        }
    })
})