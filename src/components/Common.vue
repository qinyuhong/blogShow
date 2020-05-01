<template>
<div class="common-box">
    <div v-if="isSign===0" class="signInText">登录留言吧</div>
    <div v-else class="inputBox">
        <div class="inputContent">
            <div class="signMsg">
                <img class="avatar" :src='userList.head_img' alt="">
                <p class="username">{{userList.nickname}}</p>
            </div>
            <div class="area">
                <textarea v-model="publicContent"></textarea>
            </div>
        </div>
        <div class="submitBut">
            <el-button class="subButtom" type="primary" plain @click="publicCom">发表评论</el-button>
        </div>
    </div>
    <div class="all_comment">
        <p class="title">全部评论<span class="total">{{commentList.length}}</span>条</p>
        <div class="comment-list" v-for="item in commentList" :key='item.create_time'>
            <div class="comment-item">
                <div class="item_l">
                    <img class="avatar" :src="item.head_img" alt="">
                    <p class="username">{{item.nickname}}</p>
                </div>
                <div class="item_r">
                    <div class="comment-content">
                        <div class="comment_text">{{item.cm_content}}</div>
                        <div class="comment_time">
                            <span class="date">{{item.create_time}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            userList:{},
            publicContent:'',
            commentList:[]
        }
    },
    computed: {
        isSign() {
            return this.$store.state.signStatus
        }
    },
    methods: {
        async getUserInfo() {
            const res = await this.$axios.get('api/user/info')
            const result = res.data
            this.userList = result.data
            console.log(res)
        },
        async publicCom(){
            const res = await this.$axios.post('api/blog/public',{
                article_id:this.$route.params.id,
                content:this.publicContent
            })
            if(res.data.code===0){
                this.publicContent=''
                  this.getComList()

            }
        },
        async getComList(){
             const res = await this.$axios.get('api/blog/list',{
                params:{
                    article_id:this.$route.params.id
                }
            })
            console.log(res)
             if(res.data.code===0){
                this.commentList=res.data.data
            }
        }
    },
    created() {
        this.getUserInfo()
        this.getComList()
    },
}
</script>

<style lang="scss" scoped>
.common-box {
    margin-top: 1px;
    padding: 50px 30px;
    -webkit-box-shadow: 0 0px 3px rgba(0, 0, 0, 0.157), 0 0px 3px rgba(0, 0, 0, 0.227);
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.157), 0 0px 3px rgba(0, 0, 0, 0.227);
    background: #fff;

    .signInText {
        text-align: center;
        color: #3b99fc;
        font-size: 18px;
        cursor: pointer;
    }
}

.inputBox {
    .submitBut {
        margin-top: 20px;
        overflow: hidden;

        .subButtom {
            float: right;
        }
    }

    .inputContent {
        display: flex;

        .signMsg {
            width: 100px;
            text-align: center;

            .avatar {
                display: inline-block;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 1px solid #000;
            }

            .username {
                color: #3b99fc;
                cursor: pointer;
                word-break: break-all;
                margin-top: 10px;
            }
        }

        .area {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;

            textarea {
                width: 98%;
                margin-left: 2%;
                min-height: 90px;
                font-size: 14px;
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 20px;
                box-sizing: border-box;
            }
        }
    }
}

.all_comment {
    border-top: 1px solid #eee;
    padding: 30px 0;
    margin: 30px 0 0 0;

    .title {
        margin-bottom: 50px;
        font-size: 20px;
        font-weight: bold;
        border-left: 4px solid #3b99fc;
        padding-left: 20px;
    }

    .comment-list {
        .comment-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding: 20px 0;
            border-bottom: 1px solid #eee;

            .item_l {
                width: 100px;
                text-align: center;

                .avatar {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    border: 1px solid #000;
                    margin-bottom: 20px;
                }

                .username {
                    color: #3b99fc;
                    cursor: pointer;
                    word-break: break-all;
                }
            }

            .item_r {
                flex: 1;

                .comment-content {
                    width: 98%;
                    margin-left: 2%;
                    padding: 10px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #666;

                    .comment_text {
                        min-height: 70px;
                    }

                    .comment_time {
                        text-align: right;
                        padding: 10px 0;
                        font-size: 12px;
                    }
                }

            }
        }
    }
}
</style>
