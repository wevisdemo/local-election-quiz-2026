<script setup lang="ts">
import Button from './Button.vue'

const emit = defineEmits<{
  (e: 'start'): void
}>()

const config = useRuntimeConfig()
const baseURL = config.public.baseUrl
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="mb-3 flex gap-2.5 md:mb-5">
      <p class="text-red-01 animate-1 h10 origin-center font-bold">Fit Check!</p>
      <p class="text-red-01 animate-2 h10 origin-center font-bold">Fit Check!</p>
    </div>
    <div class="leading-7 font-bold">
      <h6>เช็กความพร้อม</h6>
      <h3 class="relative z-20 -translate-y-0.5">ซ้อมความเป๊ะ</h3>
      <div class="flex items-center gap-2.5">
        <h6 class="relative z-20 md:mr-1">ก่อนออกไปเลือกตั้ง</h6>
        <div class="relative">
          <h4 class="relative z-20">อบต.</h4>
          <div
            class="absolute top-1/2 left-1/2 z-10 h-20 w-20 flex-none -translate-x-1/2 -translate-y-1/2 md:h-[120px] md:w-[120px]"
          >
            <img class="h-full w-full" src="/assets/images/yellow-circle.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[480px] py-10 md:pt-10 md:pb-4">
      <img :src="`${baseURL}/gifs/landing.gif`" alt="" />
    </div>

    <p class="b5 pb-1.5 font-bold">
      11 มกรา เลือกตั้ง อบต. <br class="md:hidden" />
      คุณพร้อมแล้วแค่ไหน?
    </p>
    <p class="b6 pb-2 font-medium md:pb-3">
      มา Fit Check ✌️ ความพร้อมความเป๊ะ <br class="md:hidden" />
      ก่อนออกจากบ้านไปเข้าคูหากันหน่อย!
    </p>

    <Button text="เริ่มเล่น Quiz" @click="emit('start')" />
  </div>
</template>

<style scoped>
@keyframes tilt-left {
  0%,
  100% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(1deg);
  }
}

@keyframes tilt-right {
  0%,
  100% {
    transform: rotate(6deg);
  }
  50% {
    transform: rotate(-1deg);
  }
}

.animate-1 {
  animation: tilt-left 0.5s ease-in infinite;
}
.animate-2 {
  animation: tilt-right 0.5s ease-in infinite;
}
</style>
