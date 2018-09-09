<template>
  <el-container direction="vertical">
    <el-card v-for="item in list" v-bind:key="item._id" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
      </div>
      {{item.content}}
    </el-card>
  </el-container>
</template>

<script>
export default {
  layout: "space",
  async asyncData ({ store } ) {
    let res = await store.dispatch('articleList')
    return { list: res.data }  
  },
  data() {
    return {
      list: [] 
    }
  }
};
</script>


<style scoped lang="stylus">
  .el-card 
    margin-top 20px
</style>
