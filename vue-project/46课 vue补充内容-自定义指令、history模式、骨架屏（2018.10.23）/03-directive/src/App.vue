<template>
  <div id="app">
      <h3 v-tack:left = 'rans'>我是自定义的指令</h3>

      <h1 v-tack = "{top:'300',left:'100'}">我是自定义的指令</h1>
      <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
      </ul>
      <button @click = 'posHandler'>调整位置</button>


      <div class="box" v-scroll = 'scrollLoad'>
        <p>
          
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        </p>
      </div>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        rans:300
    }
  },
  methods:{
    posHandler(){
    this.rans+=3;
   },
   scrollLoad(){
    // 滚动条的高度
     let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //文档高度
        let bodyHeight = document.body.scrollHeight ||  document.documentElement.scrollHeight;

        if (scrollTop + window.innerHeight >= bodyHeight - 50) {
          // 发起请求
          console.log('发送请求')
        }
   }

  }
}
</script>

<style>
body{
  height: 1000px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
