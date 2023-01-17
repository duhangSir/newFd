<template>
    <div style="width:100%;height: 100%;box-sizing: border-box;" class="bg_fff p_2">
        <div class="flex space_between">
            <div class="flex">
                <div class="sign mx_1"></div>
                终端店列表
            </div>
            <div class="flex">

                <el-button @click="dialogVisible = true">导出数据</el-button>
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
                <el-table-column prop="cashier_user_id" label="店铺编号">
                </el-table-column>
                <el-table-column prop="city_name" label="终端店地址">
                </el-table-column>
                <el-table-column prop="total_price" label="收入总额(元)">
                </el-table-column>
                <el-table-column prop="stock_num" label="库存数量">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" style="background-color: #003bcf;color: #fff;"
                            @click="handleEdit(scope.$index, scope.row)">查看数据</el-button>
                        <el-button size="mini" style="background-color: #dce6ff;color: #003bcf;"
                            @click="handleDelete(scope.$index, scope.row)">管理库存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex juction_content align_items mt_1 aaa">
            <el-pagination @current-change="currentChange" :page-size="pageSize" background :current-page="currentPage"
                layout="prev,pager, next, total, jumper" :total="total">
            </el-pagination>
            <div class="GO">GO</div>
        </div>
        <el-dialog title="业绩报表" :visible.sync="dialogVisible" width="30%">
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
import { getCashierRankList } from '@/api/login'
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            pageSize: 6,
            currentPage: 1,
            yearData: new Date(),
            monthData: new Date(),
            month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
            year: new Date().getFullYear(),
            searchText: "",
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
    created() {
        this.getCashierRankList()
    },
    methods: {

        excelShowButton() {
            const json_fields = [
                {
                    title: "店铺编号",
                    key: "cashier_user_id",
                    type: "text",
                },
                {
                    title: "终端店地址",
                    key: "city_name",
                    type: "text"
                },
                {
                    title: "收入总额(元)",
                    key: "total_price",
                    type: "text"
                },
                {
                    title: "库存数量",
                    key: "stock_num",
                    type: "text"
                },
            ]
            this.$JsonExcel(json_fields, this.excelData, '终端店列表')
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
                date: this.excel_year + this.excel_month,
                page: 1,
                pageSize: this.excelInput,
                sort_type: 1
            }
            getCashierRankList(obj).then((item) => {
                if (item.data.list.length == 0) {
                    this.$Notify('数据为空')
                    return
                }
                this.excelData = item.data.list
                this.excelData.forEach((item) => {
                    item.city_name = item.address.city + item.address.district
                })
                this.excelShow = true
            })
        },
        searchExcelYear() {
            this.excel_year = this.excelYearData.getFullYear()
            console.log(this.excel_year)
        },
        searchExcelMonth() {
            this.excel_month = this.excelMonthData.getMonth() + 1 > 9 ? this.excelMonthData.getMonth() + 1 : '0' + (this.excelMonthData.getMonth() + 1)
            console.log(this.excel_month)
        },
        search() {
            this.getCashierRankList()
        },
        currentChange(currentPage) {
            this.currentPage = currentPage
            this.getCashierRankList()
        },
        handleEdit(index, e) {
            console.log(e)
            this.$emit('viewData', e)
        },
        handleDelete(index, e) {
            this.$emit('adminStock', e)
        },
        // 转换当前日期
        getNewDate(time) {
            var time = new Date(time)
            var year = time.getFullYear();
            var month = (time.getMonth() + 1 + "").padStart(2, 0);
            var date = (time.getDate() + "").padStart(2, 0);
            var hours = (time.getHours() + "").padStart(2, 0);
            var minutes = (time.getMinutes() + "").padStart(2, 0);
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
        },
        searchYear() {
            this.year = this.yearData.getFullYear()
            // this.getCashierRankList()
        },
        searchMonth() {
            this.month = this.monthData.getMonth() + 1 > 9 ? this.monthData.getMonth() + 1 : '0' + (this.monthData.getMonth() + 1)
            this.getCashierRankList()
        },
        getCashierRankList() {
            const obj = {
                page: this.currentPage,
                pageSize: this.pageSize,
                date: `${this.year}${this.month}`,
                id: this.searchText,
                sort_type: 1
            }
            getCashierRankList(obj).then((item) => {
                this.searchText = ""
                if (this.currentPage == 1) {
                    this.total = item.data.count
                }
                this.tableData = item.data.list
                this.tableData.forEach((item) => {
                    item.city_name = item.address.city + item.address.district
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
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