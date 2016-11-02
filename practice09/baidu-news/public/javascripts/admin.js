/**
 * Created by liuqingqing on 2016/10/12.
 * delete logic
 */
$(function () {
    // news 删除
    $(".del-news").click(function (e) {
        var target = $(e.target);
        var id = target.data("id");
        var tr = $(".item-id-" + id);

        if (confirm('删除后不可恢复，确定删除吗？')) {
            $.ajax({
                    type: "DELETE",
                    url: "/admin?id=" + id
                })
                .done(function (result) {
                    if (result.success === 1) {
                        if (tr.length > 0) {
                            tr.remove();
                        }
                    }
                });
        }
    });

    // category 删除
    $(".del-category").click(function (e) {
        var target = $(e.target);
        var id = target.data("id");
        var tr = $(".item-id-" + id);

        if (confirm('删除后不可恢复，确定删除吗？')) {
            $.ajax({
                    type: "DELETE",
                    url: "/admin/category/list?id=" + id
                })
                .done(function (result) {
                    if (result.success === 1) {
                        if (tr.length > 0) {
                            tr.remove();
                        }
                    }
                })
        }
    })
});
