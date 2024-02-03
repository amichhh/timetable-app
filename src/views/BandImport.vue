<script setup lang="ts">
import { ref } from "vue"
import Papa from "papaparse"
import { useStore } from "@/stores/index"
import { type Band } from "@/types"
import router from "@/router"
import { mdiChevronRight, mdiDownload } from "@mdi/js"

const store = useStore()

const files = ref<File[]>()

const parseFile = () => {
  // ファイルが選択されているか
  if (files.value === undefined) {
    store.message = "ファイルを選択してください。"
    store.messageStatus = "WARN"
    store.snackbar = true
  }
  // 拡張子バリデーションチェック

  // csvファイル解析
  if (files.value) {
    Papa.parse(files.value[0], {
      complete: (result) => {
        let index: number = 1
        result.data.forEach((v) => {
          if (Array.isArray(v) && v !== null) {
            const object = {
              id: index,
              name: typeof v[0] === "string" ? v[0] : null,
              type: typeof v[1] === "string" ? v[1] : null,
              member: [
                typeof v[2] === "string" ? v[2] : null,
                typeof v[3] === "string" ? v[3] : null,
                typeof v[4] === "string" ? v[4] : null,
                typeof v[5] === "string" ? v[5] : null,
                typeof v[6] === "string" ? v[6] : null,
                typeof v[7] === "string" ? v[7] : null
              ],
              slot: typeof Number(v[8]) === "number" ? Number(v[8]) : null
            }
            if (isBand(object)) {
              store.bands.push(object)
              object.member.forEach((v) => {
                if (v !== null && v !== " " && !store.members.includes(v)) store.members.push(v)
              })
              index++
            }
          }
        })
        store.message = "CSVファイルの読み込みに成功しました。"
        store.messageStatus = "SUCCESS"
        store.snackbar = true
        router.push("/band/confirm")
      },
      error: () => {
        store.message = "CSVファイルの読み込みに失敗しました。"
        store.messageStatus = "ERROR"
        store.snackbar = true
      }
    })
  }
}

// Band型チェック
const isBand = (value: unknown): value is Band => {
  if (typeof value !== "object" || value === null) {
    return false
  }
  const band = value as Record<keyof Band, unknown>
  if (typeof band.name !== "string") {
    return false
  }
  if (typeof band.type !== "string") {
    return false
  }
  if (!Array.isArray(band.member)) {
    return false
  }
  if (Number.isNaN(band.slot)) {
    return false
  }
  return true
}

const downloadTemplate = () => {
  const header =
    "バンド名, 種別, メンバー1, メンバー2, メンバー3, メンバー4, メンバー5, メンバー6, 時間枠\n"
  const content = header
  const bom = new Uint8Array([0xef, 0xbb, 0xbf])
  const blob = new Blob([bom, content], { type: "text/csv" })
  const link = document.createElement("a")
  link.href = window.URL.createObjectURL(blob)
  link.download = "バンドアップロード用テンプレート"
  link.click()
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert
          color="#053f5e"
          text="1. 参加予定バンドのCSVファイルをアップロードします。"
        ></v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-row dense>
          <v-col class="text-caption">参加予定バンドCSVファイル</v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-file-input
              v-model="files"
              variant="outlined"
              accept="text/csv"
              persistent-placeholder
              density="compact"
              hide-details
              color="#115173"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="text-right">
        <v-btn
          variant="outlined"
          color="#022c43"
          :prepend-icon="mdiDownload"
          @click="downloadTemplate"
        >
          テンプレートをダウンロード
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-btn
          size="large"
          variant="flat"
          color="#053f5e"
          rounded
          :append-icon="mdiChevronRight"
          @click="parseFile"
        >
          次へ進む
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.step {
  margin: 30px;
  background-color: #053f5e;
}
</style>
