import request from '../utils/request'
export const Login = (params) => {
    return request({ url: "api/user/login", method: 'POST', params })
}
// 城市排名
export const getRegionRankList = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getRegionRankList", method: 'GET', data })
}

// 门店排名
export const getCashierRankList = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getCashierRankList", method: 'GET', data })
}

// 年报表数据
export const allgetYearReportForm = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getYearReportForm", method: 'GET', data })
}

// 数据管理 今日/本月统计
export const getThisMonthData = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getThisMonthData", method: 'GET', data })
}
// 数据管理 每日数据统计
export const getEverydayTotal = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getEverydayTotal", method: 'GET', data })
}
// 年报表数据
export const allgetEverydayList = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getEverydayList", method: 'GET', data })
}

// 出入库数据统计
export const allgetGoodsInOutStatistics = (data) => {
    return request({ url: "addons/litestore/api.Cashieralltotal/getGoodsInOutStatistics", method: 'GET', data })
}






// 数据管理 用户月消费排行榜
export const getAppointMonthUserConsumeRank = (data) => {
    return request({ url: "addons/litestore/api.Cashiertotal/getAppointMonthUserConsumeRank", method: 'GET', data })
}
//数据管理 出入库统计列表
export const getGoodsInOutStatistics = (data) => {
    return request({ url: "addons/litestore/api.Cashiertotal/getGoodsInOutStatistics", method: 'GET', data })
}
// 数据管理 每日数据列表
export const getEverydayList = (data) => {
    return request({ url: "addons/litestore/api.Cashiertotal/getEverydayList", method: 'GET', data })
}
export const getYearReportForm = (data) => {
    return request({ url: "addons/litestore/api.Cashiertotal/getYearReportForm", method: 'GET', data })
}
// 取消订单
export const cancelCashierOrder = (data) => {
    return request({ url: "addons/litestore/api.Cashiertotal/cancelCashierOrder", method: 'GET', data })
}
export const setMyGoodsStockNum = (params) => {
    return request({ url: "addons/litestore/api.Cashiercart/setMyGoodsStockNum", method: 'POST', params })
}
export const getShowlist = (data) => {
    return request({ url: "addons/litestore/api.category/Showlist", method: 'GET', data })
}
export const getMyGoodsList = (params) => {
    return request({ url: "addons/litestore/api.Cashiercart/getMyGoodsList", method: 'POST', params })

}
// export default {
//     Login,
//     getThisMonthData,
//     cancelCashierOrder,
//     getYearReportForm,
//     getEverydayList,
//     getGoodsInOutStatistics,
//     getEverydayTotal,
//     getAppointMonthUserConsumeRank
// }