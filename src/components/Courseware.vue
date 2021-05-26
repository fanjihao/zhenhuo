<template>
  <div class="courseware">
    <div class="location">
      <img src="@/assets/image/u974.svg" alt="" />
      <div class="directory1">真火实训</div>
      <div class="directory2">实训课件</div>
    </div>
    <div class="courseware-section">
      <div class="left">
        <div class="header">课件列表</div>
        <div class="options">
          <div class="options-left">
            <div class="option-item1" @click.stop="drop = !drop">
              <div class="item1-title">燃烧场景</div>
              <div class="item1-content">
                <div>{{ dropText ? dropText : "全部" }}</div>
                <i :class="drop ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
              </div>
              <transition name="el-zoom-in-top">
                <div class="item1-drop" v-if="drop">
                  <div class="item1-drop-item" @click.stop="setDropValue('')">
                    全部
                  </div>
                  <div
                    v-for="item in dropList"
                    :key="item.id"
                    class="item1-drop-item"
                    @click.stop="setDropValue(item.value)"
                  >
                    {{ item.value }}
                  </div>
                </div>
              </transition>
            </div>
            <div class="option-item2">
              <input
                type="text"
                placeholder="请输入课件或脚本名称"
                v-model="coursewareVal"
              />
            </div>
            <div class="option-search" @click="searchList">查询</div>
            <div class="option-search" @click="resetSearch">重置</div>
          </div>
          <div class="option-add" @click="openAdd()">
            <i class="el-icon-plus" />
            <span>新增</span>
          </div>
        </div>
        <div class="courseware-content">
          <div class="coursewqre-list">
            <div
              class="list-item"
              v-for="item in coursewareList"
              :key="item.id"
              @click.stop="openDetail(item.id)"
            >
              <div class="list-item-top">
                <span class="list-item-top-left">{{ item.name }}</span>
                <div class="list-item-top-right">
                  <i class="el-icon-edit" @click.stop="openEdit(item)" />
                  <i class="el-icon-delete" @click.stop="deleteMsg(item.id)" />
                </div>
              </div>
              <div class="list-item-section">
                <span class="span1">燃烧场景：</span>
                <span
                  class="ball span2"
                  v-if="item.burningSceneName.indexOf('球罐') !== -1"
                  >球罐</span
                >
                <span
                  class="car span2"
                  v-if="item.burningSceneName.indexOf('槽车') !== -1"
                  >槽车</span
                >
                <span
                  class="tank span2"
                  v-if="item.burningSceneName.indexOf('浮顶罐') !== -1"
                  >浮顶罐</span
                >
              </div>
              <div class="list-item-section">
                <span class="span1">预计时长：</span>
                <span>{{ item.estimatedDuration }}分钟</span>
              </div>
              <div class="list-item-section">
                <span class="span1">脚本名称：</span>
                <span>{{ item.scriptName }}</span>
              </div>
              <div class="list-item-footer">
                <div class="list-item-footer-left">
                  <span class="span1">已实训：</span>
                  <span class="span3">{{ item.useNum }}</span>
                </div>
                <div
                  class="list-item-footer-right"
                  @click.stop="openStartPra(item)"
                >
                  <i class="el-icon-caret-right" />
                  <span>开始实训</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pages">
            <el-pagination
              background
              layout="total,prev, pager, next"
              :total="courseTotal"
              :page-size="coursePageSize"
              @current-change="pageCurrentChange"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-title">
          <span>课件统计</span>
          <!-- <i class="el-icon-s-data" /> -->
        </div>
        <div class="right-content">
          <div class="right-c-section1">
            <span class="span1">课件总数</span>
            <div>
              <span class="span2">{{ coursewareTotal }}</span>
              <span>个</span>
            </div>
          </div>
          <div class="right-c-section2">
            <div class="right-c-s2-top">
              <span class="span1"></span>
              <span class="span2">燃烧场景</span>
            </div>
            <div class="right-c-s2-content">
              <div id="charts" :style="{ width: '100%', height: '100%' }"></div>
            </div>
          </div>

          <div class="right-c-section2">
            <div class="right-c-s2-top">
              <span class="span1"></span>
              <span class="span2">课件实训排行TOP10</span>
            </div>
            <div class="right-c-s2-c2">
              <div
                class="item"
                v-for="(item, index) in rankingList"
                :key="index"
              >
                <div
                  :class="
                    index === 0
                      ? 'item1-left item-left'
                      : index === 1
                      ? 'item2-left item-left'
                      : index === 2
                      ? 'item3-left item-left'
                      : 'item-left'
                  "
                >
                  <span
                    :class="
                      index === 0
                        ? 'ranking ranking1'
                        : index === 1
                        ? 'ranking ranking2'
                        : index === 2
                        ? 'ranking ranking3'
                        : 'ranking'
                    "
                    >{{ index + 1 }}</span
                  >
                  <span
                    :class="
                      index === 0
                        ? 'name1 name'
                        : index === 1
                        ? 'name2 name'
                        : index === 2
                        ? 'name3 name'
                        : 'name'
                    "
                    :title="item.name"
                    >{{ item.name | ellipsis }}</span
                  >
                </div>
                <div
                  :class="
                    index === 0
                      ? 'item1-right item-right'
                      : index === 1
                      ? 'item2-right item-right'
                      : index === 2
                      ? 'item3-right item-right'
                      : 'item-right'
                  "
                >
                  <span>已实训：</span>
                  <span
                    :class="
                      index === 0
                        ? 'span1'
                        : index === 1
                        ? 'span2'
                        : index === 2
                        ? 'span3'
                        : 'span'
                    "
                    >{{ item.num }}次</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增、编辑、详情模态框 -->
    <el-dialog
      :visible="add"
      :show-close="false"
      width="65%"
      custom-class="dialog-padding"
    >
      <div class="dialog-add">
        <div class="add-header">
          <span>{{ modalTitle }}</span>
          <span class="del" @click="addCancel">X</span>
        </div>

        <div class="add-content">
          <div class="add-c-item">
            <div class="add-c-i-lable">
              <span class="span1">*</span>
              <span>课件名称</span>
            </div>
            <div class="add-c-i-input">
              <input
                style="width: 100%"
                type="text"
                placeholder="请输入课件名称"
                v-model="courseName"
                :readonly="readonly || editReadonly"
                @blur="
                  () => {
                    if (courseName.length > 50) {
                      this.$message.warning('课件名称字段长度不符');
                      this.courseName = '';
                    }
                  }
                "
              />
            </div>
          </div>
          <div class="add-c-item1">
            <div class="add-c-item1-item">
              <div class="add-c-i1-lable">
                <span class="span1">*</span>
                <span>脚本名称</span>
              </div>
              <div
                class="add-c-i1-script"
                @click="
                  modalType === 'detail' || modalType === 'edit'
                    ? ''
                    : (script = !script)
                "
              >
                <div>{{ scriptText ? scriptText : "-" }}</div>
                <i
                  :class="script ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                />
                <transition name="el-zoom-in-top">
                  <div class="script-drop" v-if="script">
                    <div
                      v-for="item in scriptList"
                      :key="item.id"
                      class="script-drop-item"
                      @click.stop="
                        modalType === 'detail' || modalType === 'edit'
                          ? null
                          : setScriptText(item)
                      "
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div class="add-c-item1-item">
              <div class="add-c-i1-lable">
                <span class="span1">*</span>
                <span>预计时长</span>
              </div>
              <div class="add-c-i1-input">
                <input
                  type="text"
                  placeholder="请输入预计时长"
                  v-model="expectedTime"
                  :readonly="readonly || editReadonly"
                  @blur="
                    () => {
                      if (
                        !/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(
                          expectedTime
                        ) &&
                        expectedTime !== ''
                      ) {
                        this.$message.warning('输入数据类型不符');
                        this.expectedTime = '';
                      }
                    }
                  "
                />
                <span>分钟</span>
              </div>
            </div>
          </div>

          <div class="add-c-item2">
            <div>科目内容</div>
            <div class="add-c-i-input2">
              <textarea
                v-model="subjectsContent"
                :readonly="readonly"
                @blur="
                  () => {
                    if (subjectsContent.length > 500) {
                      this.$message.warning('科目内容字段长度不符');
                      this.subjectsContent = '';
                    }
                  }
                "
              />
            </div>
          </div>
          <div class="add-c-item2">
            <div>使用器材</div>
            <div class="add-c-i-input2">
              <textarea
                v-model="useEquipment"
                :readonly="readonly"
                @blur="
                  () => {
                    if (useEquipment.length > 500) {
                      this.$message.warning('使用器材字段长度不符');
                      this.useEquipment = '';
                    }
                  }
                "
              />
            </div>
          </div>
          <div class="add-c-item2">
            <div>实训对象</div>
            <div class="add-c-i-input2">
              <textarea
                v-model="trainingObj"
                :readonly="readonly"
                @blur="
                  () => {
                    if (trainingObj.length > 500) {
                      this.$message.warning('实训对象字段长度不符');
                      this.trainingObj = '';
                    }
                  }
                "
              />
            </div>
          </div>
          <div class="add-c-item2">
            <div>事前准备</div>
            <div class="add-c-i-input2">
              <textarea
                v-model="prepare"
                :readonly="readonly"
                @blur="
                  () => {
                    if (prepare.length > 500) {
                      this.$message.warning('事前准备字段长度不符');
                      this.prepare = '';
                    }
                  }
                "
              />
            </div>
          </div>
          <div class="add-c-item2">
            <div>安全注意事项</div>
            <div class="add-c-i-input2">
              <textarea
                v-model="safety"
                :readonly="readonly"
                @blur="
                  () => {
                    if (safety.length > 500) {
                      this.$message.warning('安全注意事项字段长度不符');
                      this.safety = '';
                    }
                  }
                "
              />
            </div>
          </div>

          <div class="line"></div>

          <div class="scriptInfo">
            <div class="notData" v-if="scriptText === ''">
              未选择真火脚本...
            </div>
            <div class="scriptInfoDetail" v-if="scriptInfo">
              <div class="scriptName">{{ scriptInfo.name }}</div>
              <div class="scriptInfoDetail-item">
                <span class="script-lable">同步时间：</span>
                <span>{{ scriptInfo.syncTime }}</span>
              </div>
              <div class="scriptInfoDetail-item">
                <span class="script-lable">编码：</span>
                <span>{{ scriptInfo.code }}</span>
              </div>
              <div class="scriptInfoDetail-item">
                <span class="script-lable">总时间：</span>
                <span>{{ scriptInfo.trainingTime }}分钟</span>
              </div>
              <div class="scriptInfoDetail-item">
                <span class="script-lable">燃烧场景：</span>
                <span>{{ scriptInfo.burningScene }}</span>
              </div>
              <div class="scriptInfoDetail-item">
                <span class="script-lable">描述：</span>
                <span>{{
                  scriptInfo.description ? scriptInfo.description : "暂无"
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="add-footer">
          <div class="add-footer-item cancel" @click="addCancel">取消</div>
          <div
            v-if="modalType === 'add'"
            class="add-footer-item confirm"
            @click="addHandle()"
          >
            确认
          </div>
          <div v-else class="add-footer-item confirm" @click="editHandle()">
            确认
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 发起实训模态框 -->
    <el-dialog
      :visible="visible"
      :show-close="false"
      width="65%"
      custom-class="dialog-padding"
    >
      <div class="dialog-initiate">
        <div class="add-header">
          <span>发起实训</span>
          <span class="del" @click="initiateCancel">X</span>
        </div>

        <div class="initiate-content">
          <div class="initiate-section1">
            <div class="init-s1-title">
              <span class="line"></span>
              <span class="name">{{ startPraName }}</span>
            </div>

            <div class="init-s1-item">
              <div class="left">
                <span class="span1">*</span>
                <span>实训名称</span>
              </div>
              <div class="right">
                <input
                  type="text"
                  placeholder="请输入实训名称"
                  v-model="name"
                  style="width: 100%"
                  @blur="
                    () => {
                      if (name.length > 50) {
                        this.$message.warning('实训名称字段长度不符');
                        this.name = '';
                      }
                    }
                  "
                />
              </div>
            </div>

            <div class="init-s1-item">
              <div class="left">
                <span class="span1">*</span>
                <span>实训地点</span>
              </div>
              <div class="right">
                <input
                  type="text"
                  placeholder="请输入实训地点"
                  v-model="location"
                  style="width: 100%"
                  @blur="
                    () => {
                      if (location.length > 50) {
                        this.$message.warning('实训地点字段长度不符');
                        this.location = '';
                      }
                    }
                  "
                />
              </div>
            </div>

            <div class="init-s1-item">
              <div class="left">
                <span class="span1">*</span>
                <span>计划时间</span>
              </div>
              <div class="right">
                <el-date-picker
                  v-model="startTime"
                  type="datetime"
                  placeholder="选择开始时间"
                  :picker-options="datePickerOptions"
                  @change="setStartTime"
                  format="yyyy-MM-dd HH:mm:ss"
                />
                <span class="to">-</span>
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="datePickerOptions"
                  @change="setEndTime"
                />
              </div>
            </div>
          </div>
          <div class="initiate-section2">
            <div class="init-s2-title">
              <span class="line"></span>
              <span class="name">参训队伍</span>
            </div>

            <div class="init-s2-content">
              <div class="left">
                <div class="header-search">
                  <input
                    type="text"
                    placeholder="请输入关键字"
                    v-model="searchTeamVal"
                  />
                  <i class="el-icon-search" @click="getTeamList" />
                </div>
                <div class="left-content">
                  <div
                    v-for="(item, index) in teamList"
                    :key="item.id"
                    :class="
                      checkTeam === index ? 'left-c-check-item' : 'left-c-item'
                    "
                    @click="checkTheTeam(index, item.id)"
                    :title="item.teamName"
                  >
                    {{ item.teamName | ellipsis }}
                  </div>
                </div>
              </div>

              <div class="right">
                <div class="right-title">应急人员</div>
                <div class="right-content">
                  <div class="right-c-item1">
                    <div class="right-c-item1-title">
                      待选人员（{{ stayList.length }}个）
                    </div>
                    <div class="right-c-item1-search">
                      <input
                        type="text"
                        placeholder="请输入关键字"
                        v-model="tobeSelectKey"
                      />
                      <i class="el-icon-search" @click="searchPeople" />
                    </div>
                    <div class="right-c-item1-table">
                      <el-table
                        ref="multipleTable"
                        :data="stayList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        :border="true"
                        height="200"
                        :header-cell-style="{ backgroundColor: '#fcfcfc' }"
                        stripe
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                          height="30"
                        >
                        </el-table-column>
                        <el-table-column label="人员姓名" height="30">
                          <template slot-scope="scope">{{
                            scope.row.name
                          }}</template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div class="right-c-item2">
                    <div class="right-c-item2-check" @click="toHasList">
                      <i class="el-icon-d-arrow-right" />
                    </div>
                    <div class="right-c-item2-item" @click="delHasList">
                      <i class="el-icon-d-arrow-left" size="16" />
                    </div>
                  </div>
                  <div class="right-c-item1">
                    <div class="right-c-item1-title">
                      已选人员（{{ hasList.length }}个）
                    </div>
                    <div class="right-c-item1-search">
                      <input
                        type="text"
                        placeholder="请输入关键字"
                        v-model="alreadyCheckKey"
                      />
                      <i class="el-icon-search" @click="searchalPeople" />
                    </div>
                    <div class="right-c-item1-table">
                      <el-table
                        ref="multipleTable2"
                        :data="hasList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="hasSelectionChange"
                        :border="true"
                        height="200"
                        :header-cell-style="{ backgroundColor: '#fcfcfc' }"
                        stripe
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                          height="30"
                        >
                        </el-table-column>
                        <el-table-column label="人员姓名" height="30">
                          <template slot-scope="scope">{{
                            scope.row.name
                          }}</template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="initiate-section2">
            <div class="init-s2-title">
              <span class="line"></span>
              <span class="name">监控配置</span>
            </div>

            <div class="init-s2-content">
              <div class="left">
                <div class="left-content">
                  <div
                    v-for="item in placeList"
                    :key="item.id"
                    :class="
                      checkPlace.id === item.id
                        ? 'left-c-check-item'
                        : 'left-c-item'
                    "
                    @click="checkPlaceHandle(item)"
                    :title="item.monitoringPlaceName"
                  >
                    {{ item.monitoringPlaceName | ellipsis }}
                  </div>
                </div>
              </div>

              <div class="right">
                <div class="right-title">监控</div>
                <div class="right-content">
                  <div class="right-c-item1">
                    <div class="right-c-item1-title">待选</div>
                    <div class="right-c-item1-table">
                      <el-table
                        ref="multipleTable"
                        :data="camereList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleCameraChange"
                        :border="true"
                        height="200"
                        :header-cell-style="{ backgroundColor: '#fcfcfc' }"
                        stripe
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                          height="30"
                        >
                        </el-table-column>
                        <el-table-column label="摄像头名称" height="30">
                          <template slot-scope="scope">{{
                            scope.row.cameraName
                          }}</template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div class="right-c-item2">
                    <div class="right-c-item2-check" @click="toSubmitList">
                      <i class="el-icon-d-arrow-right" />
                    </div>
                    <div class="right-c-item2-item" @click="delCamera">
                      <i class="el-icon-d-arrow-left" size="16" />
                    </div>
                  </div>
                  <div class="right-c-item1">
                    <div class="right-c-item1-title">已选（最多9个）</div>
                    <div class="right-c-item1-table">
                      <el-table
                        ref="multipleTable2"
                        :data="submitList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="hasCameraChange"
                        :border="true"
                        height="200"
                        :header-cell-style="{ backgroundColor: '#fcfcfc' }"
                        stripe
                      >
                        <el-table-column
                          type="selection"
                          width="55"
                          height="30"
                        >
                        </el-table-column>
                        <el-table-column label="摄像头名称" height="30">
                          <template slot-scope="scope">{{
                            scope.row.cameraName
                          }}</template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="add-footer">
          <div class="add-footer-item cancel" @click="initiateCancel">取消</div>
          <div class="add-footer-item confirm" @click="initiateHandle">
            确认
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import QS from "qs";
import * as echarts from "echarts";
export default {
  name: "Courseware",
  data() {
    return {
      drop: false,
      // 燃烧场景列表
      dropList: [],
      dropText: "",
      code: "burning-scene",
      // 课件列表
      coursewareList: [],
      courseTotal: 0,
      coursePageSize: 12,
      courwareId: "",
      coursewareName: "",
      // 课件或脚本名称
      coursewareVal: "",
      // 当前课件列表页数
      pageNum: 1,

      // 课件总数
      coursewareTotal: null,
      add: false,
      // 新增、编辑模态框状态（add,edit）
      modalType: "",
      // 标题
      modalTitle: "",

      // 课件名称
      courseName: "",
      // 脚本下拉列表
      script: false,
      scriptText: "",
      scriptList: [],
      scriptInfo: null,
      scriptId: null,
      // 预计时长
      expectedTime: "",
      // 科目内容
      subjectsContent: "",
      // 使用器材
      useEquipment: "",
      // 实训对象
      trainingObj: "",
      // 事前准备
      prepare: "",
      // 安全注意事项
      safety: "",

      // 课件实训排行列表
      rankingList: [],
      // 图表列表
      chartsList: [],

      // 发起实训
      visible: false,
      // 实训课件名称
      startPraName: "",
      // 选中队伍index
      checkTeam: "",
      // 选中队伍ID
      checkTeamId: "",
      // 实训队伍列表
      teamList: [],
      // 待选人员列表
      stayList: [],
      stayPageTotal: "",
      // 已选人员列表
      hasList: [],

      // 选中的待选人员列表
      staySelection: [],
      // 选中的已选人员列表
      hasSelection: [],
      // 实训名称
      name: "",
      // 实训地点
      location: "",
      // 实训时间
      time: null,
      startTime: null,
      endTime: null,
      tobeSelectKey: "", // search关键字
      alreadyCheckKey: "",
      another: [],
      alanother: [],

      searchTeamVal: "",

      datePickerOptions: {
        disabledDate(time) {
          let now = new Date();
          return time.getTime() < now; //小于当前的禁止
        },
      },
      // endDatePickerOptions: {
      //   disabledDate(time) {
      //     let now = new Date();
      //     let min = new Date(this.endTime)
      //     return time.getTime() <= now && time.getTime() <= min; //大于当前的禁止，小于7天前的禁止
      //   },
      // },

      // 只读
      readonly: null,
      // 编辑情况下只读
      editReadonly: null,

      edititem: "",

      placeList: [],
      checkPlace: "",
      camereList: [],
      checkCamera: "",
      configList: [],
      submitList: [],
      cameraSelection: [],
      hasCamera: [],
    };
  },
  created() {
    this.getOptions();
    this.getList();
    this.getStatistical();
  },
  mounted() {
    setTimeout(() => {
      this.drawLine();
    }, 1000);
  },
  methods: {
    // 获取场所
    async getPlace() {
      let params = {
        limit: 10000,
        offset: 1,
      };
      let data = await this.$post(
        "/dah-training-api/video/selectVideoByPage",
        params
      );
      if (data.code === 200) {
        this.placeList = data.data.list;
      } else {
        console.log(data);
      }
    },
    checkPlaceHandle(row) {
      this.axios({
        url: "/dah-training-api/video/selectWebcamByPage",
        method: "POST",
        data: QS.stringify({
          limit: 10000,
          offset: 1,
          videoDeviceId: row.id,
        }),
      })
        .then((res) => {
          this.checkPlace = row;
          this.camereList = res.data.data.list;
          if (this.submitList.length > 0) {
            for (var i = 0; i < this.camereList.length; i++) {
              for (var j = 0; j < this.submitList.length; j++) {
                if (this.camereList[i].id === this.submitList[j].id) {
                  //第一个等同于第二个，splice方法删除第二个
                  this.camereList.splice(j, 1);
                  // i--;
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 选中的待选人员
    handleCameraChange(val) {
      this.cameraSelection = val;
    },
    // 选中的已选人员
    hasCameraChange(val) {
      this.hasCamera = val;
    },
    // 添加实训人员
    toSubmitList() {
      if (this.submitList.length > 0) {
        let arr = this.submitList.concat(this.cameraSelection);
        this.submitList = [...new Set(arr)];
      } else {
        this.submitList = this.cameraSelection;
      }
    },
    delCamera() {
      for (var i = 0; i < this.submitList.length; i++) {
        for (var j = 0; j < this.hasCamera.length; j++) {
          if (this.submitList[i].id === this.hasCamera[j].id) {
            this.submitList.splice(j, 1);
            i--;
          }
        }
      }
      if(this.checkPlace !== "") {
        this.checkPlaceHandle(this.checkPlace);
      }
    },
    // 初始化图表
    drawLine() {
      let option = {
        legend: {
          right: "right",
          top: 40,
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
            data: this.chartsList,
            center: ["30%", "50%"],
          },
        ],
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("charts"));
      // 绘制图表
      myChart.setOption(option);
    },
    searchPeople() {
      if (this.tobeSelectKey === "") {
        this.stayList = this.another;
      } else {
        let arr = this.another;
        let newarr = arr.filter(
          (item) => item.name.indexOf(this.tobeSelectKey) !== -1
        );
        this.stayList = newarr;
      }
    },
    searchalPeople() {
      if (this.alreadyCheckKey === "") {
        this.hasList = this.alanother;
      } else {
        let arr = this.alanother;
        let newarr = arr.filter(
          (item) => item.name.indexOf(this.alreadyCheckKey) !== -1
        );
        this.hasList = newarr;
      }
    },
    // 获取燃烧场景
    getOptions() {
      this.axios({
        method: "POST",
        url: `/dah-training-api/wordbook/select?code=${this.code}`,
      })
        .then((res) => {
          // console.log("获取成功", res);
          this.dropList = res.data.data;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 下拉列表选择
    setDropValue(val) {
      this.dropText = val;
      this.drop = !this.drop;
    },
    // 获取分页课件列表
    getList() {
      let data = {
        // 燃烧场景
        burningSceneName: this.dropText,
        // 课件或脚本名称
        name: this.coursewareVal,
        // 每页数量
        limit: this.coursePageSize,
        // 页码
        offset: this.pageNum,
      };
      let params = new FormData();
      for (let k in data) {
        params.append(k, data[k]);
      }
      this.axios({
        method: "POST",
        url: "/dah-training-api/courseware/selectCourseware",
        data: params,
      })
        .then((res) => {
          console.log("获取成功=============", res);
          this.coursewareList = res.data.data.list;
          this.courseTotal = res.data.data.total;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 课件详情
    getDetail() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/courseware/getCourseware",
        data: QS.stringify({
          id: this.courwareId,
        }),
      })
        .then((res) => {
          console.log("获取课件详情成功", res);
          this.courseName = res.data.data.name;
          this.expectedTime = res.data.data.estimatedDuration;
          this.subjectsContent = res.data.data.subjectContent;
          this.useEquipment = res.data.data.equipment;
          this.trainingObj = res.data.data.trainingObject;
          this.prepare = res.data.data.ready;
          this.safety = res.data.data.safetyPrecautions;
          this.scriptText = res.data.data.scriptName;
          this.scriptInfo = res.data.data.trainingScript;
          this.scriptId = res.data.data.scriptId;
          this.edititem = res.data.data;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 查询课件
    searchList() {
      this.pageNum = 1;
      this.getList();
    },
    // 重置查询
    resetSearch() {
      this.pageNum = 1;
      this.coursewareVal = "";
      this.dropText = "";
      this.getList();
    },
    // 获取脚本列表
    getScript() {
      let data = {
        limit: 100,
        offset: 1,
      };
      let params = new FormData();
      for (let k in data) {
        params.append(k, data[k]);
      }
      this.axios({
        method: "POST",
        url: "/dah-training-api/script/selectByPage",
        data: params,
      })
        .then((res) => {
          // console.log("获取成功", res);
          this.scriptList = res.data.data.list;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 打开新增弹窗
    openAdd() {
      this.modalType = "add";
      this.modalTitle = "新增课件";
      this.getScript();
      this.add = true;
    },
    // 打开课件详情模态框
    openDetail(id) {
      this.modalType = "detail";
      this.modalTitle = "课件详情";
      this.courwareId = id;
      this.getDetail();
      this.readonly = "readonly";
      this.add = true;
    },
    // 打开编辑模态框
    openEdit(data) {
      console.log(data);
      this.modalType = "edit";
      this.modalTitle = "编辑课件";
      this.courwareId = data.id;
      this.getDetail();
      this.getScript();
      this.editReadonly = "readonly";
      this.add = true;
    },
    // 选择脚本
    setScriptText(item) {
      // console.log(item)
      this.scriptText = item.name;
      this.scriptInfo = item;
      this.scriptId = item.id;
      this.script = !this.script;
      this.expectedTime = item.trainingTime;
    },
    // 获取课件统计数据
    getStatistical() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/courseware/coursewareStatistics",
      })
        .then((res) => {
          this.coursewareTotal = res.data.data.total;
          this.rankingList = res.data.data.coursewareRanking;
          let newList = [];
          let data = res.data.data.burningScene;
          data.map((item) => {
            newList.push({
              name: item.burningSceneName,
              value: item.burningNum,
            });
          });
          this.chartsList = newList;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 退出新增、编辑页面
    addCancel() {
      this.courseName = "";
      this.scriptText = "";
      this.expectedTime = "";
      this.subjectsContent = "";
      this.useEquipment = "";
      this.trainingObj = "";
      this.prepare = "";
      this.safety = "";
      this.scriptInfo = null;
      this.scriptId = null;
      this.scriptText = "";
      this.add = false;
      this.readonly = null;
      this.editReadonly = null;
      this.script = false;
    },
    // pageNum (当前页数)改变时会触发 课件
    pageCurrentChange(val) {
      this.pageNum = val;
      // console.log("当前页:" + this.pageNum);
      this.getList();
    },
    // 新增课件操作
    addHandle() {
      // console.log(this.modalType)
      if (
        this.courseName === "" ||
        this.scriptText === "" ||
        this.expectedTime === ""
      ) {
        this.$message({
          message: "*号为必填字段",
          type: "warning",
        });
      } else if (/[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.courseName)) {
        this.$message({
          message: "课件名称不支持特殊字符",
          type: "warning",
        });
      } else if (this.expectedTime < this.scriptInfo.trainingTime) {
        this.$message.warning("预计时长需大于脚本时长");
      } else {
        // console.log(this.scriptInfo);
        let data = {
          name: this.courseName,
          scriptId: this.scriptId,
          scriptName: this.scriptText,
          estimatedDuration: this.expectedTime,
          subjectContent: this.subjectsContent,
          equipment: this.useEquipment,
          trainingObject: this.trainingObj,
          ready: this.prepare,
          safetyPrecautions: this.safety,
          burningSceneId: this.scriptInfo.burningSceneId,
        };
        let params = new FormData();
        for (let key in data) {
          params.append(key, data[key]);
        }
        this.axios({
          method: "POST",
          url: "/dah-training-api/courseware/insert",
          data: params,
        })
          .then((res) => {
            if (res.data.data) {
              this.$message({
                type: "success",
                message: "已成功新增课件！",
                duration: 1000,
              });
              this.getList();
              this.getStatistical();
              setTimeout(() => {
                this.drawLine();
              }, 1000);
              this.addCancel();
            }
          })
          .catch((err) => {
            console.log("新增失败", err);
          });
      }
    },
    // 编辑课件操作
    editHandle() {
      // console.log(this.modalType)
      if (
        this.courseName === "" ||
        this.scriptText === "" ||
        this.expectedTime === ""
      ) {
        this.$message({
          message: "*号为必填字段",
          type: "warning",
        });
      } else {
        console.log(this.edititem);
        let data = {
          name: this.courseName,
          scriptId: this.scriptId,
          scriptName: this.scriptText,
          estimatedDuration: this.expectedTime,
          subjectContent: this.subjectsContent,
          equipment: this.useEquipment,
          trainingObject: this.trainingObj,
          ready: this.prepare,
          safetyPrecautions: this.safety,
          burningSceneId: this.scriptInfo.burningSceneId,
          id: this.courwareId,
          useNum: this.edititem.useNum,
          isDel: this.edititem.isDel,
        };
        let params = new FormData();
        for (let key in data) {
          params.append(key, data[key]);
        }
        this.axios({
          method: "POST",
          url: "/dah-training-api/courseware/update",
          data: params,
        })
          .then((res) => {
            if (res.data.data) {
              this.$message({
                type: "success",
                message: "已成功修改课件！",
              });
              this.getList();
              this.courseName = "";
              this.scriptText = "";
              this.expectedTime = "";
              this.subjectsContent = "";
              this.useEquipment = "";
              this.trainingObj = "";
              this.prepare = "";
              this.safety = "";
              this.scriptInfo = null;
              this.scriptId = null;
              this.scriptText = "";
              this.add = false;
            }
          })
          .catch((err) => {
            console.log("修改失败", err);
          });
      }
    },
    // 删除课件弹框
    deleteMsg(id) {
      // console.log(e)
      this.$confirm("删除将无法找回该数据，请确认是否删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          // console.log(id)
          this.delHandle(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！",
          });
        });
    },
    // 删除课件操作
    delHandle(id) {
      this.axios({
        method: "POST",
        url: `/dah-training-api/courseware/delete?id=${id}`,
      })
        .then((res) => {
          // console.log("删除成功", res);
          if (res.data.data) {
            this.$message({
              type: "success",
              message: "已成功删除！",
            });
            this.getList();
            this.getStatistical();
            setTimeout(() => {
              this.drawLine();
            }, 1000);
            this.addCancel();
          }
        })
        .catch((err) => {
          console.log("删除失败", err);
        });
    },
    // 打开发起实训模态框
    openStartPra(item) {
      console.log(item);
      this.visible = true;
      this.startPraName = item.name;
      this.courwareId = item.id;

      this.getDetail();
      this.getTeamList();
      this.getPlace();
    },
    // 获取队伍列表
    getTeamList() {
      this.axios({
        method: "POST",
        url: `/dah-training-api/courseware/selectListEmergencyTeam?limit=${100}&offset=${1}&name=${
          this.searchTeamVal
        }`,
      })
        .then((res) => {
          console.log("获取成功", res);
          this.teamList = res.data.data.list;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 选择参训队伍
    checkTheTeam(index, id) {
      this.checkTeam = index;
      this.checkTeamId = id;
      this.stayList = [];
      this.hasList = [];
      this.getStayList();
      // console.log(index,id)
    },
    // 选中的待选人员
    handleSelectionChange(val) {
      this.staySelection = val;
    },
    // 选中的已选人员
    hasSelectionChange(val) {
      this.hasSelection = val;
    },
    // 获取待选人员列表
    getStayList() {
      let data = {
        id: this.checkTeamId,
        offset: 1,
        limit: 1000,
      };
      let params = new FormData();
      for (let k in data) {
        params.append(k, data[k]);
      }
      this.axios({
        method: "POST",
        url: "/dah-training-api/courseware/selectListEmergencyCrew",
        data: params,
      })
        .then((res) => {
          console.log("获取成功", res);
          this.stayList = res.data.data.list;
          this.another = res.data.data.list;
          this.stayPageTotal = res.data.data.total;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 发起实训
    initiateHandle() {
      // console.log(this.time);

      if (this.name === "") {
        this.$message({
          message: "请输入实训名称",
          type: "warning",
        });
      } else if (this.location === "") {
        this.$message({
          message: "请输入实训地点",
          type: "warning",
        });
      } else if (!this.startTime || !this.endTime) {
        this.$message({
          message: "请输入计划时间",
          type: "warning",
        });
      } else if (this.checkTeamId === "") {
        this.$message({
          message: "请选择参训队伍",
          type: "warning",
        });
      } else if (this.hasList.length === 0) {
        this.$message({
          message: "请选择参训人员",
          type: "warning",
        });
      } else {
        let time1 = this.startTime;
        let time2 = this.endTime;
        let crewIdList = [];
        this.hasList.map((item) => {
          crewIdList.push(item.id);
        });
        let data = {
          // id: this.courwareId,
          coursewareId: this.courwareId,
          coursewareName: this.courseName,
          crewId: crewIdList,
          name: this.name,
          location: this.location,
          teamId: this.checkTeamId,
          planStartTime: time1,
          planEndTime: time2,
          status: 1,
          subjectContent: this.subjectsContent,
          equipment: this.useEquipment,
          trainingObject: this.trainingObj,
          ready: this.prepare,
          safetyPrecautions: this.safety,
        };
        let params = new FormData();
        for (let k in data) {
          params.append(k, data[k]);
        }
        console.log(data);
        this.axios({
          method: "POST",
          url: "/dah-training-api/courseware/addTrainingRecord",
          data: params,
        })
          .then((res) => {
            if (res.data.data) {
              this.$message({
                message: "发起实训成功",
                type: "success",
                duration: 1000,
              });
              this.initiateCancel();
              this.$destroy();
              this.$router.push({
                path: "/trainfiles",
              });
            } else {
              this.$confirm("已有课件在实训，请等待实训完成", "确认信息", {
                distinguishCancelAndClose: true,
                confirmButtonText: "确认",
              })
                .then(() => {
                  this.$message({
                    type: "info",
                    message: "已确认",
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消",
                  });
                });
            }
          })
          .catch((err) => {
            console.log("发起实训失败", err);
          });
      }
    },
    // 添加实训人员
    toHasList() {
      this.hasList = [...this.hasList, ...this.staySelection];
      this.alanother = [...this.hasList];
      // console.log(this.staySelection,'添加');
      this.hasList.map((item) => {
        for (let i = 0; i < this.stayList.length; i++) {
          if (this.stayList[i].id === item.id) {
            this.stayList.splice(i, 1);
          }
        }
      });
      this.staySelection.map((item) => {
        for (let i = 0; i < this.another.length; i++) {
          if (item.id === this.another[i].id) {
            this.another.splice(i, 1);
          }
        }
      });
    },
    // 格式话时间戳
    format(time) {
      let date = new Date(time);
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let MT =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let S =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // console.log(Y + "-" + M + "-" + D + " " + H + ":" + MT);
      return Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + S;
    },
    // 关闭发起实训模态框
    initiateCancel() {
      this.name = "";
      this.location = "";
      this.time = null;
      this.startTime = null;
      this.endTime = null;
      this.stayList = [];
      this.hasList = [];
      this.staySelection = [];
      this.checkTeam = "";
      this.visible = false;
    },
    // 删除已选人员
    delHasList() {
      this.hasSelection.map((item) => {
        for (let i = 0; i < this.hasList.length; i++) {
          if (this.hasList[i].id === item.id) {
            this.hasList.splice(i, 1);
            this.stayList.push(item);
          }
        }
      });
      this.hasSelection.map((item) => {
        for (let i = 0; i < this.alanother.length; i++) {
          if (item.id === this.alanother[i].id) {
            this.alanother.splice(i, 1);
          }
        }
      });

      console.log(this.hasList, this.staySelection);
    },
    // 设置开始时间
    setStartTime(val) {
      // console.log(val);
      if (val === null) {
        this.startTime = null;
      } else {
        // console.log(this.format(val),this.expectedTime);
        this.startTime = this.format(val);
        let time = new Date(
          new Date(this.format(val)).getTime() + this.expectedTime * 60 * 1000
        );
        // console.log(this.format(time))
        this.endTime = this.format(time);
      }
    },
    // 设置计划结束时间
    setEndTime(val) {
      console.log(
        this.format(val),
        this.format(this.startTime),
        this.expectedTime
      );
      if (val === null) {
        this.endTime = null;
      } else {
        if (
          new Date(val).getTime() <
          new Date(this.startTime).getTime() + this.expectedTime * 60 * 1000
        ) {
          this.$message.warning("时长不能比课件预计时长短");
          this.endTime = null;
        } else {
          this.endTime = this.format(val);
        }
      }
    },
  },
  filters: {
    //文字数超出时，超出部分使用...
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    },
  },
};
</script>

<style lang="less">
.courseware {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  .courseware-section {
    display: flex;
    width: 100%;
    flex: 1;
    justify-content: space-between;
    overflow: hidden;
    .left {
      width: 78%;
      background-color: white;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      .header {
        padding-left: 16px;
        height: 40px;
        line-height: 40px;
        color: #48465b;
        border-bottom: 1px solid rgba(235, 237, 242, 1);
      }
      .options {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        .options-left {
          display: flex;
          .option-item1 {
            cursor: pointer;
            border-radius: 4px;
            border: 1px solid rgba(235, 237, 242, 1);
            display: flex;
            position: relative;
            .item1-title {
              height: 30px;
              line-height: 30px;
              width: 91px;
              text-align: center;
            }
            .item1-content {
              height: 30px;
              display: flex;
              justify-content: space-between;
              width: 208px;
              border-left: 1px solid rgba(235, 237, 242, 1);
              padding: 5px;
            }
            .item1-drop {
              background-color: white;
              position: absolute;
              top: 60px;
              left: 91px;
              width: 208px;
              padding: 10px 0;
              box-shadow: 0px 0px 20px rgba(221, 225, 247, 0.8);
              border-radius: 4px;
              .item1-drop-item {
                width: 100%;
                height: 32px;
                line-height: 32px;
                padding-left: 16px;
              }
              .item1-drop-item:hover {
                background-color: rgba(247, 248, 250, 1);
                width: 100%;
                height: 32px;
                line-height: 32px;
                padding-left: 16px;
                color: rgb(84, 114, 234);
              }
            }
          }
          .option-item2 {
            width: 309px;
            margin-left: 10px;
            border-radius: 4px;
            border: 1px solid rgba(235, 237, 242, 1);
            input {
              border: none;
              outline: none;
              height: 30px;
              line-height: 30px;
              width: 100%;
              padding-left: 10px;
            }
          }
          .option-search {
            width: 50px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            border-radius: 4px;
            margin-left: 10px;
            background-color: rgba(84, 114, 234, 1);
            color: white;
          }
          .option-search:hover {
            cursor: pointer;
          }
        }
        .option-add {
          border-radius: 4px;
          height: 32px;
          width: 80px;
          color: white;
          background-color: rgba(84, 114, 234, 1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .option-add:hover {
          cursor: pointer;
        }
      }
      .courseware-content {
        padding: 0 16px 16px 16px;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
        .pages {
          margin-top: 100px;
          text-align: right;
        }
        .coursewqre-list {
          display: flex;
          flex-wrap: wrap;
          .list-item {
            width: 23%;
            border: 1px solid rgba(221, 225, 247, 1);
            border-radius: 4px;
            padding: 10px;
            cursor: pointer;
            margin-right: 2%;
            margin-bottom: 2%;
            .list-item-top {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              .list-item-top-left {
                font-weight: 700;
              }
              .list-item-top-right {
                width: 20%;
                display: flex;
                justify-content: space-evenly;
              }
            }
            .list-item-section {
              margin-bottom: 5px;
              font-size: 12px;
              .span1 {
                color: #959cb6;
              }
              .span2 {
                display: inline-block;
                text-align: center;
                height: 16px;
                line-height: 16px;
                color: white;
                border-radius: 2px;
                font-size: 12px;
                margin-right: 10px;
              }
              .ball {
                width: 40px;
                background-color: rgba(151, 75, 247, 1);
              }
              .car {
                width: 40px;
                background-color: rgba(84, 114, 234, 1);
              }
              .tank {
                width: 50px;
                background-color: rgba(10, 207, 151, 1);
              }
            }
            .list-item-footer {
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
              align-items: center;
              font-size: 12px;
              .list-item-footer-left {
                .span1 {
                  color: #959cb6;
                }
                .span3 {
                  font-size: 12px;
                  color: #5472ea;
                }
              }
              .list-item-footer-right {
                width: 90px;
                height: 32px;
                display: flex;
                border-radius: 4px;
                align-items: center;
                color: white;
                justify-content: center;
                background-color: rgba(84, 114, 234, 1);
              }
            }
          }
          .list-item:hover {
            box-shadow: 0px 0px 20px rgba(221, 225, 247, 0.8);
          }
        }
      }
    }
    .right {
      width: 20%;
      background-color: white;
      border-radius: 4px;
      font-size: 13px;
      height: 100%;
      overflow-x: hidden;
      .right-title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        padding: 0 16px;
        border-bottom: 1px solid rgba(235, 237, 242, 1);
      }
      .right-content {
        padding: 16px;
        .right-c-section1 {
          border-radius: 4px;
          background-color: rgba(84, 114, 234, 1);
          display: flex;
          width: 100%;
          height: 50px;
          align-items: center;
          justify-content: space-between;
          color: white;
          padding: 10px;
          .span2 {
            font-size: 32px;
            font-weight: 700;
          }
        }
        .right-c-section2 {
          .right-c-s2-top {
            display: flex;
            height: 30px;
            margin-top: 10px;
            align-items: center;
            margin-bottom: 20px;
            .span1 {
              width: 3px;
              height: 16px;
              background-color: rgba(84, 114, 234, 1);
            }
            .span2 {
              font-size: 14px;
              font-weight: 700;
              margin-left: 5px;
            }
          }
          .right-c-s2-content {
            height: 250px;
          }
          .right-c-s2-c2 {
            .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              span {
                font-size: 13px;
              }
              .item-left {
                display: flex;
                .ranking {
                  width: 20px;
                  height: 20px;
                  text-align: center;
                  line-height: 20px;
                  font-size: 13px;
                  color: white;
                  border-radius: 10px;
                  margin-right: 15px;
                  background-color: #5472ea;
                }
                .name:hover {
                  color: #5472ea;
                  cursor: pointer;
                }
              }
              .item-right {
                display: flex;
                .span {
                  color: #5472ea;
                }
              }
              .item1-left {
                display: flex;
                .ranking1 {
                  background-color: red;
                }
                .name1 {
                  color: red;
                }
              }
              .item1-right {
                display: flex;
                .span1 {
                  color: red;
                }
              }
              .item2-left {
                display: flex;
                .ranking2 {
                  background-color: orange;
                }
                .name2 {
                  color: orange;
                }
              }
              .item2-right {
                display: flex;
                .span2 {
                  color: orange;
                }
              }
              .item3-left {
                display: flex;
                .ranking3 {
                  background-color: #00c87f;
                }
                .name3 {
                  color: #00c87f;
                }
              }
              .item3-right {
                display: flex;
                .span3 {
                  color: #00c87f;
                }
              }
            }
          }
        }
      }
    }
  }
  .dialog-add {
    border-radius: 4px;
    font-size: 13px;
    .add-header {
      height: 48px;
      display: flex;
      align-items: center;
      background-color: rgba(84, 114, 234, 1);
      justify-content: space-between;
      padding: 0 10px;
      span {
        color: white;
      }
      .del {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .add-content {
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .line {
        width: 100%;
        height: 1px;
        // background-color: black;
        border: 1px dashed #958e8e4a;
      }
      .add-c-item {
        width: 49%;
        display: flex;
        margin-bottom: 20px;
        .add-c-i-lable {
          display: flex;
          width: 90px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border: 1px solid #e5e7ee;
          border-right: none;
          .span1 {
            color: red;
          }
        }
        .add-c-i-input {
          border: 1px solid #e5e7ee;
          display: flex;
          flex: 1;
          padding-left: 10px;
          input {
            border: none;
            outline: none;
            font-size: 13px;
          }
        }
        .add-c-item-item {
          width: 49%;
          display: flex;
        }
      }
      .add-c-item1 {
        width: 49%;
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
        .add-c-item1-item {
          width: 49%;
          display: flex;
          .add-c-i1-lable {
            display: flex;
            width: 90px;
            height: 30px;
            align-items: center;
            justify-content: center;
            border: 1px solid #e5e7ee;
            border-right: none;
            .span1 {
              color: red;
            }
          }
          .add-c-i1-input {
            display: flex;
            align-items: center;
            border: 1px solid #e5e7ee;
            padding: 0 10px;
            justify-content: space-between;
            input {
              outline: none;
              border: none;
              width: 70%;
              font-size: 13px;
            }
          }
          .add-c-i1-script {
            cursor: pointer;
            display: flex;
            border: 1px solid #e5e7ee;
            flex: 1;
            justify-content: space-between;
            padding: 0 10px;
            align-items: center;
            position: relative;
            .script-drop {
              position: absolute;
              top: 40px;
              left: 0;
              box-shadow: 0px 0px 20px rgba(221, 225, 247, 0.8);
              width: 100%;
              padding: 10px 0;
              border-radius: 4px;
              z-index: 999;
              height: 300px;
              background: white;
              overflow-x: hidden;
              .script-drop-item {
                width: 100%;
                height: 32px;
                line-height: 32px;
                padding-left: 16px;
              }
              .script-drop-item:hover {
                background-color: rgba(247, 248, 250, 1);
                width: 100%;
                height: 32px;
                line-height: 32px;
                padding-left: 16px;
                color: rgb(84, 114, 234);
              }
            }
          }
        }
      }
      .add-c-item2 {
        width: 49%;
        margin-bottom: 20px;
        .add-c-i-input2 {
          margin-top: 10px;
          border: 1px solid #e5e7ee;
          textarea {
            border: none;
            outline: none;
            height: 64px;
            width: 100%;
          }
          input {
            border: none;
            outline: none;
            height: 64px;
          }
        }
      }
      .scriptInfo {
        padding: 10px 0;
        .notData {
          color: #5472ea;
          font-size: 14px;
        }
        .scriptInfoDetail {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          align-content: center;
          .scriptName {
            font-size: 16px;
            font-weight: 700;
            margin-right: 30px;
          }
          .scriptInfoDetail-item {
            margin-right: 30px;
            .script-lable {
              color: #646c9a;
              font-size: 14px;
            }
          }
        }
      }
    }
    .add-footer {
      border-top: 1px solid #e5e7ee;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .add-footer-item {
        width: 80px;
        height: 32px;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        font-size: 13px;
        margin-right: 10px;
        cursor: pointer;
      }
      .cancel {
        border: 1px solid rgba(84, 114, 234, 1);
        color: rgba(84, 114, 234, 1);
      }
      .cancel:hover {
        background-color: rgba(84, 114, 234, 1);
        color: white;
      }
      .confirm {
        background-color: rgba(84, 114, 234, 1);
        color: white;
      }
    }
  }
  .dialog-initiate {
    border-radius: 4px;
    font-size: 13px;
    .add-header {
      height: 48px;
      display: flex;
      align-items: center;
      background-color: rgba(84, 114, 234, 1);
      justify-content: space-between;
      padding: 0 10px;
      span {
        color: white;
      }
      .del {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .initiate-content {
      padding: 10px;
      .initiate-section1 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .init-s1-title {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          .line {
            height: 16px;
            width: 3px;
            background-color: rgba(84, 114, 234, 1);
            margin-right: 10px;
          }
          .name {
            font-size: 16px;
            color: rgba(84, 114, 234, 1);
          }
        }
        .init-s1-item {
          width: 49%;
          border-radius: 4px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .left {
            width: 90px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(235, 237, 242, 1);
            border-right: none;
            .span1 {
              color: red;
            }
          }
          .right {
            display: flex;
            flex: 1;
            padding-left: 10px;
            border: 1px solid rgba(235, 237, 242, 1);
            height: 30px;
            .to {
              display: flex;
              width: 30px;
              height: 100%;
              align-items: center;
            }
            input {
              outline: none;
              border: none;
              height: 100%;
              font-size: 12px;
            }
            .el-date-editor {
              height: 100%;
              width: 100%;
              border: none;
              padding: 0;
            }
            .el-input__icon {
              line-height: 30px;
            }
          }
        }
      }
      .initiate-section2 {
        .init-s2-title {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          .line {
            height: 16px;
            width: 3px;
            background-color: rgba(84, 114, 234, 1);
            margin-right: 10px;
          }
          .name {
            font-size: 14px;
            font-weight: 700;
          }
        }
        .init-s2-content {
          width: 100%;
          border: 1px solid rgba(235, 237, 242, 1);
          border-radius: 4px;
          display: flex;
          height: 400px;
          .left {
            width: 22%;
            padding: 10px;
            overflow-x: hidden;
            box-shadow: 5px 0px 20px rgba(221, 225, 247, 0.8);
            .header-search {
              border-radius: 4px;
              border: 1px solid rgba(235, 237, 242, 1);
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 10px;
              margin-bottom: 10px;
              input {
                width: 80%;
                outline: none;
                border: none;
              }
              i {
                cursor: pointer;
              }
            }
            .left-content {
              .left-c-item {
                height: 32px;
                padding: 0 16px;
                line-height: 32px;
                cursor: pointer;
                border-left: 2px solid white;
              }
              .left-c-check-item {
                height: 32px;
                line-height: 32px;
                background-color: rgba(247, 248, 250, 1);
                border-left: 2px solid rgba(84, 114, 234, 1);
                color: rgb(84, 114, 234);
                font-weight: 700;
                padding: 0 16px;
                cursor: pointer;
              }
            }
          }
          .right {
            width: 78%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .right-title {
              padding-left: 10px;
              height: 40px;
              line-height: 40px;
              border-bottom: 1px solid rgba(235, 237, 242, 1);
            }
            .right-content {
              display: flex;
              flex: 1;
              padding: 10px;
              justify-content: space-between;
              .right-c-item1 {
                width: 45%;
                height: 100%;
                border: 1px solid rgba(235, 237, 242, 1);
                border-radius: 4px;
                padding: 10px;
                .right-c-item1-title {
                  font-weight: 700;
                  font-size: 12px;
                  margin: 0 0 10px 0;
                }
                .right-c-item1-search {
                  display: flex;
                  width: 100%;
                  height: 32px;
                  border-radius: 4px;
                  border: 1px solid rgba(235, 237, 242, 1);
                  padding: 0 10px;
                  align-items: center;
                  justify-content: space-between;
                  input {
                    outline: none;
                    border: none;
                  }
                }
                .right-c-item1-table {
                  font-size: 13px;
                  margin-top: 10px;
                  .el-table td,
                  th {
                    padding: 0;
                    height: 30px;
                  }
                  .el-pagination {
                    margin-top: 10px;
                  }
                }
              }
              .right-c-item2 {
                width: 10%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                i {
                  font-size: 16px;
                }
                .right-c-item2-check {
                  width: 36px;
                  height: 36px;
                  background-color: rgba(84, 114, 234, 1);
                  border-radius: 4px;
                  box-shadow: 0px 0px 10px rgba(84, 114, 234, 0.498039215686275);
                  color: white;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .right-c-item2-item {
                  width: 36px;
                  height: 36px;
                  background-color: rgba(242, 243, 248, 1);
                  border-radius: 4px;
                  margin-top: 10px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
    .add-footer {
      border-top: 1px solid #e5e7ee;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .add-footer-item {
        width: 80px;
        height: 32px;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        font-size: 13px;
        margin-right: 10px;
        cursor: pointer;
      }
      .cancel {
        border: 1px solid rgba(84, 114, 234, 1);
        color: rgba(84, 114, 234, 1);
      }
      .cancel:hover {
        background-color: rgba(84, 114, 234, 1);
        color: white;
      }
      .confirm {
        background-color: rgba(84, 114, 234, 1);
        color: white;
      }
    }
  }
  .dialog-padding {
    padding: 0;
    .el-dialog__header,
    .el-dialog__body {
      padding: 0;
    }
  }
}
</style>
