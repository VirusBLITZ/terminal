// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      URL: {
        STEAM: "https://steamcommunity.com/id/amustermann",
        SURPRISE: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    }
  }
})