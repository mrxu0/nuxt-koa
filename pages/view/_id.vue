<template>
  <el-container direction="vertical">
    <h1 class="title">{{detail.title}}</h1>
    <p class="des">创建时间: <span>{{detail.meta.createAt | date}}</span>, 观看人数: <span>{{detail.read}}</span></p>
    <div class="content markdown-body" v-html="detail.transContent"></div> 
    <div style="display: none">
        <textarea></textarea>
    </div>
  </el-container>
</template>

<script>
export default {
  layout: 'space',
  async asyncData({ store, route }) {
    const res = await store.dispatch('getArticle', {_id: route.params.id})
    return { detail: res.data }
  },
  data() {
    return {
      detail: [],
      id: null
    }
  }
}
</script>

<style scoped lang="stylus">
.title
    font-size 24px
    color #333333
.des
    margin-top 20px
    font-size 13px
    color #999999
    span 
        color #009a61
.content
    margin-top 40px

</style>
