<script setup lang="ts">
import { ref } from "vue"
import { useStore } from "@/stores"
import TimeSelector from "@/views/parts/TimeSelector.vue"
import router from "@/router"
import type { EventSetting } from "@/types"
import dayjs from "dayjs"
import { Time } from "@/types"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"

const store = useStore()

const open = ref(false)

const title = ref(store.event ? store.event.title : "")
const date = ref<any>(store.event ? store.event.date : dayjs().toDate())
const startTime = ref<Time>()
const breakStartTime = ref<Time>()
const breakTime = ref(60)
const windingCount = ref(5)

const setEvent = () => {
  if (startTime.value && breakStartTime.value) {
    const startTimeValue = new Time(startTime.value.hour, startTime.value.minute)
    const breakStartTimeValue = new Time(breakStartTime.value.hour, breakStartTime.value.minute)
    if (!title.value) {
      store.message = "イベント名を入力してください。"
      store.messageStatus = "WARN"
      store.snackbar = true
    } else if (startTimeValue.isAfter(breakStartTimeValue)) {
      store.message = "開始時刻は休憩開始時刻より前に設定してください。"
      store.messageStatus = "WARN"
      store.snackbar = true
    } else {
      const event: EventSetting = {
        title: title.value,
        date: date.value,
        startTime: startTime.value,
        breakStartTime: breakStartTime.value,
        breakTime: breakTime.value,
        windingCount: windingCount.value
      }
      store.event = event
      router.push("/condition")
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert color="#053f5e" text="3. イベントの詳細を設定します。"></v-alert>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="8">
        <v-row dense>
          <v-col class="text-caption">イベント名</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="11">
            <v-text-field
              v-model="title"
              variant="outlined"
              persistent-placeholder
              density="compact"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row dense>
          <v-col class="text-caption">開催日</v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-btn variant="flat" color="#053f5e" class="mb-2" @click="open = true">
              開催日を選択する
              <v-dialog v-model="open" width="28vw">
                <v-card>
                  <v-card-text>
                    <v-locale-provider locale="ja">
                      <v-date-picker
                        v-model="date"
                        label="開催日"
                        color="#053f5e"
                        locale="ja"
                        header=""
                        :landscape="true"
                        hide-actions
                        variant="flat"
                        elevation="0"
                      ></v-date-picker>
                    </v-locale-provider>
                  </v-card-text>
                  <v-card-actions class="mb-2 mr-2">
                    <v-row dense>
                      <v-col class="text-right">
                        <v-btn variant="text" color="#053f5e" @click="open = false">OK</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-col>
          <v-col class="mt-2"
            >{{
              date.toLocaleDateString() +
              " (" +
              ["日", "月", "火", "水", "木", "金", "土"][date.getDay()] +
              ")"
            }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="3">
        <TimeSelector
          :label="'イベント開始時刻'"
          :time="store.event.startTime"
          @time="(time: Time) => (startTime = time)"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="3">
        <TimeSelector
          :label="'休憩開始時刻'"
          :time="store.event.breakStartTime"
          @time="(time: Time) => (breakStartTime = time)"
        />
      </v-col>
      <v-col cols="1"></v-col>
      <v-col>
        <v-row dense>
          <v-col class="text-caption">休憩時間</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="2">
            <v-text-field
              v-model="breakTime"
              variant="outlined"
              persistent-placeholder
              hide-details
              density="compact"
              type="number"
              min="0"
              max="60"
            ></v-text-field>
          </v-col>
          <v-col class="mt-2">分（0分～60分の間で入力してください）</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="text-caption">マイク巻き</v-col>
    </v-row>
    <v-row dense>
      <v-col cols="1">
        <v-text-field
          v-model="windingCount"
          variant="outlined"
          persistent-placeholder
          hide-details
          density="compact"
          type="number"
          min="1"
        ></v-text-field>
      </v-col>
      <v-col class="mt-2">バンドに１回</v-col>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <v-btn
          size="large"
          variant="outlined"
          color="#053f5e"
          rounded
          :prepend-icon="mdiChevronLeft"
          to="/band/confirm"
        >
          前に戻る
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn
          size="large"
          variant="flat"
          color="#053f5e"
          rounded
          :append-icon="mdiChevronRight"
          @click="setEvent"
        >
          次へ進む
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
