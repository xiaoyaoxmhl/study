<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="50" rows="10" v-model = 'commentContent'></textarea>
                </li>
                <li>
                    <mt-button type="primary" size='large' @click = 'commentHandler'>评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
               <li v-for = '(comment,index) in comments'>
                    {{comment.user_name}} : {{comment.content}} {{comment.add_time | relativeTime}}
                </li>
                
            </ul>
                 <mt-button type="danger" size='large' @click = 'loadMore(page)'>加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default{
    name:'Comment',
    props:['cid'],
    data(){
        return {
            comments:[],
            page:1,
            commentContent:''
        }
    },
    methods:{
        // 评论按钮的事件操作
        commentHandler(){
            // post 请求
            // http://www.sinya.online/api/postcomment/37
            // http://www.sinya.online/api/postcomment/37
            this.$axios.post(`postcomment/${this.cid}`,'content='+this.commentContent)
            .then(res=>{
                console.log(res.data.message);

                // 发表之后，清空评论框
                this.commentContent = '';
                // 加载第一页的数据
                this.page = 1;
                this.loadMore();

                // 


            })
            .catch(err=>{
                console.log('评论失败',err);
            })
        },
        // 加载更多按钮的事件操作
        loadMore(page){
            this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
                .then(res=>{
                    console.log(res.data.message);
                    
                    if (res.data.message.length === 0) {
                        this.$toast('没有数据了');
                    }
                    if (page) {

                        // 表示加载更多
                        this.comments = this.comments.concat(res.data.message);
                    }else{
                        // 否则第一次加载
                           this.comments = res.data.message;
                    }
                    this.page ++;


                })
                .catch(err=>{
                    console.log('获取分页数据失败',err);
                })
        }
    },
    created(){
        // /photos/detail?id=37&page=4
        console.log(this.cid);
        let page = this.$route.query.page || '1';
        // 第一次加载
        this.loadMore();
        // console.log(`getcomments/${this.cid}?pageindex=${page}`);
        
    }
}
</script>
<style scoped>
.tmpl{
    padding-bottom: 100px;
}
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
textarea{
    width: 100%;
}
</style>
