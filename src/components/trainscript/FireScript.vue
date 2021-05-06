<template>
  <div class="filescript">
    <div class="location">
      <img src="@/assets/image/u974.svg" alt="" />
      <div class="directory1">真火实训</div>
      <div class="directory2">真火脚本</div>
    </div>
    <div class="files-content">
      <div class="content-top">脚本列表</div>
      <div class="content-search">
        <div class="left-search">
          <div class="search-time">
            <label class="time-title" for="time">燃烧场景</label>
            <el-select
              v-model="value"
              clearable
              placeholder="请选择"
              @change="optionChange"
            >
              <el-option
                v-for="item in dropList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search-time input-box">
            <el-input
              placeholder="请输入脚本名称"
              v-model="scriptName"
              clearable
              class="input-class"
            ></el-input>
          </div>
          <div class="search-btn" @click="getScript">查 询</div>
        </div>
        <div class="search-btn" @click="synchronization">同 步</div>
      </div>
      <div class="content-table">
        <div class="tablebox">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            v-loading="loading"
            highlight-current-row
            @row-click="readDetail"
          >
            <el-table-column prop="no" label="#" width="50"> </el-table-column>
            <el-table-column prop="code" label="编码"> </el-table-column>
            <el-table-column prop="name" label="脚本名称"> </el-table-column>
            <el-table-column prop="burningScene" label="燃烧场景">
            </el-table-column>
            <el-table-column prop="trainingTime" label="总时间" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.trainingTime }}分钟</span>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" width="350">
              <template slot-scope="scope">
                <span class="descript">{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="syncTime" label="同步时间" width="150">
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          class="footpage"
          layout="total, prev, pager, next"
          :total="total"
          :page-size="limit"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="scriptDetailVis"
      width="40%"
      :show-close="false"
      custom-class="assessDialog"
    >
      <div class="own-header">
        <span>脚本详情</span>
        <i class="el-icon-close" @click="scriptDetailVis = false"></i>
      </div>
      <div class="own-body">
        <div class="body-title">
          <span class="title">{{ detail.name }}</span>
          <span class="time">{{ detail.createTime }}</span>
        </div>
        <div class="body-info">
          <div>
            <span class="time">编码：</span>
            <span class="infomation">{{ detail.code }}</span>
          </div>
          <div>
            <span class="time">总时间：</span>
            <span class="infomation">{{ detail.trainingTime }}分钟</span>
          </div>
          <div>
            <span class="time">燃烧场景：</span>
            <span class="infomation">{{ detail.burningScene }}</span>
          </div>
        </div>
        <div class="time plc">描述：</div>
        <div class="plc-detail">
          <p class="plc-content">{{ detail.description }}</p>
        </div>
      </div>
      <div class="foot">
        <div class="sure" @click="scriptDetailVis = false">关闭</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TrainingFiles",
  components: {},
  data() {
    return {
      value: "",
      scriptName: "",
      state: "",
      tableData: [],
      total: 0,
      limit: 12,
      scriptDetailVis: false, // 脚本详情
      assessVisible: true,
      pageNum: 1,
      code: "burning-scene",
      dropList: [],
      detail: "",
      loading: true
    };
  },
  created() {
    this.getOptions();
    this.getScript();
  },
  methods: {
    getScript() {
      let formdata = new FormData();
      formdata.append("burningSceneId", this.state);
      formdata.append("limit", this.limit);
      formdata.append("offset", this.pageNum);
      formdata.append("scriptName", this.scriptName);
      this.axios({
        url: "/dah-training-api/script/selectByPage",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          this.loading = false;
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
          this.tableData.map((item, index) => {
            item.no = index + 1 + (res.data.data.pageNum - 1) * this.limit;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取燃烧场景
    getOptions() {
      this.axios({
        method: "POST",
        url: `/dah-training-api/wordbook/select?code=${this.code}`,
      })
        .then((res) => {
          this.dropList = res.data.data;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 点击某一行
    readDetail(row) {
      let formdata = new FormData();
      formdata.append("scriptId", row.id);
      this.axios({
        url: "/dah-training-api/script/selectOne",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          this.scriptDetailVis = true;
          this.detail = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 同不
    synchronization() {
      this.$confirm("此操作将同步脚本信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.axios({
            url: "/dah-training-api/script/syncScript",
            method: "POST",
          })
            .then((res) => {
              if (res.data.data) {
                this.loading = false;
                this.$message({
                  message: "同步成功",
                  type: "success",
                });
                this.getScript();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: err.message,
                type: "warning",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消同步",
          });
        });
    },
    // 修改燃烧场景
    optionChange(op) {
      this.state = op;
    },
  },
};
</script>

<style lang="less">
.filescript {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgb(242, 243, 248);
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
      color: #7c8de7;
    }
  }
  .files-content {
    width: 100%;
    background: white;
    border-radius: 5px;
    overflow-x: hidden;
    // height: 750px;
    display: flex;
    flex-direction: column;
    flex: 1;
    .content-top {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      border-bottom: 1px solid rgb(235, 237, 242);
    }
    .content-search {
      width: 100%;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      align-items: center;
      .left-search {
        width: 50%;
        height: 100%;
      }
      .search-time {
        display: inline-block;
        border-radius: 5px;
        border: 1px solid rgb(235, 237, 242);
        margin-right: 15px;
        .time-title {
          display: inline-block;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          border-right: 1px solid rgb(235, 237, 242);
        }
        .el-input__prefix {
          display: none;
        }
        .el-input__inner {
          border: none;
          height: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
      .input-box {
        width: 300px;
      }
      .search-btn {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        background: rgb(84, 114, 234);
        border-radius: 5px;
        font-size: 14px;
        padding: 0 15px;
        color: white;
      }
      .search-btn:hover {
        background: rgba(84, 114, 234, 0.8);
        cursor: pointer;
      }
    }
    .content-table {
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-x: hidden;
      .tablebox {
        width: 100%;
        display: flex;
        flex: 1;
        overflow-x: hidden;
      }
      .descript {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .footpage {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

  .assessDialog {
    border-radius: 5px;
    overflow: hidden;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
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
      .body-title {
        display: flex;
        align-items: flex-end;
        .title {
          font-weight: 600;
          color: #333;
          margin-right: 20px;
        }
      }
      .time {
        color: #999;
        font-size: 13px;
      }
      .body-info {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        div {
          margin-right: 20px;
        }
      }
      .infomation {
        color: #333;
        font-size: 14px;
      }
      .body-desc {
        display: flex;
        align-items: flex-start;
        .time {
          width: 45px;
          height: 100%;
        }
      }
      .plc-detail {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #eee;
        padding: 15px;
        .plc-content {
          margin-bottom: 10px;
        }
      }
    }
    .plc {
      width: 100%;
      height: 40px;
      line-height: 40px;
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
      .sure {
        background: rgb(84, 114, 234);
        color: white;
        margin-left: 15px;
      }
      .sure:hover {
        cursor: pointer;
      }
      .cancel {
        color: rgb(84, 114, 234);
        background: white;
      }
      .cancel:hover {
        background: rgb(84, 114, 234);
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
