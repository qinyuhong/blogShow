<template>
  <div class="wrapper edit_box">
      <div class="backBtn">
          <el-button @click="$router.go(-1)" >返回</el-button>
      </div>
      <div class="edit-title">标题</div>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
       <div class="edit-title">文章内容(Markdown编辑器)</div>
       <div class="markdown">
           <mavon-editor v-model="content"></mavon-editor>
       </div>
       <div class="save_btn">
           <el-button type="primary" @click="save">保存</el-button>
           
       </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title:'',
            content:''
        }
    },
    methods: {
       async save(){
           if(this.$route.params.id){
                const res=await this.$axios.post('api/blog/update',{
                title:this.title,
                content:this.content,
                article_id:this.$route.params.id
            })
            // console.log(res)
            if(res.data.code===0){
                 this.$message({
                    message: '保存设置成功',
                    type: 'success',
                    duration:1000
                });
                this.$router.push({path:'/blog'})
            }
           }else{
                const res=await this.$axios.post('api/blog/add',{
                title:this.title,
                content:this.content
            })
            // console.log(res)
            if(res.data.code===0){
                 this.$message({
                    message: '保存设置成功',
                    type: 'success',
                    duration:1000
                });
                this.$router.push({path:'/blog'})
            }
           }
           
        },
        async getDetailInfo() {
            const res = await this.$axios.get('api/blog/detail', {
                params: {
                    article_id: this.$route.params.id
                }
            })
          
            if (res.data.code === 0) {
                this.title = res.data.data.title
                this.content=res.data.data.content
            }
        }
    },
    created() {
        if(this.$route.params.id){
            this.getDetailInfo()
        }
    },
}
</script>

<style lang="scss" scoped>
    .edit_box{
        margin: 20px auto;
        background-color: #fff;
        padding: 30px;
        font-size: 16px;
        .backBtn{
            text-align: right;
            margin-bottom: 10px;
        }
        .edit-title{
            margin: 20px 0;
            font-weight: 700;
        }
        .save_btn{
            margin: 10px 0;
        }
    }
</style>