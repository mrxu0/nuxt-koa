<template>
  <el-container direction="vertical"> 
    <div @click="detailTap(item)" v-for="item in list" v-bind:key="item._id">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="title">{{item.title}}</span>
        </div>
        <div class="content">
          {{item.desc}}
        </div>
    </el-card>
    </div>
  </el-container>
</template>

<script>
export default {
  layout: 'space',
  async asyncData({ store }) {
    let res = await store.dispatch('articleList')
    return { list: res.data }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    detailTap(item) {
      this.$router.push('/view/' + item._id)
    }
  }
}
</script>


<style scoped lang="stylus">
  .el-card 
    margin-top 20px
    .title
      color #333333
    .content
      color #999999
      
</style>
