<template>
  <div>
    <h2>login</h2>
    <div class="item">
      <div class="l">
        账号:
      </div>
      <div class="r">
        <el-input v-model="user" placeholder="请输入账号"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="l">
        密码:
      </div>
      <div class="r">
        <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="l">
      </div>
      <div class="r">
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {ajaxHost} from '../constant';
  import {mapMutations} from 'vuex';

  export default {
    name: "Login",
    data() {
      return {
        user: '',
        password: '',
      }
    },
    methods: {
      ...mapMutations({
        saveUserInfo: 'saveUserInfo'
      }),
      async handleLogin() {
        const para = {
          user: this.user,
          password: this.password,
        };
        let {status, data} = await axios.post(`${ajaxHost}/login`, para);
        if (status == 200) {
          this.$message({type: 'info', message: data.msg})
          if (data.status) {
            this.saveUserInfo({user: this.user});
            this.$router.replace('/fileUpload')
          }
          if (data.data) {
            window.localStorage.setItem('jwt', data.data);
          }
        }

      }
    }
  }
</script>

<style scoped>

</style>
