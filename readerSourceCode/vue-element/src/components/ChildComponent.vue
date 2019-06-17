<template>
  <div>
    <el-button type="primary" @click="handleBtnClick">主要按钮</el-button>
  </div>
</template>

<script>
  export default {
    name: "ChildComponent",
    computed: {
      comCount1() {
        return this.count1 + 'com1'
      }
    },
    created() {
      console.log('child', 'creat');
    },
    mounted() {
      console.log('child', 'mounted');
    },
    destroyed() {
      console.log('child', 'destroyed');
    },
    methods: {
      handleBtnClick() {
        const result = this.$emit('click', 1, 2, 3)
        // console.log(result);
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
