<template>

  <el-menu 
    background-color="#717479" 
    active-text-color="#1a1d21"
     router 
    default-active="2" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
    >
    <el-menu-item index="2">
      <i class="el-icon-menu" route=""></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <!-- <el-menu-item index="3" route="/admin1">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>
