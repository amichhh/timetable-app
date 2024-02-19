<script setup lang="ts">
import { useStore } from "@/stores"
import { ref } from "vue"
import TimeSelector from "@/views/parts/TimeSelector.vue"
import { Time, Condition } from "@/types"
import { mdiCloseCircleOutline, mdiChevronLeft, mdiChevronRight } from "@mdi/js"

const store = useStore()

const target = ref("")
const memberOptions = store.members

const startTime = ref<Time>()
const endTime = ref<Time>()

const addCondition = () => {
  if (startTime.value && endTime.value) {
    const startTimeValue = new Time(startTime.value.hour, startTime.value.minute)
    const endTimeValue = new Time(endTime.value.hour, endTime.value.minute)
    if (!target.value) {
      store.message = "対象メンバーを選択してください。"
      store.messageStatus = "WARN"
      store.snackbar = true
    } else if (startTimeValue.isAfter(endTimeValue)) {
      store.message = "出演可能時間（開始）は出演可能時間（終了）より前に設定してください。"
      store.messageStatus = "WARN"
      store.snackbar = true
    } else {
      const condition: Condition = {
        id: store.conditionIndex,
        type: "TIME",
        target: target.value,
        start: new Time(startTime.value.hour, startTime.value.minute),
        end: new Time(endTime.value.hour, endTime.value.minute)
      }
      store.conditions.push(condition)
      store.conditionIndex += 1
      target.value = ""
    }
  }
}

const deleteCondition = (id: number) => {
  store.conditions = store.conditions.filter((v) => v.id !== id)
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert color="#053f5e" text="4. メンバーの時間指定を設定します。"></v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card variant="outlined" class="ma-1">
          <v-card-text>
            <v-row dense>
              <v-col cols="2">
                <v-chip color="#053f5e">時間指定</v-chip>
              </v-col>
              <v-col cols="3">
                <v-row dense>
                  <v-col class="text-caption">対象メンバー</v-col>
                </v-row>
                <v-row dense>
                  <v-col>
                    <v-select
                      v-model="target"
                      :items="memberOptions"
                      variant="outlined"
                      density="compact"
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <TimeSelector
                  :label="'出演可能時間（開始）'"
                  :time="store.event.startTime"
                  @time="(time: Time) => (startTime = time)"
                />
              </v-col>
              <div class="mt-10">～</div>
              <v-col cols="2">
                <TimeSelector
                  :label="'出演可能時間（終了）'"
                  :time="store.event.startTime"
                  @time="(time: Time) => (endTime = time)"
                />
              </v-col>
              <v-col class="mt-7 text-right">
                <v-btn variant="flat" color="#053f5e" @click="addCondition">保存</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          v-for="item in store.conditions"
          :key="item.target"
          variant="flat"
          color="#053f5e"
          density="compact"
          class="mx-3 px-8 my-2"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="2">
                <v-chip v-if="item.type === 'TIME'">時間指定</v-chip>
              </v-col>
              <v-col class="mt-2">
                {{ item.target }}
              </v-col>
              <v-col cols="3" class="mt-2">
                {{ item.start.hour }}:{{ item.start.minute }} ～ {{ item.end.hour }}:{{
                  item.end.minute
                }}
              </v-col>
              <v-col cols="1" class="text-right">
                <v-btn
                  variant="flat"
                  size="small"
                  color="#053f5e"
                  :icon="mdiCloseCircleOutline"
                  @click="deleteCondition(item.id)"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-left">
        <v-btn
          size="large"
          variant="outlined"
          color="#053f5e"
          rounded
          :prepend-icon="mdiChevronLeft"
          to="/event"
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
          to="/setting/confirm"
        >
          次へ進む
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
