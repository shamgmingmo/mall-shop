<template>
  <div>  
    <el-dialog :title="info.isadd?'添加管理员':'编辑管理员'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleAdd, reqMenuDetail, reqMenuUpdate, reqMenulist, reqRoleDetail, reqRoleUpdate, reqRolelist, reqManageAdd, reqManageDetail, reqManageUpdate } from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
export default {
  
  props: ["info", "list"],
  data() {
    return {
      roleList:[],
      user: {
        uid:"",
        roleid:"",
        username:"",
        password:"",
        status:1
      },
     
    };
  },
  mounted(){
    reqRolelist().then(res=>{
      if(res.data.code==200){
        this.roleList=res.data.list
      }
    })
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
        uid:"",
        roleid:"",
        username:"",
        password:"",
        status:1
      };
    },
    checkProp(){
       return new Promise((resolve)=>{
         if (this.user.roleid===""){
                erroralert("所属角色不能为空")
                return;      
         }
         if (this.user.username===""){
              erroralert("用户名称不能为空")
              return; 
         }
         if (this.user.password==="") {
            erroralert("密码不能为空")
              return; 
         }
         resolve()
       })
    },
    //添加
    add() {
      this.checkProp().then(()=>{
         reqManageAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
      })
     
    },
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      reqManageDetail({ uid: id }).then(res => {
        if (res.data.code == 200) {
         this.user=res.data.list
         this.user.password=""
        }
      });
    },
    update() {
      this.checkProp().then(()=>{
         reqManageUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
      })
     
    }
  }
};
</script>

<style>
</style>