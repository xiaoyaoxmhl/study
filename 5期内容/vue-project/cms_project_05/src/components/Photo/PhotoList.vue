<template>
	<div class="photoList">

		    <Navbar title = '图文列表'/>
		<div class='category-list'>
			<ul>
				<li v-for = '(category,index) in categoryList' @click ='categoryHandler(category.id,index)'>
					<a href="javascript:void(0);" :class = '{active: index==currentIndex}'>{{category.title}}</a>
				</li>
				
			</ul>
		</div>

		<!-- 图片展示区域 -->
		<div class = 'photo-list'>
			<ul>
				<li v-for = '(item,index) in imgList' :key = 'item.id'>
					
					<router-link :to='{name:"photo.detail",query:{id:item.id}}'>
						<!-- <img :src="item.img_url" alt=""> -->

						<!-- *********mint-ui的 lazy load *******-->
						<img v-lazy = 'item.img_url'>
					</router-link>
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
    	imgList:[],
    	currentIndex:0
    }
  },
  methods:{
  	categoryHandler(id,index){

  		// 动态路由跳转

  		this.$router.push({name:'photo.list',params:{categoryId:id}})
  		this.currentIndex = index;

  	},
  	loadImgByCategoryId(id){
  		this.$axios.get('getimages/'+id)
  		.then(res=>{
  			this.imgList = res.data.message;

  			if (this.imgList.length===0) {
  				this.$toast({
				  message: '没有图片!!',
				  iconClass: 'iconfont icon-shibai1',
				  duration: 1000
				});
  			}
  		})
  		.catch(err=>{
  			console.log('图片列表获取失败',err);
  		})

  	}
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
      next(vm => {
    // 通过 `vm` 访问组件实例
    vm.loadImgByCategoryId(to.params.categoryId)
  })
  },
  // 路由更新之前
   beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(to);
    // console.log(from);
    this.loadImgByCategoryId(to.params.categoryId);


    next();
  },
  created(){

  	console.log(this.$route.params.categoryId);
  	// this.loadImgByCategoryId(this.$route.params.categoryId);

  	// 获取图文分享的分类信息
  	this.$axios.get('getimgcategory')
  	.then(res=>{
  		this.categoryList = res.data.message;
  		this.categoryList.unshift({"id":0,"title":'全部'})
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
	/*height: 50px;*/
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
