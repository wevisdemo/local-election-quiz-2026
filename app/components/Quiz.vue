<script setup lang="ts">
import ChoiceBox from './ChoiceBox.vue'
import QuizStepNavigation from './QuizStepNavigation.vue'

export type Choice = 'A' | 'B' | 'C' | 'D'
type StepStatus = 'correct' | 'wrong' | 'current' | 'pending'

interface Question {
  id: number
  text: string
  choices: { id: Choice; text: string }[]
  answer: Choice
}

export interface QuizResultHistory {
  question: Question
  userAnswer: Choice | null
}

const emit = defineEmits<{
  (e: 'finish', score: number, history: QuizResultHistory[]): void
}>()

const rawQuestions: Question[] = [
  {
    id: 1,
    text: 'วันที่ 11 ม.ค. นี้ เราต้องลงคะแนนเลือกใคร?',
    choices: [
      { id: 'A', text: 'นายก อบต. และเทศบาลตำบล' },
      { id: 'B', text: 'นายก อบต. และสมาชิกสภา อบต.' },
      { id: 'C', text: 'นายก อบต. และสภาจังหวัด' },
      { id: 'D', text: 'ผู้ว่าราชการจังหวัด และนายก อบต.' },
    ],
    answer: 'B',
  },
  {
    id: 2,
    text: 'ไหนเช็คความเข้าใจหน่อย ว่าข้อใดอยู่นอกอำนาจหน้าที่ของ อบต.?',
    choices: [
      { id: 'A', text: 'กำจัดขยะมูลฝอย' },
      { id: 'B', text: 'ป้องกันและระงับโรคติดต่อ' },
      { id: 'C', text: 'ส่งเสริมการศึกษา ศาสนา และวัฒนธรรม' },
      { id: 'D', text: 'การรักษาความสงบเรียบร้อย' },
    ],
    answer: 'D',
  },
  {
    id: 3,
    text: 'เอ๊ะ แล้ว อบต. กับ เทศบาลตำบล ต่างกันยังไง?',
    choices: [
      { id: 'A', text: 'ประชากรในการดูแลของ อบต. มีมากกว่าเทศบาลตำบล' },
      { id: 'B', text: 'อบต. ดูแลระดับเมือง เทศบาลตำบล ดูแลระดับหมู่บ้าน/ชุมชน ' },
      { id: 'C', text: 'อบต. ออกบัตรประชาชนให้เราได้ แต่เทศบาลตำบลทำไม่ได้' },
      {
        id: 'D',
        text: 'หากมีรายได้ท้องถิ่นมากกว่า 20 ล้านบาท อบต. สามารถยกระดับเป็นเทศบาลตำบลได้',
      },
    ],
    answer: 'D',
  },
]

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j]!, newArr[i]!]
  }
  return newArr
}

const questions = ref<Question[]>([])

onMounted(() => {
  questions.value = rawQuestions.map((q) => {
    return {
      ...q,
      choices: shuffleArray(q.choices),
    }
  })
})

const currentStep = ref(0)
const selectedAnswer = ref<Record<number, Choice>>({})

const currentQuestion = computed(() => questions.value[currentStep.value])

const isCurrentQuestionAnswered = computed(() => {
  const question = currentQuestion.value
  if (!question) return false
  return !!selectedAnswer.value[question.id]
})

const stepsStatus = computed<StepStatus[]>(() => {
  return questions.value.map((q, index) => {
    const userAnswer = selectedAnswer.value[q.id]
    if (userAnswer) {
      return userAnswer === q.answer ? 'correct' : 'wrong'
    }
    if (index === currentStep.value) {
      return 'current'
    }
    return 'pending'
  })
})

const calculateScore = () => {
  let score = 0
  questions.value.forEach((q) => {
    if (selectedAnswer.value[q.id] === q.answer) {
      score++
    }
  })
  return score
}

const getQuizHistory = (): QuizResultHistory[] => {
  return questions.value.map((q) => ({
    question: q,
    userAnswer: selectedAnswer.value[q.id] || null,
  }))
}

const handleSelectAnswer = (choiceId: Choice) => {
  const question = currentQuestion.value
  if (question) {
    selectedAnswer.value[question.id] = choiceId
  }
}

const handleNext = () => {
  if (currentStep.value < questions.value.length - 1) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    emit('finish', calculateScore(), getQuizHistory())
  }
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center pt-10">
    <QuizStepNavigation
      :currentStep="currentStep"
      :totalSteps="questions.length"
      :stepsStatus="stepsStatus"
      @next="handleNext"
      @prev="prevStep"
      @jumpTo="(index) => (currentStep = index)"
    />

    <div class="py-4 md:h-[220px]">
      <img class="h-full w-full" src="/assets/images/mock-character.png" alt="" />
    </div>

    <div v-if="currentQuestion" class="w-full">
      <div class="mb-5 flex items-center justify-center gap-2.5 px-5">
        <div
          class="font-sriracha bg-yellow-01 flex h-9 w-9 flex-none items-center justify-center rounded-full text-[18px] font-bold md:text-[22px]"
        >
          {{ currentQuestion.id }}
        </div>
        <p class="h7 font-bold">{{ currentQuestion.text }}</p>
      </div>

      <div class="flex w-full flex-col items-center gap-0.5 px-6">
        <ChoiceBox
          v-for="(choice, index) in currentQuestion.choices"
          :key="choice.id"
          :id="choice.id"
          :index="index"
          :text="choice.text"
          :correctAnswer="currentQuestion.answer"
          :selectedAnswer="selectedAnswer[currentQuestion.id] || null"
          @select="handleSelectAnswer"
        />
      </div>
    </div>

    <div
      v-if="isCurrentQuestionAnswered"
      class="animate-fade-in mt-6 mb-10 flex w-full flex-col items-center px-4"
    >
      <div class="w-full max-w-[764px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p class="h9 mb-2 font-bold">คำอธิบาย</p>
        <p class="b5 font-medium text-gray-700">
          นายก อบต. เป็นฝ่ายบริหาร ส่วน สภา อบต. เป็นฝ่ายนิติบัญญัติ...
        </p>
      </div>

      <button
        @click="handleNext"
        class="mt-6 w-full max-w-[280px] rounded-lg bg-blue-500 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-600"
      >
        {{ currentStep === questions.length - 1 ? 'ส่งคำตอบ' : 'ไปต่อ' }}
      </button>
    </div>
  </div>
</template>
