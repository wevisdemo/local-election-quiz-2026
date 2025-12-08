<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button class="bg-blue-06 h11 w-full max-w-[280px] cursor-pointer rounded-lg py-[11px] font-bold">
    {{ text }}
  </button>
</template>
