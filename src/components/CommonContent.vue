<template>
  <div class="wrapper content">
      <el-card>
          <div class="card" v-for="item in allList" :key="item.id">
              <router-link :to="'/detail/'+item.id">
                 <p class="title">{{item.title}}</p>
              </router-link>
              <p class="time">{{item.create_time}}</p>
          </div>
         
      </el-card>
      
  </div>
</template>

<script>
export default {
    data(){
        return {
            allList:[]
        }
    },
    methods:{
       async getAllList(){
           const res =await this.$axios.get('api/blog/allList')
        //    console.log(res)
           if(res.data.code==0){
               this.allList=res.data.data
           }
        }
    },
    created(){
        this.getAllList()
    }
}
</script>

<style lang="scss" scoped>
.content{
    margin-top: 25px;
      min-height: calc(100vh-150px);
}
    .card{
        padding-bottom: 20px;
        margin-top: 10px;
        border-bottom: 1px solid #eeeeee;
        .title{
            color: #0085a1;
            font-size: 26px;
            font-weight: 600;
        }
        .time{
            font-style: italic;
            font-family: Lora,"Times New Roman",serif;
            color: #808080;
            margin-top: 10px;
        }
    }
</style>