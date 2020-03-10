<template>
  <div class="navbar">
    <!--  伸缩按钮  -->
    <telescopic id="telescopic-btn" :is-active="sidebar.opened" @emit-toggleClick="toggleSideBar"  />
    <!--  面包屑  -->
    <breadcrumb />
    <!--  右侧工具组  -->
    <div class="navbar-tools">
      <el-dropdown trigger="click">
        <div class="personal-center">
          <img :src="avatar" alt="个人中心">
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Telescopic from '@/components/Telescopic'
  import Breadcrumb from '@/components/Breadcrumb'
  import avatar from '@/assets/images/admin.jpg'

  export default {
    name: "Navbar",
    components: {
      Telescopic,
      Breadcrumb
    },
    data() {
      return {
        avatar
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
      ])
    },
    methods: {
      // 侧边栏展开收缩
      ...mapActions({
        toggleSideBar: 'app/toggleSideBar',
        _logout: 'user/logout'
      }),
      logout() {
        this.$confirm('是否确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            await this._logout();
            this.$router.push('/login');
          } catch (e) {
            console.log(e);
            this.$message.error('操作失败');
          }
        }).catch(() => {});
      }
    }
  }
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  #telescopic-btn {
    float: left;
    padding: 0 15px;
    font-size: 24px;
    cursor: pointer;
    line-height: 50px;
  }
  .navbar-tools {
    float: right;
    display: flex;
    .personal-center {
      height: 100%;
      margin-right: 30px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
    }
  }
}
</style>
