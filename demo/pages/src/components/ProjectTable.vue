<template>
  <el-table
    :data="dataSource"
    style="width: 100%">

    <el-table-column
      prop="function"
      label="分支功能"
      min-width="100"
      fixed="left"
    >
    </el-table-column>

    <el-table-column
      prop="localName"
      label="本地分支名称"
      min-width="100"
    >
    </el-table-column>

    <el-table-column
      prop="localUrl"
      label="本地分支url"
      min-width="160"
    >

      <template slot-scope="scope">
        <a :href="scope.row.localUrl" target="_blank">{{scope.row.localUrl}}</a>
      </template>

    </el-table-column>

    <el-table-column
      prop="developName"
      label="测试分支"
      min-width="100"
    >
    </el-table-column>
    <el-table-column
      prop="developUrl"
      label="测试分支线上地址"
      min-width="160">
      <template slot-scope="scope">
        <a :href="scope.row.developUrl" target="_blank">{{scope.row.developUrl}}</a>
      </template>
    </el-table-column>

    <el-table-column
      prop="masterName"
      label="预发布分支"
      min-width="100"
    >
    </el-table-column>
    <el-table-column
      prop="masterUrl"
      label="预发布分支线上地址"
      min-width="160"
    >
      <template slot-scope="scope">
        <a :href="scope.row.masterUrl" target="_blank">{{scope.row.masterUrl}}</a>
      </template>
    </el-table-column>

    <el-table-column
      prop="manager"
      label="负责人"
      min-width="100"
    >
    </el-table-column>

    <el-table-column
      width="140"
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <div>
          test
          <i class="el-icon-edit"></i>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props:['dataSource'],
    data() {
      return {
      }
    }
  }
</script>
