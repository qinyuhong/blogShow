<template>
<div class="wrapper">
    <h1 class="title">文章列表</h1>
    <div class="blog">
        <el-button class="blogAdd" @click="blogAdd">新增+</el-button>
        <el-table :data="blogList" border>
            <el-table-column prop="title" label="标题" >
            </el-table-column>
            <el-table-column label="日期" width="280">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleView(scope.row)">查看</el-button>
                    <el-button type="success" size="mini" @click="editBlog(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            blogList: []
        }
    },
    methods: {
        // 删除操作
        handleDel(row) {
            const id = row.id
            this.$confirm('此操作将永久删除内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
              const res= await this.$axios.post('api/blog/delete',{article_id:id})
              if(res.data.code===0){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                    location.reload()
              }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 编辑操作
        editBlog(row) {
            const id = row.id
            this.$router.push({
                path: `/edit/` + id
            })

        },
        // 新增按钮
        blogAdd() {
            this.$router.push({
                path: `/edit`
            })
        },
        // 查看操作
        handleView(row) {
            const id = row.id
            this.$router.push({
                path: `/detail/` + id
            })
        },
        async getMyList(){
            const res=await this.$axios.get('api/blog/myList')
            // console.log(res)
            if(res.data.code==0){
                this.blogList=res.data.data
            }
        }
        
    },
    created(){
        this.getMyList()
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    .title {
        margin: 30px 0;
        text-align: center;
        font-weight: bold;
        font-size: 28px;
    }

    .blogAdd {
        float: right;
        margin-bottom: 20px;
    }

    /deep/ .el-table .cell {
        text-align: center;
    }
}
</style>
