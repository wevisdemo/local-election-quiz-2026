<script setup lang="ts">
const props = defineProps<{
  data: any
}>()
</script>

<template>
  <a :href="data.link" target="_blank" rel="noopener noreferrer">
    <div
      class="hover:bg-grey/10 w-40 max-w-full shrink-0 border border-black/10 bg-white md:w-[255px]"
    >
      <img
        :src="data.image"
        alt="Thumbnail"
        class="h-[90px] w-full max-w-full object-cover md:h-[145px]"
      />
      <div class="min-h-[100px] p-2 text-left md:min-h-[125px] md:p-3">
        <p class="h11 font-bold">{{ data.title }}</p>
      </div>
    </div>
  </a>
</template>
