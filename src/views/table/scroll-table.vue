<template>
  <div class="scroll-table">
    <el-table
        ref="table"
        :data="tableData"
        style="width: 100%;"
        height="500"
    >
      <el-table-column
          type="index"
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
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {request_scrollTableData} from '@/api/table';

  // function extendData() {
  //
  // }
  export default {
    name: "ScrollTable",
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      async getTableData() {
        try {
          let { data } = await request_scrollTableData();
          if(data.success) {
            const tableData = data.data.data;
            const page = 1;

            this.tableData = tableData.slice(0, 100);

            this.$nextTick(() => {
              const table = this.$refs.table.$el;
              const selectWrap = table.querySelector('.el-table__body-wrapper');
              const _this = this;
              selectWrap.addEventListener('scroll', function() {
                // let rowTopIndex = this.scrollTop / rowHeight;
                if(this.scrollTop + selectWrap.clientHeight === this.scrollHeight) {
                  _this.tableData.push(...tableData.slice(page*100, (page+1)*100))
                }
              })
            })
          } else {
            this.$message.error(data.msg);
          }
        } catch (e) {
          console.log(e)
        }
      },
      aaa() {
        // const table = this.$refs.table.$el;
        // const tableBody = table.querySelector('.el-table__body');
        // const selectWrap = table.querySelector('.el-table__body-wrapper');
        // const tr = table.querySelector('.el-table__body tbody tr');
        // const rowHeight = tr.offsetHeight;

        // selectWrap.addEventListener('scroll', function() {
        //   let rowTopIndex = this.scrollTop / rowHeight;
        //   console.log(this.scrollTop, rowTopIndex)
        //   if(this.scrollTop + selectWrap.clientHeight === this.scrollHeight) {
        //     this.tableData.push(tableData.slice(page*20, (page+1)*20))
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="scss">
  .scroll-table {

  }
</style>
