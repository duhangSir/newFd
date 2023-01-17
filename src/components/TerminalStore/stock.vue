<template>
    <div class="stock kucun saoma_stock"
        style="width: 100%;height: 90%;background-color: #fff;margin: 0 auto;border-radius: 0.1rem;;padding: 0.3rem;position: relative;">
        <div class="flex" style="justify-content: flex-end;">
            <div style="height: 0.4rem;background-color:#eef0f2;border-radius: 0.25rem"
                class="flex juction_content align_items mr_2">
                <input type="text" placeholder="请输入要搜索的商品名称" v-model.trim="searchText"
                    style="border: none;padding-left: 0.2rem;box-sizing: border-box;;font-size: 0.14rem;width: 1.8rem;;height: 100%;background-color:#eef0f2;border-radius: 0.2rem;">
                <button class="bg_fff" @click="search"
                    style="border:none;height: 96%;background-color: #fff;padding:0 0.2rem;border-radius: 0.25rem;margin-right: 0.02rem;cursor: pointer;">搜索</button>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品类别：">
                    <el-select v-model="formInline.region" placeholder="全部" @change="stock_searchList">
                        <el-option label="全部" value="-2"></el-option>
                        <el-option v-for="(item) in stock_arr" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <el-empty style="margin: 1rem;" :image-size="200" v-if="stock_shopList.length == 0"></el-empty>
        <div class="stock_shopAll saoma_stock_shopAll"
            style="padding: 0.1rem 0.1rem 0 1rem;justify-content: start;overflow:auto;">
            <div class="stock_shop" style="margin:0.1rem 0.2rem;padding: 0.2rem 0;box-sizing: content-box;"
                v-for="(item) in stock_shopList" :key="item.spec[0].goods_id">
                <div class="stock_shop_img">
                    <img class="saoma_stock_img" :src="item.image" style="width: 90%;height:70%">
                </div>
                <div class="stock_shop_inner">
                    <div class="saoma_stock_name"
                        style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;">
                        {{ item.goods_name }}</div>
                    <div style="font-size: 0.14rem;color: #8d8d8d;">
                        商品编码:{{ item.spec[0].goods_no }}
                    </div>
                    <div class="saoma_stock_Egou" style="margin: 0.1rem 0;font-size: 0.14rem;"
                        v-if="item.is_cashier_goods == '1'"><span
                            style="color: #8d8d8d;font-size: 0.12rem">E购月卡</span>{{
                                item.cashier_goods_price
                            }}
                    </div>
                    <div class="saoma_stock_Egou" style="margin: 0.1rem 0;font-size: 0.14rem;" v-else><span
                            style="color: #8d8d8d;font-size: 0.12rem"></span>￥{{
                                item.spec[0].goods_price
                            }}+{{ item.score }}积分
                    </div>
                    <div>
                        <el-input-number v-model="item.stock_num" @change="stock_handleChange(item)" :min="0"
                            :max="1000000000000000" label="描述文字"></el-input-number>
                    </div>
                </div>
            </div>
        </div>
        <div class="stock_page">
            <el-pagination @current-change="stock_handleCurrentChange" :page-size="stock_pagesize" background
                layout="prev,pager, next, total, jumper" :total="stock_total">
            </el-pagination>
            <div class="stock_GO" @click="stock_handleCurrentChange(stock_pagesize)">GO</div>
        </div>
    </div>
</template>
<script>

import {
    getMyGoodsList,
    getShowlist,
    setMyGoodsStockNum
} from "@/api/login";
export default {
    data() {
        return {
            stock_total: 0,
            stock_pagesize: 16,
            stock_shopList: [],
            stock_currentPage: 1,
            stock_arr: [],
            searchText: "",
            formInline: {
                user: '',
                region: '-2'
            }
        }
    },
    props: {
        user_id: Number
    },
    created() {
        this.getShowlist()
    },
    methods: {
        stock_handleCurrentChange(pagesize) {
            this.GetMyGoodsList({ page: pagesize, id: this.formInline.region, pageSize: this.stock_pagesize, cashier_user_id: this.user_id })
        },
        stock_handleChange(e) {
            const obj = {
                goods_id: e.spec[0].goods_id,
                stock_num: e.stock_num,
                cashier_user_id: this.user_id
            }
            setMyGoodsStockNum(obj).then((item) => {
                this.$toast(item.msg)
            })
        },
        getShowlist() {
            if (this.stock_arr.length === 0) {
                getShowlist({ is_terminal: 0 }).then((res) => {
                    res.data.categorydata.forEach((item) => {
                        this.stock_arr.push({ name: item.name, id: item.id })
                    })
                    this.urlBASE = process.env.VUE_APP_BASE_API
                })
            }
            this.GetMyGoodsList({ page: this.stock_currentPage, id: this.formInline.region, pageSize: this.stock_pagesize, cashier_user_id: this.user_id })
        },
        GetMyGoodsList(obj) {
            console.log(obj)
            getMyGoodsList(obj).then((res) => {
                console.log(res.data.pagedata)
                const { total, data } = res.data.pagedata
                this.stock_total = total
                this.stock_shopList = data
            })
        },
        search() {
            this.formInline.region = '-1'
            this.GetMyGoodsList({ page: this.stock_currentPage, id: this.formInline.region, pageSize: this.stock_pagesize, cashier_user_id: this.user_id, name: this.searchText })
            this.searchText = ""
            this.formInline.region = '-2'
        },
        stock_searchList() {
            this.formInline.user = ""
            this.GetMyGoodsList({ page: this.stock_currentPage, id: this.formInline.region, pageSize: this.stock_pagesize, cashier_user_id: this.user_id })
        },
    }
}
</script>
<style lang="less" scoped>
@media (max-height:800px) {
    .saoma_stock {
        height: 90% !important;
    }
    .saoma_stock_shopAll{
        padding: 0!important;
    }
}

.stock {
    :deep(.el-input__inner) {
        background-color: #eef0f2;
    }

    .stock_page {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.2rem;

        :deep(.el-pager li.active) {
            background-color: #409eff;
        }

        .stock_GO {
            background-color: #409eff;
            padding: 0.04rem;
            border-radius: 0.04rem;
            color: #fff;
        }

        .stock_GO:hover {
            cursor: pointer;
        }
    }

    // .stock_shopAll::-webkit-scrollbar {
    // 	display: none
    // }

    .stock_shopAll {
        display: flex;
        // justify-content:start;
        justify-content: space-between;
        overflow: scroll;
        // align-items: flex-start;
        flex-wrap: wrap;
        height: 80%;

        .stock_shop {
            width: 21%;
            background-color: #f7f9fa;
            border: 1px solid #e1e2e2;
            border-radius: 0.1rem;
            height: 30%;
            position: relative;
            padding: 0.1rem;
            box-sizing: border-box;
            display: flex;

            .stock_shop_img {
                width: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .stock_shop_inner {
                width: 60%;

                .el-input-number {
                    width: 1.6rem;
                    background-color: #ffe3e3;
                }
            }
        }

        .stock_shop_delete {
            position: absolute;
            width: 0.15rem;
            height: 0.15rem;
            z-index: 9;
            position: absolute;
            right: -0.065rem;
            top: -0.065rem;
            border-radius: 50%;
            color: #fff;
            font-size: 0.14rem;
            font-weight: bold;
            display: flex;
            justify-content: center;
            line-height: 0.14rem;
            background-color: #f44444;
            cursor: pointer;
        }

        .stock_shop::after {
            content: "x";
            position: absolute;
            width: 0.15rem;
            height: 0.15rem;
            position: absolute;
            right: -0.065rem;
            top: -0.065rem;
            border-radius: 50%;
            color: #fff;
            font-size: 0.14rem;
            font-weight: bold;
            display: flex;
            justify-content: center;
            line-height: 0.14rem;
            background-color: #f44444;
        }
    }
}
</style>