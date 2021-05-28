<!-- 基地物资--基地物资--基地物资--基地物资--基地物资--基地物资--基地物资 -->
<template>
  <div class="video-deploy">
    <div class="location">
      <img src="@/assets/image/u974.svg" alt="" />
      <div class="directory1">视频配置</div>
      <!-- <div class="directory2">视频详情</div> -->
    </div>
    <div class="bg-f" style="height: calc(100vh - 120px); padding: 0 20px">
      <div
        style="height: 40px; border-bottom: 1px solid #f5f5f5"
        class="flex flex-ac"
      >
        视频配置列表
      </div>
      <div class="flex flex-jb" style="margin-top: 20px">
        <div class="flex">
          <div class="search-part" style="margin-right: 20px">
            <el-input
              v-model="searchMsg"
              placeholder="请输入监控场所名称/代码"
            ></el-input>
          </div>
          <div class="search-btn" @click="goSearch">查 询</div>
        </div>
        <div class="search-btn" @click="showPop(false)">
          <i class="el-icon-plus"></i>
          新建
        </div>
      </div>
      <div class="" style="height: calc(100vh - 290px); margin-top: 19px">
        <el-table
          class="hide"
          :data="listMsg"
          border
          @row-click="rowHandle"
          style="width: 100%; height: calc(100vh - 290px); overflow-y: scroll"
        >
          <el-table-column prop="no" label="#" width="100"> </el-table-column>
          <el-table-column prop="monitoringPlaceName" label="监控场所名称">
          </el-table-column>
          <el-table-column prop="monitoringPlaceCode" label="监控场所代码">
          </el-table-column>
          <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <i
                @click.stop="showPop(scope.row)"
                style="font-size: 20px; margin-left: 10px"
                class="el-icon-edit"
              ></i>
              <i
                @click.stop="deleteMsg(scope.row.id)"
                style="font-size: 20px; margin-left: 10px"
                class="el-icon-delete"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex flex-ac flex-drr" style="height: 50px">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="page"
          @current-change="currentCag"
          :page-size="limit"
          :total="total"
        >
        </el-pagination>
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
            <span style="font-size: 15px">{{ popName }}</span>
            <i
              @click="hidePop"
              class="el-icon-close"
              style="cursor: pointer"
            ></i>
          </div>
          <div style="width: 100%; padding: 15px">
            <div class="search-part" style="padding-right: 20px; margin: 10px 0">
              <div class="label-title">
                <span style="color: #ff0000; font-size: 14px">*</span
                >监控场所名称:
              </div>

              <el-input
                placeholder="请输入监控场所名称"
                v-model="videoName"
                class="input-group"
              >
              </el-input>
            </div>
            <div class="search-part" style="padding-right: 20px;">
              <div class="label-title">
                <span style="color: #ff0000; font-size: 14px">*</span
                >监控场所代码:
              </div>
              <el-input
                placeholder="请输入监控场所代码"
                v-model="videoCode"
                class="input-group"
              >
              </el-input>
            </div>
            <div class="flex flex-dc">
              <span style="min-width: 100px; margin: 10px 0">备注</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="videoRemark"
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
      page: 1,
      listMsg: [],
      total: 0,
      searchMsg: "",
      popName: "",
      videoRemark: "",
      videoCode: "",
      videoName: "",
      listItemID: {},
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mounted() {
    this.getMessage();
  },
  //方法集合
  methods: {
    // 视频详情
    rowHandle(row) {
      sessionStorage.setItem("videoDetail", JSON.stringify(row));
      this.$router.push("/videodetail");
    },
    deleteMsg(e) {
      // console.log(e)
      this.$confirm(
        "此操作将删除该数据及其下属摄像头，请确认是否删除",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          this.deletePost(e);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
            duration: 1000,
          });
        });
    },
    async deletePost(e) {
      let data = await this.$post("/dah-training-api/video/deleteVideoDevice", {
        id: e,
      });
      if (data.code === 200) {
        this.$message({
          type: "success",
          message: "已成功删除！",
          duration: 1000,
        });
        this.page = 1;
        this.getMessage(this.searchMsg);
      }
    },
    async addVideoSure() {
      if (!this.videoCode || !this.videoName) {
        this.$message({
          message: "警告，必填项未输入！",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.videoName.length > 50 || this.videoCode.length > 50) {
        this.$message({
          message: "警告，输入长度过长，最多50字！",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.videoCode) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.videoName)
      ) {
        this.$message({
          message: "不能输入特殊字符,如:？#%￥&(){}<>《》等",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let params = {
        monitoringPlaceCode: this.videoCode,
        monitoringPlaceName: this.videoName,
        remarks: this.videoRemark,
      };
      let data = await this.$post(
        "/dah-training-api/video/addVideoDevice",
        params
      );
      if (data.code === 200) {
        this.popStatus = false;
        this.page = 1;
        this.getMessage(this.searchMsg);
        this.$message({
          message: "恭喜你，成功新建监控",
          type: "success",
          duration: 1000,
        });
      }
    },
    async changeVideoSure() {
      if (!this.videoCode || !this.videoName) {
        this.$message({
          message: "警告，必填项未输入！",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.videoName.length > 50 || this.videoCode.length > 50) {
        this.$message({
          message: "警告，输入长度过长，最多50字！",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.videoCode) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.videoName)
      ) {
        this.$message({
          message: "不能输入特殊字符,如:？#%￥&(){}<>《》等",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      let params = {
        id: this.listItemID,
        monitoringPlaceCode: this.videoCode,
        monitoringPlaceName: this.videoName,
        remarks: this.videoRemark,
      };
      let data = await this.$post(
        "/dah-training-api/video/updateVideoDevice",
        params
      );
      // console.log(data)
      if (data.code === 200) {
        this.popStatus = false;
        this.page = 1;
        this.getMessage(this.searchMsg);
        this.$message({
          message: "恭喜你，成功修改监控场所信息",
          type: "success",
          duration: 1000,
        });
      }
    },
    allSure() {
      if (this.popName === "编辑监控场所") {
        this.changeVideoSure();
      } else {
        this.addVideoSure();
      }
    },
    goSearch() {
      this.page = 1;
      this.getMessage(this.searchMsg);
    },
    async getMessage(search = "") {
      let params = {
        limit: this.limit,
        offset: this.page,
        searchField: search,
      };
      let data = await this.$post(
        "/dah-training-api/video/selectVideoByPage",
        params
      );
      if (data.code === 200) {
        data.data.list.map((item, index) => {
          item.no = index + 1 + (data.data.pageNum - 1) * this.limit;
        });
        this.listMsg = data.data.list;
        this.total = data.data.total;
      } else {
        console.log(data);
      }
    },
    hidePop() {
      this.popStatus = false;
    },
    showPop(e) {
      this.popStatus = true;
      if (e) {
        this.listItemID = e.id;
        // console.log(e)
        this.videoCode = e.monitoringPlaceCode;
        this.videoName = e.monitoringPlaceName;
        this.videoRemark = e.remarks;
        this.popName = "编辑监控场所";
      } else {
        this.popName = "新建监控场所";
        this.videoCode = "";
        this.videoName = "";
        this.videoRemark = "";
      }
    },
    currentCag(e) {
      this.page = e;
      this.getMessage(this.searchMsg);
    },
  },
};
</script>
<style lang="less">
@import url("../../assets/css/index.css");

.video-deploy {
  .bg-f {
    background: #fff;
  }
  .location {
    width: 100%;
    display: flex;
    height: 40px;
    align-items: center;
    font-size: 12px;
    flex-shrink: 0;
  }
  .search-part {
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgb(235, 237, 242);
    overflow: hidden;
    .label-title {
      width: 170px;
      height: 30px;
      line-height: 30px;
      text-align: center;
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
  img {
    margin-right: 10px;
  }
  .directory1 {
    padding-right: 10px;
    /* border-right: 1px solid; */
  }

  .flex > .el-input__inner {
    height: 30px;
  }
  .modal-item {
    overflow: hidden;
    width: 100%;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 3px;
    display: flex;
    margin-bottom: 20px;
    > .el-input__inner {
      border: none !important;
    }
  }

  .hide::-webkit-scrollbar {
    display: none;
  }

  .w80 {
    width: 80px;
  }

  .input-group .el-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
