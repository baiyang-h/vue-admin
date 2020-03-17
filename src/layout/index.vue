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
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Sidebar, Navbar, TagsView, AppMain } from './components'

  export default {
    name: "Layout",
    components: {
      Sidebar,
      Navbar,
      TagsView,
      AppMain
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
      height: 34px;
    }
  }
  .el-aside {

  }
  .el-main {
    color: #333;
    padding: 30px;
  }
  .el-aside__sidebar {
    height: 100%;
  }

</style>
