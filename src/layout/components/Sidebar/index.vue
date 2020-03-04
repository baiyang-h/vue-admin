<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="!sidebar.opened"
    :unique-opened="false"
    :collapse-transition="false"
    :class="{ 'el-menu-vertical-demo': true, 'sidebar-container': !sidebar.opened }"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <sidebar-item v-for="route in permission_routes" :key="route.path" :route="route" :base-path="route.path"></sidebar-item>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { asyncRoutes } from '@/router'
  import SidebarItem from './SidebarItem'

  export default {
    name: "Sidebar",
    components: {
      SidebarItem
    },
    data() {
      return {
        permission_routes: asyncRoutes,
      };
    },
    computed: {
      ...mapGetters([
        // 展开/收缩
        'sidebar',
      ]),
      // 默认激活的菜单
      activeMenu() {
        const { path } = this.$route;
        return path
      }
    },
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

<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
  }
  .sidebar-container {
    .el-submenu {
      .el-submenu__title {
        span, .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
</style>
