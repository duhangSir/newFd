<template>
    <div style="width:100%;height: 250px;" class="bg_fff">
        <div class="bg_fff mt_1 p_2 bottom_Bar" style="box-sizing: border-box;width:100%;height:30%">
            <div class="flex space_between">
                <div class="flex align_items">
                    <div class="sign mx_1"></div>
                    <span class="mr_1">本月收入统计</span>
                    <div class="color_hui" style="font-size:0.14rem">单位(元)</div>
                </div>
                <div>
                    <el-date-picker v-model="timeBar" type="daterange" align="center" start-placeholder="开始日期"
                        :picker-options="pickerOptions" end-placeholder="结束日期" @change="filterTime">
                    </el-date-picker>
                </div>
            </div>
            <div style="width: 100%;height: 180px;" id="echartsBar">
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { getEverydayList, getEverydayTotal } from '@/api/login'
export default {
    props: {
        user_id: Number
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    const date = new Date();
                    return time.getTime() > date.getTime();     //禁止选取当天之后的日期（不包括静止当天）
                },
            },
            newDate: "",
            yearData: new Date(),
            monthData: new Date(),
            pageSize: 6,
            total: 0,
            timeBar: [],
            currentPage: 1,
            pieValue: 0,
            pieData: [
            ],
            pieTotalNum: 0,
            totalPie: 0,
            pricePie: 0,
            start_month: 0,
            timeEveryDay: '',
            end_month: 0,
            startTime: '',
            endTime: '',
            startTimeEveryDay: '',
            endTimeEveryDay: ''
        }
    },
    created() {
        this.newDate = this.getNewDate()
        this.getEverydayList()
        this.startTime = this.getNewDateB(new Date().setDate(1))
        this.endTime = this.getNewDateB(this.getNowMonthLast())
    },
    mounted() {
        this.getEverydayTotal()
        this.EchartsBar()
    },
    methods: {
        filterTime(val) {
            this.startTime = this.getNewDateB(val[0])
            this.endTime = this.getNewDateB(val[1])
            this.getEverydayTotal()
        },
        currentChange(currentPage) {
            this.currentPage = currentPage
            this.getEverydayList()
        },
        filterEveryDay(val) {
            this.startTimeEveryDay = this.getNewDateB(val[0])
            this.endTimeEveryDay = this.getNewDateB(val[1])
            this.currentPage = 1
            this.getEverydayList()
        },
        // 每日数据列表
        getEverydayList() {
            const obj = {
                page: this.currentPage,
                pageSize: this.pageSize,
                start_time: this.startTimeEveryDay,
                end_time: this.endTimeEveryDay
            }
            getEverydayList(obj).then((item) => {
                this.total = item.data.count
                this.tableData = item.data.list
                this.newDate = this.getNewDate(item.time)
                item.data.list.forEach((toItem) => {
                    toItem.time = this.getNewDateB(toItem.time * 1000)
                })
            })
        },
        // 每日数据统计
        getEverydayTotal() {
            const obj = {
                start_time: this.startTime,
                end_time: this.endTime,
                user_id: this.user_id
            }
            getEverydayTotal(obj).then((item) => {
                this.barData = []
                this.barData2 = []
                this.barData = item.data
                item.data.forEach((item) => {
                    this.barData2.push(item.date)
                })
                this.EchartsBar()
            })
        },
        EchartsBar() {
            var chartDom = document.getElementById('echartsBar');
            var myChart = echarts.init(chartDom);
            var option;
            console.log(1)
            option = {
                xAxis: {
                    type: 'category',
                    data: this.barData2,
                    axisLabel: {
                        formatter: function (name) {
                            return name + '号'
                        },
                        color: function (name) {
                            const date = new Date().getDate()
                            console.log(date)
                            if (name == date.toString().padStart(2, 0)) {
                                return '#003bcf'
                            } else {
                                return '#000'
                            }
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    max: function (value) {
                        return value.max + 0.2 * value.max
                    },
                },
                series: [
                    {
                        data: this.barData,
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                },
                                color: function (name) {
                                    const date = new Date().getDate()
                                    if (name.data.name == date.toString().padStart(2, 0)) {
                                        return '#003bcf'
                                    } else {
                                        return '#5082ff'
                                    }
                                }
                            }
                        },
                    }
                ],
                grid: {
                    left: '40px',
                    top: '40px',
                    right: '40px',
                    bottom: '20px'
                }
            };
            myChart.setOption(option);
        },

        getNewDate() {
            var time = new Date();
            var year = time.getFullYear();
            var month = (time.getMonth() + 1 + "").padStart(2, 0);
            var date = (time.getDate() + "").padStart(2, 0);
            var hours = (time.getHours() + "").padStart(2, 0);
            var minutes = (time.getMinutes() + "").padStart(2, 0);
            // var seconds = (time.getSeconds() + "").padStart(2, 0);
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
        },
        // 转换当前日期到日
        getNewDateB(number) {
            var time = new Date(number)
            var year = time.getFullYear();
            var month = (time.getMonth() + 1 + "").padStart(2, 0);
            var date = (time.getDate() + "").padStart(2, 0);
            // var hours = (time.getHours() + "").padStart(2, 0);
            return year + '-' + month + '-' + date
        },
        // 转换当前日期到月
        getNewDateC(number) {
            var time = new Date(number)
            var year = time.getFullYear();
            var month = (time.getMonth() + 1 + "").padStart(2, 0);
            return year + '-' + month
        },
        // 获取当前月份的最后一天
        getNowMonthLast() {
            const date = new Date()
            const enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            return enddate
        },
        // 处理当前月份的最后一天
        getCountDays() {
            let curDate = new Date();
            let curMonth = curDate.getMonth();
            curDate.setMonth(curMonth + 1);
            curDate.setDate(0);
            return curDate.getDate();
        },
    }
}
</script>
<style lang="less" scoped>
@media (max-height: 800px) {
    .bottom_Bar {
        height: 45% !important;
    }

    .filterDate {
        width: 2rem;
    }

    #echartsPie {
        height: 2.5rem !important;
    }
}

.GO {
    background-color: #003bcf;
    padding: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
}

.GO:hover {
    cursor: pointer;
}

.sign {
    width: 0.04rem;
    height: 0.25rem;
    background-color: #003bcf;
}

/deep/ .el-input__prefix {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%) !important;
    cursor: pointer;
}

/deep/ .el-pager {
    li.active {
        background-color: #003bcf !important;
    }
}

/deep/ .el-input__suffix {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%) !important;
    cursor: pointer;
}
</style>