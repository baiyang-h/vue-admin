<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="route in levelList"
        :key="route.path"
      >
        <span @click="handleLink(route)">{{ route.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        levelList: []
      }
    },
    watch: {
      $route: {
        handler: 'getBreadcrumb',
        immediate: true
      }
    },
    methods: {
      getBreadcrumb() {
        const { path } = this.$route;
        const matched = this.$route.matched;
        // 根据菜单标题， 得到会显示的菜单， 如果没标题，那也是有问题的
        let levelList = matched.filter(route => route.meta && route.meta.title);
        // 对于不是home的拆单，默认第一个是home
        if(path !== '/home') {
          levelList.unshift({
            path: '/',
            name: 'Home',
            redirect: '/home',
            meta: { title: '首页' }
          })
        }
        this.levelList = levelList
      },
      handleLink(route) {
        const { redirect } = route;
        // 如果重定向到本身，则取消。否则会报错
        if(redirect && redirect !== this.$route.path) this.$router.push(redirect);
      }
    }
  }
</script>
<style lang="scss">
.app-breadcrumb {
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  .el-breadcrumb__inner {
    cursor: pointer;
  }
  .el-breadcrumb__inner:hover {
    color: #1989fa;
  }
   .el-breadcrumb__item:last-child {
     .el-breadcrumb__inner {
       color: #97a8be;
     }
   }
  .el-breadcrumb__item:nth-of-type(1) {
    .el-breadcrumb__inner {
      color: #303133;
      font-size: 13px;
      font-weight: bold;
    }
  }
}
</style>
