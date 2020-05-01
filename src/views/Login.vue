<template>
  <div class="sign-box">
    <div class="signIn" v-if="status == 1">
      <el-form :model="signform" ref="signform" :rules="rules" key="login">
        <el-form-item prop="username">
          <el-input
            v-model="signform.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="signform.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="signButtom"
            @click="submitForm('signform')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <span class="signUpText" @click="changeStatus">注册新账号</span>
    </div>
    <div class="signUp" v-else>
      <el-form
        :model="signUpform"
        ref="signUpform"
        :rules="signUprules"
        key="register"
      >
        <el-form-item prop="username">
          <el-input
            v-model="signUpform.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="signUpform.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="signUpform.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="signUp" @click="signUp('signUpform')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <span @click="handleStatus" class="signText">返回登录</span>
    </div>
    <!-- 页面加载 -->
    <div v-loading.fullscreen.lock="fullscreenLoading"></div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      fullscreenLoading: false,
      status: 1,
      signform: {
        username: "",
        password: "",
      },
      signUpform: {
        username: "",
        password: "",
        nickname: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      signUprules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.$axios.post("api/user/login", this.signform).then((res) => {
            // console.log(res);
            const result = res.data;
            if (result.code === 0) {
              // 登录成功
              Cookie.set("token", result.token);
               this.$store.commit("setToken", result.token);
              this.$store.commit("changeSignStatus", 1);
              setTimeout(() => {
                   this.fullscreenLoading = false;
                this.$router.push({
                  name: "Home",
                });
               
              }, 1000);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    signUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("api/user/register", this.signUpform).then((res) => {
            // console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeStatus() {
      this.status = 2;
    },
    handleStatus() {
      this.status = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-box {
  width: 300px;
  margin: 200px auto 0;
  text-align: center;

  .signButtom {
    width: 100%;
  }

  .signUp {
    width: 100%;
  }

  .signUpText,
  .signText {
    color: #3b78dd;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      color: #1760d7;
    }
  }
}
</style>
