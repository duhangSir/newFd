<template>
  <div style="background-color: #dbdddf;width: 100%;height: 100%;">
    <div class="header">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="second"><span slot="label"><i class="el-icon-takeaway-box"></i>终端店管理</span>
          <viewData @openCityTwo="openCityTwo" :openCity="openCity"></viewData>
        </el-tab-pane>
        <el-tab-pane name="third"><span slot="label"><i class="el-icon-share"></i>总数据管理</span>
          <DataManagement></DataManagement>
        </el-tab-pane>
        <el-tab-pane name="logout"><span slot="label" @click="logout"><i class="el-icon-user"></i>{{
          userId
        }}(退出登录)</span>
        </el-tab-pane>
      </el-tabs>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import DataManagement from '../components/Management/DataManagement.vue'
import viewData from '../components/TerminalStore/viewData.vue'

export default {
  name: "HomeView",
  components: {
    DataManagement,
    viewData
  },
  data() {
    return {
      activeName: 'second',
      openCity: false
    }
  },
  methods: {
    openCityTwo() {
      console.log(1)
      this.openCity = true
    },
    async handleClick(tab) {
      if (tab.name == 'logout') {
        this.$store.commit('LOGOUT')
        this.$router.push('/login')
      } else if (tab.name == 'second') {
        this.openCity = false
      }
    },
    logout() {
    }
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  background-color: #fff;

  .fdLogo {
    width: 1rem;
    height: 0.2rem;
    margin: 0 0.1rem;
  }
}

.el-icon-takeaway-box,
.el-icon-share,
.el-icon-user {
  vertical-align: middle;
  margin-right: 0.05rem;
  font-size: 0.24rem;
}

.header {

  /deep/ .el-tabs__nav-scroll {
    display: flex;
    justify-content: flex-end;
    padding-right: 3rem;
  }

  /deep/ .el-tabs__active-bar {
    height: 0;
  }

  /deep/ .el-tabs__item {
    font-size: 0.16rem;
  }

  /deep/ .el-tabs__item.is-active {
    color: #003bcf;
    border-radius: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }

  /deep/ #tab-logout.el-tabs__item.is-active {
    color: #003bcf;
    background-color: #fff;
  }

  /deep/ .el-tabs__nav-wrap::after {
    height: 0;
  }
}
</style>
