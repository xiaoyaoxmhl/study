<template>
	<div class="photoList">
		<div class='category-list'>
			<ul>
				<li v-for = '(category,index) in categoryList'>
					<a href="javascript:void(0);">{{category.title}}</a>
				</li>
				
			</ul>
		</div>

		<!-- 图片展示区域 -->
		<div class = 'photo-list'>
			<ul>
				<li v-for = '(item,index) in imgList' :key = 'item.id'>
					
					<a href='javascript:void(0);'>
						<!-- <img :src="item.img_url" alt=""> -->

						<!-- *********mint-ui的 lazy load *******-->
						<img v-lazy = 'item.img_url'>
					</a>
					<p>
						<span>{{item.title}}</span>
						<br>
						<span>{{item.zhaiyao}}</span>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {

  name: 'PhotoList',

  data() {
    return {
    	categoryList:[],
    	imgList:[]
    }
  },
  methods:{
  	loadImgByCategoryId(id){
  		this.$axios.get('getimages/'+id)
  		.then(res=>{
  			this.imgList = res.data.message;
  		})
  		.catch(err=>{
  			console.log('图片列表获取失败',err);
  		})

  	}
  },
  created(){
  	this.loadImgByCategoryId(0);

  	// 获取图文分享的分类信息
  	this.$axios.get('getimgcategory')
  	.then(res=>{
  		this.categoryList = res.data.message;
  	})
  	.catch(err=>{
  		console.log('分类信息获取失败',err);
  	});



  }
};
</script>

<style lang="css" scoped>
.category-list{
	width: 100%;
	height: 40px;
	overflow:hidden;

}
.category-list ul {
	/*width: 100%;*/
	/*overflow: auto;*/
	width: 100%;
	height: 50px;
	overflow-y:hidden;
	overflow-x: scroll;
	white-space: nowrap;

}
.category-list ul  li{
	/*float: left;
	width: 100px;
	height:40px;*/
	display: inline-block;
	width: 25%;
	height: 100%;
	font-size: 18px;
	line-height:  40px;
	text-align: center;

}
.category-list ul  li a{
	text-decoration: none;
	font-size: 16px;
}
.category-list ul  li a.active{
	color: #FC0280;
}
.photo-list ul li{
	width: 100%;
	position: relative;

}
.photo-list ul li a {
	display: block;
	width: 100%;
}
.photo-list ul li a  img{
	width: 100%;
}
.photo-list ul li p{
	position: absolute;
	bottom: 0;
	width: 100%;
	/*height: 100px;*/
	background-color: rgba(0,0,0,.2);
	padding: 5px 0
}
.photo-list ul li p span{
	color: #E6E6E6;
	font-size: 16px;
}
.photoList{
	padding-bottom: 100px;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.icon-meiyoutupian{
	width: 50px;
	height: 50px;
}


</style>
