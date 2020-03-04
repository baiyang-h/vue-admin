<template>
  <div class="navbar">
    <telescopic-btn :is-active="sidebar.opened" @emit-toggleClick="toggleSideBar"  />
  </div>
</template>

<script>
  import TelescopicBtn from '@/components/TelescopicBtn'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "Navbar",
    components: {
      TelescopicBtn
    },
    computed: {
      ...mapGetters([
        'sidebar',
      ])
    },
    methods: {
      // 侧边栏展开收缩
      ...mapActions({
        toggleSideBar: 'app/toggleSideBar'
      })
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
}
</style>
