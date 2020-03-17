<template>
  <div class="tags-container">
    <div class="tags-scroll-container-hidden">
      <el-scrollbar class="tags-scroll-container">
        <el-tag
          ref="tag"
          :to="{ path: tag.path}"
          v-for="tag in visitedViews"
          :key="tag.name"
          size="small"
          :effect="getEffect(tag)"
          :closable="!isAffix(tag)"
          @click="clickTag(tag)"
          @contextmenu.prevent.native="openMenu(tag, $event)"
          @close="closeTag(tag)"
        >{{ tag.meta.title }}</el-tag>
      </el-scrollbar>
    </div>
    <!--  右键工具栏  -->
    <ul
      class="contextmenu"
      v-show="visible"
      :style="{ left: position.left, top: position.top }"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li @click="closeTag(selectedTag)" v-if="!isAffix(selectedTag)">Close</li>
      <li @click="closeOthersTags(selectedTag)">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import path from 'path'

  export default {
    name: "TagsView",
    data() {
      return {
        visible: false,
        position: {
          left: 0,
          top: 0
        },
        selectedTag: {}
      }
    },
    computed: {
      ...mapGetters([
        // 所有的有权限路由
        'permission_routes',
        'visitedViews',
      ]),
    },
    watch: {
      $route() {
        // 路由变化添加到visitedViews
        this.addTags();
        this.moveToCurrentTag();
      },
      visible(v) {
        if(v) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      // 初始化默认显示的view
      this.initTags();
      this.addTags()
    },
    methods: {
      // 用于 tagsView 主题的显示
      getEffect(tag) {
        // dark / light / plain
        if(tag.path === this.$route.path) {
          return 'dark'
        } else {
          return 'plain'
        }
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix
      },
      // 用于过滤，只要meta中存在affix属性的路由，表示默认在tagsView中显示的路由
      filterAffixTags(routes, basePath='/') {
        let tags = [];
        routes.forEach(route => {
          if(route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if(route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path);
            if(tempTags.length) {
              tags = [...tags, ...tempTags]
            }
          }
        });
        return tags;
      },
      // 初始化默认的tagsView，即meta.affix为true的路由。默认显示在tagsView中
      initTags() {
        const affixTags = this.filterAffixTags(this.permission_routes);
        for(let tag of affixTags) {
          if(tag.name) {
            this.$store.dispatch('tagsView/addVisitedView', tag)
          }
        }
      },
      addTags() {
        // 方便确认必有name的route，用于后面判断
        const { name } = this.$route;
        if(name) {
          this.$store.dispatch('tagsView/addView', this.$route)
        }
        return false;
      },

      clickTag(view) {
        if(view.path === this.$route.path) return;
        this.$router.push({ name: view.name})
      },
      refreshSelectedTag(view) {
        this.$store.dispatch('tagsView/delCachedView', view).then(() => {
          const path = '/redirect' + view.path;
          this.$router.replace({ path })
        });
      },
      closeTag(view) {
        // document.body.removeEventListener('click', this.closeMenu)
        this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          // 删除的view和当前路由一致，则重定向到删除后的最后一个。否则保持在当前页面
          if(view.path !== this.$route.path) {
            return false;
          } else {
            const lastRoute = visitedViews.pop();
            this.$router.push(lastRoute.path);
          }
        }).catch(error => {
          console.log(error);
          this.$message.error('关闭导航标签错误');
        })
      },
      closeOthersTags(view) {
        this.$store.dispatch('tagsView/delOthersViews', view).then(() => {
          if(view.path === this.$route.path) {
            return false
          } else {
            this.$router.push(view.path)
          }
        })
      },
      closeAllTags() {
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          const { path } = visitedViews.pop();
          this.$router.push(path)
        })
      },

      openMenu(tag, e) {
        const offsetLeft = e.target.getBoundingClientRect().left - this.$el.getBoundingClientRect().left;
        const offsetTop = e.target.getBoundingClientRect().top - this.$el.getBoundingClientRect().top;
        const left = offsetLeft + e.offsetX + 'px';
        const top = offsetTop + e.offsetY + 'px';
        this.position = {
          left,
          top
        };
        this.visible = true;
        this.selectedTag = tag;
      },
      closeMenu() {
        this.visible = false;
        this.selectedTag = {};
      },

      moveToCurrentTag() {
        this.$nextTick(() => {
          const tagsComponents = this.$refs.tag;
          const route = this.$route;

          // 容器width、内部撑开容器width
          const scrollContainerWidth = document.querySelector('.tags-scroll-container').offsetWidth;
          const innerContainerWidth = document.querySelector('.el-scrollbar__view').offsetWidth;

          const scrollbarWrap = document.querySelector('.el-scrollbar__wrap');

          // 存储当前route的tag组件
          let tagComponent = null;
          for(let tag of tagsComponents) {
            if(route.path === tag.$attrs.to.path) {
              tagComponent = tag.$el;
              break
            }
          }
          // 防止redirect这类不在tagsView中的组件， 取不到会报错
          if(!tagComponent) return false;
          // 当前tag组件，左侧距离容器的距离/右侧距离容器的距离
          const levelRightDistance = tagComponent.offsetLeft + tagComponent.offsetWidth;
          const levelLeftDistance = tagComponent.offsetLeft;
          /*
            1. 当前路由相应的tag 右侧距离容器的距离 < 容器宽，不需要滚动条
            2. > 时， 内撑开容器-容器，
            3. 中间tag，使其显示
           */
          if(scrollContainerWidth > levelRightDistance) {
            scrollbarWrap.scrollLeft = 0
          } else {
            if(levelLeftDistance < scrollContainerWidth) {
              scrollbarWrap.scrollLeft = levelRightDistance - scrollContainerWidth + 10  //10 marginright
            } else {
              scrollbarWrap.scrollLeft = innerContainerWidth - scrollContainerWidth
            }
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
.tags-container {
  position: relative;
  padding-left: 10px;
  user-select: none;
  white-space: nowrap;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04);
  /* 为了用于在当tags过多出现滚动条时，定位到最后一个tag */
  & >>> .el-scrollbar__view {
    display: inline-block;
  }
  & /deep/ .el-scrollbar__view {
    display: inline-block;
  }
  .tags-scroll-container-hidden {
    height: 100%;
    overflow: hidden;
  }
  .tags-scroll-container {
    height: calc(100% + 16px);
  }
  .el-tag {
    margin: 5px 10px 0;
    cursor: pointer;
    border-radius: 0;
  }
  .contextmenu {
    position: absolute;
    z-index: 100;
    margin: 0;
    background: #fff;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
