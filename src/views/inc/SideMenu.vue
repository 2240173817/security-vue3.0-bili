<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="0">
      <template #title>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-s-operation"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <router-link to="/sys/user">
          <el-menu-item index="1-1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/sys/role">
        <el-menu-item index="1-2">
          <template #title>
            <i class="el-icon-rank"></i>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        </router-link>
        <router-link to="/sys/menus">
        <el-menu-item index="1-3">
          <template #title>
            <i class="el-icon-menu"></i>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-s-tools"></i>
        <span>系统工具</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-2">
          <template #title>
            <i class="el-icon-s-order"></i>
            <span>数字字典</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="less">
</style>