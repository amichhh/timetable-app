<script setup lang="ts">
import router from "@/router"
import { useStore } from "@/stores"
import { Time, type Band } from "@/types"
import { ref } from "vue"
import { mdiChevronLeft } from "@mdi/js"

const store = useStore()

const upperLimit = 50000

const sortBand = () => {
  const loopCount = ref(0)
  const isContinue = ref(true)
  const success = ref(true)
  // ソート結果
  const result = ref<Band[]>([])
  while (isContinue.value) {
    loopCount.value++
    result.value = []
    // ループ試行回数を制限（無限ループを防ぐ）
    if (loopCount.value > upperLimit) {
      store.message = "タイムテーブル作成に失敗しました。もう一度やり直してください。"
      store.messageStatus = "WARN"
      store.snackbar = true
      success.value = false
      break
    }
    const errorCount = ref(0)
    const currentTime: Time = new Time(store.event.startTime.hour, store.event.startTime.minute)
    const breakCount = ref(0)
    shuffle(store.bands).reduce((a: Band[], b: Band, index: number, array: Band[]): any => {
      // メンバーの出演順が連続していないか判定
      if (index > 0 && b.member.some((v) => array[index - 1].member.includes(v))) {
        errorCount.value++
      }
      // 出演時間をセット
      b.appearance = new Time(currentTime.hour, currentTime.minute)
      // ソート結果に該当バンドを追加
      result.value.push(b)
      // 時間を進める
      currentTime.advance(b.slot)
      // マイク巻き
      if ((index + 1) % store.event.windingCount === 0) {
        const winding: Band = {
          name: "マイク巻き",
          type: "NONE",
          member: [],
          slot: 5,
          appearance: new Time(currentTime.hour, currentTime.minute)
        }
        result.value.push(winding)
        // 時間を進める
        currentTime.advance(5)
      }
      // 休憩開始時間を過ぎた場合、休憩時間分進める
      if (currentTime.isAfter(store.event.breakStartTime) && breakCount.value === 0) {
        const breakTime: Band = {
          name: "休憩",
          type: "NONE",
          member: [],
          slot: store.event.breakTime,
          appearance: new Time(currentTime.hour, currentTime.minute)
        }
        result.value.push(breakTime)
        currentTime.advance(store.event.breakTime)
        breakCount.value += 1
      }
    }, [])
    // 並べ替え条件を満たしているか判定
    isContinue.value = errorCount.value === 0 ? checkCondition(result.value) : true
  }
  if (success.value) {
    store.sortedBands = result.value
    store.message = "ソートに成功しました。"
    store.messageStatus = "SUCCESS"
    store.snackbar = true
    router.push("/result")
  }
}

// ランダムに並び替え
const shuffle = (bands: Band[]): Band[] => {
  return bands.slice().sort(() => Math.random() - Math.random())
}

// 並べ替え条件を満たすか判定する（満たさない場合はtrueを返す）
const checkCondition = (bands: Band[]): boolean => {
  const errorCount = ref(0)
  store.conditions.forEach((condition) => {
    switch (condition.type) {
      case "TIME":
        bands
          .filter((band) => band.member.includes(condition.target))
          .forEach((band) => {
            if (
              band.appearance.isBefore(condition.start) ||
              band.appearance.isAfter(condition.end)
            ) {
              errorCount.value++
            }
          })
        break
    }
  })
  return errorCount.value > 0
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert color="#053f5e" text="5. 並べ替え条件とイベントの詳細設定を確認します。"></v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card variant="flat" color="#053f5e">
          <v-card-title class="ma-2">
            <v-row dense>
              <v-col>並べ替え条件設定</v-col>
            </v-row>
          </v-card-title>
          <v-card-text v-if="store.conditions.length === 0">
            並べ替え条件はありません。
          </v-card-text>
          <v-card-text v-else class="ma-2">
            <v-row v-for="item in store.conditions" :key="item.target" class="mt-1">
              <v-col cols="3">
                <v-chip v-if="item.type === 'TIME'">時間指定</v-chip>
              </v-col>
              <v-col cols="4">{{ item.target }}</v-col>
              <v-col>
                {{ item.start.hour }}:{{ item.start.minute }}
                ～
                {{ item.end.hour }}:{{ item.end.minute }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card variant="flat" color="#053f5e">
          <v-card-title class="ma-2">
            <v-row dense>
              <v-col>イベント設定</v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="ma-2">
            <v-row dense>
              <v-col>イベント名</v-col>
              <v-col>{{ store.event?.title }}</v-col>
            </v-row>
            <v-row dense>
              <v-col>開催日</v-col>
              <v-col
                >{{
                  store.event?.date.toLocaleDateString() +
                  " (" +
                  ["日", "月", "火", "水", "木", "金", "土"][store.event?.date.getDay()] +
                  ")"
                }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>開始時間</v-col>
              <v-col>{{ store.event?.startTime.hour }}:{{ store.event?.startTime.minute }}</v-col>
            </v-row>
            <v-row dense>
              <v-col>休憩開始時間</v-col>
              <v-col>
                {{ store.event?.breakStartTime.hour }}:{{ store.event?.breakStartTime.minute }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>休憩時間</v-col>
              <v-col>{{ store.event?.breakTime }} 分</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn size="large" variant="flat" color="#053f5e" rounded @click="sortBand">
          タイムテーブル作成
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="text-caption text-center">※作成には時間がかかる場合があります。</v-col>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <v-btn
          size="large"
          variant="outlined"
          color="#053f5e"
          rounded
          :prepend-icon="mdiChevronLeft"
          to="/condition"
        >
          前に戻る
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
