<template>
  <el-container>
    <el-aside :width="sidebar.opened ? '200px' : '64px'">
      <sidebar class="el-aside__sidebar" />
    </el-aside>
    <el-container>
      <el-header height="84px">
        <navbar />
        <tags-view id="tags-view" />
      </el-header>
      <el-main>
        <transition name="fade-main" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Sidebar from './components/Sidebar';
  import Navbar from "./components/Navbar";
  import TagsView from './components/TagsView'

  export default {
    name: "Layout",
    components: {
      Sidebar,
      Navbar,
      TagsView
    },
    computed: {
      ...mapGetters([
        // 展开/收缩
        'sidebar',
      ]),
    }
  }
</script>

<style scoped lang="scss">
  .el-container {
    height: 100%;
  }
  .el-header{
    padding: 0;
    #tags-view {
      margin-top: 5px;
    }
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
