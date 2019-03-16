<template>
	<div>
		关于我页面
		{{homeInfo}}
	</div>
</template>

<script>
export default {

  name: 'About',

  data() {
    return {

    };
  },
  serverRequest(store){
  	return store.dispatch('getHomeInfo')
  },
  computed:{
  	homeInfo(){
  		return this.$store.state.homeInfo
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
