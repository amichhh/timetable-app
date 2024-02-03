import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { type Condition, type Band, EventSetting, type MessageStatus } from "@/types/index"

export const useStore = defineStore("store", () => {
  const loading = ref(false)
  const message = ref("")
  const messageStatus = ref<MessageStatus>()
  const snackbar = ref(false)
  const conditionIndex = ref(1)
  const conditions = ref<Condition[]>([])
  const event = ref<EventSetting>(new EventSetting())
  const bands = ref<Band[]>([])
  const members = ref<string[]>([])
  const sortedBands = ref<Band[]>([])
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return {
    loading,
    message,
    messageStatus,
    snackbar,
    conditionIndex,
    conditions,
    event,
    bands,
    members,
    sortedBands,
    count,
    doubleCount,
    increment
  }
})
