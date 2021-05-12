
<template>
  <div class="login">
    <div class="login-banner">
      <div class="login-wave">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
      </div>
    </div>
    <div class="login-box">
      <div class="login-box-content">
        <div class="login-box-title">
          <img src="@/assets/login/login_title.png" alt="" />
        </div>
        <div class="login-box-form">
          <div class="login-box-form-title">用户登录</div>
          <div class="login-box-form-item">
            <div class="login-box-form-item-title">用户名</div>
            <div
              class="login-box-form-item-input"
              :id="isfocus === 'account' ? 'border' : ''"
            >
              <i class="el-icon-user"></i>
              <input
                type="text"
                name=""
                id=""
                placeholder="请输入用户名"
                v-model="userName"
                @focus="isfocus = 'account'"
                @blur="isfocus = ''"
              />
            </div>
          </div>
          <div class="login-box-form-item">
            <div class="login-box-form-item-title">密码</div>
            <div
              class="login-box-form-item-input"
              :id="isfocus === 'password' ? 'border' : ''"
            >
              <i class="el-icon-lock"></i>
              <input
                type="password"
                name=""
                id=""
                placeholder="请输入密码"
                v-model="userPass"
                @focus="isfocus = 'password'"
                @blur="isfocus = ''"
              />
            </div>
          </div>
          <div class="login-box-form-item-submit" @click="submit" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="登录加载中">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import QS from "qs";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Login",
  components: {},
  data() {
    //这里存放数据
    return {
      userName: "",
      userPass: "",
      isfocus: "",
      fullscreenLoading:false
    };
  },
  // 监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submit() {
      this.fullscreenLoading = true;
      if (this.userName === "" || this.userPass === "") {
        this.$message({
          message: "请输入用户名或密码！！！",
          type: "warning",
        });
      } else {
        this.axios({
          method: "POST",
          url: "/dah-training-api/login/aso/password",
          data: QS.stringify({
            username: this.userName,
            password: this.userPass,
          }),
        })
          .then((res) => {
            localStorage.setItem("fire-token", res.data.access_token);
            this.axios({
              method: "GET",
              url: "/dah-training-api/authenticated/web-context",
              params: {
                applicationCode: "government",
              },
            })
              .then((response) => {
                console.log(response)
                localStorage.setItem("fire-user", JSON.stringify(response.data.data.user));
                this.$router.push({
                  path: "/integratedScreen",
                });
                this.$message({
                  message: "登陆成功",
                  type: "success",
                  duration: 1000,
                });
                this.fullscreenLoading = false;
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            this.$message({
              message: err.message,
              type: "error",
              duration: 1000,
            });
          });
      }
    },
    enterKey(event) {
      // console.log(event);
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode;
      if (code == 13) {
        this.submit();
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
  },
  //生命周期-创建完成（可以访问当前this实例）
  created() {},
  //生命周期-挂载完成（可以访问DOM元素）
  mounted() {
    this.enterKeyup();
  },
  beforeCreate() {}, //生命周期-创建之前
  beforeMount() {}, //生命周期-挂载之前
  beforeUpdate() {}, //生命周期-更新之前
  updated() {}, //生命周期-更新之后
  beforeDestroy() {}, //生命周期-销毁之前
  destroyed() {
    this.enterKeyupDestroyed();
  }, //生命周期-销毁完成
  activated() {}, //如果页面有keep-alive缓存功能这个函数会触发
};
</script>
<style lang="less">
@keyframes water-right {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(25%) translateZ(0) scaleY(0.85);
  }
  100% {
    transform: translateX(50%) translateZ(0) scaleY(1);
  }
}
@keyframes water-left {
  from {
    transform: translate(0%, 0px);
  }
  to {
    transform: translate(-50%, 0px);
  }
}
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .login-banner {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(60deg, #af8aff 0%, #4756da 100%);
    .login-wave {
      width: 100%;
      height: 30%;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background-color: rgba(247, 248, 250, 1);
      // margin-top: -50px;
      .wave {
        position: absolute;
        width: 200%;
        height: 100px;
        bottom: 0;
        background-size: 50% 100%;
      }
      .wave1 {
        background-image: url("../assets/login/wave-bot.png");
        top: -100px;
        left: -100%;
        opacity: 0.2;
        animation: water-right 20s infinite linear;
      }
      .wave2 {
        background-image: url("../assets/login/wave-mid.png");
        top: -100px;
        left: 0;
        opacity: 0.3;
        animation: water-left 30s infinite linear;
      }
      .wave3 {
        background-image: url("../assets/login/wave-top.png");
        top: -80px;
        left: -100%;
        animation: water-right 40s infinite linear;
      }
    }
  }
  .login-box {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .login-box-content {
      width: 100%;
      .login-box-title {
        width: 100%;
        height: 80px;
        text-align: center;
        img {
          height: 100%;
        }
      }
      .login-box-form {
        padding: 30px 40px;
        background-color: white;
        border-radius: 8px;
        width: 26%;
        margin: 0 auto;
        box-shadow: 0px 0px 20px rgba(84, 128, 254, 0.2);
        margin-top: 30px;
        .login-box-form-title {
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: 1px;
          margin-bottom: 30px;
        }
        .login-box-form-item {
          .login-box-form-item-title {
            font-size: 12px;
            height: 30px;
            line-height: 30px;
          }
          .login-box-form-item-input {
            display: flex;
            height: 40px;
            align-items: center;
            border: 1px solid #dfdfdf;
            border-radius: 4px;
            padding-left: 10px;
            margin-bottom: 20px;
            i {
              font-size: 18px;
              margin-right: 10px;
              color: #7a7777;
              font-weight: 600;
            }
            input {
              border: none;
              outline: none;
              height: 90%;
              font-size: 12px;
              width: 70%;
            }
          }
          #border {
            border: 1px solid #4756da;
          }
        }
      }
      .login-box-form-item-submit {
        height: 40px;
        width: 100%;
        line-height: 40px;
        text-align: center;
        color: white;
        font-size: 12px;
        border-radius: 4px;
        background-image: linear-gradient(60deg, #4e87fe 0%, #7260fd 100%);
        box-shadow: rgba(84, 128, 254, 0.5) 0px 0px 8px;
        margin-bottom: 30px;
        cursor: pointer;
      }
      .login-box-form-item-submit:hover {
        background-image: linear-gradient(60deg, #7260fd 0%, #4e87fe 100%);
      }
    }
  }
}
</style>