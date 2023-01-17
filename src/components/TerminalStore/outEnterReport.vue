<template>
    <div style="width:100%;height: 5rem;box-sizing: border-box;" class="bg_fff p_2 mt_1">
        <div class="flex space_between">
            <div class="flex">
                <div class="sign mx_1"></div>
                出/入库报表
                <div class="ml_1">
                    <span :class="{ 'outEnterActive': outEnterIndex == 'enter' }" class="p_1 enterButton"
                        @click="outEnterButton('enter')">入库报表</span>
                    <span :class="{ 'outEnterActive': outEnterIndex == 'out' }" class="p_1 outButton"
                        @click="outEnterButton('out')">出库报表</span>
                </div>
            </div>
            <div class="flex">
                <div class="mr_1">
                    <el-button @click="dialogVisible = true">导出数据</el-button>
                </div>
                <div style="background-color:#eef0f2;border-radius: 0.25rem"
                    class="flex juction_content align_items mr_2">
                    <input type="text" placeholder="请输入要搜索的商品名称" v-model.trim="searchText"
                        style="border: none;padding-left: 0.2rem;box-sizing: border-box;;font-size: 0.14rem;width: 1.8rem;;height: 100%;background-color:#eef0f2;border-radius: 0.2rem;">
                    <button class="bg_fff" @click="search"
                        style="border:none;height: 96%;background-color: #fff;padding:0 0.2rem;border-radius: 0.25rem;margin-right: 0.02rem;cursor: pointer;">搜索</button>
                </div>
                <div class="mr_1">
                    年份：
                    <el-date-picker style="width:1.5rem" v-model="yearData" type="year" align="center" placeholder="选择年"
                        @change="searchYear" format="yyyy年">
                    </el-date-picker>
                </div>
                <div>
                    月份：
                    <el-date-picker style="width:1.5rem" v-model="monthData" type="month" align="center"
                        @change="searchMonth" placeholder="选择月" format="M月份">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="mt_1" style="height:80%;overflow-y: scroll;">
            <el-table :data="tableData" stripe border
                :header-cell-style="{ 'text-align': 'center', 'background': '#fafafa' }"
                :cell-style="{ 'text-align': 'center' }">
                <el-table-column prop="images" label="商品图">
                    <template slot-scope="scope">
                        <img style="width: 0.5rem;height: 0.5rem;" :src="scope.row.images" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称">
                </el-table-column>
                <el-table-column prop="time" label="入库时间" v-if="this.type == 1">
                </el-table-column>

                <el-table-column prop="num" label="数量">
                </el-table-column>
                <el-table-column prop="price" label="单价(元)">
                </el-table-column>
            </el-table>
        </div>
        <div class="flex juction_content align_items mt_1 aaa">
            <el-pagination @current-change="currentChange" :page-size="pageSize" background :current-page="currentPage"
                layout="prev,pager, next, total, jumper" :total="total">
            </el-pagination>
            <div class="GO">GO</div>
        </div>
        <el-dialog :title="outEnterIndex == 'enter' ? '店铺' + user_id + '入库报表' : '店铺' + user_id + '出库报表'"
            :visible.sync="dialogVisible" width="30%">
            <div class="flex">
                <div class="mr_1">
                    年份：
                    <el-date-picker style="width:1.5rem" v-model="excelYearData" type="year" align="center"
                        placeholder="选择年" @change="searchExcelYear" format="yyyy年" clear-icon="false">
                    </el-date-picker>
                </div>
                <div>
                    月份：
                    <el-date-picker style="width:1.5rem" v-model="excelMonthData" type="month" align="center"
                        @change="searchExcelMonth" placeholder="选择月" format="M月份" clear-icon="false">
                    </el-date-picker>
                </div>
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
import { allgetGoodsInOutStatistics } from '@/api/login'
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            pageSize: 6,
            outEnterIndex: 'enter',
            currentPage: 1,
            yearData: new Date(),
            monthData: new Date(),
            newDate: '',
            searchText: '',
            month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
            year: new Date().getFullYear(),
            type: 1,
            dialogVisible: false,
            excelInput: 0,
            excelShow: false,
            excelData: [],
            excelInput: 0,
            excelYearData: new Date(),
            excelMonthData: new Date(),
            excel_year: "",
            excel_month: "",
        }
    },
    props: {
        user_id: Number
    },
    created() {
        var that = this
        that.allgetGoodsInOutStatistics()
    },
    methods: {
        excelShowButton() {
            if (this.outEnterIndex == 'enter') {
                const json_fields = [
                    {
                        title: "商品图",
                        key: "images",
                        type: "image",
                        width: 100,
                        height: 100
                    },
                    {
                        title: "商品名称",
                        key: "name",
                        type: "text"
                    },
                    {
                        title: "入库时间",
                        key: "time",
                        type: "text"
                    },
                    {
                        title: "数量",
                        key: "num",
                        type: "text"
                    },
                    {
                        title: "单价(元)",
                        key: "price",
                        type: "text"
                    },
                ]
                this.$JsonExcel(json_fields, this.excelData, `店铺${this.user_id}入库报表`)
            } else {
                const json_fields = [
                    {
                        title: "商品图",
                        key: "images",
                        type: "image",
                        width: 100,
                        height: 100
                    },
                    {
                        title: "商品名称",
                        key: "name",
                        type: "text"
                    },
                    {
                        title: "数量",
                        key: "num",
                        type: "text"
                    },
                    {
                        title: "单价(元)",
                        key: "price",
                        type: "text"
                    },
                ]
                this.$JsonExcel(json_fields, this.excelData, `店铺${this.user_id}出库报表`)
            }
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
            if (this.outEnterIndex == 'enter') {
                const obj = {
                    date: this.excel_year,
                    month: this.excel_month,
                    type: 1,
                    page: 1,
                    pageSize: this.excelInput,
                    user_id: this.user_id
                }
                allgetGoodsInOutStatistics(obj).then((item) => {
                    if (item.data.list.length == 0) {
                        this.$Notify('数据为空')
                        return
                    }
                    this.excelData = item.data.list
                    this.excelData.forEach((item) => {
                        item.time = this.getNewDate(item.time * 1000)
                    })
                })
            } else {
                const obj = {
                    date: this.excel_year,
                    month: this.excel_month,
                    type: 2,
                    page: 1,
                    pageSize: this.excelInput,
                    user_id: this.user_id
                }
                allgetGoodsInOutStatistics(obj).then((item) => {
                    console.log(item)
                    this.excelData = item.data.list
                })
            }
            this.excelShow = true

        },
        searchExcelYear() {
            this.excel_year = this.excelYearData.getFullYear()
            console.log(this.excel_year)
        },
        searchExcelMonth() {
            this.excel_month = this.excelMonthData.getMonth() + 1 > 9 ? this.excelMonthData.getMonth() + 1 : '0' + (this.excelMonthData.getMonth() + 1)
            console.log(this.excel_month)
        },
        outEnterButton(data) {
            this.outEnterIndex = data
            if (data == 'enter') {
                this.type = 1
                this.allgetGoodsInOutStatistics()
            } else {
                this.type = 2
                this.allgetGoodsInOutStatistics()
            }
        },
        currentChange(currentPage) {
            this.currentPage = currentPage
            this.allgetGoodsInOutStatistics()
        },
        // 转换当前日期
        getNewDate(data) {
            var time = new Date(data)
            var year = time.getFullYear();
            var month = (time.getMonth() + 1 + "").padStart(2, 0);
            var date = (time.getDate() + "").padStart(2, 0);
            var hours = (time.getHours() + "").padStart(2, 0);
            var minutes = (time.getMinutes() + "").padStart(2, 0);
            // var seconds = (time.getSeconds() + "").padStart(2, 0);
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
        },
        search() {
            this.allgetGoodsInOutStatistics()
        },
        searchYear() {
            this.year = this.yearData.getFullYear()
            this.allgetGoodsInOutStatistics()
        },
        searchMonth() {
            this.month = this.monthData.getMonth() + 1 > 9 ? this.monthData.getMonth() + 1 : '0' + (this.monthData.getMonth() + 1)
            this.allgetGoodsInOutStatistics()
        },
        allgetGoodsInOutStatistics() {
            const obj = {
                page: this.currentPage,
                pageSize: this.pageSize,
                type: this.type,
                keyWords: this.searchText,
                year: this.year,
                month: this.month,
                user_id: this.user_id
            }
            allgetGoodsInOutStatistics(obj).then((item) => {
                console.log(item)
                if (this.currentPage == 1) {
                    this.total = item.data.count
                }
                this.newDate = item.data.cache_date
                item.data.list.forEach((item) => {
                    item.time = this.getNewDate(item.time * 1000)
                })
                this.tableData = item.data.list
            })
        }
    }
}
</script>
<style lang="less" scoped>
.enterButton {
    color: #fff;
    border-top-left-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
    background-color: #bdc0c2;
    cursor: pointer;
}

.outButton {
    color: #fff;
    border-top-right-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    background-color: #bdc0c2;
    cursor: pointer;
}

.outEnterActive {
    background-color: #1854ea;
}

.sign {
    width: 0.04rem;
    height: 0.25rem;
    background-color: #003bcf;
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

/deep/ .el-pager {
    li.active {
        background-color: #003bcf !important;
    }
}

/deep/ .el-input__prefix {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%) !important;
    cursor: pointer;
}

/deep/ .el-input__suffix {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%) !important;
    cursor: pointer;
}
</style>