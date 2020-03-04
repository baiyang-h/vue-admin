<!-- 伸缩按钮 -->
<template>
  <div id="telescopic-btn">
    <i :class="isActive ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="toggleClick"></i>
  </div>
</template>

<script>
  export default {
    name: "TelescopicBtn",
    props: {
      isActive: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      toggleClick() {
        this.$emit('emit-toggleClick')
      }
    }
  }
</script>

<style scoped lang="scss">
#telescopic-btn {
  padding: 0 15px;
  i {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
