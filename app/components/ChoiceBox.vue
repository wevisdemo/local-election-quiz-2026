<script setup lang="ts">
import { computed } from 'vue'
import type { Choice } from './Quiz.vue'

const props = defineProps<{
  id: Choice
  index: number
  text: string
  correctAnswer: Choice
  selectedAnswer: Choice | null
}>()

const emit = defineEmits<{
  (e: 'select', value: Choice): void
}>()

const label = computed(() => {
  const labels = ['ก', 'ข', 'ค', 'ง']
  return labels[props.index] || '?'
})

const boxClasses = computed(() => {
  if (!props.selectedAnswer) {
    return 'border-grey bg-cream cursor-pointer hover:bg-yellow-02 group-hover:bg-yellow-02'
  }
  if (props.id === props.correctAnswer) {
    return 'bg-blue-06 border-blue-05 text-black'
  }
  if (props.id === props.selectedAnswer && props.selectedAnswer !== props.correctAnswer) {
    return 'bg-red-02 border-red-01 text-black'
  }
  return 'bg-[#B3B3B3] border-[#A5A5A5] text-[#1E1E1E] opacity-50'
})

const iconBoxClasses = computed(() => {
  if (!props.selectedAnswer) return 'border-grey bg-white group-hover:bg-yellow-02'
  if (props.id === props.correctAnswer) return 'bg-blue-06 border-blue-05'
  if (props.id === props.selectedAnswer) return 'bg-red-02 border-red-01'
  return 'bg-[#B3B3B3] border-[#A5A5A5] opacity-50'
})

const handleClick = () => {
  if (!props.selectedAnswer) {
    emit('select', props.id)
  }
}
</script>

<template>
  <div
    @click="handleClick"
    class="group flex w-full max-w-[500px] gap-0.5 transition-all duration-200"
  >
    <div
      class="flex min-h-11 flex-1 items-center gap-1 border px-3 py-2 transition-colors duration-200"
      :class="boxClasses"
    >
      <div
        class="flex h-5 w-5 flex-none items-center justify-center rounded-full text-[16px] font-bold md:h-8 md:w-8 md:text-[20px]"
        :class="
          props.selectedAnswer &&
          props.id !== props.correctAnswer &&
          props.id !== props.selectedAnswer
            ? 'bg-gray-400 text-gray-200'
            : 'bg-yellow-01 font-sriracha'
        "
      >
        {{ label }}
      </div>
      <p class="b6 font-medium">
        {{ text }}
      </p>
    </div>

    <div
      class="flex w-10 flex-none items-center justify-center border transition-colors duration-200 md:w-12"
      :class="iconBoxClasses"
    >
      <img
        v-if="!selectedAnswer"
        class="opacity-0 transition-opacity duration-75 group-hover:opacity-100"
        src="/assets/images/x.svg"
        alt="hover-icon"
      />

      <template v-else>
        <img v-if="id === correctAnswer" src="/assets/images/correct.svg" />
        <img v-else-if="id === selectedAnswer" src="/assets/images/wrong.svg" />
      </template>
    </div>
  </div>
</template>
