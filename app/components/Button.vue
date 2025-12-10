<script setup lang="ts">
defineProps<{
  text: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    :disabled="disabled"
    @click="emit('click')"
    class="bg-blue-06 hover:bg-blue-05 h11 w-full max-w-[280px] cursor-pointer rounded-lg py-[11px] font-bold"
  >
    {{ text }}
  </button>
</template>
