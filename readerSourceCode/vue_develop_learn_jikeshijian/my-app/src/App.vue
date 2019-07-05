<template>
  <div id="app">
    {{msg}}
      <div>
        <input type="text" v-model="info">
        <button @click='handleClick'>添加</button>
      </div>
      <ul>
        <todo-item  v-for="(item, index) in list" :key='index'>
          <template v-slot:item='itemPros'>
            <span :style="{fontSize:'20px',color:itemPros.checked ? 'red':'blue'}">{{item}}</span>
          </template>
        </todo-item>
      </ul>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem'

export default {
  name: 'app',
   data() {
          return {
            msg:'hello world',
            info:'',
            list:[]
          }
        },
        methods:{
          handleClick(){
            this.list.push(this.info)
            this.info=''
          }
        },
  components: {
    TodoItem
  }
}
</script>

<style>
</style>
