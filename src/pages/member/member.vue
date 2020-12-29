<template>
  <div>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import {  reqmemberlist } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      //2.弹框状态
      info: {
        isshow: false,
        //41.用来判断是添加还是编辑打开的摊弹框
        isadd:true
      },
      //20.初始化列表数据
      list: []
    };
  },
  methods: {
    //获取列表
    init() {
      reqmemberlist().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //36.编辑触发
    edit(id){
      //弹框出现
      this.info.isshow=true;

      //43.是编辑
      this.info.isadd=false

      //触发add的getOne()
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    //21.获取list
    this.init();
  }
};
</script>

<style>
</style>