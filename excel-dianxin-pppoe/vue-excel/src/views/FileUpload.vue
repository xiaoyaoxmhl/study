<template>
  <div :style="{marginTop:'10%'}">
    <el-upload
      class="upload-demo"
      :action="`${ajaxHost}/file`"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-success="handleSuccess"
    >
     <div class="upload">
       <el-button size="small" type="primary">点击上传</el-button>
       <div slot="tip" class="el-upload__tip">只能上传xlxs文件</div>
     </div>
    </el-upload>
    <router-link to="/">linkToIndex</router-link>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {ajaxHost} from '../constant';

  export default {
    computed: {
      ajaxHost() {
        return ajaxHost;
      }
    },
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      ...mapMutations({
        saveExcelFile: 'saveExcelFile'
      }),
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(res) {
        if(res.status){
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      },
    }
  }
</script>
<style lang="scss">
  .upload-demo{
    padding: 10px;
    width: 100%;
    .el-upload{
      width: 100%;
    }
  }
</style>
<style scoped lang="scss">
  .upload{
    display: flex;
    width: 100%;
    .el-upload__tip{
      margin-left: 20px;
    }
  }
</style>
