<template>
  <div class="out-box">
    <div class="location">
      <img src="../../assets/image/u974.svg" alt="" />
      <div class="directory1">信息管理</div>
      <div class="directory2">应急专家</div>
    </div>
    <div class="content1">
      <div class="content-left">
        <div class="left-title">
          <span>应急专家列表</span>
        </div>
        <div class="left-ctt">
          <div class="search-line">
            <div style="display: flex; align-items: center">
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">所在地区</div>
                <el-select
                  v-model="expertArea"
                  placeholder="请选择"
                  style="width: 150px"
                  clearable
                >
                  <el-option
                    v-for="item in expertAreaList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">专家类型</div>
                <el-select
                  v-model="expertType"
                  placeholder="请选择"
                  style="width: 150px"
                  clearable
                >
                  <el-option
                    v-for="item in expertTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">所属专业</div>
                <el-select
                  v-model="expertSpecialty"
                  placeholder="请选择"
                  style="width: 150px"
                  clearable
                >
                  <el-option
                    v-for="item in expertSpecialtyList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="search-part" style="width: 150px; margin-right: 20px">
                <el-input
                  v-model="expertName"
                  placeholder="请输入专家姓名"
                ></el-input>
              </div>
              <div class="search-btn" @click="getExpertsList">查 询</div>
            </div>
            <div class="search-btn" @click="addTeam">
              <i class="el-icon-plus"></i> 新建
            </div>
          </div>
          <el-table
            :data="expertsList"
            border
            style="width: 100%; overflow-y: auto; margin-bottom: 10px"
            @row-click="rowHandle"
          >
            <el-table-column prop="no" label="#" width="50"> </el-table-column>
            <el-table-column prop="name" label="专家姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="expertType" label="专家类型" width="120">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="50">
            </el-table-column>
            <el-table-column prop="mobilePhone" label="移动电话" width="130">
            </el-table-column>
            <el-table-column
              prop="unitRegion"
              label="所在地区"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="unit" label="所属单位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="specialty"
              label="所属专业"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="expertiseDescription"
              label="专业专长描述"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <i
                  class="el-icon-edit"
                  style="margin-left: 10px; cursor: pointer"
                  @click.stop="upTeam(scope.row)"
                ></i>
                <i
                  class="el-icon-delete"
                  style="margin-left: 10px; cursor: pointer"
                  @click="delTeam(scope.row)"
                ></i>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="flex flex-ac flex-drr"
            style="height: 50px; text-align: right; margin-top: 30px"
          >
            <el-pagination
              background
              layout="total, prev, pager, next"
              :page-size="limit"
              :total="total"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="right-title">
          <span>应急专家统计</span>
          <img src="../../assets/image/u991.png" alt="" />
        </div>
        <div class="right-ctt">
          <div class="right-item1">
            <span>专家总数</span>
            <span
              ><i>{{ expertSumSS }}</i> 个</span
            >
          </div>
          <div class="right-title2">
            <span>专家类型</span>
            <span>单位：个</span>
          </div>
          <div class="right-item2">
            <div class="item2-left">
              <div
                id="myChart"
                :style="{ width: '100%', height: '100%' }"
              ></div>
            </div>
          </div>
          <div class="right-title2" style="margin-top: 0">
            <span>所属专业</span>
            <span>单位：个</span>
          </div>
          <ul class="right-item3">
            <li v-for="(item, index) in expertSpecialtySS" :key="index">
              <div>{{ item.type }}</div>
              <div
                :style="'width:' + 5 * Number(item.number) + 'px'"
                class="right-item3-center"
              ></div>
              <span>{{ item.number }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="increasePopup" :style="'z-index:' + newShow">
      <div class="increaseContent">
        <div class="top">
          <span>{{ popupTitle }}</span>
          <i class="el-icon-close" @click="cancel"></i>
        </div>
        <div class="content2">
          <div class="title">基本信息</div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%"><i>*</i> 专家姓名</div>
                <el-input
                  v-model="formData.name"
                  placeholder="请输入专家姓名"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%"><i>*</i> 专家类型</div>
                <el-select
                  v-model="formData.expertTypeId"
                  placeholder="-"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                >
                  <el-option
                    v-for="item in expertTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%"><i>*</i> 性别</div>
                <el-select
                  v-model="formData.gender"
                  placeholder="-"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                >
                  <el-option label="男" value="1"> </el-option>
                  <el-option label="女" value="0"> </el-option>
                </el-select>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%"><i>*</i> 民族</div>
                <el-select
                  v-model="formData.clanId"
                  placeholder="-"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                >
                  <el-option
                    v-for="item in expertClanList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%"><i>*</i> 移动电话</div>
                <el-input
                  v-model="formData.mobilePhone"
                  placeholder="请输入移动电话"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%">办公电话</div>
                <el-input
                  v-model="formData.officePhone"
                  placeholder="请输入办公电话"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%">电子邮件</div>
                <el-input
                  v-model="formData.email"
                  placeholder="请输入电子邮件"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%">学历</div>
                <el-select
                  v-model="formData.educationId"
                  placeholder="-"
                  :disabled="popupType === 'read'"
                  style="flex: 1"
                  size="mini"
                >
                  <el-option
                    v-for="item in experTeducationList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%">职称</div>
                <el-input
                  v-model="formData.jobTitle"
                  placeholder="请输入职称"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%">职务</div>
                <el-input
                  v-model="formData.jobPost"
                  placeholder="请输入职务"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="title">专业信息</div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i> 擅长处理事故类别</div>
                <el-select
                  v-model="formData.meritAccidentTypeId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                  :disabled="popupType === 'read'"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in expertAccidentList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 50%"><i>*</i> 专家适用行业</div>
                <el-select
                  v-model="formData.applicableIndustryId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                  :disabled="popupType === 'read'"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in expertIndustryList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 35%"><i>*</i> 所属专业</div>
                <el-select
                  v-model="formData.specialtyId"
                  placeholder="-"
                  :disabled="popupType === 'read'"
                  style="flex: 1"
                  size="mini"
                >
                  <el-option
                    v-for="item in expertSpecialtyList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div>
              <div style="display: flex; flex-direction: column; width: 100%">
                <div
                  style="
                    width: 100%;
                    color: #656c97;
                    font-size: 12px;
                    margin-bottom: 10px;
                  "
                >
                  专业领域
                </div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入专业领域"
                  v-model="formData.specialtyInfo"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                  maxlength="500"
                >
                </el-input>
              </div>
            </div>
            <div>
              <div style="display: flex; flex-direction: column; width: 100%">
                <div
                  style="
                    width: 100%;
                    color: #656c97;
                    font-size: 12px;
                    margin-bottom: 10px;
                  "
                >
                  应急工作经历
                </div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入应急工作经历"
                  v-model="formData.workExperience"
                  style="flex: 1"
                  size="mini"
                  :disabled="popupType === 'read'"
                  maxlength="500"
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div style="width: 100%">
              <div style="display: flex; flex-direction: column; width: 100%">
                <div
                  style="
                    width: 100%;
                    color: #656c97;
                    font-size: 12px;
                    margin-bottom: 10px;
                  "
                >
                  专业专长描述
                </div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入专业专长描述"
                  v-model="formData.expertiseDescription"
                  style="flex: 1"
                  :disabled="popupType === 'read'"
                  size="mini"
                  maxlength="500"
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="title">单位信息</div>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 49%; height: 150px; overflow: hidden">
              <div id="container" style="width: 510px; height: 168px"></div>
            </div>
            <div
              style="
                width: 49%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 168px;
              "
            >
              <div class="width:100%;display:flex;align-items:center;">
                <div class="inputDiv">
                  <div class="wid-20">所属单位</div>
                  <el-input
                    v-model="formData.unit"
                    placeholder="请输入所属单位"
                    style="width: 380px"
                    size="mini"
                    :disabled="popupType === 'read'"
                  ></el-input>
                </div>
              </div>
              <div class="width:100%;display:flex;align-items:center;">
                <div class="inputDiv">
                  <div class="wid-20">所在区域</div>
                  <el-select
                    v-model="formData.unitRegion"
                    placeholder="请选择所在区域"
                    style="width: 380px"
                    size="mini"
                    :disabled="popupType === 'read'"
                  >
                    <el-option
                      v-for="item in expertAreaList"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="width:100%;display:flex;align-items:center;">
                <div class="inputDiv">
                  <div class="wid-20">详细地址</div>
                  <el-input
                    v-model="formData.unitRegionFullAddress"
                    placeholder="请输入详细地址"
                    style="width: 380px"
                    size="mini"
                    :disabled="popupType === 'read'"
                  ></el-input>
                </div>
              </div>
              <div class="content2-line" style="margin: 0">
                <div class="inputDiv" style="width: 49%">
                  <div style="width: 40%">经度</div>
                  <el-input
                    v-model="formData.unitRegionLongitude"
                    placeholder="请输入经度"
                    style="flex: 1"
                    size="mini"
                    disabled
                  ></el-input>
                </div>
                <div class="inputDiv" style="width: 49%">
                  <div style="width: 40%">纬度</div>
                  <el-input
                    v-model="formData.unitRegionLatitude"
                    placeholder="请输入纬度"
                    style="flex: 1"
                    size="mini"
                    disabled
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom" v-if="popupType != 'read'">
          <el-button size="mini" @click="cancel">取消</el-button>
          <el-button
            size="mini"
            style="background: #5a71e2; color: #fff"
            @click="submit"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "EmergencyTeam",
  data() {
    return {
      map: "",
      marker: "",
      AMap: "",
      newShow: -9,
      expertsList: [],
      offset: 1,
      total: 0,
      formData: {},
      popupTitle: "",
      expertTypeList: [],
      expertSpecialtyList: [],
      expertAreaList: [
        "青羊区",
        "锦江区",
        "金牛区",
        "武侯区",
        "成华区",
        "龙泉驿区",
        "青白江区",
        "新都区",
        "温江区",
        "高新南区",
        "高新西区",
        "都江堰市",
        "彭州市",
        "邛崃市",
        "崇州市",
        "金堂县",
        "双流区",
        "郫都区",
        "大邑县",
        "蒲江县",
        "新津县",
        "简阳市",
      ],
      expertClanList: [],
      experTeducationList: [],
      expertAccidentList: [],
      expertIndustryList: [],
      expertType: "",
      expertSpecialty: "",
      expertArea: "",
      expertName: "",
      expertSumSS: 0,
      expertTypeSS: [],
      expertSpecialtySS: [],
      popupType: "",

      limit: 12,
    };
  },
  async mounted() {
    await this.getExpertStatistical();
    this.drawLine();
    this.mapInit();
    this.getExpertsList();
    [
      "expert-type",
      "specialty",
      "clan",
      "education",
      "accident-type",
      "industry",
    ].forEach(async (code) => {
      await this.$post("/dah-training-api/wordbook/select", {
        code,
      }).then((data) => {
        switch (code) {
          case "expert-type":
            this.expertTypeList = data.data;
            break;
          case "specialty":
            this.expertSpecialtyList = data.data;
            break;
          case "clan":
            this.expertClanList = data.data;
            break;
          case "education":
            this.experTeducationList = data.data;
            break;
          case "accident-type":
            this.expertAccidentList = data.data;
            break;
          case "industry":
            this.expertIndustryList = data.data;
            break;
        }
      });
    });
  },
  methods: {
    // 新增 
    addTeam() {
      this.newShow = 9;
      this.formData = {
        unitRegionLongitude: "",
        unitRegionLatitude: "",
        unitRegion: "",
        unitRegionFullAddress: "",
      };
      this.popupTitle = "新增专家";
      this.popupType = "add";
      if (this.marker) {
        this.map.remove(this.marker);
      }
    },
    // 详情
    rowHandle(row) {
      this.newShow = 9;
      row.meritAccidentTypeId
        ? (row.meritAccidentTypeId = JSON.parse(row.meritAccidentTypeId))
        : "";
      row.applicableIndustryId
        ? (row.applicableIndustryId = JSON.parse(row.applicableIndustryId))
        : "";
      row.gender = row.gender == "男" ? "1" : "0";
      this.formData = row;
      this.popupTitle = "专家信息";
      this.popupType = "read";
      if (this.marker) {
        this.map.remove(this.marker);
      }
      this.marker = new this.AMap.Marker({
        position: new this.AMap.LngLat(
          row.unitRegionLongitude,
          row.unitRegionLatitude
        ),
      });
      this.map.add(this.marker);
    },
    // 编辑
    upTeam(row) {
      this.newShow = 9;
      row.meritAccidentTypeId
        ? (row.meritAccidentTypeId = JSON.parse(row.meritAccidentTypeId))
        : "";
      row.applicableIndustryId
        ? (row.applicableIndustryId = JSON.parse(row.applicableIndustryId))
        : "";
      row.gender = row.gender == "男" ? "1" : "0";
      this.formData = row;
      this.popupTitle = "修改专家";
      this.popupType = "up";
      if (this.marker) {
        this.map.remove(this.marker);
      }
      this.marker = new this.AMap.Marker({
        position: new this.AMap.LngLat(
          row.unitRegionLongitude,
          row.unitRegionLatitude
        ),
      });
      this.map.add(this.marker);
    },
    cancel() {
      this.newShow = -9;
      if (this.popupType == "up") {
        this.getExpertsList();
      }
    },
    async submit() {
      if (
        !this.formData.name ||
        !this.formData.expertTypeId ||
        !this.formData.gender ||
        !this.formData.clanId ||
        !this.formData.mobilePhone ||
        !this.formData.meritAccidentTypeId ||
        !this.formData.applicableIndustryId ||
        !this.formData.specialtyId
      ) {
        this.$message.warning("*为必填项，未填完！");
        return;
      }
      if (
        this.formData.name.length > 50 ||
        (this.formData.jobTitle && this.formData.jobTitle.length > 50) ||
        (this.formData.jobPost && this.formData.jobPost.length > 50) ||
        (this.formData.unit && this.formData.unit.length > 50) ||
        (this.formData.unitRegionFullAddress &&
          this.formData.unitRegionFullAddress.length > 50)
      ) {
        this.$message.warning("超出最大限度，最大50！");
        return;
      }
      if (/[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.name)) {
        this.$message.warning("不能含有特殊字符");
        return;
      }
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.formData.mobilePhone
        )
      ) {
        this.$message.warning("移动电话格式不正确，请重试(xxxxxxxxxxx)");
        return;
      }
      if (
        this.formData.email &&
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
          this.formData.email
        )
      ) {
        this.$message.warning("邮件格式不正确，请重试");
        return;
      }
      this.formData.meritAccidentTypeId = JSON.stringify(
        this.formData.meritAccidentTypeId
      );
      this.formData.applicableIndustryId = JSON.stringify(
        this.formData.applicableIndustryId
      );
      if (this.popupType == "add") {
        await this.$post(
          "/dah-training-api/expert/insertExpert",
          this.formData
        );
      } else {
        await this.$post(
          "/dah-training-api/expert/updateExpert",
          this.formData
        );
      }
      this.getExpertsList();
      await this.getExpertStatistical();
      this.drawLine();
      this.newShow = -9;
    },
    async getExpertsList() {
      const data = await this.$post("/dah-training-api/expert/selectByPage", {
        limit: this.limit,
        offset: this.offset,
        expertTypeId: this.expertType,
        name: this.expertName,
        specialtyId: this.expertSpecialty,
        unitRegion: this.expertArea,
      });
      this.expertsList = data.data.list;
      this.expertsList.forEach((item, index) => {
        item.no = index + 1 + (data.data.pageNum - 1) * this.limit;
        item.gender = item.gender ? "男" : "女";
      });
      this.total = data.data.total;
    },
    async getExpertStatistical() {
      const data = await this.$post("/dah-training-api/expert/countExpert");
      this.expertSumSS = data.data.ExpertNumber;
      this.expertTypeSS = data.data.ExpertType;
      this.expertTypeSS.forEach((item) => {
        item.value = item.number;
        item.name = item.type;
      });
      this.expertSpecialtySS = data.data.ExpertSpecialty;
      console.log(this.expertSpecialtySS);
    },
    handleCurrentChange(val) {
      this.offset = val;
      this.getExpertsList();
    },
    async delTeam(row) {
      this.$confirm("此操作将永久删除该条信息，且无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await this.$post(
            "/dah-training-api/expert/deleteExpert",
            {
              expertId: row.id,
            }
          );
          this.getExpertsList();
          await this.getExpertStatistical();
          this.drawLine();
          if (data.code == 200) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
          } else {
            this.$message.error("删除失败！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    drawLine() {
      let option =  {
        legend: {
          right: "right",
          top: 20,
          textStyle: {
            //图例文字的样式
            color: "#333",
            fontSize: 10,
          },
          icon: "circle",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "25%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            data: this.expertTypeSS,
            center: ["30%", "50%"],
          },
        ],
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(option);
    },
    mapInit() {
      AMapLoader.load({
        key: "72a70b13fa89dae0755b1020f63fd013", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], //插件列表
      })
        .then((AMap) => {
          this.AMap = AMap;
          console.log(AMap);
          var map = new AMap.Map("container", {
            zoom: 11, //级别
            center: [104.066422, 30.661825], //中心点坐标
            viewMode: "3D", //使用3D视图
          });
          this.map = map;
          const that = this;
          map.on("click", (ev) => {
            console.log(ev);
            that.formData.unitRegionLongitude = ev.lnglat.lng;
            that.formData.unitRegionLatitude = ev.lnglat.lat;
            if (that.marker) {
              map.remove(that.marker);
            }
            that.marker = new AMap.Marker({
              position: new AMap.LngLat(ev.lnglat.lng, ev.lnglat.lat),
            });
            map.add(that.marker);
            map.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                city: "成都市",
              });
              geocoder.getAddress(
                [ev.lnglat.lng, ev.lnglat.lat],
                function (status, result) {
                  that.formData.unitRegion =
                    result.regeocode.addressComponent.district;
                  that.formData.unitRegionFullAddress =
                    result.regeocode.formattedAddress;
                }
              );
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="less">
.search-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
    select {
      height: 30px;
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
.content2-line {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  > div {
    width: 49%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.content2-line2 {
  display: flex;
  margin-bottom: 10px;
}
.inputDiv {
  display: flex;
  align-items: center;
  font-size: 12px;
  > div:nth-child(1) {
    color: #656c97;
    height: 28px;
    padding: 0 10px;
    border: 1px solid #dcdfe6;
    border-right: none;
    display: flex;
    // justify-content: center;
    align-items: center;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  .wid-20 {
    width: 20%;
  }
  i {
    font-style: normal;
    color: #df615d;
  }
}
.increasePopup {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.336);
  font-size: 14px;
}
.increaseContent {
  width: 1000px;
  height: 600px;
  background: #fff;
  border-radius: 5px;
}
.increaseContent .top {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #5a71e2;
  color: #fff;
}
.increaseContent .content2 {
  height: 480px;
  padding: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  overflow-y: auto;
  .title {
    border-left: 3px solid #5a71e2;
    padding-left: 10px;
    margin-bottom: 15px;
  }
}
.increaseContent .bottom {
  padding: 15px;
  text-align: right;
}
.search-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.location {
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
.out-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.content1 {
  display: flex;
  justify-content: space-between;
  flex: 1;
  // overflow: hidden;
  .content-left {
    margin-right: 20px;
    flex-grow: 1;
    background: #fff;
    border-radius: 3px;
    .left-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ebecf3;
    }
    .left-ctt {
      padding: 10px;
    }
  }
  .content-right {
    width: 300px;
    background: #fff;
    border-radius: 3px;
    height: 100%;
    // overflow-x: hidden;
    .right-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ebecf3;
      img {
        width: 16px;
        height: 16px;
      }
    }
    .right-ctt {
      padding: 10px;
      .right-item1 {
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 14px;
        background: #5a71e2;
        border-radius: 5px;
        i {
          font-size: 24px;
          font-style: normal;
          font-weight: bold;
        }
      }
      .right-title2 {
        display: flex;
        padding: 0 5px;
        border-left: 3px solid #5a71e2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-top: 20px;
        span:nth-child(2) {
          font-size: 12px;
          color: #969cb4;
        }
      }
      .right-item2 {
        position: relative;
        .item2-left {
          width: 100%;
          height: 200px;
          position: relative;
        }
        .item2-right {
          position: absolute;
          right: 20px;
          top: 45px;
          li {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-bottom: 2px;
            div {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
        }
      }
      .right-item3 {
        max-height: 310px;
        overflow-y: auto;
        margin-top: 10px;
        .right-item3-center {
          max-width: 50%;
        }
        li {
          display: flex;
          font-size: 12px;
          align-items: center;
          color: #5ac585;
          margin-top: 3px;
          > div:nth-child(1) {
            width: 70px;
            color: #9c9ea7;
            text-align: right;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          > div:nth-child(2) {
            height: 12px;
            border-radius: 1px;
            background: #5ac585;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>