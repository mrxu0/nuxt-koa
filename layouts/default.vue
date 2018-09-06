<template>
  <el-container :style="{height: maxHeight + 'px'}">
    <el-header class="default-header">
      <my-header />
    </el-header>
    <el-container>
      <el-aside class="default-aside">
        <my-aside />
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
        </el-container>
  </el-container>
</template>

<script>
  import MyAside from '../components/admin/Aside.vue'
  import MyHeader from '../components/admin/Header.vue'

  export default {
    middleware: 'auth',
    components: {
      MyAside,
      MyHeader
    },
    data () {
      return {
        maxHeight: '300'
      }
    },
    mounted () {
      this.maxHeight = document.body.clientHeight
    }
  }
</script>

<style lang="stylus">
.default-header
  background #909399
.default-aside
  background #909399
</style>
