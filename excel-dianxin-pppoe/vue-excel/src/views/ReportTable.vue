<template>
  <div>
    <el-table
      :data="dataSource.data"
      style="width: 100%">
      <el-table-column
        fixed
        width="150"
        prop="地址"
        label="地址"
        >
      </el-table-column>
      <el-table-column
        prop="业务号"
        label="业务号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="资费"
        label="资费">
      </el-table-column>
      <el-table-column
        prop="分成"
        label="分成">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ReportTable",
    props: ['dataSource'],
    mounted(){
      // console.log(this.dataSource);
    }
  }
</script>

<style scoped>

</style>
