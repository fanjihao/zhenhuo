<template>
  <el-container class="home">
    <el-header class=".header">
      <div class="top-item top-left">危险化学品事故救援实训管理平台</div>
      <div class="top-item top-right">
        <div
          class="right-item right-hover"
          @click="goPage('/integratedScreen')"
        >
          综合大屏
        </div>
        <div
          class="right-item right-hover"
          :class="
            $store.state.path === '/courseware' ||
            $store.state.path === '/trainfiles' ||
            $store.state.path === '/firescript' ||
            $store.state.path === '/visualization'
              ? 'right-item right-hover checked'
              : 'right-item right-hover'
          "
        >
          <div
            @click="
              () => {
                rDrop = !rDrop;
                iDrop = false;
              }
            "
          >
            <span v-if="$store.state.path === '/courseware'">实训课件</span>
            <span v-else-if="$store.state.path === '/trainfiles'"
              >实训档案</span
            >
            <span v-else-if="$store.state.path === '/firescript'"
              >真火脚本</span
            >
            <span v-else>真火实训</span>
            <i class="el-icon-arrow-down" />
          </div>
          <transition name="el-zoom-in-top">
            <div class="real-drop" v-if="rDrop">
              <div @click="goPage('/courseware')">实训课件</div>
              <div @click="goPage('/trainfiles')">实训档案</div>
              <div @click="goPage('/visualization')">实训可视化</div>
              <div @click="goPage('/firescript')">真火脚本</div>
            </div>
          </transition>
        </div>
        <div
          class="right-item right-hover"
          :class="
            $store.state.path === '/emergencyTeam' ||
            $store.state.path === '/emergencyExperts' ||
            $store.state.path === '/baseMaterials' ||
            $store.state.path === '/baseEquip'
              ? 'right-item right-hover checked'
              : 'right-item right-hover'
          "
        >
          <div
            @click="
              () => {
                iDrop = !iDrop;
                rDrop = false;
              }
            "
          >
            <!-- {{ infomanage }} -->
            <span v-if="$store.state.path === '/emergencyTeam'">应急队伍</span>
            <span v-else-if="$store.state.path === '/emergencyExperts'"
              >应急专家</span
            >
            <span v-else-if="$store.state.path === '/baseMaterials'"
              >基地物资</span
            >
            <span v-else-if="$store.state.path === '/baseEquip'">基地装备</span>
            <span v-else>信息管理</span>
            <i class="el-icon-arrow-down" />
          </div>
          <transition name="el-zoom-in-top">
            <div class="real-drop" v-if="iDrop">
              <div @click="goPage('/emergencyTeam')">应急队伍</div>
              <div @click="goPage('/emergencyExperts')">应急专家</div>
              <div @click="goPage('/baseMaterials')">基地物资</div>
              <div @click="goPage('/baseEquip')">基地装备</div>
            </div>
          </transition>
        </div>
        <div
          @click="goPage('/videoDeploy')"
          class="right-item right-hover"
          :class="
            $store.state.path === '/videoDeploy'
              ? 'right-item right-hover checked'
              : 'right-item right-hover'
          "
        >
          视频配置
        </div>
        <div class="right-item" style="width: 250px">
          <i class="el-icon-time" />
          {{ nowTime }}
        </div>
        <div class="right-item" style="display: flex; align-items: center">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-user" />
              {{ user.name }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-lock" @click.native="changePwd">
                修改密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <img
            src="@/assets/image/u313.png"
            alt=""
            class="time"
            @click="logout"
            style="
              cursor: pointer;
              width: 25px;
              height: 25px;
              margin-left: 10px;
            "
          />
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="passwordVisible"
        width="40%"
        :show-close="false"
        custom-class="assessDialog"
      >
        <div class="own-header">
          <span>修改密码</span>
          <i class="el-icon-close" @click="passwordVisible = false"></i>
        </div>
        <div class="own-body">
          <div class="search-time">
            <span class="time-title"><span>*</span>旧密码</span>
            <div style="border: 1px solid #eee;flex:1;border-radius:3px;">
              <el-input
                placeholder="请输入旧密码"
                v-model="oldpwd"
                clearable
                class="input-class"
              ></el-input>
            </div>
          </div>
          <div class="search-time">
            <span class="time-title"><span>*</span>新密码</span>
            <div style="border: 1px solid #eee;flex:1;border-radius:3px;">
              <el-input
                placeholder="请输入新密码"
                v-model="newpwd"
                clearable
                class="input-class"
              ></el-input>
            </div>
          </div>
          <div class="search-time">
            <span class="time-title"><span>*</span>确认新密码</span>
            <div style="border: 1px solid #eee;flex:1;border-radius:3px;">
              <el-input
                placeholder="请再次确认新密码"
                v-model="newpwdAgain"
                clearable
                class="input-class"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="foot">
          <div class="cancel" @click="passwordVisible = false">取消</div>
          <div class="sure" @click="submit">提交</div>
        </div>
      </el-dialog>
    </el-header>
    <el-main class="content">
      <!-- <keep-Alive> -->
      <router-view></router-view>
      <!-- </keep-Alive> -->
    </el-main>
  </el-container>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  header {
    background-color: rgba(84, 114, 234, 1);
    display: flex;
    justify-content: space-between;
    height: 56px;
    .top-left {
      color: white;
      font-size: 28px;
      font-weight: 700;
      height: 56px;
      line-height: 56px;
    }
    .top-right {
      display: flex;
      align-items: center;
      .right-item {
        color: white;
        padding: 0 20px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        .real-drop {
          height: 150px;
          width: 135px;
          background-color: white;
          border-radius: 3px;
          position: absolute;
          top: 60px;
          left: 0;
          color: #646c9a;
          box-shadow: 0px 0px 20px rgba(221, 225, 247, 0.8);
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          z-index: 99;
        }
        .real-drop > div:hover {
          color: rgba(84, 114, 234, 1);
        }
      }
      .right-hover:hover {
        border-radius: 3px;
        background-color: white;
        color: rgba(84, 114, 234, 1);
        cursor: pointer;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .el-main {
    padding: 0;
  }
  .el-dropdown-link {
    color: white;
    cursor: pointer;
  }
  .content {
    display: flex;
    flex-direction: column;
    background-color: rgba(242, 243, 248, 1);
    flex: 1;
    overflow-x: hidden;
    padding: 0 20px;
  }
  .checked {
    background: white;
    color: #5472ea !important;
    border-radius: 3px;
  }
  .assessDialog {
    border-radius: 5px;
    overflow: hidden;
    .own-header {
      width: 100%;
      height: 40px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      background: rgb(84, 114, 234);
      i {
        font-size: 20px;
      }
      i:hover {
        cursor: pointer;
      }
    }
    .own-body {
      width: 100%;
      padding: 15px;
      font-size: 14px;
      .search-time {
        width: 100%;
        margin: 0;
        display: flex;
        margin-bottom: 10px;
        .time-title {
          display: inline-block;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          border-right: 1px solid rgb(235, 237, 242);
        }
        .time-title > span {
          color: red;
        }
      }
      .assess-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
      }
      textarea {
        height: 200px;
      }
    }
    .foot {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 15px;
      border-top: 1px solid #eee;
      div {
        width: 70px;
        height: 30px;
        line-height: 30px;
        border: 1px solid rgb(84, 114, 234);
        text-align: center;
        border-radius: 5px;
        font-size: 13px;
      }
      .cancel {
        color: rgb(84, 114, 234);
        background: white;
      }
      .sure {
        background: rgb(84, 114, 234);
        color: white;
        margin-left: 15px;
      }
      .sure:hover {
        cursor: pointer;
      }
      .cancel:hover {
        background: rgb(84, 114, 234);
        color: white;
        cursor: pointer;
      }
    }
  }
}

/deep/ .el-dialog__header {
  display: none;
}
/deep/ .el-dialog__body {
  padding: 0;
}

/deep/ .el-input__prefix {
  display: none;
}
/deep/ .el-input__inner {
  border: none;
  height: 30px;
}
/deep/ .el-input__icon {
  line-height: 30px;
}
</style>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      nowTime: "",
      rDrop: false,
      iDrop: false,
      trainsName: "真火实训",
      infomanage: "信息管理",
      user: "",

      passwordVisible: false,
      oldpwd: "",
      newpwd: "",
      newpwdAgain: "",
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("fire-user"));
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  methods: {
    ...mapMutations({ setPath: "setPath" }),
    //页面跳转
    goPage(src) {
      this.setPath(src);
      if (src === "/visualization") {
        let formdata = new FormData();
        formdata.append("actualEndTime", "");
        formdata.append("limit", "");
        formdata.append("name", "");
        formdata.append("offset", 1);
        formdata.append("status", 1);
        formdata.append("teamName", "");
        this.axios({
          url: "/dah-training-api/trainingRecord/selectTrainingRecord",
          method: "POST",
          data: formdata,
        })
          .then((res) => {
            let item = res.data.data.list[0];
            sessionStorage.setItem("visibid", item.id);
            this.$router.push(src);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (this.$store.state.path === "/courseware") {
          this.trainsName = "实训课件";
          this.infomanage = "信息管理";
        } else if (this.$store.state.path === "/trainfiles") {
          this.trainsName = "实训档案";
          this.infomanage = "信息管理";
        } else if (this.$store.state.path === "/firescript") {
          this.trainsName = "真火脚本";
          this.infomanage = "信息管理";
        } else if (this.$store.state.path === "/emergencyTeam") {
          this.infomanage = "应急队伍";
          this.trainsName = "真火实训";
        } else if (this.$store.state.path === "/emergencyExperts") {
          this.infomanage = "应急专家";
          this.trainsName = "真火实训";
        } else if (this.$store.state.path === "/baseMaterials") {
          this.infomanage = "基地物资";
          this.trainsName = "真火实训";
        } else if (this.$store.state.path === "/baseEquip") {
          this.infomanage = "基地装备";
          this.trainsName = "真火实训";
        }
        this.$router.push(src);
      }
      this.rDrop = false;
      this.iDrop = false;
    },
    // 退出登录
    logout() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/login");
          // sessionStorage.removeItem("token");
          // sessionStorage.removeItem("user");
          localStorage.removeItem("fire-token");
          localStorage.removeItem("fire-user");
          this.$message({
            type: "success",
            message: "退出系统成功!",
            duration: 1000,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出系统",
            duration: 1000,
          });
        });
    },
    // 修改密码
    changePwd() {
      console.log("sssssssssssss");
      this.passwordVisible = true;
    },
    submit() {
      if (this.oldpwd === "" || this.newpwd === "" || this.newpwdAgain === "") {
        return this.$message.warning("*为必填项");
      }
      this.axios({
        url:"",
        method:"",
        data: {

        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 获取当前时间
    getTime() {
      const date = new Date();
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let MT =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let S =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.nowTime = Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + S;
    },
  },
};
</script>
