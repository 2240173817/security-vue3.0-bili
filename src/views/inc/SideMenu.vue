<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
  <router-link to="/">
    <el-menu-item index="0">
      <template #title>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
  </router-link>  

    <el-sub-menu :index="menu.name" v-for="menu in menuList" :key="menu.name">
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>

      <router-link
        :to="item.path"
        v-for="item in menu.children"
        :key="item.name"
      >
        <el-menu-item :index="item.name">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="js">

 export default {
   name: 'SideMenu',
    data() {
      return {

      }
    },
    computed:{
      menuList:{
        get(){
          return this.$store.state.menus.menuList
        }
      }
    }
 }
</script>

<style lang="less">
</style>