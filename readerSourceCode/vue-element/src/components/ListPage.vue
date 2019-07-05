<template>
  <div>
    <div @click="handleClick">ListPage</div>
    <router-view></router-view>
  </div>
</template>

<script>
  var abc = require('axios/lib/utils')
  export default {
    name: "ListPage",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
        const a = {a: 1, b: 2}
        const b = {c: 3}
        const c = abc.merge(a, b);
        alert(c)
        console.log(c);
      }
    },

  }
</script>

<style scoped>

</style>
