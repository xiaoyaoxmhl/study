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
                    <textarea cols="50" rows="10"></textarea>
                </li>
                <li>
                    发表评论按钮
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
                加载更多按钮
        </div>
    </div>
</template>
<script>
export default{
    name:'Comment',
    props:['cid'],
    data(){
        return {
            comments:[]
        }
    },
    created(){
        // /photos/detail?id=37&page=4
        console.log(this.cid);
        let page = this.$route.query.page || '1';
        // console.log(`getcomments/${this.cid}?pageindex=${page}`);
        this.$axios.get(`getcomments/${this.cid}?pageindex=${page}`)
        .then(res=>{
            console.log(res.data.message);
            this.comments = res.data.message;
        })
        .catch(err=>{

        })
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
