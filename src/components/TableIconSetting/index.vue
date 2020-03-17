<template>
  <div class="table-icon-setting">
    <i class="el-icon-setting" @click="handleClickSetting"></i>
    <checkbox-group
      class="checkbox-group-position"
      :default-checked-props="tableColumnNames"
      :active-checked-props="activeCheckedProps"
      mode="vertical"
      v-show="visible"
      @emit-cancel="handleCancel"
      @emit-save="handleSave"
    />
  </div>
</template>

<script>
  import CheckboxGroup from '@/components/CheckboxGroup'

  export default {
    name: "TableIconSetting",
    components: {
      CheckboxGroup
    },
    props: {
      tableColumnNames: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        visible: false,
        activeCheckedProps: []
      }
    },
    watch: {
      tableColumnNames(val) {
        this.activeCheckedProps = val;
      }
    },
    methods: {
      handleClickSetting() {
        this.visible = !this.visible
      },
      handleCancel() {
        this.visible = false;
      },
      handleSave(val) {
        this.visible = false;
        this.activeCheckedProps = val;
        this.$emit('emit-save', val)
      }
    }
  }
</script>

<style scoped lang="scss">
.table-icon-setting {
  position: absolute;
  top: -10px;
  right: -8px;
  font-size: 20px;
  z-index: 100;
  i {
    cursor: pointer;
  }
  .checkbox-group-position {
    position: absolute;
    right: 0;
  }
}
</style>
