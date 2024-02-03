import { createRouter, createWebHistory } from 'vue-router'
import Start from '@/views/Start.vue'
import BandImport from '@/views/BandImport.vue'
import BandConfirm from '@/views/BandConfirm.vue'
import Condition from '@/views/Condition.vue'
import Event from '@/views/Event.vue'
import Setting from '@/views/SettingConfirm.vue'
import Result from '@/views/Result.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/start' },
    { path: '/start', name: 'Start', component: Start },
    { path: '/band/import', name: 'BandImport', component: BandImport },
    { path: '/band/confirm', name: 'BandConfirm', component: BandConfirm },
    { path: '/condition', name: 'Condition', component: Condition },
    { path: '/event', name: 'Event', component: Event },
    { path: '/setting/confirm', name: 'Setting', component: Setting },
    { path: '/result', name: 'Result', component: Result }
  ]
})

export default router
