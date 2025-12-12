<script setup lang="ts">
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl.replace(/\/$/, '')
const title = ''
const description = ''

useHead({
  htmlAttrs: { lang: 'th' },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'th_TH',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="bg-cream">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
