<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="50">
    </el-table-column>
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
      label="地址">
      <template slot-scope="scope">
        <div v-show="scope.row._edit" class="flex column-edit-input">
          <el-input v-model="scope.row.address" placeholder="请输入内容" size="mini"></el-input>
          <el-button type="warning" plain size="mini" icon="el-icon-refresh-left" @click="handleCancel(scope.row)">cancel</el-button>
        </div>
        <div v-show="!scope.row._edit">{{ scope.row.address }}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="250">
      <template slot-scope="scope">
        <el-button
          size="mini"
          :type="scope.row._edit ? 'success' : 'primary'"
          :icon="scope.row._edit ? '' : 'el-icon-edit'"
          @click="handleEdit(scope.$index, scope.row)">{{ scope.row._edit ? 'save' : 'edit' }}</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "InlineEditTable",
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        let tableData = [{
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
        for(let item of tableData) {
          item._edit = false;
          item._originalContent = item.address;
        }
        this.tableData = tableData;
      },
      handleCancel(row) {
        row.address = row._originalContent;
        row._edit = false;
      },
      handleEdit(index, row) {
        row._edit = !row._edit;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.tableData.splice(index, 1);
      }
    }
  }
</script>

<style scoped lang="scss">
 .column-edit-input {
   .el-input:nth-child(1) {
     margin-right: 10px;
   }
 }
</style>
