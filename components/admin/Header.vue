<template>
  <el-container>
    
    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu> -->
      </el-col>
      <el-col :span="1">
        <el-dropdown @command="handleCommand">
          <img class="headUlr" src="img/logo.png" alt="干得漂亮">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personInfo"><i class="el-icon-edit" style="margin-right: 12px;"></i>个人资料</el-dropdown-item>
            <el-dropdown-item command="exit"><i class="el-icon-setting" style="margin-right: 12px;"></i>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      async handleCommand(command) {
        switch (command) {
          case 'personInfo' :
            this.$message('此功能还未开放敬请期待')
            break
          case 'exit' :
            const res = await this.$store.dispatch("logout")
            if (res.success) {
              this.$router.push('/login')
            }
            break
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="stylus">
.el-row
  width 100%
  .el-dropdown
    height 66px
    display flex
    align-items center
    .headUlr
      border-radius 50%
      width 44px
</style>
