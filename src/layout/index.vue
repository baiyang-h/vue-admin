<template>
  <el-container>
    <el-aside :width="sidebar.opened ? '200px' : '64px'">
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
  import { mapGetters } from 'vuex'

  export default {
    name: "Layout",
    components: {
      Sidebar,
      Navbar
    },
    computed: {
      ...mapGetters([
        // 展开/收缩
        'sidebar',
      ]),
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
