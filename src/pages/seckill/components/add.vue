<template>
  <div class="box">
    <el-dialog :title="addcon.isAdd?'活动添加':'活动修改'" :visible.sync="addcon.isshow" @closed="close">
      <el-form :model="user">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="timearr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change="changetime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="user.first_cateid" @change="changefirst" placeholder="请选择分类">
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="user.second_cateid" placeholder="请选择分类" @change="changesecond">
            <el-option
              v-for="item in secondcate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="user.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodslist"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
            <el-switch
              v-model="user.status"
              active-color="#409EFF"
              inactive-color="#C0CCDA"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="addcon.isAdd" @click="add">确 定</el-button>
        <el-button v-else type="primary" @click="updata">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqseckAdd,
  reqcatelist,
  reqseckUpdate,
  reqseckDetail,
  reqgoodslist,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  props: ["addcon"],
  data() {
    return {
      imageUrl: "http://localhost:3000null",
      timearr: [],
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
      value: "100",
      secondcate: [],
      goodslist: [],
    };
  },
  mounted() {
    this.reqlist();
    this.reqcatelist();
    this.reqspeslist(true);
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      speclist: "specs/list",
      manlist: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcatelist: "cate/reqList",
      reqspeslist: "specs/reqList",
      reqlist: "seckill/reqList",
    }),
    // 关闭对话框，时间清空
    close(){
      // 当编辑的时候清空时间对话框
      if (this.addcon.isAdd == false) {
        this.timearr = [];
      }
    },
    // 获取时间戳
    changetime() {
      // 赋值给开始时间和结束时间
      this.user.begintime = this.timearr[0];
      this.user.endtime = this.timearr[1];
    },
    // 获取一级分类下的二级分类
    getSecondcate() {
      reqcatelist({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondcate = res.data.list;
        }
      });
    },
    // 获取二级分类下的商品
    getGoods() {
      reqgoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodslist = res.data.list;
        }
      });
    },
    //选择一级分类,改变二级分类的选项
    changefirst() {
      //改变之前要先清除选框里面的数据
      this.user.second_cateid = "";
      this.getSecondcate();
    },
    // 二级分类选择后，根据一级分类和二级的id来改变商品的选项
    changesecond() {
      // 改变之前要先清空商品
      this.user.goodsid = "";
      this.getGoods();
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.timearr = [];
    },
    cancel() {
      this.$emit("cancel");
    },
    checkProp(){
        return new Promise((resolve)=>{
          if (this.user.title==="") {
            erroralert("活动名称不能为空")
            return;
          }
          if (this.user.first_cateid==="") {
            erroralert("一级分类不能为空")
            return; 
          }
          if (this.user.second_cateid==="") {
            erroralert("二级分类不能为空") 
            return;           
          }
          if (this.user.goodsid===""){
            erroralert("商品不能为空")
            return;
          }
          resolve()
        })
    },
    add() {
     this.checkProp().then(()=>{
        reqseckAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          successalert("添加成功");
          this.empty();
          this.reqlist();
        } else {
          erroralert(res.data.msg);
        }
      });
     })
     
    },
    getinfo(id) {
      reqseckDetail({id:id}).then((res) => {
        if (res.data.code == 200) {
          // 赋值给user
          this.user = res.data.list;
          //  赋值给时间数组
          this.timearr.push(this.user.begintime);
          this.timearr.push(this.user.endtime);
          //二级分类赋值
          this.getSecondcate();
          //商品赋值
          this.getGoods();
          this.user.id = id;
        }
      });
    },
    updata() {
      this.checkProp().then(()=>{
          reqseckUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
           successalert("修改成功");
          this.reqlist();
        }
      });
      })
    
    },
  },
};
</script>

<style scoped lang="stylus">
.box >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>