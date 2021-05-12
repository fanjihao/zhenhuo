<!--档案详情-->
<template>
  <div class="printpage">
    <div
      style="
        width: 80px;
        border-radius: 50px;
        height: 80px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 100px;
        right: 100px;
        cursor:pointer;
      "
      v-print="'#printId'"
    >
      <img
        style="width: 20px; height: 20px; cursor: pointer"
        src="@/assets/image/files-details/u1901.png"
        alt="404"
      />
      <p>打印</p>
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
              <span style="width: 80px; margin-left: 20px">创建人：</span>
              <p>{{ name }}</p>
            </div>
            <div class="two">
              <span style="width: 80px; margin-left: 20px">创建时间：</span>
              <p>{{ data.createTime }}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="two" style="margin: 0">
              <span style="width: 80px">实训地点：</span>
              <p style="width: 50px">{{ data.location }}</p>
            </div>
            <div class="two" style="margin: 0">
              <span style="width: 80px">计划时间：</span>
              <p>{{ data.planStartTime }}~{{ data.planEndTime }}</p>
            </div>
            <div class="two" style="margin: 0">
              <span style="width: 80px">实际时间：</span>
              <p>{{ data.actualStartTime }}~{{ data.actualEndTime }}</p>
            </div>
          </div>
        </div>
        <div class="files-details-right">
          <div class="result">
            <p>{{ data.assessGrades ? data.assessGrades : "-" }}</p>
            <span>实训成绩</span>
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
        <div style="margin: 0 auto; border-radius: 5px; border: 1px solid #eee">
          <div class="tabletitle">参训人员({{ staffs.length }}人)</div>
          <div class="box-flex">
            <el-table
              :data="tableData1"
              border
              v-if="tableData1.length > 0"
              stripe
              :header-cell-style="{
                backgroundColor: 'rgb(242,243,248)',
              }"
            >
              <!-- <el-table-column prop="no1" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name1" label="人员姓名" width="150">
              </el-table-column>
              <el-table-column prop="no2" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name2" label="人员姓名" width="150">
              </el-table-column>
              <el-table-column prop="no3" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name3" label="人员姓名" width="150">
              </el-table-column>
              <el-table-column prop="no4" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name4" label="人员姓名" width="150">
              </el-table-column> -->
              <el-table-column prop="no1" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name1" label="人员姓名"> </el-table-column>
              <el-table-column prop="no2" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name2" label="人员姓名"> </el-table-column>
              <el-table-column prop="no3" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name3" label="人员姓名"> </el-table-column>
              <el-table-column prop="no4" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name4" label="人员姓名"> </el-table-column>
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
        <p class="ptitle longptitle" style="width: 95px">安全注意事项：</p>
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
      tableData4: [],
      staffs: [],
      data: "",
      name: "admin",
      courseware: "",
      trainingScript: "",
      files: "",
      id: this.$route.query.id,
      status: this.$route.query.status,

      imgList: [],
      printObj: {
        id: "printId", //打印区域 Dom ID
        popTitle: "打印页面标题文字",
        extraCss: "https://www.google.com,https://www.google.com",
        extraHead:
          '<meta http-equiv="Content-Language"content="zh-cn"/>,<style> #printMe { height: auto !important; } <style>', //  可以传进去  style tag 标签；注意要逗号分隔   解决特定区域不显示问题；
      },
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
                this.imgList.push(
                  http.defaults.baseURL +
                    "/dah-training-api/file/imageView?filePath=" +
                    item.filePath
                );
              } else if (item.filePath.indexOf(".mp4") !== -1) {
                item.fileType = "video";
              } else if (item.filePath.indexOf(".mp3") !== -1) {
                item.fileType = "audio";
              }
              item.filePath =
                http.defaults.baseURL +
                "/dah-training-api/file/imageView?filePath=" +
                item.filePath;
            }
          });
          this.data = res.data.data;
          this.courseware = res.data.data.courseware;
          this.trainingScript = res.data.data.trainingScript;
          this.files = res.data.data.files;
          this.staffs = res.data.data.staffs;
          this.staffs.map((item, index) => {
            item.no = index + 1;
          });
          let tableData = [];
          let num = parseInt(this.staffs.length / 4);
          for (let i = 1; i <= num + 1; i++) {
            let arr = this.staffs.slice(4 * i - 4, 4 * i);
            let obj = {
              no1: arr[0].no,
              name1: arr[0].emergencyCrewName,
              no2: arr[1] ? arr[1].no : "",
              name2: arr[1] ? arr[1].emergencyCrewName : "",
              no3: arr[2] ? arr[2].no : "",
              name3: arr[2] ? arr[2].emergencyCrewName : "",
              no4: arr[3] ? arr[3].no : "",
              name4: arr[3] ? arr[3].emergencyCrewName : "",
            };
            tableData.push(obj);
          }
          this.tableData1 = tableData;
          // if((this.staffs.length / 4) > 1) {
          //   this.tableData1 = this.staffs.slice(0, num+1);
          //   this.tableData2 = this.staffs.slice(num+1, 2*(num+1));
          //   this.tableData3 = this.staffs.slice(2*(num+1), 3*(num+1));
          //   this.tableData4 = this.staffs.slice(3*(num+1), this.staffs.length - 1);
          // } else {
          //   this.tableData1 = this.staffs;
          // }
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
          JSON.parse(localStorage.getItem("fire-user")).name +
          "&id=" +
          this.data.id +
          "&status=" +
          this.data.status
      );
    },
  },
};
</script>

<style lang="less" scoped>
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
.printpage {
  width: 100%;
  background: #333;
  box-sizing: content-box;
  padding: 0 20px;
  position: relative;
  left: -20px;
  // bottom: -20px;
  // min-height: 100vh;
  // height: auto;
  flex: 1;
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
.files-details {
  width: 1000px;
  margin: 0 auto;
  background: rgb(242, 243, 248);
  font-size: 14px;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  header {
    overflow: hidden;
    background: white;
    padding: 0 15px 10px;
    .files-details-left {
      width: 85%;
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
      width: 90px;
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
      // padding: 0 15px;
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
      width: 70px;
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
}
</style>