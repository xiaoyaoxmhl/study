<template>
	<div>
		 <Navbar title = '图文详情'/>
		<div class="photo-title">
			<p>{{imgInfo.title}}</p>
			<span>发起日期:{{imgInfo.add_time | converTime('YYYY-MM-DD')}}</span>
			<span>{{imgInfo.click}}次浏览</span>
			<span>分类:民生经济</span>
			
			<!-- <ul>
			    <li v-for = '(thumImg,index) in thumImgs' :key = 'index'>
			    	<a href="javascript:void(0)">
			    		<img :src="thumImg.src" alt="">
			    	</a>
			    </li>   
			</ul> -->

			<vue-preview :slides = 'thumImgs'></vue-preview>
			
			<!-- 详细内容 -->
			<div class="photo-desc">
				<p v-html = 'imgInfo.content'></p>
			</div>
				
			<!-- 评论组件 -->
			<!-- {{$route.query.id}} -->
			<Comment :cid = '$route.query.id'/>
		</div>
	</div>
</template>

<script>
export default {

  name: 'PhotoDetail',

  data() {
    return {
    	imgInfo:{},
    	thumImgs:[]
    };
  },
  created(){

  	let id = this.$route.query.id;
  	// http://www.sinya.online/api/getthumimages/43
  	// http://www.sinya.online/api/getimageinfo/43
  	// 获取图文详情
  	var  getImageInfo = ()=>{
  		console.log(this); //如果使用普通函数声明，当前this为undefined，建议使用箭头函数改变当前this的指向
	  return this.$axios.get('getimageinfo/' + id);
	}

	// 获取缩略图数组
	var  getThumImages = () =>{
	  return this.$axios.get('getthumimages/'+id);
	}

	this.$axios.all([getImageInfo(), getThumImages()])
	  .then(this.$axios.spread( (acct, perms)=> {
	    // 两个请求现在都执行完成
	    console.log(acct);
	    console.log(perms);

	    this.imgInfo = acct.data.message[0];
	    this.thumImgs = perms.data.message;

	    this.thumImgs.forEach((item,index)=>{
	    	item.msrc = item.src;
	    	item.w = 600;
	    	item.h = 600;

	    })
	  }));

  }
};
</script>

<style lang="css" scoped>
.photo-title p{
	font-size: 20px;
	font-weight: 600;
	color: #0F80FF;
	margin: 15px 0;
}
.photo-title  span{
	padding: 10px 5px;
}
.photo-desc p{
	font-size: 18px;
	color: #333333;
}
/*.photo-title {
	width: 100%;
	overflow: hidden;
	margin-top: 20px;
}*/



</style>
