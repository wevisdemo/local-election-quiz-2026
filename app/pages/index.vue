<script setup lang="ts">
import Landing from '~/components/Landing.vue'
import Logo from '~/components/Logo.vue'
import Quiz, { type QuizResultHistory } from '~/components/Quiz.vue'
import ResultPage from '~/components/ResultPage.vue'
import WvFooter from '@wevisdemo/ui/vue/footer'

const currentView = ref<'landing' | 'quiz' | 'result'>('landing')
const finalScore = ref(0)
const quizHistory = ref<QuizResultHistory[]>([])

const startQuiz = () => {
  currentView.value = 'quiz'
  finalScore.value = 0
}

const finishQuiz = (score: number, history: QuizResultHistory[]) => {
  finalScore.value = score
  quizHistory.value = history
  currentView.value = 'result'
}
</script>

<template>
  <div>
    <Logo />
    <Landing v-if="currentView === 'landing'" @start="startQuiz" />
    <Quiz v-if="currentView === 'quiz'" @finish="finishQuiz" />

    <ResultPage
      v-if="currentView === 'result'"
      :score="finalScore"
      :history="quizHistory"
      @restart="startQuiz"
    />

    <WvFooter v-if="currentView === 'result'" class="mt-5" />
  </div>
</template>
