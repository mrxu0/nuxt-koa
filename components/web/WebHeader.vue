<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="1">
      <img class="headUlr" src="~static/img/mrxu.png" alt="干得漂亮">  
    </el-col>
    <!-- <el-col :span="1">MrXu</el-col> -->
    <el-col :span="5">
      <!-- <p>书山有路勤为径</p>
      <p>学海无涯苦作舟</p> -->
      <pre>

    书山有路勤为径

          学海无涯苦作舟
      </pre>
    </el-col>
  </el-row>
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
.el-container
  .el-row
    width 100%
    height 100%
    .headUlr
      border-radius 50%
      width 44px
</style>
