<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import vAdd from "./components/add"
import vList from "./components/list"
export default {
         components:{
            vList,
            vAdd
         },
         data(){
           return{
             info:{
               isshow:false,
               isadd:true
             }
           }
         },
         computed:{
           ...mapGetters({
             list:"cate/list"
           })
         },
         methods:{
           ...mapActions({
             reqList:"cate/reqList"
           }),
           willAdd(){
             this.info.isshow=true;
             this.info.isadd=true;
             
           },
           edit(id){
              this.info.isshow=true;
             this.info.isadd=false;
             this.$refs.add.getOne(id)
           }
         }
}
</script>

<style>

</style>