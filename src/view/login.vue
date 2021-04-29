<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/avatar.jpg" alt="" class="avatar" />
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" round class="login-btn" @click="login"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/apis/user";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          // required: true:必填项   message：不符合规则时的提示信息  trigger:触发时机
          { required: true, message: "请输入11位手机号码", trigger: "blur" },
          // pattern：正则规则
          {
            pattern: /^1[35789]\d{9}$/,
            message: "请输入11位手机号码,首位为1",
            trigger: "blur",
          },
        ],
        password: [
          // required: true:必填项   message：不符合规则时的提示信息  trigger:触发时机
          { required: true, message: "请输入密码", trigger: "blur" },
          // pattern：正则规则
          {
            pattern: /^.{3,16}$/,
            message: "请输入3到16位密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      let res = await userLogin(this.loginForm);
      console.log(res);
      if (res.data.message === "登录成功") {
        this.$message.success("登录成功");
        //成功跳转到后台管理页面
        this.$router.push({ name: "index" });
      } else {
        this.$message({
          message: "登录失败，账号或者密码错误",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>