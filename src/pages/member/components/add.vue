<template>
  <div>
    <el-dialog
      :title="info.isadd ? '会员添加' : '会员修改'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off" ></el-input>
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
        <el-button type="primary" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqmemberlist,
  reqmemberUpdate,
  reqmemberDetail,
} from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        uid: "",
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
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
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
          //清空密码
          res.data.list.password=""
          this.user = res.data.list;
          //补id
          this.user.id = id;
        }
      });
    },
    checkProp() {
      return new Promise((resolve) => {
        if (this.user.phone === "") {
          erroralert("手机号不能为空");
          return;
        }
        if (this.user.nickname === "") {
          erroralert("昵称不能为空");
          return;
        }
        if (this.user.password === "") {
          erroralert("密码不能为空");
          return;
        }
        resolve();
      });
    },
    update() {
      this.checkProp().then(() => {
        reqmemberUpdate(this.user).then((res) => {
          if (res.data.code == 200){
            successalert(res.data.msg);
            this.cancel();
            this.empty();
            this.$emit("init");
           
          }
        });
      });
    },
  },
};
</script>

<style>
</style>