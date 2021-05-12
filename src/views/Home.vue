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
        <div class="right-item right-hover">
          <div
            @click="
              () => {
                rDrop = !rDrop;
                iDrop = false;
              }
            "
          >
            {{trainsName}}
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
        <div class="right-item right-hover">
          <div
            @click="
              () => {
                iDrop = !iDrop;
                rDrop = false;
              }
            "
          >
            {{infomanage}}
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
        <div @click="goPage('/videoDeploy')" class="right-item right-hover">
          视频配置
        </div>
        <div class="right-item" style="width: 250px">
          <i class="el-icon-time" />
          {{ nowTime }}
        </div>
        <div class="right-item" style="display: flex; align-items: center">
          <i class="el-icon-user" />
          {{user.name}}
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
  .content {
    display: flex;
    flex-direction: column;
    background-color: rgba(242, 243, 248, 1);
    flex: 1;
    overflow-x: hidden;
    padding: 0 20px;
  }
}
</style>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      nowTime: "",
      rDrop: false,
      iDrop: false,
      trainsName: "真火实训",
      infomanage:"信息管理",
      user: ""
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("fire-user"));
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  methods: {
    //页面跳转
    goPage(src) {
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
        if(src === "/courseware") {
          this.trainsName = "实训课件";
          this.infomanage = "信息管理";
        } else if(src === "/trainfiles") {
          this.trainsName = "实训档案";
          this.infomanage = "信息管理";
        } else if(src === "/firescript") {
          this.trainsName = "真火脚本";
          this.infomanage = "信息管理";
        } else if(src === "/emergencyTeam") {
          this.infomanage = "应急队伍";
          this.trainsName = "真火实训";
        } else if(src === "/emergencyExperts") {
          this.infomanage = "应急专家";
          this.trainsName = "真火实训";
        } else if(src === "/baseMaterials") {
          this.infomanage = "基地物资";
          this.trainsName = "真火实训";
        } else if(src === "/baseEquip") {
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
