<script setup lang="ts">
import type { Choice, Question } from './Quiz.vue'
import YellowCard from './YellowCard.vue'
import AnswerSummaryCard from './AnswerSummaryCard.vue'
import ArticleCard from './ArticleCard.vue'
const { share } = useSocialShare()

interface QuizResultHistory {
  question: Question
  userAnswer: Choice | null
  explanation: string
}

const props = defineProps<{
  score: number
  history: QuizResultHistory[]
}>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()

const articleList = ref([
  {
    id: 1,
    title: 'อบต. เป็นใคร? ต้องกาอะไรบ้าง? ตอบทุกข้อสงสัยที่คุณควรรู้เพื่อเตรียมพร้อม #เลือกตั้งอบต',
    link: 'https://wevis.info/local-election07/',
    image: 'https://wevis.info/wp-content/uploads/2025/12/Local_Election_OG-1.jpg',
  },
  {
    id: 2,
    title:
      '🔐 ปลดล็อกเลือกตั้งท้องถิ่น 🚩 รวมกฎหมายเลือกตั้ง อบต. ที่ ‘อาจจะยังน้า’ พร้อมทางแก้เพื่อเพิ่มสิทธิให้ประชาชนอย่างคุณ',
    link: 'https://wevis.info/local-election08/',
    image: 'https://wevis.info/wp-content/uploads/2025/12/Local_Election_OG.jpg',
  },
  {
    id: 3,
    title: 'ชิงลาออก = เปลืองงบ เปลืองโอกาส’ 💸 ชวน ‘รีสตาร์ต’ ระเบียบเลือกตั้งท้องถิ่น',
    link: 'https://wevis.info/local-election09/',
    image: 'https://wevis.info/wp-content/uploads/2025/12/cover.png',
  },
])

onMounted(async () => {
  window.scrollTo(0, 0)
})

const showPopup = ref(false)

const allScoreDisplayData: {
  score: number
  head: string
  text_1: string
  text_2?: string
}[] = [
  {
    score: 0,
    head: 'คุณพร้อม… ทำอะไรนะ?',
    text_1:
      'บูส ๆ หน่อย! เพราะเลือกตั้ง อบต. ก็สำคัญไม่แพ้เลือกตั้งไหน ๆ ยังไม่สายเกินไปที่จะเตรียมตัว ',
    text_2: 'ควิซนี้ถือเป็นน้ำจิ้ม แล้ววันเข้าคูหา ขอให้พร้อมที่สุดนะ! 🍀',
  },
  {
    score: 1,
    head: 'คุณพร้อม… ทำอะไรนะ?',
    text_1:
      'บูส ๆ หน่อย! เพราะเลือกตั้ง อบต. ก็สำคัญไม่แพ้เลือกตั้งไหน ๆ ยังไม่สายเกินไปที่จะเตรียมตัว ',
    text_2: 'ควิซนี้ถือเป็นน้ำจิ้ม แล้ววันเข้าคูหา ขอให้พร้อมที่สุดนะ! 🍀',
  },
  {
    score: 2,
    head: 'คุณพร้อม… ทำอะไรนะ?',
    text_1:
      'บูส ๆ หน่อย! เพราะเลือกตั้ง อบต. ก็สำคัญไม่แพ้เลือกตั้งไหน ๆ ยังไม่สายเกินไปที่จะเตรียมตัว ',
    text_2: 'ควิซนี้ถือเป็นน้ำจิ้ม แล้ววันเข้าคูหา ขอให้พร้อมที่สุดนะ! 🍀',
  },
  {
    score: 3,
    head: 'คุณพร้อมน้อยไปหน่อย!',
    text_1: 'อาจจะยังนะตอนนี้… แต่เวลายังมีให้คุณได้เตรียมพร้อมและเข้าคูหาแบบมั่นใจ ไม่กลัว!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 🏃‍♀️💨',
  },
  {
    score: 4,
    head: 'คุณพร้อมน้อยไปหน่อย!',
    text_1: 'อาจจะยังนะตอนนี้… แต่เวลายังมีให้คุณได้เตรียมพร้อมและเข้าคูหาแบบมั่นใจ ไม่กลัว!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 🏃‍♀️💨',
  },
  {
    score: 5,
    head: 'คุณพร้อมน้อยไปหน่อย!',
    text_1: 'อาจจะยังนะตอนนี้… แต่เวลายังมีให้คุณได้เตรียมพร้อมและเข้าคูหาแบบมั่นใจ ไม่กลัว!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 🏃‍♀️💨',
  },
  {
    score: 6,
    head: 'คุณพร้อมแบบกั๊ก ๆ!',
    text_1: 'ทรงดี มาขนาดนี้แล้วก็ไปต่อจนกว่าจะพร้อมแบบเต็มพิกัด!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 🔥',
  },
  {
    score: 7,
    head: 'คุณพร้อมแบบกั๊ก ๆ!',
    text_1: 'ทรงดี มาขนาดนี้แล้วก็ไปต่อจนกว่าจะพร้อมแบบเต็มพิกัด!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 🔥',
  },
  {
    score: 8,
    head: 'คุณพร้อมไม่เบา!',
    text_1: 'จัดว่าเตรียมตัวได้เยี่ยมยอด อีกนิดเดียวก็จะพร้อมแบบเต็มร้อย!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 👏',
  },
  {
    score: 9,
    head: 'คุณพร้อม 99.99999%',
    text_1: 'จัดว่าเตรียมตัวได้เยี่ยมยอด อีกนิดเดียวก็จะพร้อมแบบเต็มร้อย!',
    text_2: 'ลองทบทวนคำตอบอีกสักหน่อย แล้วมาเก็บเต็มก่อนวันเลือกตั้งนะ 🚀',
  },
  {
    score: 10,
    head: 'คุณพร้อมแบบตะโกน!!!',
    text_1:
      'สุดยอด ดีเลิศ มหัศจรรย์ อันดับหนึ่ง! พร้อมขนาดนี้ก็ไม่มีอะไรต้องห่วง อย่าลืมคงความพร้อมแบบนี้ไว้จนถึงวันเข้าคูหานะ 💖',
  },
]

const currentResult = computed(() => {
  const found = allScoreDisplayData.find((item) => item.score === props.score)
  return found ?? allScoreDisplayData[0]
})

const gifSource = computed(() => {
  const formattedScore = props.score.toString().padStart(2, '0')

  return `/gifs/check_${formattedScore}.gif`
})

const copied = ref(false)
const pressed = ref(false)

const copyUrl = async () => {
  pressed.value = true

  try {
    await navigator.clipboard.writeText('https://wevis.info/fitcheckquiz')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 800)
  } finally {
    setTimeout(() => {
      pressed.value = false
    }, 800)
  }
}
</script>

<template>
  <div
    class="flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-x-hidden px-6 pt-10 text-center"
  >
    <div class="flex flex-col items-center py-4">
      <div class="relative">
        <h6
          class="font-sriracha absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px]"
        >
          {{ score }}/10
        </h6>
        <div class="h-20 w-20 flex-none md:h-[120px] md:w-[120px]">
          <img class="h-full w-full" src="/assets/images/yellow-circle.svg" alt="" />
        </div>
      </div>
      <div class="w-[180px] pt-2 pb-4 md:w-[220px]">
        <img :src="gifSource" alt="Score Result GIF" />
      </div>
      <h6 class="text-blue-01 mb-1 font-bold">{{ currentResult?.head }}</h6>
      <div class="flex w-[250px] flex-col gap-2 md:w-[700px]">
        <p class="b5 font-medium">
          {{ currentResult?.text_1 }}
        </p>
        <p class="b5 font-medium">{{ currentResult?.text_2 }}</p>
      </div>
      <div class="gap-0.5 pt-4 pb-5.5">
        <p class="b5 text-blue-01 mb-1 font-bold md:mb-2">แชร์ผลลัพธ์ที่ได้</p>
        <div class="flex gap-3 md:gap-4">
          <button class="cursor-pointer" @click="share('facebook', score)">
            <img src="/assets/images/facebook-icon.svg" alt="" />
          </button>
          <button class="cursor-pointer" @click="share('x', score)">
            <img src="/assets/images/x-icon.svg" alt="" />
          </button>
          <button class="cursor-pointer" @click="share('line', score)">
            <img src="/assets/images/line-icon.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="pb-5.5">
        <p class="b5 text-blue-01 mb-1 font-bold md:mb-2">แชร์หน้านี</p>
        <div
          @click="copyUrl"
          :class="`border-grey flex w-[260px] cursor-pointer justify-between rounded-lg border px-4 py-2 transition md:w-[300px] ${pressed ? 'bg-[#B3B3B3]' : 'hover:bg-[#B3B3B3]'}`"
        >
          <p class="b4">{{ copied ? 'copied!' : 'wevis.info/fitcheckquiz' }}</p>
          <img src="/assets/images/copy-link.svg" alt="Copy Link" />
        </div>
      </div>
      <div class="flex w-full flex-col items-center gap-2 md:flex-row md:justify-center">
        <button
          @click="$emit('restart')"
          class="bg-blue-06 hover:bg-blue-05 border-blue-06 hover:border-blue-05 flex w-full max-w-[280px] cursor-pointer items-center justify-center gap-2.5 rounded-lg border-2 py-[11px] font-bold"
        >
          <img src="/assets/images/replay.svg" alt="" />
          <p class="h11 translate-y-0.5">เล่นใหม่</p>
        </button>
        <button
          @click="showPopup = true"
          class="hover:bg-blue-05 hover:border-blue-05 flex w-full max-w-[280px] cursor-pointer items-center justify-center gap-2.5 rounded-lg border-2 py-[11px] font-bold"
        >
          <img src="/assets/images/result.svg" alt="" />

          <p class="h11 translate-y-0.5">ทวนเฉลยอีกรอบ</p>
        </button>
      </div>
    </div>
    <YellowCard />
    <div class="py-2">
      <h6 class="mb-2 font-bold">อ่านบทความ</h6>
      <div class="no-scrollbar w-screen overflow-x-scroll px-5">
        <div :class="`mx-auto flex w-max gap-2 md:gap-4`">
          <ArticleCard v-for="article in articleList" :data="article" :key="article.id" />
        </div>
      </div>
    </div>
    <div class="mb-8 py-2">
      <h6 class="mb-2 font-bold">อ้างอิง</h6>
      <a
        href="https://www.wangngiutai.go.th/contents/post/000000485-e0cb496af4f762ccb98f5376bdac2280.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="flex justify-center gap-1">
          <p class="b5 text-grey-01 font-medium underline">คู่มือประชาชนเลือกตั้ง อบต.</p>
          <img src="/images/external-link.svg" alt="External Link Icon" />
        </div>
      </a>
      <a
        href="https://theactive.thaipbs.or.th/data/get-to-know-subdistrict-administrative-organization-and-municipal-district"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="flex justify-center gap-1">
          <p class="b5 text-grey-01 font-medium underline">อบต. กับ เทศบาล ต่างกันอย่างไร</p>
          <img src="/images/external-link.svg" alt="External Link Icon" />
        </div>
      </a>
    </div>

    <div
      v-if="showPopup"
      class="bg-blue-03 fixed inset-0 z-40 flex h-full flex-col overflow-y-auto"
    >
      <div class="sticky top-0 flex justify-end p-3 md:px-6">
        <button
          @click="showPopup = false"
          class="cursor-pointer p-1 transition-opacity hover:opacity-80"
        >
          <img src="/assets/images/close.svg" alt="Close" />
        </button>
      </div>

      <div class="flex-1 px-4 pb-8 md:px-6">
        <div class="mx-auto flex flex-col gap-8">
          <AnswerSummaryCard
            v-for="(item, index) in history"
            :key="item.question.id"
            :index="index"
            :question="item.question"
            :userAnswer="item.userAnswer"
            :explanation="item.explanation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
