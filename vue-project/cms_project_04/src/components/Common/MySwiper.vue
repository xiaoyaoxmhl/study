<template>
	<mt-swipe :auto="4000" :style='{height: myHeight}' class='swiper'>
		  <mt-swipe-item v-for = '(item,index) in imgs' :key = 'index'>
		  	
		  	<img :src="item.img || item.src" alt="" />
		  </mt-swipe-item>
	</mt-swipe>
</template>

<script>
export default {

  name: 'MySwiper',

  data() {
    return {
    	imgs:[]
    };
  },
  props:['url','myHeight'],
  created(){
  	this.$axios.get(this.url)
  	.then(res=>{
  		console.log(res.data.message);
  		this.imgs = res.data.message;
  	})
  	.catch(err=>{
  		console.log('轮播图数据异常',err);
  	})
  }
};
</script>

<style lang="css" scoped>
img{
	width: 100%;
}
</style>
