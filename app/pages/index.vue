<script setup lang="ts">
import Landing from '~/components/Landing.vue'
import Logo from '~/components/Logo.vue'
import Quiz from '~/components/Quiz.vue'

const currentView = ref<'landing' | 'quiz' | 'result'>('landing')

const startQuiz = () => {
  currentView.value = 'quiz'
}

const finishQuiz = () => {
  currentView.value = 'result'
}
</script>

<template>
  <div>
    <Logo />
    <Landing v-if="currentView === 'landing'" @start="startQuiz" />
    <Quiz v-if="currentView === 'quiz'" @finish="finishQuiz" />
  </div>
</template>
