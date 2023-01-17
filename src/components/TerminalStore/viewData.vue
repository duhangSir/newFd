<template>
    <!-- <div style="background-color: #f1f2f3;width: 100%;"> -->
    <div class="DataMana" style="overflow-y:scroll">
        <!-- 数据管理 -->
        <div style="width: 100%;height: 0.5rem;padding: 0.1rem 0;margin:0 auto"
            class="bg_fff flex space_between align_items">
            <div class="flex space_between align_items" style="padding: 0 0.2rem;">
                <img src="../../img/terminaLogo.png" alt="">
                <span class="ml_1">终端店管理</span>
                <div v-if="openCity" class="flex">
                    <div class="ml_1">当前店铺编号: <span style="color:#3f66d8">{{ cityData.cashier_user_id }}</span> </div>
                    <div class="ml_1">所在城市: <span style="color:#3f66d8">{{ cityData.city_name }}</span> </div>
                    <div class="ml_1">剩余库存: <span style="color:#3f66d8">{{ cityData.stock_num }}</span> </div>
                </div>
            </div>
            <div>
                <div class="mr_1" v-if="openCity">
                    <button class="button" v-for="(item, index) in buttons" :key="index" type="info"
                        plain :class="{ 'active': item.type == buttonType }" @click="reportForm(item.type)">{{
                            item.title
                        }}
                    </button>
                </div>
            </div>
        </div>
        <div style="width: 100%;height: 7.5rem;min-height: 4rem;" class="mt_1 flex zishuju" v-if="openCity">
            <achievementReport :user_id="cityData.cashier_user_id" v-if="buttonType == 'achievement'">
            </achievementReport>
            <Stock :user_id="cityData.cashier_user_id" @viewMore="viewMore" v-else-if="buttonType == 'stock'">
            </Stock>
        </div>
        <div style="width: 100%;height: 7.5rem;" class="mt_1 flex zishuju" v-else>
            <ChoiceCity @viewData="choiceData" @adminStock="adminStock"></ChoiceCity>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
import Stock from './stock.vue'  //数据管理首页
import achievementReport from './achievementReport.vue' // 业绩报表
import ChoiceCity from './choiceCity.vue' // 业绩报表
export default {
    data() {
        return {
            newDate: '',
            newMonth: '',
            buttons: [
                {
                    title: '查看数据',
                    type: 'achievement'
                },
                {
                    title: '管理库存',
                    type: 'stock'
                }
            ],
            buttonType: 'achievement',
            input2: '',
            date: '',
            show: false,
            tableData: [],
            // openCity: false,
            cityData: {}
        }
    },
    props: {
        openCity: Boolean
    },
    components: { achievementReport, Stock, ChoiceCity },
    methods: {
        choiceData(e) {
            console.log(e)
            // this.openCity = true
            this.$emit('openCityTwo')
            this.cityData = e
            this.buttonType = 'achievement'
        },
        adminStock(e) {
            // this.openCity = true
            this.$emit('openCityTwo')
            this.cityData = e
            this.buttonType = 'stock'
        },
        // 报表点击事件
        reportForm(type) {
            this.buttonType = type
        },
        viewMore() {
            this.buttonType = 'MorehomePage'
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