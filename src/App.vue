<script setup lang="ts">
import { RouterView } from "vue-router"
import Notification from "@/views/parts/Notification.vue"
</script>

<template>
  <v-app>
    <v-app-bar color="#022c43" elevation="0" :height="80">
      <img src="./assets/logo.png" class="logo" />
      <v-app-bar-title>タイムテーブル作成</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView class="content" />
    </v-main>
    <Notification />
  </v-app>
</template>

<style scoped>
.logo {
  width: 180px;
  margin-left: 25px;
}

.v-app-bar-title {
  font-family: "M PLUS 1p", sans-serif;
  font-weight: 900;
}

.v-main {
  background-color: #a9beca;
  background-image: linear-gradient(90deg, #a9beca 0%, #faf1bb 100%);
  font-family: "M PLUS 1p", sans-serif;
  font-weight: 500;
}

.content {
  width: 1200px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
}
</style>
