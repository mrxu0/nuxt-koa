<template>
  <el-container>
    <el-header class="space-header">
      <MyHeader/>
    </el-header>
    <el-container>
      <el-aside>
        左边
      </el-aside>
      <el-main>
        <nuxt/>
      </el-main>
      <el-aside>
        右边
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import MyHeader from '../components/web/WebHeader.vue'
export default {
    components:{
      MyHeader
    }
}
</script>
<style lang="stylus">
*
  margin 0
  padding 0
.space-header
  background #909399
</style>
