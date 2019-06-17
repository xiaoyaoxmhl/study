<template>
  <div>
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="名称" class="etst" :class="`test`">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
    {{comCount1}}
    <child-component @click="handleChildClick"></child-component>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent';

  export default {
    name: 'HelloWorld',
    components: {
      'child-component': ChildComponent
    },
    computed: {
      comCount1() {
        console.log('comCount1');
        return this.count1 + 'com1'
      }
    },
    created() {
      console.log('parent', 'creat');
    },
    mounted() {
      console.log('parent', 'mounted');
    },
    destroyed() {
      console.log('parent', 'destroyed');
    },
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        count1: 1,
        count2: 2,
      }
    },
    methods: {
      handleChildClick(arg1, arg2) {
        this.count1 += 1;
        console.log(arg1);
        // this.$router.push('/ListPage')
        return arg1;
      }
    }
  }
</script>

