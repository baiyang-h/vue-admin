<template>
  <!-- 菜单是否显示 -->
  <div v-if="!route.hidden">
    <el-submenu
      :index="resolvePath(route.path)"
      v-if="isMenuItemOrSubmenu(route.children, route)"
      popper-append-to-body
    >
      <template slot="title">
        <item :icon="route.meta && route.meta.icon" :title="route.meta && route.meta.title"></item>
      </template>
      <sidebar-item
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :base-path="resolvePath(route.path)"
      />
    </el-submenu>
    <template v-else>
      <el-menu-item v-if="onlyOneChild.meta" :index="resolvePath(onlyOneChild.path)" :route="resolvePath(onlyOneChild.path)">
        <item :icon="onlyOneChild.meta && onlyOneChild.meta.icon" :title="onlyOneChild.meta && onlyOneChild.meta.title"></item>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  import path from 'path';
  import Item from './Item';

  export default {
    name: "SidebarItem",
    components: {
      Item
    },
    props: {
      route: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        //用于存储el-menu-item 的当前路由
        onlyOneChild: null
      }
    },
    methods: {
      isMenuItemOrSubmenu(children=[], route) {
        // 是否是el-submenu
        if(route.meta && route.meta.isSubmenu) {
          return true
        } else {
          const showingChildren = children.filter(item => {
            if (item.hidden) {
              return false
            } else {
              // 如果子路由下存在多个路由，则选择最后一个，后者覆盖前面的
              this.onlyOneChild = item;
              return true
            }
          });
          // 当el-menu-item路由写法 不写children层，直接只写父层时，直接取父级
          if(showingChildren.length === 0) {
            this.onlyOneChild = route;
          }
          return false;
        }
      },
      resolvePath(routePath) {
        return path.resolve(this.basePath, routePath);
      }
    }
  }
</script>

<style scoped>

</style>
