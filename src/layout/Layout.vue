<template>
  <div class="layout df">
    <div class="navs fn df fdc">
      <router-link class="link df jcc aic mb10"
                   v-for="item in routes.filter(v=>v.path!=='/')"
                   :to="item.path"
                   :key="item.path">
        {{ item.path }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {routes} from "@/router";

console.log(routes)
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.navs {
  width: 100px;
  background: sandybrown;
  .link {
    height: 140px;
    background: cadetblue;
    color:white;
  }
}
.router-link-active{
  background: firebrick !important;
}
</style>
