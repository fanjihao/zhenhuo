<!--档案详情-->
<template>
  <div class="filesDetails">
    <div class="location">
      <img src="../../assets/image/u974.svg" alt="" />
      <div class="directory1">真火实训</div>
      <div class="directory2" @click.stop="goPage">实训档案</div>
      <div class="directory3">档案详情</div>
    </div>
    <div class="files-details" id="printId">
      <header>
        <div class="files-details-left">
          <div class="top">
            <div class="one">
              <div class="first">
                <span class="finish" v-if="data.status === 2">已完成</span>
                <span class="finish" v-if="data.status === 1">执行中</span>
                <span class="finish" v-if="data.status === 0">待执行</span>
              </div>
              <p>{{ data.name }}</p>
            </div>
            <div class="two">
              <span>创建人：</span>
              <p>{{ name }}</p>
            </div>
            <div class="two">
              <span>创建时间：</span>
              <p>{{ data.createTime }}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="two">
              <span>实训地点：</span>
              <p>{{ data.location }}</p>
            </div>
            <div class="two">
              <span>计划时间：</span>
              <p>{{ data.planStartTime }}~{{ data.planEndTime }}</p>
            </div>
            <div class="two">
              <span>实际时间：</span>
              <p>{{ data.actualStartTime }}~{{ data.actualEndTime }}</p>
            </div>
          </div>
        </div>
        <div class="files-details-right">
          <div class="result">
            <p>{{ data.assessGrades ? data.assessGrades : "-" }}</p>
            <span>实训成绩</span>
          </div>
          <div class="right-img">
            <img
              style="width: 20px; height: 20px; cursor: pointer"
              src="@/assets/image/files-details/u1901.png"
              alt="404"
              v-print="'#printId'"
            />
            <img
              style="width: 20px; height: 20px; cursor: pointer"
              src="@/assets/image/files-details/u1902.png"
              alt="404"
              @click="exportData"
            />
          </div>
        </div>
      </header>
      <div class="line"></div>
      <div class="title">
        <div></div>
        <p>参训队伍</p>
      </div>
      <div class="title">队伍名称：{{ data.teamName }}</div>
      <div class="tablebox">
        <div
          style="
            width: 98%;
            margin: 0 auto;
            border-radius: 5px;
            border: 1px solid #eee;
          "
        >
          <div class="tabletitle">
            参训人员({{
              tableData1
                ? tableData1.length + tableData2.length + tableData3.length
                : 0
            }}人)
          </div>
          <div class="box-flex">
            <el-table
              :data="tableData1"
              style="width: 25%"
              height="250"
              border
              v-if="tableData1.length > 0"
              stripe
              :header-cell-style="{
                backgroundColor: 'rgb(242,243,248)',
              }"
            >
              <el-table-column prop="no" label="#" width="50">
              </el-table-column>
              <el-table-column prop="emergencyCrewName" label="人员姓名">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="title">
        <div></div>
        <p>课件信息</p>
      </div>
      <div class="content">
        <div>
          <p class="ptitle">课件名称：</p>
          <p class="info">{{ data.coursewareName }}</p>
        </div>
        <div>
          <p class="ptitle">脚本名称：</p>
          <p class="info">{{ courseware.scriptName }}</p>
        </div>
        <div>
          <p class="ptitle">预计时长：</p>
          <p class="info">{{ courseware.estimatedDuration }}分钟</p>
        </div>
      </div>
      <div class="content">
        <p class="ptitle longptitle">科目内容：</p>
        <p class="info">{{ data.subjectContent }}</p>
      </div>
      <div class="content">
        <p class="ptitle longptitle">使用器材：</p>
        <p class="info">{{ data.equipment }}</p>
      </div>
      <div class="content">
        <p class="ptitle longptitle">实训对象：</p>
        <p class="info">{{ data.trainingObject }}</p>
      </div>
      <div class="content">
        <p class="ptitle longptitle">事前准备：</p>
        <p class="info">{{ data.ready }}</p>
      </div>
      <div class="content">
        <p class="ptitle longptitle">安全注意事项：</p>
        <p class="info">{{ data.safetyPrecautions }}</p>
      </div>
      <div class="disc-line"></div>
      <div class="title">
        <p>{{ courseware.scriptName }}</p>
      </div>
      <div class="content">
        <div>
          <p class="ptitle">同步时间：</p>
          <p class="info">{{ trainingScript.syncTime }}</p>
        </div>
        <div>
          <p class="ptitle">编码：</p>
          <p class="info">{{ trainingScript.code }}</p>
        </div>
        <div>
          <p class="ptitle">总时间：</p>
          <p class="info">{{ trainingScript.trainingTime }}</p>
        </div>
        <div>
          <p class="ptitle">燃烧场景：</p>
          <p class="info">{{ trainingScript.burningScene }}</p>
        </div>
      </div>
      <div class="content">
        <p class="ptitle">描述：</p>
        <p class="info">
          {{ trainingScript.description ? trainingScript.description : "-" }}
        </p>
      </div>
      <div class="title">
        <div></div>
        <p>评估信息</p>
      </div>
      <div class="content">
        <p class="ptitle">评估人：</p>
        <p class="info">{{ data.assessName ? data.assessName : "-" }}</p>
      </div>
      <div class="content">
        <p class="ptitle">评估时间：</p>
        <p class="info">{{ data.assessTime ? data.assessTime : "-" }}</p>
      </div>
      <div class="content">
        <p class="ptitle">实训成绩：</p>
        <p class="info">{{ data.assessGrades ? data.assessGrades : "-" }}分</p>
      </div>
      <div class="content">
        <p class="ptitle">评估意见：</p>
        <p class="info">{{ data.assessOpinion ? data.assessOpinion : "-" }}</p>
      </div>
      <div class="title">
        <div></div>
        <p>附件({{ files.length }})</p>
      </div>
      <div class="files-part">
        <div class="files-item" v-for="item in files" :key="item.id">
          <el-image 
            :src="item.filePath"
            v-if="item.fileType === 'img'"
            style="width: 150px; height: 150px"
            alt=""
            :preview-src-list="imgList">
          </el-image>
          <video
            :src="item.filePath"
            v-else-if="item.fileType === 'video'"
            controls
            style="width: 150px; height: 150px"
          ></video>
          <audio
            :src="item.filePath"
            v-else-if="item.fileType === 'audio'"
            controls
            style="width: 150px; height: 150px"
          ></audio>
          <p>{{ item.fileName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http/request";
// import qs from "qs";

export default {
  data() {
    return {
      tableData1: [],
      tableData2: [],
      tableData3: [],
      staffs: [],
      data: "",
      name: "admin",
      courseware: "",
      trainingScript: "",
      files: "",
      id: this.$route.query.id,
      status: this.$route.query.status,

      imgList: []
    };
  },
  async created() {
    await this.getInfo();
    window.addEventListener("popstate", this.goPage, false);
  },
  destroyed() {
    window.removeEventListener("popstate", this.goPage, false);
  },
  methods: {
    goPage() {
      this.$destroy();
      this.$router.push("/trainfiles");
    },
    getInfo() {
      let formdata = new FormData();
      formdata.append("id", this.id);
      formdata.append("status", this.status);
      // 发请求获取详情信息
      this.axios({
        url: "/dah-training-api/trainingRecord/getTrainingRecordStatus",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          res.data.data.files.map((item) => {
            if (item.filePath) {
              if (
                item.filePath.indexOf(".png") !== -1 ||
                item.filePath.indexOf(".jpg") !== -1 ||
                item.filePath.indexOf(".jpeg") !== -1 ||
                item.filePath.indexOf(".gif") !== -1
              ) {
                item.fileType = "img";
                this.imgList.push(http.defaults.baseURL + "/dah-training-api/file/imageView?filePath=" + item.filePath);
              } else if (item.filePath.indexOf(".mp4") !== -1) {
                item.fileType = "video";
              } else if (item.filePath.indexOf(".mp3") !== -1) {
                item.fileType = "audio";
              }
              item.filePath = http.defaults.baseURL + "/dah-training-api/file/imageView?filePath=" + item.filePath;
            }
          });
          this.data = res.data.data;
          this.courseware = res.data.data.courseware;
          this.trainingScript = res.data.data.trainingScript;
          this.files = res.data.data.files;
          // this.imgList = this.files.filter(item => item.fileType === "img");
          console.log(this.imgList, 'ssssssss')
          this.staffs = res.data.data.staffs;
          this.tableData1 = this.staffs;
          this.tableData1.map((item, index) => {
            item.no = index + 1;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 打印
    printFile() {},
    // 导出
    exportData() {
      // this.axios({
      //   url: `/dah-training-api/trainingRecord/fileExport`,
      //   method: "GET",
      //   params: qs.stringify({
      //     createUserName: JSON.parse(sessionStorage.getItem("user")).name,
      //     id: this.data.id,
      //     status: this.data.status,
      //   }),
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      window.open(
        http.defaults.baseURL +
          "/dah-training-api/trainingRecord/fileExport?createUserName=" +
          JSON.parse(sessionStorage.getItem("user")).name +
          "&id=" +
          this.data.id +
          "&status=" +
          this.data.status
      );
    },
  },
};
</script>

<style lang="less">
/*去除页眉页脚*/
@page {
  size: auto; /* auto is the initial value */
  margin: 1mm; /* this affects the margin in the printer settings */
}

// html {
//   background-color: #ffffff;
//   margin: 0; /* this affects the margin on the html before sending to printer */
// }

// body {
//   border: solid 1px blue;
//   margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
// }
/*去除页眉页脚*/
.filesDetails {
  width: 100%;

  .location {
    width: 100%;
    display: flex;
    height: 40px;
    align-items: center;
    font-size: 12px;
    flex-shrink: 0;
    img {
      margin-right: 10px;
    }
    .directory1 {
      padding-right: 10px;
      border-right: 1px solid;
    }
    .directory2 {
      padding-left: 10px;
      padding-right: 10px;
      border-right: 1px solid;
    }
    .directory2:hover {
      color: #7c8de7;
      cursor: pointer;
    }
    .directory3 {
      padding-left: 10px;
      color: #7c8de7;
    }
  }
}
.files-details {
  width: 100%;
  background: rgb(242, 243, 248);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  header {
    overflow: hidden;
    background: white;
    padding: 0 15px 10px;
    .files-details-left {
      width: 70%;
      float: left;
      .top,
      .bottom {
        overflow: hidden;
        // padding: 10px 0;
        .one {
          display: flex;
          .first {
            background-color: rgba(242, 243, 248, 1);
            padding: 3px 5px;
            border-radius: 4px;
            margin-right: 10px;
            .finish {
              font-weight: 700;
              font-style: normal;
              font-size: 12px;
              color: #979cbc;
              margin: auto;
            }
          }

          p {
            font-weight: 700;
            font-style: normal;
            font-size: 20px;
            color: #48465b;
            float: left;
            margin-left: 3px;
          }
        }
        .two {
          overflow: hidden;
          display: flex;
          margin-left: 20px;
          span {
            float: left;
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: #646c9a;
          }
          p {
            float: left;
            margin-left: 3px;
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
          }
        }
      }
      .top {
        height: 50px;
        display: flex;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 10px;
      }
      .bottom {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .two {
          margin-left: 50px;
        }
        .two:first-child {
          margin-left: 0;
        }
      }
    }
    .files-details-right {
      float: right;
      width: 130px;
      overflow: hidden;
      position: relative;
      .result {
        float: left;

        p {
          font-weight: 700;
          font-style: normal;
          font-size: 36px;
          color: #ff9900;
        }

        span {
          font-size: 14px;
        }
      }

      .right-img {
        position: absolute;
        right: 0;
        bottom: 0;
        img {
          margin: 0 3px;
        }
      }
    }
  }
  .line {
    width: 98%;
    height: 1px;
    background-color: #c2c2c2;
    margin: 0 auto;
  }
  .title {
    width: 100%;
    padding: 0 15px;
    height: 40px;
    display: flex;
    align-items: center;
    background: white;
    div {
      border-left: 3px solid;
      height: 20px;
      margin-right: 5px;
    }
    p {
      font-weight: 600;
    }
  }
  .tablebox {
    width: 100%;
    padding: 0 15px;
    background: white;
    .tabletitle {
      width: 100%;
      height: 40px;
      padding: 0 15px;
      font-weight: 600;
      line-height: 40px;
    }
    .box-flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
    }
  }
  .content {
    width: 100%;
    display: flex;
    // height: 35px;
    // align-items: center;
    font-size: 13px;
    padding: 0 15px 10px;
    background: white;
    div {
      width: 30%;
      display: flex;
      align-items: center;
      height: 100%;
    }
    > .longptitle {
      width: 5%;
    }
    > .info {
      flex: 1;
    }
    .ptitle {
      color: #999;
    }
    .info {
      color: #333;
    }
  }
  .disc-line {
    width: 98%;
    margin: 0 auto;
    border-bottom: 1px dashed;
  }
  .files-part {
    width: 100%;
    padding: 0 15px;
    height: 200px;
    display: flex;
    align-items: center;
    background: white;
    .files-item {
      width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 15px;
      p {
        margin-top: 10px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>