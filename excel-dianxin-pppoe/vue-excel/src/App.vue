<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  .el-message-box{
    width: 90%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &.algin-start {
        align-items: start;
      }
      .l {
        width: 25%;
        text-align: right;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .r {
        flex-shrink: 1;
        word-break: break-all;
        text-align: left;
        .unit {
          margin-right: 10px;
          display: inline-block;
        }
      }
      .option{
        flex-shrink: 0;
        margin: 0 10px;
      }
    }
  }
</style>
