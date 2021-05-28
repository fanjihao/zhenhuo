<template>
  <div>
    <div class="location">
      <img src="../../assets/image/u974.svg" alt="" />
      <div class="directory1">信息管理</div>
      <div class="directory2" @click="goPage">应急队伍</div>
      <div class="directory3">{{ teamInfoData.teamName }}</div>
    </div>
    <div class="content2">
      <div class="content-top">
        <div class="top-left">
          <div>
            <div class="label">{{ teamInfoData.teamLevel }}</div>
            <div class="name">{{ teamInfoData.teamName }}</div>
            <i class="el-icon-phone" style="color: #5d74e3"></i>
            <div class="informationItem">
              <span>值班电话：</span>{{ teamInfoData.dutyTelephone }}
            </div>
            <div class="informationItem">
              <span>应急值班传真：</span>{{ teamInfoData.emergencyDuty }}
            </div>
          </div>
          <div>
            <div class="informationItem">
              <span>负责人：</span>{{ teamInfoData.personCharge }}
            </div>
            <div class="informationItem">
              <span>负责人联系方式：</span>{{ teamInfoData.personTelephone }}
            </div>
            <div class="informationItem">
              <span>负责人手机：</span>{{ teamInfoData.personPhone }}
            </div>
            <div class="informationItem">
              <span>分管领导：</span>{{ teamInfoData.leaderCharge }}
            </div>
            <div class="informationItem">
              <span>分管领导联系电话：</span>{{ teamInfoData.leaderTelephone }}
            </div>
            <div class="informationItem">
              <span>分管领导手机：</span>{{ teamInfoData.leaderPhone }}
            </div>
          </div>
        </div>
        <div class="top-right">
          <div>
            <div>
              <img src="../../assets/image/u3739.png" alt="" />
            </div>
            <div>
              <div>参训次数(仅计入有成绩的实训)</div>
              <div>
                <span style="color: #5a71e2">{{
                  teamInfoData.teamFrequency
                }}</span
                >次
              </div>
            </div>
          </div>
          <div>
            <div>
              <img src="../../assets/image/u3727.png" alt="" />
            </div>
            <div>
              <div>综合评分</div>
              <div>
                <span style="color: #5ac585">{{ teamInfoData.teamScore }}</span
                >分
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <ul class="bottom-nav">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :style="
              navIndex == index
                ? 'color: #5a70e2;border: 1px solid #5A70E2;border-bottom: 1px solid #fff;border-top-left-radius: 3px;border-top-right-radius: 3px;'
                : ''
            "
            @click="navIndex = index"
          >
            {{ item }}
          </li>
        </ul>
        <div class="bottom-ctt" v-show="navIndex == 0">
          <div class="title">基本信息</div>
          <div class="cct-item">
            <div>
              <span>队伍名称：</span>
              <div style="flex: 1">{{ teamInfoData.teamName }}</div>
            </div>
            <div>
              <span>队伍类型：</span>
              <div style="flex: 1">{{ teamInfoData.teamType }}</div>
            </div>
            <div>
              <span>队伍级别：</span>
              <div style="flex: 1">{{ teamInfoData.teamLevel }}</div>
            </div>
            <div>
              <span>队伍资质等级：</span>
              <div style="flex: 1">
                {{ teamInfoData.teamQualificationLevel }}
              </div>
            </div>
            <div>
              <span>队伍属性分类：</span>
              <div style="flex: 1">{{ teamInfoData.teamClassification }}</div>
            </div>
          </div>
          <div class="cct-item">
            <div>
              <span>主管部门：</span>
              <div style="flex: 1">{{ teamInfoData.competentDepartment }}</div>
            </div>
            <div>
              <span>总人数：</span>
              <div style="flex: 1">{{ teamInfoData.totalPeople }}</div>
            </div>
            <div>
              <span>中队个数：</span>
              <div style="flex: 1">{{ teamInfoData.numberSquadrons }}</div>
            </div>
            <div>
              <span>小队个数：</span>
              <div style="flex: 1">{{ teamInfoData.numberTeams }}</div>
            </div>
            <div>
              <span>成立时间：</span>
              <div style="flex: 1">{{ teamInfoData.establishmentTime }}</div>
            </div>
          </div>
          <div class="title" style="margin-top: 20px">专业相关</div>
          <div class="cct-item">
            <div style="width: 100%; display: flex">
              <span>专长描述：</span>
              <div style="flex: 1">{{ teamInfoData.expertiseDescribe }}</div>
            </div>
          </div>
          <div class="cct-item">
            <div style="width: 100%">
              <span>擅长处置事故类别：</span
              ><i
                v-for="(item, index) in JSON.parse(
                  teamInfoData.accidentCategory
                )"
                :key="index"
                >{{ item }}</i
              >
            </div>
          </div>
          <div class="cct-item">
            <div style="width: 100%">
              <span>队伍适用行业：</span
              ><i
                v-for="(item, index) in JSON.parse(
                  teamInfoData.applicableIndustry
                )"
                :key="index"
                >{{ item }}</i
              >
            </div>
          </div>
          <div class="cct-item">
            <div style="width: 100%; display: flex">
              <span>服务范围：</span>
              <div style="flex: 1">{{ teamInfoData.scopeService }}</div>
            </div>
          </div>
          <div class="cct-item">
            <div style="width: 100%; display: flex">
              <span>主要装备描述：</span>
              <div style="flex: 1">{{ teamInfoData.describes }}</div>
            </div>
          </div>
          <div class="title" style="margin-top: 20px">地理信息</div>
          <div class="cct-item2" style="width: 100%">
            <div
              style="
                width: 51%;
                height: 110px;
                overflow: hidden;
                margin-right: 30px;
              "
            >
              <div id="container" style="width: 500px; height: 128px"></div>
            </div>
            <div>
              <div><span>地理位置：</span></div>
              <div>
                <i>{{ teamInfoData.longitude }}°E</i
                ><i>{{ teamInfoData.latitude }}°W</i>
              </div>
              <div><span>所在地区：</span>{{ teamInfoData.location }}</div>
              <div>
                <span>详情地址：</span>{{ teamInfoData.detailedAddress }}
              </div>
            </div>
          </div>
          <div class="title" style="margin-top: 20px">附加信息</div>
          <div class="cct-item">
            <div style="width: 100%">
              <span>备注：</span>{{ teamInfoData.remarks }}
            </div>
          </div>
          <div class="title" style="margin-top: 20px">数据信息</div>
          <div class="cct-item" style="width: 100%">
            <div><span>创建人：</span>admin</div>
            <div><span>创建时间：</span>{{ teamInfoData.createTime }}</div>
          </div>
        </div>
        <div class="bottom-ctt" v-show="navIndex == 1">
          <div class="search-line">
            <div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">物资类型</div>
                <el-select
                  v-model="teamSupplies"
                  placeholder="-"
                  style="width: 250px"
                  clearable
                >
                  <el-option
                    v-for="item in teamSuppliesList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="search-part" style="width: 150px; margin-right: 20px">
                <el-input
                  v-model="keyword1"
                  placeholder="请输入关键字"
                  style="width: 250px"
                ></el-input>
              </div>
              <div class="search-btn" @click="getDataList1">查 询</div>
            </div>
            <div class="search-btn" @click="addTeam1">
              <i class="el-icon-plus"></i>
              新建
            </div>
          </div>
          <div style="height: 445px; overflow-y: auto">
            <el-table
              :data="suppliesList"
              border
              style="width: 100%; margin-bottom: 10px"
            >
              <el-table-column prop="no" label="#" width="50">
              </el-table-column>
              <el-table-column prop="name" label="物资名称"> </el-table-column>
              <el-table-column prop="suppliesType" label="物资类型">
              </el-table-column>
              <el-table-column prop="measureUnit" label="计量单位">
              </el-table-column>
              <el-table-column prop="number" label="数量"> </el-table-column>
              <el-table-column prop="storageLocation" label="存放地点">
              </el-table-column>
              <el-table-column prop="updateTime" label="更新时间">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <i
                    class="el-icon-edit"
                    style="margin-left: 10px; cursor: pointer"
                    @click="upTeam1(scope.row)"
                  ></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 10px; cursor: pointer"
                    @click="delTeam1(scope.row)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div style="text-align: right">
            <el-pagination
              background
              class="footpage"
              layout="total, prev, pager, next"
              :total="etiTotal"
              @current-change="changeEtiPage"
            >
            </el-pagination>
          </div> -->
        </div>
        <div class="bottom-ctt" v-show="navIndex == 2">
          <div class="search-line">
            <div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">装备类型</div>
                <el-select
                  v-model="teamEquipment"
                  placeholder="-"
                  style="width: 250px"
                  size="mini"
                  clearable
                >
                  <el-option
                    v-for="item in teamEquipmentList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="search-part" style="width: 150px; margin-right: 20px">
                <el-input
                  v-model="keyword2"
                  placeholder="请输入关键字"
                  style="width: 250px"
                ></el-input>
              </div>
              <div class="search-btn" @click="getDataList2">查 询</div>
            </div>
            <div class="search-btn" @click="addTeam2">
              <i class="el-icon-plus"></i>
              新建
            </div>
          </div>
          <div style="height: 445px; overflow-y: auto">
            <el-table
              :data="equipmentList"
              border
              style="width: 100%; margin-bottom: 10px"
            >
              <el-table-column prop="no" label="#"> </el-table-column>
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
              <el-table-column prop="updateTime" label="更新时间" width="170">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <i
                    class="el-icon-edit"
                    style="margin-left: 10px; cursor: pointer"
                    @click="upTeam2(scope.row)"
                  ></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 10px; cursor: pointer"
                    @click="delTeam2(scope.row)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bottom-ctt" v-show="navIndex == 3">
          <div class="search-line">
            <div>
              <div class="search-part" style="width: 150px; margin-right: 20px">
                <el-input
                  v-model="serach4"
                  placeholder="请输入人员姓名"
                  style="width: 250px"
                ></el-input>
              </div>
              <div class="search-btn" @click="querySuer4">查 询</div>
            </div>
            <div class="search-btn" @click="showPop4(false)">
              <i class="el-icon-plus"></i>
              新建
            </div>
          </div>
          <div style="height: 445px; overflow-y: auto">
            <el-table
              :data="message4"
              border
              style="width: 100%; margin-bottom: 10px"
            >
              <el-table-column prop="no" label="#" width="100">
              </el-table-column>
              <el-table-column prop="name" label="人员姓名"> </el-table-column>
              <el-table-column prop="phone" label="人员手机"> </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <i
                    class="el-icon-edit"
                    style="margin-left: 10px; cursor: pointer"
                    @click="showPop4(scope.row)"
                  ></i>
                  <i
                    class="el-icon-delete"
                    style="margin-left: 10px; cursor: pointer"
                    @click="sureDeletePerson(scope.row.id)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bottom-ctt" v-show="navIndex == 4">
          <div class="search-line">
            <div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">时间日期</div>
                <el-date-picker
                  v-model="time5"
                  type="date"
                  style="width: 250px"
                  size="mini"
                  @change="timeChange5"
                  placeholder="选择实际时间"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
              <div class="inputDiv search-part" style="margin-right: 20px">
                <div class="label-title">实训状态</div>
                <el-select
                  v-model="status5"
                  placeholder="选择实训状态"
                  @change="searchEquipType5"
                  style="width: 250px"
                  size="mini"
                  clearable
                >
                  <el-option label="待执行" value="0"> </el-option>
                  <el-option label="执行中" value="1"> </el-option>
                  <el-option label="已完成" value="2"> </el-option>
                </el-select>
              </div>
              <div class="search-part" style="width: 150px; margin-right: 20px">
                <el-input
                  v-model="serach5"
                  placeholder="请输入实训名称"
                  style="width: 250px"
                ></el-input>
              </div>
              <div class="search-btn" @click="querySuer5">查 询</div>
            </div>
          </div>
          <div style="height: 445px; overflow-y: auto">
            <el-table
              :data="message5"
              border
              style="width: 100%; margin-bottom: 10px"
              @row-click="goInfo"
            >
              <el-table-column prop="no" label="#" width="80">
              </el-table-column>
              <el-table-column prop="name" label="实训名称"> </el-table-column>
              <el-table-column prop="coursewareId" label="实训课件">
              </el-table-column>
              <el-table-column prop="location" label="实训地点">
              </el-table-column>
              <el-table-column prop="teamId" label="实训队伍">
                <template slot-scope="">
                  <span>{{ teamInfoData.teamName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="planStartTime"
                label="计划时间"
                width="170"
              >
              </el-table-column>
              <el-table-column
                prop="actualStartTime"
                label="实际时间"
                width="170"
              >
              </el-table-column>
              <el-table-column prop="assessGrades" label="实训成绩">
              </el-table-column>
              <el-table-column prop="status" label="实训状态">
                <template slot-scope="scope">
                  <span v-show="scope.row.status == 0" style="color: #00c87f"
                    >待执行</span
                  >
                  <span v-show="scope.row.status == 1" class="cor-blue"
                    >执行中</span
                  >
                  <span v-show="scope.row.status == 2" class="cor-6"
                    >已完成</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class=" flex flex-ac flex-drr" style="height: 50px;">
        <el-pagination          
        background
        layout="prev, pager, next"
        :current-page="page5"
        @current-change="currentCag5"
        :page-size="limit5"
        :total="total5">
        </el-pagination>
      </div> -->
        </div>
      </div>
    </div>
    <div class="increasePopup" v-if="suppliesPopupShow1">
      <div class="increaseContent">
        <div class="top">
          <span>{{ popupTitle }}</span>
          <i class="el-icon-close" @click="cancel1"></i>
        </div>
        <div class="content2">
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 物资名称</div>
            <el-input
              v-model="formData.name"
              placeholder="请输入物资名称"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 物资类型</div>
            <el-select
              v-model="formData.suppliesTypeId"
              placeholder="-"
              style="width: 350px"
              size="mini"
              clearable
            >
              <el-option
                v-for="item in teamSuppliesList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 计量单位</div>
            <el-input
              v-model="formData.measureUnit"
              placeholder="请输入计量单位"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 物资数量</div>
            <el-input
              v-model="formData.number"
              placeholder="请输入物资数量"
              style="width: 350px"
              type="number"
              size="mini"
              @blur="
                () => {
                  if (
                    !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                      formData.number
                    ) &&
                    formData.number !== ''
                  ) {
                    this.$message.warning('输入数据类型不符,请输入数字');
                    this.formData.number = '';
                  }
                }
              "
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 存放地点</div>
            <el-input
              v-model="formData.storageLocation"
              placeholder="请输入存放地点"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
        </div>
        <div class="bottom">
          <el-button size="mini" @click="cancel1">取消</el-button>
          <el-button
            size="mini"
            style="background: #5a71e2; color: #fff"
            @click="submit1"
            >确定</el-button
          >
        </div>
      </div>
    </div>
    <div class="increasePopup" v-if="suppliesPopupShow2">
      <div class="increaseContent">
        <div class="top">
          <span>{{ popupTitle }}</span>
          <i class="el-icon-close" @click="cancel2"></i>
        </div>
        <div class="content2">
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 装备名称</div>
            <el-input
              v-model="formData.equipmentName"
              placeholder="请输入装备名称"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 装备类型</div>
            <el-select
              v-model="formData.type"
              placeholder="-"
              style="width: 350px"
              size="mini"
              clearable
            >
              <el-option
                v-for="item in teamEquipmentList"
                :key="item.id"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 计量单位</div>
            <el-input
              v-model="formData.unitMeasurement"
              placeholder="请输入计量单位"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 装备数量</div>
            <el-input
              v-model="formData.numberEquipment"
              placeholder="请输入装备数量"
              style="width: 350px"
              size="mini"
              type="number"
              @blur="
                () => {
                  if (
                    !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                      formData.numberEquipment
                    ) &&
                    formData.numberEquipment !== ''
                  ) {
                    this.$message.warning('输入数据类型不符');
                    this.formData.numberEquipment = '';
                  }
                }
              "
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 存放地点</div>
            <el-input
              v-model="formData.storageLocation"
              placeholder="请输入存放地点"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title">规格型号</div>
            <el-input
              v-model="formData.model"
              placeholder="请输入规格型号"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part">
            <div class="label-title">装备用途</div>
            <el-input
              v-model="formData.equipmentUse"
              placeholder="请输入装备用途"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
        </div>
        <div class="bottom">
          <el-button size="mini" @click="cancel2">取消</el-button>
          <el-button
            size="mini"
            style="background: #5a71e2; color: #fff"
            @click="submit2"
            >确定</el-button
          >
        </div>
      </div>
    </div>
    <!-- 应急人员弹框弹框 -------------------------------------------->
    <div class="increasePopup" v-if="popupStatus4">
      <div class="increaseContent">
        <div class="top">
          <span>{{ popupTitle4 ? "编辑应急人员" : "新建应急人员" }}</span>
          <i class="el-icon-close" @click="hidePoP4"></i>
        </div>
        <div class="content2">
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 人员名称</div>
            <el-input
              v-model="newPersonName"
              placeholder="请输入人员名称"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
          <div class="inputDiv search-part" style="margin-bottom: 10px">
            <div class="label-title"><i>*</i> 人员手机</div>
            <el-input
              v-model="newPersonPhone"
              placeholder="请输入手机号"
              style="width: 350px"
              size="mini"
            ></el-input>
          </div>
        </div>
        <div class="bottom">
          <el-button size="mini" @click="hidePoP4">取消</el-button>
          <el-button
            size="mini"
            style="background: #5a71e2; color: #fff"
            @click="surePop4"
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
      navList: ["基本信息", "应急物资", "应急装备", "应急人员", "历史实训"],
      navIndex: 0,
      suppliesPopupShow1: false,
      suppliesPopupShow2: false,
      teamInfoId: "",
      teamInfoData: {},
      keyword1: "",
      keyword2: "",
      keyword3: "",
      keyword4: "",
      trainingTime: "",
      teamSuppliesList: [],
      teamSupplies: "",
      teamEquipmentList: [],
      equipmentList: [],
      teamEquipment: "",
      suppliesList: [],
      formData: {},
      popupTitle: "",
      popupType: "",
      // 第五个历史实训参数
      page5: 1,
      limit5: 10,
      total5: 0,
      time5: "",
      status5: "",
      serach5: "",
      message5: [],
      serach4: "",
      message4: [],
      popupStatus4: false,
      popupTitle4: true,
      newPersonName: "",
      newPersonPhone: "",

      etiPageNum: 1,
      etiTotal: 0,
    };
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
  },
  async mounted() {
    this.teamInfoId = this.$route.query.id;
    await this.getTeamInfo();
    await this.getDataList1();
    this.mapInit();
    ["supplies-type", "equipment-type"].forEach(async (code) => {
      await this.$post("/dah-training-api/wordbook/select", {
        code,
      }).then((data) => {
        switch (code) {
          case "supplies-type":
            this.teamSuppliesList = data.data;
            break;
          case "equipment-type":
            this.teamEquipmentList = data.data;
            break;
        }
      });
    });
    this.getMessageList5();
    this.getMessageList4();
    this.getDataList2();
  },
  methods: {
    changeEtiPage(curPage) {
      this.etiPageNum = curPage;
      this.getDataList1();
    },
    goInfo(row) {
      this.$router.push({
        path: "/filesdetail",
        query: {
          id: row.id,
          status: row.status,
        },
      });
    },
    surePop4() {
      if (this.popupTitle4) {
        this.changePop4();
      } else {
        this.addPop4();
      }
    },
    async changePop4() {
      if (!this.newPersonName || !this.newPersonPhone) {
        this.$message.warning("*号为必填项，不能为空！");
        return;
      }
      if (this.newPersonName.length > 50) {
        this.$message.warning("超出最大长度，最长50");
        return;
      }
      if (/[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.newPersonName)) {
        this.$message.warning("名称不能含有特殊字符");
        return;
      }
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.newPersonPhone
        )
      ) {
        this.$message.warning("手机号格式不正确，请重试(xxxxxxxxxxx)");
        return;
      }
      let params = {
        name: this.newPersonName,
        phone: this.newPersonPhone,
        id: this.newPersonId,
        teamId: this.teamInfoId,
      };
      let data = await this.$post(
        "/dah-training-api/emergencyCrew/update",
        params
      );
      if (data.code === 200) {
        this.$message({
          message: "恭喜你，修改成功！",
          type: "success",
        });
        this.popupStatus4 = false;
        this.getMessageList4();
      } else {
        this.$message({
          message: data.message,
          type: "warning",
        });
      }
    },
    async addPop4() {
      if (!this.newPersonName || !this.newPersonPhone) {
        this.$message.warning("*号为必填项，不能为空！");
        return;
      }
      if (this.newPersonName.length > 50) {
        this.$message.warning("超出最大长度，最长50");
        return;
      }
      if (/[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.newPersonName)) {
        this.$message.warning("名称不能含有特殊字符");
        return;
      }
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.newPersonPhone
        )
      ) {
        this.$message.warning("手机号格式不正确，请重试(xxxxxxxxxxx)");
        return;
      }
      let params = {
        name: this.newPersonName,
        phone: this.newPersonPhone,
        teamId: this.teamInfoId,
      };
      let data = await this.$post(
        "/dah-training-api/emergencyCrew/add",
        params
      );
      if (data.code === 200) {
        this.$message({
          message: "恭喜你，添加成功！",
          type: "success",
        });
        this.popupStatus4 = false;
        this.getMessageList4();
      } else {
        this.$message({
          message: data.message,
          type: "warning",
        });
      }
    },
    hidePoP4() {
      this.popupStatus4 = false;
    },
    showPop4(e) {
      this.popupTitle4 = e;
      this.popupStatus4 = true;
      if (e) {
        this.newPersonName = e.name;
        this.newPersonPhone = e.phone;
        this.newPersonId = e.id;
      } else {
        this.newPersonName = "";
        this.newPersonPhone = "";
      }
    },
    sureDeletePerson(e) {
      this.$confirm("删除将无法找回该数据，请确认是否删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.deletePerson(e);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
          });
        });
    },
    async deletePerson(e) {
      let data = await this.$post("/dah-training-api/emergencyCrew/delete", {
        id: e,
      });
      console.log(data);
      if (data.code === 200) {
        this.$message({
          type: "success",
          message: "已成功删除！",
        });
        this.getMessageList4();
      }
    },
    querySuer4() {
      this.getMessageList4();
    },
    async getMessageList4() {
      let params = {
        id: this.teamInfoId - 0,
        keyword: this.serach4,
        type: 3,
      };
      let data = await this.$post(
        "/dah-training-api/emergencyTeam/getEmergencySupplies",
        params
      );
      this.message4 = data.data.crews;
      this.message4.map((item, index) => {
        item.no = index + 1;
      });
    },
    querySuer5() {
      this.getMessageList5();
    },
    searchEquipType5() {
      this.getMessageList5();
    },
    //历史实训获取数据
    async getMessageList5() {
      let params = {
        status: this.status5,
        id: this.teamInfoId - 0,
        keyword: this.serach5,
        time: this.time5,
        type: 4,
      };
      let data = await this.$post(
        "/dah-training-api/emergencyTeam/getEmergencySupplies",
        params
      );
      this.message5 = data.data.records;
      this.message5.map((item, index) => {
        item.no = index + 1;
      });
    },
    timeChange5() {
      console.log(this.time5);
      this.getMessageList5();
    },
    currentCag5() {},
    addTeam1() {
      this.suppliesPopupShow1 = true;
      this.formData = {};
      this.popupTitle = "新增物资";
      this.popupType = "add";
    },
    upTeam1(row) {
      this.suppliesPopupShow1 = true;
      this.formData = row;
      this.popupTitle = "修改物资";
      this.popupType = "up";
    },
    async delTeam1(row) {
      this.$confirm("此操作将永久删除该条信息，且无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await this.$post(
            "/dah-training-api/supplies/deleteSupplies",
            {
              suppliesId: row.id,
            }
          );
          this.getDataList1();
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
    cancel1() {
      this.suppliesPopupShow1 = false;
      if (this.popupType == "up") {
        this.getDataList1();
      }
    },
    async submit1() {
      if (
        !this.formData.name ||
        !this.formData.number ||
        !this.formData.measureUnit ||
        !this.formData.storageLocation ||
        !this.formData.suppliesTypeId
      ) {
        this.$message.warning("*为必填项，未填完！");
        return;
      }
      if (
        this.formData.name.length > 50 ||
        this.formData.number.length > 50 ||
        this.formData.measureUnit.length > 50 ||
        this.formData.storageLocation.length > 50
      ) {
        this.$message.warning("超出最大长度，最大限50");
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.name) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.measureUnit) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.storageLocation)
      ) {
        this.$message({
          message: "警告，不能包含特殊字符！",
          type: "warning",
        });
        return;
      }
      this.formData.dataType = 2;
      this.formData.teamId = this.teamInfoId;
      if (this.popupType == "add") {
        let data = await this.$post(
          "/dah-training-api/supplies/insertSupplies",
          this.formData
        );
        if (data.data) {
          this.$message.success("添加成功");
        } else {
          this.$message({
            message: data.message,
            type: "warning",
          });
        }
      } else {
        let data = await this.$post(
          "/dah-training-api/supplies/updateSupplies",
          this.formData
        );
        if (data.data) {
          this.$message.success("保存成功");
        } else {
          this.$message({
            message: data.message,
            type: "warning",
          });
        }
      }
      this.getDataList1();
      this.suppliesPopupShow1 = false;
    },
    async getDataList1() {
      const data = await this.$post("/dah-training-api/supplies/selectList", {
        name: this.keyword1,
        suppliesTypeId: this.teamSupplies,
        dataType: 2,
        teamId: this.teamInfoId,
      });
      this.suppliesList = data.data;
      this.suppliesList.map((item, index) => {
        item.no = index + 1;
      });
    },
    addTeam2() {
      this.suppliesPopupShow2 = true;
      this.formData = {};
      this.popupTitle = "新增装备";
      this.popupType = "add";
    },
    upTeam2(row) {
      this.suppliesPopupShow2 = true;
      this.formData = row;
      this.popupTitle = "修改装备";
      this.popupType = "up";
    },
    async delTeam2(row) {
      this.$confirm("此操作将永久删除该条信息，且无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await this.$post(
            "/dah-training-api/baseEquipment/deleteBaseEquipment",
            {
              id: row.id,
              dataType: 2,
            }
          );
          this.getDataList2();
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
    cancel2() {
      this.suppliesPopupShow2 = false;
      if (this.popupType == "up") {
        this.getDataList2();
      }
    },
    async submit2() {
      if (
        !this.formData.equipmentName ||
        !this.formData.type ||
        !this.formData.unitMeasurement ||
        !this.formData.numberEquipment ||
        !this.formData.storageLocation
      ) {
        this.$message.warning("*为必填项，未填完！");
        return;
      }
      if (
        (this.formData.equipmentName &&
          this.formData.equipmentName.length > 50) ||
        (this.formData.unitMeasurement &&
          this.formData.unitMeasurement.length > 50) ||
        (this.formData.numberEquipment &&
          this.formData.numberEquipment.length > 50) ||
        (this.formData.storageLocation &&
          this.formData.storageLocation.length > 50) ||
        (this.formData.model && this.formData.model.length > 50) ||
        (this.formData.equipmentUse && this.formData.equipmentUse.length > 50)
      ) {
        this.$message.warning("超出最大长度，最大限50");
        return;
      }
      if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.equipmentName) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.equipmentUse) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.formData.storageLocation
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(
          this.formData.unitMeasurement
        ) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.formData.model)
      ) {
        this.$message({
          message: "警告，不能包含特殊字符！",
          type: "warning",
        });
        return;
      }
      this.formData.dataType = 2;
      this.formData.teamId = this.teamInfoId;
      if (this.popupType == "add") {
        let data = await this.$post(
          "/dah-training-api/baseEquipment/addBaseEquipment",
          this.formData
        );
        if (data.data) {
          this.$message.success("添加成功");
        } else {
          this.$message({
            message: data.message,
            type: "warning",
          });
        }
      } else {
        let data = await this.$post(
          "/dah-training-api/baseEquipment/updateBaseEquipment",
          this.formData
        );
        if (data.data) {
          this.$message.success("保存成功");
        } else {
          this.$message({
            message: data.message,
            type: "warning",
          });
        }
      }
      this.getDataList2();
      this.suppliesPopupShow2 = false;
    },
    async getDataList2() {
      const data = await this.$post(
        "/dah-training-api/emergencyTeam/getEmergencySupplies",
        {
          id: this.teamInfoId,
          keyword: this.keyword2,
          equipmentType: this.teamEquipment,
          type: 2,
        }
      );
      this.equipmentList = data.data.equipment;
      this.equipmentList.map((item, index) => {
        item.no = index + 1;
      });
    },
    async getTeamInfo() {
      const data = await this.$post(
        "/dah-training-api/emergencyTeam/emergencyTeamDetails",
        { id: this.teamInfoId }
      );
      this.teamInfoData = data.data;
    },
    goPage() {
      this.$router.push("/emergencyTeam");
    },
    mapInit() {
      AMapLoader.load({
        key: "72a70b13fa89dae0755b1020f63fd013", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], //插件列表
      })
        .then((AMap) => {
          var map = new AMap.Map("container", {
            zoom: 11, //级别
            center: [this.teamInfoData.longitude, this.teamInfoData.latitude], //中心点坐标
            viewMode: "3D", //使用3D视图
          });
          const marker = new AMap.Marker({
            position: new AMap.LngLat(
              this.teamInfoData.longitude,
              this.teamInfoData.latitude
            ),
          });
          map.add(marker);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./../../assets/css/index.css");
.el-table::before,
.el-table--border::after {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0 !important;
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
  background: #fff;
  border-radius: 5px;
  
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
}
.increaseContent .top {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #5a71e2;
  color: #fff;
}
.footpage {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.increaseContent .content2 {
  // height: 280px;
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
  margin-bottom: 20px;
  justify-content: space-between;
  > div {
    display: flex;
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
.inputDiv {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 10px;
  > div:nth-child(1) {
    color: #656c97;
    height: 28px;
    padding: 0 10px;
    border: 1px solid #dcdfe6;
    border-right: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  i {
    font-style: normal;
    color: #df615d;
  }
}
.content-bottom {
  margin-top: 20px;
  .bottom-nav {
    list-style: none;
    display: flex;
    position: relative;
    top: 1px;
    li {
      padding: 10px;
      font-size: 12px;
      border: 1px solid rgba(255, 255, 255, 0);
      cursor: pointer;
    }
    li:hover {
      color: #5a70e2;
    }
  }
  .bottom-ctt {
    width: 100%;
    min-height: 526px;
    border: 1px solid #5a70e2;
    border-radius: 3px;
    font-size: 12px;
    padding: 10px;
    .title {
      border-left: 3px solid #5a71e2;
      padding-left: 10px;
      margin-bottom: 15px;
    }
    .cct-item {
      display: flex;
      margin-bottom: 10px;
      div {
        width: 20%;
        display: flex;
        span {
          color: #8488ac;
        }
        i {
          // width: 60px;
          // height: 20px;
          padding: 3px 5px;
          font-style: normal;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #eff1fc;
          color: #5a71e2;
          border-radius: 2px;
          margin-right: 8px;
        }
      }
    }
    .cct-item2 {
      display: flex;
      > div:nth-child(2) {
        > div {
          margin-bottom: 10px;
        }
        span {
          color: #8488ac;
        }
        i {
          font-style: normal;
          color: #5a71e2;
          font-size: 20px;
          font-weight: bold;
          margin-right: 20px;
        }
      }
    }
  }
}
.content-top {
  display: flex;
  justify-content: space-between;
  .top-left {
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      .label {
        padding: 2px 10px;
        background: #5a71e2;
        color: #fff;
        border-radius: 3px;
        margin-right: 10px;
      }
      .name {
        font-size: 18px;
        font-weight: bold;
        margin-right: 40px;
      }
      i {
        margin-right: 10px;
      }
    }
    .informationItem {
      margin-right: 40px;
      span {
        color: #8488ac;
      }
    }
  }
  .top-right {
    display: flex;
    justify-content: space-between;
    width: 500px;
    font-size: 12px;
    > div {
      display: flex;
      > div:nth-child(1) {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: #f2f2f9;
        img {
          width: 36px;
          height: 36px;
        }
      }
      > div:nth-child(2) {
        margin-left: 10px;
        > div:nth-child(1) {
          margin: 10px 0;
        }
        > div:nth-child(2) {
          color: #bfc2d3;
          span {
            font-size: 18px;
            font-weight: bold;
            margin-right: 7px;
          }
        }
      }
    }
  }
}
.location {
  display: flex;
  height: 40px;
  align-items: center;
  font-size: 12px;
  img {
    margin-right: 10px;
  }
  .directory1 {
    padding-right: 10px;
    border-right: 1px solid;
  }
  .directory2 {
    padding: 0 10px;
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
.content2 {
  background: #fff;
  padding: 10px;
  border-radius: 3px;
}
</style>