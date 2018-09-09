<template>
  <div>
    <el-row
      type="flex"
      justify="space-between"
      style="margin: 10px 10px"
      >
      <el-col :span="20">
        <input class="title" type="text" placeholder="在这里输入标题" v-model="title">
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="addArticle">添加</el-button>
      </el-col>
    </el-row>
    <textarea id="simplemde" style="display: block"></textarea>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: null
      }
    },
    methods: {
      async addArticle () {
        if ( !(this.title && this.simplemde.value() ) ) {
          this.$message.error('请填写标题和内容!')
          return 
        }
        let data = {
          title: this.title,
          content: this.simplemde.value()
        }
        const res = await this.$store.dispatch("addOrEditArticle", data)
        this.$message.info(res.msg)
        if (res.success) this.$router.go(-1)
      }
    },
    mounted () {
      this.simplemde = new SimpleMDE({ 
        element: document.getElementById("simplemde"),
      })
      this.simplemde.value("# 开始新的创作吧!")
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
    width 100%
</style>