<template>
    <el-container>
        <el-aside width="500px">
            <div class="logonContain">
                <img src="../../img/fdLogo.png" class="fdLogo">
                <div class="flex flex_column juction_content align_items loginWecl">
                    <span style="font-size:0.24rem">Welcome To Login</span>
                    <span style="font-size:0.24rem">欢迎登录</span>
                </div>
                <div class="flex juction_content" style="margin-top:40px">
                    <img src="../../img/loginImg.png" class="LoginImgA">
                </div>
                <div class="FormLogin">
                    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item prop="account">
                            <div class="Formusername">
                            </div>
                            <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <div class="Formpassword">
                            </div>
                            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-aside>
        <el-main>
            <div class="loginbgWhite">
                <h1>SYSTEM</h1>
                <p>Background management system</p>
                <span>终端店管理系统</span>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { Login } from '@/api/login'
export default {
    data() {
        return {
            ruleForm: {
                account: '',
                password: '',
            },
        }
    },
    methods: {
        submitForm() {
            Login(this.ruleForm).then(async (item) => {
                await this.$store.commit("SET_USERINFO", item.data.userinfo)
                this.$router.push('/')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.LoginImgA {
    width: 1rem;
    height: 1rem;
}

.loginWecl {
    font-size: 0.4rem;
    color: #000;
    font-weight: bold;
    margin-top: 0.5rem;
    line-height: 0.5rem;
}

.FormLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .el-form {
        position: absolute;
        width: 80%;
        left: 0;
        top: 0;

        .FormEl {
            position: absolute;
            z-index: 2;
        }

        .Formusername::before {
            content: '帐   号';
            position: absolute;
            left: 0.2rem;
            width: 0.5rem;
            background-color: #fff;
            font-size: 0.12rem;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -0.1rem;
            height: 0.2rem;
            z-index: 2;
            color: #1854ea;
        }

        .Formpassword::before {
            content: '密   码';
            position: absolute;
            left: 0.2rem;
            width: 0.5rem;
            background-color: #fff;
            font-size: 0.12rem;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -0.1rem;
            height: 0.2rem;
            color: #1854ea;
            z-index: 2;
        }

        /deep/ .el-input__inner {
            // padding-top: 0.1rem;
        }

        .el-button {
            margin-top: 0.5rem;
            background-color: #1854ea;
            width: 100%;
            height: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /deep/ .el-input__inner:hover {
            box-shadow: 0rem 0rem 0.04rem blue;
        }

    }
}

.logonContain {
    padding: 0 0.2rem;

    .fdLogo {
        margin-top: 0.6rem;
        margin-left: 0.5rem;
        width: 2rem;
        height: 0.4rem;
    }
}

.el-aside {
    background-color: #fff;
    height: 100vh;
    box-shadow: 0.02rem 0rem 0.1rem rgba(24, 84, 234, 1);
    z-index: 999;
    color: #333;
    font-size: 0.14rem;
}

.el-main {
    background-image: url('../../img/bgLogin.png');
    background-size: 100% 100%;
    color: #333;
    padding: 0;
    height: 100vh;
    position: relative;
}

.loginbgWhite {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    color: #909bcb;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 0.5rem;
    }

    p {
        font-size: 0.2rem;
        line-height: 0.3rem;
    }

    span {
        font-size: 0.24rem;
    }
}
</style>
