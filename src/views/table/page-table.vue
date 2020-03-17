<template>
  <div class="page-table">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageManager.currentPage"
        :page-sizes="[15, 30, 50, 100]"
        :page-size="pageManager.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageManager.total">
    </el-pagination>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50">
        <template slot-scope="scope">
          {{ (pageManager.currentPage-1) * pageManager.pageSize + scope.$index + 1 }}
        </template>
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
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { request_pageTableData } from '@/api/table';

  export default {
    name: "PageTable",
    data() {
      return {
        tableData: [],
        pageManager: {
          pageSize: 15,
          currentPage: 1,
          total: 0
        }
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData() {
        const { pageSize, currentPage } = this.pageManager;
        request_pageTableData({
          pageSize,
          currentPage
        }).then(res => {
          let { data } = res;
          if(data.success) {
            this.tableData = data.data.data;
            this.pageManager.total = data.data.total;
          } else {
            this.$message.error(data.msg);
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageManager.pageSize = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageManager.currentPage = val;
        this.getTableData();
      }
    }
  }
</script>

<style scoped lang="scss">
  .page-table {
    .el-pagination {
      margin-bottom: 10px;
    }
  }

</style>
