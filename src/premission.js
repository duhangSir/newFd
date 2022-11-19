import store from '@/store'
import router from '@/router'
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    const token = store.getters.token
    if (token) {
        if (to.path === '/login') {
            next(from.path)
        } else {
            const userInfo = store.getters.userInfo
            if (userInfo) {
                next()
            } else {
                next('/login')
                // const res = await store.dispatch('user/setUserInfo')
                // if (res) {
                //     const menus = filterMenus(store.getters.userInfo.menus)
                //     console.log(menus)
                //     menus.forEach((item) => {
                //         router.addRoute('layout', item)
                //     })
                //     return next(to.path)
                // } else {
                //     next('/login')
                // }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})
