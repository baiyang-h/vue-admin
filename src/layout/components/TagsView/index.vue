<template>
  <div class="tags-container">
    <el-tag
      v-for="(tag, index) in cachedViews"
      :key="tag.name"
      size="small"
      effect="plain"
      closable
      @click="handleClick(tag)"
      @close="handleClose(tag, index)"
    >{{ tag.name }}</el-tag>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "TagsView",
    data() {
      return {
        // dark / light / plain
        effect: 'plain',
      }
    },
    computed: {
      ...mapGetters([
        'cachedViews'
      ])
    },
    watch: {
      $route() {
        this.addTags();
      }
    },
    mounted() {
      this.addTags();
    },
    methods: {
      handleClick(tag) {
        console.log(this.$route)
      },
      handleClose(tag, index) {
        this.tags.splice(index, 1)
      },
      addTags() {
        // 方便确认必有name的route，用于后面判断
        const { name } = this.$route;
        if(name) {
          this.$store.dispatch('tagsView/addView', this.$route)
        }
        return false;
      }
    },
  }
</script>

<style scoped lang="scss">
.tags-container {
  margin-left: 10px;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
