<template>
  <div>
    <el-button type="primary" size="mini" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :addcon="addcon" @cancel="cancel" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd  from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      addcon: {
        isshow:false,
        isAdd: true,
      },
    };
  },
  methods: {
    add(){
      if (this.addcon.isAdd == false) {
         this.$refs.add.empty();
      }
      this.addcon.isAdd = true;
      this.addcon.isshow = true;
    },
    cancel() {
      this.addcon.isshow = false;
    },
    edit(id) {
      this.addcon.isAdd = false;
      this.addcon.isshow = true;
      this.$refs.add.getinfo(id);
    },
  },
};
</script>
<style>
</style>