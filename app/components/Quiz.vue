<script setup lang="ts">
import ChoiceBox from './ChoiceBox.vue'
import QuizStepNavigation from './QuizStepNavigation.vue'
import {
  Column,
  Object as SheetObject,
  Spreadsheet,
  asString,
  type StaticDecode,
} from 'sheethuahua'
import { marked } from 'marked'

const schema = SheetObject({
  id: Column('id', asString()),
  question: Column('question', asString()),
  option_a: Column('option_a', asString()),
  option_b: Column('option_b', asString()),
  option_c: Column('option_c', asString()),
  option_d: Column('option_d', asString()),
  answer: Column('correct_option', asString()),
  explanation: Column('explanation', asString()),
})

export type Choice = 'A' | 'B' | 'C' | 'D'
type StepStatus = 'correct' | 'wrong' | 'current' | 'pending'

interface Question {
  no: number
  id: string
  question: string
  choices: { id: Choice; text: string }[]
  answer: Choice
  explanation: string
}

export interface QuizResultHistory {
  question: Question
  userAnswer: Choice | null
}

const emit = defineEmits<{
  (e: 'finish', score: number, history: QuizResultHistory[]): void
}>()

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j]!, newArr[i]!]
  }
  return newArr
}

const questions = ref<Question[]>([])
const transformSheetData = (rawData: StaticDecode<typeof schema>[]) => {
  return rawData.map((row, index) => {
    return {
      no: index + 1,
      id: row.id,
      question: row.question,
      choices: [
        { id: 'A', text: row.option_a },
        { id: 'B', text: row.option_b },
        { id: 'C', text: row.option_c },
        { id: 'D', text: row.option_d },
      ],
      answer: row.answer,
      explanation: row.explanation,
    }
  })
}

onMounted(async () => {
  const output = await Spreadsheet('17UxdHGS0ML1pq52q3zmaR5vFfDIRD_eVCVJUqd6VX-E').get(
    'quiz_data',
    schema,
  )
  const data = transformSheetData(output)

  questions.value = data.map((q) => {
    return {
      ...q,
      answer: q.answer as Choice,
      choices: shuffleArray(q.choices) as { id: Choice; text: string }[],
    }
  })
})

const currentStep = ref(0)
const selectedAnswer = ref<Record<number, Choice>>({})

const currentQuestion = computed(() => questions.value[currentStep.value])

const isCurrentQuestionAnswered = computed(() => {
  const question = currentQuestion.value
  if (!question) return false
  return !!selectedAnswer.value[question.no]
})

const stepsStatus = computed<StepStatus[]>(() => {
  return questions.value.map((q, index) => {
    const userAnswer = selectedAnswer.value[q.no]
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
    if (selectedAnswer.value[q.no] === q.answer) {
      score++
    }
  })
  return score
}

const currentGifSource = computed(() => {
  const score = calculateScore()

  const formattedScore = score.toString().padStart(2, '0')
  return `/gifs/check_${formattedScore}.gif`
})

const getQuizHistory = (): QuizResultHistory[] => {
  return questions.value.map((q) => ({
    question: q,
    userAnswer: selectedAnswer.value[q.no] || null,
    explanation: q.explanation,
  }))
}

const handleSelectAnswer = (choiceId: Choice) => {
  const question = currentQuestion.value
  if (question) {
    selectedAnswer.value[question.no] = choiceId
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

const renderMarkdown = (text: string | undefined) => {
  if (!text) return ''

  let html = marked.parse(text, { async: false, breaks: true }) as string
  html = html.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')

  return html
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

    <div class="py-4">
      <img class="h-[150px] object-contain md:h-[220px]" :src="currentGifSource" alt="Character" />
    </div>

    <div v-if="currentQuestion" class="w-full">
      <div class="mb-5 flex items-center justify-center gap-2.5 px-5">
        <div
          class="font-sriracha bg-yellow-01 flex h-9 w-9 flex-none items-center justify-center rounded-full text-[18px] font-bold md:text-[22px]"
        >
          {{ currentQuestion.no }}
        </div>
        <p class="h7 font-bold">{{ currentQuestion.question }}</p>
      </div>

      <div class="flex w-full flex-col items-center gap-0.5 px-6">
        <ChoiceBox
          v-for="(choice, index) in currentQuestion.choices"
          :key="choice.id"
          :id="choice.id"
          :index="index"
          :text="choice.text"
          :correctAnswer="currentQuestion.answer"
          :selectedAnswer="selectedAnswer[currentQuestion.no] || null"
          @select="handleSelectAnswer"
        />
      </div>
    </div>

    <div
      v-if="isCurrentQuestionAnswered"
      class="animate-fade-in mt-6 mb-10 flex w-full flex-col items-center px-4"
    >
      <div
        class="w-full max-w-[540px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-5"
      >
        <p class="h9 mb-2 font-bold">คำอธิบาย</p>
        <p
          class="b5 markdown-text font-medium"
          v-html="renderMarkdown(currentQuestion?.explanation)"
        />
      </div>

      <button
        @click="handleNext"
        class="hover:bg-blue-05 bg-blue-06 mt-6 w-full max-w-[280px] cursor-pointer rounded-lg px-8 py-3 font-bold text-white transition-colors"
      >
        {{ currentStep === questions.length - 1 ? 'ส่งคำตอบ' : 'ไปต่อ' }}
      </button>
    </div>
  </div>
</template>
