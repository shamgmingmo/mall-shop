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
      info: {
        isshow: false,
        isadd:true
      },
      list: []
    };
  },
  methods: {
    init() {
      reqmemberlist().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
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