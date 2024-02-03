<script setup lang="ts">
import { useStore } from "@/stores"

const store = useStore()

const downloadCSV = () => {
  const title = store.event?.title + "," + store.event?.date.toLocaleDateString() + "\n"
  const header =
    "時間, バンド名, 種別, メンバー1, メンバー2, メンバー3, メンバー4, メンバー5, メンバー6, 時間枠\n"
  const rows = store.sortedBands
    .map(
      (v) =>
        v.appearance.hour +
        ":" +
        v.appearance.minute +
        "," +
        v.name +
        "," +
        v.type +
        "," +
        v.member[0] +
        "," +
        v.member[1] +
        "," +
        v.member[2] +
        "," +
        v.member[3] +
        "," +
        v.member[4] +
        "," +
        v.member[5] +
        "," +
        v.slot
    )
    .join("\n")
  const content = title + header + rows
  const bom = new Uint8Array([0xef, 0xbb, 0xbf])
  const blob = new Blob([bom, content], { type: "text/csv" })
  const link = document.createElement("a")
  link.href = window.URL.createObjectURL(blob)
  link.download =
    store.event.date.toISOString().slice(0, 10).split("-").join("") +
    store.event.title +
    "タイムテーブル"
  link.click()
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert color="#053f5e" text="6. 確認してください。"></v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table density="compact">
          <thead>
            <tr>
              <th>出演時間</th>
              <th>バンド名</th>
              <th class="text-center">種別</th>
              <th>メンバー１</th>
              <th>メンバー２</th>
              <th>メンバー３</th>
              <th>メンバー４</th>
              <th>メンバー５</th>
              <th>メンバー６</th>
              <th class="text-center">時間枠</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.sortedBands" :key="item.name">
              <td>{{ item.appearance.hour }}:{{ item.appearance.minute }}</td>
              <td>{{ item.name }}</td>
              <td class="text-center">
                <v-chip color="#053f5e">
                  {{ item.type }}
                </v-chip>
              </td>
              <td>{{ item.member[0] }}</td>
              <td>{{ item.member[1] }}</td>
              <td>{{ item.member[2] }}</td>
              <td>{{ item.member[3] }}</td>
              <td>{{ item.member[4] }}</td>
              <td>{{ item.member[5] }}</td>
              <td class="text-center">{{ item.slot }}分</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn size="large" variant="flat" color="#053f5e" rounded @click="downloadCSV"
          >ダウンロード</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-table {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
