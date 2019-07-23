<template>
  <div id="app">
     <h1>{{count}}</h1>
     <!-- <h2>{{countAlisa}}</h2> -->
     <!-- <h3>{{countLocalState}}</h3> -->
     <!-- <h2>{{msg }}</h2> -->
     <button @click = 'addCount'>同步计算</button>
     <button @click = 'addCountByasync'>异步mutations计算</button>
     <button @click = 'addCountByasync2'>异步actions计算</button>


    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return {
        num:10
    }
  },
  methods:{
    addCount(){
      // 不能这样操作，修改状态的唯一方法是提交mutation
      // this.$store.state.count ++;
      this.$store.commit('addNum',1);
    },
    addCountByasync(){
      // 1.第一个参数是事件的名字，第二个参数是传递的数据表
      // this.$store.commit('addCountByasync',{num:5});

      // 2.以对象的方式提交
      this.$store.commit({
        type:"addCountByasync",
        num:5
      })
    },
    addCountByasync2(){
      this.$store.dispatch('addCountByasync',{num:5})
    }
  },
  /*
  普通获取stroe中 状态
  computed:{

    count(){
      return this.$store.state.count;
    },
    msg(){
      return this.$store.state.msg;
    }
  }
  */
  /*
  computed:mapState({
    // 1.箭头函数
    count:state=>state.count,
    // 2.传字符串参数 'count' 等同于 state=>state.count
    countAlisa:'count',
    countLocalState(state){
      return state.count + this.num
    }
  })
  */
  // 对象的展开运算符
  /*
  computed:{
    ...mapState({
      countAlisa:'count',
      countLocalState(state){
           return state.count + this.num
      },
      count:state=>state.count
    })
  }
  */
  computed:{
    // 当前组件的计算属性的方法 跟store中state中key是一样的，那么可以使用下面此种简便方式
    // ...mapState([
    //   // 
    //     'count',
    //     'msg'

    //   ])

    count(){

      // return this.$store.state.a.count;

      return this.$store.getters.count;
    }
  }





}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
