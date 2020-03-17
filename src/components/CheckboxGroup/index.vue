<template>
  <div class="admin-checkbox-group">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedProps" @change="handleCheckedPropsChange">
      <el-checkbox v-for="prop in defaultCheckedProps" :label="prop" :key="prop" :class="mode === 'vertical' ? 'is-block' : ''">{{ prop }}</el-checkbox>
    </el-checkbox-group>
    <div class="btns">
      <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
      <el-button size="mini" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckboxGroup",
    props: {
      defaultCheckedProps: {
        type: Array,
        default() {
          return []
        }
      },
      activeCheckedProps: {
        type: Array,
        default() {
          return []
        }
      },
      // 模式, 水平/垂直 horizontal / vertical  显示
      mode: {
        type: String,
        default: 'horizontal'
      }
    },
    data() {
      return {
        checkAll: true,
        checkedProps: [],
        isIndeterminate: false
      };
    },
    watch: {
      // 监听传入的值，等到有值传入时，才渲染，默认一开始为全部选择
      defaultCheckedProps(val) {
        this.checkedProps = val;
      },
      // 之后的渲染
      activeCheckedProps(val) {
        this.checkedProps = val;
      },
      checkedProps(val) {
        this.isIndeterminate = !(val.length === this.defaultCheckedProps.length || !val.length);
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedProps = val ? this.defaultCheckedProps : [];
      },
      handleCheckedPropsChange(val) {
        const totalLength = this.defaultCheckedProps.length;
        if(!val.length) {
          this.checkAll = false;
        } else {
          this.checkAll = val.length === totalLength;
        }
      },
      // 恢复默认
      restDefaultProps() {
        this.checkAll = true;
        this.isIndeterminate = false;
        this.checkedProps = this.defaultCheckedProps;
      },
      handleCancel() {
        this.checkedProps = this.activeCheckedProps;
        this.$emit('emit-cancel')
      },
      handleSave() {
        this.$emit('emit-save', this.checkedProps)
      }
    }
  }
</script>

<style scoped lang="scss">
.admin-checkbox-group {
  background: #fff;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .is-block {
    display: block;
  }
  .btns {
    padding-top: 10px;
    width: 130px;
  }
}
</style>
