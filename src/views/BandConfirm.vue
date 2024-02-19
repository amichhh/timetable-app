<script setup lang="ts">
import { useStore } from "@/stores"
import router from "@/router"
import { ref } from "vue"
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js"

const store = useStore()
const open = ref(false)

const confirm = () => {
  open.value = true
}

const back = () => {
  open.value = false
  router.push("/band/import")
  store.bands = []
}
</script>

<template>
  <v-container fluid>
    <v-dialog v-model="open" width="35vw">
      <v-card color="#022c43">
        <v-card-text>現在登録されているバンドは削除されますがよろしいですか？</v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col class="text-right">
              <v-btn variant="flat" color="#022c43" @click="open = false">キャンセル</v-btn>
              <v-btn variant="flat" color="deep-orange" @click="back">OK</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col>
        <v-alert color="#053f5e" text="2. 参加予定バンドを確認します。"></v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table density="compact">
          <thead>
            <tr>
              <th>バンド名</th>
              <th class="text-center">種別</th>
              <th>メンバー1</th>
              <th>メンバー2</th>
              <th>メンバー3</th>
              <th>メンバー4</th>
              <th>メンバー5</th>
              <th>メンバー6</th>
              <th class="text-center">時間枠</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.bands" :key="item.name">
              <td>{{ item.name }}</td>
              <td class="text-center">
                <v-chip v-if="item.type === 'EXISTING'" color="#053f5e"> 既存 </v-chip>
                <v-chip v-if="item.type === 'PLANNING'" color="#a68c00"> 企画 </v-chip>
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
      <v-col class="text-left">
        <v-btn
          size="large"
          variant="outlined"
          color="#053f5e"
          rounded
          :prepend-icon="mdiChevronLeft"
          @click="confirm"
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
          to="/event"
        >
          次へ進む
        </v-btn>
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
