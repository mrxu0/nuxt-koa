<template>
<div class="panel">
    <div class="login">
        <el-input class="email" placeholder="请输入邮箱" v-model="user.email">
          <template slot="prepend">邮箱</template>
        </el-input>

        <el-input class="password" type="password" placeholder="请输入密码" v-model="user.password">
          <template slot="prepend">密码</template>
        </el-input>

         <el-button class="button-login" @click="login" type="primary">登录 </el-button>
    </div>
</div>
</template>

<script>
export default {
  layout: 'space',
  data() {
    return {
      user: {
        email: 'mrxu@qq.com',
        password: 'admin'
      }
    };
  },
  methods: {
    async login() {
      if (!this.user.email || !this.user.password) {
         this.$message.error('请输入用户名和密码');
        return 
      }
      const res = await this.$store.dispatch("login", this.user)
      if (res.success) {
        this.$router.push("/admin")
      } else {
        this.$message.error(res.msg)
      }
    }
  }
};
</script>

<style lang='stylus'>
.login 
  display flex
  flex-direction column
  align-items center
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)
  .email, .password, .button-login
    margin-top 20px

</style>

