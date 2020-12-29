import Vue from "vue"
let vm=new Vue()

//成功
export let successalert = (msg) => {
    vm.$message({
        message: msg,
        type: "success"
    });
}
//错误
export let erroralert = msg => {
    vm.$message({
        message: msg,
        type: 'warning'
    });
}
// 默认消息提示框
export let infoAlert = (message) => {
    vm.$message({
        message,
        type: "info"
    })
}
// 是否删除的提示框
export let isDel = () => {
    return vm.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
}
