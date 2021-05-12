<!-- 基地装备--基地装备--基地装备--基地装备--基地装备--基地装备--基地装备 -->
<template>
  <div>
    <div class="location">
      <img src="../../assets/image/u974.svg" alt="" />
      <div class="directory1">信息管理</div>
      <div class="directory2">基地装备</div>
    </div>
    <div class="bg-f" style="padding: 0 20px">
      <div
        style="height: 40px; border-bottom: 1px solid #f5f5f5"
        class="flex flex-ac"
      >
        基地装备列表
      </div>
      <div class="flex flex-jb" style="margin-top: 20px">
        <div class="flex">
          <div class="flex">
            <div
              class="aaa flex flex-ac flex-jc font-14 cor-6"
              style="
                width: 100px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
              "
            >
              装备类型
            </div>
            <el-select
              style=""
              @change="searchEquipType"
              v-model="equipTypeValue"
              placeholder="请选择装备类型"
            >
              <el-option key="0" label="全部" :value="''"> </el-option>
              <el-option
                v-for="item in equipTypeMsg"
                :key="item.id"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <el-input
            v-model="serachName"
            style="width: 300px; margin-left: 20px"
            placeholder="请输入内容"
          ></el-input>
          <div
            @click="serachFn"
            class="flex flex-ac bg-blue cor-f"
            style="padding: 0 30px; border-radius: 5px; margin-left: 20px"
          >
            <span>查询</span>
          </div>
        </div>
        <div
          @click="showPop(false)"
          class="flex flex-ac bg-blue cor-f"
          style="padding: 0 30px; border-radius: 5px"
        >
          <span>＋ 新建</span>
        </div>
      </div>
      <div class="" style="margin-top: 19px">
        <el-table class="hide" :data="listMsg" border style="width: 100%">
          <el-table-column prop="no" label="#" width="80"> </el-table-column>
          <el-table-column prop="equipmentName" label="装备名称">
          </el-table-column>
          <el-table-column prop="type" label="装备类型"> </el-table-column>
          <el-table-column prop="unitMeasurement" label="计量单位">
          </el-table-column>
          <el-table-column prop="numberEquipment" label="数量">
          </el-table-column>
          <el-table-column prop="storageLocation" label="存放地点">
          </el-table-column>
          <el-table-column prop="model" label="规格型号"> </el-table-column>
          <el-table-column prop="equipmentUse" label="装备用途">
          </el-table-column>
          <el-table-column prop="updateUserName" label="创建人">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160">
          </el-table-column>
          <el-table-column prop="updateUserName" label="修改人">
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="160">
          </el-table-column>
          <el-table-column prop="" label="操作">
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
      <div class="flex flex-ac flex-drr" style="height: 80px">
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
              popValue ? "编辑装备" : "新增装备"
            }}</span>
            <i @click="hidePop" class="el-icon-close"></i>
          </div>
          <div
            class="flex flex-dc flex-ja"
            style="height: 400px; border-bottom: 1px solid #f5f5f5"
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
                  ><span style="color: #ff0000">*</span>装备名称</span
                >
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="changeItemMsgequipmentName"
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
                  ><span style="color: #ff0000">*</span>装备类型</span
                >
              </div>
              <el-select
                style="width: calc(100% - 100px)"
                v-model="changeItemMsgtype"
                placeholder="请选择"
                @change="detailOption"
              >
                <el-option
                  v-for="item in equipTypeMsg"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value"
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
                v-model="changeItemMsgunitMeasurement"
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
                  ><span style="color: #ff0000">*</span>装备数量</span
                >
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="changeItemMsgnumberEquipment"
                @blur="
                  () => {
                    if (
                      !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                        changeItemMsgnumberEquipment
                      ) &&
                      changeItemMsgnumberEquipment !== ''
                    ) {
                      this.$message.warning('输入数据类型不符,请输入数字');
                      this.changeItemMsgnumberEquipment = '';
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
                v-model="changeItemMsgstorageLocation"
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
                  ><span style="color: #ff0000; opacity: 0">*</span
                  >规格型号</span
                >
              </div>
              <el-input placeholder="请输入内容" v-model="changeItemMsgmodel">
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
                  ><span style="color: #ff0000; opacity: 0">*</span
                  >装备用途</span
                >
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="changeItemMsgequipmentUse"
              >
              </el-input>
            </div>
          </div>
          <div
            style="height: 60px; padding: 0 20px"
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
      equipTypeMsg: [],
      popStatus: false,
      equipTypeValue: "",
      detailOptionValue: "请选择装备类型",
      listMsg: [],
      limit: 12,
      page: 1,
      total: 0,
      changeItemMsg: {},
      serachName: "",
      popValue: true,
      changeItemMsgequipmentName: "",
      changeItemMsgtype: "",
      changeItemMsgunitMeasurement: "",
      changeItemMsgnumberEquipment: "",
      changeItemMsgstorageLocation: "",
      changeItemMsgmodel: "",
      changeItemMsgequipmentUse: "",
      changeItemMsgid: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getOptionClass();
    this.getMessageList();
  },
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
      let data = await this.$post(
        "/dah-training-api/baseEquipment/deleteBaseEquipment",
        { id: e }
      );
      if (data.code === 200) {
        this.$message({
          type: "success",
          message: "已成功删除！",
          duration:1000
        });
        this.page = 1;
        this.getMessageList();
      }
    },
    async getMessageList() {
      let params = {
        limit: this.limit,
        offset: this.page,
        equipmentName: this.serachName,
        dataType: 1,
        equipmentType:this.equipTypeValue,
      };
      let data = await this.$post(
        "/dah-training-api/baseEquipment/selectBaseEquipment",
        params
      );
      this.listMsg = data.data.list;
      this.listMsg.forEach((item, index) => {
        item.no = index + 1 + (data.data.pageNum - 1) * this.limit;
      });
      this.total = data.data.total;
    },
    async addMessage() {
      let params = {
        equipmentName: this.changeItemMsgequipmentName,
        type: this.changeItemMsgtype,
        unitMeasurement: this.changeItemMsgunitMeasurement,
        numberEquipment: this.changeItemMsgnumberEquipment,
        storageLocation: this.changeItemMsgstorageLocation,
        model: this.changeItemMsgmodel,
        equipmentUse: this.changeItemMsgequipmentUse,
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
        this.changeItemMsgequipmentName.length > 50 ||
        this.changeItemMsgunitMeasurement.length > 50 ||
        this.changeItemMsgnumberEquipment.length > 50 ||
        this.changeItemMsgstorageLocation.length > 50 ||
        this.changeItemMsgequipmentUse.length > 50 ||
        this.changeItemMsgmodel.length > 50
      ) {
        this.$message({
          message: "警告，超出最长长度,最长限50！",
          type: "warning",
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgequipmentName
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgunitMeasurement
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgnumberEquipment
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgstorageLocation
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgequipmentUse
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.changeItemMsgmodel)
      ) {
        this.$message({
          message: "警告，不能包含特殊字符！",
          type: "warning",
        });
        return;
      }
      let data = await this.$post(
        "/dah-training-api/baseEquipment/addBaseEquipment",
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
    async changeMessage() {
      let params = {
        equipmentName: this.changeItemMsgequipmentName,
        type: this.changeItemMsgtype,
        unitMeasurement: this.changeItemMsgunitMeasurement,
        numberEquipment: this.changeItemMsgnumberEquipment,
        storageLocation: this.changeItemMsgstorageLocation,
        model: this.changeItemMsgmodel,
        equipmentUse: this.changeItemMsgequipmentUse,
        id: this.changeItemMsgid,
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
        this.changeItemMsgequipmentName.length > 50 ||
        this.changeItemMsgunitMeasurement.length > 50 ||
        this.changeItemMsgnumberEquipment.length > 50 ||
        this.changeItemMsgstorageLocation.length > 50 ||
        this.changeItemMsgequipmentUse.length > 50 ||
        this.changeItemMsgmodel.length > 50
      ) {
        this.$message({
          message: "警告，超出最长长度,最长限50！",
          type: "warning",
        });
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgequipmentName
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgunitMeasurement
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgnumberEquipment
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgstorageLocation
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.changeItemMsgequipmentUse
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.changeItemMsgmodel)
      ) {
        this.$message({
          message: "警告，不能包含特殊字符！",
          type: "warning",
        });
        return;
      }
      let data = await this.$post(
        "/dah-training-api/baseEquipment/updateBaseEquipment",
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
    changeSure() {
      if (this.popValue) {
        this.changeMessage();
      } else {
        this.addMessage();
      }
    },
    detailOption(e) {
      console.log(e);
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
      if (e) {
        this.changeItemMsgequipmentName = e.equipmentName;
        this.changeItemMsgtype = e.type;
        this.changeItemMsgunitMeasurement = e.unitMeasurement;
        this.changeItemMsgnumberEquipment = e.numberEquipment;
        this.changeItemMsgstorageLocation = e.storageLocation;
        this.changeItemMsgmodel = e.model;
        this.changeItemMsgequipmentUse = e.equipmentUse;
        this.changeItemMsgid = e.id;
      } else {
        this.changeItemMsgequipmentName = "";
        this.changeItemMsgtype = "";
        this.changeItemMsgunitMeasurement = "";
        this.changeItemMsgnumberEquipment = "";
        this.changeItemMsgstorageLocation = "";
        this.changeItemMsgmodel = "";
        this.changeItemMsgequipmentUse = "";
      }
      this.popStatus = true;
    },
    async getOptionClass() {
      let data = await this.$post("/dah-training-api/wordbook/select", {
        code: "equipment-type",
      });
      this.equipTypeMsg = data.data;
    },
    currentCag(e) {
      this.page = e;
      this.getMessageList();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
};
</script>
<style scoped>
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
