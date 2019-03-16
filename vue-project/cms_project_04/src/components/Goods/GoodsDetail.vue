<template>
    <div class="detail">
        <Navbar title = '商品详情'/>
        <div class="outer-swiper">
            <MySwiper   :url = 'url' myHeight = '300px'/>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                   商品标题
                </span></li>
                <li class="price-li">市场价：
                    <s>￥9999</s> 销售价：<span style="font-size:18px;">￥5</span></li>
                <li class="number-li">购买数量：<span>-</span><span>1</span><span>+</span></li>
                <li>
                    <mt-button type="primary" size='small'>立即购买</mt-button>
                    <!-- 给“加入购物车”按钮添加点击事件 -->
                    <mt-button type="danger" size='small'>加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <div class="ball"></div>            
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：112131313</li>
                <li>库存情况：999件</li>
                <li>上架时间：2014-08-09</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click.native  = 'showShopInfo'>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name :'GoodsDetail',
    data(){
        return {
            url:`getthumImages/${this.$route.params.id}`
        }
    },
    methods:{
        showShopInfo(){
            // 通过动态路由 进行路由的跳转

            this.$router.push({
                name:"photo.info",
                query:{
                    id:this.$route.params.id
                }
            })
        }
    },
    created(){

    }
}
</script>
<style scoped>
.detail{
    padding-bottom: 65px;
}
.ball-enter-active {
    /*给1秒的 事件 让小球 进入的动画效果*/
    animation: bounce-in 1s;
}
.ball-leave{
    /*元素进入以后，透明度0，整个动画都是0*/
    /*元素离开默认是1，所以会闪一下，设置为0*/
    opacity: 0;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 18px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}

</style>
