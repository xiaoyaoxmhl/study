<template>
  <div class="hello">
    <h1>{{ count }}</h1>
    <ul>
      <li v-for ='(list,i) in lists' :key = 'list.id'>
        {{list.id}}===={{list.msg}}
      </li>
    </ul>
    <h3>{{item}}</h3>
  <h2>{{myProp}}</h2>

  <button @click ='changeStateProp'>修改state的数据</button>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {

    }
  },
  methods:{
    changeStateProp(){
      this.$store.dispatch('changeStateProp',{name:'张三'})
    }
  },
  computed:{
    count(){
      return this.$store.state.count
    },
    lists(){

      return this.$store.getters.lists
    },
    item(){
      return this.$store.getters.item(2)
    },
    myProp(){
      return this.$store.getters.myProp;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
