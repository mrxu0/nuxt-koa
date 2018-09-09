<template>
  <el-container direction="vertical"> 
    <el-card @click="detailTap(item)" v-for="item in list" v-bind:key="item._id" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
        <el-button style="float: right; padding: 3px 0"  @click="detailTap(item)" type="text">查看</el-button>
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
  },
  methods: {
    detailTap (item) {
      console.log(111111)
      this.$router.push("/view/" + item._id)
    }
  }
};
</script>


<style scoped lang="stylus">
  .el-card 
    margin-top 20px
</style>
