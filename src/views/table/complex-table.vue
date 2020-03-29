<template>
  <div class="complex-table">
    <div style="margin-bottom: 20px">
      <el-button @click="toggleSelection([tableData[1]])">选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-table
        ref="table"
        :data="tableData"
        border
        default-expand-all
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort="{prop: 'date'}"
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :row-class-name="tableRowClassName"
        row-key="id"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
      >
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
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleRow(scope.$index, scope.row)">信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ComplexTable",
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        },{
          id: 5,
          date: '2016-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家',
        }, {
          id: 6,
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        },{
          id: 7,
          date: '2016-04-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家',
          hasChildren: true
        }, {
          id: 8,
          date: '2016-03-23',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }],
        multipleSelection: []
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.id === 1) {
          return 'warning-row';
        } else if (row.id === 8) {
          return 'success-row';
        }
        return '';
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.table.toggleRowSelection(row);
          });
        } else {
          this.$refs.table.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleRow(index, row) {
        alert(JSON.stringify(row))
      },
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              tag: '家',
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              tag: '家',
            }
          ])
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
.complex-table {
  /deep/.el-table__row--level-1 {
    .el-checkbox {
      display: none;
    }
  }
  >>>.el-table__row--level-1 {
    .el-checkbox {
      display: none;
    }
  }
  /deep/.el-table .warning-row {
    background: oldlace;
  }

  /deep/.el-table .success-row {
    background: #f0f9eb;
  }
}
</style>
