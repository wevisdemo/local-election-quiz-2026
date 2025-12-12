<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const imageFilename = route.params.id

const baseUrl = config.public.baseUrl.replace(/\/$/, '')
const imageUrl = `${baseUrl}/og/${imageFilename}.png`

useSeoMeta({
  ogImage: imageUrl,
  twitterImage: imageUrl,
})

onMounted(() => {
  window.location.href = baseUrl
})
</script>

<template>
  <div></div>
</template>
