<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login-form"
      :hide-required-asterisk="true"
      :status-icon="true"
    >
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>
      <el-form-item prop="username" label-width="0">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0">
        <el-input show-password v-model="loginForm.password" prefix-icon="el-icon-unlock" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="login-form__btns" label-width="0">
        <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账户', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path : '/' })
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
.login-container {
  background: #2d3a4b;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .title-container {
    font-size: 26px;
    color: #eee;
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
  }
  .el-form {
    margin: 0 auto;
    width: 420px;
    padding: 160px 35px 0;
    .login-form__btns {
      .el-button {
        width: 150px;
      }
    }
  }
}
</style>
