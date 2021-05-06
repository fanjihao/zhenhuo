<template>
  <div class="visualiza">
    <div class="inte-header">
      <img src="@/assets/image/u1.png" alt="" class="banner" />
      <img
        src="@/assets/image/u241.png"
        alt=""
        class="left"
        @click="showMenu"
      />
      <img src="@/assets/image/u332.png" alt="" class="left-center" />
      <div class="inte-header-left">
        <div class="menu" @click="openSecond">
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom"></i>
          <div class="sec-menu" v-if="secondMenu">
            <div
              class="sec-menu-item"
              v-for="item in secMenu"
              :key="item.id"
              @click="changeVisById(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <img src="@/assets/image/u310.png" alt="" />
        <div class="title-title">危险化学品事故救援实训管理平台</div>
        <img src="@/assets/image/u309.png" alt="" />
      </div>
      <div class="inte-header-right">
        <div class="time-part">
          <img src="@/assets/image/u307.png" alt="" class="time" />
          <span>{{ nowTime }}</span>
        </div>
        <div class="user-part person">
          <img src="@/assets/image/u290.svg" alt="" class="img1" />
          <img src="@/assets/image/u291.svg" alt="" class="img2" />
        </div>
        <span>Admin</span>
        <img
          src="@/assets/image/u313.png"
          alt=""
          @click="loginout"
          class="time"
        />
      </div>
    </div>
    <div class="vis-body">
      <div class="body-left">
        <div class="otherSystem">
          <div class="pos-r">
            <img src="@/assets/image/u1934.png" class="boderimg" alt="" />
            <!-- 3d区域 类 为红边 -->
            <div
              class="pos-a"
              style="top: 5%; left: 2%; color: #fff; width: 96%; height: 90%"
            >
              <img
                style="width: 100%; height: 100%"
                src="./../assets/image/u3739.png"
                alt=""
              />
            </div>
          </div>
          <div class="fullscreen" @click="allSreen">
            全屏显示
            <img src="@/assets/image/u2018.png" alt="" />
          </div>
        </div>
        <div class="left-foot">
          <div class="left">
            <div class="foot-top">
              <p>{{ data.name }}</p>
              <span class="mark">{{ courseware.burningSceneName }}</span>
            </div>
            <div class="foot-info">
              <div>
                <span class="title-span">参训队伍：</span>
                <span class="cantclick">{{ data.teamName }}</span>
              </div>
              <div>
                <span class="title-span">实训课件：</span>
                <span class="cantclick canclick" @click="showCoursePop">{{
                  data.coursewareName
                }}</span>
              </div>
              <div>
                <span class="title-span">实训地点：</span>
                <span class="cantclick">{{ data.location }}</span>
              </div>
              <div>
                <span class="title-span">参训人数：</span>
                <span @click="showPersonNumPop" class="cantclick canclick"
                  >{{ staffs.length }}人</span
                >
              </div>
              <div>
                <span class="title-span">预计时长：</span>
                <span class="cantclick"
                  >{{ courseware.estimatedDuration }}分钟</span
                >
              </div>
              <div>
                <span class="title-span">开始时间：</span>
                <span class="cantclick">{{ data.actualStartTime }}</span>
              </div>
            </div>
          </div>
          >
          <div class="right" @click="showEndPop" style="cursor: pointer">
            <img src="@/assets/image/u748.svg" alt="" />
            <div>结束实训</div>
          </div>
        </div>
      </div>
      <div class="body-right">
        <div class="boderimg timebox">
          <img src="@/assets/image/u311.png" class="boderimg" alt="" />
          <div class="posidiv">
            <p style="font-family: 'font-number'" class="">实际用时</p>
            <div class="timeimg flex flex-ac flex-jc" style="font-size: 80px">
              {{ showHMS }}
            </div>
          </div>
        </div>
        <div class="monitor-box">
          <img
            src="@/assets/image/u645.svg"
            style="width: 100%; height: 100%"
            alt=""
          />
          <div class="mon-content">
            <div class="content-top">
              <div class="left-title">
                <span>视频监控</span>
                <div class="rectBox">
                  <div class="rectangle"></div>
                  <div class="rectangle" style="opacity: 0.75"></div>
                  <div class="rectangle" style="opacity: 0.5"></div>
                  <div class="rectangle" style="opacity: 0.25"></div>
                </div>
              </div>
              <div class="page-box">
                <div
                  :class="videoPage === 1 ? 'now-page' : 'page'"
                  @click="moninerPage(1)"
                ></div>
                <div
                  :class="videoPage === 2 ? 'now-page' : 'page'"
                  @click="moninerPage(2)"
                ></div>
                <div
                  :class="videoPage === 3 ? 'now-page' : 'page'"
                  @click="moninerPage(3)"
                ></div>
              </div>
            </div>
            <div
              v-for="(item, index) in videoList"
              :key="item.id"
              class="video-part"
            >
              <div class="minVideo">
                <img
                  src="@/assets/image/u662.png"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </div>
              <div class="video-title">
                <span>{{ item.monitoringPlaceName }}</span>
                <img
                  @click="showVideoPop(index)"
                  src="@/assets/image/u663.png"
                  style="width: 20px; height: 20px"
                  class=""
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 实训课件弹框 -->
    <div
      v-show="coursePop"
      class="pos-f flex flex-ac flex-jc"
      style="
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      "
    >
      <div class="pos-r">
        <img src="./../assets/centerBg.png" alt="" />
        <div class="pos-a w100 h100 t-0 l-0 flex flex-ac flex-jc">
          <div style="width: 96%; height: 90%" class="pos-r">
            <div class="flex flex-ac">
              <span class="cor-f font-16" style="margin-right: 5px"
                >课件信息</span
              >
              <img src="./../assets/dian.png" alt="" />
            </div>
            <div
              style="
                border-bottom: 1px dashed rgba(0, 244, 255, 0.2);
                padding-bottom: 20px;
              "
            >
              <div class="flex" style="margin-top: 10px">
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">课件名称：</span
                  ><span class="cor-f font-12">{{ data.coursewareName }}</span>
                </div>
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">脚本名称：</span
                  ><span class="cor-f font-12">{{
                    courseware.scriptName
                  }}</span>
                </div>
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">预计时长：</span
                  ><span class="cor-f font-12">65分钟</span>
                </div>
              </div>
              <div class="flex" style="margin-top: 5px">
                <span class="font-12 cor-bc" style="min-width: 60px"
                  >科目内容：</span
                ><span
                  class="cor-f font-12"
                  :title="courseware.subjectContent"
                  >{{ courseware.subjectContent | ellipsis }}</span
                >
              </div>
              <div class="flex" style="margin-top: 5px">
                <span class="font-12 cor-bc" style="min-width: 60px"
                  >使用器材： </span
                ><span class="cor-f font-12" :title="courseware.equipment"
                  >{{ courseware.equipment | ellipsis }}
                </span>
              </div>
              <div class="flex" style="margin-top: 5px">
                <span class="font-12 cor-bc" style="min-width: 60px"
                  >实训对象：</span
                ><span class="cor-f font-12" :title="courseware.trainingObject"
                  >{{ courseware.trainingObject | ellipsis }}
                </span>
              </div>
              <div class="flex" style="margin-top: 5px">
                <span class="font-12 cor-bc" style="min-width: 60px"
                  >事前准备：</span
                ><span class="cor-f font-12" :title="courseware.ready"
                  >{{ courseware.ready | ellipsis }}
                </span>
              </div>
              <div class="flex" style="margin-top: 5px">
                <span class="font-12 cor-bc" style="min-width: 84px"
                  >安全注意事项：</span
                ><span
                  class="cor-f font-12"
                  :title="courseware.safetyPrecautions"
                  >{{ courseware.safetyPrecautions | ellipsis }}
                </span>
              </div>
            </div>
            <div style="">
              <div class="font-12 cor-b" style="margin-top: 10px">
                {{ trainingScript.name }}
              </div>
              <div class="flex" style="">
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">同步时间：</span
                  ><span class="cor-f font-12">{{
                    trainingScript.syncTime
                  }}</span>
                </div>
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">编码：</span
                  ><span class="cor-f font-12">{{ trainingScript.code }}</span>
                </div>
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">总时间：</span
                  ><span class="cor-f font-12"
                    >{{ trainingScript.trainingTime }}分钟</span
                  >
                </div>
                <div style="margin-right: 40px">
                  <span class="font-12 cor-bc">燃烧场景：</span
                  ><span class="cor-f font-12">{{
                    trainingScript.burningScene
                  }}</span>
                </div>
              </div>
              <div class="flex" style="margin-top: 5px">
                <span class="font-12 cor-bc" style="min-width: 60px"
                  >描述：</span
                ><span class="cor-f font-12" :title="courseware.description"
                  >{{ trainingScript.description | ellipsis }}
                </span>
              </div>
            </div>
            <div
              @click="hideCoursePop"
              class="pos-a flex flex-ac flex-jc"
              style="bottom: 0; right: 0;cursor: pointer;"
            >
              <img src="./../assets/sure.png" alt="" />
              <span class="pos-a" style="color: #fff">关闭</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 参训人数弹框 -->
    <div
      v-show="personNumPop"
      class="pos-f flex flex-ac flex-jc"
      style="
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      "
    >
      <div class="pos-r">
        <img src="./../assets/centerBg.png" alt="" />
        <div class="pos-a w100 h100 t-0 l-0 flex flex-ac flex-jc">
          <div style="width: 96%; height: 90%" class="pos-r">
            <div class="flex flex-ac">
              <span class="cor-f font-16" style="margin-right: 5px"
                >参训人员</span
              >
              <img src="./../assets/dian.png" alt="" />
            </div>
            <div class="font-12 cor-b" style="margin-top: 10px">
              参训人员({{ staffs.length }}人)
            </div>
            <div
              style="
                width: 100%;
                height: calc(100% - 90px);
                padding-top: 10px;
                overflow-y: scroll;
                align-content: flex-start;
              "
              class="scroll flex flex-ww"
            >
              <span
                v-for="(item, index) in data.staffs"
                :key="item.id"
                style="
                  width: 32.6%;
                  padding: 4px 0;
                  height: 35px;
                  margin-bottom: 10px;
                  margin-right: 8px;
                  background-color: rgba(0, 204, 255, 0.0470588235294118);
                "
                :style="(index + 1) % 3 === 0 ? 'margin-right: 0;' : ''"
                class="flex flex-ac cor-bc"
              >
                <i class="el-icon-s-custom cor-b" style="margin: 0 5px"></i>
                <span class="font-12">{{ item.emergencyCrewName }}</span>
              </span>
            </div>
            <div
              @click="hidePersonNumPop"
              class="pos-a flex flex-ac flex-jc"
              style="bottom: 0; right: 0;cursor: pointer;"
            >
              <img style="height: 30px" src="./../assets/sure.png" alt="" />
              <span class="pos-a" style="color: #fff">关闭</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结束弹框 -->
    <div
      v-show="endPop"
      class="pos-f flex flex-ac flex-jc"
      style="
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      "
    >
      <div class="pos-r">
        <img src="./../assets/litileBg.png" alt="" />
        <div class="pos-a w100 h100 t-0 l-0 flex flex-ac flex-jc">
          <div style="width: 96%; height: 90%" class="pos-r">
            <div class="flex flex-ac">
              <img src="./../assets/dian.png" alt="" />
            </div>
            <div class="flex flex-jc flex-dc flex-ac" style="margin-top: 45px">
              <div class="flex flex-ac">
                <i
                  class="el-icon-warning"
                  style="font-size: 50px; color: #f62121"
                ></i>
                <span class="cor-b font-30">确认结束实训 ？</span>
              </div>
              <div
                class="cor-bc font-12"
                style="margin-top: 20px"
                v-if="endState"
              >
                {{ endModalText }}
              </div>
              <div class="cor-bc font-12" style="margin-top: 20px" v-else>
                当前用时
                <span class="cor-b">{{ alreadyUseTime }}</span>
                分钟，距实训课件预计时长结束还差
                <span style="color: #f62121">{{ surplusTime }}</span> 分钟！
              </div>
            </div>
            <div class="flex flex-jc" style="margin-top: 40px">
              <div
                @click="hideEndPop"
                class="flex flex-ac flex-jc"
                style="cursor: pointer; margin-right: 80px"
              >
                <img style="height: 30px" src="./../assets/cancel.png" alt="" />

                <span class="pos-a" style="color: #fff">取消</span>
              </div>
              <div
                class="flex flex-ac flex-jc"
                style="cursor: pointer"
                @click="confirmOver"
              >
                <img style="height: 30px" src="./../assets/sure.png" alt="" />
                <span class="pos-a" style="color: #fff">确认</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 视频设置弹框 -->
    <div
      v-show="videoSetPop"
      class="pos-f flex flex-ac flex-jc"
      style="
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      "
    >
      <div class="pos-r">
        <img style="width: 600px" src="./../assets/centerBg.png" alt="" />
        <div class="pos-a w100 h100 t-0 l-0 flex flex-ac flex-jc">
          <div style="width: 96%; height: 90%" class="pos-r">
            <div class="flex flex-ac" style="margin-bottom: 10px">
              <span class="cor-f font-16" style="margin-right: 5px"
                >视频控制</span
              >
              <img src="./../assets/dian.png" alt="" />
            </div>

            <div
              style="
                width: 100%;
                height: calc(100% - 114px);
                overflow-y: scroll;
                align-content: flex-start;
              "
              class="scroll flex flex-ww"
            >
              <p
                v-for="item in videoShowList"
                :key="item.id"
                style="
                  width: 100%;
                  padding: 4px 0;
                  height: 26px;
                  margin-bottom: 10px;
                  background-color: rgba(0, 204, 255, 0.0470588235294118);
                "
                :class="
                  item.isShow === true
                    ? 'flex flex-ac cor-bc notcheckedVideo'
                    : 'flex flex-ac cor-bc'
                "
                :id="item.id === highLightItem.id ? 'checkedVideo' : ''"
                @click="checkThisVideo(item)"
              >
                <i
                  :class="
                    item.isShow === true
                      ? 'el-icon-video-camera-solid cor-chekc'
                      : 'el-icon-video-camera-solid cor-b'
                  "
                  :id="item.id === highLightItem.id ? 'checkedIcon' : ''"
                  style="margin: 0 5px"
                ></i>
                <span class="font-12" v-if="item.isShow === false">{{
                  item.monitoringPlaceName
                }}</span>
                <span class="font-12" v-else>{{
                  item.monitoringPlaceName
                }}</span>
              </p>
            </div>
            <div style="width: 100%; text-align: right">
              <el-pagination
                background
                class="footpage"
                layout="total, prev, pager, next"
                :total="videoShowTotal"
                @current-change="changePage"
              >
              </el-pagination>
            </div>
            <div
              @click="confirmVideoPop"
              class="pos-a flex flex-ac flex-jc"
              style="bottom: 0; right: 0"
            >
              <img style="height: 30px" src="./../assets/sure.png" alt="" />
              <span class="pos-a" style="color: #fff">确定</span>
            </div>
            <div
              @click="hideVideoPop"
              class="pos-a flex flex-ac flex-jc"
              style="bottom: 0; right: 120px"
            >
              <img style="height: 30px" src="./../assets/cancel.png" alt="" />
              <span class="pos-a" style="color: #fff">取消</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 左侧弹框 -->
    <div
      :class="
        slide ? 'inte-menu inte-menu-slide-on' : 'inte-menu inte-menu-slide-no'
      "
    >
      <div class="inte-menu-box">
        <div class="inte-menu-item">
          <div
            class="inte-menu-item-check"
            @click="checkPage('/integratedScreen')"
          >
            综合大屏
          </div>
        </div>
        <div class="inte-menu-item">
          <div>真火实训</div>
          <div class="inte-menu-item-subMenu">
            <div class="subMenu-item" @click="checkPage('/courseware')">
              -实训课件
            </div>
            <div class="subMenu-item" @click="checkPage('/trainfiles')">
              -实训档案
            </div>
            <div
              class="subMenu-item"
              @click="checkPage('/integratedScreen')"
              style="color: #00ccff"
            >
              -实训可视化
            </div>
            <div class="subMenu-item" @click="checkPage('/firescript')">
              -真火脚本
            </div>
          </div>
        </div>
        <div class="inte-menu-item">
          <div>信息管理</div>
          <div class="inte-menu-item-subMenu">
            <div class="subMenu-item" @click="checkPage('/emergencyTeam')">
              -应急队伍
            </div>
            <div class="subMenu-item" @click="checkPage('/emergencyExperts')">
              -应急专家
            </div>
            <div class="subMenu-item" @click="checkPage('/baseMaterials')">
              -基地物资
            </div>
            <div class="subMenu-item" @click="checkPage('/baseEquip')">
              -基地装备
            </div>
          </div>
        </div>
        <div class="inte-menu-item">
          <div class="inte-menu-item-title" @click="checkPage('/videoDeploy')">
            视频配置
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Visualization",
  data() {
    return {
      secMenu: [],
      secondMenu: false,
      personNumPop: false, //参训人数弹框控制
      endPop: false, //结束弹框控制
      coursePop: false, //课件弹框控制
      videoSetPop: false,
      // 控制菜单滑入滑出
      slide: false,
      nowTime: "",
      data: "",
      courseware: "",
      staffs: [],
      trainingScript: "",
      name: "",
      alreadyUseTime: "",
      surplusTime: "",
      videoPage: 1,
      videoList: [],
      NineVideo: [],
      videoShowList: [],
      videoShowTotal: 0,
      allvideoPage: 1,
      highLightItem: "",
      checkIndex: "",
      showHMS: "",

      endModalText: "",
      endState: false,
    };
  },
  created() {
    this.getfiles();
    this.getFilesById();
    this.getVideo();
  },
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timerHandle);
  },
  methods: {
    // 跳转其他页面
    checkPage(path) {
      if (path === "/visualization") {
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
            this.$router.push(path);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push(path);
      }
    },
    // tuichu
    loginout() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/login");
          localStorage.removeItem("fire-token");
          localStorage.removeItem("fire-user");
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 1000,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
            duration: 1000,
          });
        });
    },
    changeVisById(id) {
      sessionStorage.setItem("visibid", id);
      this.getFilesById();
    },
    getFilesById() {
      let formdata = new FormData();
      formdata.append("id", sessionStorage.getItem("visibid"));
      this.axios({
        url: "/dah-training-api/trainingRecord/visualization",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          console.log(res.data.data);
          clearInterval(this.timerHandle);
          this.data = res.data.data;
          this.courseware = res.data.data.courseware;
          this.staffs = res.data.data.staffs;
          this.trainingScript = res.data.data.trainingScript;
          this.name = res.data.data.name;
          this.timerHandle = setInterval(() => {
            this.timeInterval();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timeInterval() {
      let time = new Date(this.data.actualStartTime);
      let now = new Date();
      this.showHMS = this.eventProcessNodeTimeComputed(
        now.getTime(),
        time.getTime()
      );
    },
    eventProcessNodeTimeComputed(a, b) {
      let endTime = a; //结束时间
      let startTime = b; //开始时间
      let timeDiff = endTime - startTime;
      let hours = Math.floor((timeDiff % 86400000) / 3600000); //时
      let minutes = Math.floor((timeDiff % 3600000) / 60000); //分
      let seconds = Math.floor((timeDiff % 60000) / 1000); //秒
      hours < 10 ? (hours = "0" + hours) : hours; //小时格式化
      minutes < 10 ? (minutes = "0" + minutes) : minutes; //分钟格式化
      seconds < 10 ? (seconds = "0" + seconds) : seconds; //秒钟格式化

      let k = hours + ":" + minutes + ":" + seconds;
      // return k;
      if ("0" > seconds) {
        return "--";
      } else {
        return k;
      }
    },
    // 获取实训档案列表
    getfiles() {
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
          this.secMenu = res.data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取视频
    getVideo() {
      let formdata = new FormData();
      formdata.append("limit", 9);
      formdata.append("offset", 1);
      this.axios({
        url: "/dah-training-api/video/selectVideoByPage",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          this.NineVideo = res.data.data.list;
          this.moninerPage(1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击全屏
    allSreen() {
      var docElm = document.documentElement;
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    //视频设置弹框
    showVideoPop(i) {
      this.videoSetPop = true;
      this.checkIndex = i;
      this.getAllVideo();
    },
    getAllVideo() {
      let formdata = new FormData();
      formdata.append("limit", 10);
      formdata.append("offset", this.allvideoPage);
      this.axios({
        url: "/dah-training-api/video/selectVideoByPage",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          res.data.data.list.map((item) => {
            item.isShow = false;
            item.isChecked = false;
            for (let i = 0; i < this.NineVideo.length; i++) {
              if (item.id === this.NineVideo[i].id) {
                item.isShow = true;
              }
            }
          });
          this.videoShowList = res.data.data.list;
          this.videoShowTotal = res.data.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(currpage) {
      this.allvideoPage = currpage;
      this.getAllVideo();
    },
    checkThisVideo(item) {
      if (!item.isShow) {
        this.highLightItem = item;
      }
    },
    confirmVideoPop() {
      if (this.highLightItem === "") {
        this.$message({
          message: "请选择",
          iconClass: "el-icon-loading",
          type: "warning",
          customClass: "warningMsg",
          duration: 0,
        });
      } else {
        this.videoSetPop = false;
        this.videoList[this.checkIndex] = this.highLightItem;
        if (this.videoPage === 1) {
          this.NineVideo[this.checkIndex] = this.highLightItem;
        } else if (this.videoPage === 2) {
          this.NineVideo[this.checkIndex + 3] = this.highLightItem;
        } else if (this.videoPage === 3) {
          this.NineVideo[this.checkIndex + 6] = this.highLightItem;
        }
      }
      this.highLightItem = "";
    },
    hideVideoPop() {
      this.videoSetPop = false;
    },
    showEndPop() {
      this.endPop = true;
      let date = new Date();
      let now = date.getTime();
      let startDate = new Date(this.data.actualStartTime);
      let start = startDate.getTime();
      let timestamp = now - start;
      this.alreadyUseTime = Math.floor(timestamp / 60000);
      this.surplusTime =
        this.data.courseware.estimatedDuration - this.alreadyUseTime > 0
          ? this.data.courseware.estimatedDuration - this.alreadyUseTime
          : 0;
      if (this.data.courseware.estimatedDuration - this.alreadyUseTime > 0) {
        this.endState = false;
        this.endModalText = `
                当前用时
                <span class="cor-b">${this.alreadyUseTime}</span>
                分钟，距实训课件预计时长结束还差
                <span style="color: #f62121">${this.surplusTime}</span> 分钟！`;
      } else {
        this.endState = true;
        this.endModalText = "时间已到，是否结束？";
      }
    },
    confirmOver() {
      let date = new Date();
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let MT =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let Ms =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let endTime = Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + Ms;
      this.data.status = 2;
      this.data.actualEndTime = endTime;
      this.axios({
        url: "/dah-training-api/trainingRecord/update",
        method: "POST",
        data: qs.stringify(this.data),
      })
        .then((res) => {
          if (res.data.data) {
            this.endPop = false;
            this.$router.replace({
              path: "/trainfiles",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hideEndPop() {
      this.endPop = false;
    },
    showPersonNumPop() {
      this.personNumPop = true;
    },
    hidePersonNumPop() {
      this.personNumPop = false;
    },
    showCoursePop() {
      this.coursePop = true;
    },
    hideCoursePop() {
      this.coursePop = false;
    },
    openSecond() {
      this.secondMenu = !this.secondMenu;
    },
    // 监控翻页
    moninerPage(i) {
      this.videoPage = i;
      if (i === 1) {
        this.videoList = this.NineVideo.slice(0, 3);
      } else if (i === 2) {
        this.videoList = this.NineVideo.slice(3, 6);
      } else {
        this.videoList = this.NineVideo.slice(6, 9);
      }
    },
    // 展开菜单
    showMenu() {
      this.slide = !this.slide;
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
  filters: {
    //文字数超出时，超出部分使用...
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 100) {
        return value.slice(0, 100) + "...";
      }
      return value;
    },
  },
};
</script>

<style lang="less">
@import url("./../assets/css/index.css");
@import url("./../font/font.css");
.inte-menu-slide-no {
  position: absolute;
  left: -230px;
  top: 85px;
}
.inte-menu-slide-on {
  position: absolute;
  left: 0;
  top: 85px;
}
.inte-menu {
  height: 100%;
  width: 230px;
  z-index: 999;
  background: rgba(2, 13, 30, 0.9);
  transition: left linear 0.3s;
  .inte-menu-box {
    height: 100%;
    width: 100%;
    background-image: url("../assets/image/u4.png");
    background-size: 100% 100%;
    color: #a0ecfd;
    font-size: 13px;
    padding: 40px 30px;
    .inte-menu-item {
      margin-bottom: 20px;
      .inte-menu-item-title {
        cursor: pointer;
      }
      .inte-menu-item-check {
        // color: #00ccff;
        font-weight: 700;
        cursor: pointer;
      }
      .inte-menu-item-subMenu {
        padding: 0 20px;
        .subMenu-item {
          margin-top: 10px;
          cursor: pointer;
        }
        .subMenu-item:hover {
          color: #00ccff;
        }
      }
    }
  }
}
.scroll::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.visualiza {
  width: 100%;
  background-image: url("../assets/image/u0.png");
  background-size: 100% 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  .inte-header {
    width: 100%;
    position: relative;
    height: 110px;
    .title {
      width: 40%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      position: absolute;
      top: 25%;
      left: 30%;
      .title-title {
        color: white;
        font-size: 27px;
      }
    }
    .banner {
      width: 100%;
    }
    .left {
      width: 2.3%;
      position: absolute;
      bottom: 5%;
      left: 0;
      animation: rotate 5s linear infinite;
      z-index: 99;
      cursor: pointer;
    }
    .left-center {
      width: 1.1%;
      position: absolute;
      left: 0.57%;
      bottom: 15%;
    }
    .inte-header-left {
      height: 50%;
      position: absolute;
      top: 25%;
      left: 10px;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: white;
      .menu {
        width: 200px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
        background-image: url("../assets/image/a1_03.png"),
          url("../assets/image/a1_04.png"), url("../assets/image/a1_05.png"),
          url("../assets/image/a1_06.png");
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: top left, top right, bottom left, bottom right;
        .sec-menu {
          width: 100%;
          position: absolute;
          top: 30px;
          border: 1px solid rgb(0, 204, 255);
          padding: 5px;
          border-radius: 5px;
          transition: all linear 1s;
          z-index: 999;
          .sec-menu-item {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: rgb(160, 236, 253);
            background: rgba(2, 30, 50, 0.7);
            margin-bottom: 5px;
          }
          .sec-menu-item:hover {
            color: black;
            background: rgb(0, 204, 255);
          }
        }
      }
      .menu:hover {
        cursor: pointer;
      }
      i {
        color: rgb(0, 204, 255);
        margin-left: 10px;
      }
    }
    .inte-header-right {
      height: 50%;
      position: absolute;
      top: 25%;
      right: 10px;
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .time {
        width: 20px;
        height: 20px;
      }
      .time-part {
        display: flex;
        align-items: center;
        height: 30px;
        margin-right: 10px;
        padding: 0 10px;
        background-image: url("../assets/image/a1_03.png"),
          url("../assets/image/a1_04.png"), url("../assets/image/a1_05.png"),
          url("../assets/image/a1_06.png");
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: top left, top right, bottom left, bottom right;
      }
      .user-part {
        width: 30px;
        height: 30px;
        background-image: url("../assets/image/a1_03.png"),
          url("../assets/image/a1_04.png"), url("../assets/image/a1_05.png"),
          url("../assets/image/a1_06.png");
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: top left, top right, bottom left, bottom right;
        line-height: 30px;
        text-align: center;
      }
      span {
        color: white;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 1px;
      }
      .person {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 30px;
        width: 30px;
        justify-content: center;
        .img1 {
          width: 6px;
          margin-bottom: 2px;
        }
        .img2 {
          width: 14px;
        }
      }
    }
  }
  .footpage {
    .btn-prev,
    .btn-next {
      background: rgba(0, 3, 40, 0.5) !important;
      color: white !important;
    }
  }
  .nocheck {
    background: rgba(0, 204, 255, 0.047);
  }
  #checkedVideo {
    color: #020e1e;
    background: inherit;
    background-color: rgba(0, 204, 255, 1) !important;
  }
  #checkedIcon {
    color: #020e1e;
  }
  .notcheckedVideo {
    background: inherit;
    background-color: gray !important;
    color: white;
  }
  .cor-chekc {
    color: white;
  }
  .vis-body {
    width: 100%;
    display: flex;
    padding: 0 10px 15px;
    justify-content: space-between;
    position: relative;
    flex:1;
    // top: -15px;
    .body-left {
      width: 75%;
      .otherSystem {
        position: relative;
        .fullscreen {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: rgb(0, 204, 255);
          display: flex;
          align-items: center;
          font-size: 12px;
          img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
        }
      }
      .boderimg {
        width: 100%;
      }
      .left-foot {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .foot-top {
          width: 100%;
          font-size: 20px;
          color: white;
          font-weight: 600;
          display: flex;

          .mark {
            background: rgb(151, 75, 247);
            padding: 2px 3px;
            border-radius: 3px;
            height: 20px;
            font-size: 10px;
            margin-left: 10px;
          }
        }
        .foot-info {
          display: flex;
          height: 30px;
          align-items: center;
          div {
            margin-right: 25px;
            font-size: 12px;
            .title-span {
              color: rgb(160, 236, 253);
            }
            .cantclick {
              color: white;
            }
            .canclick {
              text-decoration: underline;
            }
            .canclick:hover {
              color: rgb(160, 236, 253);
              cursor: pointer;
            }
          }
        }
        .right {
          position: relative;
          div {
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: rgb(0, 204, 255);
            font-weight: 600;
          }
        }
      }
    }
    .body-right {
      width: 24%;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      .boderimg {
        width: 100%;
      }
      .timebox {
        position: relative;
        .posidiv {
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          position: absolute;
          display: flex;
          /* justify-content: space-between; */
          flex-direction: column;
          p {
            font-size: 12px;
            padding-left: 20px;
            height: 20px;
          }
          .timeimg {
            width: 100%;
            height: calc(100% - 20px);
            font-family: "font-number";
            color: #00ccff;
          }
        }
      }
      .monitor-box {
        height: 755px;
        position: relative;
        .mon-content {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          .content-top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 40px;
            align-items: center;
            .left-title {
              display: flex;
              align-items: center;
              span {
                font-size: 14px;
                color: white;
                margin-right: 10px;
                height: 20px;
                line-height: 26px;
              }
              .rectBox {
                height: 20px;
                display: flex;
                align-items: flex-end;
              }
              .rectangle {
                width: 6px;
                height: 6px;
                background: rgb(0, 204, 255);
                margin-right: 2px;
              }
            }
            .page-box {
              height: 100%;
              display: flex;
              align-items: center;
              div {
                margin-left: 10px;
              }
            }
            .now-page {
              width: 12px;
              height: 12px;
              border-radius: 20px;
              background: rgb(0, 204, 255);
            }
            .page {
              width: 12px;
              height: 12px;
              border-radius: 20px;
              background: rgb(0, 104, 149);
            }
            .now-page,
            .page:hover {
              cursor: pointer;
            }
          }
          .video-part {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .minVideo {
            width: 100%;
            height: 195px;
          }
          .video-title {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            color: white;
            justify-content: space-between;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>