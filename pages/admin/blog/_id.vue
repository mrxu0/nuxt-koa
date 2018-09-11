<template>
  <div>
    <el-row
      type="flex"
      justify="space-between"
      style="margin: 10px 10px"
      >
      <el-col :span="10">
        <input class="title" type="text" placeholder="在这里输入标题" v-model="title">
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="editArticle">编辑</el-button>
      </el-col>
    </el-row>
    <textarea id="simplemde" style="display: block"></textarea>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: null
      }
    },
    methods: {
      async editArticle() {
        if (!(this.title && this.simplemde.value())) {
          this.$message.error('请填写标题和内容!')
          return
        }
        let mk = this.simplemde.value()
        let desc = this.simplemde.markdown(mk).replace(/<[^>]*>/g, '').slice(0, 149)
        let data = {
          title: this.title,
          content: mk,
          transContent: this.simplemde.markdown(mk),
          desc: desc,
          _id: this.$route.params.id
        }
        const res = await this.$store.dispatch('addOrEditArticle', data)
        this.$message.info(res.msg)
        if (res.success) this.$router.go(-1)
      }
    },
    async mounted() {
      this.simplemde = new SimpleMDE({
        element: document.getElementById('simplemde')
      })
      const res = await this.$store.dispatch('getArticle', {_id: this.$route.params.id})
      if (!res.success) {
        this.$message.error(res.msg)
      }
      this.title = res.data.title
      this.simplemde.value(res.data.content)
    }
  }
</script>

<style lang="stylus">
  .title
    outline-style: none;
    outline-width: 0px;
    border: none;
    border-style: none;
    text-shadow: none;
    -webkit-appearance: none;
    -webkit-user-select: text;
    outline-color: transparent;
    box-shadow: none;
    font-size 36px
</style>
