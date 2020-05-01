<template>
  <div>
      <el-row class="blogHeader ">
          <el-col :span="18" class="h-text">赖菠萝博客</el-col>
          <el-col :span="6">
              <el-menu class="h-menu" mode="horizontal" router :default-active="$route.path" @select="handleIndex" background-color="#f4f0fd">
                   <el-menu-item index="/"><i class="iconfont icon-home"></i>首页</el-menu-item>
                    <el-menu-item index="/blog" v-if="isSign===1">我的博客</el-menu-item>
                     <el-menu-item index="/login" v-if="isSign===0">登录</el-menu-item>
                      <el-menu-item index="/person" v-if="isSign===1">{{userInfo.nickname}}</el-menu-item>
              </el-menu>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex:'/',
            userInfo:{}
        }
    },
    computed: {
        isSign(){
          return  this.$store.state.signStatus
        }
    },
    methods: {
        handleIndex(key){
          this.activeIndex=key
        },
        // 获取用户信息
      async  getUserInfo(){
       const res= await  this.$axios.get('api/user/info')
       const result=res.data
       this.userInfo=result.data
        }
    },
   created() {
     this.getUserInfo()
   },
}
</script>

<style lang="scss" scoped>

  .blogHeader{
      background-color: #f4f0fd;
      display: flex;
      align-items: center;
       box-shadow: 0 2px 4px 1px rgba(250,250,250,0.5);
       border-radius: 8px;
      .h-text{
          margin-left: 100px;
          font-weight: 500;
          font-size: 20px;
      }
      .iconfont{
        font-size: 14px;
        color: #666666;
        margin-right: 5px;
      }
  }
</style>