<!-- 基地物资--基地物资--基地物资--基地物资--基地物资--基地物资--基地物资 -->
<template>
  <div>
    <!-- <div style="height: 40px" class="flex flex-ac font-14">
      <span>信息管理</span><span style="margin: 0 10px">|</span
      ><span class="cor-blue">基地物资</span>
    </div> -->
    <div class="location">
      <img src="../../assets/image/u974.svg" alt="" />
      <div class="directory1">信息管理</div>
      <div class="directory2">基地物资</div>
    </div>
    <div class="bg-f" style="height: calc(100vh - 120px); padding: 0 20px">
      <div
        style="height: 40px; border-bottom: 1px solid #f5f5f5"
        class="flex flex-ac"
      >
        基地物资列表
      </div>
      <div class="flex flex-jb" style="margin-top: 20px">
        <div class="flex">
          <div class="search-part" style="margin-right: 20px">
            <div class="label-title">物资类型</div>
            <el-select
              style=""
              @change="searchEquipType"
              v-model="equipTypeValue"
              placeholder="请选择物资类型"
              clearable
            >
              <el-option key="0" label="全部" :value="0"> </el-option>
              <el-option
                v-for="item in equipTypeMsg"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search-part" style="margin-right: 20px">
            <el-input
              v-model="serachName"
              style="margin-left: 20px"
              placeholder="请输入物资名称"
            ></el-input>
          </div>
          <div class="search-btn" @click="serachFn">查 询</div>
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
          style="width: 100%; height: calc(100vh - 290px); overflow-y: scroll"
        >
          <el-table-column prop="no" label="#" width="80"> </el-table-column>
          <el-table-column prop="name" label="物资名称"
              show-overflow-tooltip> </el-table-column>
          <el-table-column prop="suppliesType" label="物资类型">
          </el-table-column>
          <el-table-column prop="measureUnit" label="计量单位">
          </el-table-column>
          <el-table-column prop="number" label="数量"> </el-table-column>
          <el-table-column prop="storageLocation" label="存放地点"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="updateUserName" label="创建人">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160">
          </el-table-column>
          <el-table-column prop="updateUserName" label="修改人">
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="160">
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <i
                @click="showPop(scope.row)"
                style="font-size: 20px; margin-left: 10px"
                class="el-icon-edit"
              ></i>
              <i
                @click="deleteMsg(scope.row.id)"
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
            <span style="font-size: 16px">{{
              popValue ? "编辑物资" : "新增物资"
            }}</span>
            <i @click="hidePop" class="el-icon-close"></i>
          </div>
          <div
            class="flex flex-dc flex-ja"
            style="height: 350px; border-bottom: 1px solid #f5f5f5"
          >
            <div class="flex flex-ac" style="padding: 0 20px">
              <div
                style="
                  min-width: 100px;
                  height: 100%;
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                "
                class="flex flex-ac flex-jc"
              >
                <span style=""
                  ><span style="color: #ff0000">*</span>物资名称</span
                >
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="materialName"
                @blur="
                  () => {
                    if (materialName.length > 50) {
                      this.$message.warning('字段长度不符');
                      this.materialName = '';
                    }
                  }
                "
              >
              </el-input>
            </div>
            <div class="flex flex-ac" style="padding: 0 20px">
              <div
                style="
                  min-width: 100px;
                  height: 100%;
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                "
                class="flex flex-ac flex-jc"
              >
                <span style=""
                  ><span style="color: #ff0000">*</span>物资类型</span
                >
              </div>
              <el-select
                style="width: calc(100% - 100px)"
                v-model="materialSuppliesTypeId"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in equipTypeMsg"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="flex flex-ac" style="padding: 0 20px">
              <div
                style="
                  min-width: 100px;
                  height: 100%;
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                "
                class="flex flex-ac flex-jc"
              >
                <span style=""
                  ><span style="color: #ff0000">*</span>计量单位</span
                >
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="materialMeasureUnit"
                @blur="
                  () => {
                    if (materialMeasureUnit.length > 50) {
                      this.$message.warning('字段长度不符');
                      this.materialMeasureUnit = '';
                    }
                  }
                "
              >
              </el-input>
            </div>
            <div class="flex flex-ac" style="padding: 0 20px">
              <div
                style="
                  min-width: 100px;
                  height: 100%;
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                "
                class="flex flex-ac flex-jc"
              >
                <span style=""
                  ><span style="color: #ff0000">*</span>物资数量</span
                >
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="materialNumber"
                @blur="
                  () => {
                    if (
                      !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                        materialNumber
                      ) &&
                      materialNumber !== ''
                    ) {
                      this.$message.warning('输入数据类型不符,请输入数字');
                      this.materialNumber = '';
                    }
                    if (materialNumber.length > 50) {
                      this.$message.warning('字段长度不符');
                      this.materialNumber = '';
                    }
                  }
                "
              >
              </el-input>
            </div>
            <div class="flex flex-ac" style="padding: 0 20px">
              <div
                style="
                  min-width: 100px;
                  height: 100%;
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                "
                class="flex flex-ac flex-jc"
              >
                <span style=""
                  ><span style="color: #ff0000">*</span>存放地点</span
                >
              </div>

              <el-input
                placeholder="请输入内容"
                v-model="materialStorageLocation"
                @blur="
                  () => {
                    if (materialStorageLocation.length > 50) {
                      this.$message.warning('字段长度不符');
                      this.materialStorageLocation = '';
                    }
                  }
                "
              >
              </el-input>
            </div>
          </div>
          <div
            style="height: 50px; padding: 0 20px"
            class="flex flex-ac flex-drr font-18"
          >
            <div
              @click="changeSure"
              style="
                width: 80px;
                height: 35px;
                border-radius: 5px;
                margin-left: 20px;
                border: 1px solid rgba(84, 114, 234, 1);
                font-size: 14px;
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
      equipTypeMsg: [],
      equipTypeValue: "",
      serachName: "",
      limit: 12,
      page: 1,
      total: 0,
      listMsg: [],
      popValue: true,
      materialId: "",
      materialMeasureUnit: "",
      materialName: "",
      materialNumber: "",
      materialStorageLocation: "",
      materialSuppliesTypeId: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getOptionClass();
    this.getMessageList();
  },
  //方法集合
  methods: {
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
      let data = await this.$post("/dah-training-api/supplies/deleteSupplies", {
        suppliesId: e,
      });
      if (data.code === 200) {
        this.$message({
          type: "success",
          message: "已成功删除！",
        });
        this.page = 1;
        this.getMessageList();
      }
    },
    async changeMessage() {
      let params = {
        id: this.materialId,
        measureUnit: this.materialMeasureUnit,
        name: this.materialName,
        number: this.materialNumber,
        storageLocation: this.materialStorageLocation,
        suppliesTypeId: this.materialSuppliesTypeId,
        dataType: 1,
      };
      for (const key in params) {
        if (
          !params[key] &&
          key != "equipmentUse" &&
          key != "model" &&
          key != "id"
        ) {
          this.$message({
            message: "警告，必填项未输入！",
            type: "warning",
          });
          return;
        }
      }
      if (
        this.materialName.length > 50 ||
        this.materialNumber.length > 50 ||
        this.materialStorageLocation.length > 50 ||
        this.materialMeasureUnit.length > 50
      ) {
        this.$message({
          message: "警告，超出最长长度,最长限50！",
          type: "warning",
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.materialName) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.materialStorageLocation) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.materialMeasureUnit) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.materialNumber)
      ) {
        this.$message({
          message: "警告，不能包含特殊字符！",
          type: "warning",
        });
        return;
      }
      let data = await this.$post(
        "/dah-training-api/supplies/updateSupplies",
        params
      );
      if (data.code === 200) {
        this.$message({
          message: "恭喜你，修改成功！",
          type: "success",
        });
        this.popStatus = false;
        this.getMessageList();
      } else {
        this.$message({
          message: data.message,
          type: "warning",
        });
      }
    },
    async addMessage() {
      let params = {
        measureUnit: this.materialMeasureUnit,
        name: this.materialName,
        number: this.materialNumber,
        storageLocation: this.materialStorageLocation,
        suppliesTypeId: this.materialSuppliesTypeId,
        dataType: 1,
      };
      for (const key in params) {
        if (
          !params[key] &&
          key != "equipmentUse" &&
          key != "model" &&
          key != "id"
        ) {
          this.$message({
            message: "警告，必填项未输入！",
            type: "warning",
          });
          return;
        }
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.materialName) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.storageLocation) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.measureUnit) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.materialNumber)
      ) {
        this.$message({
          message: "警告，不能包含特殊字符！",
          type: "warning",
        });
        return;
      }
      let data = await this.$post(
        "/dah-training-api/supplies/insertSupplies",
        params
      );
      if (data.code === 200) {
        this.$message({
          message: "恭喜你，添加成功！",
          type: "success",
        });
        this.popStatus = false;
        this.getMessageList();
      } else {
        this.$message({
          message: data.message,
          type: "warning",
        });
      }
    },
    changeSure() {
      if (this.popValue) {
        this.changeMessage();
      } else {
        this.addMessage();
      }
    },
    async getMessageList() {
      let params = {
        limit: this.limit,
        offset: this.page,
        name: this.serachName,
        suppliesTypeId: this.equipTypeValue ? this.equipTypeValue : "",
        dataType: 1,
      };
      let data = await this.$post(
        "/dah-training-api/supplies/selectByPage",
        params
      );
      this.listMsg = data.data.list;
      this.listMsg.forEach((item, index) => {
        item.no = index + 1 + (data.data.pageNum - 1) * this.limit;
      });
      this.total = data.data.total;
    },
    serachFn() {
      this.page = 1;
      this.getMessageList();
    },
    searchEquipType() {
      this.page = 1;
      this.getMessageList();
    },
    hidePop() {
      this.popStatus = false;
    },
    showPop(e) {
      this.popValue = e ? true : false;
      this.popStatus = true;
      if (e) {
        this.materialId = e.id;
        this.materialMeasureUnit = e.measureUnit;
        this.materialName = e.name;
        this.materialNumber = e.number;
        this.materialStorageLocation = e.storageLocation;
        this.materialSuppliesTypeId = e.suppliesTypeId;
      } else {
        this.materialMeasureUnit = "";
        this.materialName = "";
        this.materialNumber = "";
        this.materialStorageLocation = "";
        this.materialSuppliesTypeId = "";
      }
    },
    currentCag(e) {
      this.page = e;
      this.getMessageList();
    },
    async getOptionClass() {
      let data = await this.$post("/dah-training-api/wordbook/select", {
        code: "supplies-type",
      });
      this.equipTypeMsg = data.data;
      console.log(data);
      //   let datas = await this.$post("/dah-training-api/wordbook/select", {
      //     code: "equipment-type",
      //   });
    },
  },
};
</script>
<style lang="less" >
@import url("../../assets/css/index.css");
.bg-f {
  background: #fff;
}

.flex > .el-input__inner {
  height: 30px;
}
.hide::-webkit-scrollbar {
  display: none;
}
.w80 {
  width: 80px;
}
.search-part {
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgb(235, 237, 242);
  overflow: hidden;
  .label-title {
    width: 90px;
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
.location {
  display: flex;
  height: 40px;
  align-items: center;
  font-size: 12px;
}
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
</style>
