<template>
    <div style="background-color: #f1f2f3;width: 100%;">
        <div class="DataMana">
            <!-- 数据管理 -->
            <div style="width: 100%;height: 0.5rem;padding: 0.1rem 0;margin:0 auto"
                class="bg_fff flex space_between align_items miniSix">
                <div class="flex space_between align_items" style="padding: 0 0.2rem;">
                    <img src="../../img/dataManage.png" alt="">
                    <span class="ml_1">总数据管理</span>
                </div>
                <div>
                    <div class="mr_1">
                        <button class="button" v-for="(item, index) in buttons" :key="index" type="info" plain
                            :class="{ 'active': item.type == buttonType }" @click="reportForm(item.type)">{{
                                item.title
                            }}
                        </button>
                    </div>
                </div>
            </div>
            <div style="width: 100%;height: 7.5rem;" class="mt_1 flex zishuju">
                <ManageIndex v-if="buttonType == 'homePage'" @viewMore="viewMore"></ManageIndex>
                <cityAchievementReport v-else-if="buttonType == 'cityAchievement'"></cityAchievementReport>
                <shopAchievement v-else-if="buttonType == 'shopAchievement'"></shopAchievement>
                <achievementReport v-else-if="buttonType == 'achievement'"></achievementReport>
            </div>
        </div>
    </div>
</template>
<script>
import ManageIndex from './ManageIndex.vue'  //数据管理首页
import achievementReport from './achievementReport.vue' // 业绩报表
import cityAchievementReport from './cityAchievementReport.vue'
import shopAchievement from './shopAchievement.vue'
export default {
    data() {
        return {
            newDate: '',
            newMonth: '',
            // buttonType: '',
            buttons: [
                {
                    title: '总数据',
                    type: 'homePage'
                },
                {
                    title: '城市业绩排名',
                    type: 'cityAchievement'
                },
                {
                    title: '店铺业绩排名',
                    type: 'shopAchievement'
                },
                {
                    title: '业绩报表',
                    type: 'achievement'
                },
            ],
            buttonType: 'homePage',
            input2: '',
            date: '',
            show: false,
            tableData: []
        }
    },
    components: { achievementReport, cityAchievementReport, shopAchievement, ManageIndex },
    methods: {
        // 报表点击事件
        reportForm(type) {
            this.buttonType = type
        },
        viewMore(type) {
            console.log(1)
            this.buttonType = type
            // this.buttonType = 'MorehomePage'
        }
    },
    mounted() {
    },
    created() {
    },
}
</script>
<style lang="less" scoped>
.DataMana {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #dbdddf;
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
}

@media (max-height: 800px) {
    .DataMana {
        width: 13.3rem;
        height: 6.4rem;
        margin: 0 auto;
    }

    // .miniSix {
    //     width: 13.3rem !important;
    // }
}

.active {
    color: #6a87ec;
}

.sign {
    width: 0.04rem;
    height: 0.25rem;
    background-color: red;
}

.button {
    padding: 0.1rem 0.2rem;
    border: 0.01rem solid #cccdce;
    background-color: #fbfdff;
    cursor: pointer;
    font-weight: bold;
}

/deep/ .el-button {
    background-color: #fbfdff;
    margin: 0;
}

/deep/ .el-input__prefix {
    position: absolute;
    top: 50%;
    transform: translate(0, -25%);
    cursor: pointer;
}

/deep/ .el-input__suffix {
    position: absolute;
    top: 50%;
    transform: translate(0, -25%);
    cursor: pointer;
}
</style>