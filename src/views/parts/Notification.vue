<script setup lang="ts">
import { useStore } from "@/stores"

import { mdiAlertCircleOutline } from "@mdi/js"
import { mdiAlertOutline } from "@mdi/js"
import { mdiCheckboxMarkedCircleOutline } from "@mdi/js"

const store = useStore()
const color = () => {
  if (store.messageStatus === "ERROR") return "deep-orange"
  if (store.messageStatus === "WARN") return "amber"
  if (store.messageStatus === "SUCCESS") return "success"
}
</script>

<template>
  <v-snackbar v-model="store.snackbar" :color="color()" location="top" :timeout="2500">
    <v-icon v-if="store.messageStatus === 'ERROR'" :icon="mdiAlertCircleOutline"></v-icon>
    <v-icon v-if="store.messageStatus === 'WARN'" :icon="mdiAlertOutline"></v-icon>
    <v-icon
      v-if="store.messageStatus === 'SUCCESS'"
      :icon="mdiCheckboxMarkedCircleOutline"
    ></v-icon>
    {{ store.message }}
  </v-snackbar>
</template>

<style scoped>
.v-snackbar {
  font-family: "M PLUS 1p", sans-serif;
  font-weight: 500;
}
</style>
