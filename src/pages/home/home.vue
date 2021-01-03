<template>
  <div>
    <div id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    })
  },
  mounted() {
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0){
          let mychart = require("echarts").init(
            document.getElementById("box")
          );
          var option = {
            title: {
              text: "分类数量"
            },
            tooltip: {},
            legend: {
              data: ["分类数量"]
            },
            xAxis: {
              data:this.list.map(item=>item.catename)
            },
            yAxis: {},
            color:['#32c5e9'],
            series: [
              {
                name: "分类数量",
                type: "bar",
                data: this.list.map(item=>item.children?item.children.length:0)
              },
            ]
          };

          mychart.setOption(option);
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
#box {
  width: 80%;
  height: 500px;
  margin: 20px auto;
}
</style>