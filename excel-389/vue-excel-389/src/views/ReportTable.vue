<template>
  <div>
    <el-table
      :data="dataSource"
      style="width: 100%">
      <el-table-column
        fixed
        width="50"
        prop="月"
        label="月"
        >
      </el-table-column>
      <el-table-column
        sortable
        prop="日"
        label="日"
        width="50">
      </el-table-column>
      <el-table-column
        sortable
        prop="房号"
        label="房号">
      </el-table-column>
      <el-table-column
        prop="房租"
        label="房租">
      </el-table-column>
      <el-table-column
        prop="电表(度)"
        label="电表(度)">
      </el-table-column>
      <el-table-column
        prop="电费"
        label="电费">
      </el-table-column>
      <el-table-column
        prop="水表(吨)"
        label="水表(吨)">
      </el-table-column>
      <el-table-column
        prop="水费"
        label="水费">
      </el-table-column>
      <el-table-column
        prop="租房押金"
        label="租房押金">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ReportTable",
    props: ['dataSource'],
    mounted(){
      debugger
      console.log(this.dataSource);
    }
  }
</script>

<style scoped>

</style>
