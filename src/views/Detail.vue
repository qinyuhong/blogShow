<template>
<div class="content-box">
    <div class="wrapper">
        <el-card class="card">
            <div class="info">
                <h1 class="title">{{detailList.title}}</h1>
                <div class="time">
                    <span class="data"><i class="iconfont icon-date"></i>{{detailList.create_time}}</span>
                </div>
            </div>
            <div class="detail">
                <mavon-editor :editable="false" :toolbarsFlag="false" :subfield="false" v-model="detailList.content" />
            </div>
            <Common></Common>
        </el-card>
    </div>
</div>
</template>

<script>
import Common from '@/components/Common.vue'
export default {
    data() {
        return {
            detailList: {}
        }
    },
    components: {
        Common
    },
    methods: {
        async getDetailInfo() {
            const res = await this.$axios.get('api/blog/detail', {
                params: {
                    article_id: this.$route.params.id
                }
            })
            // console.log(res)
            if (res.data.code === 0) {
                this.detailList = res.data.data
            }
        }
    },
    created() {
        this.getDetailInfo()
    },
}
</script>

<style lang="scss" scoped>
.content-box {
    min-height: calc(100vh-150px);

    .card {
        margin-top: 25px;
        padding: 20px;

        .info {
            text-align: center;
        }

        .title {
            font-weight: 500;
            font-size: 24px;
        }

        .time {
            margin: 10px 0 40px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
            color: #999;

            .iconfont {
                color: #666;
                margin-right: 5px;
            }
        }

    }
}
</style>
