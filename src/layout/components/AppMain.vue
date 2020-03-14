<template>
  <transition name="fade-main" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "AppMain",
    computed: {
      ...mapGetters([
        'cachedViews'
      ]),
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>

</style>
