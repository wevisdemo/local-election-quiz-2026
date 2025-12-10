<script setup lang="ts">
import ChoiceBox from './ChoiceBox.vue'
import type { Choice } from './Quiz.vue'

interface Question {
  id: number
  text: string
  choices: { id: Choice; text: string }[]
  answer: Choice
}

const props = defineProps<{
  index: number
  question: Question
  userAnswer: Choice | null
  explanation?: string
}>()

const isExplanationOpen = ref(false)

const correctChoiceObj = computed(() => {
  const idx = props.question.choices.findIndex((c) => c.id === props.question.answer)
  const choice = props.question.choices[idx]
  if (!choice) return null
  return { ...choice, originalIndex: idx }
})

const wrongChoiceObj = computed(() => {
  if (!props.userAnswer || props.userAnswer === props.question.answer) return null
  const idx = props.question.choices.findIndex((c) => c.id === props.userAnswer)
  const choice = props.question.choices[idx]
  if (!choice) return null
  return { ...choice, originalIndex: idx }
})
</script>

<template>
  <div class="">
    <div class="flex flex-col items-center justify-center gap-2">
      <p class="h9 font-bold">{{ index + 1 }}. {{ question.text }}</p>
      <div class="pointer-events-none flex w-full justify-center">
        <ChoiceBox
          v-if="correctChoiceObj"
          :id="correctChoiceObj.id"
          :index="correctChoiceObj.originalIndex"
          :text="correctChoiceObj.text"
          :correctAnswer="question.answer"
          :selectedAnswer="userAnswer"
        />
      </div>
      <div v-if="wrongChoiceObj" class="pointer-events-none flex w-full justify-center">
        <ChoiceBox
          :id="wrongChoiceObj.id"
          :index="wrongChoiceObj.originalIndex"
          :text="wrongChoiceObj.text"
          :correctAnswer="question.answer"
          :selectedAnswer="userAnswer"
        />
      </div>

      <div class="w-full max-w-[600px] border-b pb-2">
        <button
          @click="isExplanationOpen = !isExplanationOpen"
          :class="`hover:bg-blue-06 flex w-full cursor-pointer items-center justify-between ${isExplanationOpen ? 'rounded-t-lg' : 'rounded-lg'} bg-white px-4 py-2`"
        >
          <span class="h9 font-bold">คำอธิบาย</span>
          <img
            :class="`transform transition-transform duration-200 ${isExplanationOpen && 'rotate-180'}`"
            src="/assets/images/arrow-down.svg"
            alt=""
          />
        </button>

        <div
          class="overflow-hidden transition-all duration-300"
          :class="isExplanationOpen ? 'max-h-[1000vh] opacity-100' : 'max-h-0 opacity-0'"
        >
          <div class="rounded-b-lg bg-white p-4 text-sm text-gray-700">
            {{ explanation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
