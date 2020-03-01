<template>
  <el-container>
    <el-aside width="240px">
      <sidebar />
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from './components/Sidebar';

  export default {
    name: "Layout",
    components: {
      Sidebar
    }
  }
</script>

<style scoped>
  .el-container {
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }


</style>
