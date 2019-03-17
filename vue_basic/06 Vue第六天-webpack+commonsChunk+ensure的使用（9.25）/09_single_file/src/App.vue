<template>
	<!-- 当前组件的结构 -->
	<div>
		
		{{ msg}}
	</div>
</template>

<script>
	
	// 当前组件的业务逻辑
	export default {
		data(){
			return {
				msg:'hello App.vue'
			}
		}
	}

</script>
<style>
	
	/*当前组件的样式    */
	body{
		background-color: green;
	}
</style>