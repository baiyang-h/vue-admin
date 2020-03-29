<template>
  <div class="drag-dialog">
    <a href="https://github.com/SortableJS/Sortable" target="_blank">[ 拖拽 ] https://sortablejs.github.io/Sortable/</a>
    <br>
    <br>
    <el-button type="primary" @click="showDialog">显示弹框</el-button>
    <el-dialog title="拖拽 Dialog" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "DragDialog",
    data() {
      return {
        dialogTableVisible: true,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    },
    methods: {
      showDialog() {
        this.dialogTableVisible = true;
      }
    }
  }
</script>

<style scoped lang="scss">
.drag-dialog {

}
</style>
