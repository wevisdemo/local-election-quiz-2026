<script setup lang="ts">
import { ref } from 'vue'
import ChoiceBox from './ChoiceBox.vue'

type Choice = 'A' | 'B' | 'C' | 'D'

const correctAnswer: Choice = 'D'
const selectedAnswer = ref<Choice | null>(null)

const handleSelectAnswer = (choice: Choice) => {
  if (!selectedAnswer.value) {
    selectedAnswer.value = choice
  }
}

const choices = [
  { id: 'A', label: 'ก', text: 'กำจัดขยะมูลฝอย' },
  { id: 'B', label: 'ข', text: 'ป้องกันและระงับโรคติดต่อ' },
  { id: 'C', label: 'ค', text: 'ส่งเสริมการศึกษา ศาสนา และวัฒนธรรม' },
  { id: 'D', label: 'ง', text: 'การรักษาความสงบเรียบร้อย' },
] as const
</script>

<template>
  <div class="flex min-h-screen flex-col items-center pt-10">
    <div class="py-4 md:h-[220px]">
      <img class="h-full w-full" src="/assets/images/mock-character.png" alt="" />
    </div>

    <div class="mb-5 flex items-center gap-2.5 px-5">
      <div
        class="font-sriracha bg-yellow-01 flex h-9 w-9 flex-none items-center justify-center rounded-full text-[18px] font-bold md:text-[22px]"
      >
        1
      </div>
      <p class="h7 font-bold">วันที่ 11 ม.ค. นี้ เราต้องลงคะแนนเลือกใคร?</p>
    </div>

    <div class="flex w-full flex-col items-center gap-0.5 px-6">
      <ChoiceBox
        v-for="choice in choices"
        :key="choice.id"
        :id="choice.id"
        :label="choice.label"
        :text="choice.text"
        :correct-answer="correctAnswer"
        :selected-answer="selectedAnswer"
        @select="handleSelectAnswer"
      />
    </div>

    <div v-if="selectedAnswer" class="animate-fade-in mb-10 flex flex-col items-center">
      <div class="m-3 max-w-[764px] rounded-lg bg-white p-4 md:m-6">
        <p class="h9 font-bold">คำอธิบาย</p>
        <p class="b5 font-medium">
          นายก อบต. เป็นฝ่ายบริหาร ส่วน สภา อบต. เป็นฝ่ายนิติบัญญัติ... (เนื้อหาคำอธิบาย...)
        </p>
      </div>
      <button class="rounded-lg bg-blue-500 px-6 py-2 text-white">ไปต่อ</button>
    </div>
  </div>
</template>
