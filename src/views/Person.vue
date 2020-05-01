<template>
<div class="wrapper">
    <div class="content">
        <el-form :model="form" ref="form">
            <el-form-item label="昵称">
                <el-input v-model="form.name" class="p-name"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/api/user/avatar" name="head_img" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img :src="imageUrl!=null?imageUrl:defaultImg" class="avatar">
                </el-upload>
                <p class="tips">tips:请上传2M以内JPG/PNG格式的图片，比例最好1:1</p>
            </el-form-item>
            <el-form-item class="b-info">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button>退出登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</div>
</template>

<script>
import defaultImg from '@/assets/logo.png'
export default {
    data() {
        return {
            imageUrl: null,
            defaultImg: defaultImg,
            userInfo: {},
            form: {
                name: ''
            }
        }
    },
    methods: {
        async save() {
            const res = await this.$axios.post('api/user/updataUser', {
                nickname: this.form.name,
                head_img: this.imageUrl
            })
            if (res.data.code === 0) {
                this.$message({
                    message: '保存设置成功',
                    type: 'success',
                    duration:1000
                });
                         location.reload()      
            }
        },
        handleAvatarSuccess(res, file) {
            // console.log(res)
            this.imageUrl = res.data;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        async getUserInfo() {
            const res = await this.$axios.get('api/user/info')
            const result = res.data
            this.userInfo = result.data
            // console.log(result)
            if (result.code === 0) {
                this.form.name = result.data.nickname
                if (result.data.head_img == '' || result.data.head_img == null) {
                    this.imageUrl = null
                } else {
                    this.imageUrl = result.data.head_img
                }

            }

        },

    },
    created() {
        this.getUserInfo()
    },
}
</script>

<style scoped>
.tips {
    font-size: 12px;
    color: #999;
}

.p-name {
    width: 200px;
}

.wrapper {
    min-height: calc(100vh-150px);
}

.content {
    width: 40%;
    margin: 0 auto;
    padding: 50px 0;

}

/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

/deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

/deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

/deep/ .avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>
