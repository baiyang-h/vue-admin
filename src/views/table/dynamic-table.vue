<template>
  <div class="dynamic-table">
    <table-icon-setting :table-column-names="tableColumnNames" @emit-save="handleSave" />
    <el-table
      ref="table"
      :data="tableData"
      border
      style="width: 100%">tableColumns
      <el-table-column v-for="column in tableColumns" :key="column.prop" v-bind="column" />
    </el-table>
  </div>
</template>

<script>
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
    mounted() {
      this.tableData = [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }];
      this.tableColumnNames = this.getColumnNames(tableColumns);
    },
    data() {
      return {
        tableData: [],
        tableColumns,
        tableColumnNames: []
      }
    },
    methods: {
      getColumnNames(tableColumns) {
        return tableColumns.map(column => column.label)
      },
      handleSave(displayColumns) {
        console.log(displayColumns)
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
