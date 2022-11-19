import request from '../utils/request'
const Login = (params) => {
    console.log(params)
    return request({ url: "api/user/login", method: 'POST', params })
}
export default {
    Login
}