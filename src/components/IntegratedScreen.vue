<!--综合大屏-->
<template>
  <div class="integratedScreen">
    <div class="inte-header">
      <img src="@/assets/image/u1.png" alt="" class="banner" />
      <img src="@/assets/image/u241.png" alt="" class="left" />
      <img
        src="@/assets/image/u332.png"
        alt=""
        class="left-center"
        @click="showMenu"
      />
      <div class="title">
        <img src="@/assets/image/u310.png" alt="" />
        <div class="title-title">危险化学品事故救援实训管理平台</div>
        <img src="@/assets/image/u309.png" alt="" />
      </div>
      <div class="inte-header-right">
        <div class="time-part">
          <img src="@/assets/image/u307.png" alt="" class="time" />
          <span>{{ nowTime }}</span>
        </div>
        <div class="user-part person">
          <img src="@/assets/image/u290.svg" alt="" class="img1" />
          <img src="@/assets/image/u291.svg" alt="" class="img2" />
        </div>
        <span>Admin</span>
        <img
          src="@/assets/image/u313.png"
          alt=""
          class="time"
          @click="logout"
          style="cursor: pointer"
        />
      </div>
    </div>

    <div class="inte-content">
      <div class="inte-content-left">
        <div class="section1">
          <div class="section1-title">当前实训</div>
          <div
            class="section1-content1"
            style="display: flex; justify-content: space-between"
          >
            <div style="display: flex">
              <p class="p1" :title="trainingRecordName" @click="toVis">
                {{ trainingRecordName | ellipsis }}
              </p>
              <span
                class="ball span2"
                v-if="burningSceneName.indexOf('球罐') !== -1"
                >球罐</span
              >
              <span
                class="car span2"
                v-if="burningSceneName.indexOf('槽车') !== -1"
                >槽车</span
              >
              <span
                class="tank span2"
                v-if="burningSceneName.indexOf('浮顶罐') !== -1"
                >浮顶罐</span
              >
            </div>
            <div>
              <p class="p1">当前实训总数：{{ recordTotal }}个</p>
            </div>
          </div>
          <div class="section1-content2">
            <div class="s1-c2-item">
              <span class="span1">参训队伍：</span>
              <span class="span2">{{ teamName }}</span>
            </div>
            <div class="s1-c2-item">
              <span class="span1">实训课件：</span>
              <span class="span2">{{ coursewareName }}</span>
            </div>
          </div>
        </div>

        <div class="section2">
          <div class="section2-header">
            <span class="span1"></span>
            <span class="span2"></span>
            <span class="span3"></span>
            <span class="span4"></span>
          </div>
          <div class="section2-content">
            <div class="section2-c-item">
              <div class="s2-c-item-top">
                <img src="@/assets/image/u753.png" alt="" />
                <span>基地物资</span>
              </div>
              <div class="s2-c-item-bottom">
                <span class="span1" @click="openSuppliesDetail()">{{
                  suppliesNum
                }}</span>
                <span class="span2">个</span>
              </div>
            </div>
            <div class="section2-c-item">
              <div class="s2-c-item-top">
                <img src="@/assets/image/u26.png" alt="" />
                <span>基地装备</span>
              </div>
              <div class="s2-c-item-bottom">
                <span class="span1" @click="openEquipmentDetail()">{{
                  equipmentNum
                }}</span>
                <span class="span2">个</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section3">
          <div class="section3-header">
            <div>实训课件</div>
            <span class="span1"></span>
            <span class="span2"></span>
            <span class="span3"></span>
            <span class="span4"></span>
          </div>

          <div class="section3-content1">
            <span class="s3-c1-lable">课件总数</span>
            <div class="s3-c1-content">
              <span class="span1">{{ total }}</span>
              <span class="span2">个</span>
            </div>
          </div>

          <div class="section3-content2">
            <div id="charts"></div>
          </div>
        </div>

        <div class="section3 section4">
          <div class="section3-header">
            <div>应急队伍</div>
            <span class="span1"></span>
            <span class="span2"></span>
            <span class="span3"></span>
            <span class="span4"></span>
          </div>
          <div class="section3-content1">
            <span class="s3-c1-lable">队伍总数</span>
            <div class="s3-c1-content">
              <span class="span1">{{ teamTotal }}</span>
              <span class="span2">个</span>
            </div>
          </div>
          <div class="section4-content1">
            <div class="section4-c1-header">
              <span class="span1">队伍类型</span>
              <span class="span2">单位：个</span>
            </div>
            <div class="section4-c1-content">
              <div class="box">
                <div
                  v-for="(item, index) in teamList"
                  :key="index"
                  class="s4-c1-c-item"
                >
                  <span class="item-left" :title="item.name">{{
                    item.name | ellipsis2
                  }}</span>
                  <div
                    :style="'width:' + 5 * Number(item.number) + 'px'"
                    class="item-center"
                  ></div>
                  <span class="item-right">{{ item.number }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="inte-content-center">
        <div class="section-top">
          <div class="yuan-bg">
            <div class="center-bg" @click="newBtn2()">
              <div>真火实训</div>
              <div>{{ burningSum }}</div>
              <div>单位：次</div>
            </div>
            <div
              v-for="(item, index) in burningList"
              :key="item.burningSceneId"
              class="cylindrical-style"
              :id="
                index === 0
                  ? 'cylindrical-style1'
                  : index === 1
                  ? 'cylindrical-style2'
                  : index === 2
                  ? 'cylindrical-style3'
                  : index === 3
                  ? 'cylindrical-style4'
                  : index === 4
                  ? 'cylindrical-style5'
                  : index === 5
                  ? 'cylindrical-style6'
                  : 'cylindrical-style7'
              "
              :class="butType === index ? 'opacity2' : 'opacity1'"
              @click="newBtn(item, index)"
            >
              <div :class="butType === index ? 'img-btn2' : 'img-btn'">
                {{ item.burningSceneName || item.name }}
              </div>
              <div class="img-bg" :style="'height:' + 30 * item.number + 'px'">
                {{ item.number }}
              </div>
            </div>
          </div>
        </div>
        <div class="section-bottom">
          <div class="left">
            <div class="left-header">
              <div class="left-header-title">
                应急队伍综合得分(仅计入有成绩的实训) top10
              </div>
              <span class="span1"></span>
              <span class="span2"></span>
              <span class="span3"></span>
              <span class="span4"></span>
            </div>
            <div class="left-content">
              <div
                v-for="(item, index) in teamRankingList"
                :key="item.teamId"
                class="left-c-item"
                @click="goInfo(item)"
              >
                <div class="item-left">
                  <span
                    :class="
                      index === 0
                        ? 'left11 left1'
                        : index === 1
                        ? 'left12 left1'
                        : index === 2
                        ? 'left13 left1'
                        : 'left1'
                    "
                    >{{ index + 1 }}</span
                  >
                  <span
                    :class="
                      index === 0
                        ? 'left21 left2'
                        : index === 1
                        ? 'left22 left2'
                        : index === 2
                        ? 'left23 left2'
                        : 'left2'
                    "
                    :title="item.teamName"
                    >{{ item.teamName | ellipsis }}</span
                  >
                </div>
                <div class="item-right">
                  <span
                    :class="
                      index === 0
                        ? 'right1 right'
                        : index === 1
                        ? 'right2 right'
                        : index === 2
                        ? 'right3 right'
                        : 'right'
                    "
                    >{{ item.teamNumber }}次</span
                  >
                  <div class="line"></div>
                  <span
                    :class="
                      index === 0
                        ? 'right1 right'
                        : index === 1
                        ? 'right2 right'
                        : index === 2
                        ? 'right2 right'
                        : 'right'
                    "
                    >{{ item.teamScore }}分</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="left">
            <div class="left-header">
              <div class="left-header-title">实训课件使用次数 top10</div>
              <span class="span1"></span>
              <span class="span2"></span>
              <span class="span3"></span>
              <span class="span4"></span>
            </div>
            <div class="left-content">
              <div
                v-for="(item, index) in courseRankingList"
                :key="item.coursewareId"
                class="left-c-item"
                @click="openCourseDetail(item)"
              >
                <div class="item-left">
                  <span
                    :class="
                      index === 0
                        ? 'left11 left1'
                        : index === 1
                        ? 'left12 left1'
                        : index === 2
                        ? 'left13 left1'
                        : 'left1'
                    "
                    >{{ index + 1 }}</span
                  >
                  <span
                    :class="
                      index === 0
                        ? 'left21 left2'
                        : index === 1
                        ? 'left22 left2'
                        : index === 2
                        ? 'left23 left2'
                        : 'left2'
                    "
                    :title="item.coursewareName"
                    >{{ item.coursewareName | ellipsis }}</span
                  >
                </div>
                <div class="item-right">
                  <span></span>
                  <span
                    :class="
                      index === 0
                        ? 'right1 right-right'
                        : index === 1
                        ? 'right2 right-right'
                        : index === 2
                        ? 'right3 right-right'
                        : 'right-right'
                    "
                    >已实训：{{ item.coursewareUseNum }}次</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="inte-content-right">
        <div class="section1">
          <div class="mon-content">
            <div class="content-top">
              <div class="left-title">
                <span>视频监控</span>
                <div class="rectBox">
                  <div class="rectangle"></div>
                  <div class="rectangle" style="opacity: 0.75"></div>
                  <div class="rectangle" style="opacity: 0.5"></div>
                  <div class="rectangle" style="opacity: 0.25"></div>
                </div>
              </div>
              <div class="page-box">
                <div
                  :class="videoPage === 1 ? 'now-page' : 'page'"
                  @click="moninerPage(1)"
                ></div>
                <div
                  :class="videoPage === 2 ? 'now-page' : 'page'"
                  @click="moninerPage(2)"
                ></div>
                <div
                  :class="videoPage === 3 ? 'now-page' : 'page'"
                  @click="moninerPage(3)"
                ></div>
              </div>
            </div>
            <div
              v-for="(item, index) in videoList"
              :key="item.id"
              class="video-part"
            >
              <div class="minVideo">
                <img
                  src="@/assets/image/u662.png"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </div>
              <div class="video-title">
                <span>{{ item.monitoringPlaceName }}</span>
                <img
                  @click="showVideoPop(index)"
                  src="@/assets/image/u663.png"
                  style="width: 20px; height: 20px"
                  class=""
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="section2">
          <div class="section2-title">系统链接</div>
          <div class="section2-content">
            <div class="s2-c-item" v-for="item in linkList" :key="item.id">
              <img src="@/assets/image/u643.svg" alt="" />
              <span @click="toLink(item.link)">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        :class="
          slide
            ? 'inte-menu inte-menu-slide-on'
            : 'inte-menu inte-menu-slide-no'
        "
      >
        <div class="inte-menu-box">
          <div class="inte-menu-item">
            <div
              class="inte-menu-item-check"
              @click="checkPage('/integratedScreen')"
            >
              综合大屏
            </div>
          </div>
          <div class="inte-menu-item">
            <div>真火实训</div>
            <div class="inte-menu-item-subMenu">
              <div class="subMenu-item" @click="checkPage('/courseware')">
                -实训课件
              </div>
              <div class="subMenu-item" @click="checkPage('/trainfiles')">
                -实训档案
              </div>
              <div class="subMenu-item" @click="checkPage('/visualization')">
                -实训可视化
              </div>
              <div class="subMenu-item" @click="checkPage('/firescript')">
                -真火脚本
              </div>
            </div>
          </div>
          <div class="inte-menu-item">
            <div>信息管理</div>
            <div class="inte-menu-item-subMenu">
              <div class="subMenu-item" @click="checkPage('/emergencyTeam')">
                -应急队伍
              </div>
              <div class="subMenu-item" @click="checkPage('/emergencyExperts')">
                -应急专家
              </div>
              <div class="subMenu-item" @click="checkPage('/baseMaterials')">
                -基地物资
              </div>
              <div class="subMenu-item" @click="checkPage('/baseEquip')">
                -基地装备
              </div>
            </div>
          </div>
          <div class="inte-menu-item">
            <div
              class="inte-menu-item-title"
              @click="checkPage('/videoDeploy')"
            >
              视频配置
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 点击基地装备弹窗 -->
    <div class="screen-increasePopup" v-if="popupShow">
      <div class="increaseContent">
        <div class="title">
          <span>基地装备</span>
          <div></div>
          <div style="background: #4ba3ce"></div>
          <div style="background: #397ea1"></div>
          <div style="background: #1e445f"></div>
        </div>
        <div class="table">
          <div>
            <div>#</div>
            <div>装备名称</div>
            <div>装备类型</div>
            <div>计量单位</div>
            <div>数量</div>
            <div>存放地点</div>
            <div>规格型号</div>
            <div>用途</div>
          </div>
          <div v-for="(item, index) in equipList" :key="index">
            <div>{{ index + 1 + (equipOffset - 1) * equipLimit }}</div>
            <div :title="item.equipmentName">
              {{ (item.equipmentName || "--") | ellipsis2 }}
            </div>
            <div :title="item.type">{{ (item.type || "--") | ellipsis2 }}</div>
            <div :title="item.unitMeasurement">
              {{ (item.unitMeasurement || "--") | ellipsis2 }}
            </div>
            <div :title="item.numberEquipment">
              {{ (item.numberEquipment || "--") | ellipsis2 }}
            </div>
            <div :title="item.storageLocation">
              {{ (item.storageLocation || "--") | ellipsis2 }}
            </div>
            <div :title="item.model">
              {{ (item.model || "--") | ellipsis2 }}
            </div>
            <div :title="item.equipmentUse">
              {{ (item.equipmentUse || "--") | ellipsis2 }}
            </div>
            <!-- <div>{{ item.type || "--" }}</div>
            <div>{{ item.unitMeasurement || "--" }}</div>
            <div>{{ item.numberEquipment || "--" }}</div>
            <div>{{ item.storageLocation || "--" }}</div>
            <div>{{ item.model || "--" }}</div>
            <div>{{ item.equipmentUse || "--" }}</div> -->
          </div>
        </div>
        <div style="text-align: right">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="equipLimit"
            :total="equipTotal"
            @current-change="pageCurrentChange"
            small
          >
          </el-pagination>
        </div>
        <div style="width: 100%; text-align: right">
          <div class="offButton" @click="popupShow = false">关闭</div>
        </div>
      </div>
    </div>
    <!-- 点击基地物资弹窗 -->
    <div class="screen-increasePopup" v-if="popupShow3">
      <div class="increaseContent">
        <div class="title">
          <span>基地物资</span>
          <div></div>
          <div style="background: #4ba3ce"></div>
          <div style="background: #397ea1"></div>
          <div style="background: #1e445f"></div>
        </div>
        <div class="table">
          <div>
            <div>#</div>
            <div>物资名称</div>
            <div>物资类型</div>
            <div>计量单位</div>
            <div>数量</div>
            <div>存放地点</div>
          </div>
          <div v-for="(item, index) in suppliesList" :key="index">
            <div>{{ index + 1 + (suppliesOffset - 1) * suppliesLimit }}</div>
            <div :title="item.name">{{ (item.name || "--") | ellipsis2 }}</div>
            <div :title="item.suppliesType">
              {{ (item.suppliesType || "--") | ellipsis2 }}
            </div>
            <div :title="item.measureUnit">
              {{ (item.measureUnit || "--") | ellipsis2 }}
            </div>
            <div :title="item.number">
              {{ (item.number || "--") | ellipsis2 }}
            </div>
            <!-- <div>{{ item.name || "--" }}</div>
            <div>{{ item.suppliesType || "--" }}</div>
            <div>{{ item.measureUnit || "--" }}</div>
            <div>{{ item.number || "--" }}</div> -->
            <div :title="item.storageLocation">
              {{ (item.storageLocation || "--") | ellipsis2 }}
            </div>
          </div>
        </div>
        <div style="text-align: right">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="suppliesLimit"
            :total="suppliesTotal"
            @current-change="pageCurrentChange2"
            small
          >
          </el-pagination>
        </div>
        <div style="width: 100%; text-align: right">
          <div class="offButton" @click="popupShow3 = false">关闭</div>
        </div>
      </div>
    </div>
    <!-- 课件详情弹窗 -->
    <div class="screen-increasePopup" v-if="popupShow1">
      <div class="increaseContent" style="width: 800px; height: auto">
        <div class="title">
          <span>课件信息</span>
          <div></div>
          <div style="background: #4ba3ce"></div>
          <div style="background: #397ea1"></div>
          <div style="background: #1e445f"></div>
        </div>
        <div class="content">
          <div style="display: flex">
            <div style="margin-right: 50px">
              <span>课件名称：</span>
              <span :title="coursewareDetail.name">{{
                (coursewareDetail.name || "--") | ellipsis
              }}</span>
            </div>
            <div style="margin-right: 50px">
              <span>脚本名称：</span>
              <span :title="coursewareDetail.scriptName">{{
                (coursewareDetail.scriptName || "--") | ellipsis
              }}</span>
            </div>
            <div style="margin-right: 50px">
              <span>预计时长：</span>
              <span>{{ coursewareDetail.estimatedDuration || "--" }}</span>
            </div>
          </div>
          <div>
            <span>科目内容：</span>
            <span :title="coursewareDetail.subjectContent">{{
              (coursewareDetail.subjectContent || "--") | ellipsis50
            }}</span>
          </div>
          <div>
            <span>使用器材：</span>
            <span :title="coursewareDetail.equipment">{{
              (coursewareDetail.equipment || "--") | ellipsis50
            }}</span>
          </div>
          <div>
            <span>实训对象：</span>
            <span :title="coursewareDetail.trainingObject">{{
              (coursewareDetail.trainingObject || "--") | ellipsis50
            }}</span>
          </div>
          <div>
            <span>事前准备：</span>
            <span :title="coursewareDetail.ready">{{
              (coursewareDetail.ready || "--") | ellipsis50
            }}</span>
          </div>
          <div>
            <span>安全注意事项：</span>
            <span :title="coursewareDetail.safetyPrecautions">{{
              (coursewareDetail.safetyPrecautions || "--") | ellipsis50
            }}</span>
          </div>
          <div style="margin-top: 30px; color: #5bc6f6">
            {{ scriptInfo.name || "--" }}
          </div>
          <div style="display: flex">
            <div style="width: 25%">
              <span>同步时间：</span
              ><span :title="scriptInfo.syncTime">{{
                (scriptInfo.syncTime || "--") | ellipsis50
              }}</span>
            </div>
            <div style="width: 25%">
              <span>编码：</span
              ><span :title="scriptInfo.code">{{
                (scriptInfo.code || "--") | ellipsis50
              }}</span>
            </div>
            <div style="width: 25%">
              <span>总时间：</span
              ><span :title="scriptInfo.trainingTime">{{
                (scriptInfo.trainingTime || "--") | ellipsis50
              }}</span>
            </div>
            <div style="width: 25%">
              <span>燃烧场景：</span
              ><span :title="scriptInfo.burningScene">{{
                (scriptInfo.burningScene || "--") | ellipsis50
              }}</span>
            </div>
          </div>
          <div>
            <span>描述：</span
            ><span :title="scriptInfo.description">{{
              (scriptInfo.description || "--") | ellipsis50
            }}</span>
          </div>
        </div>
        <div style="width: 100%; text-align: right">
          <div class="offButton" @click="popupShow1 = false">关闭</div>
        </div>
      </div>
    </div>
    <!-- 视频控制弹窗 -->
    <div class="screen-increasePopup" v-if="videoSetPop">
      <div class="increaseContent" style="width: 800px; height: 550px">
        <div class="title">
          <span>视频控制</span>
          <div></div>
          <div style="background: #4ba3ce"></div>
          <div style="background: #397ea1"></div>
          <div style="background: #1e445f"></div>
        </div>
        <div
          style="
            width: 100%;
            height: calc(100% - 114px);
            overflow-y: scroll;
            align-content: flex-start;
          "
          class="scroll flex flex-ww"
        >
          <p
            v-for="item in videoShowList"
            :key="item.id"
            style="
              width: 100%;
              padding: 4px 0;
              height: 26px;
              margin-bottom: 10px;
              background-color: rgba(0, 204, 255, 0.0470588235294118);
            "
            :class="
              item.isShow === true
                ? 'flex flex-ac cor-bc notcheckedVideo'
                : 'flex flex-ac cor-bc'
            "
            :id="item.id === highLightItem.id ? 'checkedVideo' : ''"
            @click="checkThisVideo(item)"
          >
            <i
              :class="
                item.isShow === true
                  ? 'el-icon-video-camera-solid cor-chekc'
                  : 'el-icon-video-camera-solid cor-b'
              "
              :id="item.id === highLightItem.id ? 'checkedIcon' : ''"
              style="margin: 0 5px"
            ></i>
            <span class="font-12" v-if="item.isShow === false">{{
              item.monitoringPlaceName
            }}</span>
            <span class="font-12" v-else>{{ item.monitoringPlaceName }}</span>
          </p>
        </div>
        <div style="width: 100%; text-align: right">
          <el-pagination
            background
            class="footpage"
            layout="total, prev, pager, next"
            :total="videoShowTotal"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
        <!-- <div
          style="
            width: 100%;
            flex: 1;
            display: flex;
            justify-content: space-between;
            padding:10px;
            overflow:hidden;
          "
        >
          <div
            style="
              width: 25%;
              height: 100%;
              border: 1px solid #ccc;
              border-radius:5px;
              padding: 10px;
              overflow:scroll;
            "
          >
            <div
              style="
                width: 100%;
                height: 35px;
                line-height: 35px;
                padding: 0 10px;
                margin-bottom:5px;
                color:white;
              "
              v-for="item in videoShowList"
              :key="item.id"
            >
              {{ item.monitoringPlaceName }}
            </div>
          </div>
          <div style="width: 72%; height: 100%; border: 1px solid #ccc"></div>
        </div> -->
        <div
          @click="confirmVideoPop"
          class="pos-a flex flex-ac flex-jc save-btn"
          style="bottom: 0; right: 0"
        >
          <img style="height: 30px" src="./../assets/sure.png" alt="" />
          <span class="pos-a" style="color: #fff">确定</span>
        </div>
        <div
          @click="hideVideoPop"
          class="pos-a flex flex-ac flex-jc cancel-btn"
          style="bottom: 0; right: 120px"
        >
          <img style="height: 30px" src="./../assets/cancel.png" alt="" />
          <span class="pos-a" style="color: #fff">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import url("./../assets/css/index.css");
@import url("./../font/font.css");
.mon-content {
  width: 100%;
  height: 100%;
  // position: absolute;
  // top: 0;
  // left: 0;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  .content-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    .left-title {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: white;
        margin-right: 10px;
        height: 20px;
        line-height: 26px;
      }
      .rectBox {
        height: 20px;
        display: flex;
        align-items: flex-end;
      }
      .rectangle {
        width: 6px;
        height: 6px;
        background: rgb(0, 204, 255);
        margin-right: 2px;
      }
    }
    .page-box {
      height: 100%;
      display: flex;
      align-items: center;
      div {
        margin-left: 10px;
      }
    }
    .now-page {
      width: 12px;
      height: 12px;
      border-radius: 20px;
      background: rgb(0, 204, 255);
    }
    .page {
      width: 12px;
      height: 12px;
      border-radius: 20px;
      background: rgb(0, 104, 149);
    }
    .now-page,
    .page:hover {
      cursor: pointer;
    }
  }
  .minVideo {
    width: 100%;
    height: 150px;
  }
  .video-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
    font-size: 12px;
  }
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.screen-increasePopup {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.336);
  font-size: 12px;
  .increaseContent {
    background: url("../assets/image/u814.svg");
    background-size: 100% 100%;
    width: 55%;
    height: 60%;
    border-radius: 5px;
    padding: 20px 20px 60px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: space-between;
    .save-btn {
      bottom: 15px !important;
      right: 15px !important;
      cursor: pointer;
    }
    .cancel-btn {
      bottom: 15px !important;
      right: 135px !important;
      cursor: pointer;
    }
    .content {
      color: #fff;
      font-size: 12px;
      span {
        color: #b1eafb;
      }
      > div {
        margin-top: 10px;
      }
      .list-li {
        background: #0c1c34;
        color: #aee7f8;
        padding: 10px;
        display: flex;
        align-items: center;
        border-radius: 3px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 20px;
        }
      }
      .list-li2 {
        background: #5cc9fa;
        color: #000;
        padding: 10px;
        display: flex;
        align-items: center;
        border-radius: 3px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 20px;
        }
      }
    }
    .offButton {
      background: url("../assets/image/u747.svg");
      background-size: 100% 100%;
      width: 80px;
      height: 30px;
      color: #000;
      display: inline-block;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
    .title {
      color: #fff;
      display: flex;
      margin-top: 20px;
      align-items: center;
      span {
        font-size: 20px;
        margin-right: 5px;
      }
      div {
        width: 6px;
        height: 6px;
        background: #5cc9fa;
        margin-right: 2px;
      }
    }
    .table {
      width: 100%;
      margin-top: 10px;
      overflow-y: auto;
      > div {
        display: flex;
        color: #b1eafb;
        background: #0a172a;
        > div {
          width: 20%;
          height: 40px;
          border: 1px solid #1e2734;
          padding: 0 10px;
          line-height: 40px;
        }
        > div:nth-child(1) {
          width: 9%;
        }
      }
      > div:nth-child(1) {
        color: #5cc9fa;
        background: none;
      }
      > div:hover {
        background: #5cc9fa;
        color: #081728;
      }
      > div:nth-child(1):hover {
        background: none;
        color: #5cc9fa;
      }
    }
  }
  .footpage {
    .btn-prev,
    .btn-next {
      background: rgba(0, 3, 40, 0.5) !important;
      color: white !important;
    }
  }
  .notcheckedVideo {
    background: inherit;
    background-color: gray !important;
    color: white;
  }
  .nocheck {
    background: rgba(0, 204, 255, 0.047);
  }
  #checkedVideo {
    color: #020e1e;
    background: inherit;
    background-color: rgba(0, 204, 255, 1) !important;
  }
  #checkedIcon {
    color: #020e1e;
  }
  .cor-chekc {
    color: white;
  }
  .vis-body {
    width: 100%;
    display: flex;
    padding: 0 10px 15px;
    justify-content: space-between;
    .body-left {
      width: 75%;
      .otherSystem {
        position: relative;
        .fullscreen {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: rgb(0, 204, 255);
          display: flex;
          align-items: center;
          font-size: 12px;
          img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
        }
      }
      .boderimg {
        width: 100%;
      }
      .left-foot {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .foot-top {
          width: 100%;
          font-size: 20px;
          color: white;
          font-weight: 600;
          display: flex;

          .mark {
            background: rgb(151, 75, 247);
            padding: 2px 3px;
            border-radius: 3px;
            height: 20px;
            font-size: 10px;
            margin-left: 10px;
          }
        }
        .foot-info {
          display: flex;
          height: 30px;
          align-items: center;
          div {
            margin-right: 25px;
            font-size: 12px;
            .title-span {
              color: rgb(160, 236, 253);
            }
            .cantclick {
              color: white;
            }
            .canclick {
              text-decoration: underline;
            }
            .canclick:hover {
              color: rgb(160, 236, 253);
              cursor: pointer;
            }
          }
        }
        .right {
          position: relative;
          div {
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: rgb(0, 204, 255);
            font-weight: 600;
          }
        }
      }
    }
    .body-right {
      width: 24%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .boderimg {
        width: 100%;
      }
      .timebox {
        position: relative;
        .posidiv {
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          position: absolute;
          display: flex;
          /* justify-content: space-between; */
          flex-direction: column;
          p {
            font-size: 12px;
            padding-left: 20px;
            height: 20px;
          }
          .timeimg {
            width: 100%;
            height: calc(100% - 20px);
            font-family: "font-number";
            color: #00ccff;
          }
        }
      }
      .monitor-box {
        height: 610px;
        position: relative;
        .mon-content {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          padding: 0 20px;
          .content-top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 40px;
            align-items: center;
            .left-title {
              display: flex;
              align-items: center;
              span {
                font-size: 14px;
                color: white;
                margin-right: 10px;
                height: 20px;
                line-height: 26px;
              }
              .rectBox {
                height: 20px;
                display: flex;
                align-items: flex-end;
              }
              .rectangle {
                width: 6px;
                height: 6px;
                background: rgb(0, 204, 255);
                margin-right: 2px;
              }
            }
            .page-box {
              height: 100%;
              display: flex;
              align-items: center;
              div {
                margin-left: 10px;
              }
            }
            .now-page {
              width: 12px;
              height: 12px;
              border-radius: 20px;
              background: rgb(0, 204, 255);
            }
            .page {
              width: 12px;
              height: 12px;
              border-radius: 20px;
              background: rgb(0, 104, 149);
            }
            .now-page,
            .page:hover {
              cursor: pointer;
            }
          }
          .video-part {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .minVideo {
            width: 100%;
            height: 150px;
          }
          .video-title {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            color: white;
            justify-content: space-between;
            font-size: 12px;
          }
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.integratedScreen {
  width: 100%;
  background-image: url("../assets/image/u0.png");
  background-size: 100% 100%;
  min-height: 100vh;
  .inte-header {
    width: 100%;
    position: relative;
    .title {
      width: 40%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      position: absolute;
      top: 11%;
      left: 30%;
      .title-title {
        color: white;
        font-size: 27px;
      }
    }
    .banner {
      width: 100%;
      height: 110px;
    }
    .left {
      width: 2.3%;
      position: absolute;
      bottom: 30%;
      left: 0;
      animation: rotate 5s linear infinite;
    }
    .left-center {
      width: 1.1%;
      position: absolute;
      left: 0.57%;
      bottom: 39%;
      cursor: pointer;
    }
    .inte-header-right {
      height: 50%;
      position: absolute;
      top: 11%;
      right: 10px;
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .time {
        width: 20px;
        height: 20px;
      }
      .time-part {
        display: flex;
        align-items: center;
        height: 30px;
        margin-right: 10px;
        padding: 0 10px;
        background-image: url("../assets/image/a1_03.png"),
          url("../assets/image/a1_04.png"), url("../assets/image/a1_05.png"),
          url("../assets/image/a1_06.png");
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: top left, top right, bottom left, bottom right;
      }
      .user-part {
        width: 30px;
        height: 30px;
        background-image: url("../assets/image/a1_03.png"),
          url("../assets/image/a1_04.png"), url("../assets/image/a1_05.png"),
          url("../assets/image/a1_06.png");
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: top left, top right, bottom left, bottom right;
        line-height: 30px;
        text-align: center;
      }
      span {
        color: white;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 1px;
      }
      .person {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 30px;
        width: 30px;
        justify-content: center;
        .img1 {
          width: 6px;
          margin-bottom: 2px;
        }
        .img2 {
          width: 14px;
        }
      }
    }
  }
  .inte-content {
    position: relative;
    top: -20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 20px;
    .inte-menu-slide-no {
      position: absolute;
      left: -230px;
      top: -10px;
    }
    .inte-menu-slide-on {
      position: absolute;
      left: 0;
      top: -10px;
    }
    .inte-menu {
      height: 100%;
      width: 230px;
      z-index: 999;
      background: rgba(2, 13, 30, 0.9);
      transition: left linear 0.3s;
      .inte-menu-box {
        height: 100%;
        width: 100%;
        background-image: url("../assets/image/u4.png");
        background-size: 100% 100%;
        color: #a0ecfd;
        font-size: 13px;
        padding: 40px 30px;
        .inte-menu-item {
          margin-bottom: 20px;
          .inte-menu-item-title {
            cursor: pointer;
          }
          .inte-menu-item-check {
            color: #00ccff;
            font-weight: 700;
            cursor: pointer;
          }
          .inte-menu-item-subMenu {
            padding: 0 20px;
            .subMenu-item {
              margin-top: 10px;
              cursor: pointer;
            }
            .subMenu-item:hover {
              color: #00ccff;
            }
          }
        }
      }
    }
    .inte-content-left {
      width: 21%;
      .section1 {
        width: 100%;
        height: 100px;
        background-image: url("../assets/image/u311.png");
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        .section1-title {
          font-size: 12px;
          font-weight: 700;
          margin-left: 15px;
        }
        .section1-content1 {
          display: flex;
          padding: 10px 15px 0;
          align-items: center;
          .p1 {
            color: #00ccff;
            font-size: 13px;
            font-weight: 700;
            border-bottom: 1px solid #00ccff;
            cursor: pointer;
          }
          .span2 {
            display: inline-block;
            text-align: center;
            height: 16px;
            line-height: 16px;
            color: white;
            border-radius: 2px;
            font-size: 10px;
            margin-left: 10px;
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
        .section1-content2 {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0 15px;
          justify-content: space-evenly;
          .s1-c2-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .span1 {
              color: #a0ecfd;
              font-size: 12px;
            }
            .span2 {
              color: #f2f3f8;
              font-size: 12px;
            }
          }
        }
      }
      .section2 {
        background: url("../assets/image/u20.svg");
        background-size: 100% 100%;
        width: 100%;
        height: 100px;
        margin-top: 15px;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        flex: 1;
        .section2-header {
          display: flex;
          align-items: center;
          span {
            width: 4px;
            height: 4px;
            background-color: rgba(0, 204, 255, 1);
            margin-right: 2px;
          }
          .span1 {
            opacity: 1;
          }
          .span2 {
            opacity: 0.8;
          }
          .span3 {
            opacity: 0.6;
          }
          .span4 {
            opacity: 0.4;
          }
        }
        .section2-content {
          display: flex;
          flex: 1;
          padding: 5px 0;
          justify-content: space-between;
          .section2-c-item {
            width: 48%;
            background-color: rgba(0, 204, 255, 0.0980392156862745);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 5px 0 5px 10px;
            .s2-c-item-top {
              display: flex;
              align-items: center;
              img {
                width: 12px;
                height: 12px;
                margin-right: 5px;
              }
              span {
                color: #f2f3f8;
                font-size: 12px;
              }
            }
            .s2-c-item-bottom {
              .span1 {
                font-size: 18px;
                color: #00ccff;
                margin-right: 5px;
                cursor: pointer;
              }
              .span2 {
                font-size: 12px;
                color: white;
              }
            }
          }
        }
      }
      .section3 {
        background-image: url("../assets/image/u757.svg");
        background-size: 100% 100%;
        width: 100%;
        height: 240px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 15px;
        .section3-header {
          display: flex;
          align-items: center;
          div {
            font-size: 12px;
            color: white;
            margin-right: 10px;
          }
          span {
            width: 4px;
            height: 4px;
            background-color: rgba(0, 204, 255, 1);
            margin-right: 2px;
          }
          .span1 {
            opacity: 1;
          }
          .span2 {
            opacity: 0.8;
          }
          .span3 {
            opacity: 0.6;
          }
          .span4 {
            opacity: 0.4;
          }
        }
        .section3-content1 {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          justify-content: space-between;
          background-color: rgba(0, 204, 255, 0.0980392156862745);
          border-radius: 4px;
          margin: 5px 0;
          flex-shrink: 0;
          .s3-c1-lable {
            font-size: 12px;
            color: white;
          }
          .s3-c1-content {
            display: flex;
            align-items: center;
            .span1 {
              color: #00ccff;
              font-size: 18px;
              margin-right: 10px;
            }
            .span2 {
              color: white;
              font-size: 12px;
            }
          }
        }
        .section3-content2 {
          display: flex;
          flex-direction: column;
          flex: 1;
          #charts {
            width: 100%;
            height: 100%;
          }
        }
      }
      .section4 {
        background-image: url("../assets/image/u337.svg");
        .section4-content1 {
          display: flex;
          flex-direction: column;
          flex: 1;
          .section4-c1-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .span1 {
              font-size: 12px;
              color: #00ccff;
              font-weight: 700;
            }
            .span2 {
              font-size: 12px;
              color: #a0ecfd;
            }
          }
          .section4-c1-content {
            width: 100%;
            height: 150px;
            overflow: hidden;
            /* for Chrome */
            .inner-content::-webkit-scrollbar {
              display: none;
            }
            .box {
              height: 100%;
              overflow-x: hidden;
            }
            .s4-c1-c-item {
              display: flex;
              height: 20px;
              align-items: center;
              font-size: 12px;
              margin: 5px 0;
              .item-left {
                width: 30%;
                color: #a0ecfd;
                text-align: right;
                margin-right: 15px;
              }
              .item-center {
                height: 15px;
                margin-right: 10px;
                background: linear-gradient(
                  89.0749348654512deg,
                  rgba(2, 14, 30, 1) 0%,
                  rgba(0, 165, 255, 1) 97%
                );
                border-radius: 2px;
                min-width: 5px;
                max-width: 140px;
              }
              .item-right {
                color: #00ccff;
              }
            }
          }
        }
      }
    }
    .inte-content-center {
      display: flex;
      flex: 1;
      flex-direction: column;
      .section-top {
        width: 100%;
        height: 60%;
        // border: 1px solid yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        .yuan-bg {
          width: 500px;
          height: 250px;
          background: url("../assets/image/u540.png");
          background-size: 100% 100%;
          position: relative;
          display: flex;
          justify-content: center;
          .cylindrical-style {
            display: flex;
            flex-direction: column-reverse;
            cursor: pointer;
          }
          #cylindrical-style1 {
            position: absolute;
            top: 0;
            left: -60px;
            height: 150px;
          }
          #cylindrical-style6 {
            position: absolute;
            top: 0;
            right: -60px;
            height: 150px;
          }
          #cylindrical-style7 {
            position: absolute;
            top: -100px;
            right: 40px;
            height: 150px;
          }
          #cylindrical-style4 {
            position: absolute;
            top: -100px;
            left: 40px;
            height: 150px;
          }
          #cylindrical-style5 {
            position: absolute;
            bottom: 0;
            right: 50px;
            height: 150px;
          }
          #cylindrical-style2 {
            position: absolute;
            bottom: 0;
            left: 50px;
            height: 150px;
          }
          #cylindrical-style3 {
            position: absolute;
            bottom: -40px;
            left: 210px;
            height: 150px;
          }
          .center-bg {
            background: url("../assets/image/u541.png");
            background-size: 100% 100%;
            width: 150px;
            height: 180px;
            margin-top: -40px;
            color: #fff;
            cursor: pointer;
            > div:nth-child(1) {
              font-size: 16px;
              margin-top: 20px;
            }
            > div:nth-child(2) {
              font-size: 30px;
              font-weight: bold;
              margin-top: 40px;
              margin-bottom: 10px;
            }
          }
          > div {
            display: inline-block;
            color: #a3d9ec;
            text-align: center;
            font-size: 12px;
          }
          .opacity1 {
            opacity: 0.5;
          }
          .opacity2 {
            opacity: 1;
          }
          .img-bg {
            background: url("../assets/image/u567.png");
            background-size: 100% 100%;
            width: 80px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            font-weight: bold;
            min-height: 40px;
            max-height: 200px;
          }
          .img-bg:hover {
            background: url("../assets/image/u567_mouseOver.png");
            background-size: 100% 100%;
          }
          .img-btn {
            margin-top: 5px;
            padding: 0 5px;
          }
          .img-btn2 {
            margin-top: 5px;
            padding: 0 5px;
            color: #000;
            background: url("../assets/image/u747.svg");
            background-size: 100% 100%;
          }
        }
      }
      .section-bottom {
        display: flex;
        padding: 10px;
        justify-content: space-between;
        .left {
          width: 47%;
          .left-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .left-header-title {
              font-size: 14px;
              color: #f2f3f8;
              margin-right: 10px;
            }
            span {
              width: 4px;
              height: 4px;
              background-color: rgba(0, 204, 255, 1);
              margin-right: 2px;
            }
            .span1 {
              opacity: 1;
            }
            .span2 {
              opacity: 0.8;
            }
            .span3 {
              opacity: 0.6;
            }
            .span4 {
              opacity: 0.4;
            }
          }
          .left-content {
            .left-c-item {
              display: flex;
              justify-content: space-between;
              height: 20px;
              align-items: center;
              margin: 5px 0;
              .item-left {
                display: flex;
                width: 50%;
                cursor: pointer;
                .left2 {
                  color: #a0ecfd;
                  font-size: 12px;
                  margin-left: 15px;
                }
                .left2:hover {
                  color: #00ccff;
                }
                .left21 {
                  color: #f02121;
                }
                .left22 {
                  color: #fed000;
                }
                .left23 {
                  color: #00ffb3;
                }
                .left1 {
                  width: 16px;
                  height: 16px;
                  border-radius: 8px;
                  background: #a0ecfd;
                  text-align: center;
                  line-height: 16px;
                  color: #020e1e;
                  font-size: 12px;
                }
                .left11 {
                  background: #f02121;
                }
                .left12 {
                  background: #fed000;
                }
                .left13 {
                  background: #00ffb3;
                }
              }
              .item-right {
                width: 30%;
                display: flex;
                justify-content: space-between;
                .line {
                  height: 16px;
                  border-right: 1px solid #6ba4f9;
                  background: #6ba4f9;
                }
                .right-right {
                  color: #00ccff;
                  font-size: 12px;
                  text-align: right;
                }
                .right {
                  color: #00ccff;
                  margin: 0 10px;
                  font-size: 12px;
                  width: 45%;
                  text-align: center;
                }
                .right1 {
                  color: #f02121;
                }
                .right2 {
                  color: #fed000;
                }
                .right3 {
                  color: #00ffb3;
                }
              }
            }
          }
        }
      }
    }
    .inte-content-right {
      width: 21%;
      .section1 {
        background-image: url("../assets/image/u645.svg");
        background-size: 100% 100%;
        width: 100%;
        height: 600px;
      }
      .section2 {
        background-image: url("../assets/image/u311.png");
        background-size: 100% 100%;
        width: 100%;
        height: 110px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        flex: 1;
        .section2-title {
          font-size: 12px;
          font-weight: 700;
          margin-left: 15px;
        }
        .section2-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 10px 0 10px 20px;
          justify-content: space-evenly;
          .s2-c-item {
            img {
              width: 10px;
              height: 6px;
              transform: rotate(90deg);
              margin-right: 5px;
            }
            span {
              font-size: 12px;
              color: #a0ecfd;
              border-bottom: 1px solid #a0ecfd;
              cursor: pointer;
            }
            span:hover {
              color: #00ccff;
              border-bottom: 1px solid #00ccff;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import * as echarts from "echarts";
import QS from "qs";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      videoShowTotal: 0,
      popupShow: false,
      popupShow1: false,
      allvideoPage: 1,
      NineVideo: [],
      highLightItem: "",
      checkIndex: "",
      videoSetPop: false,
      popupShow3: false,
      butType: "",
      newLi: "",
      pageNum: 1,
      nowTime: "",
      // 实训
      teamName: "",
      coursewareName: "",
      trainingRecordName: "",
      burningSceneName: "",
      trainingRecordId: "",
      // 基地
      suppliesNum: "",
      suppliesOffset: 1,
      suppliesLimit: 5,
      suppliesList: [],
      suppliesTotal: 0,
      equipmentNum: "",
      equipOffset: 1,
      equipLimit: 5,
      equipList: [],
      equipTotal: 0,
      // 课件
      coursewareList: [],
      total: 0,
      coursewareDetail: null,
      scriptInfo: null,
      // 队伍
      teamList: [],
      teamTotal: null,

      // 燃烧场景ID
      burningSceneId: "",
      burningList: [],
      burningSum: 0,

      teamRankingList: [],
      courseRankingList: [],

      // 控制菜单滑入滑出
      slide: false,

      // 系统链接列表
      linkList: [],
      videoPage: 1,
      videoList: [],
      videoShowList: [],

      recordTotal: 0,
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    upNewLi(index) {
      this.newLi = index;
    },
    // 监控翻页
    moninerPage(i) {
      this.videoPage = i;
      if (i === 1) {
        this.videoList = this.NineVideo.slice(0, 3);
      } else if (i === 2) {
        this.videoList = this.NineVideo.slice(3, 6);
      } else {
        this.videoList = this.NineVideo.slice(6, 9);
      }
    },
    newBtn(item, index) {
      // console.log(item,index)
      if (this.butType === index) {
        this.butType = "";
        this.burningSceneId = "";
      } else {
        this.butType = index;
        this.burningSceneId = item.burningSceneId;
      }
      this.getRanking();
    },
    newBtn2() {
      this.butType = "";
      this.burningSceneId = "";
      this.getRanking();
    },
    // 展开菜单
    showMenu() {
      this.slide = !this.slide;
    },
    // 初始化图表
    drawLine() {
      let option = {
        legend: {
          right: "right",
          top: 40,
          textStyle: {
            //图例文字的样式
            color: "#A0ECFD",
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
            radius: ["60%", "25%"],
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
            data: this.coursewareList,
            center: ["30%", "50%"],
          },
        ],
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("charts"));
      // 绘制图表
      myChart.setOption(option);
    },
    //视频设置弹框
    showVideoPop(i) {
      this.videoSetPop = true;
      this.checkIndex = i;
      this.getAllVideo();
    },
    getAllVideo() {
      let formdata = new FormData();
      formdata.append("limit", 10);
      formdata.append("offset", this.allvideoPage);
      this.axios({
        url: "/dah-training-api/video/selectVideoByPage",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          res.data.data.list.map((item) => {
            item.isShow = false;
            item.isChecked = false;
            for (let i = 0; i < this.NineVideo.length; i++) {
              if (item.id === this.NineVideo[i].id) {
                item.isShow = true;
              }
            }
          });
          this.videoShowList = res.data.data.list;
          this.videoShowTotal = res.data.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(currpage) {
      this.allvideoPage = currpage;
      this.getAllVideo();
    },
    checkThisVideo(item) {
      if (!item.isShow) {
        this.highLightItem = item;
      }
    },
    confirmVideoPop() {
      if (this.highLightItem === "") {
        this.$message({
          message: "请选择",
          iconClass: "el-icon-loading",
          type: "warning",
          customClass: "warningMsg",
          duration: 0,
        });
      } else {
        this.videoSetPop = false;
        this.videoList[this.checkIndex] = this.highLightItem;
        if (this.videoPage === 1) {
          this.NineVideo[this.checkIndex] = this.highLightItem;
        } else if (this.videoPage === 2) {
          this.NineVideo[this.checkIndex + 3] = this.highLightItem;
        } else if (this.videoPage === 3) {
          this.NineVideo[this.checkIndex + 6] = this.highLightItem;
        }
      }
      this.highLightItem = "";
      this.allvideoPage = 1;
    },
    hideVideoPop() {
      this.videoSetPop = false;
      this.allvideoPage = 1;
    },
    toVis() {
      if (this.trainingRecordId !== -1) {
        sessionStorage.setItem("visibid", this.trainingRecordId);
        this.$destroy();
        this.$router.push({
          path: "/visualization",
        });
      } else {
        this.$message.warning("当前暂无实训");
      }
    },
    // 获取视频
    getVideo() {
      let formdata = new FormData();
      formdata.append("limit", 9);
      formdata.append("offset", 1);
      this.axios({
        url: "/dah-training-api/video/selectVideoByPage",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          this.NineVideo = res.data.data.list;
          this.moninerPage(1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取当前时间
    getTime() {
      const date = new Date();
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
      this.nowTime = Y + "-" + M + "-" + D + " " + H + ":" + MT + ":" + S;
    },
    // 大屏右侧统计接口
    getLeft() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/home/bigStatistics",
      })
        .then((res) => {
          console.log("获取大屏右侧统计接口成功", res);
          if (res.data.code === 200) {
            this.teamName = res.data.data.currentTrainingCount.teamName;
            this.coursewareName =
              res.data.data.currentTrainingCount.coursewareName;
            this.trainingRecordName =
              res.data.data.currentTrainingCount.trainingRecordName;
            this.recordTotal = res.data.data.total;
            this.trainingRecordId =
              res.data.data.currentTrainingCount.trainingRecordId;
            this.burningSceneName =
              res.data.data.currentTrainingCount.burningSceneName;
            this.suppliesNum = res.data.data.numCount.suppliesNum;
            this.equipmentNum = res.data.data.numCount.equipmentNum;
            this.total = res.data.data.coursewareCount.sum;
            let newList = [];
            res.data.data.coursewareCount.coursewareArray.map((item) => {
              newList.push({
                name: item.name,
                value: item.number,
              });
            });
            this.coursewareList = newList;
            this.teamTotal = res.data.data.teamCount.sum;
            this.teamList = res.data.data.teamCount.teamArray;
          }
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 大屏中央排行榜
    getRanking() {
      let data = {
        burningSceneId: this.burningSceneId,
        selectNum: 10,
      };
      let params = new FormData();
      for (let k in data) {
        params.append(k, data[k]);
      }
      this.axios({
        method: "POST",
        url: "/dah-training-api/home/topTenStatistics",
        data: params,
      })
        .then((res) => {
          console.log("获取大屏中央排行榜成功", res);
          if (res.data.code === 200) {
            this.teamRankingList = res.data.data.teamTop;
            this.courseRankingList = res.data.data.coursewareTop;
          }
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 跳转其他页面
    checkPage(path) {
      if (path === "/visualization") {
        let formdata = new FormData();
        formdata.append("actualEndTime", "");
        formdata.append("limit", "");
        formdata.append("name", "");
        formdata.append("offset", 1);
        formdata.append("status", 1);
        formdata.append("teamName", "");
        this.axios({
          url: "/dah-training-api/trainingRecord/selectTrainingRecord",
          method: "POST",
          data: formdata,
        })
          .then((res) => {
            let item = res.data.data.list[0];
            sessionStorage.setItem("visibid", item.id);
            this.$router.push(path);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push(path);
      }
    },
    // 燃烧场景统计
    getBurning() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/home/burningSceneStatistics",
      })
        .then((res) => {
          console.log("获取燃烧场景统计成功", res);
          this.burningList = res.data.data.coursewareArray;
          this.burningSum = res.data.data.sum;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 打开实训课件详情弹窗
    openCourseDetail(item) {
      this.popupShow1 = true;
      // console.log(item);
      this.getCourseDetail(item.coursewareId);
    },
    // 课件详情
    getCourseDetail(id) {
      this.axios({
        method: "POST",
        url: "/dah-training-api/courseware/getCourseware",
        data: QS.stringify({
          id: id,
        }),
      })
        .then((res) => {
          // console.log('获取课件详情成功',res)
          this.coursewareDetail = res.data.data;
          this.scriptInfo = res.data.data.trainingScript;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 获取系统链接
    getLink() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/home/selectLinks",
      })
        .then((res) => {
          // console.log("获取系统链接成功", res);
          if (res.data.code === 200) {
            this.linkList = res.data.data;
          }
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 前往系统链接
    toLink(path) {
      window.open(path);
    },
    // 应急队伍详情
    goInfo(row) {
      this.$router.push({
        path: "emergencyTeamInfo",
        query: { id: row.teamId },
      });
      // location.replace(`/emergencyTeamInfo?id=${row.teamId}`);
    },
    // 打开基地装备弹窗
    openEquipmentDetail() {
      this.popupShow = true;
      this.getEquipment();
    },
    // 基地装备
    getEquipment() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/baseEquipment/selectBaseEquipment",
        data: QS.stringify({
          offset: this.equipOffset,
          limit: this.equipLimit,
          dataType: 1,
        }),
      })
        .then((res) => {
          console.log("获取基地装备成功", res);
          this.equipList = res.data.data.list;
          this.equipTotal = res.data.data.total;
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 分页查询基地装备
    pageCurrentChange(val) {
      this.equipOffset = val;
      this.getEquipment();
    },
    // 打开基地物资弹窗
    openSuppliesDetail() {
      this.popupShow3 = true;
      this.getSupplies();
    },
    // 分页查询基地物资
    pageCurrentChange2(val) {
      this.suppliesOffset = val;
      this.getSupplies();
    },
    // 基地物资
    getSupplies() {
      this.axios({
        method: "POST",
        url: "/dah-training-api/supplies/selectByPage",
        data: QS.stringify({
          dataType: 1,
          limit: this.suppliesLimit,
          offset: this.suppliesOffset,
        }),
      })
        .then((res) => {
          // console.log('获取成功',res)
          if (res.data.code === 200) {
            this.suppliesList = res.data.data.list;
            this.suppliesTotal = res.data.data.total;
          }
        })
        .catch((err) => {
          console.log("获取失败", err);
        });
    },
    // 退出登录
    logout() {
      this.$confirm("确认注销？", "确认注销", {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            this.$router.push("/login");
            localStorage.removeItem("fire-token");
            localStorage.removeItem("fire-user");
            done();
          } else {
            done();
          }
        },
      });
    },
  },
  //生命周期-创建完成（可以访问当前this实例）
  created() {
    this.getLeft();
    this.getBurning();
    this.getRanking();
    this.getLink();
    this.getVideo();
  },
  //生命周期-挂载完成（可以访问DOM元素）
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);
    setTimeout(() => {
      this.drawLine();
    }, 1000);
  },
  beforeCreate() {}, //生命周期-创建之前
  beforeMount() {}, //生命周期-挂载之前
  beforeUpdate() {}, //生命周期-更新之前
  updated() {}, //生命周期-更新之后
  beforeDestroy() {}, //生命周期-销毁之前
  destroyed() {}, //生命周期-销毁完成
  activated() {}, //如果页面有keep-alive缓存功能这个函数会触发

  filters: {
    //文字数超出时，超出部分使用...
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "...";
      }
      return value;
    },
    ellipsis2(value) {
      if (!value) return "";
      if (value.length > 5) {
        return value.slice(0, 5) + "...";
      }
      return value;
    },
    ellipsis50(value) {
      if (!value) return "";
      if (value.length > 50) {
        return value.slice(0, 50) + "...";
      }
      return value;
    },
  },
};
</script>