<template>
    <div style="width:100%;height: 100%;">
        <div style="width:100%;height: 45%;box-sizing: border-box;" class="bg_fff p_2">
            <div class="flex space_between">
                <div style="width: 50%;" class="flex align_items space_between ">
                    <div class="flex align_items">
                        <div class="sign mx_1"></div>
                        <span class="mr_1">业绩报表</span>
                        <div class="color_hui" style="font-size:0.14rem">最近更新时间：<span>{{ newDate }}</span></div>
                    </div>
                    <div class="flex">
                        <div class="mr_1">
                            <el-button @click="dialogVisible = true">导出数据</el-button>
                        </div>
                        <el-date-picker class="filterDate" v-model="timeEveryDay" type="daterange" align="center"
                            start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期"
                            @change="filterEveryDay">
                        </el-date-picker>
                    </div>
                </div>
                <div class="flex">
                    <el-date-picker v-model="pieValue" type="monthrange" range-separator="至" start-placeholder="开始月份"
                        @change="pieFilter" :picker-options="pickerOptions" end-placeholder="结束月份">
                    </el-date-picker>
                </div>
            </div>
            <div class="flex" style="height:90%">
                <div style="flex:1;">
                    <div style="height:80%;overflow-y: scroll;">
                        <el-table :data="tableData" stripe
                            :header-cell-style="{ 'text-align': 'center', 'background': '#fafafa' }"
                            :cell-style="{ 'text-align': 'center' }">
                            <el-table-column prop="time" label="日期" width="180">
                            </el-table-column>
                            <el-table-column prop="num" label="日销售量(件)" width="180">
                            </el-table-column>
                            <el-table-column prop="price" label="日销售额(元)">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="flex juction_content align_items mt_1 aaa" style="height:20%">
                        <el-pagination @current-change="currentChange" :page-size="pageSize" background
                            :current-page="currentPage" layout="prev,pager, next, total, jumper" :total="total">
                        </el-pagination>
                        <div class="GO">GO</div>
                    </div>
                </div>
                <div style="flex:1">
                    <div style="width:100%;height:300px" id="echartsPie2"></div>
                </div>
            </div>
        </div>
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
            <div style="width: 100%;height: 150px;" id="echartsBar2">
            </div>
        </div>
        <el-dialog title="业绩报表" :visible.sync="dialogVisible" width="30%">
            <div class="flex">

                <el-date-picker class="filterDate" v-model="exceltimeEveryDay" type="daterange" align="center"
                    start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期"
                    @change="excelFilterButton">
                </el-date-picker>
            </div>
            <div class="mt_1 flex align_items">导出数量：<el-input v-model="excelInput" class="class"
                    style="width:2rem"></el-input></div>
            <span slot="footer" class="dialog-footer flex" style="justify-content: space-between;">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button @click="excelButton">确 定</el-button>
                <el-button @click="excelShowButton" v-if="excelShow">导出数据</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { getEverydayTotal, allgetEverydayList, allgetYearReportForm } from '@/api/login'
export default {
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
            tableData: [],
            barData: [],
            barData2: [],
            totalPie: 0,
            pricePie: 0,
            start_month: 0,
            timeEveryDay: '',
            end_month: 0,
            startTime: '',
            endTime: '',
            startTimeEveryDay: '',
            endTimeEveryDay: '',
            dialogVisible: false,
            excelInput: 0,
            excelShow: false,
            excelData: [],
            excelInput: 0,
            exceltimeEveryDay: new Date()
        }
    },
    created() {
        this.newDate = this.getNewDate()
        this.allgetEverydayList()
        this.allgetYearReportForm()
        this.startTime = this.getNewDateB(new Date().setDate(1))
        this.endTime = this.getNewDateB(this.getNowMonthLast())
    },
    mounted() {
        this.getEverydayTotal()
    },
    methods: {
        excelFilterButton(e) {
            this.excelStartTime = this.getNewDateB(e[0])
            this.excelEndTime = this.getNewDateB(e[1])
        },
        excelShowButton() {
            const json_fields = [
                {
                    title: "日期",
                    key: "time",
                    type: "text",
                },
                {
                    title: "日销售量(件)",
                    key: "num",
                    type: "text"
                },
                {
                    title: "日销售额(元)",
                    key: "price",
                    type: "text"
                }
            ]
            this.$JsonExcel(json_fields, this.excelData, '业绩报表 ')
            setTimeout(() => {
                this.excelShow = false
            }, 2000);
        },
        excelButton() {
            if (this.excelInput > 999) {
                this.$Notify('导出数量不能超过1000')
                return
            }
            let myreg = /^([0-9]{1,}[.][0-9]*)$/;
            let myreg2 = /^([0-9]{1,})$/;
            if (!myreg.test(this.excelInput) && !myreg2.test(this.excelInput)) {
                this.excelInput = 0;
                this.$Notify('请输入正确的导出数量')
                return
            }
            const obj = {
                page: 1,
                start_time: this.excelStartTime,
                end_time: this.excelEndTime,
                pageSize: this.excelInput,
                sort_type: 1
            }
            allgetEverydayList(obj).then((item) => {
                this.excelData = item.data.list
                this.excelData.forEach((toItem) => {
                    toItem.time = this.getNewDateB(toItem.time * 1000)
                })
                this.excelShow = true
            })
        },

        filterTime(val) {
            this.startTime = this.getNewDateB(val[0])
            this.endTime = this.getNewDateB(val[1])
            this.getEverydayTotal()
        },
        currentChange(currentPage) {
            this.currentPage = currentPage
            this.allgetEverydayList()
        },
        pieFilter(val) {
            this.start_month = this.getNewDateC(val[0])
            this.end_month = this.getNewDateC(val[1])
            this.allgetYearReportForm()
        },
        filterEveryDay(val) {
            this.startTimeEveryDay = this.getNewDateB(val[0])
            this.endTimeEveryDay = this.getNewDateB(val[1])
            this.currentPage = 1
            this.allgetEverydayList()
        },
        EchartsPie() {
            var chartDom = document.getElementById('echartsPie2');
            var myChart = echarts.init(chartDom);
            var option;
            var that = this
            option = {
                title: {
                    text: `本月当前订单总量${this.totalPie}单 月总收入${this.pricePie}元`,
                    textStyle: {
                        fontSize: 14
                    }
                },
                color: ['#9b9b9b', '#43b2ff', '#ff4343', '#2bcaa1', '#ac6cff', '#ff5fa2', '#346bc1', '#ff9000', '#6117e8', '#8eff20', '#ffcf0e', '#43b2ff'],
                legend: {
                    orient: 'vertical',
                    // right: 20,
                    left: 250,
                    // y: 'center',
                    itemGap: 30,
                    // itemWidth: 20,
                    padding: 10,
                    formatter(Toname) {
                        let data = option.series[0].data
                        let tarValue
                        data.forEach((item) => {
                            total += item.value
                            if (item.name == Toname) {
                                tarValue = item.value
                            }
                        })
                        let v = tarValue + '元'
                        //计算出百分比
                        let p = ((tarValue / that.pieTotalNum) * 100).toFixed(1) + '%'

                        if (tarValue == 0) {
                            p = 0 + '%'
                        }
                        return `${Toname.slice(0, 4) + '-' + Toname.slice(4)}  ${v}  ${p}`
                        //name是名称，v是数值
                    },
                    rich: {
                        total: {
                            color: 'red'
                        }
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['50%', '40%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: '{total|' + '今年总收入(元)' + '}' + '\n\r' + '{active|' + this.pieTotalNum.toFixed(1) + '}',
                                rich: {
                                    active: {
                                        fontSize: 24
                                    },
                                    total: {
                                        fontSize: 16,
                                        color: '#9b9b9b',
                                        lineHeight: 30
                                    }
                                }
                            }
                        },
                        center: ['20%', '50%'],
                        labelLine: {
                            show: false
                        },
                        data: this.pieData
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        // 每日数据列表
        allgetEverydayList() {
            const obj = {
                page: this.currentPage,
                pageSize: this.pageSize,
                start_time: this.startTimeEveryDay,
                end_time: this.endTimeEveryDay
            }
            allgetEverydayList(obj).then((item) => {
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
                end_time: this.endTime
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
            var chartDom = document.getElementById('echartsBar2');
            var myChart = echarts.init(chartDom);
            var option;
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
                                    if (name.data.date == date.toString().padStart(2, 0)) {
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
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
        },
        allgetYearReportForm() {
            const obj = {
                start_month: this.start_month,
                end_month: this.end_month
            }
            allgetYearReportForm(obj).then((item) => {
                console.log(item)
                this.pieData = []
                this.pieTotalNum = item.data.all_total_price
                item.data.month_list.forEach((item) => {
                    if (item.date == new Date().getFullYear() + '' + (new Date().getMonth() + 1).toString().padStart(2, 0)) {
                        this.totalPie = item.total_num
                        this.pricePie = item.total_price
                    }
                    this.pieData.push({ value: item.total_price, name: item.date })
                })
                setTimeout(() => {
                    this.EchartsPie()
                }, 500);
            })
        },
        // 转换当前日期到日
        getNewDateB(number) {
            var time = new Date(number)
            var year = time.getFullYear();
            var month = (time.getMonth() + 1 + "").padStart(2, 0);
            var date = (time.getDate() + "").padStart(2, 0);
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
        height: 35% !important;
    }

    .filterDate {
        width: 2rem;
    }

    #echartsPie {
        height: 2.5rem !important;
    }

    /deep/ .el-range-editor.el-input__inner {
        width: 2.2rem;
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