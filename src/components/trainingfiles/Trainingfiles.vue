<template>
  <div class="tranfiles">
    <div class="location">
      <img src="@/assets/image/u974.svg" alt="" />
      <div class="directory1">真火实训</div>
      <div class="directory2">实训档案</div>
    </div>
    <div class="files-content">
      <div class="content-top">档案列表</div>
      <div class="content-search">
        <div class="search-time">
          <label class="time-title" for="time">计划时间</label>
          <el-date-picker
            v-model="value3"
            align="right"
            type="date"
            name="time"
            clearable
            placeholder="选择日期"
            @change="changeDateTime"
          >
          </el-date-picker>
        </div>
        <div class="search-time">
          <span class="time-title" for="time">实训状态</span>
          <el-select
            v-model="value"
            clearable
            placeholder="请选择"
            @change="optionChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-time input-box">
          <el-input
            placeholder="请输入实训或课件或队伍名称"
            v-model="searchName"
            clearable
            class="input-class"
          ></el-input>
        </div>
        <div class="search-btn" @click="searchFiles">查 询</div>
      </div>
      <div class="content-table">
        <div class="tablebox">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            highlight-current-row
            v-loading="loading"
            element-loading-text="玩命加载中..."
            @row-click="rowHandle"
            :header-cell-style="{
              backgroundColor: 'rgb(242,243,248)',
            }"
          >
            <el-table-column prop="no" label="#" width="50"> </el-table-column>
            <el-table-column prop="name" label="实训名称" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="coursewareName" label="实训课件" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="location" label="实训地点" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="teamName" label="实训队伍" width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="date" label="计划时间" width="310">
              <template slot-scope="scope">
                <span>{{
                  scope.row.planStartTime + "~" + scope.row.planEndTime
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="实际时间" width="310">
              <template slot-scope="scope">
                <span>{{
                  (scope.row.actualStartTime === null
                    ? "-"
                    : scope.row.actualStartTime) +
                  "~" +
                  (scope.row.actualEndTime === null
                    ? "-"
                    : scope.row.actualEndTime)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="assessGrades" label="实训成绩" width="80">
            </el-table-column>
            <el-table-column prop="status" label="实训状态" width="100">
              <template slot-scope="scope">
                <span class="wait" v-if="scope.row.status === 0">待执行</span>
                <span class="ing" v-if="scope.row.status === 1">执行中</span>
                <span class="finish" v-if="scope.row.status === 2">已完成</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.status === 0" class="table-action">
                  <div class="start-btn" @click.stop="openTraning(scope.row)">
                    开 始
                  </div>
                  <div class="action-icon" @click.stop="launchTrain(scope.row)">
                    <i class="el-icon-edit"></i>
                  </div>
                  <div class="action-icon" @click.stop="delTrain(scope.row.id)">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="scope.row.status === 1" class="table-action">
                  <div class="start-btn" @click.stop="toVisual(scope.row.id)">
                    可视化
                  </div>
                  <div
                    class="start-btn over-btn"
                    @click.stop="overTrain(scope.row)"
                  >
                    结 束
                  </div>
                </div>
                <div
                  v-if="
                    scope.row.status === 2 && scope.row.assessGrades === null
                  "
                  class="table-action"
                >
                  <div
                    class="start-btn assessment"
                    @click.stop="assessHandle(scope.row)"
                  >
                    待评估
                  </div>
                  <span class="files ing" @click.stop="uploadModal(scope.row)"
                    >附件</span
                  >
                </div>
                <div
                  v-if="
                    scope.row.status === 2 && scope.row.assessGrades !== null
                  "
                  class="table-action"
                >
                  <div
                    class="start-btn reass"
                    @click.stop="assessHandle(scope.row)"
                  >
                    重新评估
                  </div>
                  <span class="files ing" @click.stop="uploadModal(scope.row)"
                    >附件</span
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          class="footpage"
          layout="total, prev, pager, next"
          :total="total"
          :page-size="limit"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 开始 -->
    <el-dialog
      title="提示"
      :visible.sync="startVisible"
      width="30%"
      custom-class="startDialog"
    >
      <div class="warn-top">
        <i class="el-icon-warning"></i>
      </div>
      <div class="warn-mid">确认开始演练实训？</div>
      <div class="plan-time">{{ "计划时间：" + planTime }}</div>
      <div class="foot-btn">
        <div class="cancel" @click="startVisible = false">取消</div>
        <div class="sure" @click="sureStart">确定</div>
      </div>
    </el-dialog>
    <!-- 评估 -->
    <el-dialog
      title="提示"
      :visible.sync="assessVisible"
      width="40%"
      :show-close="false"
      custom-class="assessDialog"
    >
      <div class="own-header">
        <span>实训评估</span>
        <i class="el-icon-close" @click="assessVisible = false"></i>
      </div>
      <div class="own-body">
        <div class="search-time">
          <span class="time-title"><span>*</span>实训得分</span>
          <el-input
            placeholder="请输入实训得分"
            v-model="trainScore"
            clearable
            class="input-class"
            @blur="
              () => {
                if (!/^(0|[1-9]\d*)$/.test(trainScore) && trainScore !== '') {
                  this.$message.warning('输入数据类型不符，只能是正整数或0');
                  this.trainScore = '';
                }
              }
            "
          ></el-input>
        </div>
        <span class="assess-title">评估意见</span>
        <el-input type="textarea" placeholder="请输入内容" v-model="evaluopin">
        </el-input>
      </div>
      <div class="foot">
        <div class="cancel" @click="assessVisible = false">取消</div>
        <div class="sure" @click="submitAsses">提交</div>
      </div>
    </el-dialog>
    <!-- 结束 -->
    <el-dialog
      title="提示"
      :visible.sync="overVisible"
      width="30%"
      custom-class="startDialog"
    >
      <div class="over-top">
        <i class="el-icon-warning"></i>
      </div>
      <div class="warn-mid">确认结束演练实训？</div>
      <div class="plan-time">{{ endModalText }}</div>
      <div class="foot-btn">
        <div class="cancel" @click="overVisible = false">取消</div>
        <div class="sure" @click="sureEnd">确定</div>
      </div>
    </el-dialog>
    <!-- 附件 -->
    <el-dialog
      title="提示"
      :visible.sync="uploadVisible"
      width="40%"
      :show-close="false"
      custom-class="assessDialog"
    >
      <div class="own-header">
        <span>上传附件</span>
        <i class="el-icon-close" @click="uploadVisible = false"></i>
      </div>
      <div class="own-body">
        <el-upload
          class="upload-demo"
          action="none"
          :auto-upload="true"
          :http-request="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="customUpload"
          multiple
          :file-list="fileList"
        >
          <div class="upload-box">
            <i class="el-icon-plus"></i>
            <span>点击上传附件</span>
          </div>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png/gif/mp3/mp4文件，最大限制100Mb，如果上传文件大，请耐心等候。
          </div>
        </el-upload>
      </div>
      <div class="foot">
        <div class="cancel" @click="uploadVisible = false">取消</div>
        <div class="sure" @click="uploadConfirm">确认</div>
      </div>
    </el-dialog>

    <!-- 发起实训模态框 -->
    <el-dialog
      :visible="visible"
      :show-close="false"
      width="60%"
      custom-class="launchVis"
    >
      <div class="dialog-initiate">
        <div class="add-header">
          <span>编辑实训</span>
          <span class="del" @click="visible = false">X</span>
        </div>
        <div class="initiate-content">
          <div class="initiate-section1">
            <div class="init-s1-title">
              <span class="line"></span>
              <span class="name">{{ data.coursewareName }}</span>
            </div>
            <div class="init-s1-item">
              <div class="left">
                <span class="span1">*</span>
                <span>实训名称</span>
              </div>
              <div class="right">
                <input
                  type="text"
                  v-model="data.name"
                  placeholder="请输入实训名称"
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
                  v-model="data.location"
                  placeholder="请输入实训地点"
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
                  format="yyyy-MM-dd HH:mm"
                  size="small"
                />
                <span class="to">-</span>
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  format="yyyy-MM-dd HH:mm"
                  :picker-options="datePickerOptions"
                  size="small"
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
                    v-model="teamName"
                  />
                  <i class="el-icon-search" @click="getTeamList" />
                </div>
                <div class="left-content">
                  <div
                    v-for="item in teamList"
                    :key="item.id"
                    :class="
                      checkTeam === item.id
                        ? 'left-c-check-item'
                        : 'left-c-item'
                    "
                    @click="checkTeamHandle(item.id)"
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
                    <div class="title">待选人员({{ checkTeamTotal }})</div>
                    <div class="search">
                      <el-input
                        size="small"
                        placeholder="请输入关键字"
                        v-model="tobeSelectKey"
                        suffix-icon="el-icon-search"
                        @blur="searchPeople"
                      >
                      </el-input>
                    </div>
                    <el-table
                      ref="multipleTable"
                      :data="checkTeamTable"
                      tooltip-effect="dark"
                      style="width: 100%"
                      height="450"
                      header-row-class-name="tableheader"
                      @select="itemCheck"
                      @select-all="selectAll"
                      :border="true"
                      v-loading="checkLoading"
                      element-loading-text="玩命加载中..."
                      stripe
                      :header-cell-style="{
                        backgroundColor: 'rgb(242,243,248)',
                      }"
                      size="small"
                    >
                      <el-table-column width="55" type="selection">
                        <!-- <template slot-scope="scope">
                          <el-checkbox
                            v-model="scope.row.checked"
                          ></el-checkbox>
                        </template> -->
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="人员姓名"
                      ></el-table-column>
                    </el-table>
                  </div>
                  <div class="right-c-item2">
                    <div class="right-c-item2-check" @click="importAlready">
                      <i class="el-icon-d-arrow-right" />
                    </div>
                    <div class="right-c-item2-item" @click="exportCheck">
                      <i class="el-icon-d-arrow-left" size="16" />
                    </div>
                  </div>
                  <div class="right-c-item1">
                    <div class="title">已选人员({{ alreadyCheckTotal }})</div>
                    <div class="search">
                      <el-input
                        size="small"
                        placeholder="请输入关键字"
                        suffix-icon="el-icon-search"
                        v-model="alreadyCheckKey"
                        @blur="searchalPeople"
                      >
                      </el-input>
                    </div>
                    <el-table
                      ref="multipleTable"
                      :data="alreadyCheckTable"
                      tooltip-effect="dark"
                      style="width: 100%"
                      height="450"
                      header-row-class-name="tableheader"
                      @selection-change="backSelectionChange"
                      :border="true"
                      stripe
                      :header-cell-style="{
                        backgroundColor: 'rgb(242,243,248)',
                      }"
                      size="small"
                    >
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="人员姓名"
                      ></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="foot-btn launchfoot">
          <div class="cancel" @click="visible = false">取消</div>
          <div class="sure" @click="launchOkHandle">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import http from "../../http/request";
import qs from "qs";

export default {
  name: "TrainingFiles",
  components: {},
  data() {
    return {
      value3: "", // 时间
      checkTime: "", // 时间
      value: "",
      endModalText: "",
      options: [
        {
          value: 0,
          label: "待执行",
        },
        {
          value: 1,
          label: "执行中",
        },
        {
          value: 2,
          label: "已完成",
        },
      ],
      state: "", // 状态值
      searchName: "", // 名称
      tableData: [],
      loading: true,
      rowId: "", // 操作的rowid
      // 分页
      pageNum: 1,
      total: 0,
      limit: 12,
      startVisible: false, // 开始实训
      planTime: "", //计划时
      assessVisible: false, // 评估modal
      evaluopin: "", // 评估意见
      overVisible: false, // 结束modal
      trainScore: "", // 实训得分
      uploadVisible: false, // 上传modal
      visible: false, // 发起实训modal
      checkTeam: 0, // 选中队伍index
      teamList: [], // 参训队伍
      teamName: "",
      // 文件上传
      fileList: [],
      data: "", // 发起实训
      time: "",
      startTime: null,
      endTime: null,
      datePickerOptions: {
        disabledDate(time) {
          let now = new Date();
          return time.getTime() < now; //大于当前的禁止，小于7天前的禁止
        },
      },
      // check表格
      tobeSelectKey: "", // 待选关键字
      checkTeamTotal: 0, // 待选人总数
      checkTeamTable: [], // 待选集合
      checkSelection: [], // 待选checked集合
      checkLoading: false,
      alreadyCheckTotal: 0, // 已选总数
      alreadyCheckKey: "", // 已选关键字
      alreadyCheckTable: [], // 已选集合
      backSelection: [], // 已选checked集合
      another: [],
      alanother: [],

      alreadyUseTime: "",
      surplusTime: "",

      upLoading: "",

      startItem: "",
    };
  },
  created() {
    this.getfiles();
    this.getTeamList();
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
  methods: {
    // 获取实训档案列表
    getfiles() {
      let formdata = new FormData();
      formdata.append("planStartTime", this.checkTime);
      formdata.append("limit", 12);
      formdata.append("name", this.searchName);
      formdata.append("offset", this.pageNum);
      formdata.append("status", this.state);
      this.axios({
        url: "/dah-training-api/trainingRecord/selectTrainingRecord",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          this.loading = false;
          this.tableData = res.data.data.list;
          this.tableData.map((item, index) => {
            item.no = index + 1 + (res.data.data.pageNum - 1) * this.limit;
          });
          this.total = res.data.data.total;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // 获取队伍列表
    getTeamList() {
      this.axios({
        method: "POST",
        url: `/dah-training-api/emergencyTeam/selectEmergencyTeam?limit=${100}&offset=${1}&teamName=${
          this.teamName
        }`,
      })
        .then((res) => {
          this.teamList = res.data.data.list;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 修改状态
    optionChange(op) {
      this.state = op;
    },
    // 修改时间
    changeDateTime(time) {
      if (time === null) {
        this.checkTime = "";
      } else {
        let date = new Date(time);
        let Y = date.getFullYear();
        let M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth();
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        this.checkTime = Y + "-" + M + "-" + D;
      }
    },
    // 查询
    searchFiles() {
      this.loading = true;
      this.getfiles();
    },
    // 点击行跳转详情
    rowHandle(row) {
      this.$router.push({
        path: "/filesdetail",
        query: {
          id: row.id,
          status: row.status,
        },
      });
    },
    // 开始实训
    launchTrain(item) {
      this.startItem = item;
      let formdata = new FormData();
      formdata.append("id", item.id);
      formdata.append("status", 0);
      this.axios({
        url: "/dah-training-api/trainingRecord/getTrainingRecordStatus",
        data: formdata,
        method: "POST",
      })
        .then((res) => {
          this.data = res.data.data;
          if (res.data.data.teamId) {
            this.checkTeamHandle(res.data.data.teamId);
          }
          this.startTime = this.data.planStartTime;
          this.endTime = this.data.planEndTime;
          this.visible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 开始实训
    openTraning(item) {
      this.planTime = item.planStartTime + "~" + item.planEndTime;
      this.startVisible = true;
      this.rowId = item.id;
      this.startItem = item;
    },
    overTrain(item) {
      this.rowId = item.id;
      this.startItem = item;
      let formdata = new FormData();
      formdata.append("id", item.id);
      formdata.append("status", item.status);
      // 发请求获取详情信息
      this.axios({
        url: "/dah-training-api/trainingRecord/getTrainingRecordStatus",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          let date = new Date();
          let now = date.getTime();
          let startDate = new Date(res.data.data.actualStartTime);
          let start = startDate.getTime();
          let timestamp = now - start;
          this.alreadyUseTime = Math.floor(timestamp / 60000);
          this.surplusTime =
            res.data.data.courseware.estimatedDuration - this.alreadyUseTime;
          console.log(this.alreadyUseTime, this.surplusTime);
          if (this.surplusTime > 0) {
            this.endModalText = `
        当前用时${this.alreadyUseTime}分钟，距实训课件预计时长还差${this.surplusTime}分钟！`;
          } else {
            this.endModalText = `时间已到，是否结束？`;
          }
          this.overVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 评估，待评估
    assessHandle(item) {
      this.assessVisible = true;
      this.rowId = item.id;
      this.startItem = item;
      this.evaluopin = item.assessOpinion;
      this.trainScore = item.assessGrades;
    },
    // 提交评估
    submitAsses() {
      if (this.trainScore === "") {
        this.$message({
          type: "warning",
          message: "成绩不能为空!",
        });
      } else {
        let date = new Date();
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
        this.startItem.assessTime =
          Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + MS;
        this.startItem.assessOpinion = this.evaluopin;
        this.startItem.assessGrades = this.trainScore;
        this.startItem.assessName = JSON.parse(
          localStorage.getItem("fire-user")
        ).name;
        this.axios({
          url: "/dah-training-api/trainingRecord/update",
          method: "POST",
          data: qs.stringify(this.startItem),
        })
          .then((res) => {
            if (res.data.data) {
              this.assessVisible = false;
              this.$message({
                type: "success",
                message: "评估成功!",
                duration: 1000,
              });
              this.getfiles();
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              type: "warning",
              message: err.message,
            });
          });
      }
    },
    // 删除档案
    delTrain(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let formdata = new FormData();
          formdata.append("id", id);
          this.axios({
            url: "/dah-training-api/trainingRecord/delete",
            method: "POST",
            data: formdata,
          })
            .then((res) => {
              if (res.data.data) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                  duration: 1000,
                });
                this.loading = true;
                this.getfiles();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击附件
    uploadModal(item) {
      this.rowId = item.id;
      let formdata = new FormData();
      formdata.append("trainingRecordId", item.id);
      this.axios({
        url: "/dah-training-api/trainingRecord/getRecordFiles",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          this.uploadVisible = true;
          this.fileList = res.data.data;
          this.fileList.map((item) => {
            item.name = item.fileName;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 自定义上传
    customUpload(data, fileList) {
      let file = data.raw;
      const allowFormat =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "video/mp4" ||
        file.type === "image/gif" ||
        file.type === "audio/mpeg";
      const allowSize = file.size / 1024 / 1024 < 100;
      if (!allowFormat) {
        this.$message.error("上传附件格式仅支持mp3, mp4, png, jpg, gif!");
        fileList.map((item, index) => {
          if (item.uid === data.uid) {
            fileList.splice(index, 1);
          }
        });
      } else if (!allowSize) {
        this.$message.error("上传附件大小不能超过 100MB!");
        fileList.map((item, index) => {
          if (item.uid === data.uid) {
            fileList.splice(index, 1);
          }
        });
      } else if (allowFormat && allowSize) {
        this.upLoading = this.$loading({
          lock: true,
          text: "文件上传中......",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let formdata = new FormData();
        formdata.append("file", data.raw);
        this.axios({
          url: "/dah-training-api/file/upload",
          method: "POST",
          data: formdata,
        })
          .then((res) => {
            this.upLoading.close();
            fileList.map((item) => {
              if (item.uid === file.uid) {
                item.path = res.data.filePath;
                item.name = res.data.fileName;
              }
            });
            this.fileList = fileList;
          })
          .catch((err) => {
            console.log(err);
            fileList.map((item, index) => {
              if (item.uid === file.uid) {
                fileList.splice(index, 1);
              }
            });
            this.fileList = fileList;
          });
      }
    },
    // 删除附件
    handleRemove(file, fileList) {
      console.log(file, fileList);
      if (file.id) {
        let formdata = new FormData();
        formdata.append("fileId", file.id);
        this.axios({
          url: "/dah-training-api/trainingRecord/deleteFile",
          method: "POST",
          data: formdata,
        })
          .then((res) => {
            console.log(res);
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(data) {
      let file = data.file;
      const allowFormat =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "video/mp4" ||
        file.type === "image/gif" ||
        file.type === "audio/mpeg";
      const allowSize = file.size / 1024 / 1024 < 100;
      if (!allowFormat) {
        this.$message.error("上传附件格式仅支持mp3, mp4, png, jpg, gif!");
      }
      if (!allowSize) {
        this.$message.error("上传附件大小不能超过 100MB!");
      }
      if (allowFormat && allowSize) {
        const prom = new Promise(() => {});
        prom.abort = () => {};
        return prom;
      }
      // return allowFormat && allowSize;
      // return false;
    },
    // 上传确认
    uploadConfirm() {
      console.log(this.fileList);
      if (this.fileList.length <= 0) {
        this.$message({
          showClose: true,
          message: "未上传附件！",
          type: "warning",
        });
      } else {
        let fileData = new FormData();
        let arr = [];
        this.fileList.map((item) => {
          let obj = {
            id: item.id || null,
            name: item.name,
            path: item.path,
          };
          arr.push(obj);
        });
        fileData.append("filePathArray", JSON.stringify(arr));
        fileData.append("trainingRecordId", this.rowId);
        this.axios({
          url: "/dah-training-api/trainingRecord/insertFile",
          method: "POST",
          data: fileData,
        })
          .then((res) => {
            if (res.data.data) {
              this.$message({
                showClose: true,
                message: "修改成功！",
                type: "success",
              });
              this.uploadVisible = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // check表格
    backSelectionChange(val) {
      this.backSelection = val;
    },
    // 选择参训队伍获取人员
    checkTeamHandle(id) {
      this.alreadyCheckTable = [];
      this.checkLoading = true;
      this.checkTeam = id;
      let formdata = new FormData();
      formdata.append("id", id);
      formdata.append("limit", 1000);
      this.axios({
        url: "/dah-training-api/courseware/selectListEmergencyCrew",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          let list = res.data.data.list;
          this.checkLoading = false;
          let staffs = this.data.staffs;
          staffs.map((item) => {
            item.name = item.emergencyCrewName;
            item.id = item.emergencyCrewId;
            for (let i = 0; i < list.length; i++) {
              if (item.emergencyCrewId === list[i].id) {
                list.splice(i, 1);
              }
            }
          });
          this.checkTeamTable = list;
          this.another = list;
          if (this.data.teamId === id) {
            this.alreadyCheckTable = staffs;
          }
          this.alanother = staffs;
          this.alreadyCheckTotal = staffs.length;
          this.checkTeamTotal = list.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchPeople() {
      if (this.tobeSelectKey === "") {
        let arr = this.another;
        this.alreadyCheckTable.map((item) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === item.id) {
              arr.splice(i, 1);
            }
          }
        });
        this.checkTeamTable = arr;
        this.checkTeamTotal = arr.length;
      } else {
        this.another = this.checkTeamTable;
        let arr = this.checkTeamTable;
        let newarr = arr.filter(
          (item) => item.name.indexOf(this.tobeSelectKey) !== -1
        );
        this.alreadyCheckTable.map((item) => {
          for (let i = 0; i < newarr.length; i++) {
            if (newarr[i].id === item.id) {
              newarr.splice(i, 1);
            }
          }
        });
        this.checkTeamTable = newarr;
        this.checkTeamTotal = newarr.length;
      }
    },
    searchalPeople() {
      if (this.alreadyCheckKey === "") {
        let arr = this.alanother;
        this.checkTeamTable.map((item) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === item.id) {
              arr.splice(i, 1);
            }
          }
        });
        this.alreadyCheckTable = arr;
        this.alreadyCheckTotal = arr.length;
      } else {
        this.alanother = this.alreadyCheckTable;
        let arr = this.alreadyCheckTable;
        let newarr = arr.filter(
          (item) => item.name.indexOf(this.alreadyCheckKey) !== -1
        );
        this.checkTeamTable.map((item) => {
          for (let i = 0; i < newarr.length; i++) {
            if (newarr[i].id === item.id) {
              newarr.splice(i, 1);
            }
          }
        });
        this.alreadyCheckTable = newarr;
        this.alreadyCheckTotal = newarr.length;
      }
    },
    // 导入已选
    importAlready() {
      let arr = [];
      this.checkTeamTable.map((item) => {
        if (item.checked) {
          arr.push(item);
        }
      });
      this.checkTeamTable = this.checkTeamTable.filter((item) => !item.checked);
      this.checkTeamTotal = this.checkTeamTable.length;
      this.alreadyCheckTable = [...arr, ...this.alreadyCheckTable];
      this.alreadyCheckTotal = this.alreadyCheckTable.length;
      this.alanother = this.alreadyCheckTable;
    },
    selectAll(selection) {
      if (selection.length === 0) {
        this.checkTeamTable.map((item) => {
          item.checked = false;
        });
      } else {
        selection.map((item) => {
          item.checked = true;
        });
      }
    },
    itemCheck(selection, row) {
      this.checkTeamTable.map((item) => {
        if (item.id === row.id) {
          item.checked = !item.checked;
        }
      });
    },
    // 导回待选
    exportCheck() {
      for (let i = 0; i < this.backSelection.length; i++) {
        this.backSelection[i].checked = false;
        this.checkTeamTable.push(this.backSelection[i]);
        this.alreadyCheckTable.map((item, index) => {
          if (item.id === this.backSelection[i].id) {
            this.alreadyCheckTable.splice(index, 1);
          }
        });
      }
      this.checkTeamTotal = this.checkTeamTable.length;
      this.alreadyCheckTotal = this.alreadyCheckTable.length;
    },
    // 确定发起实训
    launchOkHandle() {
      if (this.data.name === "") {
        this.$message({
          message: "请输入实训名称",
          type: "warning",
        });
      } else if (this.data.name.length > 50) {
        this.$message({
          message: "实训名称长度不符",
          type: "warning",
        });
      } else if (
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.data.name) ||
        /[#$@/\\()<>《》！￥？?!{}[\] ]/gi.test(this.data.location)
      ) {
        this.$message({
          message: "不能输入特殊字符",
          type: "warning",
        });
      } else if (this.data.location === "") {
        this.$message({
          message: "请输入实训地点",
          type: "warning",
        });
      } else if (this.data.location.length > 50) {
        this.$message({
          message: "实训地点长度不符",
          type: "warning",
        });
      } else if (!this.startTime || !this.endTime) {
        this.$message({
          message: "请选择时间",
          type: "warning",
        });
      } else if (this.checkTeam === "") {
        this.$message({
          message: "请选择参训队伍",
          type: "warning",
        });
      } else if (this.alreadyCheckTable.length === 0) {
        this.$message({
          message: "请选择参训人员",
          type: "warning",
        });
      } else {
        let startDate = this.startTime;
        let time1 = this.format(startDate);
        let endDate = this.endTime;
        let time2 = this.format(endDate);
        let crewIdList = [];
        this.alreadyCheckTable.map((item) => {
          crewIdList.push(item.id);
        });
        let data = {
          coursewareId: this.data.coursewareId,
          crewId: crewIdList,
          name: this.data.name,
          location: this.data.location,
          teamId: this.checkTeam,
          planStartTime: time1,
          planEndTime: time2,
          status: 0,
          id: this.data.id,
          subjectContent: this.startItem.subjectContent,
          ready: this.startItem.ready,
          safetyPrecautions: this.startItem.safetyPrecautions,
          trainingObject: this.startItem.trainingObject,
          equipment: this.startItem.equipment,
        };
        // this.startItem.crewId = crewIdList;
        // this.startItem.name = this.data.name;
        // this.startItem.location = this.data.location;
        // this.startItem.planStartTime = time1;
        // this.startItem.planEndTime = time2;
        // this.startItem.status = 0;
        // this.startItem.teamId = this.checkTeam;

        let params = new FormData();
        for (let k in data) {
          params.append(k, data[k]);
        }
        this.axios({
          method: "POST",
          url: "/dah-training-api/trainingRecord/update",
          data: params,
        })
          .then((res) => {
            if (res.data.data) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.visible = false;
              this.loading = true;
              this.getfiles();
            }
          })
          .catch((err) => {
            console.log("修改失败", err);
          });
      }
    },
    // 设置开始时间
    setStartTime(val) {
      if (val === null) {
        this.startTime = null;
      } else {
        this.startTime = this.format(val);
        let time = new Date(
          new Date(this.format(val)).getTime() +
            this.data.courseware.estimatedDuration * 60 * 1000
        );
        this.endTime = this.format(time);
      }
    },
    // 翻页,
    changePage(curPage) {
      this.pageNum = curPage;
      this.loading = true;
      this.getfiles();
    },
    // 设置计划结束时间
    setEndTime(val) {
      if (val === null) {
        this.endTime = null;
      } else {
        if (
          new Date(val).getTime() <
          new Date(this.startTime).getTime() +
            this.data.courseware.estimatedDuration * 60 * 1000
        ) {
          this.$message.warning("时长不能比课件预计时长短");
          this.endTime = null;
        } else {
          this.endTime = this.format(val);
        }
      }
    },
    // 确定开始
    sureStart() {
      let date = new Date();
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let MT =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let Ms =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.startItem.status = 1;
      this.startItem.actualStartTime =
        Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + Ms;
      this.axios({
        url: "/dah-training-api/trainingRecord/update",
        method: "POST",
        data: qs.stringify(this.startItem),
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.data) {
            this.startVisible = false;
            sessionStorage.setItem("visibid", this.rowId);
            this.$router.push({
              path: "/visualization",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 去可视化
    toVisual(id) {
      sessionStorage.setItem("visibid", id);
      this.$router.push({
        path: "/visualization",
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
      // console.log(Y + "-" + M + "-" + D + " " + H + ":" + MT);
      return Y + "-" + M + "-" + D + " " + H + ":" + MT;
    },
    // 确定结束
    sureEnd() {
      let date = new Date();
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let MT =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let Ms =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.startItem.status = 2;
      this.startItem.actualEndTime =
        Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + Ms;
      this.axios({
        url: "/dah-training-api/trainingRecord/update",
        method: "POST",
        data: qs.stringify(this.startItem),
      })
        .then((res) => {
          if (res.data.data) {
            this.$message({
              type: "success",
              message: "结束成功!",
              duration: 1000,
            });
            this.overVisible = false;
            this.getfiles();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
.tranfiles {
  width: 100%;
  display: flex;
  flex-direction: column;
  // min-height: 100%;
  background: rgb(242, 243, 248);
  // padding-bottom: 20px;
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
  .search-time {
    display: inline-block;
    border-radius: 5px;
    border: 1px solid rgb(235, 237, 242);
    margin-right: 30px;
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
      height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
  .input-box {
    width: 280px;
  }
  .files-content {
    width: 100%;
    background: white;
    border-radius: 5px;
    // overflow-x: hidden;
    // min-height: 100%;
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
      padding: 15px;
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
    }
    .content-table {
      width: 100%;
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      flex: 1;
      // overflow-x: hidden;
      .tablebox {
        width: 100%;
        display: flex;
        // min-height: 600px;
        flex: 1;
        overflow-x: hidden;
      }
      .wait {
        color: rgb(1, 200, 148);
      }
      .ing {
        color: rgb(84, 114, 234);
      }
      .finish {
        color: rgb(151, 156, 188);
      }
      .start-btn {
        display: inline-block;
        width: 72px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background: rgb(100, 128, 236);
        color: white;
        border-radius: 5px;
      }
      .over-btn {
        background: rgb(238, 69, 69);
        margin-left: 10px;
      }
      .assessment {
        background: rgb(1, 200, 148);
      }
      .reass {
        background: rgb(242, 243, 248);
        color: rgb(100, 128, 236);
      }
      .reass:hover {
        background: rgb(100, 128, 236);
        color: white;
      }
      .start-btn:hover {
        cursor: pointer;
        opacity: 0.8;
      }
      .table-action {
        .files {
          text-decoration: underline;
          margin-left: 10px;
        }
        .files:hover {
          cursor: pointer;
        }
      }
      .action-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-left: 10px;
        font-size: 14px;
        i:hover {
          cursor: pointer;
        }
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
  .foot-btn {
    width: 50%;
    margin: 0 auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: 80px;
      height: 32px;
      line-height: 32px;
      border: 1px solid rgb(84, 114, 234);
      text-align: center;
      border-radius: 5px;
    }
    .cancel {
      color: rgb(84, 114, 234);
      background: white;
    }
    .sure {
      background: rgb(84, 114, 234);
      color: white;
    }
    .sure:hover {
      cursor: pointer;
    }
    .cancel:hover {
      background: rgb(84, 114, 234);
      color: white;
      cursor: pointer;
    }
  }
  .startDialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 30px 20px;
    }
    .over-top {
      width: 100%;
      font-size: 50px;
      color: rgb(238, 69, 69);
      text-align: center;
    }
    .warn-top {
      width: 100%;
      font-size: 50px;
      color: rgb(84, 114, 234);
      text-align: center;
    }
    .warn-mid {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #333;
      font-weight: 600;
      font-size: 18px;
    }
    .plan-time {
      color: rgb(100, 108, 154);
      width: 100%;
      text-align: center;
      height: 60px;
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
      .search-time {
        width: 100%;
        margin: 0;
        display: flex;
        .time-title > span {
          color: red;
        }
      }
      .assess-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
      }
      textarea {
        height: 200px;
      }
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
      .cancel {
        color: rgb(84, 114, 234);
        background: white;
      }
      .sure {
        background: rgb(84, 114, 234);
        color: white;
        margin-left: 15px;
      }
      .sure:hover {
        cursor: pointer;
      }
      .cancel:hover {
        background: rgb(84, 114, 234);
        color: white;
        cursor: pointer;
      }
    }
  }
  .launchVis {
    border-radius: 5px;
    overflow: hidden;
  }
  .dialog-initiate {
    border-radius: 4px;
    font-size: 13px;
    .add-header {
      height: 40px;
      display: flex;
      align-items: center;
      background-color: rgba(84, 114, 234, 1);
      justify-content: space-between;
      padding: 0 15px;
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
      padding: 0 15px 10px;
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
          border-radius: 5px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          border: 1px solid rgba(235, 237, 242, 1);
          .left {
            width: 90px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid rgba(235, 237, 242, 1);
            .span1 {
              color: red;
            }
          }
          .right {
            display: flex;
            flex: 1;
            padding-left: 10px;
            height: 30px;
            overflow: hidden;
            input {
              width: 100%;
              outline: none;
              border: none;
            }
            .el-date-editor {
              height: 100%;
              width: 100%;
              border: none;
              padding: 0;
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
          height: 440px;
          border: 1px solid rgba(235, 237, 242, 1);
          border-radius: 4px;
          display: flex;
          .left {
            width: 22%;
            padding: 10px;
            overflow-x: hidden;
            box-shadow: 0px 0px 20px rgba(221, 225, 247, 0.8);
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
              overflow-x: hidden;
              .right-c-item1 {
                width: 45%;
                height: 100%;
                border: 1px solid rgba(235, 237, 242, 1);
                border-radius: 4px;
                padding: 0 10px;
                display: flex;
                flex: 1;
                flex-direction: column;
                overflow-x: hidden;
                .title {
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                  font-weight: 600;
                }
                .search {
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                }
                .el-table {
                  display: flex;
                  flex-direction: column;
                }
                .el-table__header {
                  width: 300px !important;
                }
                .el-table__body {
                  width: 280px !important;
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
    .launchfoot {
      width: 100%;
      justify-content: flex-end;
      border-top: 1px solid #eee;
      padding-right: 15px;
      .cancel {
        margin-right: 20px;
      }
    }
  }
  // 表格滚动条样式<-----
  // .el-table__body-wrapper::-webkit-scrollbar {
  //   /*width: 0;宽度为0隐藏*/
  //   width: 2px;
  // }
  // .el-table__body-wrapper::-webkit-scrollbar-thumb {
  //   border-radius: 2px;
  //   height: 50px;
  //   background: #eee;
  // }
  // .el-table__body-wrapper::-webkit-scrollbar-track {
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   border-radius: 2px;
  //   background: rgba(0, 0, 0, 0.4);
  // }
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  // ---->表格滚动条样式
  .el-upload {
    width: 100%;
  }
  .right {
    width: 20%;
    background-color: white;
    border-radius: 4px;
    font-size: 13px;
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
  .upload-box {
    width: 100%;
    height: 75px;
    border-radius: 10px;
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 10px;
    }
  }
}
</style>
