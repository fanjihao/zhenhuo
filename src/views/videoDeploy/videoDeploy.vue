<!-- 基地物资--基地物资--基地物资--基地物资--基地物资--基地物资--基地物资 -->
<template>
  <div>
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
          <el-input
            v-model="searchMsg"
            style="width: 300px"
              size="small"
            placeholder="请输入监控场所名称/代码"
          ></el-input>
          <div
            @click="goSearch"
            class="flex flex-ac bg-blue cor-f"
            style="padding: 0 20px; border-radius: 5px; margin-left: 20px;height:32px;"
          >
            <span>查询</span>
          </div>
        </div>
        <div
          @click="showPop(false)"
          class="flex flex-ac bg-blue cor-f"
          style="padding: 0 20px; border-radius: 5px"
              size="small"
        >
          <span>＋ 新建</span>
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
          <el-table-column prop="remarks" label="备注"> </el-table-column>

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
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
        "
        class="flex flex-ac flex-jc"
      >
        <div
          style="
            width: 40%;
            background-color: #fff;
            border-radius: 5px;
            overflow: hidden;
          "
          class=""
        >
          <div
            style="height: 50px; padding: 0 20px"
            class="flex flex-ac flex-jb font-30 bg-blue cor-f"
          >
            <span class="font-20">{{ popName }}</span>
            <i @click="hidePop" class="el-icon-close" style="cursor: pointer;"></i>
          </div>
          <div style="width: 100%; padding: 15px">
            <div class="modal-item">
              <span
                style="
                  display: inline-block;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  width: 25%;
                  border-right: 1px solid #eee;
                "
                ><span style="color: #ff0000">*</span>监控场所名称</span
              >
              <el-input placeholder="请输入监控场所名称" v-model="videoName">
              </el-input>
            </div>
            <div class="modal-item">
              <span
                style="
                  display: inline-block;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  width: 25%;
                  border-right: 1px solid #eee;
                "
                ><span style="color: #ff0000">*</span>监控场所代码</span
              >
              <el-input placeholder="请输入监控场所代码" v-model="videoCode">
              </el-input>
            </div>
            <div class="flex flex-dc">
              <span style="min-width: 100px; margin-bottom: 10px">备注</span>
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
                width: 80px;
                height: 35px;
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
                width: 80px;
                height: 35px;
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
          duration:1000
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
          duration:1000
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
          duration:1000
        });
        return;
      }
      if (this.videoName.length > 50 || this.videoCode.length > 50) {
        this.$message({
          message: "警告，输入长度过长，最多50字！",
          type: "warning",
          duration:1000
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
          duration:1000
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
          duration:1000
        });
      }
    },
    async changeVideoSure() {
      if (!this.videoCode || !this.videoName) {
        this.$message({
          message: "警告，必填项未输入！",
          type: "warning",
          duration:1000
        });
        return;
      }
      if (this.videoName.length > 50 || this.videoCode.length > 50) {
        this.$message({
          message: "警告，输入长度过长，最多50字！",
          type: "warning",
          duration:1000
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
          duration:1000
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
          duration:1000
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
<style lang="less" scoped>
@import url("../../assets/css/index.css");

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
</style>
