import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
// import vuetify from "@vuetify/vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/timetable-app/",
  build: {
    outDir: "docs"
  },
  plugins: [
    vue(),
    vueJsx()
    // vuetify({
    //   autoImport: true
    // })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
