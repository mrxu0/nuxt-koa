<template>
  <el-container direction="vertical">
    <el-row
      type="flex"
      justify="end"
      >
      <el-col :span="2">
        <el-button type="primary" @click="tapEditBlog(null)" >添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :stripe="true"
      :max-height="maxHeight"
      fit
      >
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="标题"
        width="200"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="read"
        label="阅读量"
      >
      </el-table-column>
      <el-table-column
        prop="meta.createAt|date"
        label="日期"
        width="150"
      >
      </el-table-column>
      <el-table-column 
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        maxHeight: 600,
        tableData: []
      }
    },
    methods: {
      // 跳转到博客列表页
      tapEditBlog (item) {
          this.$router.push("/admin/blog")
      },
      handleEdit(index, row) {
        this.$router.push("/admin/blog/" + this.tableData[index]._id)
      },
      async handleDelete(index, row) {
        console.log(index, row)
        const res = await this.$store.dispatch("delArticle", { _id : this.tableData[index]._id})
        this.tableData.splice(index, 1)
        this.$message.info(res.msg)
      }
    },
    async created () {
      const res = await this.$store.dispatch("articleList")
      this.tableData = res.data
    },
    mounted () {
      this.maxHeight = document.body.clientHeight - 160
    }
  }
</script>

<style lang='stylus'>
</style>