<script setup lang="ts">
const title = ''
const description = ''

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

useHead({
  htmlAttrs: { lang: 'th' },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl.replace(/\/$/, '')
const imageUrl = `${baseUrl}/og/main-og.png`

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'th_TH',
  ogImage: imageUrl,
  twitterImage: imageUrl,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <Navbar />
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="bg-cream fixed inset-0 z-50 flex flex-col items-center justify-center"
      />
    </Transition>

    <div class="bg-cream">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
