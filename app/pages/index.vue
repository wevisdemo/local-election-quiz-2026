<script setup lang="ts">
import Landing from '~/components/Landing.vue'
import Quiz, { type Choice, type Question, type QuizResultHistory } from '~/components/Quiz.vue'
import ResultPage from '~/components/ResultPage.vue'
import WvFooter from '@wevisdemo/ui/vue/footer'
import {
  Column,
  Object as SheetObject,
  Spreadsheet,
  asString,
  type StaticDecode,
} from 'sheethuahua'

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

const currentView = ref<'landing' | 'quiz' | 'result'>('landing')
const finalScore = ref(0)
const quizHistory = ref<QuizResultHistory[]>([])

const goToLanding = () => {
  currentView.value = 'landing'
  finalScore.value = 0
}

const startQuiz = () => {
  if (!isDataReady.value) return
  currentView.value = 'quiz'
  finalScore.value = 0
}

const finishQuiz = (score: number, history: QuizResultHistory[]) => {
  finalScore.value = score
  quizHistory.value = history
  currentView.value = 'result'
}

const questions = ref<Question[]>([])
const isDataReady = ref(false)

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j]!, newArr[i]!]
  }
  return newArr
}

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

const route = useRoute()
const router = useRouter()

watch(
  () => route.query.restart,
  (v) => {
    if (v === '1') {
      goToLanding()
      router.replace({ query: {} })
    }
  },
  { immediate: true },
)

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
      choices: ([4, 6, 7, 8, 10].includes(q.no) ? q.choices : shuffleArray(q.choices)) as {
        id: Choice
        text: string
      }[],
    }
  })

  isDataReady.value = true
})
</script>

<template>
  <div>
    <Landing v-if="currentView === 'landing'" @start="startQuiz" />
    <Quiz v-if="currentView === 'quiz'" :questions="questions" @finish="finishQuiz" />

    <ResultPage
      v-if="currentView === 'result'"
      :score="finalScore"
      :history="quizHistory"
      @restart="startQuiz"
    />

    <WvFooter v-if="currentView === 'result'" class="mt-5" />
  </div>
</template>
