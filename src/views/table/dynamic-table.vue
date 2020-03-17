<template>
  <div class="dynamic-table">
    <table-icon-setting :table-column-names="tableColumnNames" @emit-save="handleSave" />
    <el-table
      ref="table"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column v-for="column in tableColumns" :key="column.prop" v-bind="column" />
    </el-table>
  </div>
</template>

<script>
  import { request_dynamicTableData } from '@/api/table'
  import TableIconSetting from '@/components/TableIconSetting';

  const tableColumns = [
    { prop: 'date', label: '日期', width: 180 },
    { prop: 'name', label: '姓名', width: 180 },
    { prop: 'address', label: '地址' },
  ];

  export default {
    name: "DynamicTable",
    components: {
      TableIconSetting
    },
    async mounted() {
      request_dynamicTableData().then(res => {
        const { data } = res;
        if(data.success) {
          this.tableData = data.data.data;
        }
      })
    },
    data() {
      return {
        tableData: [],
        tableColumns,
        tableColumnNames: this.getColumnNames(tableColumns)
      }
    },
    methods: {
      getColumnNames(tableColumns) {
        return tableColumns.map(column => column.label)
      },
      handleSave(displayColumns) {
        this.tableColumns = tableColumns.filter(column => displayColumns.includes(column.label));
      }
    }
  }
</script>

<style scoped>
.dynamic-table {
  position: relative;
}
</style>
