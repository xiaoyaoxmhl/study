<template>
	<div class="news">
		<!-- {{newsList}} -->
		<div class="newList">
			<ul>
			    <li v-for = '(news,index) in newsList' :key = 'news.id'>
			    	<a href='#'>
			    		<div class="new_img">
			    			<img :src="news.img_url" alt="">
			    		</div>
			    		<div class="content">
			    			<p class="title">{{news.title}}</p>
			    			<div class="news-desc">
			    				<p class="summary">{{news.zhaiyao}}</p>
			    				<p>
			    					<span class="praise">点赞数:{{news.click}}</span>
			    					<span class="time">发表时间:{{news.add_time}}</span>
			    				</p>
			    			
			    			</div>
			    		</div>
			    	</a>
			    </li>	    
			</ul>
		</div>
	</div>
</template>

<script>

export default {

  name: 'NewsList',

  data() {
    return {
    	newsList:[]
    };
  },
  created(){
  	this.$axios.get('getnewslist')
  	.then(res=>{
  		this.newsList = res.data.message;
  		console.log(this.newsList);
  	})
  	.catch(err=>{
  		console.log('新闻列表异常',err);
  	})
  }
};
</script>

<style lang="css" scoped>
	.news{
		padding-top: 40px;
		padding-bottom: 55px;
	}
	.newList {
		width: 100%;
		border-bottom: 1px solid #CCCCCC;
		font-size: 12px;

	}
	.newList ul li {
		position: relative;
	}
	.newList ul li  a{
		display: block;
		width: 100%;
		height: 150px;
		color: #808080;
		display: flex;
		text-decoration: none;
	}
	.new_img{
		width: 30%;
		text-align: center;
		 display: flex;
   		 align-items: center;
    		justify-content: center;

	}
	.newList ul li  a img{
		width: 100px;
		height: 80px;
		background-color: red;
		border-radius: 3px;
	
	}

	.newList ul li  a .content{
		width: 70%;
		margin-left: 30px;
		padding: 0 10px;
	}
	.content .title{
		font-size: 15px;
		display: inline-block;
	   	color: #131f3c;
	    	letter-spacing: 0;
	    	padding-bottom: 7px;
	    	font-family: PingFangSC-Regular;
	    	margin-top: 10px;
	}
	.content .news-desc{
		/*margin-top: 20px;*/
	}
	.news-desc span{
		color: #ff6700;
	}
	.summary{
		padding: 5px 0;
	}
	.time{
		margin-left: 30px;
	}
</style>
