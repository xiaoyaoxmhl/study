<template>
	<div>
		 <Navbar title = '商品评论'/>
		 <Comment :cid = '$route.query.id'/>
	</div>
</template>

<script>
export default {

  name: 'GoodsComment',

  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
</style>
