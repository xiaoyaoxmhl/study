<template>
    <div>
        <Navbar title='购物车' />
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for = '(shop,index) in shopCart' :key = 'shop.id'>
                    <mt-switch v-model = 'shop.isSelected'></mt-switch>
                    <img :src="shop.thumb_path">
                    <div class="pay-calc">
                        <p>{{shop.title}}</p>
                        <div class="calc">
                            <span>￥{{shop.sell_price}}</span>
                            <span @click = 'substract(shop)'>-</span>
                            <span>{{shop.num}}</span>
                            <span @click = 'addNum(shop)'>+</span>
                            <a href="javascript:;" @click = 'del(shop,index)'>删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import GoodsTool from '@/GoodsTool'
export default {
    name:'Cart',
    data(){
        return {
            shopCart:[]
        }
    },
     beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`

    let res = confirm('确定要离开么？？？');

    if (res) {
        // 保存用户编辑数据
        let obj = {};
        this.shopCart.forEach((shop)=>{
            obj[shop.id] = shop.num;
        })
        GoodsTool.saveGoods(obj);

        next();
    }else{
         next(false);//取消导航
    }

   
     },
    computed:{
            payment(){
                // 默认只有getter方法

                let total = 0;//总钱数
                let count = 0; //总数量

                this.shopCart.forEach((shop)=>{
                    // 如果勾选
                    if (shop.isSelected) {
                        count +=shop.num;
                        total += shop.num * shop.sell_price;
                    }
                })

                return {
                    total,count
                }
            }
    },
    methods:{
        del(shop,index){
            // 删除数组元素
            this.shopCart.splice(index,1);
            // 删除shop
            // delete GoodsTool[shop.id];
            GoodsTool.removeGoods(shop.id);
            let num = shop.num;
            this.$store.dispatch('addShopNumByAction',-num);


        },
        addNum(shop){
            shop.num++;
            console.log(shop);

            this.$store.dispatch('addShopNumByAction',1);
        },
        substract(shop){
            if (shop.num == 0) {
                return;
            }
             shop.num --;
             this.$store.dispatch('addShopNumByAction',-1);
        }
    },
    created(){
        // http://www.sinya.online/api/goods/getshopcarlist/87,88,89
        console.log(GoodsTool.getGoodsList());
        let goodsList  = GoodsTool.getGoodsList();
        // {"87":5,"88":4,"89":3}

        let ids = Object.keys(goodsList).join(',');

        if (ids) {
            // 发起请求  获取用户购物商品的列表
            this.$axios.get(`goods/getshopcarlist/${ids}`)
            .then(res=>{
                this.shopCart   = res.data.message;

                //vue会将shopCart中对象的所有属性进行监视，完成响应式

                /**
                    Object.defineProperty(this,'shopCart',{
                        set:function(){
                            判断shopcart元素是否有属性
                        }
                    })


                */

                // 给数组的元素添加属性

                for(var i = 0;i < this.shopCart.length; i++){
                    let shop = this.shopCart[i];
                    let num = goodsList[shop.id];

                    if (num) {


                        // 如果数据不完成的情况下要添加属性，就需要手动通知VUE完成响应式==》双向数据绑定
                        this.$set(shop,'num',num);
                        this.$set(shop,'isSelected',true);

                        // shop.num = num;
                        // shop.isSelected = true;
                    }


                }
            })
            .catch(err=>{
                console.log('购物商品获取失败',err);
            })
        }


    }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
