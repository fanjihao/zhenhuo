<template>
  <div class="out-box">
    <div class="location">
      <img src="../../assets/image/u974.svg" alt="" />
      <div class="directory1">信息管理</div>
      <div class="directory2">应急队伍</div>
    </div>
    <div class="content1">
      <div class="content-left">
        <div class="left-title">
          <span>应急队伍列表</span>
        </div>
        <div class="left-ctt">
          <div class="search-line">
            <div style="display: flex; align-items: center">
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">所在地区</div>
                <el-select v-model="teamArea" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in teamAreaList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">队伍类型</div>
                <el-select
                  v-model="teamType"
                  placeholder="请选择"
                  style="width: 150px"
                  clearable
                  @change="con"
                >
                  <el-option
                    v-for="item in teamTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">队伍级别</div>
                <el-select
                  v-model="teamLevel"
                  placeholder="请选择"
                  style="width: 150px"
                  size="mini"
                  clearable
                >
                  <el-option
                    v-for="item in teamLevelList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="search-part" style="width: 150px; margin-right: 20px">
                <el-input
                  v-model="teamName"
                  placeholder="请输入队伍名称"
                ></el-input>
              </div>
              <div class="search-btn" @click="getDataList">查 询</div>
            </div>
            <div class="search-btn" @click="addTeam">
              <i class="el-icon-plus"></i>
              新建
            </div>
          </div>
          <el-table
            :data="teamList"
            border
            v-loading="loading"
            style="
              width: 100%;
              overflow-y: auto;
              margin-bottom: 10px;
              height: 400;
            "
            @row-click="goInfo"
          >
            <el-table-column prop="no" label="#" width="50"> </el-table-column>
            <el-table-column prop="teamName" label="队伍名称" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="teamType" label="队伍类型">
            </el-table-column>
            <el-table-column prop="teamLevel" label="队伍级别" width="100">
            </el-table-column>
            <el-table-column
              prop="detailedAddress"
              show-overflow-tooltip
              label="地址"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="applicableIndustry"
              show-overflow-tooltip
              label="队伍适用行业"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="dutyTelephone" label="值班电话">
            </el-table-column>
            <el-table-column prop="totalPeople" label="总人数">
            </el-table-column>
            <el-table-column
              prop="establishmentTime"
              label="成立时间"
              width="200"
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
                  @click.stop="delTeam(scope.row)"
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
          <span>应急队伍统计</span>
          <img src="../../assets/image/u991.png" alt="" />
        </div>
        <div class="right-ctt">
          <div class="right-item1">
            <span>队伍总数</span>
            <span
              ><i>{{ teamSumSS }}</i> 个</span
            >
          </div>
          <div class="right-title2">
            <span>队伍级别</span>
            <span>单位：个</span>
          </div>
          <div class="right-item2">
            <div v-for="(item, index) in teamLevelSS" :key="index">
              <div>{{ item.levelNum }}</div>
              <div>{{ item.levelName }}</div>
            </div>
          </div>
          <div class="right-title2">
            <span>队伍类型</span>
            <span>单位：个</span>
          </div>
          <ul class="right-item3">
            <li v-for="(item, index) in teamTypeSS" :key="index">
              <div>{{ item.levelType }}</div>
              <div :style="'width:' + 5 * Number(item.typeNum) + 'px'"></div>
              <span>{{ item.typeNum }}</span>
            </li>
          </ul>
          <div class="right-title2">
            <span>能力排行TOP10</span>
          </div>
          <ul class="right-item4">
            <li
              v-for="(item, index) in teamRanking"
              @click="goInfo(item)"
              :key="index"
              :style="
                'color:' +
                (index == 0
                  ? '#DC534C'
                  : index == 1
                  ? '#F19E39'
                  : index == 2
                  ? '#5AC586'
                  : '#5A71E2')
              "
            >
              <div
                :style="
                  'background:' +
                  (index == 0
                    ? '#DC534C'
                    : index == 1
                    ? '#F19E39'
                    : index == 2
                    ? '#5AC586'
                    : '#5A71E2')
                "
              >
                {{ index + 1 }}
              </div>
              <div class="rank-name" :title="item.teamName">
                {{ item.teamName | ellipsis }}
              </div>
              <div>{{ item.teamScore }}<span>分</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="emTeamVis" :style="'z-index:' + newShow">
      <div class="increaseContent">
        <div class="top">
          <span>{{ popupTitle }}</span>
          <i class="el-icon-close" @click="cancel"></i>
        </div>
        <div class="content2">
          <div class="title">基本信息</div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 100%">
                <div><i>*</i> 队伍名称</div>
                <el-input
                  v-model="formData.teamName"
                  placeholder="请输入队伍名称"
                  style="flex: 1"
                  size="mini"
                  maxlength="50"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i> 队伍类型</div>
                <el-select
                  v-model="formData.wordbookTypeId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                >
                  <el-option
                    v-for="item in teamTypeList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i> 队伍级别</div>
                <el-select
                  v-model="formData.wordbookLevelId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                >
                  <el-option
                    v-for="item in teamLevelList"
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
                <div>队伍资质等级</div>
                <el-select
                  v-model="formData.wordbookQualificationsId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                >
                  <el-option
                    v-for="item in teamQualificationList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i> 队伍属性分类</div>
                <el-select
                  v-model="formData.wordbookAttributeId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                >
                  <el-option
                    v-for="item in teamClassificationList"
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
                <div><i>*</i> 主管部门</div>
                <el-input
                  v-model="formData.competentDepartment"
                  placeholder="请输入主管部门"
                  style="flex: 1"
                  size="mini"
                  maxlength="50"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i>总人数</div>
                <el-input
                  v-model="formData.totalPeople"
                  placeholder="请输入总人数"
                  style="flex: 1"
                  size="mini"
                  type="number"
                  maxlength="50"
                  @blur="
                    () => {
                      if (
                        !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                          formData.totalPeople
                        ) &&
                        formData.totalPeople !== ''
                      ) {
                        this.$message.warning('输入数据类型不符');
                        this.formData.totalPeople = '';
                      }
                    }
                  "
                ></el-input>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div>中队个数</div>
                <el-input
                  v-model="formData.numberSquadrons"
                  placeholder="请输入中队个数"
                  style="flex: 1"
                  size="mini"
                  type="number"
                  maxlength="50"
                  @blur="
                    () => {
                      if (
                        !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                          formData.numberSquadrons
                        ) &&
                        formData.numberSquadrons !== ''
                      ) {
                        this.$message.warning('输入数据类型不符');
                        this.formData.numberSquadrons = '';
                      }
                    }
                  "
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div>小队个数</div>
                <el-input
                  v-model="formData.numberTeams"
                  placeholder="请输入小队个数"
                  style="flex: 1"
                  size="mini"
                  type="number"
                  maxlength="50"
                  @blur="
                    () => {
                      if (
                        !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                          formData.numberTeams
                        ) &&
                        formData.numberTeams !== ''
                      ) {
                        this.$message.warning('输入数据类型不符');
                        this.formData.numberTeams = '';
                      }
                    }
                  "
                ></el-input>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 38%">成立时间</div>
                <el-date-picker
                  v-model="formData.establishmentTime"
                  type="datetime"
                  size="mini"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="title">专业信息</div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i> 擅长处理事故类型</div>
                <el-select
                  v-model="formData.wordbookAccidentId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in teamAccidentList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div><i>*</i> 队伍适用行业</div>
                <el-select
                  v-model="formData.wordbookIndustryId"
                  placeholder="-"
                  style="flex: 1"
                  size="mini"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="item in teamIndustryList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 100%">
                <div>服务范围</div>
                <el-input
                  v-model="formData.scopeService"
                  placeholder="请输入服务范围"
                  style="flex: 1"
                  size="mini"
                  maxlength="50"
                ></el-input>
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
                  <i style="color: red">*</i> 主要装备描述
                </div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入主要装备描述"
                  v-model="formData.describes"
                  style="width: 100%"
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
                  <i style="color: red">*</i> 专长描述
                </div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入专长描述"
                  v-model="formData.expertiseDescribe"
                  style="width: 100%"
                  size="mini"
                  maxlength="500"
                >
                </el-input>
              </div>
            </div>
          </div>
          <div class="title">地理信息</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            "
          >
            <div style="width: 49%; height: 110px; overflow: hidden">
              <div id="container" style="width: 500px; height: 128px"></div>
            </div>
            <div
              style="
                width: 49%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 110px;
              "
            >
              <div class="width:100%;display:flex;align-items:center;">
                <div class="inputDiv">
                  <div style="width: 20%"><i>*</i> 所在地区</div>
                  <el-select
                    v-model="formData.location"
                    placeholder="请选择所在地区"
                    style="flex: 1"
                    size="mini"
                  >
                    <el-option
                      v-for="item in teamAreaList"
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
                  <div style="width: 20%"><i>*</i> 详细地址</div>
                  <el-input
                    v-model="formData.detailedAddress"
                    placeholder="请输入详细地址"
                    style="flex: 1"
                    size="mini"
                    maxlength="50"
                  ></el-input>
                </div>
              </div>
              <div class="content2-line" style="margin: 0">
                <div class="inputDiv">
                  <div style="width: 40%"><i>*</i> 经度</div>
                  <el-input
                    v-model="formData.longitude"
                    style="flex: 1"
                    size="mini"
                    disabled
                  ></el-input>
                </div>
                <div class="inputDiv">
                  <div style="width: 40%"><i>*</i> 纬度</div>
                  <el-input
                    v-model="formData.latitude"
                    style="flex: 1"
                    size="mini"
                    disabled
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="title">联系信息</div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%"><i>*</i> 值班电话</div>
                <el-input
                  v-model="formData.dutyTelephone"
                  placeholder="请输入值班电话"
                  style="flex: 1"
                  size="mini"
                  maxlength="20"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%"><i>*</i> 应急值班传真</div>
                <el-input
                  v-model="formData.emergencyDuty"
                  placeholder="请输入应急值班传真"
                  style="flex: 1"
                  size="mini"
                  maxlength="20"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%"><i>*</i> 负责人</div>
                <el-input
                  v-model="formData.personCharge"
                  placeholder="请输入负责人"
                  style="flex: 1"
                  size="mini"
                  maxlength="50"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 45">负责人联系电话</div>
                <el-input
                  v-model="formData.personTelephone"
                  placeholder="请输入负责人联系电话"
                  style="flex: 1"
                  size="mini"
                  maxlength="20"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%">负责人手机</div>
                <el-input
                  v-model="formData.personPhone"
                  placeholder="请输入负责人手机"
                  style="flex: 1"
                  size="mini"
                  maxlength="11"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="content2-line">
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%"><i>*</i> 分管领导</div>
                <el-input
                  v-model="formData.leaderCharge"
                  placeholder="请输入分管领导"
                  style="flex: 1"
                  size="mini"
                  maxlength="50"
                ></el-input>
              </div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%">分管领导电话</div>
                <el-input
                  v-model="formData.leaderTelephone"
                  placeholder="请输入分管领导联系电话"
                  style="flex: 1"
                  size="mini"
                  maxlength="20"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="inputDiv" style="width: 49%">
                <div style="width: 40%">分管领导手机</div>
                <el-input
                  v-model="formData.leaderPhone"
                  placeholder="请输入分管领导手机"
                  style="flex: 1"
                  size="mini"
                  maxlength="11"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="title">附加信息</div>
          <div class="content2-line">
            <div class="inputDiv" style="align-items: stretch; width: 100%">
              <div style="height: auto">备注</div>
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.remarks"
                style="flex: 1"
                size="mini"
                maxlength="500"
              >
              </el-input>
            </div>
          </div>
        </div>
        <div class="bottom">
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
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "EmergencyTeam",
  data() {
    return {
      loading: true,
      map: "",
      marker: "",
      AMap: "",
      newShow: -9,
      offset: 1,
      total: 0,
      teamList: [],
      teamTypeList: [],
      teamType: "",
      teamLevelList: [],
      teamLevel: "",
      teamAreaList: [
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
      teamArea: "",
      teamName: "",
      teamSumSS: "",
      teamLevelSS: [],
      teamTypeSS: [],
      teamRanking: [],
      formData: {},
      teamQualificationList: [],
      teamClassificationList: [],
      teamAccidentList: [],
      teamIndustryList: [],
      popupTitle: "",
      popupType: "",

      limit: 12,
    };
  },
  async mounted() {
    this.mapInit();
    this.getDataList();
    this.getTimeStatistical();
    [
      "team-type",
      "team-level",
      "team-qualification-level",
      "team-classification",
      "accident-type",
      "industry",
    ].forEach(async (code) => {
      await this.$post("/dah-training-api/wordbook/select", {
        code,
      }).then((data) => {
        switch (code) {
          case "team-type":
            this.teamTypeList = data.data;
            break;
          case "team-level":
            this.teamLevelList = data.data;
            break;
          case "team-qualification-level":
            this.teamQualificationList = data.data;
            break;
          case "team-classification":
            this.teamClassificationList = data.data;
            break;
          case "accident-type":
            this.teamAccidentList = data.data;
            break;
          case "industry":
            this.teamIndustryList = data.data;
            break;
        }
      });
    });
  },
  methods: {
    con() {
      console.log(this.teamType);
    },
    addTeam() {
      this.newShow = 9;
      this.formData = {
        longitude: "",
        latitude: "",
        location: "",
        detailedAddress: "",
      };
      this.popupTitle = "新增队伍";
      this.popupType = "add";
      if (this.marker) {
        this.map.remove(this.marker);
      }
    },
    upTeam(row) {
      console.log(row);
      this.newShow = 9;
      row.wordbookAccidentId
        ? (row.wordbookAccidentId = JSON.parse(row.wordbookAccidentId))
        : "";
      row.wordbookIndustryId
        ? (row.wordbookIndustryId = JSON.parse(row.wordbookIndustryId))
        : "";
      this.formData = row;
      this.popupTitle = "修改队伍";
      this.popupType = "up";
      if (this.marker) {
        this.map.remove(this.marker);
      }
      this.marker = new this.AMap.Marker({
        position: new this.AMap.LngLat(row.longitude, row.latitude),
      });
      this.map.add(this.marker);
    },
    async delTeam(row) {
      this.$confirm("请确认当前队伍是否正在实训，若有实训，请勿删除", "提示", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消删除",
        type: "warning",
      })
        .then(async () => {
          const data = await this.$post(
            "/dah-training-api/emergencyTeam/deleteEmergencyTeam",
            {
              id: row.id,
            }
          );
          this.getDataList();
          this.getTimeStatistical();
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
    cancel() {
      this.newShow = -9;
      if (this.popupType == "up") {
        this.getDataList();
      }
    },
    async submit() {
      console.log(this.formData.establishmentTime, "sssssssss");
      if (
        !this.formData.teamName ||
        !this.formData.wordbookTypeId ||
        !this.formData.wordbookAttributeId ||
        !this.formData.wordbookLevelId ||
        !this.formData.competentDepartment ||
        !this.formData.totalPeople ||
        !this.formData.wordbookAccidentId ||
        !this.formData.wordbookIndustryId ||
        !this.formData.describes ||
        !this.formData.expertiseDescribe ||
        !this.formData.location ||
        !this.formData.detailedAddress ||
        !this.formData.longitude ||
        !this.formData.latitude ||
        !this.formData.emergencyDuty ||
        !this.formData.dutyTelephone ||
        !this.formData.personCharge ||
        !this.formData.leaderCharge ||
        !this.formData.totalPeople
      ) {
        this.$message.warning("*为必填项，未填完！");
        return;
      }
      if (/[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.teamName)) {
        this.$message.warning("不能包含特殊符号");
        return;
      }
      if (
        !/^(0\d{2,3})-?(\d{7,8})$/.test(this.formData.dutyTelephone) ||
        !/^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/.test(this.formData.emergencyDuty)
      ) {
        this.$message.warning(
          "电话传真格式不正确,格式（xxx-xxxxxxxx,xxx-xxxxxxx,xxx-xxxxxxxx-xxx）"
        );
        return;
      }
      if (
        (this.formData.personPhone &&
          !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            this.formData.personPhone
          )) ||
        (this.formData.leaderPhone &&
          !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            this.formData.leaderPhone
          )) ||
        (this.formData.personTelephone &&
          !/^(0\d{2,3})-?(\d{7,8})$/.test(this.formData.personTelephone)) ||
        (this.formData.leaderTelephone &&
          !/^(0\d{2,3})-?(\d{7,8})$/.test(this.formData.leaderTelephone))
      ) {
        this.$message.warning(
          "电话或手机格式不正确，电话格式(xxx-xxxxxxx)，手机格式(xxxxxxxxxxx)"
        );
        return;
      }
      if (this.formData.establishmentTime) {
        let date = new Date(this.formData.establishmentTime);
        let Y = date.getFullYear();
        let M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let MT =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let MS =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.formData.establishmentTime =
          Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + MS;
      } else {
        this.formData.establishmentTime = null;
      }
      this.formData.wordbookAccidentId = JSON.stringify(
        this.formData.wordbookAccidentId
      );
      this.formData.wordbookIndustryId = JSON.stringify(
        this.formData.wordbookIndustryId
      );
      if (this.popupType == "add") {
        let data = await this.$post(
          "/dah-training-api/emergencyTeam/addEmergencyTeam",
          this.formData
        );
        if (data.data) {
          this.$message({
            message: "添加成功!",
            type: "success",
            duration: 1000,
          });
        }
      } else {
        let data = await this.$post(
          "/dah-training-api/emergencyTeam/updateEmergencyTeam",
          this.formData
        );
        if (data.data) {
          this.$message.success("编辑成功!");
        }
      }
      this.getDataList();
      this.getTimeStatistical();
      this.newShow = -9;
    },
    async getDataList() {
      this.loading = true;
      const data = await this.$post(
        "/dah-training-api/emergencyTeam/selectEmergencyTeam",
        {
          limit: this.limit,
          offset: this.offset,
          teamLevel: this.teamLevel,
          teamName: this.teamName,
          teamType: this.teamType,
          location: this.teamArea,
        }
      );
      this.loading = false;
      this.teamList = data.data.list;
      this.teamList.forEach((item, index) => {
        item.no = index + 1 + (data.data.pageNum - 1) * 10;
        item.applicableIndustry = item.applicableIndustry
          ? JSON.parse(item.applicableIndustry).join("、")
          : "";
      });
      this.total = data.data.total;
    },
    async getTimeStatistical() {
      const data = await this.$post(
        "/dah-training-api/emergencyTeam/emergencyTeamStatistics"
      );
      this.teamSumSS = data.data.one.total;
      this.teamLevelSS = data.data.two.data;
      console.log(this.teamLevelSS);
      this.teamTypeSS = data.data.three.data;
      this.teamRanking = data.data.four.data;
    },
    goInfo(row) {
      this.$router.push({ path: "emergencyTeamInfo", query: { id: row.id } });
      // location.replace(`/emergencyTeamInfo?id=${row.id}`);
    },
    handleCurrentChange(val) {
      this.offset = val;
      this.getDataList();
    },
    mapInit() {
      AMapLoader.load({
        key: "72a70b13fa89dae0755b1020f63fd013", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], //插件列表
      })
        .then((AMap) => {
          this.AMap = AMap;
          // console.log(AMap);
          var map = new AMap.Map("container", {
            zoom: 11, //级别
            center: [104.066422, 30.661825], //中心点坐标
            viewMode: "3D", //使用3D视图
          });
          this.map = map;
          const that = this;
          map.on("click", (ev) => {
            console.log(ev);
            that.formData.longitude = ev.lnglat.lng;
            that.formData.latitude = ev.lnglat.lat;
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
                  that.formData.location =
                    result.regeocode.addressComponent.district;
                  that.formData.detailedAddress =
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
  filters: {
    //文字数超出时，超出部分使用...
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 12) {
        return value.slice(0, 12) + "...";
      }
      return value;
    },
  },
};
</script>

<style lang="less">
.rank-name:hover {
  cursor: pointer;
  color: #4a64eb;
}
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
  i {
    font-style: normal;
    color: #df615d;
  }
}
.emTeamVis {
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
  width: 1100px;
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
    // min-height: 100vh;
    background: #fff;
    border-radius: 3px;
    height: 100%;
    overflow-x: hidden;
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
        background: #f8f8fb;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        > div {
          width: 33.3%;
          padding: 5px 0;
          text-align: center;
          font-size: 14px;
          border: 1px solid #f1f3fe;
          > div:nth-child(1) {
            font-size: 20px;
            color: #5a71e2;
            font-weight: bold;
          }
          > div:nth-child(2):hover {
            color: #5a71e2;
          }
        }
      }
      .right-item3 {
        max-height: 200px;
        overflow-y: auto;
        margin-top: 10px;
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
      .right-item4 {
        margin-top: 10px;
        height: 300px;
        // overflow-y: auto;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          margin: 10px 0;
          > div:nth-child(1) {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-content: center;
            color: #fff;
            border-radius: 50%;
            margin-right: 20px;
          }
          > div:nth-child(2) {
            display: flex;
            align-content: center;
            flex-grow: 1;
          }
          span {
            color: #989eb6;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>