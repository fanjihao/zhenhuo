<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a:visited,
a:link,
a:active,
a:hover {
  text-decoration: none;
}

.el-table th.gutter {
  display: table-cell !important;
}
.warningMsg {
  background-color: rgb(253, 246, 236) !important;
  border-color: rgb(253, 246, 236) !important;
  color: rgb(230, 162, 60) !important;
}

.el-tooltip__popper {
  max-width:70%
}
i {
  font-size: 14px !important;
}
</style>
