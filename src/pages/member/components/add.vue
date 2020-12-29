<template>
  <div>
    <el-dialog
      :title="info.isadd ? '会员添加' : '会员修改'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
    {{user}}
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"  v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
   reqmemberlist,reqmemberUpdate,reqmemberDetail
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 接收info
  // 收list
  props: ["info", "list"],
  data() {
    return {
      
      //初始化user
      user: {
        uid:"",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {
    // 一进来就要获取菜单列表
    reqmemberlist().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
  methods: {
    //点了取消
    cancel() {
      //编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
        uid:"",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    
    },
   
   
    //修改了顶级菜单
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    
    getOne(id) {
      reqmemberDetail({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
         
         
        }
      });
    },
    
    update() {
     
      reqmemberUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>