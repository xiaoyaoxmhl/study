<template>
	<div>
		首页页面
		<input type="text" name="" v-focus>
	</div>
</template>

<script>
export default {

  name: 'Home',

  data() {
    return {

    };
  },

  directives: {
  	// 存放当前组件的多个指令
  	// focus 是指令的名字
  focus: {
    // 指令的定义
    inserted: function (el,binding,vnode) {
    	// vnode.context  获取当前组件的实例化对象
      el.focus()
    },
    bind(){

    }
  }
}
};
</script>

<style lang="css" scoped>

</style>
