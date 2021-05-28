<!-- 基地物资--基地物资--基地物资--基地物资--基地物资--基地物资--基地物资 -->
<template>
  <div class="video-detail">
    <div class="location">
      <img src="@/assets/image/u974.svg" alt="" />
      <div class="directory1" @click="goPage()">视频配置</div>
      <div class="directory2">视频详情</div>
    </div>
    <div class="bg-f" style="padding: 20px">
      <div
        style="height: 40px; width: 100%; display: flex; align-items: center"
        class="flex flex-ac"
      >
        <p
          style="
            font-size: 20px;
            font-weight: 700;
            color: #48465b;
            margin-right: 30px;
          "
        >
          {{ detailData.monitoringPlaceName }}
        </p>
        <p style="font-size: 14px; color: #646c9a">
          监控场所代码：<span style="color: #333">{{
            detailData.monitoringPlaceCode
          }}</span>
        </p>
      </div>
      <div
        style="
          width: 100%;
          font-size: 14px;
          color:#646c9a
          height: 40px;
          line-height: 40px;
        "
      >
        备注：<span style="color: #333">{{ detailData.remarks }}</span>
      </div>
      <div style="width: 100%; height: 810px; position: relative">
        <div
          style="
            width: 100%;
            display: flex;
            height: 40px;
            position: absolute;
            top: 1px;
            left: 0;
            z-index: 9;
          "
        >
          <div class="camera-tab">摄像头</div>
          <!-- <div style="width:91.5%;border-bottom:1px solid #ccc;"></div> -->
        </div>
        <div
          style="
            width: 100%;
            height: 770px;
            border: 1px solid #ccc;
            border-radius: 12px;
            border-top-left-radius: 0px;
            position: absolute;
            bottom: 0;
            left: 0;
          "
        >
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              padding: 15px;
            "
          >
            <div style="width: 40%; display: flex">
              <div class="search-part" style="margin-right: 20px">
                <el-input
                  v-model="cameraName"
                  placeholder="请输入关键字"
                ></el-input>
              </div>
              <div class="search-btn" @click="goSearch">查 询</div>
            </div>
            <div class="search-btn" @click="addnew('add')">
              <i class="el-icon-plus"></i>
              新建
            </div>
          </div>
          <div style="width: 100%; padding: 0 15px">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              height="640"
              highlight-current-row
              element-loading-text="玩命加载中..."
              :header-cell-style="{
                backgroundColor: 'rgb(242,243,248)',
              }"
            >
              <el-table-column prop="no" label="#" width="50">
              </el-table-column>
              <el-table-column prop="cameraName" label="摄像头名称" width="250">
              </el-table-column>
              <el-table-column
                prop="cameraCode"
                label="摄像头代码(SN号)"
                width="250"
              >
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="备注"
                show-overflow-tooltip
                width="400"
              >
              </el-table-column>
              <el-table-column prop="updateTime" label="更新时间" width="250">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="action-icon" @click.stop="addnew(scope.row)">
                    <i class="el-icon-edit"></i>
                  </div>
                  <div
                    class="action-icon"
                    @click.stop="deleteMsg(scope.row.id)"
                  >
                    <i class="el-icon-delete"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="flex flex-ac flex-drr" style="height: 50px">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="pageNum"
              @current-change="currentCag"
              :page-size="limit"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <!-- 修改弹框 -->
      <div
        v-show="popStatus"
        style="
          position: fixed;
          width: 100%;
          height: 100%;
          font-size: 14px;
          z-index: 99;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
        "
        class="flex flex-ac flex-jc"
      >
        <div
          style="
            width: 25%;
            background-color: #fff;
            border-radius: 5px;
            overflow: hidden;
            font-size: 14px;
          "
          class=""
        >
          <div
            style="height: 40px; padding: 0 20px"
            class="flex flex-ac flex-jb font-30 bg-blue cor-f"
          >
            <span style="font-size: 16px">{{ popName }}</span>
            <i @click="hidePop" class="el-icon-close"
              style="cursor: pointer"></i>
          </div>
          <div style="width: 100%; padding: 15px">
            <div class="search-part" style="padding-right: 20px; margin: 10px 0">
              <div class="label-title">
                <span style="color: #ff0000; font-size: 14px">*</span
                >摄像头名称:
              </div>

              <el-input
                placeholder="请输入摄像头名称"
                v-model="modalName"
                class="input-group"
              >
              </el-input>
            </div>
            <div class="search-part" style="padding-right: 20px; margin: 10px 0">
              <div class="label-title">
                <span style="color: #ff0000; font-size: 14px">*</span
                >摄像头SN号:
              </div>
              <el-input
                placeholder="请输入摄像头代码(SN号)"
                v-model="modalCode"
                class="input-group"
              >
              </el-input>
            </div>
            <div class="flex flex-dc">
              <span style="min-width: 100px; margin: 10px 0">备注</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="modalRemarks"
                :autosize="{ minRows: 3, maxRows: 3 }"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </div>
          </div>
          <div
            style="height: 50px; padding: 0 20px"
            class="flex flex-ac flex-drr font-18"
          >
            <div
              @click="allSure"
              style="
                width: 70px;
                height: 30px;
                border-radius: 5px;
                margin-left: 20px;
                border: 1px solid rgba(84, 114, 234, 1);
                font-size: 14px;
                cursor: pointer;
              "
              class="bg-blue cor-f flex flex-ac flex-jc"
            >
              确认
            </div>
            <div
              @click="hidePop"
              style="
                width: 70px;
                height: 30px;
                border-radius: 5px;
                border: 1px solid rgba(84, 114, 234, 1);
                font-size: 14px;
                cursor: pointer;
              "
              class="flex flex-ac flex-jc cor-blue"
            >
              取消
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import QS from "qs";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      input: "",
      popStatus: false,
      limit: 12,
      listMsg: [],
      popName: "",
      listItemID: {},
      detailData: "",
      cameraName: "",
      pageNum: 1,
      total: 0,
      tableData: [],
      modalName: "",
      modalCode: "",
      modalRemarks: "",
      webcamId: "",
    };
  },
  created() {
    this.detailData = JSON.parse(sessionStorage.getItem("videoDetail"));
    this.getCamera();
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mounted() {
    // this.getMessage();
  },
  //方法集合
  methods: {
    getCamera() {
      this.axios({
        url: "/dah-training-api/video/selectWebcamByPage",
        method: "POST",
        data: QS.stringify({
          cameraName: this.cameraName,
          limit: this.limit,
          offset: this.pageNum,
          videoDeviceId: this.detailData.id,
        }),
      })
        .then((res) => {
          res.data.data.list.map((item, index) => {
            item.no = index + 1 + (res.data.data.pageNum - 1) * this.limit;
          });
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentCag(e) {
      this.pageNum = e;
      this.getCamera();
    },
    goSearch() {
      this.pageNum = 1;
      this.getCamera();
    },
    // 视频详modal
    addnew(type) {
      if (type === "add") {
        this.popName = "新增";
        this.modalName = "";
        this.modalCode = "";
        this.modalRemarks = "";
      } else {
        this.popName = "编辑";
        this.modalName = type.cameraName;
        this.modalCode = type.cameraCode;
        this.modalRemarks = type.remarks;
        this.webcamId = type.id;
      }
      this.popStatus = true;
    },
    allSure() {
      if (this.popName === "新增") {
        this.addCamera();
      } else {
        this.editCamera();
      }
    },
    addCamera() {
      if (!this.modalCode || !this.modalName) {
        this.$message({
          message: "警告，必填项未输入！",
          type: "warning",
        });
        return;
      }
      if (this.modalName.length > 50 || this.modalCode.length > 50) {
        this.$message({
          message: "警告，输入长度过长，最多50字！",
          type: "warning",
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.modalCode) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.modalName)
      ) {
        this.$message({
          message: "不能输入特殊字符,如:？#%￥&(){}<>《》等",
          type: "warning",
        });
        return;
      }
      this.axios({
        url: "/dah-training-api/video/addWebcam",
        method: "POST",
        data: QS.stringify({
          cameraCode: this.modalCode,
          cameraName: this.modalName,
          remarks: this.modalRemarks,
          videoDeviceId: this.detailData.id,
        }),
      })
        .then((res) => {
          if (res.data.data) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.popName = "";
            this.popStatus = false;
            this.modalName = "";
            this.modalCode = "";
            this.modalRemarks = "";
            this.getCamera();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "warn",
            message: "添加失败！",
          });
        });
    },
    editCamera() {
      if (!this.modalCode || !this.modalName) {
        this.$message({
          message: "警告，必填项未输入！",
          type: "warning",
        });
        return;
      }
      if (this.modalName.length > 50 || this.modalCode.length > 50) {
        this.$message({
          message: "警告，输入长度过长，最多50字！",
          type: "warning",
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.modalCode) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.modalName)
      ) {
        this.$message({
          message: "不能输入特殊字符,如:？#%￥&(){}<>《》等",
          type: "warning",
        });
        return;
      }
      this.axios({
        url: "/dah-training-api/video/updateWebcam",
        method: "POST",
        data: QS.stringify({
          cameraCode: this.modalCode,
          cameraName: this.modalName,
          remarks: this.modalRemarks,
          webcamId: this.webcamId,
        }),
      })
        .then((res) => {
          if (res.data.data) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.popName = "";
            this.popStatus = false;
            this.modalName = "";
            this.modalCode = "";
            this.modalRemarks = "";
            this.webcamId = "";
            this.getCamera();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "warn",
            message: "编辑失败！",
          });
        });
    },
    deleteMsg(e) {
      // console.log(e)
      this.$confirm("删除将无法找回该数据，请确认是否删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.deletePost(e);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
          });
        });
    },
    async deletePost(e) {
      let data = await this.$post("/dah-training-api/video/delWebcam", {
        webcamId: e,
      });
      if (data.code === 200) {
        this.$message({
          type: "success",
          message: "已成功删除！",
        });
        this.getCamera();
      }
    },
    hidePop() {
      this.popStatus = false;
    },
    goPage() {
      this.$destroy();
      this.$router.push("/videoDeploy");
    },
  },
};
</script>
<style lang="less">
@import url("../../assets/css/index.css");

.video-detail {
  .search-part {
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgb(235, 237, 242);
    overflow: hidden;
    .label-title {
      width: 180px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 14px;
      border-left: none;
      border-top: none;
      border-bottom: none;
      border-right: 1px solid rgb(235, 237, 242);
    }
    .el-input__prefix {
      display: none;
    }
    .el-input__inner {
      border: none;
      height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
  .search-btn {
    display: inline-block;
    height: 30px;
    line-height: 30px;
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
  .bg-f {
    background: #fff;
  }

  .flex > .el-input__inner {
    height: 30px;
  }
  .gutter {
    width: 1px;
  }

  .input-group .el-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .location {
    width: 100%;
    display: flex;
    height: 40px;
    align-items: center;
    font-size: 12px;
    flex-shrink: 0;
  }
  img {
    margin-right: 10px;
  }
  .directory1 {
    padding-right: 10px;
    border-right: 1px solid;
  }
  .directory1:hover {
    color: #7c8de7;
    cursor: pointer;
  }
  .directory2 {
    padding-left: 10px;
    color: #7c8de7;
  }
  .hide::-webkit-scrollbar {
    display: none;
  }
  .camera-tab {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 8%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-bottom-color: white;
    background: white;
  }

  .w80 {
    width: 80px;
  }
  .action-icon {
    display: inline-block;
    cursor: pointer;
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #fff;
  }

  .el-table::before,
  .el-table--border::after {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0 !important;
  }
}
</style>
