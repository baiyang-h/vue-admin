<!-- 伸缩按钮 -->
<template>
  <i :class="isActive ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="toggleClick"></i>
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
