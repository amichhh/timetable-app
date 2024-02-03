<script setup lang="ts">
import { Time } from "@/types"
import { ref, watchEffect, computed } from "vue"

const props = defineProps<{ label: string; time: Time }>()
const emit = defineEmits(["time"])

const hour = ref<string>(props.time.hour)
const minute = ref<string>(props.time.minute)

const hourOptions = computed(() => {
  let hours: string[] = []
  for (let i = 0; i < 24; i++) {
    i < 10 ? hours.push(`0${String(i)}`) : hours.push(String(i))
  }
  return hours
})
const minuteOptions = computed(() => {
  let minutes: string[] = []
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) i < 10 ? minutes.push(`0${String(i)}`) : minutes.push(String(i))
  }
  return minutes
})

watchEffect(() => {
  emit("time", { hour: hour, minute: minute })
  hour.value = props.time.hour
  minute.value = props.time.minute
})
</script>

<template>
  <v-card variant="flat">
    <v-row dense>
      <v-col class="text-caption">
        {{ props.label }}
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-select
          v-model="hour"
          :items="hourOptions"
          variant="outlined"
          hide-details
          density="compact"
        ></v-select>
      </v-col>
      <div class="mt-5">:</div>
      <v-col>
        <v-select
          v-model="minute"
          :items="minuteOptions"
          variant="outlined"
          hide-details
          density="compact"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.v-card {
  background-color: rgba(255, 255, 255, 0);
}
</style>
