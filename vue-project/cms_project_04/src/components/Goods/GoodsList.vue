<template>
  <div>
    <Navbar title = '商品列表'/>
  <div class="page-loadmore">
    <!-- {{goodsList}} -->
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"  :auto-fill = 'autoFill'>
        <ul class="page-loadmore-list">
             <li v-for = '(goods,index) in goodsList' :key = 'goods.id'>
                <router-link :to='{name:"good.detail",params:{id:goods.id}}'>
                    <img :src="goods.img_url">
                    <div class="title">{{goods.title | controllShow(14)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
         
        </ul>
    </mt-loadmore>
    </div>
  </div>
  </div>
</template>



<script>


/*
mt-loadmore 中的属性

1.bottomLoad 函数
2.机制  bottomLoad  :bottom-all-loaded 默认为false,可以上拉  true 禁止上拉
3.auto-fill 默认为true,自动检测父容器，并调用bottomload直到撑满父容器
4.pull 拉动未满足 70px,drop 达到70px,loading加载中
5.loadmore组件对象的onBottomLoaded() 通知结束loading进入pull状态
6. 在组件上写ref 在js中通过this.$refs.xxx 获取的组件对象
    通过在普通标签写ref 在js中通过this$refs.xxx 获取的dom对象
7.上拉加载更多公式
    进入检测机制==>  可视的高度+页面卷起的高度 = 设备的高度

*/
export default {
    name:'GoodsList',
    data(){
        return {
            page:this.$route.params.page,
            goodsList:[],
            allLoaded:false,
            wrapperHeight:0,
            autoFill:false
        }
    },
    methods:{
        // 上拉加载的事件
        loadBottom(){
            console.log('上拉调用了');
            // 通知状态发生改变
            // 上拉加载数据
             this.loadGoodsByPage();
            this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status){
            console.log(status);
        },
         loadGoodsByPage(){
                  this.$axios.get(`getgoods/?pageindex=${this.page}`)
                .then(res=>{    

                    if (res.data.message.length < 10) {
                        this.$toast('没有数据了');
                        // 如果为true,表示所有数据的都加载完成，禁止上拉
                        this.allLoaded = true;
                    }

                    if (this.page == 1 ) {
                          this.goodsList = res.data.message;
                    }else{
                        this.goodsList = this.goodsList.concat(res.data.message);
                   }
                   this.page++;
                  
                })
                .catch(err=>{
                    console.log('商品列表获取失败',err);
                })
            }

    },
    created(){
        // 加载第一页的商品列表的数据
        this.loadGoodsByPage();
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}

</script>

<style scoped>
.title{
    color: #000;
}
.page-loadmore{
  margin-bottom: 100px;
}
 .page-loadmore-list{
  overflow: hidden;
  height: 100%;
 }
.page-loadmore-list li {

    width: 50%;
    float: left;
    /*padding: 6px;*/
    /*box-sizing: border-box;*/


}
li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #ccc;
    /*box-shadow: 0 0 4px #666;*/
    width: 100%;
    display: block;


}

li > a:not(.mui-btn) img {
     width: 100%;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

img {
    height: 200px;
}

.page-loadmore-listitem {
    border-bottom: 1px solid #eee
}

.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
}

.page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
}

.page-loadmore-wrapper {
    overflow: scroll
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

</style>