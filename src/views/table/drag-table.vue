<template>
  <div class="drag-table">
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
            this.setSortable()
          } else {
            this.$message.error(data.msg);
          }
        })
      },
      setSortable() {
        const el = this.$refs.dragTable.$el.querySelector('.drag-table .el-table__body-wrapper > table > tbody');
        this.sortable = Sortable.create(el);
      }
    }
  }
</script>

<style scoped>
  .drag-table {

  }
</style>
