<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
    <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    @current-change="changePage"
    >
  </el-pagination>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { reqMenulist, reqRolelist, reqManagelist, reqManageCount } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd:true
      },
      list: [],      
      pageSize:2,
      total:0,
      page:1
    };
  },
  methods: {
    getTotal(){
      reqManageCount().then(res=>{
        if(res.data.code==200){
          this.total=res.data.list[0].total
        }
      })
    },
    getList(){
      reqManagelist({page:this.page,size:this.pageSize}).then(res => {
        if (res.data.code == 200) {
          if(res.data.list.length==0&&this.page>1){
            this.page--
            this.getList()
            return
          }
          this.list = res.data.list;
        }
      });
    },
    init() {
      this.getTotal();
      this.getList()
    },
    changePage(e){
      this.page=e;
      this.getList()
    },
    willAdd() {
      this.info.isshow = true;
      this.info.isadd=true
    },
    edit(id){
      this.info.isshow=true;
      this.info.isadd=false
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    this.init();    
  }
};
</script>

<style>
</style>