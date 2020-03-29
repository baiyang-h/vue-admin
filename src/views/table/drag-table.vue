<template>
  <div class="drag-table">
    <a href="https://github.com/SortableJS/Sortable" target="_blank">[ 拖拽 ] https://sortablejs.github.io/Sortable/</a>
    <br>
    <br>
    <el-table
        ref="dragTable"
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="Drag"
          align="center"
          width="100">
        <template>
          <i class="el-icon-rank"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Sortable from 'sortablejs';
  import { request_dynamicTableData } from '@/api/table'

  export default {
    name: "DragTable",
    data() {
      return {
        tableData: [],
        sortable: null
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        request_dynamicTableData().then(res => {
          let { data } = res;
          if(data.success) {
            this.tableData = data.data.data;
            this.setSortable();
          } else {
            this.$message.error(data.msg);
          }
        })
      },
      // 设置 drag Table 的属性和事件等
      setSortable() {
        const el = this.$refs.dragTable.$el.querySelector('.drag-table .el-table__body-wrapper > table > tbody');
        this.sortable = Sortable.create(el, {
          ghostClass: "sortable-ghost",
          chosenClass: "sortable-chosen",
          dragClass: "sortable-drag",
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '');
          },
          onEnd: (evt) => {
            const v = this.tableData.splice(evt.oldIndex, 1)[0];
            this.tableData.splice(evt.newIndex, 0, v);
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .drag-table {
    .el-icon-rank {
      font-size: 24px;
      cursor: pointer;
    }
    >>>.sortable-ghost {
      background: #42b983;
    }
    /deep/.sortable-ghost {
      background: #42b983;
    }

  }
</style>
