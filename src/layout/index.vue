<template>
  <el-container>
    <el-aside width="auto">
      <sidebar class="el-aside__sidebar" />
    </el-aside>
    <el-container>
      <el-header height="84px">
        <navbar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from './components/Sidebar';
  import Navbar from "./components/Navbar";

  export default {
    name: "Layout",
    components: {
      Sidebar,
      Navbar
    }
  }
</script>

<style scoped>
  .el-container {
    height: 100%;
  }
  .el-header{
    padding: 0;
  }
  .el-aside {

  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .el-aside__sidebar {
    height: 100%;
  }

</style>
