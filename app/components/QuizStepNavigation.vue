<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
}>()

defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'jumpTo', index: number): void
}>()
</script>

<template>
  <div class="flex items-center py-2">
    <button @click="$emit('prev')" :disabled="currentStep === 0">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.375 15L18.75 5.625L20.0625 6.9375L12 15L20.0625 23.0625L18.75 24.375L9.375 15Z"
          :fill="`${currentStep === 0 ? '#B3B3B3' : '#161616'}`"
        />
      </svg>
    </button>

    <div class="relative flex gap-2 md:mx-14 md:gap-10">
      <div class="bg-blue-05 absolute top-1/2 right-1 left-1 h-0.5 -translate-y-1/2 px-1"></div>

      <div
        v-for="n in totalSteps"
        :key="n"
        @click="$emit('jumpTo', n - 1)"
        :class="`relative z-10 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-gray-700 ${currentStep === n - 1 ? 'bg-black' : 'bg-[#B3B3B3]'} `"
      >
        <p class="text-[9px] font-bold">{{ n }}</p>
      </div>
    </div>

    <button @click="$emit('next')" :disabled="currentStep === totalSteps - 1">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.625 15L11.25 24.375L9.9375 23.0625L18 15L9.9375 6.9375L11.25 5.625L20.625 15Z"
          :fill="`${currentStep === totalSteps - 1 ? '#B3B3B3' : '#161616'}`"
        />
      </svg>
    </button>
  </div>
</template>
