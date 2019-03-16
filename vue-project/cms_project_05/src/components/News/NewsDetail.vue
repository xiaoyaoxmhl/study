<template>
	<div class="detail">
    <Navbar :title = 'title'/>
		<div class="item">
			 <p>{{detail.title}}</p> 
                <div>
                      <span>{{detail.click}}次点击</span>
                      <span>分类:民生经济</span>
                      <span>添加时间: {{detail.add_time | converTime('YYYY-MM-DD')}}</span>
                </div>
		</div>
           <div class="divider"></div>
		<div class="detail-content"  v-html = 'detail.content'></div>
	</div>
</template>

<script>
export default {
  name:'NewsDetail',
  data(){
    return {
      detail: {}
    }
  },
  props:['title'],
  created(){
    // http://127.0.0.1:8899/getnew/:newid
    let id = this.$route.query.id;

    this.$axios.get(`getnew/${id}`)
    .then(res=>{
        this.detail = res.data.message[0];
    })
    .catch(err=>{
      console.log('新闻详情异常',err);
    })
  }
}
</script>

<style lang="css" scoped>
.detail{
	padding-bottom: 100px;
}
.item p{
  color: #66CCFF;
  font-size: 24px;
  font-weight: 600;
}
.item span{
  margin-right: 20px;
  color: #999999;
}
.divider{
  width: 100%;
  height: 1px;
  background-color: #B3B3B3;
  margin: 5px 0;
}
.detail-content{
  padding: 3px 3px;
}
</style>
